import React from 'react'

export function MsmeYearlyPage() {
  const yearlyData = [
    {
      year: "Ideas Approved under MSME Year 2015-2016",
      projects: [
        {
          name: "Continuous Variable Generator",
          student: "Anish Khan",
          funding: "₹5.10 Lakhs",
          category: "Electrical & Hardware"
        },
        {
          name: "Solid Agro Fertilizer Spreading Machine",
          student: "Mr. Shahnawaz Sami",
          funding: "₹4.97 Lakhs",
          category: "Agri-Tech & Mechanization"
        }
      ]
    },
    {
      year: "Ideas Approved under MSME Year 2016-2017",
      projects: [
        {
          name: "Low-Cost Table Top Portable Laser Cutting & Engraving Machine",
          student: "Mr. Jyoti Prakash",
          funding: "₹5.95 Lakhs",
          category: "Fabrication & Rapid Tooling"
        },
        {
          name: "Pneumatic Based Rice Threshing & Winnowing Machine",
          student: "Mr. Manvendra Yadav",
          funding: "₹4.68 Lakhs",
          category: "Agricultural Automation"
        },
        {
          name: "Exercise cum Pedal Powered Washing Machine",
          student: "Mr. Khalid Aziz",
          funding: "₹4.68 Lakhs",
          category: "Eco-Tech & Clean Energy"
        },
        {
          name: "Easy Wait — Smart Queue & Weight Management Rig",
          student: "Dr. Ashish Agarwal",
          funding: "₹5.27 Lakhs",
          category: "Healthcare & Smart Systems"
        }
      ]
    }
  ]

  const totalFunding = "₹30.65 Lakhs"
  const totalProjects = yearlyData.reduce((acc, curr) => acc + curr.projects.length, 0)

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased font-normal pb-24">
      
      {/* ── Hero Banner Header ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none" />

        <div className="relative z-10 w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-8">
            MSME Yearly Approved Innovations
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="/programs/msme-bi" 
              className="px-6 py-3.5 rounded-xl bg-white text-[#013759] text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Apply for MSME Grant
            </a>
            <a 
              href="/msme-hackathons" 
              className="px-6 py-3.5 rounded-xl border border-white/40 bg-white/10 text-white! text-sm font-normal backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>View MSME Hackathons</span>
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
              <p className="text-xs text-slate-500 font-normal">Total Sanctioned Grants</p>
              <h3 className="text-lg font-normal text-slate-900">{totalFunding}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Approved Prototypes</p>
              <h3 className="text-lg font-normal text-slate-900">{totalProjects} Projects</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Nodal Center</p>
              <h3 className="text-lg font-normal text-slate-900">Ministry of MSME</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Incubation Support</p>
              <h3 className="text-lg font-normal text-slate-900">100% Financial Grant</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Projects History Grid ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        
        <div className="flex flex-col gap-14">
          {yearlyData.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col">
              
              {/* Year Section Heading */}
              <div className="border-b border-slate-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight">
                  {group.year}
                </h2>
                <span className="text-xs sm:text-sm font-normal text-slate-500">
                  {group.projects.length} Sanctioned Ventures
                </span>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {group.projects.map((proj, pIdx) => (
                  <div 
                    key={pIdx} 
                    className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group text-left"
                  >
                    <div className="flex flex-col gap-4">
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>Sanctioned Grant</span>
                        </span>
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                          {proj.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-normal text-slate-900 group-hover:text-[#074887] transition-colors leading-snug">
                        {proj.name}
                      </h3>

                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">Lead Innovator</span>
                        <span className="text-sm font-normal text-slate-800">{proj.student}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">Approved Grant</span>
                        <span className="text-base font-normal text-[#074887]">
                          {proj.funding}
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
