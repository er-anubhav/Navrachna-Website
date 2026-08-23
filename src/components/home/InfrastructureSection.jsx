import React, { useState, useEffect } from 'react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { FACILITIES_SPECS } from '../../data/landingData'
import { getFacilities } from '../../services/publicService'

export function InfrastructureSection() {
  const [activeFacility, setActiveFacility] = useState(-1)
  const [activeHubNode, setActiveHubNode] = useState(null)
  const [facilitySpecsList, setFacilitySpecsList] = useState(FACILITIES_SPECS)

  useEffect(() => {
    async function fetchLiveFacilities() {
      const { data } = await getFacilities()
      if (data && data.length > 0) {
        const isSoftwareFacility = (f) => {
          const text = `${f.title || ''} ${f.summary || ''} ${f.description || ''}`.toLowerCase()
          return (
            text.includes('software') ||
            text.includes('suite') ||
            text.includes('eda') ||
            text.includes('scada') ||
            text.includes('labview') ||
            text.includes('matlab') ||
            text.includes('simulink') ||
            text.includes('cadence') ||
            text.includes('orcad') ||
            text.includes('intel unnati')
          )
        }

        const filteredLive = data.filter(f => !isSoftwareFacility(f))
        
        if (filteredLive.length > 0) {
          const formattedLive = filteredLive.map(f => ({
            title: f.title,
            specs: Array.isArray(f.specs_summary) 
              ? f.specs_summary 
              : typeof f.specs_summary === 'string'
                ? f.specs_summary.split(',').map(s => s.trim())
                : [f.summary || f.description || 'Advanced prototyping lab infrastructure']
          }))
          const combined = formattedLive.length >= 4 
            ? formattedLive 
            : [...formattedLive, ...FACILITIES_SPECS.slice(formattedLive.length)]
          setFacilitySpecsList(combined)
          return
        }
      }
      setFacilitySpecsList(FACILITIES_SPECS)
    }
    fetchLiveFacilities()
  }, [])

  const halfIndex = Math.ceil(facilitySpecsList.length / 2)
  const leftSpecs = facilitySpecsList.slice(0, halfIndex)
  const rightSpecs = facilitySpecsList.slice(halfIndex)

  return (
    <>
      {/* Our Facilities Section */}
      <section className="relative w-full bg-white py-10 lg:py-24 border-b border-slate-200/80">
        <ScrollReveal>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12 pb-6 border-b border-slate-100">
            <div className="max-w-3xl text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#266d9a] tracking-tight leading-[1.15] mb-3">
                Advanced Incubation & Prototyping Facilities
              </h2>
              <p className="text-slate-700 text-xs sm:text-base leading-relaxed font-normal">
                We provide a well-equipped, engineering-grade workspace designed to accelerate hardware prototyping, deep tech computing, and startup scaling. Explore detailed specifications across all technical domains.
              </p>
            </div>
            <a href="/facilities" className="shrink-0 rounded-xl bg-black px-6 py-3 font-normal text-xs sm:text-sm text-white! shadow-md hover:bg-slate-800 transition-all duration-300 active:scale-95 inline-block cursor-pointer" style={{ color: '#ffffff' }}>
              <span className="text-white!" style={{ color: '#ffffff' }}>Book a Lab Tour →</span>
            </a>
          </div>

          {/* Balanced 2-Column Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 w-full items-start">
            {/* Left Column */}
            <div className="w-full space-y-3">
              {leftSpecs.map((spec, idx) => {
                const isOpen = activeFacility === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
                    <button
                      onClick={() => setActiveFacility(isOpen ? -1 : idx)}
                      className="w-full py-3 px-4 sm:py-3.5 sm:px-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5">
                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-[#013759] text-white flex items-center justify-center shrink-0 shadow-xs">
                          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-normal text-[#013759] leading-tight">
                            {spec.title}
                          </h3>
                          <span className="text-[11px] text-gray-500 font-normal">
                            {spec.specs.length} key specifications
                          </span>
                        </div>
                      </div>
                      <div className={`h-7 w-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-3.5 pt-2 border-t border-slate-100 bg-white">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-0.5">
                          {spec.specs.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 py-2 px-3 rounded-lg bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-normal leading-snug">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#074887] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="w-full space-y-3 pt-0">
              {rightSpecs.map((spec, offsetIdx) => {
                const idx = offsetIdx + halfIndex;
                const isOpen = activeFacility === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
                    <button
                      onClick={() => setActiveFacility(isOpen ? -1 : idx)}
                      className="w-full py-3 px-4 sm:py-3.5 sm:px-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5">
                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-[#013759] text-white flex items-center justify-center shrink-0 shadow-xs">
                          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-normal text-[#013759] leading-tight">
                            {spec.title}
                          </h3>
                          <span className="text-[11px] text-gray-500 font-normal">
                            {spec.specs.length} key specifications
                          </span>
                        </div>
                      </div>
                      <div className={`h-7 w-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-3.5 pt-2 border-t border-slate-100 bg-white">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-0.5">
                          {spec.specs.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 py-2 px-3 rounded-lg bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-normal leading-snug">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#074887] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col gap-6 w-full">
            <div className="w-full space-y-3">
              {facilitySpecsList.map((spec, idx) => {
                const isOpen = activeFacility === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
                    <button
                      onClick={() => setActiveFacility(isOpen ? -1 : idx)}
                      className="w-full py-3 px-4 sm:py-3.5 sm:px-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5">
                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-[#013759] text-white flex items-center justify-center shrink-0 shadow-xs">
                          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-normal text-[#013759] leading-tight">
                            {spec.title}
                          </h3>
                          <span className="text-[11px] text-gray-500 font-normal">
                            {spec.specs.length} key specifications
                          </span>
                        </div>
                      </div>
                      <div className={`h-7 w-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-3.5 pt-2 border-t border-slate-100 bg-white">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-0.5">
                          {spec.specs.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 py-2 px-3 rounded-lg bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-normal leading-snug">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#074887] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-white py-10 md:py-16 border-t border-slate-100/80">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Radial Graph Node Layout (Desktop >= 1024px) */}
          <div className="hidden lg:flex flex-col items-center relative py-1 max-w-6xl mx-auto select-none">
            <div className="relative w-240 h-182.5 flex items-center justify-center">
              <div className={`absolute w-170 h-170 rounded-full border transition-all duration-500 pointer-events-none ${activeHubNode ? 'border-sky-300/60 scale-105' : 'border-slate-200/80'}`} />
              <div className={`absolute w-120 h-120 rounded-full border transition-all duration-500 bg-linear-to-br from-slate-50/60 via-white/40 to-slate-100/30 shadow-inner pointer-events-none ${activeHubNode ? 'border-sky-200/80 scale-105' : 'border-slate-200/60'}`} />

              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 960 730">
                <line x1="480" y1="360" x2="480" y2="150" stroke="#10b981" strokeWidth={activeHubNode === 1 || activeHubNode === 'center' ? '4' : '2.5'} strokeDasharray={activeHubNode === 1 || activeHubNode === 'center' ? 'none' : '6 4'} opacity={activeHubNode && activeHubNode !== 1 && activeHubNode !== 'center' ? 0.3 : 1} className="transition-all duration-300" />
                <line x1="480" y1="360" x2="750" y2="490" stroke="#013759" strokeWidth={activeHubNode === 2 || activeHubNode === 'center' ? '4' : '2.5'} strokeDasharray={activeHubNode === 2 || activeHubNode === 'center' ? 'none' : '6 4'} opacity={activeHubNode && activeHubNode !== 2 && activeHubNode !== 'center' ? 0.3 : 1} className="transition-all duration-300" />
                <line x1="480" y1="360" x2="210" y2="490" stroke="#d97706" strokeWidth={activeHubNode === 3 || activeHubNode === 'center' ? '4' : '2.5'} strokeDasharray={activeHubNode === 3 || activeHubNode === 'center' ? 'none' : '6 4'} opacity={activeHubNode && activeHubNode !== 3 && activeHubNode !== 'center' ? 0.3 : 1} className="transition-all duration-300" />

                {[[130,45], [320,35], [640,35], [830,45], [175,145], [765,145]].map(([x, y], idx) => (
                  <line key={`h1-${idx}`} x1="480" y1="150" x2={x} y2={y} stroke="#10b981" strokeWidth={activeHubNode === 1 || activeHubNode === 'center' ? '2.5' : '1.5'} strokeDasharray={activeHubNode === 1 || activeHubNode === 'center' ? 'none' : '4 3'} opacity={activeHubNode === 1 || activeHubNode === 'center' ? 1 : activeHubNode ? 0.2 : 0.6} className="transition-all duration-300" />
                ))}

                {[[840,375], [720,285], [630,590], [840,590], [740,670]].map(([x, y], idx) => (
                  <line key={`h2-${idx}`} x1="750" y1="490" x2={x} y2={y} stroke="#013759" strokeWidth={activeHubNode === 2 || activeHubNode === 'center' ? '2.5' : '1.5'} strokeDasharray={activeHubNode === 2 || activeHubNode === 'center' ? 'none' : '4 3'} opacity={activeHubNode === 2 || activeHubNode === 'center' ? 1 : activeHubNode ? 0.2 : 0.6} className="transition-all duration-300" />
                ))}

                {[[120,375], [240,285], [120,590], [330,590], [220,670]].map(([x, y], idx) => (
                  <line key={`h3-${idx}`} x1="210" y1="490" x2={x} y2={y} stroke="#d97706" strokeWidth={activeHubNode === 3 || activeHubNode === 'center' ? '2.5' : '1.5'} strokeDasharray={activeHubNode === 3 || activeHubNode === 'center' ? 'none' : '4 3'} opacity={activeHubNode === 3 || activeHubNode === 'center' ? 1 : activeHubNode ? 0.2 : 0.6} className="transition-all duration-300" />
                ))}
              </svg>

              <button 
                onMouseEnter={() => setActiveHubNode('center')}
                onMouseLeave={() => setActiveHubNode(null)}
                onClick={() => setActiveHubNode(activeHubNode === 'center' ? null : 'center')}
                className={`z-30 w-56 h-56 rounded-full bg-white border-4 border-slate-100 shadow-2xl flex flex-col items-center justify-center p-5 text-center cursor-pointer transition-all duration-300 relative ${activeHubNode === 'center' ? 'scale-110 shadow-sky-300/60 ring-8 ring-sky-100' : 'hover:scale-105'}`}
              >
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#266d9a] tracking-tight leading-tight">
                  Why Choose Us
                </h3>
              </button>

              <button 
                onMouseEnter={() => setActiveHubNode(1)}
                onMouseLeave={() => setActiveHubNode(null)}
                onClick={() => setActiveHubNode(activeHubNode === 1 ? null : 1)}
                className={`absolute top-31.25 left-1/2 -translate-x-1/2 z-20 px-7 py-3 rounded-full text-white shadow-lg flex items-center font-bold text-base sm:text-lg cursor-pointer transition-all duration-300 ${activeHubNode === 1 || activeHubNode === 'center' ? 'scale-115 bg-emerald-700 shadow-emerald-500/40 ring-4 ring-emerald-300' : 'bg-emerald-600 hover:scale-105 hover:bg-emerald-700'}`}
              >
                <span>MENTORSHIP</span>
              </button>

              {[
                { title: 'Business Mentorship', pos: 'top-[25px] left-[20px]' },
                { title: 'Technical Mentorship', pos: 'top-[15px] left-[230px]' },
                { title: 'Legal Assistance', pos: 'top-[15px] right-[230px]' },
                { title: 'Pitch Preparation', pos: 'top-[25px] right-[20px]' },
                { title: 'Patent & IP Support', pos: 'top-[125px] left-[80px]' },
                { title: 'Event Participation Assistance', pos: 'top-[125px] right-[50px]' }
              ].map((node, idx) => {
                const isActive = activeHubNode === 1 || activeHubNode === 'center';
                return (
                  <div 
                    key={`m-${idx}`}
                    onMouseEnter={() => setActiveHubNode(1)}
                    onMouseLeave={() => setActiveHubNode(null)}
                    className={`absolute ${node.pos} z-20 px-4.5 py-2.5 rounded-2xl text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'scale-110 bg-emerald-500 text-white font-semibold border-2 border-emerald-600 shadow-xl shadow-emerald-200/60 -translate-y-1' 
                        : activeHubNode 
                          ? 'opacity-30 scale-95 bg-white border border-slate-200 text-slate-400' 
                          : 'bg-white border border-emerald-200 text-slate-700 shadow-md hover:scale-105 hover:border-emerald-400 hover:shadow-lg'
                    }`}
                  >
                    {node.title}
                  </div>
                );
              })}

              <button 
                onMouseEnter={() => setActiveHubNode(2)}
                onMouseLeave={() => setActiveHubNode(null)}
                onClick={() => setActiveHubNode(activeHubNode === 2 ? null : 2)}
                className={`absolute top-117.5 right-12 z-20 px-7 py-3 rounded-full text-white shadow-lg flex items-center font-bold text-base sm:text-lg cursor-pointer transition-all duration-300 ${activeHubNode === 2 || activeHubNode === 'center' ? 'scale-115 bg-[#01253d] shadow-sky-500/40 ring-4 ring-sky-300' : 'bg-[#013759] hover:scale-105 hover:bg-[#01253d]'}`}
              >
                <span>INFRASTRUCTURE SUPPORT</span>
              </button>

              {[
                { title: 'Co-Working Space', pos: 'top-[355px] right-[10px]' },
                { title: 'Dedicated Cabin Area', pos: 'top-[265px] right-[130px]' },
                { title: 'Meeting Rooms', pos: 'top-[570px] right-[250px]' },
                { title: 'Fabrication Lab', pos: 'top-[570px] right-[20px]' },
                { title: 'High End Precision Equipment & Grants', pos: 'top-[655px] right-[80px]' }
              ].map((node, idx) => {
                const isActive = activeHubNode === 2 || activeHubNode === 'center';
                return (
                  <div 
                    key={`i-${idx}`}
                    onMouseEnter={() => setActiveHubNode(2)}
                    onMouseLeave={() => setActiveHubNode(null)}
                    className={`absolute ${node.pos} z-20 px-4.5 py-2.5 rounded-2xl text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'scale-110 bg-[#013759] text-white font-semibold border-2 border-slate-700 shadow-xl shadow-sky-200/60 translate-x-1' 
                        : activeHubNode 
                          ? 'opacity-30 scale-95 bg-white border border-slate-200 text-slate-400' 
                          : 'bg-white border border-sky-200 text-slate-700 shadow-md hover:scale-105 hover:border-sky-400 hover:shadow-lg'
                    }`}
                  >
                    {node.title}
                  </div>
                );
              })}

              <button 
                onMouseEnter={() => setActiveHubNode(3)}
                onMouseLeave={() => setActiveHubNode(null)}
                onClick={() => setActiveHubNode(activeHubNode === 3 ? null : 3)}
                className={`absolute top-117.5 left-12 z-20 px-7 py-3 rounded-full text-white shadow-lg flex items-center font-bold text-base sm:text-lg cursor-pointer transition-all duration-300 ${activeHubNode === 3 || activeHubNode === 'center' ? 'scale-115 bg-amber-700 shadow-amber-500/40 ring-4 ring-amber-300' : 'bg-amber-600 hover:scale-105 hover:bg-amber-700'}`}
              >
                <span>COMPREHENSIVE NETWORK</span>
              </button>

              {[
                { title: 'Government Backed Schemes', pos: 'top-[355px] left-[10px]' },
                { title: 'Seasoned Mentors Network', pos: 'top-[265px] left-[130px]' },
                { title: 'Quality Investor Network', pos: 'top-[570px] left-[20px]' },
                { title: 'Corporate Networks', pos: 'top-[570px] left-[250px]' },
                { title: 'Interns, RND & Digital Support', pos: 'top-[655px] left-[80px]' }
              ].map((node, idx) => {
                const isActive = activeHubNode === 3 || activeHubNode === 'center';
                return (
                  <div 
                    key={`n-${idx}`}
                    onMouseEnter={() => setActiveHubNode(3)}
                    onMouseLeave={() => setActiveHubNode(null)}
                    className={`absolute ${node.pos} z-20 px-4.5 py-2.5 rounded-2xl text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'scale-110 bg-amber-600 text-white font-semibold border-2 border-amber-700 shadow-xl shadow-amber-200/60 -translate-x-1' 
                        : activeHubNode 
                          ? 'opacity-30 scale-95 bg-white border border-slate-200 text-slate-400' 
                          : 'bg-white border border-amber-200 text-slate-700 shadow-md hover:scale-105 hover:border-amber-400 hover:shadow-lg'
                    }`}
                  >
                    {node.title}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile 3-Pillars Card Grid */}
          <div className="lg:hidden flex flex-col gap-6">
            <div className="text-left md:text-center mb-2">
              <h2 className="mb-2 font-normal text-2xl sm:text-3xl tracking-tight text-[#266d9a]">
                Why Choose Us
              </h2>
              <p className="text-xs sm:text-sm font-normal text-gray-500 max-w-2xl mx-0 md:mx-auto leading-relaxed">
                Our comprehensive 3-pillar support framework designed to nurture early-stage startups from concept validation to market scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden text-left">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-2xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-600/20 shadow-xs">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 22h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-normal text-[#013759] tracking-tight leading-tight">
                      Mentorship Support
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-normal">
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" /><span>Business Mentorship & Strategy</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" /><span>Technical & Domain Engineering Mentorship</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" /><span>Legal Assistance & Regulatory Guidance</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" /><span>Pitch Preparation & Investor Readiness</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" /><span>Patent & Intellectual Property (IP) Support</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" /><span>National & International Event Assistance</span></li>
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden text-left">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-50 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-2xl bg-[#013759]/10 text-[#013759] flex items-center justify-center shrink-0 border border-[#013759]/20 shadow-xs">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-normal text-[#013759] tracking-tight leading-tight">
                      Infrastructure Support
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-normal">
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" /><span>Plug-and-Play Co-Working Desks</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" /><span>Dedicated Founder Cabins</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" /><span>High-Tech Meeting & Conference Rooms</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" /><span>Advanced Mechanical & Electronics Fab Lab</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" /><span>High-End Precision Machinery & Compute</span></li>
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden text-left">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-50 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-2xl bg-amber-600/10 text-amber-700 flex items-center justify-center shrink-0 border border-amber-600/20 shadow-xs">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-normal text-[#013759] tracking-tight leading-tight">
                      Comprehensive Network
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-normal">
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" /><span>Access to Government Backed Schemes & Grants</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" /><span>Seasoned Industry Mentors & Academic Experts</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" /><span>Quality Investor & VC Connections</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" /><span>Corporate Partner Networks</span></li>
                    <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" /><span>Student Interns, R&D & Digital Tech Support</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
    </>
  )
}
