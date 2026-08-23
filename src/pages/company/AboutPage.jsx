import React from 'react'
import heroImage from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'
import leaderChairman from '../../assets/navrachna_images/leader_chairman.png'
import leaderViceChairman from '../../assets/navrachna_images/leader_vicechairman.png'
import leaderDirector from '../../assets/navrachna_images/leader_director.png'
import leaderAdvisor from '../../assets/navrachna_images/leader_advisor.png'

const defaultAboutData = {
  hero: {
    eyebrow: "ABOUT NAVRACHNA FOUNDATION",
    title: "About Navrachna Foundation",
    description: "An autonomous startup incubator empowering visionaries with mentorship, seed capital, and world-class prototyping infrastructure.",
  },
  whoWeAre: {
    eyebrow: "WHO WE ARE",
    title: "Empowering the Next Generation of Innovators",
    paragraphs: [
      "Navrachna Foundation for Entrepreneurship Development, a subsidiary of I.T.S Engineering College, Greater Noida, is a dedicated platform committed to empowering the next generation of entrepreneurs. It enables students, faculty, and aspiring innovators to transform their ideas into impactful ventures by supporting the commercialization of technologies and fostering a strong startup culture.",
      "As the driving force behind the Startup Incubation Center, the foundation collaborates with the Government of Uttar Pradesh under the UP Startup Policy 2020, alongside key national bodies including the Department of Science & Technology (DST - GOI) and the Ministry of Micro, Small and Medium Enterprises (MSME). At its core, Navrachna focuses on nurturing innovation, validating ideas, and bridging the gap between inventors and investors—creating ventures that contribute meaningfully to economic growth."
    ]
  },
  visionMission: {
    vision: {
      title: "Our Vision",
      description: "To build a vibrant and inclusive incubation ecosystem where ideas evolve into impactful ventures, creativity is nurtured, and entrepreneurs are empowered to thrive. Our vision is to become a globally recognized hub of innovation and entrepreneurship, where education, research, and real-world problem-solving come together seamlessly."
    },
    mission: {
      title: "Our Mission",
      description: "To create a dynamic and collaborative incubation ecosystem that empowers entrepreneurs with the right resources, mentorship, and networks to grow. We aim to foster a student-first culture rooted in experiential learning, ethical innovation, and sustainability."
    }
  },
  leadership: [
    {
      role: "Chairman, I.T.S The Education Group",
      title: "Shri B.L. Gupta",
      photo: leaderChairman,
      message: "Our vision at Navrachna Foundation is to foster an ecosystem where youthful ambition meets strategic support. We are committed to building an environment that transforms innovative student ideas into sustainable business models that drive economic progress."
    },
    {
      role: "Vice Chairman, I.T.S The Education Group",
      title: "Shri Sohil Gupta",
      photo: leaderViceChairman,
      message: "At Navrachna Foundation, we bridge the gap between academic research and commercial reality. By pairing cutting-edge labs with seasoned industry leaders, we equip our founders with the execution speed needed to win."
    },
    {
      role: "Director, I.T.S Engineering College",
      title: "Dr. Manish Sharma",
      photo: leaderDirector,
      message: "Engineering excellence is the cornerstone of technical innovation. Navrachna Foundation provides the precise multidisciplinary platform, prototyping infrastructure, and technical mentorship needed to scale deep-tech ventures."
    },
    {
      role: "Advisor / In-Charge, Navrachna Foundation",
      title: "Prof. (Dr.) Sanjay Yadav",
      photo: leaderAdvisor,
      message: "Navrachna Foundation is built ground-up to serve founders. From government grant assistance to fabrication support, our hands-on incubation framework ensures that no promising idea fails for lack of guidance or capital."
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">

      {/* ── Hero Banner ── */}
      <section className="relative flex min-h-[45vh] w-full items-center justify-center overflow-hidden py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#074887] via-[#074887]/95 to-[#013759]/90" />
        </div>

        <div className="relative z-10 w-full text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight mb-4">
            {aboutData.hero.title}
          </h1>

          <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-sky-100 leading-relaxed font-normal">
            {aboutData.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a 
              href="/services" 
              className="px-6 py-3.5 rounded-xl bg-white text-sm font-normal text-[#074887] shadow-lg hover:bg-slate-100 transition-all cursor-pointer"
              style={{ color: '#074887' }}
            >
              Explore Incubation Facilities
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3.5 rounded-xl border border-white/30 bg-[#074887] text-white text-sm font-normal hover:bg-white/10 transition-all cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span style={{ color: '#ffffff' }}>Apply for Incubation</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4-Card Overview Bar */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md flex items-start gap-4">
            <div className="p-3 rounded-lg bg-sky-50 text-[#074887] shrink-0 border border-sky-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-normal text-slate-900">UP Startup Policy</div>
              <div className="text-xs text-slate-500 mt-1">State Government Nodal Incubator status</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md flex items-start gap-4">
            <div className="p-3 rounded-lg bg-sky-50 text-[#074887] shrink-0 border border-sky-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-normal text-slate-900">DST & MSME</div>
              <div className="text-xs text-slate-500 mt-1">Recognized innovation & grant center</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md flex items-start gap-4">
            <div className="p-3 rounded-lg bg-sky-50 text-[#074887] shrink-0 border border-sky-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-normal text-slate-900">₹7 Cr+ Grants</div>
              <div className="text-xs text-slate-500 mt-1">Seed capital & government funding pool</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md flex items-start gap-4">
            <div className="p-3 rounded-lg bg-sky-50 text-[#074887] shrink-0 border border-sky-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-normal text-slate-900">60+ Incubated</div>
              <div className="text-xs text-slate-500 mt-1">Deep-tech & hardware startups ecosystem</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Are & Vision/Mission ── */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 bg-white">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Text Left Column */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-normal text-[#013759] tracking-tight leading-snug mb-6">
              {aboutData.whoWeAre.title}
            </h2>
            <div className="text-base sm:text-lg text-slate-700 space-y-5 leading-relaxed text-left">
              {aboutData.whoWeAre.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Vision & Mission Right Column */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl p-7 border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-7 rounded-full bg-[#013759]" />
                <h3 className="text-xl font-normal text-[#013759]">{aboutData.visionMission.vision.title}</h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {aboutData.visionMission.vision.description}
              </p>
            </div>

            <div className="rounded-2xl p-7 border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-7 rounded-full bg-[#074887]" />
                <h3 className="text-xl font-normal text-[#013759]">{aboutData.visionMission.mission.title}</h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {aboutData.visionMission.mission.description}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Key Impact Metrics Bar ── */}
      <section className="w-full py-14 sm:py-16 px-4 sm:px-8 lg:px-16 xl:px-24 bg-[#074887] text-white">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-sky-200 border border-white/20 flex items-center justify-center mb-3 shadow-2xs backdrop-blur-xs">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl md:text-6xl font-normal text-white">1,276+</span>
            <span className="text-xs sm:text-base font-medium text-sky-100 uppercase tracking-wider mt-2">Ideas Screened</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-sky-200 border border-white/20 flex items-center justify-center mb-3 shadow-2xs backdrop-blur-xs">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58-5.84l5.96 5.96" />
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl md:text-6xl font-normal text-white">60+</span>
            <span className="text-xs sm:text-base font-medium text-sky-100 uppercase tracking-wider mt-2">Startups Incubated</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-sky-200 border border-white/20 flex items-center justify-center mb-3 shadow-2xs backdrop-blur-xs">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl md:text-6xl font-normal text-white">110+</span>
            <span className="text-xs sm:text-base font-medium text-sky-100 uppercase tracking-wider mt-2">Prototypes Built</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-sky-200 border border-white/20 flex items-center justify-center mb-3 shadow-2xs backdrop-blur-xs">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl md:text-6xl font-normal text-white">70+</span>
            <span className="text-xs sm:text-base font-medium text-sky-100 uppercase tracking-wider mt-2">IPs Filed (10 Granted)</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-sky-200 border border-white/20 flex items-center justify-center mb-3 shadow-2xs backdrop-blur-xs">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl md:text-6xl font-normal text-white">45+</span>
            <span className="text-xs sm:text-base font-medium text-sky-100 uppercase tracking-wider mt-2">Women Founders</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-sky-200 border border-white/20 flex items-center justify-center mb-3 shadow-2xs backdrop-blur-xs">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl md:text-6xl font-normal text-white">₹7 Cr+</span>
            <span className="text-xs sm:text-base font-medium text-sky-100 uppercase tracking-wider mt-2">Grants Mobilized</span>
          </div>
        </div>
      </section>

      {/* ── Leadership Messages ── */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 bg-slate-100/70 border-t border-slate-200">
        <div className="w-full">

          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#013759] tracking-tight">
              Messages from Our Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutData.leadership.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-7 sm:p-8 flex flex-col gap-5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="shrink-0 h-16 w-16 sm:h-18 sm:w-18 rounded-full overflow-hidden border-2 border-[#074887]/20 bg-slate-50">
                    <img
                      src={leader.photo}
                      alt={leader.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-normal text-slate-900">
                      {leader.title}
                    </h3>
                    <div className="text-xs sm:text-sm text-[#074887] font-medium mt-0.5">
                      {leader.role}
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100" />

                <p className="text-base text-slate-600 leading-relaxed text-left font-normal">
                  "{leader.message}"
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── What We Offer Section ── */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 bg-white">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#013759] tracking-tight">
              What Navrachna Offers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.offers.map((offer, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#074887] mb-5">
                    {offer.icon}
                  </div>
                  <h3 className="text-xl font-normal text-slate-900 mb-2">{offer.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal">{offer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action Bar ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 pb-16">
        <div className="bg-[#074887] text-white rounded-2xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight mb-3">
              Ready to Accelerate Your Venture?
            </h3>
            <p className="text-base text-sky-100 font-normal leading-relaxed">
              Join Navrachna Foundation and access world-class labs, seed capital, and mentorship to build the future.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a 
              href="tel:+919540527700" 
              className="px-6 py-3.5 rounded-xl bg-white text-sm font-normal text-[#013759] hover:bg-sky-50 shadow-md transition-all active:scale-95 cursor-pointer"
              style={{ color: '#013759' }}
            >
              Call +91 9540527700
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3.5 rounded-xl bg-white text-sm font-normal text-[#013759] hover:bg-sky-50 shadow-md transition-all active:scale-95 cursor-pointer"
              style={{ color: '#013759' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}