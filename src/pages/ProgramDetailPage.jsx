import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { programs as seedPrograms } from '../data/siteContent'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import logoStartinup from '../assets/navrachna_images/program_logos/official_startinup.png'
import logoNewgen from '../assets/navrachna_images/program_logos/official_newgen.png'
import logoMsme from '../assets/navrachna_images/program_logos/official_msme.png'
import logoIic from '../assets/navrachna_images/program_logos/official_iic.png'
import logoKartavyam from '../assets/navrachna_images/program_logos/official_kartavyam.png'
import logoNfed from '../assets/navrachna_images/program_logos/logo_nfed.png'
import roadmapExactImg from '../assets/navrachna_images/incubation_roadmap_exact.png'
import imgLaser from '../assets/navrachna_images/spaces/laser_cutting.jpg'
import img3d from '../assets/navrachna_images/spaces/3d_printing.jpg'
import imgCoworking from '../assets/navrachna_images/co-working-area-in-greater-noida-13-scaled.webp'
import imgBoardroom from '../assets/navrachna_images/spaces/boardroom.jpg'
import protoElec1 from '../assets/navrachna_images/elec_1.jpeg'
import protoElec2 from '../assets/navrachna_images/elec_2.jpeg'
import protoPrint1 from '../assets/navrachna_images/print_1.jpeg'
import protoPrint2 from '../assets/navrachna_images/print_2.jpeg'
import { getFacilityImage } from '../utils/facilityImageMap'

const logoMap = {
  'startin-up': logoStartinup,
  'newgen-iedc': logoNewgen,
  'msme-bi': logoMsme,
  'iic': logoIic,
  'kartavyam': logoKartavyam,
}

