import React, { useState } from 'react'

// Import Localized Team Member Portraits
import teamMishra from '../../assets/navrachna_images/team_mishra.png'
import teamSudhanshu from '../../assets/navrachna_images/team_sudhanshu.png'
import teamShashwat from '../../assets/navrachna_images/team_shashwat.png'
import teamShubham from '../../assets/navrachna_images/team_shubham.png'
import teamSamiruddin from '../../assets/navrachna_images/team_samiruddin.png'
import teamAlpana from '../../assets/navrachna_images/team_alpana.png'

const ADVISOR_MEMBER = {
  name: "Dr. S P Mishra",
  role: "Advisor, I.T.S Education Group",
  category: "Leadership & Advisory",
  bio: "Guiding organizational vision, researcher relations, and strategic growth pathways for early-stage tech ventures.",
  expertise: ["Team Management", "Researcher", "Organizational Development", "Leadership"],
  tag: "Strategic Advisor",
  image: teamMishra
}

const HEAD_MEMBER = {
  name: "Mr. Sudhanshu Ranjan",
  role: "Head of Incubation",
  category: "Incubation & Operations",
  bio: "Directing startup screening, technology transfer, seed fund disbursements, and industry partnership programs.",
  expertise: ["Startup Selection", "Commercialization", "Technology Transfer", "Networking", "Branding"],
  tag: "Head of Incubation",
  image: teamSudhanshu
}

const TEAM_LEADS = [
  {
    name: "Mr. Shashwat Panday",
    role: "Business Plan & Software Developer",
    category: "Technical & Lab Leads",
    bio: "Spearheading AI/ML system architectures, AR/VR simulation environments, and deep-tech prototype building.",
    expertise: ["AI & ML Systems", "AR & VR Environments", "Deep Tech Prototyping"],
    tag: "Deep Tech Lead",
    image: teamShashwat
  },
  {
    name: "Mr. Shubham Kumar",
    role: "Assistant Operations Manager",
    category: "Incubation & Operations",
    bio: "Overseeing facility operations, budget planning, 3D modeling workflows, and electrical/IoT hardware testing.",
    expertise: ["Financials & Budgeting", "Electricals & IoT", "Product Designing"],
    tag: "Operations Lead",
    image: teamShubham
  },
  {
    name: "Md. Samiruddin Ansari",
    role: "Assistant Portfolio Manager",
    category: "Technical & Lab Leads",
    bio: "Managing embedded electronics design, IIoT prototyping, and proof-of-concept to product lifecycle transitions.",
    expertise: ["Embedded Systems", "Industrial IoT (IIoT)", "PoC to Product"],
    tag: "Portfolio Manager",
    image: teamSamiruddin
  },
  {
    name: "Ms. Alpana Chaudhary",
    role: "Office Executive",
    category: "Incubation & Operations",
    bio: "Handling program moderation, incubator compliance documentation, and event management logistics.",
    expertise: ["Documentation", "Event Management", "Compliance"],
    tag: "Executive Support",
    image: teamAlpana
  }
]

const ALL_MEMBERS = [ADVISOR_MEMBER, HEAD_MEMBER, ...TEAM_LEADS]

