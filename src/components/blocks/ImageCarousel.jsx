import React, { useRef } from 'react'

/**
 * ImageCarousel
 * Matches the original 'Our Spaces' horizontal scrolling card carousel.
 */
export function ImageCarousel({
  heading     = 'Our Spaces',
  eyebrow     = 'Services Offered',
  description = 'We provide dynamic workspaces, expert mentorship, networking opportunities, and business support services to help startups and entrepreneurs thrive.',
  spaces      = [],
  style       = {},
}) {
  const {
    bg           = '#ffffff',
    textColor    = '#475569',
    headingColor = '#013759',
    accentColor  = '#fbbf24',
  } = style

  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.querySelector('.snap-start')
      const cardWidth = firstCard ? firstCard.offsetWidth : 380
      const gap = 32 // gap-8
      const step = cardWidth + gap
      
      const { scrollLeft } = scrollRef.current
      const scrollTo = direction === 'left' 
        ? scrollLeft - step 
        : scrollLeft + step
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  const defaultSpaces = [
    { title: 'Acceleration Programs',            description: 'Access tailored incubation modules, prototype funding, venture mentorship, and investor matchmaking pipelines to scale your early-stage startup.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Mentorship & Expert Guidance',     description: 'Work shoulder-to-shoulder with veteran entrepreneurs, technology experts, and IP advisors to accelerate product-market fit.', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80' },
    { title: 'Co-working Space & Infrastructure', description: 'Scale in our premium co-working facility, featuring plug-and-play seating, smart meeting rooms, high-end compute systems, and prototyping labs.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Fabrication & Tool Room',          description: 'Build deep prototypes using precision machinery, including CNC CO2 Laser Cutters, Plasma Cutters, and advanced manual prototyping tools.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
    { title: '3D Printing Facility',             description: 'Bring design concepts to life with professional FDM, SLA, and resin 3D printers, supporting over 40 types of specialized engineering filaments.', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
    { title: 'AI & Simulations Grid',            description: 'Leverage state-of-the-art compute hardware on a flexible compute-rental basis for intensive AI model training and engineering simulations.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
    { title: 'Premium Meeting Rooms',            description: 'Host presentations, pitch panels, and board reviews in modern rooms featuring integrated AV gear, screen casting, and high-speed Wi-Fi.', image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80' },
  ]

  const displaySpaces = spaces.length > 0 ? spaces : defaultSpaces

  const renderColoredHeading = (text) => {
    if (text.toLowerCase().includes('spaces')) {
      const parts = text.split(/spaces/i)
      return (
        <>
          {parts[0]}
          <span className="inline-block">
            <span className="text-[#10b981]">S</span>
            <span className="text-[#ec4899]">p</span>
            <span className="text-[#3b82f6]">a</span>
            <span className="text-[#f59e0b]">c</span>
            <span className="text-[#ef4444]">e</span>
            <span className="text-[#8b5cf6]">s</span>
          </span>
          {parts[1]}
        </>
      )
    }
    return text
  }

  return (
    <section className="relative w-full py-24 border-t border-gray-100" style={{ background: bg }}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header row */}
        <div className="text-center mb-12">
          {eyebrow && (
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="mb-6 font-normal text-3xl md:text-5xl tracking-tight" style={{ color: headingColor }}>
              {renderColoredHeading(heading)}
            </h2>
          )}
          {description && (
            <p className="mx-auto max-w-3xl text-sm leading-relaxed mb-8" style={{ color: textColor }}>
              {description}
            </p>
          )}
          
          {/* Scroll Navigation Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => scroll('left')}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#074887]/5 border border-[#074887]/10 text-[#013759] hover:bg-[#074887] hover:text-white hover:border-[#074887] transition-all duration-300 active:scale-95 shadow-md cursor-pointer"
              aria-label="Scroll Left"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#074887]/5 border border-[#074887]/10 text-[#013759] hover:bg-[#074887] hover:text-white hover:border-[#074887] transition-all duration-300 active:scale-95 shadow-md cursor-pointer"
              aria-label="Scroll Right"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory flex-nowrap w-full lg:justify-start -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displaySpaces.map((space, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[360px] md:w-[380px] h-[450px] shrink-0 snap-start relative overflow-hidden rounded-[2rem] group shadow-md hover:shadow-xl border border-gray-100/30 transition-all duration-500 ease-out hover:-translate-y-2 bg-slate-900"
            >
              {/* Background Image */}
              {space.image && (
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              )}

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />

              {/* Top Right Action Arrow Link */}
              <div className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white transition-all duration-300 group-hover:bg-[#fbbf24] group-hover:text-[#013759] group-hover:rotate-45">
                <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>

              {/* Bottom Left Title (Initial State) */}
              <div className="absolute bottom-8 left-8 right-8 z-20 text-left transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-y-4">
                <h3 className="text-2xl font-normal tracking-tight text-white leading-snug">
                  {space.title}
                </h3>
              </div>

              {/* Hover Details Panel */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#013759]/95 to-[#074887]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-30 flex flex-col justify-end p-8 text-left">
                <h3 className="text-2xl font-normal tracking-tight text-white mb-4 leading-snug">
                  {space.title}
                </h3>
                <p className="text-sm font-normal text-white/90 leading-relaxed mb-8">
                  {space.description}
                </p>
                <button className="w-full py-3.5 rounded-xl bg-[#fbbf24] hover:bg-yellow-400 text-[#013759] font-semibold text-sm transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500 delay-100 shadow-lg">
                  Explore Program
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles to completely hide scrollbar on Firefox/Webkit */}
      <style>{`
        div::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
    </section>
  )
}