function IncentiveIcon({ name, title }) {
  const iconKey = name || (
    title?.toLowerCase().includes('allowance') || title?.toLowerCase().includes('grant') || title?.toLowerCase().includes('fund') ? 'wallet' :
    title?.toLowerCase().includes('prototype') || title?.toLowerCase().includes('kit') || title?.toLowerCase().includes('cpu') ? 'cpu' :
    title?.toLowerCase().includes('patent') || title?.toLowerCase().includes('ip') || title?.toLowerCase().includes('compliance') ? 'shield' :
    title?.toLowerCase().includes('award') || title?.toLowerCase().includes('rating') ? 'award' :
    'rocket'
  )

  switch (iconKey) {
    case 'wallet':
      return (
        <svg className="w-5 h-5 text-[#074887] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m-9 1h18a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'cpu':
      return (
        <svg className="w-5 h-5 text-[#074887] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'shield':
      return (
        <svg className="w-5 h-5 text-[#074887] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'award':
      return (
        <svg className="w-5 h-5 text-[#074887] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4m6-2v4m-2-2h4m6-2v4m-2-2h4M5 19v-4m-2 2h4m6-2v4m-2-2h4m6-2v4m-2-2h4" />
        </svg>
      )
    case 'rocket':
    default:
      return (
        <svg className="w-5 h-5 text-[#074887] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
  }
}

function ImpactIcon({ type }) {
  switch (type) {
    case 'bulb':
      return (
        <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    case 'document':
      return (
        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    case 'rocket':
      return (
        <svg className="w-8 h-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'award':
      return (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    case 'cpu':
      return (
        <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'money':
    default:
      return (
        <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
  }
}

function IncentiveCardIcon({ title }) {
  const t = title?.toLowerCase() || ''
  if (t.includes('prototype') || t.includes('kit') || t.includes('stem')) {
    return (
      <svg className="w-8 h-8 text-[#074887]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
  if (t.includes('sustenance') || t.includes('allowance') || t.includes('stipend')) {
    return (
      <svg className="w-8 h-8 text-[#074887]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m-9 1h18a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
  if (t.includes('seed') || t.includes('capital') || t.includes('grant') || t.includes('marketing')) {
    return (
      <svg className="w-8 h-8 text-[#074887]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
  return (
    <svg className="w-8 h-8 text-[#074887]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function SerpentineRoadmap({ steps }) {
  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <div className="flex flex-col gap-10 relative">
        {/* Subtle connecting central vertical line */}
        <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-1 -translate-x-1/2 bg-gradient-to-b from-emerald-400 via-sky-400 to-purple-500 rounded-full opacity-35 z-0" />

        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center gap-6 relative z-10 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between`}
            >
              {/* STEP TEXT CARD */}
              <div className={`w-full md:w-5/12 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-2.5 ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}>
                <span className="text-sm font-mono font-bold tracking-widest uppercase" style={{ color: step.color || '#074887' }}>
                  {step.step || `STEP 0${idx + 1}`}
                </span>
                <h3 style={{ fontFamily: "'Sora', sans-serif" }} className="text-xl sm:text-2xl font-medium text-[#013759]">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {step.desc || step.description}
                </p>
              </div>

              {/* SERPENTINE NODE BADGE */}
              <div className="relative shrink-0 flex items-center justify-center my-2 md:my-0">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-4 shadow-md flex items-center justify-center z-10 transition-transform duration-300 hover:scale-105"
                  style={{ borderColor: step.color || '#074887' }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${step.color || '#074887'}15`, color: step.color || '#074887' }}>
                    <span className="font-mono text-sm sm:text-base font-bold">0{idx + 1}</span>
                  </div>
                </div>
              </div>

              {/* BALANCE SPACER */}
              <div className="hidden md:block w-5/12" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProgramDetailPage() {
  const { slug } = useParams()
  const location = useLocation()

  const [program, setProgram] = useState(null)
  const [associatedStartups, setAssociatedStartups] = useState([])
  const [associatedEvents, setAssociatedEvents] = useState([])
  const [newgenProjects, setNewgenProjects] = useState([])
  const [dbFacilities, setDbFacilities] = useState([])
  const [activeYear, setActiveYear] = useState('2023-24')
  const [searchQuery, setSearchQuery] = useState('')
  const years = ['2023-24', '2022-23', '2021-22', '2020-21', '2019-20']
  const [loading, setLoading] = useState(true)

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

      const secConfig = progData.sections_config || {}
      const finalProg = {
        ...progData,
        description: progData.description || '',
        how_we_support: progData.how_we_support || [],
        incentives: progData.incentives || [],
        stats: progData.stats || [],
        steps: secConfig.steps || progData.steps || [],
        faqs: secConfig.faqs || progData.faqs || [],
        mandates: secConfig.mandates || progData.mandates || [],
        tagline: secConfig.tagline || progData.tagline || '',
        eligibility: secConfig.eligibility || progData.eligibility || []
      }

      setProgram(finalProg)

      // 2. Fetch Startups safely
      const { data: startupsData } = await supabase
        .from('startups')
        .select('*')
        .order('created_at', { ascending: false })

      setAssociatedStartups(startupsData || [])

      // 3. Fetch Events & Hackathons safely
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })

      setAssociatedEvents(eventsData || [])

      // 4. Fetch facilities from DB
      const { data: facData } = await supabase
        .from('facilities')
        .select('id, title, slug, summary, specs_summary, cover_image_url')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      setDbFacilities(facData || [])

      // 5. Fetch resident startups from DB
      const { data: stData } = await supabase
        .from('startups')
        .select('id, slug, name, logo_url, website_url, description, incubation_status, cohort_year')
        .order('display_order', { ascending: true })
        .limit(9)

      setAssociatedStartups(stData || [])

      // 6. Fetch prototype projects if portfolio section enabled
      const showPortfolioSection = progData.sections_config?.has_portfolio ?? (slug === 'newgen-iedc')
      if (showPortfolioSection) {
        const { data: projectsData } = await supabase
          .from('newgen_projects')
          .select(`
            id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label,
            cohorts ( id, year_label )
          `)
          .order('created_at', { ascending: false })

        let finalProjects = projectsData || []
        const selectedProjIds = progData.sections_config?.selected_project_ids
        if (Array.isArray(selectedProjIds) && selectedProjIds.length > 0) {
          finalProjects = finalProjects.filter(p => selectedProjIds.includes(p.id))
        } else if (progData.sections_config?.portfolio_category && progData.sections_config.portfolio_category !== 'all') {
          finalProjects = finalProjects.filter(p => p.category_label === progData.sections_config.portfolio_category)
        }

        setNewgenProjects(finalProjects)
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

  // Parse CMS metadata directly from database
  const nodalTag = program.nodal_agency || ''

  const stats = Array.isArray(program.stats) ? program.stats : []
  const incentives = Array.isArray(program.incentives) ? program.incentives : []

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

  const schemeLogo = program?.logo_url || logoMap[slug] || logoNfed

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased font-normal">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#013759] py-16 sm:py-24 lg:py-28 min-h-[340px] flex items-center justify-center px-4 sm:px-8 border-b border-slate-800 text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70" 
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none" />

<div className="relative z-10 max-w-full w-full mx-auto flex flex-col items-center justify-center gap-3 px-4">

          <h1 
            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300 }}
            className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight text-white leading-tight w-full text-center md:whitespace-nowrap"
          >
            {program.name || program.title}
          </h1>

          <p className="text-sm sm:text-base lg:text-xl text-slate-200 w-full font-normal leading-relaxed text-center mt-1 md:whitespace-nowrap">
            {program.tagline || program.sections_config?.tagline || ''}
          </p>

        </div>
      </section>

      {/* MAIN CONTENT BODY */}
      <main className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-8 lg:px-12 flex flex-col gap-20">
        
        {/* SECTION 1: EXECUTIVE OVERVIEW & MANDATE */}
        <section id="overview" className="w-full font-normal scroll-mt-36">
          {/* Side-by-Side Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Card 1: Overview */}
            <div className="p-0 pr-2 sm:pr-6 flex flex-col justify-between gap-6">
              <div>
                <div className="w-full h-48 sm:h-60 bg-white rounded-xl border border-[#e5ded2] p-5 flex items-center justify-start mb-6 shadow-xs overflow-hidden relative">
                  <img 
                    src={schemeLogo} 
                    alt={`${program.name || program.title} Logo`} 
                    className="max-h-full max-w-full object-contain"
                  />
                  {program.is_active !== false ? (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium shadow-2xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                      </span>
                      <span>Applications Open</span>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium shadow-2xs">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>Applications Closed</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-6 text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed text-left font-normal">
                  {program.description ? (
                    program.description.split('\n\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))
                  ) : (
                    <>
                      <p>
                        Navrachna Foundation for Entrepreneurship Development is dedicated to building a vibrant innovation and start‑up ecosystem that empowers young entrepreneurs to translate ideas into high‑impact, technology-driven ventures under <span className="font-medium text-[#013759]">{program.name || program.title}</span>.
                      </p>
                      <p>
                        Navrachna’s vision is closely aligned with the <span className="font-medium text-[#013759]">{program.name || program.title} ({nodalTag})</span> initiative, which aims to foster a robust start-up ecosystem through policy support, incubation, prototype grants, seed funding pathways, and market linkages.
                      </p>
                      <p>
                        By mirroring core priority pillars—innovation-led growth, ease of doing business, inclusive entrepreneurship, and direct access to capital—Navrachna acts as an authorized execution partner to guide emerging founders from ideation to commercial market scaling.
                      </p>
                    </>
                  )}



                  {/* INCENTIVES & PATHWAYS */}
                  {program.incentives && program.incentives.length > 0 && (
                    <div className="mt-2 pt-6 border-t border-slate-200 flex flex-col gap-4">
                      <h4 
                        style={{ fontFamily: "'Sora', sans-serif" }} 
                        className="text-xl sm:text-2xl font-medium text-[#013759]"
                      >
                        Key Incentives & Support Pathways
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base font-normal">
                        {program.incentives.map((item, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5 hover:border-slate-300 transition-colors">
                            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                              <IncentiveIcon name={item.icon} title={item.title} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-medium text-[#013759] text-sm sm:text-base leading-snug">{item.title}</span>
                              {item.detail && <span className="text-slate-500 text-xs leading-relaxed">{item.detail}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Card 2: Mandate & Eligibility */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-6">
              <div>
                <h3 
                  style={{ fontFamily: "'Sora', sans-serif" }} 
                  className="text-2xl sm:text-3xl font-medium text-[#013759] mb-6"
                >
                  Mandate &amp; Eligibility
                </h3>

                <div className="flex flex-col gap-8">
                  {/* ELIGIBLE CANDIDATES */}
                  {((program.sections_config?.eligibility || program.eligibility || []).length > 0) && (
                    <div className="pt-6 border-t border-slate-200 font-normal">
                      <h4 className="text-base sm:text-lg font-medium text-[#013759] mb-3">Eligible Candidates</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {(program.sections_config?.eligibility || program.eligibility || []).map((elig, eIdx) => (
                          <div key={eIdx} className="bg-sky-50 text-[#013759] border border-sky-200/80 px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-sm sm:text-base font-normal shadow-2xs hover:bg-sky-100/70 transition-colors">
                            <svg className="w-5 h-5 text-[#074887] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{typeof elig === 'string' ? elig : (elig.title || elig.label)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* KEY MANDATES */}
                  {((program.sections_config?.mandates || program.mandates || []).length > 0) && (
                    <div className="pt-6 border-t border-slate-200 font-normal">
                      <h4 className="text-base sm:text-lg font-medium text-[#013759] mb-4">Key Strategic Mandates</h4>
                      <div className="flex flex-col gap-3">
                        {(program.sections_config?.mandates || program.mandates || []).map((m, mIdx) => (
                          <div key={mIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start gap-3.5 font-normal">
                            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                              <IncentiveIcon name={m.icon} title={m.title} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-medium text-[#013759] text-base">{m.title}</span>
                              <span className="text-slate-600 text-xs sm:text-sm leading-relaxed">{m.desc || m.detail}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: IMPACT SUMMARY */}
        {(program.sections_config?.has_impact ?? true) && (
          <section id="impact" className="w-full font-normal border-t border-slate-100 pt-16 scroll-mt-36">
            <div className="flex flex-col items-center justify-center text-center mb-8">
              <h2 
                style={{ fontFamily: "'Sora', sans-serif" }} 
                className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight"
              >
                Impact Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch font-normal">
              {stats.map((st, idx) => (
                <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-between text-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300 min-h-[220px] font-normal">
                  <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                    <ImpactIcon type={st.type || (idx === 0 ? 'bulb' : idx === 1 ? 'document' : idx === 2 ? 'rocket' : 'money')} />
                  </div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#013759] tracking-tight whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {st.value}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm sm:text-base font-normal text-slate-700">
                      {st.label}
                    </span>
                    {st.sub && (
                      <span className="text-xs text-slate-400 font-normal">
                        {st.sub}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: FINANCIAL INCENTIVES & GRANTS GRID */}
        {(program.sections_config?.has_incentives ?? true) && (
          <section id="incentives" className="flex flex-col gap-8 font-normal border-t border-slate-100 pt-16 scroll-mt-36">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 
                style={{ fontFamily: "'Sora', sans-serif" }} 
                className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight"
              >
                Financial Incentives &amp; Grants
              </h2>
            </div>

            <div className="flex flex-col gap-4 font-normal">
              {incentives.map((inc, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                >
                  {/* LEFT: ICON BADGE + TITLE & DESCRIPTION */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      <IncentiveCardIcon title={inc.title} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 
                          style={{ fontFamily: "'Sora', sans-serif" }} 
                          className="text-base sm:text-lg font-medium text-[#013759]"
                        >
                          {inc.title}
                        </h3>
                        <span className="text-[10px] font-normal uppercase tracking-wider text-[#074887] bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100/80">
                          {inc.category || (
                            inc.title?.toLowerCase().includes('allowance') ? 'STIPEND' :
                            inc.title?.toLowerCase().includes('prototype') ? 'GRANT' :
                            inc.title?.toLowerCase().includes('patent') ? 'IPR SUPPORT' : 'CAPITAL'
                          )}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
                        {inc.desc || inc.detail}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT: GRANT AMOUNT & DURATION */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 shrink-0">
                    <span 
                      style={{ fontFamily: "'Sora', sans-serif" }} 
                      className="text-lg sm:text-xl font-normal text-emerald-800"
                    >
                      {inc.amount}
                    </span>
                    {inc.duration && (
                      <span className="text-xs text-slate-500 font-normal">
                        {inc.duration}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: SELECTION PROCESS & ROADMAP STEPPER */}
        {(program.sections_config?.has_roadmap ?? true) && (
          <section id="roadmap" className="flex flex-col gap-10 border-t border-slate-100 pt-16 font-normal scroll-mt-36">
            <div className="text-center">
              <h2 className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight">
                Selection &amp; Application Process Roadmap
              </h2>
            </div>

            {(program.sections_config?.roadmap_mode === 'image' || program.roadmap_mode === 'image') ? (
              <div className="w-full max-w-5xl mx-auto flex items-center justify-center p-2 sm:p-4">
                <img 
                  src={(() => {
                    const img = program.sections_config?.roadmap_image || program.roadmap_image || program.roadmap_image_url
                    if (!img || img.includes('/src/assets/')) return roadmapExactImg
                    return img
                  })()} 
                  alt="Selection & Application Process Flowchart" 
                  className="w-full h-auto object-contain max-h-[850px] rounded-2xl shadow-sm border border-slate-200"
                />
              </div>
            ) : (
              <div className="w-full max-w-5xl mx-auto">
                <SerpentineRoadmap steps={program.steps || program.sections_config?.steps || []} />
              </div>
            )}
          </section>
        )}

        {/* SECTION 5: INFRASTRUCTURE & ECOSYSTEM ACCESS */}
        {(program.sections_config?.has_infrastructure ?? true) && (
          <section id="infrastructure" className="flex flex-col gap-10 sm:gap-12 text-center font-normal border-t border-slate-100 pt-16 scroll-mt-36">
            <div className="mb-2">
              <h2 className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight">
                Infrastructure &amp; Facilities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left items-stretch font-normal">
              {(() => {
                const selectedIds = program?.sections_config?.selected_facility_ids || program?.selected_facility_ids || []
                const activeFacilities = dbFacilities && dbFacilities.length > 0
                  ? (selectedIds.length > 0
                      ? dbFacilities.filter(f => selectedIds.includes(f.id))
                      : dbFacilities.slice(0, 8))
                  : []

              const fallbackImgs = [imgLaser, img3d, imgCoworking, imgBoardroom]

              if (activeFacilities.length > 0) {
                return activeFacilities.map((fac, idx) => {
                  const coverSrc = getFacilityImage(fac)
                  const categoryBadge = fac.slug ? fac.slug.replace(/-/g, ' ').toUpperCase() : 'LAB FACILITY'

                  return (
                    <div key={fac.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 group font-normal">
                      <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                        <img 
                          src={coverSrc} 
                          alt={fac.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = fallbackImgs[idx % fallbackImgs.length] }}
                        />
                        <span className="absolute top-3 right-3 text-xs font-semibold uppercase tracking-wider text-[#074887] bg-sky-50/90 backdrop-blur-md px-2.5 py-1 rounded border border-sky-100">
                          {categoryBadge.length > 18 ? 'LAB FACILITY' : categoryBadge}
                        </span>
                      </div>
                      <div className="p-6 flex flex-col gap-3.5 flex-grow justify-between">
                        <div className="flex flex-col gap-2">
                          <h3 style={{ fontFamily: "'Sora', sans-serif" }} className="text-lg sm:text-xl font-medium text-[#013759]">
                            {fac.title}
                          </h3>
                          <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3 font-normal">
                            {fac.summary || fac.description || 'State-of-the-art incubation infrastructure access.'}
                          </p>
                        </div>
                        {(() => {
                          const specsList = Array.isArray(fac.specs_summary)
                            ? fac.specs_summary
                            : (typeof fac.specs_summary === 'string' ? fac.specs_summary.split(',') : [])

                          if (specsList.length === 0) return null

                          return (
                            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-xs text-[#074887]">
                              {specsList.slice(0, 3).map((spec, sIdx) => (
                                <span key={sIdx} className="bg-sky-50 px-2.5 py-1 rounded border border-sky-100 font-normal">
                                  {typeof spec === 'string' ? spec.trim() : String(spec)}
                                </span>
                              ))}
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  )
                })
              }

              return (
                <div className="col-span-full p-8 text-center text-slate-500 text-sm bg-slate-50 rounded-2xl border border-slate-200">
                  No facilities currently selected for this scheme.
                </div>
              )
            })()}
          </div>
        </section>
      )}

        {/* SECTION 6: PORTFOLIO & PAST FUNDED PROJECTS */}
        {(program?.sections_config?.has_portfolio ?? (slug === 'newgen-iedc')) && newgenProjects.length > 0 && (
          <section id="portfolio" className="flex flex-col gap-8 border-t border-slate-100 pt-16 font-normal scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight">
                  {program?.sections_config?.portfolio_title || 'Funded Student Prototype Projects'}
                </h2>
              </div>

              {/* Cohort Year Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm">
                {years.map(yr => (
                  <button
                    key={yr}
                    onClick={() => setActiveYear(yr)}
                    style={{ color: activeYear === yr ? '#ffffff' : '#013759' }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-normal transition-colors cursor-pointer ${activeYear === yr ? 'bg-[#013759] !text-white' : 'bg-white border border-slate-200 !text-[#013759] hover:bg-slate-100'}`}
                  >
                    Cohort {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input & Count */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-normal">
              <input
                type="text"
                placeholder="Search prototype by title, description, or mentor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md bg-white rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-[#013759] focus:outline-none font-normal shadow-xs"
              />
              <span className="text-xs sm:text-sm text-slate-600 font-normal shrink-0">
                Showing {filteredNewgen.length} Projects for Cohort {activeYear}
              </span>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNewgen.map((proj, idx) => {
                const fallbackImgs = [protoElec1, protoPrint1, protoElec2, protoPrint2];
                const coverSrc = proj.image_url || proj.image || fallbackImgs[idx % fallbackImgs.length];

                return (
                  <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#013759] hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between font-normal group">
                    {/* Cover Photo */}
                    <div className="h-64 sm:h-72 lg:h-80 w-full relative overflow-hidden bg-slate-100">
                      <img 
                        src={coverSrc} 
                        alt={proj.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                        <span className="text-xs font-normal text-[#013759] bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg border border-sky-100 shadow-xs">
                          {proj.cohorts?.year_label || activeYear}
                        </span>
                        {proj.patent_status && proj.patent_status !== 'NA' && (
                          <span className="text-xs font-normal text-amber-800 bg-amber-50/95 backdrop-blur-md border border-amber-200 px-3 py-1 rounded-lg shadow-xs">
                            Patent: {proj.patent_status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow gap-3.5">
                      <div className="flex flex-col gap-2">
                        <h3 style={{ fontFamily: "'Sora', sans-serif" }} className="text-lg sm:text-xl font-medium text-slate-900 line-clamp-2">{proj.title}</h3>
                        <p className="text-sm sm:text-base text-slate-600 line-clamp-3 leading-relaxed">{proj.description}</p>
                      </div>

                      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm mt-auto">
                        <span className="font-mono text-slate-700 font-medium">₹{Number(proj.expenditure || 250000).toLocaleString('en-IN')} Grant</span>
                        <Link
                          to={`/programs/newgen-iedc/project/${proj.slug}`}
                          className="text-[#013759] hover:underline font-normal flex items-center gap-1.5"
                        >
                          <span>View Prototype</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}



        {/* SECTION 7: ELIGIBILITY & FREQUENTLY ASKED QUESTIONS (FAQ) */}
        {(program.sections_config?.has_faqs ?? true) && (
          <section id="faqs" className="flex flex-col gap-8 border-t border-slate-100 pt-16 font-normal scroll-mt-36">
            <div className="text-center">
              <h2 className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight">
                Eligibility & Application FAQs
              </h2>
            </div>

            <div className="max-w-5xl mx-auto w-full flex flex-col gap-4 font-normal">
              {(program.faqs || program.sections_config?.faqs || [
                { question: `Who is eligible to apply under ${program.name || program.title}?`, answer: 'Students, faculty innovators, alumni, and external tech entrepreneurs working on novel technology prototypes or commercialization concepts are eligible to apply.' },
                { question: 'Do I need a registered entity (Pvt Ltd / LLP) before applying?', answer: 'No! Early-stage concepts at the prototype or idea stage are fully welcome. Navrachna Foundation assists selected teams in formal entity incorporation and IP protection.' },
                { question: 'How are financial grants disbursed?', answer: 'Grants are disbursed in milestone-linked tranches directly credited for hardware procurement, prototyping components, Fab Lab usage, and official IP filing fees.' },
                { question: 'Who owns the Intellectual Property (IP) of the project?', answer: 'The innovators and student founders retain primary IP ownership in accordance with official NSTEDB and institutional IPR guidelines.' }
              ]).map((faq, fIdx) => (
                <details key={fIdx} className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200 text-sm font-normal group">
                  <summary className="font-normal text-base sm:text-lg text-[#013759] cursor-pointer flex justify-between items-center py-1">
                    <span>{faq.question}</span>
                    <span className="text-[#074887] text-xl font-normal group-open:rotate-180 transition-transform">+</span>
                  </summary>
                  <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 8: INCUBATION REGISTRATION & APPLICATION FORM CTA */}
        {/* <section id="incubation-form" className="bg-[#013759] text-white p-8 sm:p-12 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl font-normal">
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
        </section> */}

      </main>

    </div>
  )
}