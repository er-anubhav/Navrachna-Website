import React from 'react'

/**
 * ProgramCards
 * Matches the original 'Schemes & Programs' section layout:
 * - Left column text + action button
 * - Right column vertical scrollable list with customized scrollbar
 * - Card elements with left-side gradient badges containing glassmorphic text details
 */
export function ProgramCards({
  heading     = 'Explore Our Flagship Schemes and Programmes',
  description = 'At Navrachna Foundation (NFED), we coordinate flagship incubation schemes that nurture entrepreneurs across every stage of their startup journey.',
  ctaLabel    = 'View all Program',
  ctaHref     = '#',
  programs    = [],
  style       = {},
}) {
  const {
    bg           = '#ffffff',
    textColor    = '#4b5563',
    headingColor = '#013759',
    accentColor  = '#074887',
  } = style

  const defaultPrograms = [
    { badge: 'Startin-Up', title: 'Startin-Up', body: 'Discover funding and incubation opportunities through our specialized Startin-Up program, designed to assist and enable young entrepreneurs to initiate commercial exploitation of their technologies.', tag: 'Commercial exploitation', gradient: 'from-indigo-950 via-purple-900 to-fuchsia-800' },
    { badge: 'NewGen IEDC', title: 'NewGen-IEDC', body: 'The NewGen IEDC program helps students develop entrepreneurial skills, test startup ideas, and connect with investors. We provide a dynamic and collaborative workspace that empowers you.', tag: 'Entrepreneurial skills', gradient: 'from-emerald-950 via-green-800 to-yellow-600' },
    { badge: 'MSME-BI', title: 'MSME-BI', body: 'Participate in MSME Hackathons to solve real-world industry challenges and secure seed funding. A direct approach towards solving your startup problems with 1 to 1 mentorship.', tag: 'Hackathon & Mentorship', gradient: 'from-rose-950 via-red-800 to-orange-600' },
  ]

  const displayPrograms = programs.length > 0 ? programs : defaultPrograms

  const renderColoredHeading = (text) => {
    if (text.toLowerCase().includes('flagship')) {
      const parts = text.split(/flagship/i)
      return (
        <>
          {parts[0]}
          <span className="inline-block">
            <span className="text-[#10b981]">F</span>
            <span className="text-[#ec4899]">l</span>
            <span className="text-[#3b82f6]">a</span>
            <span className="text-[#f59e0b]">g</span>
            <span className="text-[#ef4444]">s</span>
            <span className="text-[#8b5cf6]">h</span>
            <span className="text-[#06b6d4]">i</span>
            <span className="text-[#3b82f6]">p</span>
          </span>
          {parts[1]}
        </>
      )
    }
    return text
  }

  return (
    <section className="relative w-full py-24 border-t border-gray-100 bg-white" style={{ background: bg }}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Column - Info & Action */}
        <div className="w-full lg:w-[42%] flex flex-col items-start text-left">
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight leading-[1.15] mb-6" style={{ color: headingColor }}>
            {renderColoredHeading(heading)}
          </h2>
          <p className="text-base md:text-md leading-relaxed text-justify mb-8 font-normal" style={{ color: textColor }}>
            {description}
          </p>
          {ctaLabel && (
            <a 
              href={ctaHref}
              className="rounded-xl bg-black px-8 py-3.5 font-medium text-white shadow-lg hover:bg-gray-800 transition-all duration-300 active:scale-95 cursor-pointer block text-center"
            >
              {ctaLabel}
            </a>
          )}
        </div>

        {/* Right Column - Scrollable Cards */}
        <div className="w-full lg:w-[58%]">
          {/* Custom Vertical Scrollbar Styling */}
          <style>{`
            .custom-v-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-v-scrollbar::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 9999px;
            }
            .custom-v-scrollbar::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 9999px;
            }
            .custom-v-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
          `}</style>

          <div className="h-[480px] overflow-y-auto pr-3 space-y-4 custom-v-scrollbar scroll-smooth">
            {displayPrograms.map((prog, idx) => {
              const grad = prog.gradient || 'from-indigo-950 via-purple-900 to-fuchsia-800'
              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl border border-sky-100/40 bg-[#f0f9ff] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Left Side Graphic Badge */}
                  <div className={`w-full sm:w-[180px] h-[110px] rounded-xl overflow-hidden shrink-0 relative bg-gradient-to-br ${grad} shadow-md`}>
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      <div className="w-full py-2 px-2.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-inner">
                        <span className="text-sm font-semibold tracking-wide text-white uppercase block leading-tight">
                          {prog.badge}
                        </span>
                        <span className="text-[7.5px] text-white/80 block uppercase tracking-normal font-normal mt-0.5 leading-none">
                          {prog.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Text Contents */}
                  <div className="flex-1 text-left flex flex-col items-start justify-center">
                    <h3 className="text-xl font-normal tracking-tight text-[#013759]">
                      {prog.title}
                    </h3>
                    <p className="text-sm font-normal text-gray-600 leading-relaxed mt-2 text-justify">
                      {prog.body}
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#074887] hover:text-[#fbbf24] transition-colors duration-300 mt-4 group/link"
                    >
                      Read More
                      <svg className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
      </div>
    </section>
  )
}
