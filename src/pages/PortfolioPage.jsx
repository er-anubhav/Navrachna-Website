import React, { useState } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import slideFull from '../assets/navrachna_images/portfolio/portfolio_slide_full.png'

// Women-Centric Startup Logos
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

// Prominent Startup Logos
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

export function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('all')

  const ALL_STARTUPS = [
    // --- WOMEN-CENTRIC STARTUPS (14) ---
    {
      name: "Jagmag Lights",
      logo: logoJagmag,
      type: "women",
      category: "Smart Hardware & IoT",
      desc: "Energy-efficient IoT LED controllers and smart home decorative lighting solutions."
    },
    {
      name: "Neurapex AI",
      logo: logoNeurapex,
      type: "women",
      category: "Artificial Intelligence",
      desc: "Deep learning & natural language processing systems for enterprise decision automation."
    },
    {
      name: "Indus AI",
      logo: logoIndusAi,
      type: "women",
      category: "Advanced Manufacturing",
      desc: "AI-driven industrial quality inspection and automated manufacturing vision systems."
    },
    {
      name: "Digiera Private Limited",
      logo: logoDigieraD,
      type: "women",
      category: "Enterprise Software",
      desc: "Custom web development, mobile apps, and enterprise software engineering consulting."
    },
    {
      name: "ePN (Electro-Proton Network)",
      logo: logoEpn,
      type: "women",
      category: "Electronics & Hardware",
      desc: "Advanced electronic circuit designs and hardware prototyping solutions."
    },
    {
      name: "MyLyfCare",
      logo: logoMylyfcare,
      type: "women",
      category: "Healthcare Technology",
      desc: "Digital healthcare aggregator connecting patients to localized diagnostic centers and pharmacies."
    },
    {
      name: "Door to Destination Technologies",
      logo: logoDoortodestination,
      type: "women",
      category: "Smart Logistics",
      desc: "Tech-enabled hyper-local logistics and smart dispatch routing solutions."
    },
    {
      name: "Green Stag Technologies",
      logo: logoGreenstag,
      type: "women",
      category: "Agrotech & Biomass",
      desc: "Sustainable biomass processing and green agricultural hardware solutions."
    },
    {
      name: "Barren to Berland Abrosaa",
      logo: logoAbrosaa,
      type: "women",
      category: "Agritech & Soil Restoration",
      desc: "Land reclamation and bio-fertilizer innovations converting wasteland into fertile soil."
    },
    {
      name: "Cyberkida Digiera",
      logo: logoCyberkida,
      type: "women",
      category: "Cyber Security & EdTech",
      desc: "Ethical hacking training, cyber defense platforms, and digital security auditing."
    },
    {
      name: "SSB Engineering",
      logo: logoSsb,
      type: "women",
      category: "Industrial Prototyping",
      desc: "Heavy structural fabrication and custom mechanical component manufacturing."
    },
    {
      name: "VN Organics",
      logo: logoVnorganics,
      type: "women",
      category: "Health & Organic Foods",
      desc: "Pure organic food products and natural wellness formulations."
    },
    {
      name: "TripoSaints",
      logo: logoTriposaints,
      type: "women",
      category: "Sustainable Tourism",
      desc: "Smart eco-tourism platform providing curated green travel experiences."
    },
    {
      name: "TrulyFresh Hydroponics",
      logo: logoTrulyfresh,
      type: "women",
      category: "Hydroponic Agritech",
      desc: "Urban hydroponic farming setups delivering pesticide-free fresh produce."
    },

    // --- PROMINENT STARTUPS (14) ---
    {
      name: "NextOrbit Innovations",
      logo: logoNextorbit,
      type: "prominent",
      category: "Aerospace & SpaceTech",
      desc: "Advanced satellite telemetry components and propulsion simulation software."
    },
    {
      name: "Unnat Jivan (UJ)",
      logo: logoUnnatjivan,
      type: "prominent",
      category: "CleanTech & Renewable Energy",
      desc: "Solar-powered utility devices and rural green energy distribution kits."
    },
    {
      name: "BigBlare Innovations",
      logo: logoBigblare,
      type: "prominent",
      category: "EV & Embedded Electronics",
      desc: "DST & MSME-funded EV acceleration enhancers and smart battery management systems."
    },
    {
      name: "Autoremov",
      logo: logoAutoremov,
      type: "prominent",
      category: "AI Image Processing",
      desc: "Automated AI background removal and computer vision graphic suites."
    },
    {
      name: "Home Services Tech",
      logo: logoHomeservices,
      type: "prominent",
      category: "On-Demand Services",
      desc: "Hyper-local marketplace connecting skilled technicians with household maintenance needs."
    },
    {
      name: "E4A Solution (Edge for All)",
      logo: logoE4asolution,
      type: "prominent",
      category: "IoT & Edge Computing",
      desc: "Edge-computing gateways and real-time industrial telemetry sensors."
    },
    {
      name: "Intelligentia Labs",
      logo: logoIntelligentia,
      type: "prominent",
      category: "AI Research & Telemetry",
      desc: "Machine learning model optimization and edge compute firmware consulting."
    },
    {
      name: "UPROI Digital",
      logo: logoUproi,
      type: "prominent",
      category: "Financial Analytics & Tax Tech",
      desc: "ROI optimization tools and digital tax compliance platforms for regional MSMEs."
    },
    {
      name: "Kineer Services",
      logo: logoKineer,
      type: "prominent",
      category: "Clean Water & Social Enterprise",
      desc: "Water purification infrastructure creating dignified employment opportunities."
    },
    {
      name: "Evergreat Clean Energy",
      logo: logoEvergreat,
      type: "prominent",
      category: "Renewable Power Solutions",
      desc: "Commercial rooftop solar installations and energy storage systems."
    },
    {
      name: "Hexagon Tech Systems",
      logo: logoHexagontetch,
      type: "prominent",
      category: "Deep-Tech Engineering",
      desc: "High-precision CAD design, FEA structural simulation, and rapid tooling."
    },
    {
      name: "Red Turbine Systems",
      logo: logoRedspiral,
      type: "prominent",
      category: "Industrial Power Hardware",
      desc: "High-efficiency micro-turbines and heat-recovery power generators."
    },
    {
      name: "Nutri Town Superfoods",
      logo: logoNutritown,
      type: "prominent",
      category: "Bio-Nutrition & Organic Foods",
      desc: "Nutrient-dense organic superfood formulations and clean snacks."
    },
    {
      name: "Laarsa Organic",
      logo: logoLaarsa,
      type: "prominent",
      category: "Sustainable Agribusiness",
      desc: "Eco-friendly agricultural outputs and sustainable bio-crop nutrients."
    }
  ]

  const filteredStartups = ALL_STARTUPS.filter(s => {
    if (activeTab === 'women') return s.type === 'women'
    if (activeTab === 'prominent') return s.type === 'prominent'
    return true
  })

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      
      {/* Hero Header Section */}
      <section className="relative flex min-h-[45vh] w-full items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 border border-amber-300/30 mb-4">
            Incubated Ventures Showcase
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            Our Incubated Portfolio
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed">
            Empowering 60+ high-impact startups, including 45+ women-led enterprises and deep-tech innovators supported under DST, StartinUP, and MSME grants.
          </p>
        </div>
      </section>

      {/* Official Pitch Deck Portfolio Banner Showcase */}
      <section className="w-full bg-slate-900 py-8 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4 sm:p-6 shadow-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">
                  Official Pitch Deck Venture Wall
                </h3>
                <p className="text-xs text-slate-400">
                  Verified Portfolio of Women-Centric & Prominent Incubated Startups (28 Featured)
                </p>
              </div>
              <div className="flex gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-medium px-3 py-1 rounded-full border border-emerald-500/30">
                  14 Women-Centric
                </span>
                <span className="bg-sky-500/20 text-sky-300 text-[11px] font-medium px-3 py-1 rounded-full border border-sky-500/30">
                  14 Prominent
                </span>
              </div>
            </div>
            
            <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-white/5 p-2 backdrop-blur-md">
              <img 
                src={slideFull} 
                alt="Navrachna Foundation Incubated Portfolio Wall" 
                className="w-full h-auto object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Startup Cards Grid Section */}
      <section className="w-full py-16 sm:py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#013759] text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Startups ({ALL_STARTUPS.length})
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'women'
                  ? 'bg-[#013759] text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Women Centric Startups (14)
            </button>
            <button
              onClick={() => setActiveTab('prominent')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'prominent'
                  ? 'bg-[#013759] text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Prominent Startups (14)
            </button>
          </div>

          {/* Startups Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStartups.map((startup, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  {/* Startup Logo Container */}
                  <div className="mb-4 flex h-28 w-full items-center justify-center rounded-xl bg-slate-50 p-3 border border-slate-100 group-hover:bg-white transition-colors duration-300">
                    <img 
                      src={startup.logo} 
                      alt={`${startup.name} logo`} 
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Category & Type Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-[#074887] tracking-wider uppercase truncate">
                      {startup.category}
                    </span>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider shrink-0 ${
                      startup.type === 'women' 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                        : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}>
                      {startup.type === 'women' ? 'Women Led' : 'Prominent'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mb-2 text-base font-normal text-[#013759] tracking-tight">
                    {startup.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed text-justify">
                    {startup.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
