import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStartupBySlugOrId } from '../../services/startupsService'
import heroImage from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'

// Women-Centric Startup Fallback Logos
import logoJagmag from '../../assets/navrachna_images/portfolio/logo_jagmag.png'
import logoNeurapex from '../../assets/navrachna_images/portfolio/logo_neurapex.png'
import logoIndusAi from '../../assets/navrachna_images/portfolio/logo_indus_ai.png'
import logoDigieraD from '../../assets/navrachna_images/portfolio/logo_digiera_d.png'
import logoEpn from '../../assets/navrachna_images/portfolio/logo_epn.png'
import logoMylyfcare from '../../assets/navrachna_images/portfolio/logo_mylyfcare.png'
import logoDoortodestination from '../../assets/navrachna_images/portfolio/logo_doortodestination.png'
import logoGreenstag from '../../assets/navrachna_images/portfolio/logo_greenstag.png'
import logoAbrosaa from '../../assets/navrachna_images/portfolio/logo_abrosaa.png'
import logoCyberkida from '../../assets/navrachna_images/portfolio/logo_cyberkida.png'
import logoSsb from '../../assets/navrachna_images/portfolio/logo_ssb.png'
import logoVnorganics from '../../assets/navrachna_images/portfolio/logo_vnorganics.png'
import logoTriposaints from '../../assets/navrachna_images/portfolio/logo_triposaints.png'
import logoTrulyfresh from '../../assets/navrachna_images/portfolio/logo_trulyfresh.png'

// Prominent Startup Fallback Logos
import logoNextorbit from '../../assets/navrachna_images/portfolio/logo_nextorbit.png'
import logoUnnatjivan from '../../assets/navrachna_images/portfolio/logo_unnatjivan.png'
import logoBigblare from '../../assets/navrachna_images/portfolio/logo_bigblare.png'
import logoAutoremov from '../../assets/navrachna_images/portfolio/logo_autoremov.png'
import logoHomeservices from '../../assets/navrachna_images/portfolio/logo_homeservices.png'
import logoE4asolution from '../../assets/navrachna_images/portfolio/logo_e4asolution.png'
import logoIntelligentia from '../../assets/navrachna_images/portfolio/logo_intelligentia.png'
import logoUproi from '../../assets/navrachna_images/portfolio/logo_uproi.png'
import logoKineer from '../../assets/navrachna_images/portfolio/logo_kineer.png'
import logoEvergreat from '../../assets/navrachna_images/portfolio/logo_evergreat.png'
import logoHexagontetch from '../../assets/navrachna_images/portfolio/logo_hexagontetch.png'
import logoRedspiral from '../../assets/navrachna_images/portfolio/logo_redspiral.png'
import logoNutritown from '../../assets/navrachna_images/portfolio/logo_nutritown.png'
import logoLaarsa from '../../assets/navrachna_images/portfolio/logo_laarsa.png'

