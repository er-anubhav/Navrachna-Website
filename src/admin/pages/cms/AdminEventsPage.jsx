import React, { useState, useEffect } from 'react'
import {
  getAllEventsAdmin,
  getAllProgramsAdmin,
  createEvent,
  updateEvent,
  deleteEvent
} from '../../services/generalizedAdminService'

export function AdminEventsPage() {
  const [events, setEvents] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const [formData, setFormData] = useState({
    program_id: '',
    title: '',
    slug: '',
    event_type: 'hackathon',
    start_date: '',
    end_date: '',
    budget_prize_pool: 0,
    status: 'upcoming',
    description: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', msg: '' })

  const loadData = async () => {
    setLoading(true)
    const [eventsRes, programsRes] = await Promise.all([
      getAllEventsAdmin(),
      getAllProgramsAdmin()
    ])
    setEvents(eventsRes.data)
    setPrograms(programsRes.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData({
      program_id: programs.length > 0 ? programs[0].id : '',
      title: '',
      slug: '',
      event_type: 'hackathon',
      start_date: '',
      end_date: '',
      budget_prize_pool: 0,
      status: 'upcoming',
      description: ''
    })
    setIsEditingPage(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      program_id: item.program_id || '',
      title: item.title || '',
      slug: item.slug || '',
      event_type: item.event_type || 'hackathon',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      budget_prize_pool: item.budget_prize_pool || 0,
      status: item.status || 'upcoming',
      description: item.description || ''
    })
    setIsEditingPage(true)
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, title, slug: editingItem ? formData.slug : slug })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })

    const payload = {
      ...formData,
      program_id: formData.program_id || null,
      budget_prize_pool: parseFloat(formData.budget_prize_pool) || 0
    }

    if (editingItem) {
      const { error } = await updateEvent(editingItem.id, payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error updating event: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Event updated successfully!' })
        setIsEditingPage(false)
        loadData()
      }
    } else {
      const { error } = await createEvent(payload)
      if (error) {
        setFeedback({ type: 'error', msg: `Error creating event: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Event created successfully!' })
        setIsEditingPage(false)
        loadData()
      }
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    setSubmitting(true)
    const { error } = await deleteEvent(id)
    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting event: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: 'Event deleted successfully!' })
      setDeleteConfirmId(null)
      loadData()
    }
    setSubmitting(false)
  }

  const filtered = events.filter(e =>
    (e.title && e.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (e.slug && e.slug.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Dedicated Full Page Event Content Editor View
  if (isEditingPage) {
    return (
      <div className="flex flex-col gap-6 font-normal">
        {/* Editor Navigation Bar */}
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
                <span>Back to Events List</span>
              </button>
              <span>/</span>
              <span>{editingItem ? 'Edit Event' : 'Add Event'}</span>
            </div>
            <h1 className="text-xl font-normal text-slate-900 mt-1">
              {editingItem ? `Editing Event: ${editingItem.title}` : 'Create New Event / Hackathon Page'}
            </h1>
            <p className="text-xs text-slate-500 font-normal">
              Configure event dates, prize pool allocations, parent incubation scheme linkage, and event problem statements.
            </p>
          </div>

          <div className="flex items-center gap-2 font-normal shrink-0">
            <button
              type="button"
              onClick={() => setIsEditingPage(false)}
              style={{ color: '#0f172a' }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-900! text-xs px-4 py-2 rounded-lg font-normal cursor-pointer border border-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={submitting}
              style={{ color: '#ffffff' }}
              className="bg-[#074887] hover:bg-[#013759] text-white! text-xs px-5 py-2 rounded-lg font-normal shadow-sm disabled:opacity-50 cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{submitting ? 'Saving...' : 'Save Event'}</span>
            </button>
          </div>
        </div>

        {feedback.msg && (
          <div className={`p-4 rounded-lg text-xs border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Full Page Event Editor Form */}
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6 text-xs font-normal">
          <h2 className="text-sm font-normal text-slate-900 border-b border-slate-100 pb-2">Event Parameters & Program Association</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-normal text-slate-800 mb-1">Event Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. MSME Idea Hackathon 4.0 Women"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              />
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-normal text-slate-800 mb-1">Event Type</label>
              <select
                value={formData.event_type}
                onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              >
                <option value="hackathon">Hackathon</option>
                <option value="ideathon">Ideathon</option>
                <option value="workshop">Workshop</option>
                <option value="webinar">Webinar</option>
                <option value="pitch_day">Pitch Day</option>
                <option value="bootcamp">Bootcamp</option>
              </select>
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-1">Parent Scheme / Program Track</label>
              <select
                value={formData.program_id}
                onChange={(e) => setFormData({ ...formData, program_id: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              >
                <option value="">Standalone (No Scheme)</option>
                {programs.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-normal text-slate-800 mb-1">Prize Pool / Financial Budget (₹)</label>
              <input
                type="number"
                value={formData.budget_prize_pool}
                onChange={(e) => setFormData({ ...formData, budget_prize_pool: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              />
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-1">Lifecycle Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-normal text-slate-800 mb-1">Event Problem Statement & Agenda Details</label>
            <textarea
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the hackathon theme, target domains, registration timelines, and judging guidelines."
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-normal">
            <span className="text-[11px] text-slate-400 font-mono">
              {editingItem ? `Editing ID: ${editingItem.id}` : 'New Event Record'}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditingPage(false)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-900! px-4 py-2 rounded-lg font-normal cursor-pointer border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{ color: '#ffffff' }}
                className="bg-[#074887] hover:bg-[#013759] text-white! px-5 py-2 rounded-lg font-normal shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Saving...' : 'Save Event'}
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
          <h1 className="text-xl font-normal text-slate-900">Events & Hackathons CMS</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Manage hackathons, ideathons, workshops, prize pools, and scheme event linkage.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{ color: '#ffffff' }}
          className="bg-[#074887] hover:bg-[#013759] text-white! text-xs font-normal px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 w-fit cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span style={{ color: '#ffffff' }} className="text-white!">Add Event</span>
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
          placeholder="Filter events by title or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
        />
        <span className="text-xs text-slate-500 font-mono shrink-0 font-normal">
          Showing {filtered.length} of {events.length} Events
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-normal">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-normal">Loading events...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-normal text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-normal">Event Title & Slug</th>
                  <th className="py-3 px-4 font-normal">Type</th>
                  <th className="py-3 px-4 font-normal">Prize Pool / Budget</th>
                  <th className="py-3 px-4 font-normal">Status</th>
                  <th className="py-3 px-4 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-normal text-slate-900">
                      <div className="flex flex-col">
                        <span className="font-normal text-slate-900">{item.title}</span>
                        <span className="font-mono text-slate-400 text-[11px]">/{item.slug}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-sky-50 text-[#074887] text-[10px] font-normal px-2.5 py-0.5 rounded uppercase border border-sky-100">
                        {item.event_type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-700">
                      {item.budget_prize_pool ? `₹${item.budget_prize_pool.toLocaleString('en-IN')}` : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block text-[10px] font-normal px-2 py-0.5 rounded uppercase ${item.status === 'upcoming' ? 'bg-sky-50 text-sky-700 border border-sky-200' : item.status === 'ongoing' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                        {item.status}
                      </span>
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
            No events found. Click "Add Event" to create one.
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
              Are you sure you want to permanently delete this event?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-normal">
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-900! text-xs px-4 py-2 rounded-lg font-normal cursor-pointer border border-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={submitting}
                style={{ color: '#ffffff' }}
                className="bg-red-600 hover:bg-red-700 text-white! text-xs px-4 py-2 rounded-lg font-normal shadow-sm disabled:opacity-50 cursor-pointer"
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
