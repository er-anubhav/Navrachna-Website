import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import { newgenProjects as staticProjects } from '../data/newgenProjects'
import { getNewgenProjects } from '../services/projectsService'
import { slugify } from '../utils/slugify'

export function NewGenIedcPage() {
  const [activeYear, setActiveYear] = useState('2023-24')
  const [searchQuery, setSearchQuery] = useState('')
  const [projectsList, setProjectsList] = useState(staticProjects)
  const [loading, setLoading] = useState(true)

  const years = ['2023-24', '2022-23', '2021-22', '2020-21', '2019-20']

  useEffect(() => {
    async function fetchLiveProjects() {
      setLoading(true)
      const { data } = await getNewgenProjects()
      if (data && data.length > 0) {
        const formatted = data.map(item => {
          const mentorsList = (item.project_people || [])
            .filter(pp => pp.role_in_project === 'mentor')
            .map(pp => pp.people?.full_name)
            .join(' and ')

          const menteesList = (item.project_people || [])
            .filter(pp => pp.role_in_project === 'mentee')
            .map(pp => pp.people?.full_name)
            .join(', ')

          return {
            title: item.title,
            category: item.category_label || (item.cohorts ? `NewGen Projects ${item.cohorts.year_label}` : 'NewGen Projects'),
            image: item.image_url,
            description: item.description || '',
            mentor: mentorsList || 'Faculty Mentor',
            mentee: menteesList || 'Student Innovators',
            patent_status: item.patent_status,
            patent_id: item.patent_id,
            expenditure: item.expenditure
          }
        })
        setProjectsList(formatted)
      } else {
        setProjectsList(staticProjects)
      }
      setLoading(false)
    }

    fetchLiveProjects()
  }, [])

  const getYearForProject = (project) => {
    if (!project.category) return '2023-24'
    const yr = project.category.replace('NewGen Projects', '').trim()
    return yr || '2023-24'
  }

  const filteredProjects = projectsList.filter(project => {
    const projYear = getYearForProject(project)
    const matchesYear = projYear === activeYear
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (project.mentor && project.mentor.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (project.mentee && project.mentee.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesYear && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased font-normal">
      
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden py-14 sm:py-16 px-4 sm:px-6 lg:px-8 text-center bg-[#074887]">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-[#074887]/90 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight">
            NewGen-IEDC Programme
          </h1>
          <p className="text-xs sm:text-sm text-sky-100/90 max-w-2xl font-normal leading-relaxed">
            Technology Business Incubation at ITS Engineering College, empowering next-gen builders.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col gap-16">
        
        {/* Section 1: About & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* About the Programme */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl text-[#013759] font-normal">About the Programme</h2>
            <div className="text-xs sm:text-sm text-gray-500 leading-relaxed flex flex-col gap-4 text-justify font-normal">
              <p>
                The New Generation Innovation and Entrepreneurship Development Centre (NewGen IEDC) is a programme launched by the Department of Science & Technology (DST) under the National Science & Technology Entrepreneurship Development Board (NSTEDB), Government of India, in 2018 for a tenure of five years. It is implemented through EDII, Ahmedabad and aims to promote knowledge-based and technology-driven startups by nurturing young innovators within an academic environment.
              </p>
              <p>
                Established within academic institutions, NewGen IEDCs provide mentorship, guidance, and resources to help students transform ideas into startups. The programme provides grant support of up to INR 2.5 Lakhs per project for prototype development. At ITS Engineering College, a total grant of <span className="text-[#013759]">₹2.87 Crore</span> has been sanctioned under this programme.
              </p>
            </div>
          </div>

          {/* Objective of NewGen IEDC */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl text-[#013759] font-normal">Objective of NewGen IEDC</h2>
            <ul className="flex flex-col gap-3.5 text-xs sm:text-sm text-gray-500 text-justify font-normal">
              <li className="flex gap-2">
                <span>—</span>
                <span>To harness the knowledge and energy of youth, encouraging them to actively contribute to the nation’s economic growth.</span>
              </li>
              <li className="flex gap-2">
                <span>—</span>
                <span>To foster the development of innovation-led, knowledge-based enterprises and promote self-employment, especially among students.</span>
              </li>
              <li className="flex gap-2">
                <span>—</span>
                <span>To provide mentorship, guidance, and institutional support to student-led projects.</span>
              </li>
              <li className="flex gap-2">
                <span>—</span>
                <span>To support prototype development with financial assistance of up to INR 2.5 Lakhs per project.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Section 2: Financial Breakdown Cards */}
        <div className="flex flex-col gap-6 pt-4">
          <h2 className="text-xl text-[#013759] font-normal text-center sm:text-left">
            Sanctioned Funding & Project Breakdown
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-gray-400">Total Sanctioned Grant</span>
              <span className="text-2xl text-[#013759] font-normal">₹2.87 Crore</span>
              <p className="text-xs text-gray-500 mt-1">Total financial assistance approved by DST (GOI) over 5 years.</p>
            </div>

            {/* Card 2 */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-gray-400">Max Grant Per Project</span>
              <span className="text-2xl text-[#013759] font-normal">₹2.50 Lakhs</span>
              <p className="text-xs text-gray-500 mt-1">Direct prototype development funding for student innovation teams.</p>
            </div>

            {/* Card 3 */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-gray-400">Total Projects Funded</span>
              <span className="text-2xl text-[#013759] font-normal">85+ Projects</span>
              <p className="text-xs text-gray-500 mt-1">Functional working prototypes commercialized across 5 cohorts.</p>
            </div>

            {/* Card 4 */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-gray-400">Patents Filed & Granted</span>
              <span className="text-2xl text-[#013759] font-normal">35+ Patents</span>
              <p className="text-xs text-gray-500 mt-1">Intellectual property applications registered by student innovators.</p>
            </div>

          </div>
        </div>

        {/* Section 3: Projects Directory Header & Search Filter */}
        <div className="flex flex-col gap-8 border-t border-slate-100 pt-12">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl text-[#013759] font-normal tracking-tight">
                NewGen-IEDC Funded Projects Directory
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Browse student-led prototypes funded across academic cohorts.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search projects, mentors, mentees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-slate-50/50 px-3.5 py-2 pl-9 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#013759] focus:bg-white focus:outline-none transition-all"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Year Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            <span className="text-xs text-gray-400 mr-2 uppercase tracking-wider font-normal">Cohort Year:</span>
            {years.map(yr => (
              <button
                key={yr}
                onClick={() => setActiveYear(yr)}
                className={`rounded-full px-4 py-1.5 text-xs transition-all ${
                  activeYear === yr
                    ? 'bg-[#013759] text-white shadow-sm font-normal'
                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200 font-normal'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="py-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-4" />
              <p className="text-sm text-gray-500">Loading live projects directory from Supabase...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => {
                const projectSlug = slugify(project.title)
                const hasPatent = project.patent_status && project.patent_status.toLowerCase() !== 'na' && project.patent_status.trim() !== ''

                return (
                  <div 
                    key={idx} 
                    className="flex flex-col justify-between rounded-lg border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col gap-4">
                      
                      {/* Image Thumbnail */}
                      <div className="w-full aspect-video rounded-md bg-slate-100 overflow-hidden relative border border-slate-100">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-1">
                            <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[10px]">No Prototype Image</span>
                          </div>
                        )}
                        {hasPatent && (
                          <span className="absolute top-2 right-2 rounded bg-amber-500/90 px-2 py-0.5 text-[10px] font-normal text-white shadow-sm backdrop-blur-sm">
                            Patent {project.patent_status}
                          </span>
                        )}
                      </div>

                      {/* Title & Category */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-normal">
                          {project.category}
                        </span>
                        <h3 className="text-base text-slate-900 font-normal group-hover:text-[#013759] transition-colors leading-snug">
                          {project.title}
                        </h3>
                      </div>

                      {/* Mentors & Mentees */}
                      <div className="flex flex-col gap-2 text-xs text-slate-600 bg-slate-50/50 p-3 rounded border border-slate-100">
                        {project.mentor && (
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase">Mentor(s):</span>
                            <span className="font-normal text-slate-800">{project.mentor}</span>
                          </div>
                        )}
                        {project.mentee && (
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase">Student Innovator(s):</span>
                            <span className="font-normal text-slate-800">{project.mentee}</span>
                          </div>
                        )}
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed text-justify">
                        {project.description}
                      </p>

                    </div>

                    {/* Footer / Action */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-[#013759] font-normal">
                        {project.expenditure && project.expenditure !== 'NA' ? `Sanctioned: ₹${project.expenditure}` : ''}
                      </span>
                      <Link 
                        to={`/programs/newgen-iedc/project/${projectSlug}`}
                        className="inline-flex items-center gap-1 text-xs text-[#013759] font-normal hover:underline"
                      >
                        About Project →
                      </Link>
                    </div>

                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-sm">
              No projects found for year <span className="text-slate-700">{activeYear}</span> matching "{searchQuery}".
            </div>
          )}

        </div>

      </main>

    </div>
  )
}
