import React, { useState } from 'react'

/**
 * FacilityTabs
 * Horizontally scrollable tab switcher with detail panel below.
 * Tabs scroll horizontally on mobile, grid on lg+.
 *
 * content: {
 *   heading,
 *   discoverHref,
 *   facilities: [{
 *     id, label,
 *     identity: { name, tagline, icon },
 *     specs: [{ label, value }]
 *   }]
 * }
 * style: { bg, textColor, headingColor, accentColor, darkPanelBg }
 */
export function FacilityTabs({
  heading      = 'Our Facilities',
  discoverHref = '#',
  facilities   = [],
  style        = {},
}) {
  const {
    bg           = '#ffffff',
    textColor    = '#1e293b',
    headingColor = '#013759',
    accentColor  = '#074887',
    darkPanelBg  = '#013759',
  } = style

  const defaultFacilities = [
    {
      id: 'electronics', label: 'Electronics Lab',
      identity: { name: 'Electronics Lab', tagline: 'Circuit design & embedded systems', icon: '🔌' },
      specs: [
        { label: 'Stations', value: '20 workstations' },
        { label: 'Equipment', value: 'Oscilloscopes, DMMs, signal generators' },
        { label: 'PCB',      value: 'In-house PCB etching & soldering' },
        { label: 'Hours',    value: 'Mon–Sat, 9AM–8PM' },
      ],
    },
    {
      id: '3dprinting', label: '3D Printing Lab',
      identity: { name: '3D Printing Lab', tagline: 'Rapid prototyping at scale', icon: '🖨️' },
      specs: [
        { label: 'Printers', value: '8 FDM + 2 Resin printers' },
        { label: 'Materials', value: 'PLA, PETG, ABS, Resin' },
        { label: 'Build Vol', value: 'Up to 300×300×400mm' },
        { label: 'Turnaround', value: 'Same-day for small parts' },
      ],
    },
    {
      id: 'coworking', label: 'Co-Working',
      identity: { name: 'Co-Working Space', tagline: 'Collaborate, focus, grow', icon: '🏢' },
      specs: [
        { label: 'Seats',    value: '80 hot desks + 20 dedicated' },
        { label: 'Internet', value: '1 Gbps fibre, 99.9% uptime' },
        { label: 'Meeting',  value: '4 conference rooms' },
        { label: 'Access',   value: '24×7 for registered startups' },
      ],
    },
    {
      id: 'compute', label: 'Compute Lab',
      identity: { name: 'Compute Lab', tagline: 'High-performance AI & ML infrastructure', icon: '🖥️' },
      specs: [
        { label: 'Workstations', value: '15 high-end PCs' },
        { label: 'GPU',          value: '4× NVIDIA A100 servers' },
        { label: 'Storage',      value: '1PB NAS cluster' },
        { label: 'Software',     value: 'MATLAB, Ansys, CUDA, PyTorch' },
      ],
    },
  ]

  const displayFacilities = facilities.length > 0 ? facilities : defaultFacilities
  const [activeId, setActiveId] = useState(displayFacilities[0]?.id)
  const active = displayFacilities.find(f => f.id === activeId) || displayFacilities[0]

  return (
    <section className="w-full py-12 md:py-16 px-4" style={{ background: bg }}>
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: headingColor }}>
            {heading}
          </h2>
          <a
            href={discoverHref}
            className="text-sm font-semibold px-5 py-2 rounded-full border-2 transition-colors hover:text-white"
            style={{ borderColor: accentColor, color: accentColor }}
            onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = accentColor }}
          >
            Discover More →
          </a>
        </div>

        {/* Tab bar — horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none' }}>
          {displayFacilities.map(f => {
            const isActive = f.id === activeId
            return (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className="shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: isActive ? accentColor : 'transparent',
                  color:      isActive ? '#ffffff' : headingColor,
                  border:     `2px solid ${isActive ? accentColor : '#e2e8f0'}`,
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Detail panel — stacked on mobile, side-by-side on lg+ */}
        {active && (
          <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-md min-h-[200px]">
            {/* Left dark identity panel */}
            <div
              className="lg:w-2/5 p-8 flex flex-col justify-center gap-3"
              style={{ background: darkPanelBg }}
            >
              <span className="text-5xl" aria-hidden="true">{active.identity?.icon}</span>
              <h3 className="text-xl md:text-2xl font-bold text-white">{active.identity?.name}</h3>
              <p className="text-sm text-slate-300">{active.identity?.tagline}</p>
            </div>

            {/* Right spec list */}
            <div
              className="lg:w-3/5 p-8 flex flex-col justify-center divide-y"
              style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}
            >
              {(active.specs || []).map((spec, i) => (
                <div key={i} className="flex justify-between py-3 text-sm md:text-base">
                  <span className="font-semibold" style={{ color: headingColor }}>{spec.label}</span>
                  <span className="text-right" style={{ color: textColor }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
