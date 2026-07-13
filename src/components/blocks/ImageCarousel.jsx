import React, { useRef, useState } from 'react'

/**
 * ImageCarousel
 * Horizontally scrollable card carousel with hover reveal.
 * Single card on mobile, multiple on md+.
 *
 * content: { heading, spaces: [{ image, title, description, href }] }
 * style:   { bg, textColor, headingColor, accentColor }
 */
export function ImageCarousel({
  heading = 'Our Spaces',
  spaces  = [],
  style   = {},
}) {
  const {
    bg           = '#f8fafc',
    textColor    = '#ffffff',
    headingColor = '#013759',
    accentColor  = '#fbbf24',
  } = style

  const scrollRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  const defaultSpaces = [
    { title: 'Electronics Lab',    description: 'PCB design, soldering stations, oscilloscopes, and component library.' },
    { title: '3D Printing Lab',    description: 'FDM and resin 3D printers for rapid prototyping.' },
    { title: 'Fabrication Lab',    description: 'Laser cutters, CNC machines, and hand tools.' },
    { title: 'Co-Working Space',   description: 'Hot desks and dedicated desks for focused work.' },
    { title: 'Compute Lab',        description: 'High-performance workstations and GPU servers.' },
    { title: 'Conference Room',    description: 'Fully equipped meeting rooms with AV systems.' },
  ]

  const displaySpaces = spaces.length > 0 ? spaces : defaultSpaces

  return (
    <section className="w-full py-12 md:py-16" style={{ background: bg }}>
      {/* Header row */}
      <div className="px-4 max-w-6xl mx-auto flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: headingColor }}>
          {heading}
        </h2>
        {/* Scroll controls */}
        <div className="flex gap-2">
          {['←', '→'].map((arrow, idx) => (
            <button
              key={idx}
              onClick={() => scroll(idx === 0 ? -1 : 1)}
              aria-label={idx === 0 ? 'Scroll left' : 'Scroll right'}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-colors hover:text-white"
              style={{
                borderColor: headingColor,
                color: headingColor,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = headingColor }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {displaySpaces.map((space, i) => (
          <article
            key={i}
            className="relative shrink-0 w-72 md:w-80 h-64 md:h-72 rounded-2xl overflow-hidden cursor-pointer snap-start"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              background: space.image ? undefined : `hsl(${210 + i * 20}, 50%, 25%)`,
            }}
          >
            {/* Background image */}
            {space.image && (
              <img src={space.image} alt={space.title} className="absolute inset-0 w-full h-full object-cover" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

            {/* Arrow link (top-right) */}
            {space.href && (
              <a
                href={space.href}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-transform hover:scale-110"
                style={{ background: accentColor, color: '#013759' }}
                aria-label={`Go to ${space.title}`}
              >
                ↗
              </a>
            )}

            {/* Title — always visible */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 z-10 transition-all duration-300"
              style={{ transform: hoveredIndex === i ? 'translateY(-100%)' : 'translateY(0)' }}
            >
              <h3 className="font-bold text-base" style={{ color: textColor }}>{space.title}</h3>
            </div>

            {/* Hover details — slides up */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 z-10 transition-all duration-300"
              style={{
                transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(100%)',
                opacity:   hoveredIndex === i ? 1 : 0,
              }}
            >
              <h3 className="font-bold text-base mb-1" style={{ color: textColor }}>{space.title}</h3>
              <p className="text-xs leading-relaxed opacity-90" style={{ color: textColor }}>{space.description}</p>
              {space.href && (
                <a
                  href={space.href}
                  className="inline-block mt-3 text-xs font-semibold px-4 py-1.5 rounded-full"
                  style={{ background: accentColor, color: '#013759' }}
                >
                  Explore →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
