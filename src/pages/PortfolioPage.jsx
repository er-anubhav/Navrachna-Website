import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

// Import all startup logos from the landing page assets
import client1 from '../assets/navrachna_images/ArunChaudhary-1.png'
import client2 from '../assets/navrachna_images/DIGIERA-PRIVATE-LIMITED.png'
import client3 from '../assets/navrachna_images/JagmagLights-1.png'
import client4 from '../assets/navrachna_images/MyLyfCare-1.png'
import client5 from '../assets/navrachna_images/TripoSaints-1.png'
import client6 from '../assets/navrachna_images/UPROI-1-scaled.png'
import client7 from '../assets/navrachna_images/VerdantLogo-1.png'
import client8 from '../assets/navrachna_images/Weaclim-1.png'
import client9 from '../assets/navrachna_images/indus-1.jpg'
import client10 from '../assets/navrachna_images/intelliginetia-1.jpg'

export function PortfolioPage() {
  const STARTUPS = [
    {
      logo: client4,
      name: "MyLyfCare",
      category: "Healthcare Technology",
      desc: "A comprehensive digital healthcare platform designed to streamline diagnostic bookings, patient record management, and localized medical supplies."
    },
    {
      logo: client2,
      name: "Digiera Private Limited",
      category: "Enterprise Software",
      desc: "An advanced software consulting and digital transformation venture delivering next-gen web applications and secure enterprise integrations."
    },
    {
      logo: client5,
      name: "TripoSaints",
      category: "Sustainable Tourism",
      desc: "A modern eco-tourism and smart travel platform providing automated itineraries, green local experiences, and carbon-offset tracking."
    },
    {
      logo: client7,
      name: "Verdant",
      category: "Smart Agriculture",
      desc: "A smart agricultural and green-tech firm innovating in IoT-based crop monitoring and water-efficient irrigation hardware."
    },
    {
      logo: client8,
      name: "Weaclim",
      category: "Deep Tech & Climate",
      desc: "A deep-tech environmental engineering company providing advanced climate analytics and localization systems for green building designs."
    },
    {
      logo: client3,
      name: "Jagmag Lights",
      category: "Smart Hardware & IoT",
      desc: "A premium consumer electronics and smart lighting brand innovating in energy-efficient IoT LED controllers and smart home lighting integrations."
    },
    {
      logo: client1,
      name: "Arun Chaudhary",
      category: "Advanced Robotics & Engineering",
      desc: "A pioneering custom engineering firm specializing in advanced mechanical designs and localized heavy-machine prototypes."
    },
    {
      logo: client6,
      name: "UPROI",
      category: "Financial Analytics",
      desc: "A fast-scaling financial analytics platform helping regional businesses optimize their return on investment with precise local tax planning."
    },
    {
      logo: client9,
      name: "Indus",
      category: "Advanced Manufacturing",
      desc: "A regional manufacturing and clean manufacturing initiative focused on high-quality material printing and sustainable manufacturing SOPs."
    },
    {
      logo: client10,
      name: "Intelliginetia",
      category: "Artificial Intelligence",
      desc: "A cutting-edge artificial intelligence research and consulting lab optimizing data telemetry, ML models, and edge compute firmware."
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      
      {/* Hero Header Section */}
      <section className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            Our Portfolio
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
            Meet the pioneering startup founders and high-impact technology ventures actively incubating and scaling at the Navrachna Foundation.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="w-full py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {STARTUPS.map((startup, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Startup Logo Area */}
                  <div className="mb-8 flex h-32 w-full items-center justify-center rounded-xl bg-slate-50/50 p-4 border border-slate-100 group-hover:bg-white transition-colors duration-300">
                    <img 
                      src={startup.logo} 
                      alt={`${startup.name} logo`} 
                      className="max-h-full max-w-full object-contain transition-all duration-300"
                    />
                  </div>

                  {/* Startup Meta */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#074887] tracking-wider uppercase">
                      {startup.category}
                    </span>
                    <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 uppercase tracking-wider">
                      Incubated
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl text-[#013759] font-normal tracking-tight">
                    {startup.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify mb-2">
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
