import React from 'react'

/**
 * ProgramCards
 * Vertically scrollable cards listing schemes and programs.
 * Stacks on mobile, horizontal layout on md+.
 *
 * content: {
 *   heading, description, ctaLabel, ctaHref,
 *   programs: [{ badge, title, body, tag }]
 * }
 * style: { bg, textColor, headingColor, accentColor, cardBg }
 */
export function ProgramCards({
  heading     = 'Schemes & Programs',
  description = 'Explore our government-backed schemes and programs designed to accelerate your entrepreneurial journey.',
  ctaLabel    = 'View All Programs',
  ctaHref     = '#',
  programs    = [],
  style       = {},
}) {
  const {
    bg           = '#013759',
    textColor    = '#cbd5e1',
    headingColor = '#ffffff',
    accentColor  = '#fbbf24',
    cardBg       = 'rgba(255,255,255,0.07)',
  } = style

  const defaultPrograms = [
    { badge: 'MSME', title: 'Startup India Seed Fund', body: 'Up to ₹20L seed funding for early-stage startups with innovative ideas.', tag: 'Funding' },
    { badge: 'DST',  title: 'NIDHI PRAYAS',            body: 'Support for proof-of-concept development for deep-tech innovations.', tag: 'R&D' },
    { badge: 'SIDBI',title: 'SMILE Scheme',             body: 'Soft loans and marketing support for small and micro enterprises.', tag: 'Loan' },
    { badge: 'NEN',  title: 'E-Cell Mentorship',        body: 'Dedicated mentorship, workshops, and hackathons via the E-Cell network.', tag: 'Mentorship' },
    { badge: 'UP Govt', title: 'UP StartUp Fund',       body: 'State government initiative offering grants and subsidies for UP-based startups.', tag: 'Grant' },
  ]

  const displayPrograms = programs.length > 0 ? programs : defaultPrograms

  return (
    <section className="w-full py-12 md:py-16 px-4" style={{ background: bg }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-14">
        {/* Left column — info */}
        <div className="md:w-1/3 flex flex-col justify-center gap-4 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: headingColor }}>
            {heading}
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: textColor }}>
            {description}
          </p>
          <a
            href={ctaHref}
            className="self-center md:self-start inline-block mt-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105 active:scale-95"
            style={{ background: accentColor, color: '#013759' }}
          >
            {ctaLabel}
          </a>
        </div>

        {/* Right column — scrollable cards */}
        <div className="md:w-2/3 flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-1">
          {displayPrograms.map((prog, i) => (
            <article
              key={i}
              className="flex gap-4 rounded-2xl p-5"
              style={{ background: cardBg }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold text-center leading-tight"
                style={{ background: accentColor + '22', color: accentColor }}
              >
                {prog.badge}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm md:text-base" style={{ color: headingColor }}>
                    {prog.title}
                  </h3>
                  {prog.tag && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: accentColor + '22', color: accentColor }}
                    >
                      {prog.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                  {prog.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
