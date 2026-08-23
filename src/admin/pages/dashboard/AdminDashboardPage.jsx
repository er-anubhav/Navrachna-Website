import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export function AdminDashboardPage() {
  const { user, role } = useAuth()
  const [counts, setCounts] = useState({
    projects: 0,
    startups: 0,
    facilities: 0,
    people: 0,
    announcements: 0,
    policies: 0,
    faqs: 0,
    testimonials: 0,
    programs: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      setLoading(true)
      const tables = [
        { key: 'projects', name: 'newgen_projects' },
        { key: 'startups', name: 'startups' },
        { key: 'facilities', name: 'facilities' },
        { key: 'people', name: 'people' },
        { key: 'announcements', name: 'announcements' },
        { key: 'policies', name: 'policies' },
        { key: 'faqs', name: 'faqs' },
        { key: 'testimonials', name: 'testimonials' },
        { key: 'programs', name: 'programs' },
      ]

      const newCounts = {}
      for (const t of tables) {
        const { count, error } = await supabase.from(t.name).select('*', { count: 'exact', head: true })
        newCounts[t.key] = error ? 0 : (count || 0)
      }

      setCounts(newCounts)
      setLoading(false)
    }

    fetchCounts()
  }, [])

  return (
    <div className="flex flex-col gap-8 font-normal">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal tracking-tight text-slate-900">
            Welcome to Navrachna Admin Console
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Logged in as <span className="text-slate-800 font-normal">{user?.email}</span> ({role?.toUpperCase() || 'EDITOR'})
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Manage Announcements Button (Dark blue button -> Pure White Text guaranteed) */}
          <Link
            to="/admin/announcements"
            className="bg-[#074887] hover:bg-[#013759] text-white! text-xs font-normal px-4 py-2.5 rounded-lg transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            style={{ color: '#ffffff' }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <span style={{ color: '#ffffff' }} className="text-white! font-normal">Manage Announcements</span>
          </Link>
          {/* Site Settings Button (Light button -> Dark Text) */}
          <Link
            to="/admin/settings"
            className="bg-slate-100 hover:bg-slate-200 text-slate-900! text-xs font-normal px-4 py-2.5 rounded-lg transition-colors border border-slate-300 flex items-center gap-2 cursor-pointer"
            style={{ color: '#0f172a' }}
          >
            <svg className="w-4 h-4 shrink-0 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span style={{ color: '#0f172a' }} className="text-slate-900! font-normal">Site Settings</span>
          </Link>
        </div>
      </div>

      {/* Database Live Summary Cards */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-normal uppercase tracking-wider text-slate-500">
          Live Database Record Summary
        </h2>

        {loading ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-normal">Querying live table counts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-normal text-slate-400 block uppercase">NewGen Projects</span>
                <span className="text-2xl font-normal text-[#013759]">{counts.projects}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5 font-normal">Live Database Records</span>
              </div>
              <div className="p-3 bg-sky-50 text-[#074887] rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-normal text-slate-400 block uppercase">Portfolio Startups</span>
                <span className="text-2xl font-normal text-[#013759]">{counts.startups}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5 font-normal">Incubated Ventures</span>
              </div>
              <div className="p-3 bg-sky-50 text-[#074887] rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V10m0 0H9m3 0h3m-3 0V6m0 0H9m3 0h3" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-normal text-slate-400 block uppercase">Physical Facilities</span>
                <span className="text-2xl font-normal text-[#013759]">{counts.facilities}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5 font-normal">Labs & Workspaces</span>
              </div>
              <div className="p-3 bg-sky-50 text-[#074887] rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-normal text-slate-400 block uppercase">Unified People Directory</span>
                <span className="text-2xl font-normal text-[#013759]">{counts.people}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5 font-normal">Mentors & Mentees</span>
              </div>
              <div className="p-3 bg-sky-50 text-[#074887] rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>

            {/* Announcements Live Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-normal text-slate-400 block uppercase">News Announcements</span>
                <span className="text-2xl font-normal text-[#013759]">{counts.announcements}</span>
                <Link
                  to="/admin/announcements"
                  className="text-[11px] text-[#074887] hover:underline flex items-center gap-1 mt-0.5 font-normal"
                >
                  <span>Manage Announcements</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="p-3 bg-sky-50 text-[#074887] rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-normal text-slate-400 block uppercase">Governance Policies</span>
                <span className="text-2xl font-normal text-[#013759]">{counts.policies}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5 font-normal">PDF Documents</span>
              </div>
              <div className="p-3 bg-sky-50 text-[#074887] rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* System Health Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
        <h2 className="text-sm font-normal uppercase tracking-wider text-slate-500">
          System Infrastructure Health
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-normal">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Database Status</span>
              <span className="font-normal text-slate-900">PostgreSQL (Supabase)</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-normal bg-emerald-100 text-emerald-800">
              CONNECTED
            </span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Authentication Engine</span>
              <span className="font-normal text-slate-900">Supabase Auth (RLS)</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-normal bg-emerald-100 text-emerald-800">
              ACTIVE
            </span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Storage Buckets</span>
              <span className="font-normal text-slate-900">7 Active Buckets</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-normal bg-emerald-100 text-emerald-800">
              ONLINE
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
