import React, { useState, useEffect } from 'react'
import {
  getAllAnnouncementsAdmin,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} from '../../services/adminServices'

export function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const [formData, setFormData] = useState({
    tag: 'Notice',
    title: '',
    content: '',
    external_url: '',
    status: 'published',
    is_featured: true
  })
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', msg: '' })

  const loadAnnouncements = async () => {
    setLoading(true)
    const { data } = await getAllAnnouncementsAdmin()
    setAnnouncements(data)
    setLoading(false)
  }

  useEffect(() => {
    loadAnnouncements()
  }, [])

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData({
      tag: 'Competition',
      title: '',
      content: '',
      external_url: '',
      status: 'published',
      is_featured: true
    })
    setIsEditingPage(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      tag: item.tag || 'Notice',
      title: item.title || '',
      content: item.content || '',
      external_url: item.external_url || '',
      status: item.status || 'published',
      is_featured: item.is_featured ?? true
    })
    setIsEditingPage(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })

    if (editingItem) {
      const { error } = await updateAnnouncement(editingItem.id, formData)
      if (error) {
        setFeedback({ type: 'error', msg: `Error updating announcement: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Announcement updated successfully!' })
        setIsEditingPage(false)
        loadAnnouncements()
      }
    } else {
      const { error } = await createAnnouncement(formData)
      if (error) {
        setFeedback({ type: 'error', msg: `Error creating announcement: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Announcement created successfully!' })
        setIsEditingPage(false)
        loadAnnouncements()
      }
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    setSubmitting(true)
    const { error } = await deleteAnnouncement(id)
    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting announcement: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: 'Announcement deleted successfully!' })
      setDeleteConfirmId(null)
      loadAnnouncements()
    }
    setSubmitting(false)
  }

  const filtered = announcements.filter(a =>
    (a.title && a.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (a.tag && a.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (a.content && a.content.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Dedicated Full Page Announcement Content Editor View
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
                <span>Back to Announcements List</span>
              </button>
              <span>/</span>
              <span>{editingItem ? 'Edit Announcement' : 'Add Announcement'}</span>
            </div>
            <h1 className="text-xl font-normal text-slate-900 mt-1">
              {editingItem ? `Editing Bulletin: ${editingItem.title}` : 'Compose New Public Announcement / Bulletin'}
            </h1>
            <p className="text-xs text-slate-500 font-normal">
              Publish news bulletins, call for proposals, competition notices, and homepage ticker updates.
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
              <span>{submitting ? 'Saving...' : 'Save Announcement'}</span>
            </button>
          </div>
        </div>

        {feedback.msg && (
          <div className={`p-4 rounded-lg text-xs border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Standalone Full Page Editor Form */}
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6 text-xs font-normal">
          <h2 className="text-sm font-normal text-slate-900 border-b border-slate-100 pb-2">Announcement Specifications & Target Link</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-normal text-slate-800 mb-1">Tag / Category Label</label>
              <input
                type="text"
                required
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. Competition, Hackathon, Incubation Grant, Notice"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              />
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-1">Publication Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              >
                <option value="published">Published (Visible on Home Ticker)</option>
                <option value="draft">Draft (Hidden from Public)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-normal text-slate-800 mb-1">Announcement Headline Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Applications open for DST NewGen-IEDC Student Prototype Grant 2026-27"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
            />
          </div>

          <div>
            <label className="block font-normal text-slate-800 mb-1">External Target URL / Registration Link (Optional)</label>
            <input
              type="url"
              value={formData.external_url}
              onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
              placeholder="e.g. https://forms.gle/xyz or PDF flyer link"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-normal text-slate-800 mb-1">Detailed Bulletin Body Content</label>
            <textarea
              rows={6}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Full bulletin description rendered in public ticker and popup modal details."
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-normal">
            <span className="text-[11px] text-slate-400 font-mono">
              {editingItem ? `Editing ID: ${editingItem.id}` : 'New Announcement Record'}
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
                {submitting ? 'Saving...' : 'Save Announcement'}
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
          <h1 className="text-xl font-normal text-slate-900">Broadcast Announcements CMS</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Manage live ticker notifications, official bulletins, call for proposals, and competition alerts.
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
          <span style={{ color: '#ffffff' }} className="!text-white">Add Announcement</span>
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
          placeholder="Filter announcements by title, tag, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
        />
        <span className="text-xs text-slate-500 font-mono shrink-0 font-normal">
          Showing {filtered.length} of {announcements.length} Announcements
        </span>
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-normal">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-normal">Loading announcements from database...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-normal text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-normal">Tag / Category</th>
                  <th className="py-3 px-4 font-normal">Announcement Title</th>
                  <th className="py-3 px-4 font-normal">Status</th>
                  <th className="py-3 px-4 font-normal">Created At</th>
                  <th className="py-3 px-4 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-normal">
                      <span className="inline-block bg-sky-50 text-[#074887] text-[10px] font-normal px-2.5 py-0.5 rounded border border-sky-100">
                        {item.tag || 'Notice'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-normal text-slate-900 max-w-md">
                      <div className="font-normal">{item.title}</div>
                      <div className="text-slate-500 text-[11px] truncate max-w-xs">{item.content}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block text-[10px] font-normal px-2 py-0.5 rounded ${item.status === 'published' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                        {item.status?.toUpperCase()}
                      </span>
                    </td>
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
            No announcements found matching your filter.
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
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
              Are you sure you want to permanently delete this announcement? This action will remove it from the live database.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-normal">
              {/* Light button -> Dark font (text-slate-900) */}
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{ color: '#0f172a' }}
                className="bg-slate-100 hover:bg-slate-200 !text-slate-900 text-xs px-4 py-2 rounded-lg font-normal cursor-pointer border border-slate-300"
              >
                Cancel
              </button>
              {/* Dark button -> Light font (text-white) */}
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