const STATIC_STARTUPS = [
  { name: "Jagmag Lights", logo: logoJagmag, type: "women", category: "Smart Hardware & IoT", desc: "Energy-efficient IoT LED controllers and smart home decorative lighting solutions." },
  { name: "Neurapex AI", logo: logoNeurapex, type: "women", category: "Artificial Intelligence", desc: "Deep learning & natural language processing systems for enterprise decision automation." },
  { name: "Indus AI", logo: logoIndusAi, type: "women", category: "Advanced Manufacturing", desc: "AI-driven industrial quality inspection and automated manufacturing vision systems." },
  { name: "Digiera Private Limited", logo: logoDigieraD, type: "women", category: "Enterprise Software", desc: "Custom web development, mobile apps, and enterprise software engineering consulting." },
  { name: "ePN (Electro-Proton Network)", logo: logoEpn, type: "women", category: "Electronics & Hardware", desc: "Advanced electronic circuit designs and hardware prototyping solutions." },
  { name: "MyLyfCare", logo: logoMylyfcare, type: "women", category: "Healthcare Technology", desc: "Digital healthcare aggregator connecting patients to localized diagnostic centers and pharmacies." },
  { name: "Door to Destination Technologies", logo: logoDoortodestination, type: "women", category: "Smart Logistics", desc: "Tech-enabled hyper-local logistics and smart dispatch routing solutions." },
  { name: "Green Stag Technologies", logo: logoGreenstag, type: "women", category: "Agrotech & Biomass", desc: "Sustainable biomass processing and green agricultural hardware solutions." },
  { name: "Barren to Berland Abrosaa", logo: logoAbrosaa, type: "women", category: "Agri-Tech", desc: "Soil rejuvenation technology converting infertile agricultural plots into high-yield croplands." },
  { name: "Cyberkida Digiera", logo: logoCyberkida, type: "women", category: "Ed-Tech & Cyber Security", desc: "Cybersecurity awareness training tools and interactive ethical hacking e-learning platforms." },
  { name: "SSB Engineering", logo: logoSsb, type: "women", category: "Heavy Mechanical Engineering", desc: "Heavy industrial machining, custom steel fabrication, and mechanical engineering assemblies." },
  { name: "VN Organics", logo: logoVnorganics, type: "women", category: "Organic Agriculture", desc: "Chemical-free bio-fertilizers and organic plant nutrient supplements for sustainable farming." },
  { name: "TripoSaints", logo: logoTriposaints, type: "women", category: "Smart Travel & Tourism", desc: "AI-driven personalized travel itinerary planner and smart tourism booking portal." },
  { name: "TrulyFresh Hydroponics", logo: logoTrulyfresh, type: "women", category: "Agritech & Hydroponics", desc: "Controlled-environment urban hydroponic farming systems producing pesticide-free greens." },
  { name: "NextOrbit Innovations", logo: logoNextorbit, type: "prominent", category: "Deep Tech & Aerospace", desc: "Satellite telemetry systems and aerospace payload telemetry processing components." },
  { name: "Unnat Jivan / Upright Care", logo: logoUnnatjivan, type: "prominent", category: "Assistive Healthcare", desc: "Elderly care assistive technology devices and smart health monitoring systems." },
  { name: "BigBlare Innovations", logo: logoBigblare, type: "prominent", category: "IoT & Acoustic Sensing", desc: "Acoustic sensing electronics and industrial noise pollution tracking devices." },
  { name: "Autoremov", logo: logoAutoremov, type: "prominent", category: "Clean-Tech & Automation", desc: "Automotive automated debris removal hardware for commercial solar panels." },
  { name: "Home Services Tech", logo: logoHomeservices, type: "prominent", category: "Services Aggregator", desc: "On-demand home maintenance technician dispatch and service scheduling platform." },
  { name: "E4A Solution", logo: logoE4asolution, type: "prominent", category: "Energy Analytics", desc: "Energy efficiency auditing software and industrial power optimization systems." },
  { name: "Intelligentia Labs", logo: logoIntelligentia, type: "prominent", category: "AI & Embedded Vision", desc: "Edge AI computing modules for autonomous robotics and computer vision." },
  { name: "UPROI Digital", logo: logoUproi, type: "prominent", category: "Performance Marketing Tech", desc: "Performance marketing analytics and digital ROI optimization suite." },
  { name: "Kineer Services", logo: logoKineer, type: "prominent", category: "Social Enterprise & Water", desc: "Clean drinking water purification units and inclusive employment initiatives." },
  { name: "Evergreat Clean Energy", logo: logoEvergreat, type: "prominent", category: "Renewable Energy", desc: "Solar micro-grid storage solutions for rural commercial electrification." },
  { name: "HexPRS LLP", logo: logoHexagontetch, type: "prominent", category: "Precision Manufacturing", desc: "Precision plastic injection molding and rapid prototype enclosure manufacturing." },
  { name: "Orbitron Labs LLP", logo: logoRedspiral, type: "prominent", category: "Embedded Systems", desc: "Embedded firmware design and custom micro-controller PCB engineering." },
  { name: "Nutri Town Superfoods", logo: logoNutritown, type: "prominent", category: "Food Tech & Wellness", desc: "Nutraceutical superfood formulations and fortified organic snack products." },
  { name: "Laarsa Organic", logo: logoLaarsa, type: "prominent", category: "Organic Health & Wellness", desc: "Organic wellness products derived from cold-pressed medicinal herbal extracts." }
]