export function TeamPage() {
  const [layoutMode, setLayoutMode] = useState('tree') // 'tree' or 'horizontal'

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* ── Hero Header Banner ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none"></div>

        <div className="relative w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-4">
            Organizational Structure & Team
          </h1>
          <p className="text-base sm:text-lg text-sky-100 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            Meet the advisors, incubation leads, deep-tech engineers, and operations team guiding founders at Navrachna Foundation.
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="/contact" 
              className="px-6 py-3.5 rounded-xl bg-white text-[#013759] text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Contact Incubation Team
            </a>
            <a 
              href="/about" 
              className="px-6 py-3.5 rounded-xl border border-white/40 bg-white/10 text-white! text-sm font-normal backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>About Navrachna</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Content Section ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        
        {/* Layout Switcher Control Bar */}
        <div className="flex items-center justify-between gap-4 mb-12 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">Team Overview</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">Explore our organizational structure and leadership profiles.</p>
          </div>

          {/* Layout Mode Toggle */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shrink-0">
            <button
              onClick={() => setLayoutMode('tree')}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                layoutMode === 'tree' ? 'bg-[#074887] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 3v6m0 0l-6 6m6-6l6 6m-12 0v3m12-3v3"></path>
              </svg>
              Tree Hierarchy
            </button>

            <button
              onClick={() => setLayoutMode('horizontal')}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                layoutMode === 'horizontal' ? 'bg-[#074887] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              Executive Rows
            </button>
          </div>
        </div>

        {/* ── LAYOUT MODE 1: Organizational Tree Hierarchy ── */}
        {layoutMode === 'tree' ? (
          <div className="flex flex-col items-center w-full space-y-10">
            
            {/* Level 1: Strategic Advisory Node */}
            <div className="w-full flex flex-col items-center">
              <span className="text-xs sm:text-sm font-medium text-[#074887] uppercase tracking-widest bg-sky-100/80 border border-sky-200 px-4 py-1.5 rounded-full mb-4 shadow-2xs">
                Strategic Advisory
              </span>
              
              <div className="w-full max-w-2xl bg-white rounded-2xl border-2 border-[#074887] p-6 sm:p-7 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row items-start gap-6">
                <div className="h-40 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                  <img src={ADVISOR_MEMBER.image} alt={ADVISOR_MEMBER.name} className="h-full w-full object-cover object-top" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-[#074887] bg-sky-50 px-3 py-1 rounded-md border border-sky-100 uppercase tracking-wider inline-block mb-1.5">
                    {ADVISOR_MEMBER.tag}
                  </span>
                  <h3 className="text-2xl font-normal text-slate-900 mb-1">{ADVISOR_MEMBER.name}</h3>
                  <p className="text-sm text-[#074887] font-medium mb-3">{ADVISOR_MEMBER.role}</p>
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">{ADVISOR_MEMBER.bio}</p>
                </div>
              </div>
            </div>

            {/* Connecting Vertical Line 1 */}
            <div className="h-12 w-0.5 bg-[#074887]/40"></div>

            {/* Level 2: Incubation Head Node */}
            <div className="w-full flex flex-col items-center">
              <span className="text-xs sm:text-sm font-medium text-[#074887] uppercase tracking-widest bg-sky-100/80 border border-sky-200 px-4 py-1.5 rounded-full mb-4 shadow-2xs">
                Incubation Management
              </span>
              
              <div className="w-full max-w-2xl bg-white rounded-2xl border-2 border-[#074887]/80 p-6 sm:p-7 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row items-start gap-6">
                <div className="h-40 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                  <img src={HEAD_MEMBER.image} alt={HEAD_MEMBER.name} className="h-full w-full object-cover object-top" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-[#074887] bg-sky-50 px-3 py-1 rounded-md border border-sky-100 uppercase tracking-wider inline-block mb-1.5">
                    {HEAD_MEMBER.tag}
                  </span>
                  <h3 className="text-2xl font-normal text-slate-900 mb-1">{HEAD_MEMBER.name}</h3>
                  <p className="text-sm text-[#074887] font-medium mb-3">{HEAD_MEMBER.role}</p>
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">{HEAD_MEMBER.bio}</p>
                </div>
              </div>
            </div>

            {/* Connecting Vertical Line 2 with Horizontal Branching Bar */}
            <div className="w-full flex flex-col items-center">
              <div className="h-10 w-0.5 bg-[#074887]/40"></div>
              <div className="hidden md:block w-3/4 h-0.5 bg-[#074887]/30"></div>
            </div>

            {/* Level 3: Domain Specialists & Operations Grid */}
            <div className="w-full">
              <div className="text-center mb-8">
                <span className="text-xs sm:text-sm font-medium text-[#074887] uppercase tracking-widest bg-sky-100/80 border border-sky-200 px-4 py-1.5 rounded-full shadow-2xs">
                  Operations, Portfolio & Prototyping Leads
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {TEAM_LEADS.map((member, idx) => (
                  <div 
                    key={idx}
                    className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col items-start text-left"
                  >
                    <div className="h-36 w-30 overflow-hidden rounded-xl bg-slate-100 border border-slate-100 mb-4 self-center">
                      <img src={member.image} alt={member.name} className="h-full w-full object-cover object-top" />
                    </div>

                    <span className="text-xs font-semibold text-[#074887] bg-sky-50 px-3 py-0.5 rounded-md border border-sky-100 uppercase tracking-wider mb-2">
                      {member.tag}
                    </span>

                    <h4 className="text-lg font-normal text-slate-900 leading-tight mb-1">{member.name}</h4>
                    <p className="text-xs sm:text-sm text-[#074887] font-medium mb-3">{member.role}</p>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-4">{member.bio}</p>

                    <div className="mt-auto pt-3.5 border-t border-slate-100 w-full">
                      <div className="flex flex-wrap justify-start gap-1.5">
                        {member.expertise.map((exp, eIdx) => (
                          <span key={eIdx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-normal">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* ── LAYOUT MODE 2: Horizontal Executive Rows ── */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ALL_MEMBERS.map((member, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-center sm:items-start"
              >
                <div className="relative h-48 w-36 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover object-top" />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0 text-center sm:text-left">
                  <div>
                    <span className="text-xs font-semibold text-[#074887] uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-md border border-sky-100 inline-block mb-2">
                      {member.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-normal text-slate-900 leading-tight mb-1">{member.name}</h3>
                    <p className="text-sm text-[#074887] font-medium mb-3">{member.role}</p>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-4">{member.bio}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                      {member.expertise.map((exp, eIdx) => (
                        <span key={eIdx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-normal">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reach Out CTA Section */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-normal text-[#013759] tracking-tight mb-2">
              Looking for Mentorship or Ecosystem Support?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Connect with our incubation management team to discuss startup proposals, grant applications, or technical lab access.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <a 
              href="tel:+919540527700" 
              className="px-6 py-3.5 rounded-xl bg-black text-sm font-normal text-white! hover:bg-slate-800 shadow-md transition-all active:scale-95 cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Call Management</span>
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3.5 rounded-xl bg-black text-sm font-normal text-white! hover:bg-slate-800 shadow-md transition-all active:scale-95 cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Schedule Pitch Meeting</span>
            </a>
          </div>
        </div>

      </section>

    </div>
  )
}
