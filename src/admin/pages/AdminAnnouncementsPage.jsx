import React, { useState, useEffect } from 'react'
import {
  getAllAnnouncementsAdmin,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} from '../services/adminServices'

export function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
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
    setModalOpen(true)
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
    setModalOpen(true)
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
        setModalOpen(false)
        loadAnnouncements()
      }
    } else {
      const { error } = await createAnnouncement(formData)
      if (error) {
        setFeedback({ type: 'error', msg: `Error creating announcement: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'Announcement created successfully!' })
        setModalOpen(false)
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
    (a.tag && a.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (a.title && a.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (a.content && a.content.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex flex-col gap-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Announcements & Bulletins CMS</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, publish, or archive news bulletins rendered on the homepage ticker.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#074887] hover:bg-[#013759] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 w-fit cursor-pointer"
        >
          <span>+ Add Announcement</span>
        </button>
      </div>

      {feedback.msg && (
        <div className={`p-4 rounded-lg text-xs border ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {feedback.msg}
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Filter announcements by tag, title, or text..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-[#013759] focus:outline-none"
        />
        <span className="text-xs text-slate-500 font-mono shrink-0">
          Showing {filtered.length} of {announcements.length} Bulletins
        </span>
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
            <p className="text-xs text-slate-500">Loading announcements from Supabase...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Tag</th>
                  <th className="py-3 px-4">Announcement Content</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="inline-block bg-sky-100 text-[#074887] text-[10px] font-semibold px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-md">
                      <p className="font-medium text-slate-900 line-clamp-1">{item.title}</p>
                      <p className="text-slate-500 line-clamp-2 mt-0.5">{item.content}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${item.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                        {item.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-[#074887] hover:underline font-medium cursor-pointer"
                        >
                          Edit
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="text-red-600 hover:underline font-medium cursor-pointer"
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
          <div className="p-8 text-center text-slate-400 text-xs">
            No announcements found matching your filter.
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingItem ? 'Edit Announcement' : 'Create New Announcement'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Tag / Category</label>
                <input
                  type="text"
                  required
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="e.g. Competition, Hackathon, Incubation"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Short bulletin title"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Announcement Body Text</label>
                <textarea
                  rows={3}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full bulletin description rendered in ticker and modal"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Publication Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
                >
                  <option value="published">Published (Visible on Home Ticker)</option>
                  <option value="draft">Draft (Hidden from Public)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#074887] hover:bg-[#013759] text-white px-4 py-2 rounded-lg font-medium shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Save Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 flex flex-col gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl mx-auto">
              ⚠️
            </div>
            <h3 className="text-sm font-bold text-slate-900">Confirm Deletion</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently delete this announcement? This action will remove it from the live database.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-4 py-2 rounded-lg font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-lg font-medium shadow-sm disabled:opacity-50 cursor-pointer"
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
