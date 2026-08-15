import React, { useState, useEffect, useRef } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '../utils/cropImage'
import {
  getAllFacilitiesAdmin,
  createFacility,
  updateFacility,
  deleteFacility,
  deleteFacilitiesBulk
} from '../services/generalizedAdminService'

// Exact cropped images for all 27 individual facilities
import imgFormlabsSla from '../../assets/navrachna_images/facilities/formlabs-sla-3d-printer.png'
import imgPlaFdm from '../../assets/navrachna_images/facilities/pla-fdm-3d-printer.png'
import imgSmdRework from '../../assets/navrachna_images/facilities/smd-rework-station.png'
import imgDcPower from '../../assets/navrachna_images/facilities/dc-regulated-power-supply.png'
import imgDso from '../../assets/navrachna_images/facilities/digital-storage-oscilloscope.png'
import imgWaveformGen from '../../assets/navrachna_images/facilities/arbitrary-waveform-generator.png'
import imgMultimeter from '../../assets/navrachna_images/facilities/digital-benchtop-multimeter.png'
import imgDeepFreezer from '../../assets/navrachna_images/facilities/deep-freezer-cabinet.png'
import imgVacuumOven from '../../assets/navrachna_images/facilities/vacuum-drying-oven.png'
import imgElecBench from '../../assets/navrachna_images/facilities/electronics-assembly-lab.png'
import imgGpuCluster from '../../assets/navrachna_images/facilities/high-end-ai-gpu-workstations.png'

import imgPlasmaCutter from '../../assets/navrachna_images/facilities/cnc-plasma-cutting-machine.png'
import imgLaserCutter from '../../assets/navrachna_images/facilities/co2-laser-cutting-machine.png'
import imgMigWelder from '../../assets/navrachna_images/facilities/mig-welding-machine.png'
import imgArcWelder from '../../assets/navrachna_images/facilities/arc-welding-machine.png'
import imgChopSaw from '../../assets/navrachna_images/facilities/heavy-duty-chop-saw.png'
import imgVinylPlotter from '../../assets/navrachna_images/facilities/vinyl-cutting-plotter.png'
import imgCoilWinder from '../../assets/navrachna_images/facilities/automatic-coil-winding-machine.png'
import imgPortableMig from '../../assets/navrachna_images/facilities/portable-mig-welder-unit.png'
import imgPcbDrill from '../../assets/navrachna_images/facilities/high-speed-pcb-drilling-machine.png'
import imgPillarDrill from '../../assets/navrachna_images/facilities/heavy-duty-pillar-drill-machine.png'

import imgMatlab from '../../assets/navrachna_images/facilities/matlab-simulation-suite.png'
import imgOrCad from '../../assets/navrachna_images/facilities/cadence-orcad-pcb-suite.png'
import imgRockwell from '../../assets/navrachna_images/facilities/rockwell-automation-suite.png'
import imgIntelUnnati from '../../assets/navrachna_images/facilities/intel-unnati-ai-lab-suite.png'
import imgSmc from '../../assets/navrachna_images/facilities/smc-pneumatics-automation-suite.png'
import imgLabView from '../../assets/navrachna_images/facilities/national-instruments-labview-suite.png'

const facilityImageMap = {
  'formlabs-sla-3d-printer': imgFormlabsSla,
  'pla-fdm-3d-printer': imgPlaFdm,
  'smd-rework-station': imgSmdRework,
  'dc-regulated-power-supply': imgDcPower,
  'digital-storage-oscilloscope': imgDso,
  'arbitrary-waveform-generator': imgWaveformGen,
  'digital-benchtop-multimeter': imgMultimeter,
  'deep-freezer-cabinet': imgDeepFreezer,
  'vacuum-drying-oven': imgVacuumOven,
  'electronics-assembly-lab': imgElecBench,
  'high-end-ai-gpu-workstations': imgGpuCluster,

  'cnc-plasma-cutting-machine': imgPlasmaCutter,
  'co2-laser-cutting-machine': imgLaserCutter,
  'mig-welding-machine': imgMigWelder,
  'arc-welding-machine': imgArcWelder,
  'heavy-duty-chop-saw': imgChopSaw,
  'vinyl-cutting-plotter': imgVinylPlotter,
  'automatic-coil-winding-machine': imgCoilWinder,
  'portable-mig-welder-unit': imgPortableMig,
  'high-speed-pcb-drilling-machine': imgPcbDrill,
  'heavy-duty-pillar-drill-machine': imgPillarDrill,

  'matlab-simulation-suite': imgMatlab,
  'cadence-orcad-pcb-suite': imgOrCad,
  'rockwell-automation-suite': imgRockwell,
  'intel-unnati-ai-lab-suite': imgIntelUnnati,
  'smc-pneumatics-automation-suite': imgSmc,
  'national-instruments-labview-suite': imgLabView,
}

