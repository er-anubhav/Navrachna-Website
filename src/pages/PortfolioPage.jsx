import React, { useState, useEffect } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import { getStartups } from '../services/startupsService'

// Women-Centric Startup Fallback Logos
import logoJagmag from '../assets/navrachna_images/portfolio/logo_jagmag.png'
import logoNeurapex from '../assets/navrachna_images/portfolio/logo_neurapex.png'
import logoIndusAi from '../assets/navrachna_images/portfolio/logo_indus_ai.png'
import logoDigieraD from '../assets/navrachna_images/portfolio/logo_digiera_d.png'
import logoEpn from '../assets/navrachna_images/portfolio/logo_epn.png'
import logoMylyfcare from '../assets/navrachna_images/portfolio/logo_mylyfcare.png'
import logoDoortodestination from '../assets/navrachna_images/portfolio/logo_doortodestination.png'
import logoGreenstag from '../assets/navrachna_images/portfolio/logo_greenstag.png'
import logoAbrosaa from '../assets/navrachna_images/portfolio/logo_abrosaa.png'
import logoCyberkida from '../assets/navrachna_images/portfolio/logo_cyberkida.png'
import logoSsb from '../assets/navrachna_images/portfolio/logo_ssb.png'
import logoVnorganics from '../assets/navrachna_images/portfolio/logo_vnorganics.png'
import logoTriposaints from '../assets/navrachna_images/portfolio/logo_triposaints.png'
import logoTrulyfresh from '../assets/navrachna_images/portfolio/logo_trulyfresh.png'

// Prominent Startup Fallback Logos
import logoNextorbit from '../assets/navrachna_images/portfolio/logo_nextorbit.png'
import logoUnnatjivan from '../assets/navrachna_images/portfolio/logo_unnatjivan.png'
import logoBigblare from '../assets/navrachna_images/portfolio/logo_bigblare.png'
import logoAutoremov from '../assets/navrachna_images/portfolio/logo_autoremov.png'
import logoHomeservices from '../assets/navrachna_images/portfolio/logo_homeservices.png'
import logoE4asolution from '../assets/navrachna_images/portfolio/logo_e4asolution.png'
import logoIntelligentia from '../assets/navrachna_images/portfolio/logo_intelligentia.png'
import logoUproi from '../assets/navrachna_images/portfolio/logo_uproi.png'
import logoKineer from '../assets/navrachna_images/portfolio/logo_kineer.png'
import logoEvergreat from '../assets/navrachna_images/portfolio/logo_evergreat.png'
import logoHexagontetch from '../assets/navrachna_images/portfolio/logo_hexagontetch.png'
import logoRedspiral from '../assets/navrachna_images/portfolio/logo_redspiral.png'
import logoNutritown from '../assets/navrachna_images/portfolio/logo_nutritown.png'
import logoLaarsa from '../assets/navrachna_images/portfolio/logo_laarsa.png'

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
          return {
            name: item.name,
            logo: item.logo_url && item.logo_url.startsWith('http') ? item.logo_url : staticMatch.logo,
            type: idx < 14 ? 'women' : 'prominent',
            category: item.startup_categories?.name || staticMatch.category,
            desc: item.description || staticMatch.desc
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
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased font-normal">

      {/* Mini Hero Section */}
      <section className="relative flex min-h-[35vh] w-full items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            Our Portfolio Startups
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-white/80 max-w-2xl mx-auto">
            Discover the innovative ventures accelerated by Navrachna Foundation across Deep-Tech, Clean-Tech, Agri-Tech, and Women-Led Entrepreneurship.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-200 pb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-full px-5 py-2 text-xs font-normal transition-all ${
              activeTab === 'all'
                ? 'bg-[#013759] text-white shadow-sm'
                : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
            }`}
          >
            All Ventures ({startupsList.length})
          </button>
          <button
            onClick={() => setActiveTab('women')}
            className={`rounded-full px-5 py-2 text-xs font-normal transition-all ${
              activeTab === 'women'
                ? 'bg-[#013759] text-white shadow-sm'
                : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
            }`}
          >
            Women-Led Startups
          </button>
          <button
            onClick={() => setActiveTab('prominent')}
            className={`rounded-full px-5 py-2 text-xs font-normal transition-all ${
              activeTab === 'prominent'
                ? 'bg-[#013759] text-white shadow-sm'
                : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
            }`}
          >
            Prominent Incubated Startups
          </button>
        </div>

        {/* Startups Grid */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-4" />
            <p className="text-sm text-gray-500">Loading portfolio startups from Supabase...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStartups.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-lg border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col gap-4">
                  {/* Logo Container */}
                  <div className="w-full h-24 rounded border border-slate-100 bg-slate-50/50 flex items-center justify-center p-4">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
                    />
                  </div>

                  {/* Info Block */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-normal uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <h3 className="text-base text-slate-900 font-normal group-hover:text-[#013759] transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed text-justify">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-normal text-[#013759] uppercase tracking-wider">
                    Incubated Venture
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  )
}
