import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getNewgenProjectBySlug } from '../../services/projectsService'
import { newgenProjects } from '../../data/newgenProjects'
import { slugify } from '../../utils/slugify'

const formatExpenditure = (exp) => {
  if (!exp || exp === 'NA') return 'NA'
  const num = parseFloat(exp.toString().replace(/[^0-9.]/g, ''))
  if (!isNaN(num) && num > 0) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(num)
  }
  return exp
}

export function NewGenProjectDetailPage() {
  const { projectSlug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      setLoading(true)
      const { data } = await getNewgenProjectBySlug(projectSlug)
      if (data) {
        // Live Supabase record found
        const mentorsList = (data.project_people || [])
          .filter(pp => pp.role_in_project === 'mentor')
          .map(pp => pp.people?.full_name)
          .join(' and ')

        const menteesList = (data.project_people || [])
          .filter(pp => pp.role_in_project === 'mentee')
          .map(pp => pp.people?.full_name)
          .join(', ')

        setProject({
          title: data.title,
          category: data.category_label || (data.cohorts ? `NewGen Projects ${data.cohorts.year_label}` : 'NewGen Projects'),
          image: data.image_url,
          description: data.description,
          mentor: mentorsList || 'Faculty Mentor',
          mentee: menteesList || 'Student Innovators',
          patent_status: data.patent_status,
          patent_id: data.patent_id,
          expenditure: data.expenditure
        })
      } else {
        // Fallback to static array match if offline/unreachable
        const staticMatch = newgenProjects.find((p) => slugify(p.title) === projectSlug)
        setProject(staticMatch || null)
      }
      setLoading(false)
    }

    fetchProject()
  }, [projectSlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-4">Project not found</p>
          <Link to="/programs/newgen-iedc" className="text-xs text-[#013759] hover:underline">
            Back to Directory
          </Link>
        </div>
      </div>
    )
  }

  const hasPatent =
    project.patent_status &&
    project.patent_status.toLowerCase() !== 'na' &&
    project.patent_status.trim() !== ''

  return (
    <div className="min-h-screen bg-white font-sans antialiased" style={{ fontWeight: 400 }}>

      {/* ── Thin top accent bar ── */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#013759] via-[#074887] to-slate-200" />

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 flex flex-col gap-14">

        {/* ── Breadcrumb ── */}
        <Link
          to="/programs/newgen-iedc"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#013759] transition-colors w-fit"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects Directory
        </Link>

        {/* ── Top Header Section ── */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-normal uppercase tracking-widest text-[#013759]">
              {project.category || 'NewGen-IEDC'}
            </span>
            {hasPatent && (
              <span className="inline-flex items-center rounded bg-amber-50 px-2 py-0.5 text-[10px] font-normal text-amber-700 ring-1 ring-inset ring-amber-600/20">
                Patent {project.patent_status}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl text-slate-900 leading-tight" style={{ fontWeight: 400 }}>
            {project.title}
          </h1>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left / Image Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="w-full aspect-[4/3] rounded-lg bg-slate-100 border border-slate-200/80 overflow-hidden relative">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                  <svg className="w-10 h-10 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">No Prototype Image Available</span>
                </div>
              )}
            </div>

            {/* Description Block */}
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-normal text-slate-900 uppercase tracking-wider">
                Project Overview
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed text-justify">
                {project.description || 'No detailed description available for this project.'}
              </p>
            </div>
          </div>

          {/* Right / Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Metadata Card */}
            <div className="rounded-lg border border-slate-200/80 bg-slate-50/50 p-6 flex flex-col gap-5">
              <h3 className="text-xs font-normal uppercase tracking-wider text-slate-400">
                Project Metadata
              </h3>

              <div className="flex flex-col gap-4 divide-y divide-slate-100 text-xs">

                {/* Mentors */}
                <div className="pt-2 flex flex-col gap-1">
                  <span className="text-slate-400">Faculty Mentor(s)</span>
                  <span className="text-slate-800 leading-snug font-normal">
                    {project.mentor || 'N/A'}
                  </span>
                </div>

                {/* Mentees */}
                <div className="pt-3 flex flex-col gap-1">
                  <span className="text-slate-400">Student Innovator(s) / Mentee(s)</span>
                  <span className="text-slate-800 leading-snug font-normal">
                    {project.mentee || 'N/A'}
                  </span>
                </div>

                {/* Expenditure */}
                <div className="pt-3 flex flex-col gap-1">
                  <span className="text-slate-400">Sanctioned Expenditure</span>
                  <span className="text-slate-900 font-normal text-sm">
                    {formatExpenditure(project.expenditure)}
                  </span>
                </div>

                {/* Patent Details */}
                <div className="pt-3 flex flex-col gap-1">
                  <span className="text-slate-400">Patent Status</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-800 font-normal">
                      {project.patent_status || 'NA'}
                    </span>
                    {project.patent_id && project.patent_id !== 'NA' && (
                      <span className="text-slate-500 font-mono text-[11px]">
                        (Reg ID: {project.patent_id})
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* CTA Box */}
            <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-5 flex flex-col gap-3">
              <h4 className="text-xs font-normal text-[#013759] uppercase tracking-wider">
                Interested in this Prototype?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect with our incubation management team for technology licensing or commercial partnership opportunities.
              </p>
              <Link
                to="/contact"
                className="mt-1 inline-flex items-center justify-center gap-2 text-xs font-normal text-white bg-[#013759] px-4 py-2.5 rounded hover:bg-[#074887] transition-colors w-full text-center"
              >
                Inquire About Commercialization
              </Link>
            </div>

          </div>

        </div>

      </main>
    </div>
  )
}
