import React from 'react'

/**
 * StatsRow
 * A responsive row of stat tiles. Supports card grid or flat horizontal strip with dividers.
 */
export function StatsRow({
  heading     = '',
  stats       = [],
  style       = {},
  layout      = {},
}) {
  const {
    bg          = '#ffffff',
    textColor   = '#074887',
    accentColor = '#013759',
  } = style

  const defaultStats = [
    { value: '150+', label: 'Startups Incubated' },
    { value: '8',    label: '3D Printers' },
    { value: '40+',  label: 'Compute Workstations' },
    { value: '500+', label: 'Students Mentored' },
  ]

  const displayStats = stats.length > 0 ? stats : defaultStats
  const isFlat = layout.type === 'flat' || !layout.type // default to flat horizontal values strip

  return (
    <section className="relative w-full bg-white py-10 border-y border-[#074887]/10" style={{ background: bg }}>
      {heading && (
        <h2 className="text-2xl md:text-3xl font-normal text-center mb-6" style={{ color: accentColor }}>
          {heading}
        </h2>
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isFlat ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#074887]/10">
            {displayStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2 first:pt-2">
                <span 
                  className="text-4xl md:text-5xl font-normal tracking-tight"
                  style={{ color: accentColor }}
                >
                  {stat.value}
                </span>
                <span 
                  className="text-xs font-normal uppercase tracking-wider mt-2"
                  style={{ color: textColor }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {displayStats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-[2rem] border border-slate-100 bg-white text-center shadow-sm hover:shadow-md transition-shadow"
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
                <span 
                  className="text-sm font-medium mt-1 opacity-80"
                  style={{ color: textColor }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
