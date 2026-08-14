import React, { useState, useEffect } from 'react'
import {
  getAllProgramsAdmin,
  createProgram,
  updateProgram,
  deleteProgram
} from '../services/generalizedAdminService'

export function AdminProgramsPage() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'grant_scheme',
    grant_amount: '',
    nodal_agency: '',
    description: '',
    is_active: true,
    display_order: 0,
    stats: [
      { value: '', label: '', sub: '' },
      { value: '', label: '', sub: '' },
      { value: '', label: '', sub: '' },
      { value: '', label: '', sub: '' }
    ],
    incentives: [
      { title: '', amount: '', duration: '', desc: '' },
      { title: '', amount: '', duration: '', desc: '' },
      { title: '', amount: '', duration: '', desc: '' },
      { title: '', amount: '', duration: '', desc: '' }
    ],
    sections_config: {
      has_overview: true,
      has_offerings_grid: true,
      has_portfolio_explorer: true,
      has_events_module: true,
      has_cta_banner: true
    }
  })

  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', msg: '' })

  const loadPrograms = async () => {
    setLoading(true)
    const { data } = await getAllProgramsAdmin()
    setPrograms(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadPrograms()
  }, [])

  const openCreateModal = () => {
    setEditingItem(null)
    setActiveTab('basic')
    setFormData({
      name: '',
      slug: '',
      type: 'grant_scheme',
      grant_amount: '',
      nodal_agency: '',
      description: '',
      is_active: true,
      display_order: programs.length,
      stats: [
        { value: '', label: '', sub: '' },
        { value: '', label: '', sub: '' },
        { value: '', label: '', sub: '' },
        { value: '', label: '', sub: '' }
      ],
      incentives: [
        { title: '', amount: '', duration: '', desc: '' },
        { title: '', amount: '', duration: '', desc: '' },
        { title: '', amount: '', duration: '', desc: '' },
        { title: '', amount: '', duration: '', desc: '' }
      ],
      sections_config: {
        has_overview: true,
        has_offerings_grid: true,
        has_portfolio_explorer: true,
        has_events_module: true,
        has_cta_banner: true
      }
    })
    setIsEditingPage(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setActiveTab('basic')

    // Ensure array structures
    const existingStats = Array.isArray(item.stats) && item.stats.length > 0
      ? item.stats
      : [
          { value: '', label: '', sub: '' },
          { value: '', label: '', sub: '' },
          { value: '', label: '', sub: '' },
          { value: '', label: '', sub: '' }
        ]

    const existingIncentives = Array.isArray(item.incentives) && item.incentives.length > 0
      ? item.incentives
      : [
          { title: '', amount: '', duration: '', desc: '' },
          { title: '', amount: '', duration: '', desc: '' },
          { title: '', amount: '', duration: '', desc: '' },
          { title: '', amount: '', duration: '', desc: '' }
        ]

    setFormData({
      name: item.name || item.title || '',
      slug: item.slug || '',
      type: item.type || 'grant_scheme',
      grant_amount: item.grant_amount || '',
      nodal_agency: item.nodal_agency || '',
      description: item.description || item.summary || '',
      is_active: item.is_active ?? true,
      display_order: item.display_order ?? 0,
      stats: existingStats,
      incentives: existingIncentives,
      sections_config: item.sections_config || {
        has_overview: true,
        has_offerings_grid: true,
        has_portfolio_explorer: true,
        has_events_module: true,
        has_cta_banner: true
      }
    })
    setIsEditingPage(true)
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, name, slug: editingItem ? formData.slug : slug })
  }

  const handleStatChange = (idx, field, val) => {
    const updated = [...formData.stats]
    updated[idx] = { ...updated[idx], [field]: val }
    setFormData({ ...formData, stats: updated })
  }

  const handleIncentiveChange = (idx, field, val) => {
    const updated = [...formData.incentives]
    updated[idx] = { ...updated[idx], [field]: val }
    setFormData({ ...formData, incentives: updated })
  }

  const handleSectionToggle = (key) => {
    setFormData({
      ...formData,
      sections_config: {
        ...formData.sections_config,
        [key]: !formData.sections_config?.[key]
      }
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })

    const payload = {
      ...formData,
      title: formData.name,
      short_name: formData.name,
      summary: formData.description
    }

    if (editingItem) {
      const { error } = await updateProgram(editingItem.id, payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error updating program: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Program page content updated successfully!' })
        setIsEditingPage(false)
        loadPrograms()
      }
    } else {
      const { error } = await createProgram(payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error creating program: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Program created successfully!' })
        setIsEditingPage(false)
        loadPrograms()
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
      loadPrograms()
    }
    setSubmitting(false)
  }

  const filtered = programs.filter(p =>
    ((p.name || p.title) && (p.name || p.title).toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.slug && p.slug.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (isEditingPage) {
    return (
      <div className="flex flex-col gap-6 font-normal">
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
                <span>Back to Programs List</span>
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
              className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-4 py-2 rounded-lg font-normal cursor-pointer border border-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={submitting}
              className="bg-[#074887] hover:bg-[#013759] !text-white text-xs px-5 py-2 rounded-lg font-normal shadow-sm disabled:opacity-50 cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              {submitting ? 'Saving...' : 'Save Scheme Content'}
            </button>
          </div>
        </div>

        {feedback.msg && (
          <div className={`p-4 rounded-lg text-xs border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
            {feedback.msg}
          </div>
        )}

        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-2 text-xs font-normal">
          {['basic', 'stats', 'incentives', 'sections'].map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer font-normal ${activeTab === tab ? 'bg-[#074887] text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              {tab === 'basic' ? '1. General Attributes' : tab === 'stats' ? '2. Core Stats' : tab === 'incentives' ? '3. Perks & Incentives' : '4. Section Toggles'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6 text-xs font-normal">
          {activeTab === 'basic' && (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-normal text-slate-800 mb-1">Scheme Title</label>
                  <input type="text" required value={formData.name} onChange={handleNameChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs" />
                </div>
                <div>
                  <label className="block font-normal text-slate-800 mb-1">URL Slug</label>
                  <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono" />
                </div>
              </div>
              <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs" placeholder="Overview description..." />
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2">
                  <input type="text" placeholder="Value" value={stat.value} onChange={(e) => handleStatChange(idx, 'value', e.target.value)} className="rounded border border-slate-300 px-2 py-1 text-xs" />
                  <input type="text" placeholder="Label" value={stat.label} onChange={(e) => handleStatChange(idx, 'label', e.target.value)} className="rounded border border-slate-300 px-2 py-1 text-xs" />
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'sections' && (
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} />
                Active Visibility
              </label>
            </div>
          )}
          
          <button type="submit" className="bg-[#074887] text-white py-2 rounded-lg">Save Changes</button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 font-normal">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-normal text-slate-900">Incubation Tracks & Schemes CMS</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Manage general scheme attributes, common metadata, stats, incentives, and page section toggles.
          </p>
        </div>
        <button
          onClick={openCreateModal}
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
                  <th className="py-3 px-4 font-normal">Grant Ceiling</th>
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
                    <td className="py-3 px-4 font-mono text-emerald-700">{item.grant_amount || 'Standard'}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block text-[10px] font-normal px-2 py-0.5 rounded ${item.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                        {item.is_active ? 'Active' : 'Draft'}
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
                          <span>View</span>
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
