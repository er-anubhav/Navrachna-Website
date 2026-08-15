import React, { useState, useEffect, useRef } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '../utils/cropImage'
import {
  getAllStartupsAdmin,
  createStartup,
  updateStartup,
  deleteStartup
} from '../services/generalizedAdminService'

export function AdminStartupsPage() {
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStage, setSelectedStage] = useState('ALL')
  const [selectedRevenue, setSelectedRevenue] = useState('ALL')
  const [selectedGender, setSelectedGender] = useState('ALL')
  const [selectedSector, setSelectedSector] = useState('ALL')

  const [viewMode, setViewMode] = useState('GRID')
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkDeleteConfirmOpen, setBulkDeleteConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [imgErrorMap, setImgErrorMap] = useState({})
  const [editorImgError, setEditorImgError] = useState(false)

  // Cropper Modal State
  const [cropperOpen, setCropperOpen] = useState(false)
  const [cropSrc, setCropSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspect, setAspect] = useState(1) // Default 1:1 Square aspect ratio for Logos
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const fileInputRef = useRef(null)

  // Form State for ALL 16 SEPARATE COLUMNS + EXTENSIVITY (Custom Fields)
  const [formData, setFormData] = useState({
    s_no: 1,
    company_name: '',
    founder_name: '',
    is_women_founder: false,
    cin_number: '',
    sector: 'IT & Tech Services',
    website: '',
    stage: 'Early Traction',
    mobile_number: '',
    email_id: '',
    date_of_incorporation: '',
    date_of_incubation: '',
    dpiit_number: '',
    startinup_registration_number: '',
    revenue_in_lakhs: 0.0,
    about_startup: '',
    slug: '',
    logo_url: '',
    is_featured: true,
    custom_fields: []
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
    const { data } = await getAllStartupsAdmin()
    setStartups(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const normalizeSector = (raw) => {
    if (!raw || typeof raw !== 'string') return 'IT & Tech Services'
    const trimmed = raw.trim()
    const lower = trimmed.toLowerCase()

    if (lower.includes('agri') || lower.includes('agro') || lower.includes('agtech') || lower.includes('farming')) return 'AgriTech'
    if (lower.includes('health') || lower.includes('medtech') || lower.includes('wellness') || lower.includes('med')) return 'HealthTech & MedTech'
    if (lower.includes('edu') || lower.includes('ed-tech')) return 'EdTech'
    if (lower.includes('clean') || lower.includes('green') || lower.includes('renew') || lower.includes('environ') || lower.includes('waste')) return 'CleanTech & Sustainability'
    if (lower.includes('elec') || lower.includes('iot') || lower.includes('hardware') || lower.includes('drone') || lower.includes('battery')) return 'Electronics, Hardware & IoT'
    if (lower.includes('ai') || lower.includes('ml') || lower.includes('deeptech') || lower.includes('deep-tech') || lower.includes('software') || lower.includes('saas') || lower.includes('it services')) return 'AI, SaaS & Software'
    if (lower.includes('retail') || lower.includes('commerce')) return 'Retail & E-Commerce'
    if (lower.includes('ev') || lower.includes('electric') || lower.includes('transport') || lower.includes('mobility')) return 'EV & Mobility'
    if (lower.includes('space') || lower.includes('aero')) return 'SpaceTech & Aerospace'
    if (lower.includes('food')) return 'Food Processing'
    if (lower.includes('fin') || lower.includes('bank')) return 'FinTech'
    if (lower.includes('travel') || lower.includes('tourism')) return 'Travel & Tourism'
    if (lower.includes('manufactur')) return 'Advanced Manufacturing'

    return trimmed
  }

  const parse16Columns = (item) => {
    let parsed = {}
    if (item.description) {
      try {
        parsed = JSON.parse(item.description)
      } catch (e) {}
    }

    const primaryFounder = item.startup_founders?.[0]?.people

    return {
      s_no: parsed.s_no || 1,
      company_name: item.name || parsed.company_name || '',
      founder_name: primaryFounder?.full_name || parsed.founder_name || '',
      is_women_founder: parsed.is_women_founder || (primaryFounder?.designation?.includes('Director') || false),
      cin_number: parsed.cin_number || 'N/A',
      sector: normalizeSector(parsed.sector || item.startup_categories?.name || 'IT & Tech Services'),
      website: item.website_url || parsed.website || 'N/A',
      stage: parsed.stage || item.incubation_status || 'Early Traction',
      mobile_number: primaryFounder?.phone || parsed.mobile_number || 'N/A',
      email_id: primaryFounder?.email || parsed.email_id || 'N/A',
      date_of_incorporation: parsed.date_of_incorporation || item.cohort_year || 'N/A',
      date_of_incubation: parsed.date_of_incubation || 'N/A',
      dpiit_number: parsed.dpiit_number || 'N/A',
      startinup_registration_number: parsed.startinup_registration_number || 'N/A',
      revenue_in_lakhs: parseFloat(parsed.revenue_in_lakhs || 0.0),
      about_startup: parsed.about_startup || item.description || '',
      slug: item.slug || parsed.slug || '',
      logo_url: (parsed.logo_url !== undefined && parsed.logo_url !== null) ? parsed.logo_url : (item.logo_url || ''),
      custom_fields: Array.isArray(parsed.custom_fields) ? parsed.custom_fields : []
    }
  }

  const openCreateModal = () => {
    setEditingItem(null)
    setEditorImgError(false)
    setFormData({
      s_no: startups.length + 1,
      company_name: '',
      founder_name: '',
      is_women_founder: false,
      cin_number: '',
      sector: 'IT & Tech Services',
      website: '',
      stage: 'Early Traction',
      mobile_number: '',
      email_id: '',
      date_of_incorporation: '',
      date_of_incubation: '',
      dpiit_number: '',
      startinup_registration_number: '',
      revenue_in_lakhs: 0.0,
      about_startup: '',
      slug: '',
      logo_url: '',
      is_featured: true,
      custom_fields: []
    })
    setIsEditingPage(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setEditorImgError(false)
    const p = parse16Columns(item)
    setFormData({
      s_no: p.s_no,
      company_name: p.company_name,
      founder_name: p.founder_name,
      is_women_founder: p.is_women_founder,
      cin_number: p.cin_number === 'N/A' ? '' : p.cin_number,
      sector: p.sector,
      website: p.website === 'N/A' ? '' : p.website,
      stage: p.stage,
      mobile_number: p.mobile_number === 'N/A' ? '' : p.mobile_number,
      email_id: p.email_id === 'N/A' ? '' : p.email_id,
      date_of_incorporation: p.date_of_incorporation === 'N/A' ? '' : p.date_of_incorporation,
      date_of_incubation: p.date_of_incubation === 'N/A' ? '' : p.date_of_incubation,
      dpiit_number: p.dpiit_number === 'N/A' ? '' : p.dpiit_number,
      startinup_registration_number: p.startinup_registration_number === 'N/A' ? '' : p.startinup_registration_number,
      revenue_in_lakhs: p.revenue_in_lakhs,
      about_startup: p.about_startup,
      slug: p.slug,
      logo_url: p.logo_url,
      is_featured: item.is_featured !== false,
      custom_fields: p.custom_fields
    })
    setIsEditingPage(true)
  }

  const handleNameChange = (e) => {
    const company_name = e.target.value
    const slug = company_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, company_name, slug: editingItem ? formData.slug : slug })
  }

  // File Select & Cropper Modal Handler
  const handleFileSelect = (e) => {
    const file = e.target?.files?.[0]
    if (file) {
      setEditorImgError(false)
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

  const openCropForExistingLogo = () => {
    if (formData.logo_url) {
      setEditorImgError(false)
      setCropSrc(formData.logo_url)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setRotation(0)
      setCropperOpen(true)
    }
  }

  const handleSaveCroppedImage = async () => {
    try {
      if (!croppedAreaPixels) return
      const croppedImageBase64 = await getCroppedImg(cropSrc, croppedAreaPixels, rotation)
      if (croppedImageBase64) {
        setEditorImgError(false)
        setFormData(prev => ({ ...prev, logo_url: croppedImageBase64 }))
        setCropperOpen(false)
        setFeedback({ type: 'success', msg: 'Logo cropped and updated successfully!' })
      }
    } catch (err) {
      console.error('Crop error:', err)
      setFeedback({ type: 'error', msg: 'Could not crop image. Please try another file.' })
    }
  }

  // Custom Dynamic Fields Handlers
  const addCustomField = () => {
    setFormData(prev => ({
      ...prev,
      custom_fields: [...prev.custom_fields, { key: '', value: '' }]
    }))
  }

  const updateCustomField = (index, keyOrValue, val) => {
    setFormData(prev => {
      const updated = [...prev.custom_fields]
      updated[index] = { ...updated[index], [keyOrValue]: val }
      return { ...prev, custom_fields: updated }
    })
  }

  const removeCustomField = (index) => {
    setFormData(prev => ({
      ...prev,
      custom_fields: prev.custom_fields.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })

    const validCustomFields = formData.custom_fields.filter(cf => cf.key && cf.key.trim() !== '')

    const structuredData = {
      s_no: formData.s_no,
      company_name: formData.company_name,
      founder_name: formData.founder_name,
      is_women_founder: formData.is_women_founder,
      cin_number: formData.cin_number || 'N/A',
      sector: formData.sector,
      website: formData.website || 'N/A',
      stage: formData.stage,
      mobile_number: formData.mobile_number || 'N/A',
      email_id: formData.email_id || 'N/A',
      date_of_incorporation: formData.date_of_incorporation || 'N/A',
      date_of_incubation: formData.date_of_incubation || 'N/A',
      dpiit_number: formData.dpiit_number || 'N/A',
      startinup_registration_number: formData.startinup_registration_number || 'N/A',
      revenue_in_lakhs: parseFloat(formData.revenue_in_lakhs || 0.0),
      about_startup: formData.about_startup,
      slug: formData.slug,
      logo_url: formData.logo_url || '',
      custom_fields: validCustomFields
    }

    const yr = formData.date_of_incorporation ? formData.date_of_incorporation.substring(0, 4) : '2023'
    const incStatus = (formData.stage.toLowerCase().includes('scaling') || formData.stage.toLowerCase().includes('graduat')) ? 'graduated' : 'incubated'

    const payload = {
      name: formData.company_name,
      legal_name: formData.company_name,
      slug: formData.slug,
      website_url: formData.website || null,
      incubation_status: incStatus,
      cohort_year: yr,
      is_featured: formData.is_featured,
      logo_url: formData.logo_url || '',
      description: JSON.stringify(structuredData)
    }

    if (editingItem) {
      const { error } = await updateStartup(editingItem.id, payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error updating startup: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Startup details updated successfully!' })
        setIsEditingPage(false)
        loadData()
      }
    } else {
      const { error } = await createStartup(payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error creating startup: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Startup created successfully!' })
        setIsEditingPage(false)
        loadData()
      }
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    setSubmitting(true)
    const { error } = await deleteStartup(id)
    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting startup: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: 'Startup record deleted!' })
      setDeleteConfirmId(null)
      setSelectedIds(prev => prev.filter(item => item !== id))
      loadData()
    }
    setSubmitting(false)
  }

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    const filteredIds = filtered.map(s => s.id)
    const allSelected = filteredIds.length > 0 && filteredIds.every(id => selectedIds.includes(id))
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !filteredIds.includes(id)))
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...filteredIds])))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })
    let errorCount = 0
    for (const id of selectedIds) {
      const { error } = await deleteStartup(id)
      if (error) errorCount++
    }
    if (errorCount > 0) {
      setFeedback({ type: 'error', msg: `Deleted with ${errorCount} error(s).` })
    } else {
      setFeedback({ type: 'success', msg: `Successfully deleted ${selectedIds.length} startup(s)!` })
    }
    setSelectedIds([])
    setBulkDeleteConfirmOpen(false)
    setSubmitting(false)
    loadData()
  }

  const uniqueSectors = Array.from(new Set(startups.map(s => parse16Columns(s).sector).filter(Boolean))).sort()

  const filtered = startups.filter(s => {
    const p = parse16Columns(s)
    const q = searchQuery.toLowerCase()
    const matchCustom = p.custom_fields.some(cf => cf.key.toLowerCase().includes(q) || cf.value.toLowerCase().includes(q))

    const matchQuery = (
      p.company_name.toLowerCase().includes(q) ||
      p.founder_name.toLowerCase().includes(q) ||
      p.cin_number.toLowerCase().includes(q) ||
      p.sector.toLowerCase().includes(q) ||
      p.dpiit_number.toLowerCase().includes(q) ||
      p.startinup_registration_number.toLowerCase().includes(q) ||
      matchCustom
    )

    const matchStage = selectedStage === 'ALL' || p.stage.toLowerCase() === selectedStage.toLowerCase()
    const matchRevenue = selectedRevenue === 'ALL' || (selectedRevenue === 'REVENUE' ? p.revenue_in_lakhs > 0 : p.revenue_in_lakhs === 0)
    const matchGender = selectedGender === 'ALL' || (selectedGender === 'WOMEN' ? p.is_women_founder : !p.is_women_founder)
    const matchSector = selectedSector === 'ALL' || p.sector.toLowerCase() === selectedSector.toLowerCase()

    return matchQuery && matchStage && matchRevenue && matchGender && matchSector
  })

  const getInitials = (name) => {
    if (!name) return 'ST'
    const words = name.trim().split(/\s+/)
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <>
      {isEditingPage ? (
        /* FULL DETAILED EDIT VIEW */
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
                  <span>Back to Startups Directory</span>
                </button>
                <span>/</span>
                <span>{editingItem ? 'Edit Startup' : 'Add Startup'}</span>
              </div>
              <h1 className="text-2xl font-normal text-[#013759] mt-1">
                {editingItem ? `Editing: ${editingItem.name}` : 'Register New Incubated Startup'}
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
                className="bg-[#074887] hover:bg-[#013759] !text-white text-sm px-6 py-2.5 rounded-xl font-normal shadow-sm disabled:opacity-50 cursor-pointer transition-colors"
              >
                <span>{submitting ? 'Saving...' : 'Save All Details'}</span>
              </button>
            </div>
          </div>

          {feedback.msg && (
            <div className={`p-4 rounded-xl text-sm border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
              {feedback.msg}
            </div>
          )}

          <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 text-sm font-normal">
            
            {/* Section 1: Logo Upload & Image Management */}
            <h2 className="text-base font-normal text-[#013759] border-b border-slate-200 pb-3">1. Startup Branding & Logo Image</h2>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border border-slate-300 shadow-xs overflow-hidden flex items-center justify-center p-3 shrink-0">
                {formData.logo_url && !editorImgError ? (
                  <img
                    src={formData.logo_url}
                    alt="Startup Logo"
                    onError={() => setEditorImgError(true)}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#013759] text-center font-normal">
                    <span className="text-2xl font-mono tracking-wider">{getInitials(formData.company_name)}</span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5">No Logo</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 flex-1 text-center sm:text-left">
                <div>
                  <h3 className="text-sm font-normal text-slate-900">Upload & Crop Official Logo</h3>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">Upload a PNG/JPG logo. If no logo is uploaded, a clean placeholder avatar with initials will be displayed.</p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ color: '#ffffff' }}
                    className="bg-[#074887] hover:bg-[#013759] !text-white text-xs px-4 py-2 rounded-xl font-normal shadow-2xs cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>{formData.logo_url && !editorImgError ? 'Change Logo Image' : 'Upload Logo Image'}</span>
                  </button>

                  {formData.logo_url && !editorImgError && (
                    <>
                      <button
                        type="button"
                        onClick={openCropForExistingLogo}
                        style={{ color: '#0f172a' }}
                        className="bg-white hover:bg-slate-100 !text-slate-900 border border-slate-300 text-xs px-4 py-2 rounded-xl font-normal shadow-2xs cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 0L4 4m5 5l-5 5" />
                        </svg>
                        <span>Edit & Crop Logo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, logo_url: '' }))
                          setEditorImgError(false)
                        }}
                        className="text-red-600 hover:underline text-xs font-normal px-2 py-2 cursor-pointer"
                      >
                        Remove Logo
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Basic Company & Founder Info */}
            <h2 className="text-base font-normal text-[#013759] border-b border-slate-200 pb-3 pt-2">2. Identification & Founder Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2">Company Name</label>
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={handleNameChange}
                  placeholder="e.g. Bigblare Innovations LLP"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Founder Name</label>
                <input
                  type="text"
                  required
                  value={formData.founder_name}
                  onChange={(e) => setFormData({ ...formData, founder_name: e.target.value })}
                  placeholder="e.g. Mr. Shubham Kumar"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2">Women Founder</label>
                <select
                  value={formData.is_women_founder ? 'YES' : 'NO'}
                  onChange={(e) => setFormData({ ...formData, is_women_founder: e.target.value === 'YES' })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
                >
                  <option value="NO">NO (Male / Co-Founder)</option>
                  <option value="YES">YES (Women Led Venture)</option>
                </select>
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">CIN Number</label>
                <input
                  type="text"
                  value={formData.cin_number}
                  onChange={(e) => setFormData({ ...formData, cin_number: e.target.value })}
                  placeholder="e.g. AAY-4392 or U74999UP2022PTC163617"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Sector / Category</label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  placeholder="e.g. AIML, Electronics/IoT, FinTech"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>
            </div>

            {/* Section 3: Contact & Online Presence */}
            <h2 className="text-base font-normal text-[#013759] border-b border-slate-200 pb-3 pt-2">3. Contact Info & Web Presence</h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2">Website URL</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="e.g. https://bigblareinnovations.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Incubation Stage</label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
                >
                  <option value="Ideation">Ideation</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Validation">Validation</option>
                  <option value="Early Traction">Early Traction</option>
                  <option value="Scaling">Scaling</option>
                </select>
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Mobile Number</label>
                <input
                  type="text"
                  value={formData.mobile_number}
                  onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                  placeholder="e.g. 7991164254"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Email ID</label>
                <input
                  type="email"
                  value={formData.email_id}
                  onChange={(e) => setFormData({ ...formData, email_id: e.target.value })}
                  placeholder="e.g. founder@startup.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Section 4: Official Dates, Registrations & Revenue */}
            <h2 className="text-base font-normal text-[#013759] border-b border-slate-200 pb-3 pt-2">4. Registrations & Revenue Metrics</h2>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2">Incorporation Date</label>
                <input
                  type="text"
                  value={formData.date_of_incorporation}
                  onChange={(e) => setFormData({ ...formData, date_of_incorporation: e.target.value })}
                  placeholder="e.g. 2021-03-09"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Incubation Date</label>
                <input
                  type="text"
                  value={formData.date_of_incubation}
                  onChange={(e) => setFormData({ ...formData, date_of_incubation: e.target.value })}
                  placeholder="e.g. 07-11-2022"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">DPIIT Number</label>
                <input
                  type="text"
                  value={formData.dpiit_number}
                  onChange={(e) => setFormData({ ...formData, dpiit_number: e.target.value })}
                  placeholder="e.g. DIPP111398"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">StartinUP Reg. No.</label>
                <input
                  type="text"
                  value={formData.startinup_registration_number}
                  onChange={(e) => setFormData({ ...formData, startinup_registration_number: e.target.value })}
                  placeholder="e.g. R/STARTUP/UP/LKO/2023/00003810"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2">Revenue (₹ Lakhs)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.revenue_in_lakhs}
                  onChange={(e) => setFormData({ ...formData, revenue_in_lakhs: parseFloat(e.target.value) || 0.0 })}
                  placeholder="e.g. 200.0"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono font-normal"
                />
              </div>
            </div>

            {/* Section 5: Comprehensive Description */}
            <h2 className="text-base font-normal text-[#013759] border-b border-slate-200 pb-3 pt-2">5. About the StartUP Summary</h2>

            <div>
              <label className="block font-normal text-slate-800 mb-2">About the StartUP</label>
              <textarea
                rows={4}
                required
                value={formData.about_startup}
                onChange={(e) => setFormData({ ...formData, about_startup: e.target.value })}
                placeholder="Comprehensive description of product, technology, engineering innovation, and mission..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal leading-relaxed"
              />
            </div>

            {/* Section 6: Extensible Custom Fields */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-normal text-[#013759]">6. Custom Fields & Future Attributes</h3>
                  <p className="text-xs text-slate-500 font-normal">Add custom parameters such as Patent Status, Grant Sanctions, GST Registration, or Co-Founders.</p>
                </div>
                <button
                  type="button"
                  onClick={addCustomField}
                  style={{ color: '#0f172a' }}
                  className="bg-white hover:bg-slate-100 !text-slate-900 border border-slate-300 text-xs px-4 py-2 rounded-xl font-normal cursor-pointer flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Custom Field</span>
                </button>
              </div>

              {formData.custom_fields.length === 0 ? (
                <p className="text-xs text-slate-400 font-mono italic">No custom fields added yet. Click "+ Add Custom Field" above to define extra attributes.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {formData.custom_fields.map((field, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={field.key}
                        onChange={(e) => updateCustomField(idx, 'key', e.target.value)}
                        placeholder="Field Title (e.g. Patent Number)"
                        className="w-1/3 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                      />
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => updateCustomField(idx, 'value', e.target.value)}
                        placeholder="Value (e.g. 202411005891)"
                        className="flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                      />
                      <button
                        type="button"
                        onClick={() => removeCustomField(idx)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove attribute"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </form>
        </div>
      ) : (
        /* DIRECTORY VIEW */
        <div className="flex flex-col gap-6 font-normal text-slate-900">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-normal text-[#013759]">Incubated Startups Directory</h1>
            </div>

            <div className="flex items-center gap-3">
              {selectedIds.length > 0 && (
                <button
                  onClick={() => setBulkDeleteConfirmOpen(true)}
                  style={{ color: '#ffffff' }}
                  className="bg-red-600 hover:bg-red-700 !text-white text-sm font-normal px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete Selected ({selectedIds.length})</span>
                </button>
              )}

              <button
                onClick={openCreateModal}
                style={{ color: '#ffffff' }}
                className="bg-[#074887] hover:bg-[#013759] !text-white text-sm font-normal px-5 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 w-fit cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Startup</span>
              </button>
            </div>
          </div>

          {feedback.msg && (
            <div className={`p-4 rounded-xl text-sm border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
              {feedback.msg}
            </div>
          )}

          {/* Multi-Select Action Banner */}
          {selectedIds.length > 0 && (
            <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-900 font-normal shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="font-mono bg-sky-200 text-sky-900 px-2 py-0.5 rounded-lg text-xs">{selectedIds.length}</span>
                <span>startup(s) currently selected</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  style={{ color: '#0f172a' }}
                  className="bg-white hover:bg-slate-100 !text-slate-900 border border-slate-300 px-3.5 py-1.5 rounded-xl font-normal cursor-pointer transition-colors"
                >
                  {filtered.length > 0 && filtered.every(s => selectedIds.includes(s.id)) ? 'Deselect All Filtered' : 'Select All Filtered'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  style={{ color: '#0f172a' }}
                  className="bg-white hover:bg-slate-100 !text-slate-900 border border-slate-300 px-3.5 py-1.5 rounded-xl font-normal cursor-pointer transition-colors"
                >
                  Clear Selection
                </button>
                <button
                  type="button"
                  onClick={() => setBulkDeleteConfirmOpen(true)}
                  style={{ color: '#ffffff' }}
                  className="bg-red-600 hover:bg-red-700 !text-white px-4 py-1.5 rounded-xl font-normal cursor-pointer transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete Selected ({selectedIds.length})</span>
                </button>
              </div>
            </div>
          )}

          {/* Controls Bar & Filter Dropdowns */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-normal">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Search by company, founder, CIN, DPIIT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Dropdowns Bar */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-normal">
              
              {/* Sector / Startup Type Filter */}
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
              >
                <option value="ALL">All Sectors / Types</option>
                {uniqueSectors.map((sec, idx) => (
                  <option key={idx} value={sec}>{sec}</option>
                ))}
              </select>

              {/* Stage Filter */}
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
              >
                <option value="ALL">All Stages</option>
                <option value="Ideation">Ideation</option>
                <option value="Prototype">Prototype</option>
                <option value="Validation">Validation</option>
                <option value="Early Traction">Early Traction</option>
                <option value="Scaling">Scaling</option>
              </select>

              {/* Revenue Filter */}
              <select
                value={selectedRevenue}
                onChange={(e) => setSelectedRevenue(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
              >
                <option value="ALL">All Revenue</option>
                <option value="REVENUE">Revenue Generating (₹ &gt; 0)</option>
                <option value="ZERO">Non-Revenue (₹ 0.0)</option>
              </select>

              {/* Founder Gender Filter */}
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#013759] focus:outline-none font-normal cursor-pointer"
              >
                <option value="ALL">All Founders</option>
                <option value="WOMEN">Women Led Only</option>
                <option value="MALE">Male Led Only</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('TABLE')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-normal transition-colors cursor-pointer ${viewMode === 'TABLE' ? 'bg-white text-[#074887] shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Table View
                </button>
                <button
                  onClick={() => setViewMode('GRID')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-normal transition-colors cursor-pointer ${viewMode === 'GRID' ? 'bg-white text-[#074887] shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Grid View
                </button>
              </div>

              <span className="text-xs text-slate-600 font-mono shrink-0 font-normal px-2">
                Count: {filtered.length}
              </span>
            </div>
          </div>

          {/* STREAMLINED TABLE VIEW WITH MULTI-SELECT CHECKBOXES */}
          {loading ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
              <p className="text-xs text-slate-500 font-normal">Loading startups from Supabase...</p>
            </div>
          ) : viewMode === 'TABLE' ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden font-normal">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-normal text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-normal w-10 text-center">
                        <input
                          type="checkbox"
                          checked={filtered.length > 0 && filtered.every(s => selectedIds.includes(s.id))}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded border-slate-300 text-[#074887] focus:ring-0 cursor-pointer"
                        />
                      </th>
                      <th className="py-3.5 px-6 font-normal">Company Name & Sector</th>
                      <th className="py-3.5 px-6 font-normal">Founder & Contact</th>
                      <th className="py-3.5 px-6 font-normal">Stage & Revenue</th>
                      <th className="py-3.5 px-6 text-right font-normal w-36">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((item) => {
                      const p = parse16Columns(item)
                      const hasBrokenImg = imgErrorMap[item.id]
                      const isSelected = selectedIds.includes(item.id)

                      return (
                        <tr key={item.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-sky-50/40' : ''}`}>
                          <td className="py-4 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelect(item.id)}
                              className="w-4 h-4 rounded border-slate-300 text-[#074887] focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                                {p.logo_url && !hasBrokenImg ? (
                                  <img
                                    src={p.logo_url}
                                    alt={p.company_name}
                                    onError={() => setImgErrorMap(prev => ({ ...prev, [item.id]: true }))}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <span className="text-[11px] font-mono font-normal text-[#013759]">{getInitials(p.company_name)}</span>
                                )}
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-normal text-slate-900 text-sm">{p.company_name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="inline-block bg-sky-50 text-[#074887] text-[10px] font-normal px-2 py-0.5 rounded border border-sky-100">
                                    {p.sector}
                                  </span>
                                  {p.cin_number !== 'N/A' && (
                                    <span className="font-mono text-slate-400 text-[10px]">CIN: {p.cin_number}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-normal text-slate-900 text-xs">{p.founder_name}</span>
                                {p.is_women_founder && (
                                  <span className="bg-pink-50 text-pink-700 text-[9px] px-1.5 py-0.5 rounded border border-pink-200 font-normal">
                                    Women Founder
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                                {p.mobile_number !== 'N/A' && <span>{p.mobile_number}</span>}
                                {p.email_id !== 'N/A' && <span className="truncate max-w-[160px]">{p.email_id}</span>}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-700 font-mono">Stage: {p.stage}</span>
                              {p.revenue_in_lakhs > 0 && (
                                <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-mono font-normal px-2.5 py-0.5 rounded-lg border border-emerald-200 shadow-2xs">
                                  ₹{p.revenue_in_lakhs}L Rev
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right font-normal">
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => openEditModal(item)}
                                className="text-[#074887] hover:underline text-xs font-normal cursor-pointer"
                              >
                                Edit Startup
                              </button>
                              <span className="text-slate-300">|</span>
                              <button
                                onClick={() => setDeleteConfirmId(item.id)}
                                className="text-red-600 hover:underline text-xs font-normal cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* CLEAN MODERN SAAS GRID VIEW WITH MULTI-SELECT */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-normal">
              {filtered.map((item) => {
                const p = parse16Columns(item)
                const hasBrokenImg = imgErrorMap[item.id]
                const isSelected = selectedIds.includes(item.id)

                return (
                  <div key={item.id} className={`bg-white rounded-2xl border ${isSelected ? 'border-[#074887] ring-1 ring-[#074887] bg-sky-50/10' : 'border-slate-200/90'} shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 p-6 flex flex-col justify-between gap-5 group relative`}>
                    
                    {/* Top Header Row with Checkbox, Logo & Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(item.id)}
                          className="w-4 h-4 rounded border-slate-300 text-[#074887] focus:ring-0 cursor-pointer mt-1 shrink-0"
                        />
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-slate-300 transition-colors">
                          {p.logo_url && !hasBrokenImg ? (
                            <img
                              src={p.logo_url}
                              alt={p.company_name}
                              onError={() => setImgErrorMap(prev => ({ ...prev, [item.id]: true }))}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-base font-mono text-[#013759] font-normal">{getInitials(p.company_name)}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="bg-sky-50 text-[#074887] text-[11px] font-normal px-2.5 py-0.5 rounded-lg border border-sky-100">
                          {p.sector}
                        </span>
                        {p.revenue_in_lakhs > 0 ? (
                          <span className="bg-emerald-50 text-emerald-800 text-[11px] font-mono font-normal px-2.5 py-0.5 rounded-lg border border-emerald-200">
                            ₹{p.revenue_in_lakhs}L Rev
                          </span>
                        ) : p.is_women_founder ? (
                          <span className="bg-pink-50 text-pink-700 text-[10px] font-normal px-2 py-0.5 rounded-lg border border-pink-200">
                            Women Led
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Company Title & Founder Info */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-normal text-[#013759] tracking-tight group-hover:text-[#074887] transition-colors line-clamp-1">
                        {p.company_name}
                      </h3>
                      <p className="text-xs text-slate-500 font-normal">
                        Founder: <span className="text-slate-800 font-normal">{p.founder_name}</span>
                      </p>
                    </div>

                    {/* About Startup */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {p.about_startup}
                    </p>

                    {/* Technical Data Matrix */}
                    <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 flex flex-col gap-1.5 text-[11px] font-mono text-slate-600 mt-auto">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">CIN:</span>
                        <span className="text-slate-900">{p.cin_number}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Revenue:</span>
                        <span className="text-emerald-700 font-normal">₹{p.revenue_in_lakhs} Lakhs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Stage:</span>
                        <span className="text-slate-900">{p.stage}</span>
                      </div>
                      {p.custom_fields.length > 0 && (
                        <div className="border-t border-slate-200/80 pt-1.5 mt-1 flex flex-col gap-1">
                          {p.custom_fields.map((cf, idx) => (
                            <div key={idx} className="flex justify-between text-[10px] text-purple-700">
                              <span>{cf.key}:</span>
                              <span>{cf.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400 text-[11px]">Venture</span>
                      <div className="flex items-center gap-3 font-normal">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-[#074887] hover:underline cursor-pointer"
                        >
                          Edit Startup
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="text-red-600 hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          )}
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
            <h3 className="text-base font-normal text-[#013759]">Confirm Deletion</h3>
            <p className="text-xs text-slate-600 font-normal">
              Are you sure you want to permanently delete this startup record?
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

      {/* Bulk Delete Confirmation Modal */}
      {bulkDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-normal">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 flex flex-col gap-4 text-center font-normal">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-base font-normal text-[#013759]">Confirm Bulk Deletion</h3>
            <p className="text-xs text-slate-600 font-normal">
              Are you sure you want to permanently delete <span className="font-mono text-slate-900">{selectedIds.length}</span> selected startup(s)? This action cannot be undone.
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
                {submitting ? 'Deleting...' : `Yes, Delete (${selectedIds.length})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Image Cropper Modal */}
      {cropperOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 font-normal">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 0L4 4m5 5l-5 5" />
                </svg>
                <h3 className="font-normal text-sm">Crop & Adjust Startup Logo</h3>
              </div>
              <button
                onClick={() => setCropperOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative w-full h-80 bg-slate-950">
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
            </div>

            {/* Cropper Controls Bar */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col gap-4 text-xs font-normal">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                
                {/* Aspect Ratio Picker */}
                <div className="flex flex-col gap-1">
                  <label className="text-slate-700 font-normal">Aspect Ratio:</label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setAspect(1)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-normal transition-colors cursor-pointer ${aspect === 1 ? 'bg-[#074887] text-white border-[#074887]' : 'bg-white text-slate-700 border-slate-300'}`}
                    >
                      1:1 Square
                    </button>
                    <button
                      type="button"
                      onClick={() => setAspect(16 / 9)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-normal transition-colors cursor-pointer ${aspect === 16 / 9 ? 'bg-[#074887] text-white border-[#074887]' : 'bg-white text-slate-700 border-slate-300'}`}
                    >
                      16:9 Landscape
                    </button>
                  </div>
                </div>

                {/* Zoom Control */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-slate-700 font-normal">
                    <span>Zoom:</span>
                    <span className="font-mono">{zoom.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#074887]"
                  />
                </div>

                {/* Rotate Control */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-slate-700 font-normal">
                    <span>Rotation:</span>
                    <span className="font-mono">{rotation}°</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRotation(r => (r - 90) % 360)}
                      className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer font-normal"
                    >
                      -90°
                    </button>
                    <button
                      type="button"
                      onClick={() => setRotation(r => (r + 90) % 360)}
                      className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer font-normal"
                    >
                      +90°
                    </button>
                    <button
                      type="button"
                      onClick={() => setRotation(0)}
                      className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer text-slate-500 font-normal"
                    >
                      Reset
                    </button>
                  </div>
                </div>

              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCropperOpen(false)}
                  style={{ color: '#0f172a' }}
                  className="bg-white hover:bg-slate-100 !text-slate-900 border border-slate-300 text-xs px-4 py-2 rounded-xl font-normal cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCroppedImage}
                  style={{ color: '#ffffff' }}
                  className="bg-[#074887] hover:bg-[#013759] !text-white text-xs px-5 py-2 rounded-xl font-normal shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Apply Crop & Save Logo</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
