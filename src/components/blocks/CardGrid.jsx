import React from 'react'

/**
 * CardGrid
 * Responsive grid of icon + title + description cards.
 * Matches original 'Why Choose Us' design with color-decorated text and inner shadow icon containers.
 */
export function CardGrid({
  heading     = 'Why Choose Us',
  subheading  = 'Discover the exclusive benefits, technical facilities, and robust investment opportunities that make Navrachna Foundation the elite partner.',
  eyebrow     = 'FOUNDATION ADVANTAGE',
  cards       = [],
  style       = {},
  layout      = {},
}) {
  const {
    bg           = '#f8fafc',
    textColor    = '#64748b',
    cardBg       = '#ffffff',
    accentColor  = '#fbbf24',
    headingColor = '#013759',
  } = style

  const cols = layout?.columns ?? { mobile: 1, tablet: 2, desktop: 3 }

  const colClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }

  const gridClass = [
    colClass[cols.mobile]  || 'grid-cols-1',
    `md:${colClass[cols.tablet]  || 'grid-cols-2'}`,
    `lg:${colClass[cols.desktop] || 'grid-cols-3'}`,
  ].join(' ')

  const defaultCards = [
    { icon: '💡', title: 'Expert Mentorship', body: 'One-on-one guidance from 30+ industry veterans, IIT/IIM alumni, and successful entrepreneurs.' },
    { icon: '🔬', title: 'World-Class Labs', body: 'Access to electronics, 3D printing, fabrication, and GPU compute labs.' },
    { icon: '📶', title: 'High-Speed Internet', body: '1 Gbps dedicated fibre with 99.9% SLA uptime for uninterrupted research.' },
    { icon: '🤝', title: 'Investor Network', body: 'Direct introductions to angel investors, VC funds, and government grant officers.' },
    { icon: '🏛️', title: 'Legal & IP Support', body: 'Patent filing, IP strategy, legal counsel, and trademark guidance.' },
    { icon: '🌐', title: 'Global Exposure', body: 'Represent at national and international startup expos, competitions, and Demo Days.' },
  ]

  const displayCards = cards.length > 0 ? cards : defaultCards

  // Helper to colorize "Choose" or dynamic colored titles
  const renderColoredHeading = (text) => {
    if (text.toLowerCase().includes('choose')) {
      const parts = text.split(/choose/i)
      return (
        <>
          {parts[0]}
          <span className="inline-block">
            <span className="text-[#10b981]">C</span>
            <span className="text-[#ec4899]">h</span>
            <span className="text-[#3b82f6]">o</span>
            <span className="text-[#f59e0b]">o</span>
            <span className="text-[#ef4444]">s</span>
            <span className="text-[#8b5cf6]">e</span>
          </span>
          {parts[1]}
        </>
      )
    }
    return text
  }

  return (
    <section className="w-full py-24 border-t border-slate-100/80" style={{ background: bg }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {eyebrow && (
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 
              className="mb-4 font-normal text-3xl md:text-5xl font-normal tracking-tight sm:text-5xl"
              style={{ color: headingColor }}
            >
              {renderColoredHeading(heading)}
            </h2>
          )}
          {subheading && (
            <p className="text-sm font-normal max-w-2xl mx-auto" style={{ color: textColor }}>
              {subheading}
            </p>
          )}
        </div>

        <div className={`grid w-full ${gridClass} gap-6`}>
          {displayCards.map((card, i) => (
            <div
              key={i}
              className="group relative rounded-[2rem] border border-slate-100 p-6 sm:p-8 text-left shadow-sm transition-all duration-300 hover:border-slate-205 hover:shadow-md flex flex-col items-start"
              style={{ background: cardBg }}
            >
              {card.icon && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/5 text-[#013759] shadow-inner mb-6 transition-all duration-300 group-hover:bg-[#013759]/5">
                  <span className="text-xl">{card.icon}</span>
                </div>
              )}
              <h3 className="mb-2 text-lg font-normal tracking-tight transition-colors duration-300 group-hover:text-black" style={{ color: headingColor }}>
                {card.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: textColor }}>
                {card.body}
              </p>
              {card.tag && (
                <span
                  className="self-start text-[10px] font-semibold px-2.5 py-0.5 rounded-full mt-4"
                  style={{ background: accentColor + '22', color: headingColor }}
                >
                  {card.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
