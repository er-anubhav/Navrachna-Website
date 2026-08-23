import React from 'react'

export function MsmeHackathonsPage() {
  const hackathonGroups = [
    {
      version: "MSME Idea Hackathon 1.0 — Approved Projects",
      status: "Sanctioned & Completed",
      projects: [
        {
          name: "Continuous Variable Generator",
          mentor: "Mr. Mahip Singh",
          candidate: "Mr. Jeevesh Gupta",
          amount: "₹10.50 Lakhs",
          category: "Hardware & Electronics"
        }
      ]
    },
    {
      version: "MSME Idea Hackathon 2.0 — Approved Projects",
      status: "Sanctioned & Completed",
      projects: [
        {
          name: "EV Accelerator Enhancer & Smart Power Management",
          mentor: "Mr. Mahip Singh",
          candidate: "Md. Samiruddin Ansari",
          amount: "₹10.00 Lakhs",
          category: "E-Mobility & Powertrain"
        }
      ]
    },
    {
      version: "MSME Idea Hackathon 3.0 (Women Innovators) — Approved Projects",
      status: "Sanctioned & Active Incubation",
      projects: [
        {
          name: "Enterprise Security & IoT Industrial Automation Platform",
          mentor: "Mr. Shubham Kumar",
          candidate: "Ms. Priya Sah Deo",
          amount: "₹12.00 Lakhs",
          category: "IoT & Cybersecurity"
        },
        {
          name: "Environmental Footprint Reduction & Wind Turbine Equipment Monitoring",
          mentor: "Mr. Dhruv Mehta",
          candidate: "Ms. Aruna Malik",
          amount: "₹14.80 Lakhs",
          category: "Clean-Tech & Renewable Energy"
        },
        {
          name: "Precision Aeroponics Smart Agriculture System for Saffron",
          mentor: "Mr. Shubham Verma",
          candidate: "Ms. Rachna Verma",
          amount: "₹14.40 Lakhs",
          category: "Agri-Tech & Vertical Farming"
        }
      ]
    },
    {
      version: "MSME Idea Hackathon 4.0 — Upcoming Call for Ideas",
      status: "Applications Opening Soon",
      projects: [
        {
          name: "Innovative Smart Grid & Microgrid Controller",
          mentor: "Empaneled Lab Experts",
          candidate: "Open Call for Student & Women Founders",
          amount: "Up to ₹15.00 Lakhs",
          category: "Energy & Smart Infrastructure"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased font-normal pb-24">
      
      {/* ── Hero Banner Header ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none" />

        <div className="relative z-10 w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-8">
            MSME Idea Hackathon Series
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="/programs/msme-bi" 
              className="px-6 py-3.5 rounded-xl bg-white text-[#013759] text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Apply for Hackathon 4.0
            </a>
            <a 
              href="/services" 
              className="px-6 py-3.5 rounded-xl border border-white/40 bg-white/10 text-white! text-sm font-normal backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Explore Prototyping Labs</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Overview Statistics Bar ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Max Seed Funding</p>
              <h3 className="text-lg font-normal text-slate-900">₹15.00 Lakhs / Idea</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Sanctioned Cohorts</p>
              <h3 className="text-lg font-normal text-slate-900">4 Hackathon Editions</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Women Innovators Track</p>
              <h3 className="text-lg font-normal text-slate-900">Special Category</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Equity Term</p>
              <h3 className="text-lg font-normal text-slate-900">100% Non-Dilutive</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Hackathons History Grid ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        
        <div className="flex flex-col gap-14">
          {hackathonGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col">
              
              {/* Version Section Heading */}
              <div className="border-b border-slate-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight">
                  {group.version}
                </h2>
                <span className="text-xs sm:text-sm font-medium text-[#074887] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 w-fit">
                  {group.status}
                </span>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {group.projects.map((proj, pIdx) => (
                  <div 
                    key={pIdx} 
                    className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group text-left"
                  >
                    <div className="flex flex-col gap-4">
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>Hackathon Winner</span>
                        </span>
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                          {proj.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-normal text-slate-900 group-hover:text-[#074887] transition-colors leading-snug">
                        {proj.name}
                      </h3>

                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-normal">Candidate Innovator:</span>
                        <span className="text-slate-900 font-medium">{proj.candidate}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-normal">Faculty Mentor:</span>
                        <span className="text-slate-700 font-normal">{proj.mentor}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                        <span className="text-xs text-slate-500 font-normal">Approved Grant:</span>
                        <span className="text-base font-normal text-[#074887]">
                          {proj.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </main>

    </div>
  )
}
