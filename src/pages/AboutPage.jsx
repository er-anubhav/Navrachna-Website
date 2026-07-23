import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import leaderChairman from '../assets/navrachna_images/leader_chairman.png'
import leaderViceChairman from '../assets/navrachna_images/leader_vicechairman.png'
import leaderDirector from '../assets/navrachna_images/leader_director.png'
import leaderAdvisor from '../assets/navrachna_images/leader_advisor.png'

const defaultAboutData = {
  hero: {
    eyebrow: "ABOUT NAVRACHNA FOUNDATION",
    title: "Nurturing Ideas into Market-Ready Startups",
    description: "Navrachna Foundation for Entrepreneurship Development (NFED) is an autonomous incubator empowering visionaries with mentorship, seed capital, and world-class infrastructure.",
    titleSize: "text-3xl sm:text-5xl",
    descSize: "text-xs sm:text-sm"
  },
  whoWeAre: {
    eyebrow: "WHO WE ARE",
    title: "Empowering the Next Generation of Innovators",
    titleSize: "text-2xl sm:text-4xl",
    paragraphs: [
      "Navrachna Foundation for Entrepreneurship Development (NFED) is an autonomous, sector-agnostic startup incubator and premium co-working ecosystem registered under the societies registration framework to empower founders with early-stage velocity and institutional support.",
      "NFED nurtures innovation-driven startups by providing seamless physical incubation infrastructure, high-fidelity mentoring channels, deep access to institutional and private seed funds, fabrication assets, and business matchmaking. Operated under the aegis of I.T.S. Engineering College, Greater Noida, NFED serves as the strategic regional node for transforming research and raw academic ideas into high-conversion, venture-backed startups."
    ]
  },
  visionMission: {
    vision: {
      title: "Our Vision",
      description: "To become Northern India's leading innovation catalyst, converting academic research and entrepreneurial ambition into scalable, globally competitive enterprises."
    },
    mission: {
      title: "Our Mission",
      description: "To provide early-stage founders with frictionless access to state-of-the-art incubation, fabrication labs, government grants, industry mentorship, and institutional seed funding."
    }
  },
  leadership: [
    {
      role: "CHAIRMAN, I.T.S THE EDUCATION GROUP",
      title: "Shri B.L. Gupta",
      photo: leaderChairman,
      message: "Our vision at NFED is to foster an ecosystem where youthful ambition meets strategic support. We are committed to building an environment that transforms innovative student ideas into sustainable business models that drive economic progress."
    },
    {
      role: "VICE CHAIRMAN, I.T.S THE EDUCATION GROUP",
      title: "Shri Sohil Gupta",
      photo: leaderViceChairman,
      message: "At Navrachna Foundation, we bridge the gap between academic research and commercial reality. By pairing cutting-edge labs with seasoned industry leaders, we equip our founders with the execution speed needed to win."
    },
    {
      role: "DIRECTOR, I.T.S ENGINEERING COLLEGE",
      title: "Dr. Manish Sharma",
      photo: leaderDirector,
      message: "Engineering excellence is the cornerstone of technical innovation. NFED provides the precise multidisciplinary platform, prototyping infrastructure, and technical mentorship needed to scale deep-tech ventures."
    },
    {
      role: "ADVISOR / IN-CHARGE, NFED",
      title: "Prof. (Dr.) Sanjay Yadav",
      photo: leaderAdvisor,
      message: "NFED is built ground-up to serve founders. From government grant assistance to fabrication support, our hands-on incubation framework ensures that no promising idea fails for lack of guidance or capital."
    }
  ],
  offers: [
    {
      title: "Incubation & Co-Working",
      desc: "High-speed internet, ergonomic desks, dedicated private cabins, and round-the-clock facility access for resident founders.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      title: "1-on-1 Strategic Mentorship",
      desc: "Direct access to domain experts, successful serial entrepreneurs, and regulatory advisors for tailored business strategy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      )
    },
    {
      title: "Prototyping & Fab Labs",
      desc: "Advanced electronics, 3D printing, CNC machines, and heavy mechanical fabrication units to convert blueprints into physical products.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      )
    },
    {
      title: "Funding & Seed Grants",
      desc: "Direct access to MSME BI, DST, and NewGen IEDC grants, alongside angel networks and venture capital pitch sessions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      title: "Ecosystem Network",
      desc: "Connection to academic researchers, corporate partners, pilot customers, and government incubation networks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      title: "IP & Legal Assistance",
      desc: "Full guidance on patent filing, trademark registration, company incorporation, and legal compliance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    }
  ]
}

export function AboutPage() {
  const aboutData = defaultAboutData;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[38vh] sm:min-h-[42vh] w-full items-center sm:items-end justify-center overflow-hidden pb-12 sm:pb-16 pt-12">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block mb-3 sm:mb-4 text-[10px] tracking-[0.25em] uppercase text-white/70 font-semibold">
            {aboutData.hero.eyebrow}
          </span>
          <h1 className={`font-normal tracking-tight text-white leading-tight drop-shadow-md ${aboutData.hero.titleSize || 'text-3xl sm:text-5xl'}`}>
            {aboutData.hero.title}
          </h1>
          <p className={`mt-3 sm:mt-4 max-w-2xl mx-auto text-white/80 leading-relaxed ${aboutData.hero.descSize || 'text-xs sm:text-sm'}`}>
            {aboutData.hero.description}
          </p>
        </div>
      </section>

      {/* ── About NFED ────────────────────────────────────────────────────── */}
      <section className="w-full py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Text */}
            <div>
              <h2 className={`font-normal text-[#013759] tracking-tight leading-snug mb-4 sm:mb-6 ${aboutData.whoWeAre.titleSize || 'text-2xl sm:text-4xl'}`}>
                {aboutData.whoWeAre.title}
              </h2>
              <div className="text-xs sm:text-sm text-gray-600 space-y-4 sm:space-y-5 leading-relaxed text-left md:text-justify">
                {aboutData.whoWeAre.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Vision & Mission cards */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <div
                className="rounded-2xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-md"
                style={{ borderColor: '#01375918', background: '#01375904' }}
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div
                    className="w-1 h-6 rounded-full shrink-0"
                    style={{ background: '#013759' }}
                  />
                  <h3 className="text-base sm:text-lg font-normal text-[#013759]">{aboutData.visionMission.vision.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {aboutData.visionMission.vision.description}
                </p>
              </div>

              <div
                className="rounded-2xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-md"
                style={{ borderColor: '#07488722', background: '#07488704' }}
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div
                    className="w-1 h-6 rounded-full shrink-0"
                    style={{ background: '#074887' }}
                  />
                  <h3 className="text-base sm:text-lg font-normal text-[#013759]">{aboutData.visionMission.mission.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {aboutData.visionMission.mission.description}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Leadership Messages ────────────────────────────────────────────── */}
      <section className="w-full py-12 sm:py-20 bg-[#f8fafc] border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-10 sm:mb-14 text-center">
            <span className="text-[10px] font-normal tracking-widest text-[#074887] uppercase block mb-2 sm:mb-4">
              Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#013759] tracking-tight">
              Messages from Our Leaders
            </h2>
            <p className="mt-2 sm:mt-3 max-w-xl mx-auto text-xs text-gray-500 leading-relaxed">
              Guiding the vision of NFED — insights from the leaders who inspire and drive the foundation.
            </p>
          </div>

          {/* Leader cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {aboutData.leadership.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Header row */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-[#013759]/15 bg-slate-50">
                    <img
                      src={leader.photo}
                      alt={leader.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-[9px] sm:text-[10px] tracking-widest text-[#074887] uppercase font-normal">
                      {leader.role}
                    </div>
                    <h3 className="text-sm sm:text-base font-normal text-[#013759] mt-0.5">
                      {leader.title}
                    </h3>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-100" />

                {/* Quote */}
                <div className="relative">
                  <span
                    className="absolute -top-2 -left-1 text-4xl sm:text-5xl leading-none select-none pointer-events-none"
                    style={{ color: '#013759', opacity: 0.08 }}
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-left md:text-justify pl-2">
                    {leader.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}