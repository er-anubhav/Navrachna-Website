import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { newgenProjects } from '../data/newgenProjects'

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

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
  const project = newgenProjects.find((p) => slugify(p.title) === projectSlug)

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
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-[#013759] transition-colors w-fit"
        >
          ← Back to NewGen-IEDC Directory
        </Link>

        {/* ── Project Identity Block ── */}
        <div className="flex flex-col gap-5 border-b border-gray pb-12">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#074887] border border-[#074887]/20 px-3 py-1 rounded-full w-fit">
            {project.category || 'NewGen Funded Project'}
          </span>

          <h1
            className="text-4xl sm:text-5xl text-[#013759] leading-tight tracking-tight"
            style={{ fontWeight: 400 }}
          >
            {project.title}
          </h1>

          <p className="text-xs text-gray-400 uppercase tracking-widest">
            DST — Department of Science & Technology, Government of India
          </p>
        </div>

        {/* ── Small Image + Quick Vital Stats ── */}
        <div className="flex flex-col sm:flex-row items-start gap-10">

          {/* Small Project Image */}
          {project.image && (
            <div className="shrink-0 w-48 sm:w-56 rounded-2xl overflow-hidden border border-gray aspect-square bg-slate-50">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Inline stats */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Mentor</span>
              <span className="text-sm text-gray-700 leading-relaxed">{project.mentor || 'NA'}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Patent Status</span>
              <span
                className={`text-[11px] px-3 py-1 rounded-full w-fit ${
                  hasPatent
                    ? 'bg-[#074887]/8 text-[#074887] border border-[#074887]/20'
                    : 'bg-slate-100 text-gray-500'
                }`}
              >
                {project.patent_status || 'NA'}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Patent ID</span>
              <span className="text-sm text-gray-700 font-mono">{project.patent_id || 'NA'}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Total Expenditure</span>
              <span className="text-sm text-[#074887]">
                {formatExpenditure(project.expenditure)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Project Description ── */}
        <div className="flex flex-col gap-4 border-t border-gray pt-10">
          <h2 className="text-[10px] text-gray-400 uppercase tracking-widest">About the Project</h2>
          <div
            className="text-base text-gray-600 leading-[1.85] text-justify whitespace-pre-line"
            style={{ fontWeight: 400 }}
          >
            {project.description || 'No description available for this project.'}
          </div>
        </div>

        {/* ── Mentee Team Section ── */}
        {project.mentee && project.mentee !== 'NA' && (
          <div className="flex flex-col gap-4 border-t border-gray pt-10">
            <h2 className="text-[10px] text-gray-400 uppercase tracking-widest">Project Mentee Team</h2>
            {/* Split comma-separated mentees into individual entries */}
            <div className="flex flex-wrap gap-3">
              {project.mentee.split(',').map((name, i) => (
                <span
                  key={i}
                  className="text-xs text-gray-600 bg-slate-50 border border-gray rounded-lg px-4 py-2"
                >
                  {name.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Full Metadata Table ── */}
        <div className="flex flex-col gap-6 border-t border-gray pt-10">
          <h2 className="text-[10px] text-gray-400 uppercase tracking-widest">Project Record</h2>

          <div className="divide-y divide-slate-100">
            {[
              { label: 'Project Title',       value: project.title },
              { label: 'Category / Cohort',   value: project.category },
              { label: 'Mentor',              value: project.mentor },
              { label: 'Mentee',              value: project.mentee },
              { label: 'Patent Status',       value: project.patent_status },
              { label: 'Patent ID',           value: project.patent_id },
              { label: 'Expenditure (in Rs)', value: formatExpenditure(project.expenditure) },
              { label: 'Funding Source',      value: 'Department of Science & Technology, Govt. of India through NewGen IEDC' },
              { label: 'Host Institution',    value: 'I.T.S Engineering College, Greater Noida' },
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 py-4 hover:bg-slate-50/40 transition-colors px-2 rounded"
              >
                <span className="col-span-4 text-xs text-gray-400 uppercase tracking-wider self-start pt-0.5">
                  {row.label}
                </span>
                <span className="col-span-8 text-sm text-gray-700 leading-relaxed">
                  {row.value || 'NA'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Programme Context Strip ── */}
        <div className="border-t border-gray pt-10 flex flex-col sm:flex-row gap-8 justify-between items-start">
          <div className="flex flex-col gap-1 max-w-md">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Programme</span>
            <p className="text-sm text-gray-600 leading-relaxed">
              NewGen Innovation & Entrepreneurship Development Centre (NewGen-IEDC) is implemented by EDII, Ahmedabad, with support from the Department of Science & Technology, Government of India.
            </p>
          </div>

          <Link
            to="/programs/newgen-iedc"
            className="text-xs text-[#074887] hover:underline flex items-center gap-1.5 shrink-0 self-center"
          >
            ← All Projects
          </Link>
        </div>

      </main>
    </div>
  )
}
