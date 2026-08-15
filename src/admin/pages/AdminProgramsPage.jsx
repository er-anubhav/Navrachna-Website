import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import {
  getAllProgramsAdmin,
  createProgram,
  updateProgram,
  deleteProgram
} from '../services/generalizedAdminService'
import { getFacilityImage } from '../../utils/facilityImageMap'

function MetricIconPreview({ type }) {
  switch (type) {
    case 'bulb':
      return (
        <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    case 'document':
      return (
        <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    case 'rocket':
      return (
        <svg className="w-5 h-5 text-sky-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'award':
      return (
        <svg className="w-5 h-5 text-purple-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    case 'cpu':
      return (
        <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'money':
    default:
      return (
        <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
  }
}

export function AdminProgramsPage() {
  const [programs, setPrograms] = useState([])
  const [allDbFacilities, setAllDbFacilities] = useState([])
  const [allDbProjects, setAllDbProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [facilitySearchQuery, setFacilitySearchQuery] = useState('')
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'grant_scheme',
    tagline: '',
    grant_amount: '',
    nodal_agency: '',
    logo_url: '',
    description: '',
    is_active: true,
    display_order: 0,
    selectedFacilityIds: [],
    selectedProjectIds: [],
    portfolio_category: 'all',
    portfolio_title: 'Funded Student Prototype Projects',
    eligibility: ['Students & Researchers', 'Alumni Founders', 'Innovators & Early-stage Founders'],
    mandates: [
      { title: 'Technology Commercialization', desc: 'Translational R&D support to convert university research into scalable commercial products.', icon: 'cpu' },
      { title: 'Job Creation & Venture Scaling', desc: 'Accelerating high-value employment opportunities and local entrepreneurial ecosystem growth.', icon: 'briefcase' },
      { title: 'Skill Development & Training', desc: 'Incubation bootcamps, technical masterclasses, and executive mentorship workshops.', icon: 'award' }
    ],
    stats: [
      { value: '500+', label: 'Ideas Received', sub: 'Total Submissions', type: 'bulb' },
      { value: '75+', label: 'Projects Supported', sub: 'Funded & mentored', type: 'document' },
      { value: '20+', label: 'Ventures Incubated', sub: 'Resident Startups', type: 'rocket' },
      { value: '₹2.87 Cr+', label: 'Innovation Support', sub: 'Approved Funding', type: 'money' }
    ],
    incentives: [
      { title: 'Prototype Development Support', category: 'GRANT', amount: 'Up to ₹2.5 Lakhs', duration: 'Per Project', desc: 'Direct financial grant support credited for purchasing hardware, components, and prototyping tools.', tag: 'Non-Dilutive Capital' },
      { title: 'Fab Lab Machinery Access', category: 'INFRASTRUCTURE', amount: 'Free 24/7 Access', duration: 'Full Incubation', desc: 'Full access to high-precision CNC CO₂ Laser Cutters, CNC Plasma Cutters, and SLA Resin printers.', tag: 'State-of-the-Art Fab Lab' },
      { title: 'Executive Mentorship', category: 'ADVISORY', amount: 'Dedicated Advisors', duration: 'Technical Guidance', desc: 'Personalized guidance from senior faculty advisors and industry veterans.', tag: 'Industry Advisory' },
      { title: 'Patent & IPR Support', category: 'IPR SUPPORT', amount: 'Fully Reimbursed', duration: 'IP Protection', desc: 'Assistance covering official government patent filing fees, agent search fees, and trademark protection.', tag: '100% Fee Reimbursement' }
    ],
    steps: [
      { step: 'STEP 01', title: 'Submit Incubation Form', desc: 'Fill out the incubation request form with details of your technology concept and team background.', color: '#10b981' },
      { step: 'STEP 02', title: 'Diagnostic Pitch Evaluation', desc: 'Our screening committee will review your submission and reach back within 48 hours to schedule a pitch.', color: '#3b82f6' },
      { step: 'STEP 03', title: 'Board Alignment & Grant Sanction', desc: 'Present before the incubation board to lock in your desk allocation, grant eligibility, and Fab Lab pass.', color: '#8b5cf6' },
      { step: 'STEP 04', title: 'Launch & Commercial Scale', desc: 'Formally launch in our state-of-the-art facilities! Achieve progress milestones and scale your venture.', color: '#ec4899' }
    ],
    faqs: [
      { question: 'Who is eligible to apply under this scheme?', answer: 'Students, faculty innovators, alumni, and external tech entrepreneurs working on novel technology prototypes or commercialization concepts.' },
      { question: 'Do I need a registered entity (Pvt Ltd / LLP) before applying?', answer: 'No! Early-stage concepts at the prototype or idea stage are fully welcome. Navrachna Foundation assists selected teams in entity incorporation.' },
      { question: 'How are financial grants disbursed?', answer: 'Grants are disbursed in milestone-linked tranches directly credited for hardware procurement, prototyping components, and official IP filing fees.' },
      { question: 'Who owns the Intellectual Property (IP) of the project?', answer: 'The innovators and student founders retain primary IP ownership in accordance with official institutional IPR guidelines.' }
    ],
    sections_config: {
      has_overview: true,
      has_impact: true,
      has_incentives: true,
      has_roadmap: true,
      has_infrastructure: true,
      has_portfolio: false,
      has_faqs: true
    }
  })

  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', msg: '' })

  useEffect(() => {
    if (feedback.msg) {
      const timer = setTimeout(() => {
        setFeedback({ type: '', msg: '' })
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  const loadData = async () => {
    setLoading(true)
    const [progRes, facRes, projRes] = await Promise.all([
      getAllProgramsAdmin(),
      supabase.from('facilities').select('id, title, slug, summary, specs_summary, cover_image_url').order('title', { ascending: true }),
      supabase.from('newgen_projects').select('id, title, slug, category_label, image_url').order('title', { ascending: true })
    ])
    setPrograms(progRes.data || [])
    setAllDbFacilities(facRes.data || [])
    setAllDbProjects(projRes.data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const openCreateModal = () => {
    setEditingItem(null)
    setActiveTab('overview')
    setFormData({
      name: '',
      slug: '',
      type: 'grant_scheme',
      tagline: '',
      grant_amount: '',
      nodal_agency: '',
      logo_url: '',
      description: '',
      is_active: true,
      display_order: programs.length,
      selectedFacilityIds: [],
      selectedProjectIds: [],
      portfolio_category: 'all',
      portfolio_title: 'Funded Student Prototype Projects',
      eligibility: [],
      mandates: [],
      stats: [],
      incentives: [],
      steps: [],
      roadmap_mode: 'stepper',
      roadmap_image: '',
      faqs: [],
      sections_config: {
        has_overview: true,
        has_impact: true,
        has_incentives: true,
        has_roadmap: true,
        has_infrastructure: true,
        has_portfolio: false,
        has_faqs: true
      }
    })
    setIsEditingPage(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setActiveTab('overview')

    const secConfig = item.sections_config || {}
    const existingFacilityIds = Array.isArray(secConfig.selected_facility_ids)
      ? secConfig.selected_facility_ids
      : (Array.isArray(item.selected_facility_ids) ? item.selected_facility_ids : allDbFacilities.slice(0, 8).map(f => f.id))
    const existingProjectIds = Array.isArray(secConfig.selected_project_ids) ? secConfig.selected_project_ids : []

    const existingStats = (Array.isArray(item.stats) ? item.stats : []).map((st, idx) => ({
      ...st,
      type: st.type || (idx === 0 ? 'bulb' : idx === 1 ? 'document' : idx === 2 ? 'rocket' : 'money')
    }))
    const existingIncentives = Array.isArray(item.incentives) ? item.incentives : []
    const existingSteps = Array.isArray(secConfig.steps) ? secConfig.steps : (Array.isArray(item.steps) ? item.steps : [])
    const existingFaqs = Array.isArray(secConfig.faqs) ? secConfig.faqs : (Array.isArray(item.faqs) ? item.faqs : [])
    const existingEligibility = Array.isArray(secConfig.eligibility) ? secConfig.eligibility : (Array.isArray(item.eligibility) ? item.eligibility : [])
    const existingMandates = Array.isArray(secConfig.mandates) ? secConfig.mandates : (Array.isArray(item.mandates) ? item.mandates : [])

    setFormData({
      name: item.name || item.title || '',
      slug: item.slug || '',
      type: item.type || 'grant_scheme',
      tagline: secConfig.tagline || item.tagline || '',
      grant_amount: item.grant_amount || '',
      nodal_agency: item.nodal_agency || '',
      logo_url: item.logo_url || '',
      description: item.description || item.summary || '',
      is_active: item.is_active ?? true,
      display_order: item.display_order ?? 0,
      selectedFacilityIds: existingFacilityIds,
      selectedProjectIds: existingProjectIds,
      portfolio_category: secConfig.portfolio_category || 'all',
      portfolio_title: secConfig.portfolio_title || 'Funded Student Prototype Projects',
      eligibility: existingEligibility,
      mandates: existingMandates,
      stats: existingStats,
      incentives: existingIncentives,
      steps: existingSteps,
      roadmap_mode: secConfig.roadmap_mode || item.roadmap_mode || 'stepper',
      roadmap_image: secConfig.roadmap_image || item.roadmap_image || item.roadmap_image_url || '',
      faqs: existingFaqs,
      sections_config: {
        has_overview: secConfig.has_overview ?? true,
        has_impact: secConfig.has_impact ?? true,
        has_incentives: secConfig.has_incentives ?? true,
        has_roadmap: secConfig.has_roadmap ?? true,
        has_infrastructure: secConfig.has_infrastructure ?? true,
        has_portfolio: secConfig.has_portfolio ?? false,
        has_faqs: secConfig.has_faqs ?? true,
        ...secConfig
      }
    })
    setIsEditingPage(true)
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, name, slug: editingItem ? formData.slug : slug })
  }

  const handleToggleFacility = (facId) => {
    const current = formData.selectedFacilityIds || []
    if (current.includes(facId)) {
      setFormData({ ...formData, selectedFacilityIds: current.filter(id => id !== facId) })
    } else {
      setFormData({ ...formData, selectedFacilityIds: [...current, facId] })
    }
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })

    const payload = {
      name: formData.name,
      title: formData.name,
      short_name: formData.name,
      slug: formData.slug,
      type: formData.type,
      grant_amount: formData.grant_amount,
      nodal_agency: formData.nodal_agency,
      logo_url: formData.logo_url,
      description: formData.description,
      summary: formData.description,
      is_active: formData.is_active,
      display_order: formData.display_order,
      stats: formData.stats,
      incentives: formData.incentives,
      sections_config: {
        ...formData.sections_config,
        tagline: formData.tagline,
        eligibility: formData.eligibility,
        mandates: formData.mandates,
        steps: formData.steps,
        roadmap_mode: formData.roadmap_mode,
        roadmap_image: formData.roadmap_image,
        selected_facility_ids: formData.selectedFacilityIds,
        selected_project_ids: formData.selectedProjectIds,
        portfolio_category: formData.portfolio_category,
        portfolio_title: formData.portfolio_title,
        faqs: formData.faqs
      }
    }

    if (editingItem) {
      const { error } = await updateProgram(editingItem.id, payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error updating program: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Scheme page content updated successfully!' })
        setIsEditingPage(false)
        loadData()
      }
    } else {
      const { error } = await createProgram(payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error creating program: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Scheme created successfully!' })
        setIsEditingPage(false)
        loadData()
      }
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    setSubmitting(true)
    const { error } = await deleteProgram(id)
    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting program: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: 'Program deleted successfully!' })
      setDeleteConfirmId(null)
      loadData()
    }
    setSubmitting(false)
  }



  const filtered = programs.filter(p =>
    ((p.name || p.title) && (p.name || p.title).toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.slug && p.slug.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredFacilities = allDbFacilities.filter(f => {
    const query = facilitySearchQuery.toLowerCase()
    const titleMatch = f.title && f.title.toLowerCase().includes(query)
    const summaryMatch = f.summary && f.summary.toLowerCase().includes(query)
    const specsStr = Array.isArray(f.specs_summary) ? f.specs_summary.join(' ') : (f.specs_summary || '')
    const specsMatch = specsStr.toLowerCase().includes(query)
    return titleMatch || summaryMatch || specsMatch
  })

  const tabsList = [
    { id: 'overview', label: '1. Executive Overview & Mandate' },
    { id: 'impact', label: '2. Impact Summary & Metrics' },
    { id: 'incentives', label: '3. Key Incentives & Support Pathways' },
    { id: 'roadmap', label: '4. Selection & Application Roadmap' },
    { id: 'infrastructure', label: `5. Lab Infrastructure (${formData.selectedFacilityIds?.length || 0} Selected)` },
    { id: 'portfolio', label: `6. Funded Projects & Portfolio (${formData.selectedProjectIds?.length || 0} Filtered)` },
    { id: 'faqs', label: '7. FAQs & Guidelines' },
    { id: 'toggles', label: '8. Page Visibility Toggles' }
  ]

  if (isEditingPage) {
    return (
      <div className="flex flex-col gap-6 font-normal">
        {/* Header Bar */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-normal">
              <button
                type="button"
                onClick={() => setIsEditingPage(false)}
                className="text-[#074887] hover:underline flex items-center gap-1 font-normal cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Schemes List</span>
              </button>
              <span>/</span>
              <span>{editingItem ? 'Edit Scheme Content' : 'Add New Scheme'}</span>
            </div>
            <h1 className="text-xl font-normal text-slate-900 mt-1">
              {editingItem ? `Editing Scheme: ${editingItem.name || editingItem.title}` : 'Create New Scheme Page'}
            </h1>
          </div>

          <div className="flex items-center gap-2 font-normal shrink-0">
            <button
              type="button"
              onClick={() => setIsEditingPage(false)}
              style={{ color: '#0f172a' }}
              className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-4 py-2 rounded-lg font-normal cursor-pointer border border-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={submitting}
              style={{ color: '#ffffff' }}
              className="bg-[#074887] hover:bg-[#013759] !text-white text-xs px-5 py-2 rounded-lg font-normal shadow-sm disabled:opacity-50 cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              {submitting ? 'Saving...' : 'Save Scheme Page'}
            </button>
          </div>
        </div>

        {feedback.msg && (
          <div className={`p-4 rounded-lg text-xs border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
            {feedback.msg}
          </div>
        )}

        {/* 7 Core CMS Tabs */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-1.5 text-xs font-normal">
          {tabsList.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{ color: activeTab === tab.id ? '#ffffff' : '#013759' }}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer font-normal text-xs ${activeTab === tab.id ? 'bg-[#074887] !text-white font-medium' : 'bg-slate-50 hover:bg-slate-100 !text-[#013759]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6 text-xs font-normal">
          
          {/* TAB 1: EXECUTIVE OVERVIEW & MANDATE */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-sm font-medium text-[#013759] border-b border-slate-100 pb-2">
                General Scheme Attributes & Executive Mandate
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-normal text-slate-800 mb-1">Scheme Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g. StartIn-UP"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-normal text-slate-800 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. startin-up"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono text-slate-900 focus:border-[#013759] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-normal text-slate-800 mb-1">Category Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none"
                  >
                    <option value="grant_scheme">Govt Grant Scheme</option>
                    <option value="incubation_program">Incubation Program</option>
                    <option value="accelerator">Accelerator Track</option>
                  </select>
                </div>
                <div>
                  <label className="block font-normal text-slate-800 mb-1">Nodal Agency / Department</label>
                  <input
                    type="text"
                    value={formData.nodal_agency}
                    onChange={(e) => setFormData({ ...formData, nodal_agency: e.target.value })}
                    placeholder="e.g. Department of IT & Electronics, Govt of UP"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-normal text-slate-800 mb-1">Scheme Logo (Upload Image File or Paste URL)</label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {formData.logo_url ? (
                      <div className="w-16 h-16 rounded-xl border border-slate-200 bg-white p-1.5 flex items-center justify-center shrink-0 shadow-xs relative group">
                        <img src={formData.logo_url} alt="Scheme Logo Preview" className="max-h-full max-w-full object-contain" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, logo_url: '' })}
                          style={{ color: '#ffffff' }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 !text-white rounded-full text-xs flex items-center justify-center shadow-xs cursor-pointer"
                          title="Remove logo"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 text-[10px] text-center p-1 shrink-0 font-mono">
                        No Logo
                      </div>
                    )}

                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        type="text"
                        value={formData.logo_url}
                        onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                        placeholder="Paste image URL (https://...)"
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-mono text-slate-900 focus:border-[#013759] focus:outline-none"
                      />
                      <label 
                        style={{ color: '#074887' }}
                        className="inline-flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 !text-[#074887] border border-sky-200 px-3 py-1.5 rounded-lg text-xs font-normal cursor-pointer w-max transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#074887]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Upload Logo Image File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0]
                            if (!file) return
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setFormData(prev => ({ ...prev, logo_url: reader.result }))
                            }
                            reader.readAsDataURL(file)
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-normal text-slate-800 mb-1">Application Window Status</label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="radio"
                        name="is_active"
                        checked={formData.is_active === true}
                        onChange={() => setFormData({ ...formData, is_active: true })}
                      />
                      <span className="text-emerald-700 font-normal">Applications Open</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="radio"
                        name="is_active"
                        checked={formData.is_active === false}
                        onChange={() => setFormData({ ...formData, is_active: false })}
                      />
                      <span className="text-amber-800 font-normal">Applications Closed</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-1">Executive Overview Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description paragraphs explaining scheme mission..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none leading-relaxed"
                />
              </div>

              {/* Mandate Items Editor */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">Key Strategic Mandates</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mandates: [...formData.mandates, { title: '', desc: '', icon: 'cpu' }] })}
                    className="text-[#074887] hover:underline font-normal text-xs cursor-pointer"
                  >
                    + Add Mandate Item
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {formData.mandates.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col gap-2 relative">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.mandates.filter((_, i) => i !== idx)
                          setFormData({ ...formData, mandates: updated })
                        }}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xs"
                      >
                        ×
                      </button>
                      <input
                        type="text"
                        placeholder="Mandate Title"
                        value={m.title}
                        onChange={(e) => {
                          const updated = [...formData.mandates]
                          updated[idx].title = e.target.value
                          setFormData({ ...formData, mandates: updated })
                        }}
                        className="rounded border border-slate-300 px-2.5 py-1 text-xs font-normal"
                      />
                      <textarea
                        rows={2}
                        placeholder="Mandate Description"
                        value={m.desc}
                        onChange={(e) => {
                          const updated = [...formData.mandates]
                          updated[idx].desc = e.target.value
                          setFormData({ ...formData, mandates: updated })
                        }}
                        className="rounded border border-slate-300 px-2.5 py-1 text-xs font-normal"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligible Candidates Editor */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 font-normal">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-slate-900">Eligible Candidates &amp; Target Audience</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Define target candidate categories displayed on the public scheme detail page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, eligibility: [...formData.eligibility, ''] })}
                    className="text-[#074887] hover:underline font-normal text-xs cursor-pointer"
                  >
                    + Add Candidate Category
                  </button>
                </div>
                {formData.eligibility.length === 0 ? (
                  <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-slate-400 text-xs text-center">
                    No candidate eligibility items added. Click "+ Add Candidate Category" above.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {formData.eligibility.map((eligItem, idx) => {
                      const val = typeof eligItem === 'string' ? eligItem : (eligItem.title || eligItem.label || '')
                      return (
                        <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <input
                            type="text"
                            placeholder="e.g. Science & Tech Students"
                            value={val}
                            onChange={(e) => {
                              const updated = [...formData.eligibility]
                              updated[idx] = e.target.value
                              setFormData({ ...formData, eligibility: updated })
                            }}
                            className="flex-1 rounded border border-slate-300 px-2.5 py-1 text-xs font-normal text-slate-900 focus:border-[#013759] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.eligibility.filter((_, i) => i !== idx)
                              setFormData({ ...formData, eligibility: updated })
                            }}
                            className="text-red-500 hover:text-red-700 text-base font-normal cursor-pointer px-1"
                            title="Remove candidate item"
                          >
                            ×
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: IMPACT SUMMARY & METRICS */}
          {activeTab === 'impact' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-sm font-medium text-[#013759] border-b border-slate-100 pb-2">
                Impact Metric Cards (Shown on Front Page)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-slate-500">Metric Card #{idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                          <MetricIconPreview type={stat.type || (idx === 0 ? 'bulb' : idx === 1 ? 'document' : idx === 2 ? 'rocket' : 'money')} />
                        </div>
                        <select
                          value={stat.type || (idx === 0 ? 'bulb' : idx === 1 ? 'document' : idx === 2 ? 'rocket' : 'money')}
                          onChange={(e) => {
                            const updated = [...formData.stats]
                            updated[idx].type = e.target.value
                            setFormData({ ...formData, stats: updated })
                          }}
                          className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-800"
                        >
                          <option value="bulb">Bulb / Innovation Icon</option>
                          <option value="document">Document / Projects Icon</option>
                          <option value="rocket">Rocket / Ventures Icon</option>
                          <option value="money">Rupee / Grant Capital Icon</option>
                          <option value="award">Award / Patent IPR Icon</option>
                          <option value="cpu">Fab Lab / Hardware Icon</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Metric Value (e.g. 500+)"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...formData.stats]
                          updated[idx].value = e.target.value
                          setFormData({ ...formData, stats: updated })
                        }}
                        className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900 font-medium"
                      />
                      <input
                        type="text"
                        placeholder="Metric Label (e.g. Ideas Received)"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...formData.stats]
                          updated[idx].label = e.target.value
                          setFormData({ ...formData, stats: updated })
                        }}
                        className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Subtext / Subtitle (e.g. Total Submissions)"
                      value={stat.sub}
                      onChange={(e) => {
                        const updated = [...formData.stats]
                        updated[idx].sub = e.target.value
                        setFormData({ ...formData, stats: updated })
                      }}
                      className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: KEY INCENTIVES & SUPPORT PATHWAYS */}
          {activeTab === 'incentives' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-sm font-medium text-[#013759]">
                  Key Incentives, Financial Grants &amp; Support Pathways Cards
                </h2>
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    incentives: [...formData.incentives, { title: '', category: 'GRANT', amount: '', duration: '', desc: '', tag: '' }]
                  })}
                  className="text-[#074887] hover:underline font-normal text-xs cursor-pointer"
                >
                  + Add Financial Incentive Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.incentives.map((inc, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.incentives.filter((_, i) => i !== idx)
                        setFormData({ ...formData, incentives: updated })
                      }}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-xs"
                    >
                      ×
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Incentive Title (e.g. Prototype Grant)"
                        value={inc.title}
                        onChange={(e) => {
                          const updated = [...formData.incentives]
                          updated[idx].title = e.target.value
                          setFormData({ ...formData, incentives: updated })
                        }}
                        className="rounded border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Grant Amount (e.g. Up to ₹2.5 Lakhs)"
                        value={inc.amount}
                        onChange={(e) => {
                          const updated = [...formData.incentives]
                          updated[idx].amount = e.target.value
                          setFormData({ ...formData, incentives: updated })
                        }}
                        className="rounded border border-slate-300 px-2.5 py-1.5 text-xs font-mono text-emerald-700"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Category Badge (e.g. GRANT)"
                        value={inc.category || 'GRANT'}
                        onChange={(e) => {
                          const updated = [...formData.incentives]
                          updated[idx].category = e.target.value
                          setFormData({ ...formData, incentives: updated })
                        }}
                        className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800"
                      />
                      <input
                        type="text"
                        placeholder="Perks Tag (e.g. Non-Dilutive Capital)"
                        value={inc.tag || ''}
                        onChange={(e) => {
                          const updated = [...formData.incentives]
                          updated[idx].tag = e.target.value
                          setFormData({ ...formData, incentives: updated })
                        }}
                        className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Detailed grant description & rules..."
                      value={inc.desc || inc.detail}
                      onChange={(e) => {
                        const updated = [...formData.incentives]
                        updated[idx].desc = e.target.value
                        setFormData({ ...formData, incentives: updated })
                      }}
                      className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: APPLICATION ROADMAP & STEPPER */}
          {activeTab === 'roadmap' && (
            <div className="flex flex-col gap-6 font-normal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm font-medium text-[#013759]">
                    Selection &amp; Application Process Roadmap
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose whether to display dynamic step cards or a custom single infographic flowchart.
                  </p>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, roadmap_mode: 'stepper' })}
                    style={{ color: (formData.roadmap_mode !== 'image') ? '#ffffff' : '#013759' }}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${formData.roadmap_mode !== 'image' ? 'bg-[#074887] !text-white font-medium shadow-2xs' : '!text-slate-700 hover:text-slate-900'}`}
                  >
                    Dynamic Stepper Timeline
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, roadmap_mode: 'image' })}
                    style={{ color: (formData.roadmap_mode === 'image') ? '#ffffff' : '#013759' }}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${formData.roadmap_mode === 'image' ? 'bg-[#074887] !text-white font-medium shadow-2xs' : '!text-slate-700 hover:text-slate-900'}`}
                  >
                    Single Flowchart Image Mode
                  </button>
                </div>
              </div>

              {formData.roadmap_mode === 'image' ? (
                /* SINGLE FLOWCHART IMAGE MODE */
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col gap-4 font-normal">
                  <h3 className="text-xs font-medium text-slate-800 uppercase tracking-wider">Custom Process Flowchart / Diagram Image</h3>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {formData.roadmap_image ? (
                      <div className="w-48 h-32 rounded-xl border border-slate-200 bg-white p-2 flex items-center justify-center shrink-0 shadow-xs relative group overflow-hidden">
                        <img src={formData.roadmap_image} alt="Flowchart Diagram Preview" className="max-h-full max-w-full object-contain" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, roadmap_image: '' })}
                          style={{ color: '#ffffff' }}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-600 !text-white rounded-full text-xs flex items-center justify-center shadow-md cursor-pointer"
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="w-48 h-32 rounded-xl border border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400 text-xs text-center p-3 shrink-0 font-mono gap-1">
                        <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>No Flowchart Image</span>
                      </div>
                    )}

                    <div className="flex-1 flex flex-col gap-2.5">
                      <input
                        type="text"
                        value={formData.roadmap_image}
                        onChange={(e) => setFormData({ ...formData, roadmap_image: e.target.value })}
                        placeholder="Paste image URL (https://...)"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono text-slate-900 focus:border-[#013759] focus:outline-none"
                      />
                      <label 
                        style={{ color: '#074887' }}
                        className="inline-flex items-center gap-2 bg-white hover:bg-sky-50 !text-[#074887] border border-sky-200 px-3.5 py-2 rounded-lg text-xs font-normal cursor-pointer w-max transition-colors shadow-2xs"
                      >
                        <svg className="w-4 h-4 text-[#074887]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Upload Flowchart Diagram Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0]
                            if (!file) return
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setFormData(prev => ({ ...prev, roadmap_image: reader.result }))
                            }
                            reader.readAsDataURL(file)
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                /* DYNAMIC STEPPER TIMELINE MODE */
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">Reorderable Steps ({formData.steps.length} Steps Defined)</span>
                    <button
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        steps: [...formData.steps, { step: `STEP 0${formData.steps.length + 1}`, title: '', desc: '', color: '#3b82f6' }]
                      })}
                      className="text-[#074887] hover:underline font-normal text-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>+ Add Roadmap Step</span>
                    </button>
                  </div>

                  {formData.steps.map((st, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3 relative font-normal">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                        <div className="flex items-center gap-2">
                          {/* Reorder Buttons: Move Up & Move Down */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => {
                                if (idx === 0) return
                                const updated = [...formData.steps]
                                const temp = updated[idx - 1]
                                updated[idx - 1] = updated[idx]
                                updated[idx] = temp
                                setFormData({ ...formData, steps: updated })
                              }}
                              className="w-6 h-6 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold"
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={idx === formData.steps.length - 1}
                              onClick={() => {
                                if (idx === formData.steps.length - 1) return
                                const updated = [...formData.steps]
                                const temp = updated[idx + 1]
                                updated[idx + 1] = updated[idx]
                                updated[idx] = temp
                                setFormData({ ...formData, steps: updated })
                              }}
                              className="w-6 h-6 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold"
                              title="Move Down"
                            >
                              ▼
                            </button>
                          </div>
                          <span className="font-mono text-xs font-semibold text-slate-700">Step #{idx + 1}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-xs text-slate-600">
                            <span>Badge Color:</span>
                            <input
                              type="color"
                              value={st.color || '#3b82f6'}
                              onChange={(e) => {
                                const updated = [...formData.steps]
                                updated[idx].color = e.target.value
                                setFormData({ ...formData, steps: updated })
                              }}
                              className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.steps.filter((_, i) => i !== idx)
                              setFormData({ ...formData, steps: updated })
                            }}
                            className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer px-1.5 py-0.5 rounded hover:bg-red-50"
                            title="Remove Step"
                          >
                            × Remove Step
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Step Badge (e.g. STEP 01)"
                          value={st.step || `STEP 0${idx + 1}`}
                          onChange={(e) => {
                            const updated = [...formData.steps]
                            updated[idx].step = e.target.value
                            setFormData({ ...formData, steps: updated })
                          }}
                          className="rounded border border-slate-300 px-2.5 py-1.5 text-xs font-mono text-slate-800"
                        />
                        <input
                          type="text"
                          placeholder="Step Title (e.g. Diagnostic Pitch Evaluation)"
                          value={st.title}
                          onChange={(e) => {
                            const updated = [...formData.steps]
                            updated[idx].title = e.target.value
                            setFormData({ ...formData, steps: updated })
                          }}
                          className="rounded border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-900 md:col-span-2"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Step instructions for applicant..."
                        value={st.desc || st.description}
                        onChange={(e) => {
                          const updated = [...formData.steps]
                          updated[idx].desc = e.target.value
                          setFormData({ ...formData, steps: updated })
                        }}
                        className="rounded border border-slate-300 px-2.5 py-1.5 text-xs text-slate-700"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: INFRASTRUCTURE & LAB FACILITIES (SELECT FROM DB FACILITIES TABLE) */}
          {activeTab === 'infrastructure' && (
            <div className="flex flex-col gap-6 font-normal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm font-medium text-[#013759]">
                    Select Available Facilities from Database
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Check which existing facilities from the <span className="font-mono text-slate-700">facilities</span> table to display on this scheme page.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-sky-50 text-[#074887] px-3 py-1 rounded-lg border border-sky-100">
                    {formData.selectedFacilityIds.length} of {allDbFacilities.length} Selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, selectedFacilityIds: allDbFacilities.map(f => f.id) })}
                    style={{ color: '#0f172a' }}
                    className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-2.5 py-1 rounded border border-slate-300 cursor-pointer"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, selectedFacilityIds: [] })}
                    style={{ color: '#0f172a' }}
                    className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-2.5 py-1 rounded border border-slate-300 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Search Facility Input */}
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Filter database facilities by title or specs..."
                  value={facilitySearchQuery}
                  onChange={(e) => setFacilitySearchQuery(e.target.value)}
                  className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none"
                />
              </div>

              {/* Facilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                {filteredFacilities.map((fac) => {
                  const isSelected = formData.selectedFacilityIds.includes(fac.id)
                  return (
                    <div
                      key={fac.id}
                      onClick={() => handleToggleFacility(fac.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${isSelected ? 'border-emerald-500 bg-emerald-50/40 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      {/* Image Thumbnail */}
                      <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 shrink-0 overflow-hidden relative">
                        <img src={getFacilityImage(fac)} alt={fac.title} className="w-full h-full object-cover" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-1 flex-grow">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-normal text-slate-900 text-xs sm:text-sm leading-snug">{fac.title}</h3>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleFacility(fac.id)}
                            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-0 shrink-0"
                          />
                        </div>

                        {fac.summary && (
                          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{fac.summary}</p>
                        )}

                        {fac.specs_summary && (
                          <span className="text-[10px] text-[#074887] font-mono mt-1 bg-sky-50 px-2 py-0.5 rounded w-fit border border-sky-100">
                            {Array.isArray(fac.specs_summary) ? fac.specs_summary.join(' • ') : fac.specs_summary}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          )}

          {/* TAB 6: FAQS & APPLICATION GUIDELINES */}
          {activeTab === 'faqs' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-sm font-medium text-[#013759]">
                  Frequently Asked Questions (FAQs)
                </h2>
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    faqs: [...formData.faqs, { question: '', answer: '' }]
                  })}
                  className="text-[#074887] hover:underline font-normal text-xs cursor-pointer"
                >
                  + Add FAQ Question
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.faqs.filter((_, i) => i !== idx)
                        setFormData({ ...formData, faqs: updated })
                      }}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-xs"
                    >
                      ×
                    </button>
                    <input
                      type="text"
                      placeholder="Question Text?"
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...formData.faqs]
                        updated[idx].question = e.target.value
                        setFormData({ ...formData, faqs: updated })
                      }}
                      className="rounded border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-900"
                    />
                    <textarea
                      rows={2}
                      placeholder="Detailed Answer..."
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...formData.faqs]
                        updated[idx].answer = e.target.value
                        setFormData({ ...formData, faqs: updated })
                      }}
                      className="rounded border border-slate-300 px-3 py-1.5 text-xs text-slate-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FUNDED PROJECTS & INNOVATIONS PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="flex flex-col gap-6 font-normal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm font-medium text-[#013759]">
                    Funded Projects &amp; Innovations Directory Settings
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select which student prototype projects or categories from the Projects Directory to feature on this scheme page.
                  </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer bg-sky-50 text-[#074887] border border-sky-200 px-3 py-1.5 rounded-lg text-xs font-normal">
                  <input
                    type="checkbox"
                    checked={formData.sections_config?.has_portfolio ?? false}
                    onChange={() => setFormData({
                      ...formData,
                      sections_config: {
                        ...formData.sections_config,
                        has_portfolio: !(formData.sections_config?.has_portfolio ?? false)
                      }
                    })}
                    className="w-4 h-4 text-[#074887] rounded border-slate-300 focus:ring-0"
                  />
                  <span>Show Section on Live Page</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-normal text-slate-800 mb-1">Section Title on Live Page</label>
                  <input
                    type="text"
                    value={formData.portfolio_title || 'Funded Student Prototype Projects'}
                    onChange={(e) => setFormData({ ...formData, portfolio_title: e.target.value })}
                    placeholder="e.g. Funded Student Prototype Projects"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                  />
                </div>

                <div>
                  <label className="block font-normal text-slate-800 mb-1">Filter Projects by Scheme / Program</label>
                  <select
                    value={formData.portfolio_category || 'all'}
                    onChange={(e) => setFormData({ ...formData, portfolio_category: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                  >
                    <option value="all">All Schemes / Programs ({allDbProjects.length} Projects)</option>
                    
                    <optgroup label="Incubation Schemes & Programs">
                      {programs.map(prog => (
                        <option key={prog.id} value={prog.slug || prog.name}>
                          {prog.name || prog.title}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Technology & Domain Sectors">
                      {Array.from(new Set(allDbProjects.map(p => p.category_label).filter(Boolean))).sort().map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-medium text-slate-800">
                    Filter Specific Projects ({formData.selectedProjectIds.length} of {allDbProjects.length} Selected)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, selectedProjectIds: allDbProjects.map(p => p.id) })}
                      style={{ color: '#0f172a' }}
                      className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-2.5 py-1 rounded border border-slate-300 cursor-pointer"
                    >
                      Select All Projects
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, selectedProjectIds: [] })}
                      style={{ color: '#0f172a' }}
                      className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-2.5 py-1 rounded border border-slate-300 cursor-pointer"
                    >
                      Clear Selection (Show All Matching Category)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
                  {allDbProjects.map((proj) => {
                    const isSelected = formData.selectedProjectIds.includes(proj.id)
                    return (
                      <label
                        key={proj.id}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors text-xs ${isSelected ? 'bg-sky-50/80 border-[#074887] text-slate-900 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            const current = formData.selectedProjectIds || []
                            if (current.includes(proj.id)) {
                              setFormData({ ...formData, selectedProjectIds: current.filter(id => id !== proj.id) })
                            } else {
                              setFormData({ ...formData, selectedProjectIds: [...current, proj.id] })
                            }
                          }}
                          className="mt-0.5 w-4 h-4 text-[#074887] rounded border-slate-300 focus:ring-0 shrink-0"
                        />
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          <span className="truncate">{proj.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono truncate">{proj.category_label || 'Project'}</span>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: PAGE SECTION VISIBILITY TOGGLES */}
          {activeTab === 'toggles' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-sm font-medium text-[#013759] border-b border-slate-100 pb-2">
                Page Section Visibility Toggles (Control Live Public View)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'has_overview', label: '1. Executive Overview & Mandate Section' },
                  { key: 'has_impact', label: '2. Impact Summary & Metrics Cards' },
                  { key: 'has_incentives', label: '3. Key Incentives & Support Pathways Section' },
                  { key: 'has_roadmap', label: '4. Selection & Application Process Roadmap' },
                  { key: 'has_infrastructure', label: '5. Lab Infrastructure & Facilities' },
                  { key: 'has_portfolio', label: '6. Funded Student Prototype Projects & Innovations' },
                  { key: 'has_faqs', label: '7. FAQs & Guidelines Section' }
                ].map(item => (
                  <label key={item.key} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-colors">
                    <span className="font-normal text-slate-800 text-xs">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={formData.sections_config?.[item.key] ?? true}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          sections_config: {
                            ...formData.sections_config,
                            [item.key]: !formData.sections_config?.[item.key]
                          }
                        })
                      }}
                      className="w-4 h-4 text-[#074887] rounded border-slate-300 focus:ring-0"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button Bar */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 font-normal">
            <button
              type="button"
              onClick={() => setIsEditingPage(false)}
              style={{ color: '#0f172a' }}
              className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-5 py-2.5 rounded-lg font-normal border border-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{ color: '#ffffff' }}
              className="bg-[#074887] hover:bg-[#013759] !text-white text-xs px-6 py-2.5 rounded-lg font-normal shadow-sm disabled:opacity-50 cursor-pointer transition-colors"
            >
              {submitting ? 'Saving Scheme...' : 'Save Scheme Page'}
            </button>
          </div>

        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 font-normal">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-normal text-slate-900">Incubation Tracks & Schemes CMS</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Manage scheme overviews, financial grants, roadmap steps, lab facilities, and impact metrics.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{ color: '#ffffff' }}
          className="bg-[#074887] hover:bg-[#013759] !text-white text-xs font-normal px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 w-fit cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="!text-white">Add New Scheme</span>
        </button>
      </div>

      {feedback.msg && (
        <div className={`p-4 rounded-lg text-xs border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {feedback.msg}
        </div>
      )}

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 font-normal">
        <input
          type="text"
          placeholder="Filter programs by name or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
        />
        <span className="text-xs text-slate-500 font-mono shrink-0 font-normal">
          Showing {filtered.length} of {programs.length} Programs
        </span>
      </div>

      {/* Program Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-normal">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-normal">Loading programs from Supabase...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-normal text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-normal">Scheme Name & Slug</th>
                  <th className="py-3 px-4 font-normal">Category Type</th>
                  <th className="py-3 px-4 font-normal">Nodal Agency</th>
                  <th className="py-3 px-4 font-normal">Status</th>
                  <th className="py-3 px-4 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-normal text-slate-900">
                      <div className="flex flex-col">
                        <span className="font-normal text-slate-900">{item.name || item.title}</span>
                        <span className="font-mono text-slate-400 text-[11px]">/{item.slug}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-sky-50 text-[#074887] text-[10px] font-normal px-2.5 py-0.5 rounded uppercase border border-sky-100">
                        {item.type?.replace('_', ' ') || 'SCHEME'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{item.nodal_agency || 'Navrachna Foundation'}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block text-[10px] font-normal px-2.5 py-1 rounded-full ${item.is_active !== false ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                        {item.is_active !== false ? 'Applications Open' : 'Applications Closed'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-normal">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/programs/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:underline font-normal flex items-center gap-0.5"
                        >
                          <span>View Live</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <span className="text-slate-300">|</span>
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-[#074887] hover:underline font-normal cursor-pointer"
                        >
                          Edit Content
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
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs font-normal">
            No programs found. Click "Add New Scheme" to create one.
          </div>
        )}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-normal">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 flex flex-col gap-4 text-center font-normal">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-sm font-normal text-slate-900">Confirm Deletion</h3>
            <p className="text-xs text-slate-500 font-normal">
              Are you sure you want to permanently delete this scheme page?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-normal">
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-4 py-2 rounded-lg font-normal cursor-pointer border border-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={submitting}
                style={{ color: '#ffffff' }}
                className="bg-red-600 hover:bg-red-700 !text-white text-xs px-4 py-2 rounded-lg font-normal shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
