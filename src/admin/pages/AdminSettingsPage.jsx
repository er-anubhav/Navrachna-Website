import React, { useState, useEffect } from 'react'
import { getSiteSettings } from '../../services/siteSettingsService'
import { updateSiteSettings } from '../services/adminServices'

export function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    org_name: '',
    parent_org: '',
    cin_number: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    google_maps_url: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    hero_headline: '',
    hero_subtitle: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', msg: '' })

  useEffect(() => {
    async function loadSettings() {
      setLoading(true)
      const { data } = await getSiteSettings()
      if (data) {
        setFormData({
          org_name: data.org_name || '',
          parent_org: data.parent_org || '',
          cin_number: data.cin_number || '',
          contact_phone: data.contact_phone || '',
          contact_email: data.contact_email || '',
          contact_address: data.contact_address || '',
          google_maps_url: data.google_maps_url || '',
          facebook: data.social_links?.facebook || '',
          instagram: data.social_links?.instagram || '',
          linkedin: data.social_links?.linkedin || '',
          hero_headline: data.hero_headline || '',
          hero_subtitle: data.hero_subtitle || ''
        })
      }
      setLoading(false)
    }
    loadSettings()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFeedback({ type: '', msg: '' })

    const payload = {
      org_name: formData.org_name,
      parent_org: formData.parent_org,
      cin_number: formData.cin_number,
      contact_phone: formData.contact_phone,
      contact_email: formData.contact_email,
      contact_address: formData.contact_address,
      google_maps_url: formData.google_maps_url,
      social_links: {
        facebook: formData.facebook,
        instagram: formData.instagram,
        linkedin: formData.linkedin
      },
      hero_headline: formData.hero_headline,
      hero_subtitle: formData.hero_subtitle
    }

    const { error } = await updateSiteSettings(payload)
    if (error) {
      setFeedback({ type: 'error', msg: `Failed to save settings: ${error.message}` })
    } else {
      setFeedback({ type: 'success', msg: 'Site settings successfully updated in live database!' })
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
        <p className="text-xs text-slate-500">Loading site settings from Supabase...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Site Settings CMS</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage global institutional identity, contact info, and homepage headlines.
          </p>
        </div>
      </div>

      {feedback.msg && (
        <div className={`p-4 rounded-lg text-xs border ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {feedback.msg}
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
        
        {/* Section 1: Identity */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#013759] border-b border-slate-100 pb-2">
            1. Institutional Identity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Organization Name</label>
              <input
                type="text"
                name="org_name"
                value={formData.org_name}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Parent Institution</label>
              <input
                type="text"
                name="parent_org"
                value={formData.parent_org}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">CIN Registration Number</label>
              <input
                type="text"
                name="cin_number"
                value={formData.cin_number}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#013759] border-b border-slate-100 pb-2">
            2. Contact & Location Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Official Phone Number</label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Official Email Address</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Physical Address</label>
              <input
                type="text"
                name="contact_address"
                value={formData.contact_address}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Social Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#013759] border-b border-slate-100 pb-2">
            3. Social Media Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Facebook URL</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Instagram Handle/URL</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">LinkedIn Company Page</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-[#013759] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#074887] hover:bg-[#013759] text-white text-xs font-medium px-6 py-2.5 rounded-lg transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving to Database...' : 'Save Site Settings'}
          </button>
        </div>

      </form>

    </div>
  )
}
