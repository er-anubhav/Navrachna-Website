import React, { useState, useEffect } from 'react'
import heroImage from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'
import { getStartups } from '../../services/startupsService'
import { Link } from 'react-router-dom'

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

export function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [startupsList, setStartupsList] = useState(STATIC_STARTUPS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLiveStartups() {
      setLoading(true)
      const { data } = await getStartups()
      if (data && data.length > 0) {
        const formatted = data.map((item, idx) => {
          const staticMatch = STATIC_STARTUPS.find(s => s.name.toLowerCase() === item.name.toLowerCase()) || STATIC_STARTUPS[idx % STATIC_STARTUPS.length]
          let p = {}
          try { if (item.description) p = JSON.parse(item.description) } catch(e){}
          const slug = item.slug || p.slug || (item.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

          return {
            id: item.id,
            slug,
            name: item.name,
            logo: item.logo_url && item.logo_url.startsWith('http') ? item.logo_url : staticMatch.logo,
            type: idx < 14 ? 'women' : 'prominent',
            category: item.startup_categories?.name || staticMatch.category,
            desc: p.about_startup || (typeof item.description === 'string' && !item.description.startsWith('{') ? item.description : staticMatch.desc)
          }
        })
        setStartupsList(formatted)
      } else {
        setStartupsList(STATIC_STARTUPS)
      }
      setLoading(false)
    }

    fetchLiveStartups()
  }, [])

  const filteredStartups = startupsList.filter((s) => {
    if (activeTab === 'all') return true
    if (activeTab === 'women') return s.type === 'women'
    if (activeTab === 'prominent') return s.type === 'prominent'
    return true
  })

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased font-normal">

      {/* ── Hero Banner ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none"></div>

        <div className="relative w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-4">
            Our Portfolio Startups
          </h1>
          <p className="text-base sm:text-lg text-sky-100 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            Discover the innovative ventures accelerated by Navrachna Foundation across Deep-Tech, Clean-Tech, Agri-Tech, and Women-Led Entrepreneurship.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="/contact" 
              className="px-6 py-3.5 rounded-xl bg-white text-[#013759] text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Apply for Incubation
            </a>
            <a 
              href="/stories" 
              className="px-6 py-3.5 rounded-xl border border-white/40 bg-white/10 text-white! text-sm font-normal backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Read Success Stories</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs & Main Content ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        
        {/* Category Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-200 pb-6 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#074887] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Ventures ({startupsList.length})
          </button>
          <button
            onClick={() => setActiveTab('women')}
            className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'women'
                ? 'bg-[#074887] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Women-Led Startups
          </button>
          <button
            onClick={() => setActiveTab('prominent')}
            className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'prominent'
                ? 'bg-[#074887] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Prominent Incubated Startups
          </button>
        </div>

        {/* Startups Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#074887] mx-auto mb-4" />
            <p className="text-base text-slate-500 font-normal">Loading portfolio startups...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStartups.map((item, index) => {
              const itemSlug = item.slug || (item.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-4">
                    {/* Logo / Image Placeholder Container */}
                    <div className="w-full h-28 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const placeholder = e.target.parentElement.querySelector('.image-placeholder');
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="image-placeholder flex-col items-center justify-center text-slate-300"
                        style={{ display: item.logo ? 'none' : 'flex' }}
                      >
                        <svg className="w-8 h-8 mb-1 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="18" height="18" rx="3"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"></circle>
                          <path d="M21 15l-5-5L5 21"></path>
                        </svg>
                        <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400">No Image Available</span>
                      </div>
                    </div>

                    {/* Info Block */}
                    <div className="flex flex-col items-start gap-1.5">
                      <span className="text-xs font-semibold text-[#074887] bg-sky-50 px-3 py-1 rounded-md border border-sky-100 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <Link to={`/portfolio/${itemSlug}`} className="block mt-1">
                        <h3 className="text-xl font-normal text-slate-900 group-hover:text-[#074887] transition-colors leading-snug">
                          {item.name}
                        </h3>
                      </Link>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed font-normal text-left">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#074887] uppercase tracking-wider">
                      Incubated Venture
                    </span>
                    <Link
                      to={`/portfolio/${itemSlug}`}
                      className="text-sm font-medium text-[#074887] hover:underline flex items-center gap-1.5"
                    >
                      <span>View Profile</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </main>

    </div>
  )
}
