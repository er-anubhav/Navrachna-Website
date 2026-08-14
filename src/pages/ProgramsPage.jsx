import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function ProgramsPage() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPrograms() {
      setLoading(true)
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching programs:', error)
      } else {
        setPrograms(data || [])
      }
      setLoading(false)
    }

    loadPrograms()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 font-normal">
      {/* Hero */}
      <section className="bg-[#013759] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-normal uppercase tracking-widest text-sky-300 block mb-2">
          NAVRACHNA INCUBATION SCHEMES & TRACKS
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight max-w-4xl mx-auto leading-tight">
          Government Grants & Institutional Acceleration Programs
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
          From student prototype funding to Ministry of MSME commercialization grants — explore our specialized program tracks tailored for every startup stage.
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-normal">Loading active programs from Supabase...</p>
          </div>
        ) : programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Link
                key={program.id}
                to={`/programs/${program.slug}`}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:border-[#074887] hover:shadow-md transition-all flex flex-col justify-between font-normal group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-normal uppercase tracking-wider text-[#074887] bg-sky-50 px-2.5 py-1 rounded">
                      {program.type?.replace('_', ' ') || 'SCHEME'}
                    </span>
                    {program.grant_amount && (
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {program.grant_amount}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-normal text-slate-900 group-hover:text-[#074887] transition-colors">
                    {program.name || program.title}
                  </h2>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {program.description || program.summary}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 text-[11px]">/{program.slug}</span>
                  <span className="text-[#074887] font-normal flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Explore Detailed Scheme</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-xs font-normal">
            No active programs currently listed.
          </div>
        )}
      </section>
    </div>
  )
}