export function AdminFacilitiesPage() {
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [viewMode, setViewMode] = useState('GRID') // 'GRID' or 'TABLE'
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  // Track page edit mode state in ref to prevent stale async cropper popups
  const isEditingPageRef = useRef(isEditingPage)
  useEffect(() => {
    isEditingPageRef.current = isEditingPage
    if (!isEditingPage) {
      setCropperOpen(false)
    }
  }, [isEditingPage])

  // React Easy Crop Modal State
  const [cropperOpen, setCropperOpen] = useState(false)
  const [cropSrc, setCropSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspect, setAspect] = useState(16 / 9)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    capacity: 1,
    summary: '',
    hardware_specs: '',
    cover_image_url: ''
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

  const loadFacilities = async () => {
    setLoading(true)
    const { data } = await getAllFacilitiesAdmin()
    setFacilities(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadFacilities()
  }, [])

  const getImageForFacility = (item, allowFallback = true) => {
    if (!item) return allowFallback ? imgFormlabsSla : null
    // Custom uploaded image (Base64 data URL or HTTP Supabase Storage URL)
    if (
      item.cover_image_url && 
      (item.cover_image_url.startsWith('data:image') || 
       item.cover_image_url.startsWith('http://') || 
       item.cover_image_url.startsWith('https://'))
    ) {
      return item.cover_image_url
    }
    // Individual asset image for facility slug
    if (item.slug && facilityImageMap[item.slug]) {
      return facilityImageMap[item.slug]
    }
    // Fallback to stored cover_image_url if present
    if (item.cover_image_url && item.cover_image_url.trim() !== '') {
      return item.cover_image_url
    }
    return allowFallback ? imgFormlabsSla : null
  }

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData({
      name: '',
      slug: '',
      category: '',
      capacity: 1,
      summary: '',
      hardware_specs: '',
      cover_image_url: ''
    })
    setIsEditingPage(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    const catName = (Array.isArray(item.specs_summary) && item.specs_summary[0]) || item.category || ''
    const specDetails = (Array.isArray(item.specs_summary) && item.specs_summary.slice(1).join(', ')) || item.hardware_specs || ''
    const summaryText = item.summary || item.detail || item.description || ''

    const mappedImg = getImageForFacility(item)
    const validCoverUrl = (
      item.cover_image_url && 
      (item.cover_image_url.startsWith('data:image') || 
       item.cover_image_url.startsWith('http://') || 
       item.cover_image_url.startsWith('https://'))
    ) ? item.cover_image_url : mappedImg

    setFormData({
      name: item.title || item.name || '',
      slug: item.slug || '',
      category: catName,
      capacity: item.capacity || 1,
      summary: summaryText,
      hardware_specs: specDetails,
      cover_image_url: validCoverUrl
    })
    setIsEditingPage(true)
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, name, slug: editingItem ? formData.slug : slug })
  }

  // File Upload -> Opens Cropper Modal
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

  // Convert image URL to Data URL for bulletproof canvas loading
  const urlToDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/jpeg'))
      }
      img.onerror = () => {
        const img2 = new Image()
        img2.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img2.width
          canvas.height = img2.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img2, 0, 0)
          resolve(canvas.toDataURL('image/jpeg'))
        }
        img2.onerror = reject
        img2.src = url
      }
      img.src = url
    })
  }

  const openCropperWithExistingImage = async () => {
    try {
      const rawSrc = getImageForFacility({ slug: formData.slug, cover_image_url: formData.cover_image_url }, false)
      if (!rawSrc) return
      let finalSrc = rawSrc
      if (typeof rawSrc === 'string' && !rawSrc.startsWith('data:')) {
        finalSrc = await urlToDataURL(rawSrc)
      }
      setCropSrc(finalSrc)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setRotation(0)
      setCropperOpen(true)
    } catch (err) {
      console.error('Cropper loading error:', err)
      const rawSrc = getImageForFacility({ slug: formData.slug, cover_image_url: formData.cover_image_url }, false)
      if (!rawSrc) return
      setCropSrc(rawSrc)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setRotation(0)
      setCropperOpen(true)
    }
  }

  const onCropComplete = (croppedArea, pixelCrop) => {
    setCroppedAreaPixels(pixelCrop)
  }

  const handleSaveCroppedImage = async () => {
    try {
      if (!croppedAreaPixels) return
      const croppedImageBase64 = await getCroppedImg(cropSrc, croppedAreaPixels, rotation)
      if (croppedImageBase64) {
        setFormData(prev => ({ ...prev, cover_image_url: croppedImageBase64 }))
        setCropperOpen(false)
        setFeedback({ type: 'success', msg: 'Image cropped successfully! Click "Save Facility" to save changes.' })
      }
    } catch (err) {
      console.error('Crop error:', err)
      setFeedback({ type: 'error', msg: 'Could not crop image. Please try uploading a local image file.' })
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })

    const specsArr = [formData.category, ...formData.hardware_specs.split(',').map(s => s.trim()).filter(Boolean)]

    const payload = {
      title: formData.name,
      slug: formData.slug,
      summary: formData.summary || formData.hardware_specs || formData.name,
      description: formData.summary || formData.hardware_specs,
      cover_image_url: formData.cover_image_url || '/src/assets/navrachna_images/spaces/3d_printing.jpg',
      specs_summary: specsArr,
      is_active: true
    }

    if (editingItem) {
      const { error } = await updateFacility(editingItem.id, payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error updating facility: ${error.message}` })
      } else {
        setFacilities(prev => prev.map(f => f.id === editingItem.id ? { ...f, ...payload } : f))
        setFeedback({ type: 'success', msg: 'Facility updated successfully!' })
        setIsEditingPage(false)
        loadFacilities()
      }
    } else {
      const { data, error } = await createFacility(payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error creating facility: ${error.message}` })
      } else {
        if (data) {
          setFacilities(prev => [data, ...prev])
        }
        setFeedback({ type: 'success', msg: 'Facility created successfully!' })
        setIsEditingPage(false)
        loadFacilities()
      }
    }
    setSubmitting(false)
  }

  const [selectedIds, setSelectedIds] = useState([])
  const [bulkDeleteConfirmOpen, setBulkDeleteConfirmOpen] = useState(false)

  const handleDelete = async (id) => {
    setSubmitting(true)
    const { error } = await deleteFacility(id)
    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting facility: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: 'Facility deleted successfully!' })
      setFacilities(prev => prev.filter(f => f.id !== id))
      setSelectedIds(prev => prev.filter(i => i !== id))
      setDeleteConfirmId(null)
      loadFacilities()
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

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    setSubmitting(true)
    const { error } = await deleteFacilitiesBulk(selectedIds)
    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting selected facilities: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: `Successfully deleted ${selectedIds.length} facilities!` })
      setFacilities(prev => prev.filter(f => !selectedIds.includes(f.id)))
      setSelectedIds([])
      setBulkDeleteConfirmOpen(false)
    }
    setSubmitting(false)
  }

  const categoriesList = [
    'ALL',
    '3D Printing & Additive Manufacturing',
    'Electronics & PCB Prototyping',
    'Compute & AI Simulation',
    'Fabrication & Metalwork',
    'Software & Academic Licenses',
    'Testing & Sample Preservation'
  ]

  const filtered = facilities.filter(f => {
    const titleMatch = (f.title || f.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    const slugMatch = (f.slug || '').toLowerCase().includes(searchQuery.toLowerCase())
    const specMatch = (f.summary || f.hardware_specs || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSearch = titleMatch || slugMatch || specMatch

    const facCat = (Array.isArray(f.specs_summary) && f.specs_summary[0]) || f.category || ''
    const matchesCat = selectedCategory === 'ALL' || facCat.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCat
  })

  const currentFormImg = getImageForFacility({ slug: formData.slug, cover_image_url: formData.cover_image_url }, false)

  return (
    <>
      {isEditingPage ? (
        /* Full Page Editor View */
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
                  <span>Back to Infrastructure List</span>
                </button>
                <span>/</span>
                <span>{editingItem ? 'Edit Facility' : 'Add Facility'}</span>
              </div>
              <h1 className="text-2xl font-normal text-[#013759] mt-1">
                {editingItem ? `Editing: ${editingItem.title || editingItem.name}` : 'Create New Infrastructure Facility'}
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
                <span>{submitting ? 'Saving...' : 'Save Facility'}</span>
              </button>
            </div>
          </div>

          {feedback.msg && (
            <div className={`p-4 rounded-xl text-sm border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
              {feedback.msg}
            </div>
          )}

          <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 text-sm sm:text-base font-normal">
            <h2 className="text-lg font-normal text-[#013759] border-b border-slate-200 pb-3">Facility Details & Photo</h2>

            {/* Image Cropper Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-64 h-48 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative shadow-2xs flex flex-col items-center justify-center">
                {currentFormImg ? (
                  <>
                    <img 
                      src={currentFormImg} 
                      alt="Facility Preview" 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                      Current Photo
                    </span>
                  </>
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
                <h3 className="text-base font-normal text-[#013759]">Facility Photo</h3>
                <p className="text-xs text-slate-600 font-normal">
                  {currentFormImg 
                    ? 'Upload a new photo or crop the existing image to pan, zoom, and rotate.'
                    : 'Upload a photo for this facility. You can crop, pan, zoom, and rotate after selecting an image.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 font-normal">
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden" 
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ color: '#ffffff' }}
                    className="bg-[#074887] hover:bg-[#013759] !text-white text-xs px-4 py-2.5 rounded-xl font-normal cursor-pointer shadow-2xs flex items-center gap-1.5 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Upload New Image</span>
                  </button>

                  {currentFormImg && (
                    <button
                      type="button"
                      onClick={openCropperWithExistingImage}
                      style={{ color: '#0f172a' }}
                      className="bg-white hover:bg-slate-100 !text-slate-900 text-xs px-4 py-2.5 rounded-xl font-normal cursor-pointer border border-slate-300 shadow-2xs flex items-center gap-1.5 transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 0L4 4m5.121 5.121L4 14.121" />
                      </svg>
                      <span>Crop Image</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2 text-sm">Facility / Machine Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Formlabs SLA 3D Printing Machine"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2 text-sm">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-normal text-slate-800 mb-2 text-sm">Infrastructure Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                >
                  <option value="" disabled>Select Infrastructure Category</option>
                  <option value="3D Printing & Additive Manufacturing">3D Printing & Additive Manufacturing</option>
                  <option value="Electronics & PCB Prototyping">Electronics & PCB Prototyping</option>
                  <option value="Compute & AI Simulation">Compute & AI Simulation</option>
                  <option value="Fabrication & Metalwork">Fabrication & Metalwork</option>
                  <option value="Software & Academic Licenses">Software & Academic Licenses</option>
                  <option value="Testing & Sample Preservation">Testing & Sample Preservation</option>
                </select>
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-2 text-sm">Units / Workstation Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-2 text-sm">Facility Overview / Description</label>
              <textarea
                rows={3}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="e.g. Graphical programming & virtual instrumentation software suite with DAQ drivers for automated testing."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal leading-relaxed mb-6"
              />
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-2 text-sm">Hardware & Technical Specifications (Comma Separated)</label>
              <textarea
                rows={3}
                value={formData.hardware_specs}
                onChange={(e) => setFormData({ ...formData, hardware_specs: e.target.value })}
                placeholder="e.g. Formlabs SLA Resin Tech, Micron Precision, Biocompatible Resins"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal leading-relaxed"
              />
            </div>
          </form>
        </div>
      ) : (
        /* Infrastructure List View */
        <div className="flex flex-col gap-8 font-normal text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-normal text-[#013759]">Infrastructure & Facilities</h1>
        </div>
        <button
          onClick={openCreateModal}
          style={{ color: '#ffffff' }}
          className="bg-[#074887] hover:bg-[#013759] !text-white text-sm font-normal px-5 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 w-fit cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span style={{ color: '#ffffff' }} className="!text-white">Add Facility</span>
        </button>
      </div>

      {feedback.msg && (
        <div className={`p-4 rounded-xl text-sm border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {feedback.msg}
        </div>
      )}

      {/* Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-normal">
        
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search facilities, machines, or specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal cursor-pointer shadow-2xs hover:border-slate-400 transition-colors max-w-xs"
            >
              <option value="ALL">All Categories ({facilities.length})</option>
              {categoriesList.filter(c => c !== 'ALL').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
          <span className="text-sm text-slate-600 font-mono shrink-0 font-normal">
            {filtered.length}
          </span>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('GRID')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-normal transition-colors cursor-pointer flex items-center gap-1.5 ${viewMode === 'GRID' ? 'bg-white text-[#013759] shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('TABLE')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-normal transition-colors cursor-pointer flex items-center gap-1.5 ${viewMode === 'TABLE' ? 'bg-white text-[#013759] shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Select Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 font-normal shadow-2xs">
          <div className="flex items-center gap-3">
            <span style={{ color: '#ffffff' }} className="bg-[#074887] !text-white text-xs font-mono px-3 py-1 rounded-full font-normal">
              {selectedIds.length} Selected
            </span>
            <span className="text-sm text-slate-700 font-normal">
              Select facilities to perform bulk management actions.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              style={{ color: '#0f172a' }}
              className="bg-white hover:bg-slate-100 !text-slate-900 text-xs px-4 py-2 rounded-xl font-normal cursor-pointer border border-slate-300 transition-colors"
            >
              Deselect All
            </button>
            <button
              type="button"
              onClick={() => setBulkDeleteConfirmOpen(true)}
              style={{ color: '#ffffff' }}
              className="bg-red-600 hover:bg-red-700 !text-white text-xs px-4 py-2 rounded-xl font-normal shadow-2xs cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#013759] mx-auto mb-4" />
          <p className="text-sm text-slate-600 font-normal">Loading facilities from Supabase...</p>
        </div>
      ) : filtered.length > 0 ? (
        viewMode === 'GRID' ? (
          
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-normal">
            {filtered.map((item) => {
              const imgSrc = getImageForFacility(item)
              const catName = (Array.isArray(item.specs_summary) && item.specs_summary[0]) || item.category || 'LAB EQUIPMENT'
              const specsPills = Array.isArray(item.specs_summary) ? item.specs_summary.slice(1) : []
              const isSelected = selectedIds.includes(item.id)

              return (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl border ${isSelected ? 'border-[#074887] ring-2 ring-[#074887]/20 bg-sky-50/20' : 'border-slate-200 hover:shadow-md'} shadow-xs transition-all flex flex-col justify-between overflow-hidden group relative`}
                >
                  <div>
                    <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                      <div className="absolute top-3 left-3 z-10">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(item.id)}
                          className="w-5 h-5 accent-[#074887] rounded cursor-pointer shadow-xs"
                        />
                      </div>
                      <img 
                        src={imgSrc} 
                        alt={item.title || item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#074887] text-xs font-normal px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                        {catName}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col gap-3">
                      <div>
                        <h3 className="text-lg font-normal text-[#013759] leading-snug">
                          {item.title || item.name}
                        </h3>
                        <span className="font-mono text-xs text-slate-400">/{item.slug}</span>
                      </div>

                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {item.summary || item.description || item.hardware_specs}
                      </p>

                      {specsPills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {specsPills.map((tag, idx) => (
                            <span key={idx} className="bg-sky-50 text-[#013759] border border-sky-100 px-2 py-0.5 rounded text-[11px] font-normal">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">{item.capacity || 1} Unit</span>
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
          
          /* TABLE VIEW */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden font-normal">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-normal text-xs tracking-wider">
                  <tr>
                    <th className="py-4 px-4 font-normal w-12 text-center">
                      <input
                        type="checkbox"
                        checked={filtered.length > 0 && filtered.every(f => selectedIds.includes(f.id))}
                        onChange={() => handleToggleSelectAll(filtered)}
                        className="w-4 h-4 accent-[#074887] rounded cursor-pointer"
                      />
                    </th>
                    <th className="py-4 px-5 font-normal">Facility & Image</th>
                    <th className="py-4 px-5 font-normal">Category</th>
                    <th className="py-4 px-5 font-normal">Capacity</th>
                    <th className="py-4 px-5 font-normal">Technical Specs</th>
                    <th className="py-4 px-5 text-right font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((item) => {
                    const imgSrc = getImageForFacility(item)
                    const catName = (Array.isArray(item.specs_summary) && item.specs_summary[0]) || item.category || 'LAB EQUIPMENT'
                    const specsPills = Array.isArray(item.specs_summary) ? item.specs_summary.slice(1).join(' • ') : (item.summary || item.hardware_specs || 'N/A')
                    const isSelected = selectedIds.includes(item.id)

                    return (
                      <tr key={item.id} className={`${isSelected ? 'bg-sky-50/70' : 'hover:bg-slate-50/80'} transition-colors`}>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectOne(item.id)}
                            className="w-4 h-4 accent-[#074887] rounded cursor-pointer"
                          />
                        </td>
                        <td className="py-4 px-5 font-normal text-slate-900">
                          <div className="flex items-center gap-4">
                            <img 
                              src={imgSrc} 
                              alt={item.title || item.name} 
                              className="w-16 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <div className="flex flex-col">
                              <span className="font-normal text-slate-900 text-base">{item.title || item.name}</span>
                              <span className="font-mono text-slate-400 text-xs">/{item.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <span className="inline-block bg-sky-50 text-[#074887] text-xs font-normal px-3 py-1 rounded-lg border border-sky-100">
                            {catName}
                          </span>
                        </td>
                        <td className="py-4 px-5 font-mono text-sm">{item.capacity || 1} Unit</td>
                        <td className="py-4 px-5 text-slate-600 text-sm sm:text-base max-w-xs truncate">
                          {specsPills}
                        </td>
                        <td className="py-4 px-5 text-right font-normal">
                          <div className="flex items-center justify-end gap-3 text-sm">
                            <button
                              onClick={() => openEditModal(item)}
                              className="text-[#074887] hover:underline font-normal cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="text-red-600 hover:underline font-normal cursor-pointer"
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
        )
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs text-slate-500 text-sm font-normal">
          No facilities found matching your search or category filter. Click "Add Facility" to create one.
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
            <h3 className="text-base font-normal text-slate-900">Delete Selected Facilities</h3>
            <p className="text-xs text-slate-600 font-normal">
              Are you sure you want to permanently delete <strong className="font-normal text-slate-900">{selectedIds.length} selected facility(ies)</strong>? This action cannot be undone.
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
                className="bg-red-600 hover:bg-red-700 !text-white text-xs px-4 py-2.5 rounded-xl font-normal shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Deleting...' : `Delete ${selectedIds.length} Facilities`}
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
              Are you sure you want to permanently delete this facility?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-normal">
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-4 py-2 rounded-xl font-normal cursor-pointer border border-slate-300"
              >
                Cancel
              </button>
              <button
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
        </div>
      )}

      {/* Native react-easy-crop Image Cropper Modal */}
      {cropperOpen && cropSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-normal">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 flex flex-col gap-4 font-normal">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-normal text-[#013759] flex items-center gap-2">
                <svg className="w-5 h-5 text-[#074887]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 0L4 4m5.121 5.121L4 14.121" />
                </svg>
                <span>Crop Facility Image</span>
              </h3>
              <button
                onClick={() => setCropperOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-normal cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Cropper Container */}
            <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden shadow-inner border border-slate-800">
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: { width: '100%', height: '100%', position: 'relative' },
                  mediaStyle: { maxWidth: '100%', maxHeight: '100%' }
                }}
              />
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-normal">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Zoom */}
                <div className="flex flex-col gap-1">
                  <label className="text-slate-700 font-normal">Zoom ({Math.round(zoom * 100)}%)</label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="accent-[#074887] cursor-pointer"
                  />
                </div>

                {/* Aspect Ratio */}
                <div className="flex flex-col gap-1">
                  <label className="text-slate-700 font-normal">Aspect Ratio</label>
                  <select
                    value={aspect}
                    onChange={(e) => setAspect(Number(e.target.value))}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value={16 / 9}>16:9 Banner</option>
                    <option value={4 / 3}>4:3 Standard</option>
                    <option value={1}>1:1 Square</option>
                  </select>
                </div>

              </div>

              {/* Rotation buttons */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-xs">
                <span className="text-slate-600 font-normal">Rotate: {rotation}°</span>
                <div className="flex items-center gap-2 font-normal">
                  <button
                    type="button"
                    onClick={() => setRotation(r => (r - 90) % 360)}
                    style={{ color: '#0f172a' }}
                    className="bg-white hover:bg-slate-100 !text-slate-900 border border-slate-300 px-3 py-1 rounded-lg font-normal cursor-pointer"
                  >
                    ↺ Rotate Left
                  </button>
                  <button
                    type="button"
                    onClick={() => setRotation(r => (r + 90) % 360)}
                    style={{ color: '#0f172a' }}
                    className="bg-white hover:bg-slate-100 !text-slate-900 border border-slate-300 px-3 py-1 rounded-lg font-normal cursor-pointer"
                  >
                    ↻ Rotate Right
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
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
                className="bg-[#074887] hover:bg-[#013759] !text-white text-xs px-5 py-2 rounded-xl font-normal shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Apply Crop & Use Image</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </>
  )
}
