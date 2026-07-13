import React, { useState, useEffect } from 'react'
import { signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { useCms } from '../hooks/useCms'
import { migrateAllData } from '../data/cms/migrateToFirestore'
import { HeaderV1 } from '../components/HeaderV1'
import { FooterV1 } from '../components/FooterV1'

const FontSizeSelect = ({ label, value, onChange, defaultLabel }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase text-slate-500 font-semibold">{label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50 cursor-pointer"
    >
      <option value="">Default Size {defaultLabel ? `(${defaultLabel})` : ''}</option>
      <option value="text-xs">Extra Small (text-xs)</option>
      <option value="text-sm">Small (text-sm)</option>
      <option value="text-base">Normal (text-base)</option>
      <option value="text-lg">Large (text-lg)</option>
      <option value="text-xl">Extra Large (text-xl)</option>
      <option value="text-2xl">2XL (text-2xl)</option>
      <option value="text-3xl">3XL (text-3xl)</option>
      <option value="text-4xl">4XL (text-4xl)</option>
      <option value="text-5xl">5XL (text-5xl)</option>
      <option value="text-6xl">6XL (text-6xl)</option>
      <option value="text-7xl">7XL (text-7xl)</option>
      <option value="text-8xl">8XL (text-8xl)</option>
    </select>
  </div>
)

export function AdminPage() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('landing')
  const [migrationStatus, setMigrationStatus] = useState(null)
  const [migrationLoading, setMigrationLoading] = useState(false)

  // Sub-forms local states to edit data
  const [landingForm, setLandingForm] = useState(null)
  const [aboutForm, setAboutForm] = useState(null)
  const [teamForm, setTeamForm] = useState(null)
  const [servicesForm, setServicesForm] = useState(null)
  const [headerForm, setHeaderForm] = useState(null)
  const [footerForm, setFooterForm] = useState(null)

  const [saveStatus, setSaveStatus] = useState({ loading: false, success: null, error: null })

  const cmsLanding = useCms('landing')
  const cmsAbout = useCms('about')
  const cmsTeam = useCms('team')
  const cmsServices = useCms('services')
  const cmsHeader = useCms('header')
  const cmsFooter = useCms('footer')

  const currentLanding = landingForm || cmsLanding.data;
  const currentAbout = aboutForm || cmsAbout.data;
  const currentTeam = teamForm || cmsTeam.data;
  const currentServices = servicesForm || cmsServices.data;
  const currentHeader = headerForm || cmsHeader.data;
  const currentFooter = footerForm || cmsFooter.data;

  const editorLoading = activeTab !== 'migration' && (
    !cmsLanding.data || 
    !cmsAbout.data || 
    !cmsTeam.data || 
    !cmsServices.data ||
    !cmsHeader.data ||
    !cmsFooter.data
  );

  // Track auth changes
  useEffect(() => {
    // Process redirect sign-in result if returning from Google Auth page
    getRedirectResult(auth).catch((error) => {
      console.error('Error getting redirect result:', error)
    })

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setAuthLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.warn('Popup login failed, attempting redirect:', error)
      try {
        await signInWithRedirect(auth, googleProvider)
      } catch (redirectError) {
        console.error('Redirect login failed:', redirectError)
      }
    }
  }

  const handleLoginRedirect = async () => {
    try {
      setAuthLoading(true)
      await signInWithRedirect(auth, googleProvider)
    } catch (error) {
      console.error('Redirect login failed:', error)
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const runMigration = async () => {
    setMigrationLoading(true)
    try {
      const results = await migrateAllData()
      setMigrationStatus(results)
    } catch (error) {
      setMigrationStatus([{ key: 'Global', success: false, error: error.message }])
    } finally {
      setMigrationLoading(false)
    }
  }

  const handleSave = async (tabName, formData, updateFn) => {
    setSaveStatus({ loading: true, success: null, error: null })
    const result = await updateFn(formData)
    if (result.success) {
      setSaveStatus({ loading: false, success: `Successfully updated ${tabName} content!`, error: null })
      setTimeout(() => setSaveStatus({ loading: false, success: null, error: null }), 4000)
    } else {
      setSaveStatus({ loading: false, success: null, error: result.error?.message || 'Save failed' })
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b15] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1527] text-white px-4 relative overflow-hidden font-sans">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] text-sky-400 font-semibold">Navrachna Foundation</span>
            <h1 className="text-2xl font-light text-slate-100 mt-2">CMS Admin Console</h1>
            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              Log in with your authorized Google Account to manage live website headings, team profiles, prototyping tools, and FAQs.
            </p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-950 px-5 py-3.5 rounded-xl font-medium transition-all transform active:scale-95 shadow-lg shadow-white/5 cursor-pointer"
          >
            {/* Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 15.02 1 12 1 7.21 1 3.19 3.73 1.24 7.74l3.96 3.07C6.18 7.73 8.87 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.58l3.77 2.92c2.2-2.03 3.68-5.02 3.68-8.65z"
              />
              <path
                fill="#FBBC05"
                d="M5.2 14.28c-.25-.74-.39-1.53-.39-2.35s.14-1.61.39-2.35L1.24 6.5C.45 8.12 0 9.97 0 12c0 2.03.45 3.88 1.24 5.5l3.96-3.22z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.77-2.92c-1.05.7-2.4 1.12-4.19 1.12-3.13 0-5.82-2.69-6.8-5.77L1.24 15.75C3.19 19.76 7.21 23 12 23z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="mt-4 text-center">
            <button
              onClick={handleLoginRedirect}
              className="text-xs text-sky-400 hover:text-sky-300 transition-colors underline bg-transparent border-0 cursor-pointer"
            >
              Trouble signing in? Try Redirect Method
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070b15] text-slate-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-900 p-6 flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-sky-400 font-bold block">Navrachna</span>
            <span className="text-base text-slate-100 font-light block mt-1">Admin Dashboard</span>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'landing', label: 'Landing Page' },
              { id: 'about', label: 'About Page' },
              { id: 'team', label: 'Our Team' },
              { id: 'services', label: 'Services & Tools' },
              { id: 'header', label: 'Header Menu' },
              { id: 'footer', label: 'Footer Menu' },
              { id: 'migration', label: 'Migration Tools' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User profile card & logout */}
        <div className="border-t border-slate-900 pt-6 mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-slate-800" />
            )}
            <div className="min-w-0">
              <span className="text-xs font-medium text-slate-200 block truncate">{user.displayName}</span>
              <span className="text-[10px] text-slate-500 block truncate">{user.email}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-center bg-slate-900 hover:bg-slate-850 text-slate-300 py-2 rounded-xl text-xs font-medium transition-colors border border-slate-800 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main editor zone */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-4xl w-full mx-auto pb-24">
        {/* Status notification toast */}
        {saveStatus.success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            {saveStatus.success}
          </div>
        )}
        {saveStatus.error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            Error: {saveStatus.error}
          </div>
        )}

        {editorLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
            <span className="text-xs text-slate-500 font-medium">Loading CMS configuration from Firestore...</span>
          </div>
        ) : (
          <>
            {/* ── TAB: LANDING ── */}
            {activeTab === 'landing' && currentLanding && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-light text-slate-100">Edit Landing Page</h2>
              <p className="text-slate-400 text-xs">Update your hero section, statistics, and business info.</p>
            </div>

            {/* 1. Hero Section */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Hero Section</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Title</label>
                <input
                  type="text"
                  value={currentLanding.hero?.title || ''}
                  onChange={(e) => setLandingForm({ ...currentLanding, hero: { ...currentLanding.hero, title: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Description</label>
                <textarea
                  value={currentLanding.hero?.description || ''}
                  onChange={(e) => setLandingForm({ ...currentLanding, hero: { ...currentLanding.hero, description: e.target.value } })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Subtitle</label>
                <input
                  type="text"
                  value={currentLanding.hero?.subtitle || ''}
                  onChange={(e) => setLandingForm({ ...currentLanding, hero: { ...currentLanding.hero, subtitle: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <FontSizeSelect
                  label="Title Font Size"
                  value={currentLanding.hero?.titleSize}
                  onChange={(val) => setLandingForm({ ...currentLanding, hero: { ...currentLanding.hero, titleSize: val } })}
                  defaultLabel="6XL"
                />
                <FontSizeSelect
                  label="Description Font Size"
                  value={currentLanding.hero?.descSize}
                  onChange={(val) => setLandingForm({ ...currentLanding, hero: { ...currentLanding.hero, descSize: val } })}
                  defaultLabel="Medium"
                />
              </div>
            </div>

            {/* 2. Announcements / Updates */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Latest Updates / Announcements</h3>
              <div className="flex flex-col gap-3">
                {(currentLanding.updates || []).map((update, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={update}
                      onChange={(e) => {
                        const nextUpdates = [...(currentLanding.updates || [])]
                        nextUpdates[idx] = e.target.value
                        setLandingForm({ ...currentLanding, updates: nextUpdates })
                      }}
                      className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                    />
                    <button
                      onClick={() => {
                        const nextUpdates = (currentLanding.updates || []).filter((_, i) => i !== idx)
                        setLandingForm({ ...currentLanding, updates: nextUpdates })
                      }}
                      className="p-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer border-0 bg-transparent"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setLandingForm({ ...currentLanding, updates: [...(currentLanding.updates || []), ''] })}
                  className="text-xs text-sky-400 hover:text-sky-300 self-start mt-1 cursor-pointer bg-transparent border-0"
                >
                  + Add Update Announcement
                </button>
              </div>
            </div>

            {/* 3. NFED Section */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">NFED About Section</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Section Title</label>
                <input
                  type="text"
                  value={currentLanding.nfedSection?.title || ''}
                  onChange={(e) => setLandingForm({ ...currentLanding, nfedSection: { ...currentLanding.nfedSection, title: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <FontSizeSelect
                label="Section Title Font Size"
                value={currentLanding.nfedSection?.titleSize}
                onChange={(val) => setLandingForm({ ...currentLanding, nfedSection: { ...currentLanding.nfedSection, titleSize: val } })}
                defaultLabel="4XL-5XL"
              />
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase text-slate-500 font-semibold block">Paragraphs</label>
                {(currentLanding.nfedSection?.paragraphs || []).map((p, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <textarea
                      value={p}
                      onChange={(e) => {
                        const nextParagraphs = [...(currentLanding.nfedSection.paragraphs || [])]
                        nextParagraphs[idx] = e.target.value
                        setLandingForm({ ...currentLanding, nfedSection: { ...currentLanding.nfedSection, paragraphs: nextParagraphs } })
                      }}
                      rows={3}
                      className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                    />
                    <button
                      onClick={() => {
                        const nextParagraphs = (currentLanding.nfedSection.paragraphs || []).filter((_, i) => i !== idx)
                        setLandingForm({ ...currentLanding, nfedSection: { ...currentLanding.nfedSection, paragraphs: nextParagraphs } })
                      }}
                      className="p-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer border-0 bg-transparent mt-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const currentParas = currentLanding.nfedSection?.paragraphs || []
                    setLandingForm({ ...currentLanding, nfedSection: { ...currentLanding.nfedSection, paragraphs: [...currentParas, ''] } })
                  }}
                  className="text-xs text-sky-400 hover:text-sky-300 self-start mt-1 cursor-pointer bg-transparent border-0"
                >
                  + Add Paragraph
                </button>
              </div>
            </div>

            {/* 4. Section Subheadings */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Page Section Subheadings</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Our Spaces Section Description</label>
                <textarea
                  value={currentLanding.ourSpacesHeader?.description || ''}
                  onChange={(e) => setLandingForm({ ...currentLanding, ourSpacesHeader: { description: e.target.value } })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Schemes Section Description</label>
                <textarea
                  value={currentLanding.schemesHeader?.description || ''}
                  onChange={(e) => setLandingForm({ ...currentLanding, schemesHeader: { description: e.target.value } })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Facilities Section Description</label>
                <textarea
                  value={currentLanding.facilitiesHeader?.description || ''}
                  onChange={(e) => setLandingForm({ ...currentLanding, facilitiesHeader: { description: e.target.value } })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
            </div>

            {/* 5. FAQs List */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Frequently Asked Questions</h3>
              <div className="flex flex-col gap-6">
                {(currentLanding.faqs || []).map((faq, idx) => (
                  <div key={idx} className="border-b border-slate-900 pb-4 flex flex-col gap-3 relative group">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase">FAQ #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const nextFaqs = (currentLanding.faqs || []).filter((_, i) => i !== idx)
                          setLandingForm({ ...currentLanding, faqs: nextFaqs })
                        }}
                        className="text-xs text-rose-500 hover:text-rose-400 border-0 bg-transparent cursor-pointer"
                      >
                        Remove FAQ
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase text-slate-600 font-semibold">Question</label>
                      <input
                        type="text"
                        value={faq.question || ''}
                        onChange={(e) => {
                          const nextFaqs = [...(currentLanding.faqs || [])]
                          nextFaqs[idx] = { ...faq, question: e.target.value }
                          setLandingForm({ ...currentLanding, faqs: nextFaqs })
                        }}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase text-slate-600 font-semibold">Answer</label>
                      <textarea
                        value={faq.answer || ''}
                        onChange={(e) => {
                          const nextFaqs = [...(currentLanding.faqs || [])]
                          nextFaqs[idx] = { ...faq, answer: e.target.value }
                          setLandingForm({ ...currentLanding, faqs: nextFaqs })
                        }}
                        rows={2}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setLandingForm({ ...currentLanding, faqs: [...(currentLanding.faqs || []), { question: '', answer: '' }] })}
                  className="text-xs text-sky-400 hover:text-sky-300 self-start mt-1 cursor-pointer bg-transparent border-0"
                >
                  + Add New FAQ Item
                </button>
              </div>
            </div>

            <button
              onClick={() => handleSave('Landing Page', currentLanding, cmsLanding.updateData)}
              disabled={saveStatus.loading}
              className="bg-sky-500 hover:bg-sky-600 text-slate-950 px-6 py-3 rounded-xl font-medium text-xs self-start transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saveStatus.loading ? 'Saving...' : 'Save Landing Changes'}
            </button>
          </div>
        )}

        {/* ── TAB: ABOUT ── */}
        {activeTab === 'about' && currentAbout && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-light text-slate-100">Edit About Page</h2>
              <p className="text-slate-400 text-xs">Update history details, vision, and mission objectives.</p>
            </div>

            {/* 1. Hero Section */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Hero Section</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Eyebrow</label>
                <input
                  type="text"
                  value={currentAbout.hero?.eyebrow || ''}
                  onChange={(e) => setAboutForm({ ...currentAbout, hero: { ...currentAbout.hero, eyebrow: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Title</label>
                <input
                  type="text"
                  value={currentAbout.hero?.title || ''}
                  onChange={(e) => setAboutForm({ ...currentAbout, hero: { ...currentAbout.hero, title: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Description</label>
                <textarea
                  value={currentAbout.hero?.description || ''}
                  onChange={(e) => setAboutForm({ ...currentAbout, hero: { ...currentAbout.hero, description: e.target.value } })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <FontSizeSelect
                  label="Title Font Size"
                  value={currentAbout.hero?.titleSize}
                  onChange={(val) => setAboutForm({ ...currentAbout, hero: { ...currentAbout.hero, titleSize: val } })}
                  defaultLabel="4XL-5XL"
                />
                <FontSizeSelect
                  label="Description Font Size"
                  value={currentAbout.hero?.descSize}
                  onChange={(val) => setAboutForm({ ...currentAbout, hero: { ...currentAbout.hero, descSize: val } })}
                  defaultLabel="Small"
                />
              </div>
            </div>

            {/* 2. Who We Are */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Who We Are Section</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Section Eyebrow</label>
                <input
                  type="text"
                  value={currentAbout.whoWeAre?.eyebrow || ''}
                  onChange={(e) => setAboutForm({ ...currentAbout, whoWeAre: { ...currentAbout.whoWeAre, eyebrow: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Section Title</label>
                <input
                  type="text"
                  value={currentAbout.whoWeAre?.title || ''}
                  onChange={(e) => setAboutForm({ ...currentAbout, whoWeAre: { ...currentAbout.whoWeAre, title: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <FontSizeSelect
                label="Section Title Font Size"
                value={currentAbout.whoWeAre?.titleSize}
                onChange={(val) => setAboutForm({ ...currentAbout, whoWeAre: { ...currentAbout.whoWeAre, titleSize: val } })}
                defaultLabel="3XL-4XL"
              />
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase text-slate-500 font-semibold block">Paragraphs</label>
                {(currentAbout.whoWeAre?.paragraphs || []).map((p, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <textarea
                      value={p}
                      onChange={(e) => {
                        const nextParagraphs = [...(currentAbout.whoWeAre.paragraphs || [])]
                        nextParagraphs[idx] = e.target.value
                        setAboutForm({ ...currentAbout, whoWeAre: { ...currentAbout.whoWeAre, paragraphs: nextParagraphs } })
                      }}
                      rows={4}
                      className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                    />
                    <button
                      onClick={() => {
                        const nextParagraphs = (currentAbout.whoWeAre.paragraphs || []).filter((_, i) => i !== idx)
                        setAboutForm({ ...currentAbout, whoWeAre: { ...currentAbout.whoWeAre, paragraphs: nextParagraphs } })
                      }}
                      className="p-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer border-0 bg-transparent mt-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const currentParas = currentAbout.whoWeAre?.paragraphs || []
                    setAboutForm({ ...currentAbout, whoWeAre: { ...currentAbout.whoWeAre, paragraphs: [...currentParas, ''] } })
                  }}
                  className="text-xs text-sky-400 hover:text-sky-300 self-start mt-1 cursor-pointer bg-transparent border-0"
                >
                  + Add Paragraph
                </button>
              </div>
            </div>

            {/* 3. Vision & Mission */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Vision & Mission</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Vision Description</label>
                <textarea
                  value={currentAbout.visionMission?.vision?.description || ''}
                  onChange={(e) => setAboutForm({
                    ...currentAbout,
                    visionMission: {
                      ...currentAbout.visionMission,
                      vision: { ...(currentAbout.visionMission?.vision || {}), description: e.target.value }
                    }
                  })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Mission Description</label>
                <textarea
                  value={currentAbout.visionMission?.mission?.description || ''}
                  onChange={(e) => setAboutForm({
                    ...currentAbout,
                    visionMission: {
                      ...currentAbout.visionMission,
                      mission: { ...(currentAbout.visionMission?.mission || {}), description: e.target.value }
                    }
                  })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
            </div>

            {/* 4. Leadership Messages */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Leadership Messages</h3>
              <div className="flex flex-col gap-6">
                {(currentAbout.leadership || []).map((leader, idx) => (
                  <div key={idx} className="border-b border-slate-900 pb-4 flex flex-col gap-3">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">{leader.role}</span>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase text-slate-600 font-semibold">Title</label>
                      <input
                        type="text"
                        value={leader.title || ''}
                        onChange={(e) => {
                          const nextLeadership = [...(currentAbout.leadership || [])]
                          nextLeadership[idx] = { ...leader, title: e.target.value }
                          setAboutForm({ ...currentAbout, leadership: nextLeadership })
                        }}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase text-slate-600 font-semibold">Message Body</label>
                      <textarea
                        value={leader.message || ''}
                        onChange={(e) => {
                          const nextLeadership = [...(currentAbout.leadership || [])]
                          nextLeadership[idx] = { ...leader, message: e.target.value }
                          setAboutForm({ ...currentAbout, leadership: nextLeadership })
                        }}
                        rows={6}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSave('About Page', currentAbout, cmsAbout.updateData)}
              disabled={saveStatus.loading}
              className="bg-sky-500 hover:bg-sky-600 text-slate-950 px-6 py-3 rounded-xl font-medium text-xs self-start transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saveStatus.loading ? 'Saving...' : 'Save About Changes'}
            </button>
          </div>
        )}

        {/* ── TAB: TEAM ── */}
        {activeTab === 'team' && currentTeam && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-light text-slate-100">Edit Team Page</h2>
              <p className="text-slate-400 text-xs">Manage your advisors, executives, and team profiles.</p>
            </div>

            {/* Hero */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Team Hero</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Title</label>
                <input
                  type="text"
                  value={currentTeam.hero?.title || ''}
                  onChange={(e) => setTeamForm({ ...currentTeam, hero: { ...currentTeam.hero, title: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Description</label>
                <textarea
                  value={currentTeam.hero?.description || ''}
                  onChange={(e) => setTeamForm({ ...currentTeam, hero: { ...currentTeam.hero, description: e.target.value } })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <FontSizeSelect
                label="Hero Title Font Size"
                value={currentTeam.hero?.titleSize}
                onChange={(val) => setTeamForm({ ...currentTeam, hero: { ...currentTeam.hero, titleSize: val } })}
                defaultLabel="4XL-5XL"
              />
            </div>

            {/* Team Members List */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Team Members List</h3>
              <div className="flex flex-col gap-6">
                {(currentTeam.members || []).map((member, idx) => (
                  <div key={idx} className="border-b border-slate-900 pb-6 flex flex-col gap-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase">Member #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const nextMembers = (currentTeam.members || []).filter((_, i) => i !== idx)
                          setTeamForm({ ...currentTeam, members: nextMembers })
                        }}
                        className="text-xs text-rose-500 hover:text-rose-400 border-0 bg-transparent cursor-pointer"
                      >
                        Remove Member
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase text-slate-600 font-semibold">Name</label>
                        <input
                          type="text"
                          value={member.name || ''}
                          onChange={(e) => {
                            const nextMembers = [...(currentTeam.members || [])]
                            nextMembers[idx] = { ...member, name: e.target.value }
                            setTeamForm({ ...currentTeam, members: nextMembers })
                          }}
                          className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase text-slate-600 font-semibold">Role</label>
                        <input
                          type="text"
                          value={member.role || ''}
                          onChange={(e) => {
                            const nextMembers = [...(currentTeam.members || [])]
                            nextMembers[idx] = { ...member, role: e.target.value }
                            setTeamForm({ ...currentTeam, members: nextMembers })
                          }}
                          className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase text-slate-600 font-semibold">Tag Label (on Photo)</label>
                        <input
                          type="text"
                          value={member.tag || ''}
                          onChange={(e) => {
                            const nextMembers = [...(currentTeam.members || [])]
                            nextMembers[idx] = { ...member, tag: e.target.value }
                            setTeamForm({ ...currentTeam, members: nextMembers })
                          }}
                          className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase text-slate-600 font-semibold">Expertise (comma separated)</label>
                        <input
                          type="text"
                          value={(member.expertise || []).join(', ')}
                          onChange={(e) => {
                            const nextMembers = [...(currentTeam.members || [])]
                            nextMembers[idx] = { ...member, expertise: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                            setTeamForm({ ...currentTeam, members: nextMembers })
                          }}
                          className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setTeamForm({
                    ...currentTeam,
                    members: [...(currentTeam.members || []), { name: '', role: '', tag: '', expertise: [], imageKey: 'mishra' }]
                  })}
                  className="text-xs text-sky-400 hover:text-sky-300 self-start mt-1 cursor-pointer bg-transparent border-0"
                >
                  + Add Team Member
                </button>
              </div>
            </div>

            <button
              onClick={() => handleSave('Team Page', currentTeam, cmsTeam.updateData)}
              disabled={saveStatus.loading}
              className="bg-sky-500 hover:bg-sky-600 text-slate-950 px-6 py-3 rounded-xl font-medium text-xs self-start transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saveStatus.loading ? 'Saving...' : 'Save Team Changes'}
            </button>
          </div>
        )}

        {/* ── TAB: SERVICES ── */}
        {activeTab === 'services' && currentServices && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-light text-slate-100">Edit Services & Lab Tools</h2>
              <p className="text-slate-400 text-xs">Update description texts and configure lab equipment records.</p>
            </div>

            {/* Hero */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Services Hero</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Title</label>
                <input
                  type="text"
                  value={currentServices.hero?.title || ''}
                  onChange={(e) => setServicesForm({ ...currentServices, hero: { ...currentServices.hero, title: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">Hero Description</label>
                <textarea
                  value={currentServices.hero?.description || ''}
                  onChange={(e) => setServicesForm({ ...currentServices, hero: { ...currentServices.hero, description: e.target.value } })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <FontSizeSelect
                label="Hero Title Font Size"
                value={currentServices.hero?.titleSize}
                onChange={(val) => setServicesForm({ ...currentServices, hero: { ...currentServices.hero, titleSize: val } })}
                defaultLabel="3XL-4XL"
              />
            </div>

            {/* Lab Tools List */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Lab Equipment / Tools</h3>
              <div className="flex flex-col gap-6">
                {(currentServices.tools || []).map((tool, idx) => (
                  <div key={idx} className="border-b border-slate-900 pb-6 flex flex-col gap-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase">Tool #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const nextTools = (currentServices.tools || []).filter((_, i) => i !== idx)
                          setServicesForm({ ...currentServices, tools: nextTools })
                        }}
                        className="text-xs text-rose-500 hover:text-rose-400 border-0 bg-transparent cursor-pointer"
                      >
                        Remove Tool
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase text-slate-600 font-semibold">Tool Name</label>
                        <input
                          type="text"
                          value={tool.name || ''}
                          onChange={(e) => {
                            const nextTools = [...(currentServices.tools || [])]
                            nextTools[idx] = { ...tool, name: e.target.value }
                            setServicesForm({ ...currentServices, tools: nextTools })
                          }}
                          className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase text-slate-600 font-semibold">Category</label>
                        <input
                          type="text"
                          value={tool.category || ''}
                          onChange={(e) => {
                            const nextTools = [...(currentServices.tools || [])]
                            nextTools[idx] = { ...tool, category: e.target.value }
                            setServicesForm({ ...currentServices, tools: nextTools })
                          }}
                          placeholder="e.g. Measurement, Electronics, 3D Printing"
                          className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[9px] uppercase text-slate-600 font-semibold">Description</label>
                        <textarea
                          value={tool.description || ''}
                          onChange={(e) => {
                            const nextTools = [...(currentServices.tools || [])]
                            nextTools[idx] = { ...tool, description: e.target.value }
                            setServicesForm({ ...currentServices, tools: nextTools })
                          }}
                          rows={2}
                          className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setServicesForm({
                    ...currentServices,
                    tools: [...(currentServices.tools || []), { name: '', description: '', category: '' }]
                  })}
                  className="text-xs text-sky-400 hover:text-sky-300 self-start mt-1 cursor-pointer bg-transparent border-0"
                >
                  + Add Lab Tool
                </button>
              </div>
            </div>

            {/* FAQs Section */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Services FAQs</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">FAQ Header Title</label>
                <input
                  type="text"
                  value={currentServices.faqHeader?.title || ''}
                  onChange={(e) => setServicesForm({ ...currentServices, faqHeader: { ...currentServices.faqHeader, title: e.target.value } })}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">FAQ Header Description</label>
                <textarea
                  value={currentServices.faqHeader?.description || ''}
                  onChange={(e) => setServicesForm({ ...currentServices, faqHeader: { ...currentServices.faqHeader, description: e.target.value } })}
                  rows={2}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                />
              </div>

              <div className="flex flex-col gap-6 mt-4">
                <label className="text-[10px] uppercase text-slate-500 font-semibold">FAQ List</label>
                {(currentServices.faqs || []).map((faq, idx) => (
                  <div key={idx} className="border-b border-slate-900 pb-4 flex flex-col gap-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase">FAQ #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const nextFaqs = (currentServices.faqs || []).filter((_, i) => i !== idx)
                          setServicesForm({ ...currentServices, faqs: nextFaqs })
                        }}
                        className="text-xs text-rose-500 hover:text-rose-400 border-0 bg-transparent cursor-pointer"
                      >
                        Remove FAQ
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase text-slate-600 font-semibold">Question</label>
                      <input
                        type="text"
                        value={faq.q || ''}
                        onChange={(e) => {
                          const nextFaqs = [...(currentServices.faqs || [])]
                          nextFaqs[idx] = { ...faq, q: e.target.value }
                          setServicesForm({ ...currentServices, faqs: nextFaqs })
                        }}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase text-slate-600 font-semibold">Answer</label>
                      <textarea
                        value={faq.a || ''}
                        onChange={(e) => {
                          const nextFaqs = [...(currentServices.faqs || [])]
                          nextFaqs[idx] = { ...faq, a: e.target.value }
                          setServicesForm({ ...currentServices, faqs: nextFaqs })
                        }}
                        rows={2}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setServicesForm({ ...currentServices, faqs: [...(currentServices.faqs || []), { q: '', a: '' }] })}
                  className="text-xs text-sky-400 hover:text-sky-300 self-start mt-1 cursor-pointer bg-transparent border-0"
                >
                  + Add FAQ
                </button>
              </div>
            </div>

            <button
              onClick={() => handleSave('Services Page', currentServices, cmsServices.updateData)}
              disabled={saveStatus.loading}
              className="bg-sky-500 hover:bg-sky-600 text-slate-950 px-6 py-3 rounded-xl font-medium text-xs self-start transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saveStatus.loading ? 'Saving...' : 'Save Services Changes'}
            </button>
          </div>
        )}

        {/* ── TAB: HEADER ── */}
        {activeTab === 'header' && currentHeader && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-light text-slate-100">Header Editor</h2>
                <p className="text-slate-400 text-xs">Customize top contact information, social links, and the navbar brand text.</p>
              </div>
              <button
                onClick={() => handleSave('Header', currentHeader, cmsHeader.updateData)}
                disabled={saveStatus.loading}
                className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-slate-950 px-6 py-2.5 rounded-xl font-medium text-xs transition-colors cursor-pointer shadow-lg shadow-sky-500/10"
              >
                {saveStatus.loading ? 'Saving...' : 'Save Header Changes'}
              </button>
            </div>

            {/* Live Preview section */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <span className="text-[10px] uppercase text-sky-400 font-bold tracking-wider">Live Preview (Real-time)</span>
              <div className="border border-slate-800 rounded-xl overflow-hidden pointer-events-none select-none shadow-inner bg-white scale-[0.85] origin-top transition-transform">
                <HeaderV1 data={currentHeader} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Column 1: Contact Details */}
              <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Contact Info</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Phone Number</label>
                  <input
                    type="text"
                    value={currentHeader.topBar?.phone || ''}
                    onChange={(e) => setHeaderForm({
                      ...currentHeader,
                      topBar: { ...currentHeader.topBar, phone: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={currentHeader.topBar?.email || ''}
                    onChange={(e) => setHeaderForm({
                      ...currentHeader,
                      topBar: { ...currentHeader.topBar, email: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Brand Name</label>
                  <input
                    type="text"
                    value={currentHeader.navbar?.brandName || ''}
                    onChange={(e) => setHeaderForm({
                      ...currentHeader,
                      navbar: { ...currentHeader.navbar, brandName: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
              </div>

              {/* Form Column 2: Social Media handles */}
              <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Social Handles</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Facebook URL</label>
                  <input
                    type="text"
                    value={currentHeader.topBar?.facebook || ''}
                    onChange={(e) => setHeaderForm({
                      ...currentHeader,
                      topBar: { ...currentHeader.topBar, facebook: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Instagram URL</label>
                  <input
                    type="text"
                    value={currentHeader.topBar?.instagram || ''}
                    onChange={(e) => setHeaderForm({
                      ...currentHeader,
                      topBar: { ...currentHeader.topBar, instagram: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">LinkedIn URL</label>
                  <input
                    type="text"
                    value={currentHeader.topBar?.linkedin || ''}
                    onChange={(e) => setHeaderForm({
                      ...currentHeader,
                      topBar: { ...currentHeader.topBar, linkedin: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: FOOTER ── */}
        {activeTab === 'footer' && currentFooter && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-light text-slate-100">Footer Editor</h2>
                <p className="text-slate-400 text-xs">Customize footer descriptions, contact locations, social accounts, copyright and credit labels.</p>
              </div>
              <button
                onClick={() => handleSave('Footer', currentFooter, cmsFooter.updateData)}
                disabled={saveStatus.loading}
                className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-slate-950 px-6 py-2.5 rounded-xl font-medium text-xs transition-colors cursor-pointer shadow-lg shadow-sky-500/10"
              >
                {saveStatus.loading ? 'Saving...' : 'Save Footer Changes'}
              </button>
            </div>

            {/* Live Preview section */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <span className="text-[10px] uppercase text-sky-400 font-bold tracking-wider">Live Preview (Real-time)</span>
              <div className="border border-slate-800 rounded-xl overflow-hidden pointer-events-none select-none shadow-inner bg-slate-950 scale-[0.85] origin-top transition-transform max-h-[300px] overflow-y-auto">
                <FooterV1 data={currentFooter} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Column 1: Branding and Details */}
              <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Branding</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Brand Title</label>
                  <input
                    type="text"
                    value={currentFooter.brand?.title || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      brand: { ...currentFooter.brand, title: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">About Description</label>
                  <textarea
                    value={currentFooter.brand?.description || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      brand: { ...currentFooter.brand, description: e.target.value }
                    })}
                    rows={4}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Copyright Text</label>
                  <input
                    type="text"
                    value={currentFooter.bottomBar?.copyright || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      bottomBar: { ...currentFooter.bottomBar, copyright: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Credits Text</label>
                  <input
                    type="text"
                    value={currentFooter.bottomBar?.credits || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      bottomBar: { ...currentFooter.bottomBar, credits: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
              </div>

              {/* Form Column 2: Contact Details & Socials */}
              <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Location & Socials</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Physical Address</label>
                  <textarea
                    value={currentFooter.contact?.address || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      contact: { ...currentFooter.contact, address: e.target.value }
                    })}
                    rows={2}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Phone Number</label>
                  <input
                    type="text"
                    value={currentFooter.contact?.phone || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      contact: { ...currentFooter.contact, phone: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={currentFooter.contact?.email || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      contact: { ...currentFooter.contact, email: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Facebook URL</label>
                  <input
                    type="text"
                    value={currentFooter.socials?.facebook || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      socials: { ...currentFooter.socials, facebook: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">Instagram URL</label>
                  <input
                    type="text"
                    value={currentFooter.socials?.instagram || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      socials: { ...currentFooter.socials, instagram: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase text-slate-500 font-semibold">LinkedIn URL</label>
                  <input
                    type="text"
                    value={currentFooter.socials?.linkedin || ''}
                    onChange={(e) => setFooterForm({
                      ...currentFooter,
                      socials: { ...currentFooter.socials, linkedin: e.target.value }
                    })}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: MIGRATION ── */}
        {activeTab === 'migration' && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-light text-slate-100">Database Migration Tools</h2>
              <p className="text-slate-400 text-xs">Push your default file-based JSON CMS data to populate the live Firestore database collections.</p>
            </div>

            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">Hydrate Cloud Database</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clicking the button below will automatically load all records from `landing.json`, `about.json`, `team.json`, `services.json`, `header.json`, and `footer.json` and upload them to dynamic Firestore documents. This will establish initial live content.
              </p>

              <button
                onClick={runMigration}
                disabled={migrationLoading}
                className="bg-sky-500 hover:bg-sky-600 text-slate-950 px-6 py-3 rounded-xl font-medium text-xs self-start transition-colors disabled:opacity-50 cursor-pointer"
              >
                {migrationLoading ? 'Migrating...' : 'Migrate Local JSON to Firestore'}
              </button>

              {migrationStatus && (
                <div className="mt-4 border border-slate-900 rounded-xl p-4 flex flex-col gap-2">
                  <h4 className="text-xs font-semibold text-slate-300">Migration Report:</h4>
                  <ul className="text-xs flex flex-col gap-1">
                    {migrationStatus.map((res, i) => (
                      <li key={i} className={res.success ? 'text-emerald-400' : 'text-rose-400'}>
                        ● {res.key}: {res.success ? 'Successfully migrated' : `Failed (${res.error})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
          </>
        )}
      </main>
    </div>
  )
}
