import React from 'react'

/**
 * StatsRow
 * A responsive row of stat tiles — icon + value + label.
 *
 * content: { heading, stats: [{ icon, value, label }] }
 * style:   { bg, textColor, accentColor, cardBg }
 */
export function StatsRow({
  heading     = '',
  stats       = [],
  style       = {},
}) {
  const {
    bg          = '#f8fafc',
    textColor   = '#013759',
    accentColor = '#fbbf24',
    cardBg      = '#ffffff',
  } = style

  const defaultStats = [
    { value: '150+', label: 'Startups Incubated' },
    { value: '12+',  label: 'Industry Partners' },
    { value: '500+', label: 'Students Mentored' },
    { value: '8',    label: 'Labs & Facilities' },
  ]

  const displayStats = stats.length > 0 ? stats : defaultStats

  return (
    <section className="w-full py-12 md:py-16 px-4" style={{ background: bg }}>
      {heading && (
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: textColor }}>
          {heading}
        </h2>
      )}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {displayStats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-sm text-center"
            style={{ background: cardBg }}
          >
            {stat.icon && (
              <span className="text-3xl mb-2" aria-hidden="true">{stat.icon}</span>
            )}
            <span
              className="text-3xl md:text-4xl font-extrabold leading-none"
              style={{ color: accentColor }}
            >
              {stat.value}
            </span>
            <span className="text-sm md:text-base font-medium mt-1 opacity-80" style={{ color: textColor }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
