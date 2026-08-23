import React from 'react'
import Stack from '../ui/Stack'
import { ScrollReveal } from '../ui/ScrollReveal'
import { OUR_SPACES, PROGRAMS } from '../../data/landingData'

import logoStartinUp from '../../assets/navrachna_images/program_logos/official_startinup.png'
import logoNewGen from '../../assets/navrachna_images/program_logos/official_newgen.png'
import logoMsme from '../../assets/navrachna_images/program_logos/official_msme.png'
import logoIic from '../../assets/navrachna_images/program_logos/official_iic.png'
import logoKartavyam from '../../assets/navrachna_images/program_logos/official_kartavyam.png'

const SCHEMES = [
  {
    title: "Startin-UP Program",
    logo: logoStartinUp,
    description: "Official incubation and seed support under UP Startup Policy 2020. Providing monthly stipends, prototype funding, and commercial scaling support.",
    link: "/programs/startin-up"
  },
  {
    title: "NewGen IEDC",
    description: "Supported by DST, Govt. of India. Offering ₹2.5 Lakhs prototype grants per student project along with world-class prototyping facilities.",
    logo: logoNewGen,
    link: "/programs/newgen-iedc"
  },
  {
    title: "MSME Business Incubator",
    description: "Direct scheme under Ministry of MSME, GOI offering ₹15 Lakhs prototype development support and access to MSME hackathons.",
    logo: logoMsme,
    link: "/programs/msme-bi"
  },
  {
    title: "Institution's Innovation Council (IIC)",
    description: "Fostering campus innovation, startup hackathons, and IP development under Ministry of Education (MoE) Innovation Cell.",
    logo: logoIic,
    link: "/programs/iic-itsec"
  },
  {
    title: "Kartavyam Initiative",
    description: "Empowering 300+ school students across 40+ partner schools through early STEM innovation, social responsibility, and youth entrepreneurship development.",
    logo: logoKartavyam,
    link: "/programs/kartavyam"
  }
]

export function ProgramsSection() {
  return (
    <>
      {/* Our Spaces Section */}
      <section className="relative w-full bg-white py-8 sm:py-24 border-b border-slate-200/80">
        <ScrollReveal>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-left md:text-center mb-4 md:mb-12">
              <h2 className="mb-2 sm:mb-6 font-normal text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#266d9a]">
                Our Spaces
              </h2>
              <p className="md:mx-auto max-w-3xl text-slate-700 text-xs sm:text-base leading-relaxed mb-4 md:mb-8 font-normal">
                We provide dynamic workspaces, expert mentorship, networking opportunities, and business support services to help startups and entrepreneurs thrive.
              </p>
            </div>

            {/* Interactive Card Stack */}
            <div className="w-70 sm:w-95 md:w-120 lg:w-135 h-90 sm:h-115 md:h-135 ml-0 md:mx-auto my-4 md:my-8 relative">
              <Stack
                randomRotation={true}
                sensitivity={160}
                sendToBackOnClick={true}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                cards={OUR_SPACES.map((space, idx) => (
                  <div key={idx} className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/20 bg-[#013759] group">
                    <img src={space.image} alt={space.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 md:p-8 flex flex-col justify-end text-left">
                      <h3 className="text-lg md:text-2xl font-semibold text-white leading-snug">{space.title}</h3>
                      <p className="text-xs sm:text-base text-white/85 line-clamp-2 md:line-clamp-3 mt-1 md:mt-2 font-normal leading-relaxed">{space.description}</p>
                    </div>
                  </div>
                ))}
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Schemes & Programs Section */}
      <section className="relative w-full bg-white py-10 lg:py-24 border-b border-slate-200/80">
        <ScrollReveal>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Column */}
            <div className="w-full lg:w-[42%] flex flex-col items-start text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#266d9a] tracking-tight leading-[1.15] mb-4 lg:mb-6">
                Explore our Ecosystem Dimensions
              </h2>
              <p className="text-slate-700 text-xs sm:text-base leading-relaxed text-justify mb-6 lg:mb-8 font-normal">
                At Navrachna Foundation, we coordinate incubation schemes that nurture entrepreneurs across every stage of their startup journey. These structured programs combine equity-free prototype grants, monthly fellowship stipends, intensive commercial scaling pipelines, and institutional resources to ensure early-stage ventures gain the right strategic assets to succeed.
              </p>
              <a href="/programs" className="rounded-xl bg-black px-6 py-3 font-normal text-xs sm:text-sm text-white! shadow-md hover:bg-slate-800 transition-all duration-300 active:scale-95 inline-block cursor-pointer" style={{ color: '#ffffff' }}>
                <span className="text-white!" style={{ color: '#ffffff' }}>View all Programs</span>
              </a>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[58%] overflow-hidden">
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto snap-x snap-mandatory gap-4 lg:gap-0 lg:space-y-4 pb-4 lg:pb-0 h-auto lg:h-120 pr-0 lg:pr-3 scroll-smooth">
                {SCHEMES.map((scheme, idx) => (
                  <a 
                    key={idx}
                    href={scheme.link}
                    className="shrink-0 w-[82vw] sm:w-85 lg:w-full snap-start flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border border-sky-100 bg-white shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-full sm:w-45 h-25 sm:h-27.5 rounded-xl overflow-hidden shrink-0 relative bg-white border border-slate-200 shadow-sm p-3 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                      <img src={scheme.logo} alt={scheme.title} className="max-w-full max-h-full object-contain" />
                    </div>

                    <div className="flex-1 text-left flex flex-col items-start justify-center">
                      <h3 className="text-lg sm:text-xl font-normal tracking-tight text-[#013759] group-hover:text-[#074887] transition-colors duration-200">
                        {scheme.title}
                      </h3>
                      <p className="text-xs sm:text-base font-normal text-slate-600 leading-relaxed mt-1.5 sm:mt-2 text-justify">
                        {scheme.description}
                      </p>
                      <span 
                        className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#074887] group-hover:text-[#266d9a] transition-colors duration-300 mt-3 sm:mt-4 group/link"
                      >
                        Read More
                        <svg className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
