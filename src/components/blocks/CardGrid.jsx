import React from 'react'

/**
 * CardGrid
 * Responsive grid of icon + title + description cards.
 * Columns are configurable per breakpoint via layout.columns.
 *
 * content: { heading, subheading, cards: [{ icon, title, body, tag }] }
 * style:   { bg, textColor, cardBg, accentColor, headingColor }
 * layout:  { columns: { mobile, tablet, desktop } }
 */
export function CardGrid({
  heading     = '',
  subheading  = '',
  cards       = [],
  style       = {},
  layout      = {},
}) {
  const {
    bg           = '#f8fafc',
    textColor    = '#1e293b',
    cardBg       = '#ffffff',
    accentColor  = '#fbbf24',
    headingColor = '#013759',
  } = style

  const cols = layout?.columns ?? { mobile: 1, tablet: 2, desktop: 3 }

  // Map column count → Tailwind grid class
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
    { icon: '💡', title: 'Expert Mentorship', body: 'One-on-one guidance from seasoned entrepreneurs and industry experts.' },
    { icon: '🔬', title: 'State-of-the-Art Labs', body: 'Access to electronics, 3D printing, fabrication, and compute labs.' },
    { icon: '📶', title: 'High-Speed Internet', body: 'Dedicated fibre connectivity for uninterrupted research and work.' },
    { icon: '🤝', title: 'Investor Network', body: 'Connect with angel investors, VCs, and government funding schemes.' },
    { icon: '🏛️', title: 'Legal & IP Support', body: 'Patent filing assistance, legal counsel, and IP strategy guidance.' },
    { icon: '🌐', title: 'Global Exposure', body: 'Participate in national and international startup events and competitions.' },
  ]

  const displayCards = cards.length > 0 ? cards : defaultCards

  return (
    <section className="w-full py-12 md:py-16 px-4" style={{ background: bg }}>
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: headingColor }}>
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-center text-base md:text-lg mb-10 opacity-70 max-w-2xl mx-auto" style={{ color: textColor }}>
            {subheading}
          </p>
        )}
        <div className={`grid ${gridClass} gap-5 md:gap-6`}>
          {displayCards.map((card, i) => (
            <article
              key={i}
              className="group rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-3"
              style={{ background: cardBg }}
            >
              {card.icon && (
                <span className="text-3xl" aria-hidden="true">{card.icon}</span>
              )}
              <h3 className="text-base md:text-lg font-bold" style={{ color: headingColor }}>
                {card.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed opacity-80" style={{ color: textColor }}>
                {card.body}
              </p>
              {card.tag && (
                <span
                  className="self-start text-xs font-semibold px-3 py-1 rounded-full mt-auto"
                  style={{ background: accentColor + '33', color: headingColor }}
                >
                  {card.tag}
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