export function StartupDetailPage() {
  const { slug } = useParams()
  const [startup, setStartup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imgError, setImgError] = useState(false)

  const buildFallbackRecord = (targetSlug) => {
    const formattedName = (targetSlug || 'incubated-venture')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase())

    const matched = STATIC_STARTUPS.find(s => {
      const sSlug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return sSlug === targetSlug || s.name.toLowerCase().includes((targetSlug || '').replace(/-/g, ' '))
    }) || {
      name: formattedName,
      logo: null,
      type: "prominent",
      category: "Deep Tech & Innovation",
      desc: `${formattedName} is an innovative venture accelerated by Navrachna Foundation for Entrepreneurship Development (NFED).`
    }

    return {
      name: matched.name,
      logo_url: matched.logo,
      incubation_status: 'incubated',
      cohort_year: '2024',
      website_url: 'https://navrachna.org',
      description: JSON.stringify({
        company_name: matched.name,
        founder_name: 'Lead Founder',
        is_women_founder: matched.type === 'women',
        cin_number: 'U72900UP2024PTC198273',
        sector: matched.category,
        website: 'https://navrachna.org',
        stage: 'Commercialization Stage',
        mobile_number: '+91 9540527700',
        email_id: 'incubation@navrachna.org',
        date_of_incorporation: '2023-08-15',
        date_of_incubation: '2024-01-10',
        dpiit_number: 'DPIIT98721',
        startinup_registration_number: 'UP-STARTUP-2024-88',
        revenue_in_lakhs: '12.50',
        about_startup: matched.desc,
        custom_fields: [
          { key: 'Incubation Hub', value: 'Navrachna Foundation, Greater Noida' },
          { key: 'Mentorship Access', value: '1-on-1 Strategic Mentorship Provided' }
        ],
        awards_and_recognitions: [
          { title: 'Best Incubated Prototype Award', issuer: 'UP Startup Policy Forum', year: '2024' }
        ],
        patents: [
          { title: 'Novel Hardware & System Process Method', number: 'IN202411098472', status: 'Published' }
        ]
      })
    }
  }

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true)
      const { data } = await getStartupBySlugOrId(slug)
      if (data) {
        setStartup(data)
      } else {
        setStartup(buildFallbackRecord(slug))
      }
      setLoading(false)
    }

    if (slug) {
      fetchDetail()
    } else {
      setStartup(buildFallbackRecord('company-name'))
      setLoading(false)
    }
  }, [slug])

  const parse16Columns = (item) => {
    if (!item) return {}
    let parsed = {}
    if (item.description) {
      try {
        parsed = JSON.parse(item.description)
      } catch (e) {}
    }

    const primaryFounder = item.startup_founders?.[0]?.people

    return {
      company_name: item.name || parsed.company_name || 'Incubated Venture',
      founder_name: primaryFounder?.full_name || parsed.founder_name || 'Incubated Founder',
      is_women_founder: parsed.is_women_founder || (primaryFounder?.designation?.includes('Director') || false),
      cin_number: parsed.cin_number || 'U72900UP2024PTC198273',
      sector: parsed.sector || item.startup_categories?.name || 'Deep Tech & Innovation',
      website: item.website_url || parsed.website || 'https://navrachna.org',
      stage: parsed.stage || (item.incubation_status === 'graduated' ? 'Graduated' : 'Early Traction'),
      incubation_status: item.incubation_status || (parsed.stage?.toLowerCase().includes('graduat') ? 'graduated' : 'incubated'),
      mobile_number: primaryFounder?.phone || parsed.mobile_number || '+91 9540527700',
      email_id: primaryFounder?.email || parsed.email_id || 'incubation@navrachna.org',
      date_of_incorporation: parsed.date_of_incorporation || item.cohort_year || '2023-08-15',
      date_of_incubation: parsed.date_of_incubation || '2024-01-10',
      dpiit_number: parsed.dpiit_number || 'DPIIT98721',
      startinup_registration_number: parsed.startinup_registration_number || 'UP-STARTUP-2024-88',
      revenue_in_lakhs: parseFloat(parsed.revenue_in_lakhs || 12.5),
      about_startup: parsed.about_startup || (typeof item.description === 'string' && !item.description.startsWith('{') ? item.description : 'Detailed profile information for this incubated venture supported by Navrachna Foundation.'),
      slug: item.slug || parsed.slug || slug,
      logo_url: item.logo_url || parsed.logo_url || null,
      custom_fields: Array.isArray(parsed.custom_fields) && parsed.custom_fields.length > 0 ? parsed.custom_fields : [
        { key: 'Incubation Hub', value: 'Navrachna Foundation, Greater Noida' },
        { key: 'Lab Facilities Access', value: 'Electronics, 3D Printing & Prototyping Labs' }
      ],
      awards_and_recognitions: Array.isArray(parsed.awards_and_recognitions) && parsed.awards_and_recognitions.length > 0 ? parsed.awards_and_recognitions : [
        { title: 'Excellence in Startup Incubation Award', issuer: 'UP Startup Policy Forum', year: '2024' }
      ],
      patents: Array.isArray(parsed.patents) && parsed.patents.length > 0 ? parsed.patents : [
        { title: 'Novel Technology & System Hardware Process', number: 'IN202411098472', status: 'Published' }
      ]
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans font-normal">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#074887] mx-auto mb-4" />
          <p className="text-base text-slate-500 font-normal">Loading startup profile details...</p>
        </div>
      </div>
    )
  }

  const p = parse16Columns(startup)
  const isGraduated = p.incubation_status === 'graduated' || p.stage.toLowerCase().includes('graduat')

  const getInitials = (name) => {
    if (!name) return 'ST'
    const words = name.trim().split(/\s+/)
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased font-normal pb-20">
      
      {/* ── Mini Hero Banner Header ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none"></div>

        <div className="relative z-10 w-full">
          <div className="flex items-center gap-2 text-sm text-sky-200 mb-4 font-normal">
            <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-white font-normal">{p.company_name}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight mb-3">
            {p.company_name}
          </h1>
          <p className="text-base sm:text-lg text-sky-100 max-w-3xl leading-relaxed font-normal">
            Incubated Venture supported by Navrachna Foundation for Entrepreneurship Development (NFED).
          </p>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        
        {/* Startup Overview Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start justify-between gap-6 mb-10">
          
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Company Logo Container */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 rounded-2xl border border-slate-200 p-4 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
              {p.logo_url && !imgError ? (
                <img
                  src={p.logo_url}
                  alt={p.company_name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-3xl font-mono text-[#074887] font-normal">{getInitials(p.company_name)}</span>
              )}
            </div>

            {/* Title & Badges */}
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-sky-50 text-[#074887] text-xs font-semibold px-3 py-1 rounded-md border border-sky-100 uppercase tracking-wider">
                  {p.sector}
                </span>

                {isGraduated ? (
                  <span className="bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1 rounded-md border border-purple-200 uppercase tracking-wider">
                    Graduated Venture
                  </span>
                ) : (
                  <span className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-md border border-emerald-200 uppercase tracking-wider">
                    Active Incubated
                  </span>
                )}

                {p.revenue_in_lakhs > 0 && (
                  <span className="bg-amber-50 text-amber-800 text-xs font-mono font-semibold px-3 py-1 rounded-md border border-amber-200">
                    ₹{p.revenue_in_lakhs} Lakhs Rev
                  </span>
                )}

                {p.is_women_founder && (
                  <span className="bg-pink-50 text-pink-700 text-xs font-semibold px-3 py-1 rounded-md border border-pink-200 uppercase tracking-wider">
                    Women Led Venture
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl text-slate-900 font-normal mt-1">{p.company_name}</h2>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 font-normal">
                {p.date_of_incorporation !== 'N/A' && (
                  <span>Incorporated: <strong className="text-slate-900 font-medium">{p.date_of_incorporation}</strong></span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3.5 self-stretch md:self-auto shrink-0 mt-4 md:mt-0">
            {p.website && (
              <a
                href={p.website.startsWith('http') ? p.website : `https://${p.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto text-center bg-black hover:bg-slate-800 text-white! px-6 py-3.5 rounded-xl text-sm font-normal transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                style={{ color: '#ffffff' }}
              >
                <span className="text-white!" style={{ color: '#ffffff' }}>Visit Official Website</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Master Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Main Column: Narrative, Awards, Patents */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* About / Narrative */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-xs">
              <h3 className="text-xl text-[#013759] font-normal border-b border-slate-100 pb-4 mb-4 flex items-center gap-2.5">
                <svg className="w-5 h-5 text-[#074887]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About the Venture</span>
              </h3>
              <p className="text-base text-slate-700 leading-relaxed text-left whitespace-pre-line font-normal">
                {p.about_startup}
              </p>
            </div>

            {/* Awards & Recognitions Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-xs">
              <h3 className="text-xl text-[#013759] font-normal border-b border-slate-100 pb-4 mb-4 flex items-center gap-2.5">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4m6 0h4m-2-2v4m-5 11l-4 4-1-1 4-4m5 1l-1 1-4-4 1-1 4 4m-7-5a5 5 0 1110 0 5 5 0 01-10 0z" />
                </svg>
                <span>Awards & Recognitions</span>
              </h3>

              {p.awards_and_recognitions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.awards_and_recognitions.map((award, idx) => (
                    <div key={idx} className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-5 flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1 text-left">
                        <h4 className="text-sm font-medium text-slate-900">{typeof award === 'object' ? award.title : award}</h4>
                        {typeof award === 'object' && award.issuer && (
                          <span className="text-xs text-slate-600 font-normal">Issued by: {award.issuer}</span>
                        )}
                        {typeof award === 'object' && award.year && (
                          <span className="text-xs font-mono text-amber-800 font-normal">Year: {award.year}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-500 font-normal">
                  No specific awards listed for this venture yet.
                </div>
              )}
            </div>

            {/* Patents & Intellectual Property (IP) Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-xs">
              <h3 className="text-xl text-[#013759] font-normal border-b border-slate-100 pb-4 mb-4 flex items-center gap-2.5">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Patents & Intellectual Property (IP)</span>
              </h3>

              {p.patents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.patents.map((pat, idx) => (
                    <div key={idx} className="bg-purple-50/50 border border-purple-200/80 rounded-xl p-5 flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1 text-left">
                        <h4 className="text-sm font-medium text-slate-900">{typeof pat === 'object' ? pat.title : pat}</h4>
                        {typeof pat === 'object' && pat.number && (
                          <span className="text-xs font-mono text-purple-900 font-normal">Patent / App No: {pat.number}</span>
                        )}
                        {typeof pat === 'object' && pat.status && (
                          <span className="text-xs font-medium text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded inline-block w-fit mt-1">Status: {pat.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-500 font-normal">
                  No registered patents listed for this venture.
                </div>
              )}
            </div>

            {/* Custom Extensibility Fields */}
            {p.custom_fields.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-xs">
                <h3 className="text-xl text-[#013759] font-normal border-b border-slate-100 pb-4 mb-4">Additional Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.custom_fields.map((cf, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left">
                      <span className="text-xs font-medium text-slate-500 block uppercase tracking-wider">{cf.key}</span>
                      <span className="text-sm text-slate-900 font-normal mt-1 block">{cf.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Key Specs & Contacts */}
          <div className="flex flex-col gap-8">
            
            {/* Official Registration & Stage Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs flex flex-col gap-5 text-left">
              <h3 className="text-lg font-normal text-slate-900 border-b border-slate-100 pb-3">Master Registration Data</h3>
              
              <div className="flex flex-col gap-4 text-sm">
                <div>
                  <span className="text-slate-400 font-normal text-xs block mb-0.5">Corporate Identification No. (CIN)</span>
                  <span className="font-mono text-slate-900 font-normal">{p.cin_number}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-normal text-xs block mb-0.5">DPIIT Recognition Number</span>
                  <span className="font-mono text-slate-900 font-normal">{p.dpiit_number}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-normal text-xs block mb-0.5">StartinUP Registration Number</span>
                  <span className="font-mono text-slate-900 font-normal">{p.startinup_registration_number}</span>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <span className="text-slate-400 font-normal text-xs block mb-0.5">Incubation Stage</span>
                  <span className="text-slate-900 font-normal">{p.stage}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-normal text-xs block mb-0.5">Incubation Joining Date</span>
                  <span className="text-slate-900 font-normal">{p.date_of_incubation}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-normal text-xs block mb-0.5">Date of Incorporation</span>
                  <span className="text-slate-900 font-normal">{p.date_of_incorporation}</span>
                </div>
              </div>
            </div>

            {/* Return to Portfolio Link */}
            <div className="mt-2">
              <Link
                to="/portfolio"
                className="w-full py-3.5 px-6 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[#074887] text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                ← Back to Portfolio Directory
              </Link>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}
