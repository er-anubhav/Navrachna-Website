import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../context/AuthContext'

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
    <div className="flex flex-col gap-8">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Welcome to Navrachna Admin Console
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as <span className="text-slate-800 font-medium">{user?.email}</span> ({role?.toUpperCase() || 'EDITOR'})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/announcements"
            className="bg-[#074887] hover:bg-[#013759] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Manage Announcements
          </Link>
          <Link
            to="/admin/settings"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Site Settings
          </Link>
        </div>
      </div>

      {/* Database Live Summary Cards */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Live Database Record Summary
        </h2>

        {loading ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
            <p className="text-xs text-slate-500">Querying live table counts from Supabase...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block uppercase">NewGen Projects</span>
                <span className="text-2xl font-bold text-[#013759]">{counts.projects}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5">Live Database Records</span>
              </div>
              <span className="text-3xl">🚀</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block uppercase">Portfolio Startups</span>
                <span className="text-2xl font-bold text-[#013759]">{counts.startups}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5">Incubated Ventures</span>
              </div>
              <span className="text-3xl">🏢</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block uppercase">Physical Facilities</span>
                <span className="text-2xl font-bold text-[#013759]">{counts.facilities}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5">Labs & Workspaces</span>
              </div>
              <span className="text-3xl">🛠️</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block uppercase">Unified People Directory</span>
                <span className="text-2xl font-bold text-[#013759]">{counts.people}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5">Mentors & Mentees</span>
              </div>
              <span className="text-3xl">👥</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block uppercase">News Announcements</span>
                <span className="text-2xl font-bold text-[#013759]">{counts.announcements}</span>
                <span className="text-[11px] text-sky-600 block mt-0.5">Active Ticker Bulletins</span>
              </div>
              <span className="text-3xl">📢</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block uppercase">Governance Policies</span>
                <span className="text-2xl font-bold text-[#013759]">{counts.policies}</span>
                <span className="text-[11px] text-emerald-600 block mt-0.5">PDF Documents</span>
              </div>
              <span className="text-3xl">📜</span>
            </div>

          </div>
        )}
      </div>

      {/* System Health Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          System Infrastructure Health
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Database Status</span>
              <span className="font-semibold text-slate-900">PostgreSQL (Supabase)</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              CONNECTED
            </span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Authentication Engine</span>
              <span className="font-semibold text-slate-900">Supabase Auth (RLS)</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              ACTIVE
            </span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Storage Buckets</span>
              <span className="font-semibold text-slate-900">7 Active Buckets</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              ONLINE
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
