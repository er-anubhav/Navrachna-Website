import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import leaderChairman    from '../assets/navrachna_images/leader_chairman.png'
import leaderViceChairman from '../assets/navrachna_images/leader_vicechairman.png'
import leaderDirector    from '../assets/navrachna_images/leader_director.png'
import leaderAdvisor     from '../assets/navrachna_images/leader_advisor.png'

import { useCms } from '../hooks/useCms'

const LEADERSHIP_PHOTOS = {
  chairman: leaderChairman,
  vice_chairman: leaderViceChairman,
  director: leaderDirector,
  advisor: leaderAdvisor
}

const OFFER_ICONS = {
  coworking: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  mentorship: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>
  ),
  labs: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  funding: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  networking: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  ip: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
};

export function AboutPage() {
  const { data: aboutData, loading } = useCms('about');

  if (loading || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  const LEADERSHIP = (aboutData.leadership || []).map(l => ({
    ...l,
    photo: LEADERSHIP_PHOTOS[l.photoKey]
  }));

  const OFFERS = (aboutData.offers || []).map(o => ({
    ...o,
    icon: OFFER_ICONS[o.iconKey]
  }));
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[42vh] w-full items-end justify-center overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block mb-4 text-[10px] tracking-[0.25em] uppercase text-white/50">
            {aboutData.hero.eyebrow}
          </span>
          <h1 className={`font-normal tracking-tight text-white leading-tight drop-shadow-md ${aboutData.hero.titleSize || 'text-4xl sm:text-5xl'}`}>
            {aboutData.hero.title}
          </h1>
          <p className={`mt-4 max-w-2xl mx-auto text-white/70 leading-relaxed ${aboutData.hero.descSize || 'text-sm'}`}>
            {aboutData.hero.description}
          </p>
        </div>
      </section>

      {/* ── About NFED ────────────────────────────────────────────────────── */}
      <section className="w-full py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div>
              <span className="text-[10px] font-semibold tracking-widest text-[#074887] uppercase block mb-4">
                {aboutData.whoWeAre.eyebrow}
              </span>
              <h2 className={`font-normal text-[#013759] tracking-tight leading-snug mb-6 ${aboutData.whoWeAre.titleSize || 'text-3xl md:text-4xl'}`}>
                {aboutData.whoWeAre.title}
              </h2>
              <div className="text-sm text-gray-600 space-y-5 leading-relaxed text-justify">
                {aboutData.whoWeAre.paragraphs.map((p, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </div>

            {/* Vision & Mission cards */}
            <div className="flex flex-col gap-5">
              <div
                className="rounded-2xl p-8 border transition-all duration-300 hover:shadow-md"
                style={{ borderColor: '#013759' + '18', background: '#013759' + '04' }}
              >
                <div
                  className="w-1 h-6 rounded-full mb-5"
                  style={{ background: '#013759' }}
                />
                <h3 className="text-lg font-normal text-[#013759] mb-3">{aboutData.visionMission.vision.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {aboutData.visionMission.vision.description}
                </p>
              </div>

              <div
                className="rounded-2xl p-8 border transition-all duration-300 hover:shadow-md"
                style={{ borderColor: '#074887' + '22', background: '#074887' + '04' }}
              >
                <div
                  className="w-1 h-6 rounded-full mb-5"
                  style={{ background: '#074887' }}
                />
                <h3 className="text-lg font-normal text-[#013759] mb-3">{aboutData.visionMission.mission.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {aboutData.visionMission.mission.description}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Leadership Messages ────────────────────────────────────────────── */}
      <section className="w-full py-20 bg-[#f8fafc] border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-14 text-center">
            <span className="text-[10px] font-semibold tracking-widest text-[#074887] uppercase block mb-4">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-[#013759] tracking-tight">
              Messages from Our Leaders
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-xs text-gray-400 leading-relaxed">
              Guiding the vision of NFED — insights from the people who inspire and lead the foundation.
            </p>
          </div>

          {/* Leader cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LEADERSHIP.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Header row */}
                <div className="flex items-center gap-5">
                  <div className="shrink-0 h-16 w-16 rounded-full overflow-hidden border-2 border-[#013759]/15 bg-slate-50">
                    <img
                      src={leader.photo}
                      alt={leader.role}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest text-[#074887] uppercase font-medium">
                      {leader.role}
                    </div>
                    <h3 className="text-base font-normal text-[#013759] mt-0.5">
                      {leader.title}
                    </h3>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-100" />

                {/* Quote */}
                <div className="relative">
                  {/* Decorative quote mark */}
                  <span
                    className="absolute -top-2 -left-1 text-5xl leading-none select-none pointer-events-none"
                    style={{ color: '#013759', opacity: 0.08 }}
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify pl-2">
                    {leader.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── What We Offer strip ───────────────────────────────────────────── */}
      <section className="w-full py-20 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-semibold tracking-widest text-[#074887] uppercase block mb-4">
            Resources
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-[#013759] tracking-tight mb-10">
            What the Foundation Offers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-100 p-7 text-left shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4 w-10 h-10 rounded-xl bg-[#013759]/06 flex items-center justify-center text-[#013759]">
                  {item.icon}
                </div>
                <h3 className="text-sm font-medium text-[#013759] mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}