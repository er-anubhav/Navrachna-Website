import React, { useState } from 'react'

/**
 * FacilityTabs
 * Matches the original 'Our Facilities' tab-switcher section.
 */
export function FacilityTabs({
  heading     = 'Our Facilities',
  eyebrow     = 'Top-Notch Setup',
  description = 'We provide access to state-of-the-art labs, compute resources, co-working desks, and hardware tooling setups.',
  facilities  = [],
  style       = {},
}) {
  const {
    bg           = '#ffffff',
    textColor    = '#475569',
    headingColor = '#013759',
  } = style

  const defaultFacilities = [
    {
      id: 'fablab',
      title: 'Fabrication & Tool Room',
      subtitle: 'Advanced Prototyping & Fabrication Assets',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      specs: [
        'CNC CO2 Laser Cutter & Engraver',
        'Inverter Plasma Cutter & Welding Station',
        'Precision Woodworking Bench Tools',
        'Bench Grinder, Belt Sander & Pillar Drill Machines',
        'Full inventory of mechanical assembly tools'
      ]
    },
    {
      id: 'printing',
      title: '3D Printing Lab',
      subtitle: 'High-Fidelity SLA & FDM Materials Systems',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      specs: [
        'Commercial FDM 3D Printers (PLA, ABS, PETG, Nylon)',
        'SLA/Resin printers for high-fidelity detailing',
        'In-house washing & UV curing post-processing nodes',
        'Filament dryer & dual-extrusion hardware system',
        'Library of over 40+ engineering polymers'
      ]
    },
    {
      id: 'compute',
      title: 'AI & Simulations Grid',
      subtitle: 'High-Performance AI & Machine Learning Nodes',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
          <rect x="9" y="9" width="6" height="6"/>
          <line x1="9" y1="1" x2="9" y2="4"/>
          <line x1="15" y1="1" x2="15" y2="4"/>
          <line x1="9" y1="20" x2="9" y2="23"/>
          <line x1="15" y1="20" x2="15" y2="23"/>
          <line x1="20" y1="9" x2="23" y2="9"/>
          <line x1="20" y1="14" x2="23" y2="14"/>
          <line x1="1" y1="9" x2="4" y2="9"/>
          <line x1="1" y1="14" x2="4" y2="14"/>
        </svg>
      ),
      specs: [
        'GPU simulation nodes with Tensor cores',
        'Dedicated compute allocation keys for registered projects',
        'Complete suite of engineering simulators (MATLAB, Ansys)',
        'Private developer local environment setup support',
        'Simulations & AI training pipeline configurations'
      ]
    },
    {
      id: 'coworking',
      title: 'Co-Working Facility',
      subtitle: 'Premium Collaboration Desks & Plug-n-Play Stations',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      specs: [
        'High-density open space co-working area',
        'Plug-and-play workstations with high-speed internet',
        'Ergonomic seating layouts and local locker systems',
        'Premium discussion tables & meeting rooms',
        'Complimentary pantry & hot drink nodes access'
      ]
    }
  ]

  const displayFacilities = facilities.length > 0 ? facilities : defaultFacilities
  const [activeFacility, setActiveFacility] = useState(0)
  const spec = displayFacilities[activeFacility] || displayFacilities[0]

  const renderColoredHeading = (text) => {
    if (text.toLowerCase().includes('facilities')) {
      const parts = text.split(/facilities/i)
      return (
        <>
          {parts[0]}
          <span className="inline-block">
            <span className="text-[#10b981]">F</span>
            <span className="text-[#ec4899]">a</span>
            <span className="text-[#3b82f6]">c</span>
            <span className="text-[#f59e0b]">i</span>
            <span className="text-[#ef4444]">l</span>
            <span className="text-[#8b5cf6]">i</span>
            <span className="text-[#06b6d4]">t</span>
            <span className="text-[#3b82f6]">i</span>
            <span className="text-[#ec4899]">e</span>
            <span className="text-[#10b981]">s</span>
          </span>
          {parts[1]}
        </>
      )
    }
    return text
  }

  return (
    <section className="relative w-full py-20 border-t border-gray-100" style={{ background: bg }}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header row with punchy h2 and description stacked */}
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="max-w-2xl text-left">
            {eyebrow && (
              <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase">
                {eyebrow}
              </span>
            )}
            <h2 className="mb-4 font-normal text-3xl md:text-5xl tracking-tight" style={{ color: headingColor }}>
              {renderColoredHeading(heading)}
            </h2>
            {description && (
              <p className="text-gray-650 text-sm md:text-base leading-relaxed text-justify font-normal" style={{ color: textColor }}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Interactive Tab Switcher Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {displayFacilities.map((f, idx) => {
            const isActive = activeFacility === idx
            return (
              <button
                key={idx}
                onClick={() => setActiveFacility(idx)}
                className={`px-5 py-2.5 rounded-full text-xs tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#000000] text-white shadow-md shadow-sky-900/20 scale-[1.02]'
                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-[#013759]'
                }`}
              >
                {f.title}
              </button>
            )
          })}
        </div>

        {/* Active Facility Content Display */}
        {spec && (
          <div className="w-full flex flex-col lg:flex-row gap-0 overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm text-left">
            
            {/* Left: dark identity panel */}
            <div className="bg-[#013759] px-8 py-10 flex flex-col justify-between lg:w-64 shrink-0">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300/70 mb-3 leading-relaxed">
                  {spec.subtitle}
                </p>
                <h3 className="text-2xl font-normal tracking-tight text-white leading-snug">
                  {spec.title}
                </h3>
              </div>
              <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sky-300 border border-white/10">
                {spec.icon}
              </div>
            </div>

            {/* Right: plain spec list with dividers */}
            <div className="flex-1 bg-white px-8 py-6 flex flex-col justify-between">
              <ul className="divide-y divide-slate-100">
                {(spec.specs || []).map((item, i) => {
                  const displayText = typeof item === 'object' && item !== null
                    ? `${item.label}: ${item.value}`
                    : item
                  return (
                    <li key={i} className="flex items-start gap-5 py-4">
                      <span className="mt-0.5 text-[10px] font-bold text-[#013759]/40 w-5 shrink-0 text-right">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {displayText}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 border-t border-slate-100 pt-4">
                <a href="/facilities" className="text-xs font-semibold text-[#013759] hover:underline">
                  Explore all facilities →
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}

