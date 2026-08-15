import React, { useState, useEffect, useRef } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '../utils/cropImage'
import {
  getAllProjectsAdmin,
  getAllProgramsAdmin,
  createProject,
  updateProject,
  deleteProject,
  deleteProjectsBulk
} from '../services/generalizedAdminService'

export function AdminProjectsPage() {
  const [projects, setProjects] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedScheme, setSelectedScheme] = useState('ALL')
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkDeleteConfirmOpen, setBulkDeleteConfirmOpen] = useState(false)

  // Cropper Modal State
  const [cropperOpen, setCropperOpen] = useState(false)
  const [cropSrc, setCropSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspect, setAspect] = useState(16 / 9)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_label: 'Smart Hardware & IoT',
    scheme_name: 'DST NewGen-IEDC',
    cohort_year: '2022-23',
    description: '',
    innovators: '',
    mentors: '',
    patent_status: 'NA',
    patent_id: '',
    expenditure: 250000,
    image_url: '',
    is_featured: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', msg: '' })

  // Auto-dismiss notification banner after 2 seconds
  useEffect(() => {
    if (feedback.msg) {
      const timer = setTimeout(() => {
        setFeedback({ type: '', msg: '' })
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  const loadData = async () => {
    setLoading(true)
    const [projRes, progRes] = await Promise.all([
      getAllProjectsAdmin(),
      getAllProgramsAdmin()
    ])
    setProjects(projRes.data || [])
    setPrograms(progRes.data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const categoriesList = [
    'ALL',
    'Smart Hardware & IoT',
    'Deep-Tech & AI',
    'Clean-Tech & Environment',
    'Health-Tech & Medical',
    'Agri-Tech & Automation',
    'Advanced Manufacturing',
    'Software & Digital Systems'
  ]

  const schemesList = [
    'ALL',
    'DST NewGen-IEDC',
    'MSME Hackathon',
    'UP Startup Policy',
    'NIDHI-PRAYAS',
    'IIC Innovation Track'
  ]

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      slug: '',
      category_label: 'Smart Hardware & IoT',
      scheme_name: 'DST NewGen-IEDC',
      cohort_year: '2022-23',
      description: '',
      innovators: '',
      mentors: '',
      patent_status: 'NA',
      patent_id: '',
      expenditure: 250000,
      image_url: '',
      is_featured: false
    })
    setIsEditingPage(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)

    // Extract innovators and mentors from description if formatted
    let cleanDesc = item.description || ''
    let innovatorsText = ''
    let mentorsText = ''

    if (cleanDesc.includes('| Student Innovators:')) {
      const parts = cleanDesc.split('| Student Innovators:')
      cleanDesc = parts[0].trim()
      const remaining = parts[1] || ''
      if (remaining.includes('| Faculty Mentors:')) {
        const mParts = remaining.split('| Faculty Mentors:')
        innovatorsText = mParts[0].trim()
        mentorsText = mParts[1].trim()
      } else {
        innovatorsText = remaining.trim()
      }
    }

    const schemeName = item.cohorts?.programs?.name || 'DST NewGen-IEDC'
    const cohortYr = item.cohorts?.year_label || '2022-23'

    setFormData({
      title: item.title || '',
      slug: item.slug || '',
      category_label: item.category_label || 'Smart Hardware & IoT',
      scheme_name: schemeName,
      cohort_year: cohortYr,
      description: cleanDesc,
      innovators: innovatorsText,
      mentors: mentorsText,
      patent_status: item.patent_status || 'NA',
      patent_id: item.patent_id || '',
      expenditure: item.expenditure || 250000,
      image_url: item.image_url || '',
      is_featured: item.is_featured || false
    })
    setIsEditingPage(true)
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, title, slug: editingItem ? formData.slug : slug })
  }

  const handleFileSelect = (e) => {
    const file = e.target?.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setCropSrc(reader.result)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setRotation(0)
        setCropperOpen(true)
      }
      reader.readAsDataURL(file)
    }
    if (e.target) {
      e.target.value = ''
    }
  }

  const handleSaveCroppedImage = async () => {
    try {
      if (!croppedAreaPixels) return
      const croppedImageBase64 = await getCroppedImg(cropSrc, croppedAreaPixels, rotation)
      if (croppedImageBase64) {
        setFormData(prev => ({ ...prev, image_url: croppedImageBase64 }))
        setCropperOpen(false)
        setFeedback({ type: 'success', msg: 'Image cropped successfully! Save project to apply changes.' })
      }
    } catch (err) {
      console.error('Crop error:', err)
      setFeedback({ type: 'error', msg: 'Could not crop image. Please try another file.' })
    }
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })

    let fullDesc = formData.description
    if (formData.innovators) {
      fullDesc += ` | Student Innovators: ${formData.innovators}`
    }
    if (formData.mentors) {
      fullDesc += ` | Faculty Mentors: ${formData.mentors}`
    }

    const payload = {
      title: formData.title,
      slug: formData.slug,
      category_label: formData.category_label,
      description: fullDesc,
      patent_status: formData.patent_status,
      patent_id: formData.patent_id || null,
      expenditure: parseFloat(formData.expenditure) || 0,
      image_url: formData.image_url || null,
      is_featured: formData.is_featured,
      status: 'published'
    }

    if (editingItem) {
      const { error } = await updateProject(editingItem.id, payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error updating project: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Project updated successfully!' })
        setIsEditingPage(false)
        loadData()
      }
    } else {
      // Find default cohort_id matching cohort_year or fallback to 1st cohort
      const defaultCohortId = '500b9374-1592-4c46-98ee-a026a3fab70d'
      const { data, error } = await createProject({ ...payload, cohort_id: defaultCohortId })
      if (error) {
        setFeedback({ type: 'error', msg: `Error creating project: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Project created successfully!' })
        setIsEditingPage(false)
        loadData()
      }
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    setSubmitting(true)
    const { error } = await deleteProject(id)
    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting project: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: 'Project deleted successfully!' })
      setDeleteConfirmId(null)
      setSelectedIds(prev => prev.filter(i => i !== id))
      loadData()
    }
    setSubmitting(false)
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    setSubmitting(true)
    const { error } = await deleteProjectsBulk(selectedIds)
    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting selected projects: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: `Successfully deleted ${selectedIds.length} projects!` })
      setSelectedIds([])
      setBulkDeleteConfirmOpen(false)
      loadData()
    }
    setSubmitting(false)
  }

  const handleToggleSelectAll = (filteredItems) => {
    const filteredItemIds = filteredItems.map(f => f.id)
    const isAllSelected = filteredItemIds.length > 0 && filteredItemIds.every(id => selectedIds.includes(id))
    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !filteredItemIds.includes(id)))
    } else {
      const merged = new Set([...selectedIds, ...filteredItemIds])
      setSelectedIds(Array.from(merged))
    }
  }

  const handleToggleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const filtered = projects.filter(p => {
    const titleMatch = (p.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    const slugMatch = (p.slug || '').toLowerCase().includes(searchQuery.toLowerCase())
    const descMatch = (p.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSearch = titleMatch || slugMatch || descMatch

    const catVal = p.category_label || ''
    const matchesCat = selectedCategory === 'ALL' || catVal.toLowerCase() === selectedCategory.toLowerCase()

    const schemeVal = p.cohorts?.programs?.name || 'DST NewGen-IEDC'
    const matchesScheme = selectedScheme === 'ALL' || schemeVal.toLowerCase().includes(selectedScheme.toLowerCase())

    return matchesSearch && matchesCat && matchesScheme
  })

  return (
    <>
      {isEditingPage ? (
        /* Full Detailed Page Editor View */
        <div className="flex flex-col gap-6 font-normal text-slate-900">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm text-slate-500 font-normal">
                <button
                  type="button"
                  onClick={() => setIsEditingPage(false)}
                  className="text-[#074887] hover:underline flex items-center gap-1 font-normal cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Projects Directory</span>
                </button>
                <span>/</span>
                <span>{editingItem ? 'Edit Project' : 'Add Project'}</span>
              </div>
              <h1 className="text-2xl font-normal text-[#013759] mt-1">
                {editingItem ? `Editing Project: ${editingItem.title}` : 'Add Innovation Prototype Project'}
              </h1>
            </div>

            <div className="flex items-center gap-3 font-normal shrink-0">
              <button
                type="button"
                onClick={() => setIsEditingPage(false)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-sm px-5 py-2.5 rounded-xl font-normal cursor-pointer border border-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={submitting}
                style={{ color: '#ffffff' }}
                className="bg-[#074887] hover:bg-[#013759] !text-white text-sm px-6 py-2.5 rounded-xl font-normal shadow-sm disabled:opacity-50 cursor-pointer flex items-center gap-2 transition-colors"
              >
                <span>{submitting ? 'Saving...' : 'Save Project Details'}</span>
              </button>
            </div>
          </div>

          {feedback.msg && (
            <div className={`p-4 rounded-xl text-sm border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
              {feedback.msg}
            </div>
          )}

          {/* Detailed Project Form */}
          <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 text-sm font-normal">
            <h2 className="text-lg font-normal text-[#013759] border-b border-slate-200 pb-3">Project Metadata & Photo</h2>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-64 aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative shadow-2xs flex flex-col items-center justify-center">
                {formData.image_url ? (
                  <img src={formData.image_url} alt="Project Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 p-4 text-center text-slate-400 font-normal">
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-slate-500 font-normal">No photo uploaded</span>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-3">
                <h3 className="text-base font-normal text-[#013759]">Project Cover Image</h3>
                <p className="text-xs text-slate-600 font-normal">
                  Upload a photo or prototype image for this project. Crop, zoom, and rotate for ideal 16:9 presentation.
                </p>
                <div className="flex items-center gap-3 pt-2 font-normal">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ color: '#0f172a' }}
                    className="bg-white hover:bg-slate-100 !text-slate-900 text-xs px-4 py-2 rounded-xl font-normal cursor-pointer border border-slate-300 shadow-2xs"
                  >
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. IF-YO-NO Open-Source Microcontroller Board"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2">Funding Scheme / Program</label>
                <select
                  value={formData.scheme_name}
                  onChange={(e) => setFormData({ ...formData, scheme_name: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
                >
                  <option value="DST NewGen-IEDC">DST NewGen-IEDC</option>
                  <option value="MSME Hackathon">MSME Hackathon</option>
                  <option value="UP Startup Policy">UP Startup Policy</option>
                  <option value="NIDHI-PRAYAS">NIDHI-PRAYAS</option>
                  <option value="IIC Innovation Track">IIC Innovation Track</option>
                </select>
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Cohort / Academic Year</label>
                <select
                  value={formData.cohort_year}
                  onChange={(e) => setFormData({ ...formData, cohort_year: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
                >
                  <option value="2019-20">2019-20 (1st Year)</option>
                  <option value="2020-21">2020-21 (2nd Year)</option>
                  <option value="2021-22">2021-22 (3rd Year)</option>
                  <option value="2022-23">2022-23 (4th Year)</option>
                  <option value="2023-24">2023-24 (5th Year)</option>
                </select>
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Domain / Category</label>
                <select
                  value={formData.category_label}
                  onChange={(e) => setFormData({ ...formData, category_label: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
                >
                  {categoriesList.filter(c => c !== 'ALL').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-2">Comprehensive Technical Description</label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe problem statement, technical innovation, components used, and commercial application..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2">Student Innovators / Team</label>
                <input
                  type="text"
                  value={formData.innovators}
                  onChange={(e) => setFormData({ ...formData, innovators: e.target.value })}
                  placeholder="e.g. Shashwat Pandey, Anannya Sharma"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Faculty Mentors</label>
                <input
                  type="text"
                  value={formData.mentors}
                  onChange={(e) => setFormData({ ...formData, mentors: e.target.value })}
                  placeholder="e.g. Dr. Sachin Sharma, Er. Astha Singh"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2">Patent Status</label>
                <select
                  value={formData.patent_status}
                  onChange={(e) => setFormData({ ...formData, patent_status: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
                >
                  <option value="NA">NA (Not Patented)</option>
                  <option value="Granted">Granted (Patent Issued)</option>
                  <option value="Filed">Filed / Published / Applied</option>
                </select>
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Patent Application ID</label>
                <input
                  type="text"
                  value={formData.patent_id}
                  onChange={(e) => setFormData({ ...formData, patent_id: e.target.value })}
                  placeholder="e.g. 202311008497"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Grant Expenditure (₹)</label>
                <input
                  type="number"
                  value={formData.expenditure}
                  onChange={(e) => setFormData({ ...formData, expenditure: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* 4-Column Grid Projects View */
        <div className="flex flex-col gap-6 font-normal text-slate-900">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-normal text-[#013759]">Projects & Innovations Directory</h1>
            </div>

            <button
              onClick={openCreateModal}
              style={{ color: '#ffffff' }}
              className="bg-[#074887] hover:bg-[#013759] !text-white text-sm font-normal px-5 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 w-fit cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Project</span>
            </button>
          </div>

          {feedback.msg && (
            <div className={`p-4 rounded-xl text-sm border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
              {feedback.msg}
            </div>
          )}

          {/* Controls Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-normal">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search projects, innovators, or patents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <select
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal cursor-pointer shadow-2xs max-w-xs"
              >
                {schemesList.map(scheme => (
                  <option key={scheme} value={scheme}>{scheme === 'ALL' ? 'All Schemes / Programs' : scheme}</option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal cursor-pointer shadow-2xs max-w-xs"
              >
                {categoriesList.map(cat => (
                  <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setBulkDeleteConfirmOpen(true)}
                  style={{ color: '#ffffff' }}
                  className="bg-red-600 hover:bg-red-700 !text-white text-xs px-4 py-2 rounded-xl font-normal shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete Selected ({selectedIds.length})</span>
                </button>
              )}

              <span className="text-sm text-slate-600 font-mono shrink-0 font-normal">
                {filtered.length}
              </span>
            </div>
          </div>

          {/* 4-COLUMN GRID VIEW */}
          {loading ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
              <p className="text-xs text-slate-500 font-normal">Loading innovation projects from Supabase...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-normal">
              {filtered.map((item) => {
                const isSelected = selectedIds.includes(item.id)
                const schemeName = item.cohorts?.programs?.name || 'DST NewGen-IEDC'
                const cohortYr = item.cohorts?.year_label || '2022-23'
                const patentSt = item.patent_status || 'NA'

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border ${isSelected ? 'border-[#074887] ring-2 ring-[#074887]/20 bg-sky-50/20' : 'border-slate-200 hover:shadow-md'} shadow-xs transition-all flex flex-col justify-between overflow-hidden group relative`}
                  >
                    <div>
                      {/* 16:9 Aspect Ratio Image Container */}
                      <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                        <div className="absolute top-3 left-3 z-10">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectOne(item.id)}
                            className="w-5 h-5 accent-[#074887] rounded cursor-pointer shadow-xs"
                          />
                        </div>

                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-[#013759] flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-white text-xs font-mono font-normal tracking-wide uppercase opacity-90">{schemeName}</span>
                            <span className="text-sky-300 text-[10px] font-mono mt-1">{cohortYr}</span>
                          </div>
                        )}

                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#074887] text-[11px] font-normal px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                          {item.category_label || 'Smart Hardware'}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex flex-col gap-3">
                        <div>
                          <h3 className="text-base font-normal text-[#013759] leading-snug line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200">
                              {schemeName} ({cohortYr})
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-normal border ${patentSt === 'Granted' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : patentSt === 'Filed' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                            Patent: {patentSt}
                          </span>
                          <span className="font-mono text-slate-700 text-[11px]">
                            ₹{(item.expenditure || 250000).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500">/{item.slug}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-[#074887] hover:underline text-xs font-normal cursor-pointer"
                        >
                          Edit
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="text-red-600 hover:underline text-xs font-normal cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs text-slate-500 text-sm font-normal">
              No projects found matching your search or scheme filter. Click "Add Project" to register one.
            </div>
          )}
        </div>
      )}

      {/* Bulk Delete Modal */}
      {bulkDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-normal">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 flex flex-col gap-4 text-center font-normal">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-base font-normal text-slate-900">Delete Selected Projects</h3>
            <p className="text-xs text-slate-600 font-normal">
              Are you sure you want to permanently delete <strong className="font-normal text-slate-900">{selectedIds.length} selected project(s)</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-normal">
              <button
                type="button"
                onClick={() => setBulkDeleteConfirmOpen(false)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-4 py-2 rounded-xl font-normal cursor-pointer border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                disabled={submitting}
                style={{ color: '#ffffff' }}
                className="bg-red-600 hover:bg-red-700 !text-white text-xs px-4 py-2 rounded-xl font-normal shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-normal">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 flex flex-col gap-4 text-center font-normal">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-base font-normal text-slate-900">Confirm Deletion</h3>
            <p className="text-xs text-slate-600 font-normal">
              Are you sure you want to permanently delete this project record? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-normal">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-4 py-2 rounded-xl font-normal cursor-pointer border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={submitting}
                style={{ color: '#ffffff' }}
                className="bg-red-600 hover:bg-red-700 !text-white text-xs px-4 py-2 rounded-xl font-normal shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* React Easy Crop Image Modal */}
      {cropperOpen && cropSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-normal">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 flex flex-col gap-4 font-normal">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-normal text-[#013759]">Crop & Adjust Project Photo</h3>
              <button type="button" onClick={() => setCropperOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <div className="relative w-full h-80 bg-slate-900 rounded-xl overflow-hidden">
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={(_, pixelCrop) => setCroppedAreaPixels(pixelCrop)}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
            </div>

            <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-normal">Zoom: {zoom.toFixed(1)}x</span>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-48 accent-[#074887] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1 font-normal border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCropperOpen(false)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-4 py-2 rounded-xl font-normal cursor-pointer border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCroppedImage}
                style={{ color: '#ffffff' }}
                className="bg-[#074887] hover:bg-[#013759] !text-white text-xs px-5 py-2 rounded-xl font-normal shadow-xs cursor-pointer"
              >
                Apply Crop & Use Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
