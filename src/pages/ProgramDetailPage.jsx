import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

export function ProgramDetailPage() {
  const { slug: urlSlug } = useParams()

  // Use URL route slug directly (or fallback to newgen-iedc)
  const slug = urlSlug || 'newgen-iedc'

  const [program, setProgram] = useState(null)
  const [associatedStartups, setAssociatedStartups] = useState([])
  const [associatedEvents, setAssociatedEvents] = useState([])
  const [newgenProjects, setNewgenProjects] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [activeYear, setActiveYear] = useState('2023-24')
  const [searchQuery, setSearchQuery] = useState('')

  const years = ['2023-24', '2022-23', '2021-22', '2020-21', '2019-20']

  useEffect(() => {
    async function fetchProgramDetail() {
      setLoading(true)

      // 1. Fetch Program record by slug
      const { data: progData, error: progErr } = await supabase
        .from('programs')
        .select('*')
        .eq('slug', slug)
        .single()

      if (progErr || !progData) {
        console.error('Error fetching program detail for slug:', slug, progErr)
        setLoading(false)
        return
      }

      setProgram(progData)

      // 2. Fetch associated Startups
      const { data: startupsData } = await supabase
        .from('startups')
        .select('*')
        .eq('program_id', progData.id)
        .order('created_at', { ascending: false })

      setAssociatedStartups(startupsData || [])

      // 3. Fetch associated Events & Hackathons
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .eq('program_id', progData.id)
        .order('created_at', { ascending: false })

      setAssociatedEvents(eventsData || [])

      // 4. If DST NewGen-IEDC, fetch prototype projects
      if (slug === 'newgen-iedc') {
        const { data: projectsData } = await supabase
          .from('newgen_projects')
          .select(`
            id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label,
            cohorts ( id, year_label )
          `)
          .order('created_at', { ascending: false })

        setNewgenProjects(projectsData || [])
      }

      setLoading(false)
    }

    fetchProgramDetail()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#013759] mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-normal">Loading program details from Supabase...</p>
        </div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md shadow-sm">
          <h2 className="text-xl font-normal text-slate-900">Program Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 font-normal">
            The requested scheme or program track standard could not be located.
          </p>
          <Link
            to="/programs"
            className="inline-block mt-4 bg-[#074887] text-white text-xs font-normal px-5 py-2.5 rounded-lg shadow-sm"
          >
            Explore All Programs
          </Link>
        </div>
      </div>
    )
  }

  // Parse CMS or default metadata
  const nodalTag = program.nodal_agency || (
    slug === 'newgen-iedc' ? 'Department of Science & Technology (DST), Govt of India' :
    slug === 'msme-bi' ? 'Ministry of Micro, Small & Medium Enterprises (MSME), Govt of India' :
    slug === 'startin-up' ? 'Department of IT & Electronics, Govt of Uttar Pradesh' :
    slug === 'iic-itsec' ? 'Ministry of Education (MoE) Innovation Cell & AICTE' :
    'Navrachna Foundation Incubation Initiative'
  )

  const stats = Array.isArray(program.stats) && program.stats.length > 0 && program.stats[0].value
    ? program.stats
    : [
        { value: program.grant_amount || "₹2.87 Cr", label: "Total Sanctioned Grant", sub: "Approved Funding" },
        { value: "96+", label: "Projects Developed", sub: "Funded & mentored" },
        { value: "66+", label: "Patents Filed", sub: "Deep-tech IP protection" },
        { value: "24/7", label: "Lab Infrastructure Access", sub: "Fab Lab & Compute" }
      ]

  const incentives = Array.isArray(program.incentives) && program.incentives.length > 0 && program.incentives[0].title
    ? program.incentives
    : [
        {
          title: "Prototype Development Support",
          amount: program.grant_amount || "Up to ₹2.5 Lakhs",
          duration: "Per Project",
          desc: "Direct financial grant support credited for purchasing hardware, components, and prototyping tools."
        },
        {
          title: "Fab Lab Machinery Access",
          amount: "Free 24/7 Access",
          duration: "Full Incubation",
          desc: "Full access to high-precision CNC CO₂ Laser Cutters, CNC Plasma Cutters, and Form 3B+ SLA Resin printers."
        },
        {
          title: "Executive Mentorship",
          amount: "Dedicated Advisors",
          duration: "Technical Guidance",
          desc: "Personalized guidance from senior faculty advisors and industry veterans to guide testing and commercialization."
        },
        {
          title: "Patent & IPR Support",
          amount: "Fully Reimbursed",
          duration: "IP Protection",
          desc: "Assistance covering official government patent filing fees, agent search fees, and trademark protection."
        }
      ]

  const TIMELINE = [
    {
      step: "STEP 01",
      title: "Submit Incubation Form",
      desc: `Fill out the incubation request form at the bottom with details of your technology concept and team background under ${program.name || program.title}.`,
      color: "#10b981",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      step: "STEP 02",
      title: "Diagnostic Pitch Evaluation",
      desc: "Our screening committee will review your submission and reach back within 48 hours to schedule a diagnostic online or offline presentation.",
      color: "#3b82f6",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      step: "STEP 03",
      title: "Board Alignment & Grant Sanction",
      desc: "Present before the incubation board to lock in your desk allocation, grant eligibility, Fab Lab access pass, and mentorship mapping.",
      color: "#8b5cf6",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      step: "STEP 04",
      title: "Launch & Commercial Scale",
      desc: "Formally launch in our state-of-the-art facilities! Achieve progress milestones, participate in training cohorts, and scale your venture.",
      color: "#ec4899",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ]

  // Filter NewGen Projects if applicable
  const getYearForProject = (project) => {
    if (!project.category_label) return '2023-24'
    const yr = project.category_label.replace('NewGen Projects', '').trim()
    return yr || '2023-24'
  }

  const filteredNewgen = newgenProjects.filter(project => {
    const projYear = project.cohorts?.year_label || getYearForProject(project)
    const matchesYear = projYear === activeYear
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesYear && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased font-normal">
      
      {/* HERO SECTION MATCHING REFERENCE DESIGN */}
      <section className="relative w-full overflow-hidden py-14 sm:py-16 px-4 sm:px-6 lg:px-8 text-center bg-[#074887]">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-[#074887]/90 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight">
            {program.name || program.title}
          </h1>
          <p className="text-xs sm:text-sm text-sky-100/90 max-w-3xl font-normal leading-relaxed">
            Technology Business Incubation at ITS Engineering College, empowering next-gen builders.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT BODY */}
      <main className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-8 lg:px-12 flex flex-col gap-20">
        
        {/* SECTION 2: EXECUTIVE OVERVIEW & NODAL MANDATE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start font-normal">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-normal tracking-widest text-[#074887] uppercase">PROGRAMME OVERVIEW</span>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#013759]">
              About {program.name || program.title}
            </h2>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed flex flex-col gap-4 text-justify font-normal">
              <p>
                {program.description || program.summary} Operating as an authorized execution hub under {nodalTag}, Navrachna Foundation provides structured guidance, capital grants, and technical infrastructure to accelerate early-stage technology concepts into commercially viable market solutions.
              </p>
              <p>
                Through this track, resident teams receive non-equity financial assistance ({program.grant_amount || 'Government Grant'}), 24/7 access to physical prototyping labs, high-performance GPU compute workstations, and 1-on-1 executive mentorship.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
            <h3 className="text-lg font-normal text-[#013759]">Who Should Apply & Key Mandates</h3>
            <ul className="flex flex-col gap-3.5 text-xs sm:text-sm text-slate-600 text-justify font-normal">
              <li className="flex items-start gap-2.5">
                <span className="text-[#074887] font-normal">—</span>
                <span>Students, Faculty Innovators, and Early-stage Tech Founders building novel prototypes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#074887] font-normal">—</span>
                <span>Non-equity prototype development funding ({program.grant_amount || 'Grant Support'}).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#074887] font-normal">—</span>
                <span>Hands-on Fab Lab access: CNC CO₂ Laser Cutters, CNC Plasma, SLA 3D Printers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#074887] font-normal">—</span>
                <span>Full IPR & patent filing support for domestic and international patent registrations.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 3: FINANCIAL INCENTIVES & GRANTS GRID */}
        <section id="incentives" className="flex flex-col gap-8 text-center font-normal">
          <div>
            <span className="mb-2 inline-block rounded-full bg-[#074887]/10 px-4 py-1 text-xs font-normal tracking-widest text-[#074887] uppercase">
              SCHEME PERKS & CAPITAL GRANTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight">
              Financial Incentives & Support Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {incentives.map((inc, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 font-normal">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#074887] flex items-center justify-center border border-sky-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-normal text-[#013759] mt-1">{inc.title}</h3>
                  <span className="inline-block text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 w-fit">
                    {inc.amount} • {inc.duration}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">{inc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: INFRASTRUCTURE & ECOSYSTEM ACCESS */}
        <section className="flex flex-col gap-8 text-center font-normal border-t border-slate-100 pt-16">
          <div>
            <span className="mb-2 inline-block rounded-full bg-[#074887]/10 px-4 py-1 text-xs font-normal tracking-widest text-[#074887] uppercase">
              PHYSICAL FACILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight">
              State-of-the-Art Technical Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col gap-3 font-normal">
              <div className="w-10 h-10 rounded-xl bg-white text-[#074887] flex items-center justify-center shadow-sm border border-slate-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.13a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-base font-normal text-[#013759]">Rapid Prototyping Fab Lab</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Full access to CNC CO₂ Laser Cutters, CNC Plasma Cutters, and SLA 3D printers.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col gap-3 font-normal">
              <div className="w-10 h-10 rounded-xl bg-white text-[#074887] flex items-center justify-center shadow-sm border border-slate-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-normal text-[#013759]">High-End Compute Lab</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Dedicated NVIDIA GPU workstations for AI/ML training, simulations, and CAD modeling.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col gap-3 font-normal">
              <div className="w-10 h-10 rounded-xl bg-white text-[#074887] flex items-center justify-center shadow-sm border border-slate-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-base font-normal text-[#013759]">Co-Working Space</h3>
              <p className="text-xs text-slate-500 leading-relaxed">24/7 incubator desk allocations, meeting rooms, and gigabit fiber connectivity.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col gap-3 font-normal">
              <div className="w-10 h-10 rounded-xl bg-white text-[#074887] flex items-center justify-center shadow-sm border border-slate-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-base font-normal text-[#013759]">1-on-1 Mentorship</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Guidance from senior faculty mentors and industry corporate advisors.</p>
            </div>
          </div>
        </section>

        {/* SECTION 5: SELECTION PROCESS & ROADMAP STEPPER */}
        <section className="flex flex-col gap-12 border-t border-slate-100 pt-16 font-normal">
          <div className="text-center">
            <span className="text-xs font-normal uppercase tracking-widest text-[#074887] block mb-1">ONBOARDING STEPS</span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight">
              Incubation Application Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto mt-2 font-normal">
              Follow these 4 structured steps to lock in your incubation slot, secure mentorship, and claim grant assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {TIMELINE.map((step, idx) => (
              <div key={idx} className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4 font-normal">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-200" style={{ color: step.color }}>
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-wider uppercase mt-1" style={{ color: step.color }}>
                    {step.step}
                  </span>
                  <h3 className="text-base font-normal text-[#013759]">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1 text-justify">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: PORTFOLIO & PAST FUNDED PROJECTS */}
        {slug === 'newgen-iedc' && newgenProjects.length > 0 && (
          <section className="flex flex-col gap-8 border-t border-slate-100 pt-16 font-normal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-normal uppercase tracking-wider text-[#074887] block">PROTOTYPE DIRECTORY</span>
                <h2 className="text-2xl font-normal text-[#013759]">Funded Student Prototype Projects</h2>
              </div>

              {/* Cohort Year Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {years.map(yr => (
                  <button
                    key={yr}
                    onClick={() => setActiveYear(yr)}
                    style={{ color: activeYear === yr ? '#ffffff' : '#013759' }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-normal transition-colors cursor-pointer ${activeYear === yr ? 'bg-[#013759] !text-white' : 'bg-white border border-slate-200 !text-[#013759] hover:bg-slate-100'}`}
                  >
                    Cohort {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4 font-normal">
              <input
                type="text"
                placeholder="Search prototype by title, description, or mentor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md bg-white rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-[#013759] focus:outline-none font-normal"
              />
              <span className="text-xs text-slate-500 font-mono shrink-0">
                Showing {filteredNewgen.length} Projects for Cohort {activeYear}
              </span>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNewgen.map((proj) => (
                <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#013759] transition-all p-5 flex flex-col justify-between font-normal">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-normal text-[#013759] bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">
                        {proj.cohorts?.year_label || activeYear}
                      </span>
                      {proj.patent_status && proj.patent_status !== 'NA' && (
                        <span className="text-[10px] font-normal text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                          Patent: {proj.patent_status}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-normal text-slate-900 line-clamp-2 mt-1">{proj.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{proj.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-700">₹{Number(proj.expenditure || 250000).toLocaleString('en-IN')} Grant</span>
                    <Link
                      to={`/programs/newgen-iedc/project/${proj.slug}`}
                      className="text-[#013759] hover:underline font-normal flex items-center gap-1"
                    >
                      <span>View Prototype</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {associatedStartups.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-slate-100 pt-16 font-normal">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-normal uppercase tracking-wider text-[#074887] block">VENTURE PORTFOLIO</span>
              <h2 className="text-2xl font-normal text-[#013759]">Resident Ventures & Sanctioned Ideas</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {associatedStartups.map((st) => (
                <div key={st.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between font-normal">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-normal text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded uppercase border border-emerald-100">
                        {st.status || 'Active'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {st.entity_type?.replace('_', ' ')}
                      </span>
                    </div>
                    <h3 className="text-base font-normal text-slate-900 mt-2">{st.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{st.description || 'Accelerated technology venture.'}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 7: ELIGIBILITY & FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <section className="flex flex-col gap-8 border-t border-slate-100 pt-16 font-normal">
          <div className="text-center">
            <span className="text-xs font-normal uppercase tracking-widest text-[#074887] block mb-1">COMMON QUESTIONS</span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight">
              Eligibility & Application FAQs
            </h2>
          </div>

          <div className="max-w-5xl mx-auto w-full flex flex-col gap-4">
            <details className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs font-normal group">
              <summary className="font-normal text-sm text-[#013759] cursor-pointer flex justify-between items-center">
                <span>Who is eligible to apply under {program.name || program.title}?</span>
                <span className="text-[#074887] text-lg font-normal group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Students, faculty innovators, alumni, and external tech entrepreneurs working on novel technology prototypes or commercialization concepts are eligible to apply.
              </p>
            </details>

            <details className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs font-normal group">
              <summary className="font-normal text-sm text-[#013759] cursor-pointer flex justify-between items-center">
                <span>Do I need a registered entity (Pvt Ltd / LLP) before applying?</span>
                <span className="text-[#074887] text-lg font-normal group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">
                No! Early-stage concepts at the prototype or idea stage are fully welcome. Navrachna Foundation assists selected teams in formal entity incorporation and IP protection.
              </p>
            </details>

            <details className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs font-normal group">
              <summary className="font-normal text-sm text-[#013759] cursor-pointer flex justify-between items-center">
                <span>How are financial grants disbursed?</span>
                <span className="text-[#074887] text-lg font-normal group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Grants are disbursed in milestone-linked tranches directly credited for hardware procurement, prototyping components, Fab Lab usage, and official IP filing fees.
              </p>
            </details>

            <details className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs font-normal group">
              <summary className="font-normal text-sm text-[#013759] cursor-pointer flex justify-between items-center">
                <span>Who owns the Intellectual Property (IP) of the project?</span>
                <span className="text-[#074887] text-lg font-normal group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">
                The innovators and student founders retain primary IP ownership in accordance with official NSTEDB and institutional IPR guidelines.
              </p>
            </details>
          </div>
        </section>

        {/* SECTION 8: INCUBATION REGISTRATION & APPLICATION FORM CTA */}
        <section id="incubation-form" className="bg-[#013759] text-white p-8 sm:p-12 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl font-normal">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-normal uppercase tracking-widest text-sky-300">
              INCUBATION REGISTRATION WINDOW OPEN
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-white">Apply for {program.name || program.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-xl leading-relaxed">
              Connect directly with our incubation management board to submit your technology pitch, check grant eligibility, and gain full Fab Lab access.
            </p>
          </div>
          
          <Link
            to="/contact"
            style={{ color: '#013759' }}
            className="bg-white hover:bg-slate-100 !text-[#013759] text-xs font-normal px-8 py-4 rounded-xl shadow-lg transition-all shrink-0 cursor-pointer"
          >
            Submit Incubation Pitch
          </Link>
        </section>

      </main>

    </div>
  )
}