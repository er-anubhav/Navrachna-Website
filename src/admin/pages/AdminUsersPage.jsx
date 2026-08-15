import React, { useState, useEffect } from 'react'
import {
  getAllUsersAdmin,
  createUser,
  updateUser,
  deleteUser
} from '../services/generalizedAdminService'

export function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const availableRoles = ['student', 'faculty', 'mentor', 'alumni', 'evaluator', 'admin']

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_info: '',
    roles: ['student'],
    organization: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', msg: '' })

  const loadUsers = async () => {
    setLoading(true)
    const { data } = await getAllUsersAdmin()
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData({
      full_name: '',
      email: '',
      contact_info: '',
      roles: ['student'],
      organization: 'I.T.S. Engineering College'
    })
    setIsEditingPage(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      full_name: item.full_name || '',
      email: item.email || '',
      contact_info: item.contact_info || '',
      roles: item.roles || ['student'],
      organization: item.organization || ''
    })
    setIsEditingPage(true)
  }

  const handleRoleToggle = (roleName) => {
    const current = formData.roles || []
    if (current.includes(roleName)) {
      setFormData({ ...formData, roles: current.filter(r => r !== roleName) })
    } else {
      setFormData({ ...formData, roles: [...current, roleName] })
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', msg: '' })

    if (editingItem) {
      const { error } = await updateUser(editingItem.id, formData)
      if (error) {
        setFeedback({ type: 'error', msg: `Error updating user: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'User updated successfully!' })
        setIsEditingPage(false)
        loadUsers()
      }
    } else {
      const { error } = await createUser(formData)
      if (error) {
        setFeedback({ type: 'error', msg: `Error creating user: ${error.message}` })
      } else {
        setFeedback({ type: 'success', msg: 'User created successfully!' })
        setIsEditingPage(false)
        loadUsers()
      }
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    setSubmitting(true)
    const { error } = await deleteUser(id)
    if (error) {
      setFeedback({ type: 'error', msg: `Error deleting user: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: 'User deleted successfully!' })
      setDeleteConfirmId(null)
      loadUsers()
    }
    setSubmitting(false)
  }

  const filtered = users
    .filter(u =>
      (u.full_name && u.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.designation && u.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.organization && u.organization.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => (a.full_name || '').localeCompare(b.full_name || ''))

  // Dedicated Full Page User Directory Content Editor View
  if (isEditingPage) {
    return (
      <div className="flex flex-col gap-6 font-normal">
        {/* Editor Top Navigation Header */}
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
                <span>Back to People Directory</span>
              </button>
              <span>/</span>
              <span>{editingItem ? 'Edit Person Profile' : 'Add Person'}</span>
            </div>
            <h1 className="text-xl font-normal text-slate-900 mt-1">
              {editingItem ? `Editing Profile: ${editingItem.full_name}` : 'Register New Person / User Profile'}
            </h1>
            <p className="text-xs text-slate-500 font-normal">
              Configure profile information, contact channels, institution organization, and access role privileges.
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
              <span>{submitting ? 'Saving...' : 'Save Person Profile'}</span>
            </button>
          </div>
        </div>

        {feedback.msg && (
          <div className={`p-4 rounded-lg text-xs border font-normal ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Full Page User Editor Form */}
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6 text-xs font-normal">
          <h2 className="text-sm font-normal text-slate-900 border-b border-slate-100 pb-2">Profile Identity & Organization Credentials</h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-normal text-slate-800 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="e.g. Dr. Surya Prasad Mishra"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-normal text-slate-800 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@navrachna.org"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>

              <div>
                <label className="block font-normal text-slate-800 mb-1">Phone Number / Contact Info</label>
                <input
                  type="text"
                  value={formData.contact_info}
                  onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-1">Organization / Department / Institution</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. I.T.S. Engineering College"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              />
            </div>

            <div>
              <label className="block font-normal text-slate-800 mb-2">Assigned Roles & Access Privileges</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {availableRoles.map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer text-slate-800 font-normal capitalize p-2 rounded hover:bg-white border border-transparent hover:border-slate-200 transition-colors">
                    <input
                      type="checkbox"
                      checked={(formData.roles || []).includes(r)}
                      onChange={() => handleRoleToggle(r)}
                      className="rounded text-[#074887] focus:ring-0"
                    />
                    <span className="text-xs">{r}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-normal">
            <span className="text-[11px] text-slate-400 font-mono">
              {editingItem ? `Editing ID: ${editingItem.id}` : 'New Person Record'}
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
                {submitting ? 'Saving...' : 'Save Person Profile'}
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
          <h1 className="text-xl font-normal text-slate-900">People & User Directory CMS</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Manage students, faculty mentors, external evaluators, alumni, and ecosystem roles.
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
          <span style={{ color: '#ffffff' }} className="!text-white">Add Person / User</span>
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
          placeholder="Filter users by name, email, designation, or organization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
        />
        <span className="text-xs text-slate-500 font-mono shrink-0 font-normal">
          Showing {filtered.length} of {users.length} People
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-normal">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-normal">Loading people directory from Supabase...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-normal text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-normal">Full Name & Contact</th>
                  <th className="py-3.5 px-4 font-normal">Designation & Organization</th>
                  <th className="py-3.5 px-4 font-normal">Assigned Roles</th>
                  <th className="py-3.5 px-4 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-normal text-slate-900">
                      <div className="flex items-center gap-3">
                        {item.photo_url ? (
                          <img src={item.photo_url} alt={item.full_name} className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#013759] text-white flex items-center justify-center text-xs font-mono font-normal shrink-0">
                            {(item.full_name || 'P')[0]}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-normal text-slate-900">{item.full_name}</span>
                          <span className="font-mono text-slate-400 text-[11px]">{item.email || item.phone || 'No email recorded'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-normal">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-normal">{item.designation || 'N/A'}</span>
                        <span className="text-[11px] text-slate-400">{item.organization || 'I.T.S. Engineering College'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {(item.roles && item.roles.length > 0 ? item.roles : ['member']).map(r => (
                          <span key={r} className="inline-block bg-sky-50 text-[#074887] text-[10px] font-normal px-2 py-0.5 rounded capitalize border border-sky-100">
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-normal">
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
            No users found. Click "Add Person / User" to create one.
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
              Are you sure you want to permanently delete this person record?
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
