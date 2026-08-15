import React, { useState, useEffect } from 'react'
import {
  supabase
} from '../../lib/supabase'

const ROOT_FOUNDATION_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

export function AdminServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    description: ''
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

  const loadServices = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching services:', error)
    } else {
      setServices(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadServices()
  }, [])

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData({
      name: '',
      description: ''
    })
    setIsEditingPage(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name || '',
      description: item.description || ''
    })
    setIsEditingPage(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })

    if (editingItem) {
      const { error } = await supabase
        .from('services')
        .update(formData)
        .eq('id', editingItem.id)

      if (error) {
        setFeedback({ type: 'error', msg: `Error updating service: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Service updated successfully!' })
        setIsEditingPage(false)
        loadServices()
      }
    } else {
      const { error } = await supabase
        .from('services')
        .insert([{ ...formData, foundation_id: ROOT_FOUNDATION_ID }])

      if (error) {
        setFeedback({ type: 'error', msg: `Error creating service: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Service created successfully!' })
        setIsEditingPage(false)
        loadServices()
      }
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    setSubmitting(true)
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting service: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: 'Service deleted successfully!' })
      setDeleteConfirmId(null)
      loadServices()
    }
    setSubmitting(false)
  }

  const filtered = services.filter(s =>
    (s.name && s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Dedicated Full Page Service Content Editor View
  if (isEditingPage) {
    return (
      <div className="flex flex-col gap-6 font-normal">
        {/* Editor Top Navigation Bar */}
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
                <span>Back to Services List</span>
              </button>
              <span>/</span>
              <span>{editingItem ? 'Edit Service' : 'Add Service'}</span>
            </div>
            <h1 className="text-xl font-normal text-slate-900 mt-1">
              {editingItem ? `Editing Service: ${editingItem.name}` : 'Create New Incubator Support Service'}
            </h1>
            <p className="text-xs text-slate-500 font-normal">
              Define incubator support details, domain coverage, mentor assignment scope, and infrastructure offering descriptions.
            </p>
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
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{submitting ? 'Saving...' : 'Save Support Service'}</span>
            </button>
          </div>
        </div>

        {feedback.msg && (
          <div className={`p-4 rounded-lg text-xs border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Standalone Page Editor Form */}
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6 text-xs font-normal">
          <h2 className="text-sm font-normal text-slate-900 border-b border-slate-100 pb-2">Support Service Specifications</h2>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-normal text-slate-800 mb-1">Service Name / Title</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. 1-on-1 Executive Mentorship, Seed Grant Support, IPR & Patent Filing Assistance"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              />
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-1">Comprehensive Service Scope & Description</label>
              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detail the scope of assistance, hardware tools provided, expert contact hours, and eligibility criteria for incubated startups."
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-normal">
            <span className="text-[11px] text-slate-400 font-mono">
              {editingItem ? `Editing ID: ${editingItem.id}` : 'New Incubator Service'}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditingPage(false)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 !text-slate-900 px-4 py-2 rounded-lg font-normal cursor-pointer border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{ color: '#ffffff' }}
                className="bg-[#074887] hover:bg-[#013759] !text-white px-5 py-2 rounded-lg font-normal shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Saving...' : 'Save Support Service'}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 font-normal">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-normal text-slate-900">Incubator Support Services CMS</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Manage incubation support offerings (Mentorship, IT Support, Seed Funding, IP Filing, Lab Access).
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
          <span style={{ color: '#ffffff' }} className="!text-white">Add Service</span>
        </button>
      </div>

      {feedback.msg && (
        <div className={`p-4 rounded-lg text-xs border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {feedback.msg}
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 font-normal">
        <input
          type="text"
          placeholder="Filter services by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
        />
        <span className="text-xs text-slate-500 font-mono shrink-0 font-normal">
          Showing {filtered.length} of {services.length} Services
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-normal">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-normal">Loading services from Supabase...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-normal text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-normal">Service Name</th>
                  <th className="py-3 px-4 font-normal">Description</th>
                  <th className="py-3 px-4 font-normal">Created Date</th>
                  <th className="py-3 px-4 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-normal text-slate-900">{item.name}</td>
                    <td className="py-3 px-4 text-slate-500 max-w-md line-clamp-2">{item.description || 'N/A'}</td>
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right font-normal">
                      <div className="flex items-center justify-end gap-2">
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
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs font-normal">
            No services found. Click "Add Service" to create one.
          </div>
        )}
      </div>

      {/* Delete Modal */}
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
              Are you sure you want to permanently delete this service?
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
