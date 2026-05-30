import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

export function MsmeYearlyPage() {
  const yearlyData = [
    {
      year: "Ideas Approved under MSME Year 2015-2016",
      projects: [
        {
          name: "Continuous Variable Generator",
          student: "Anish Khan",
          funding: "₹5.1 Lacs"
        },
        {
          name: "Solid Agro Fertilizer Spreading Machine",
          student: "Mr. Shahnawaz Sami",
          funding: "₹4.97 Lacs"
        }
      ]
    },
    {
      year: "Ideas Approved under MSME Year 2016-2017",
      projects: [
        {
          name: "Low-Cost Table Top Portable Laser Cutting and Engraving Machine",
          student: "Mr. Jyoti Prakash",
          funding: "₹5.95 Lacs"
        },
        {
          name: "Pneumatic Based Rice Threshing and Winnowing Machine",
          student: "Mr. Manvendra Yadav",
          funding: "₹4.68 Lacs"
        },
        {
          name: "Exercise cum Pedal Powered Washing Machine",
          student: "Mr. Khalid Aziz",
          funding: "₹4.68 Lacs"
        },
        {
          name: "Easy Wait",
          student: "Dr. Ashish Agarwal",
          funding: "₹5.27 Lacs"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      
      {/* Hero Header Section */}
      <section className="relative flex min-h-[35vh] w-full items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            MSME Yearly Activities
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
            A retrospective index of technology development ideas approved and funded by the Ministry of MSME.
          </p>
        </div>
      </section>

      {/* Main Core Content Grid */}
      <section className="w-full py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs text-[#ffffff] font-semibold uppercase tracking-widest bg-black px-3.5 py-1.5 rounded-full inline-block mb-3">
              Approved Prototype Projects
            </span>
            <h2 className="text-3xl mt-6 font-normal text-[#013759] tracking-tight">Incubation Milestone History</h2>
          </div>

          <div className="flex flex-col gap-12 max-w-8xl mx-auto">
            {yearlyData.map((group, groupIdx) => (
              <div key={groupIdx} className="flex flex-col">
                {/* Year Header badge */}
                <h3 className="text-xl text-[#013759] font-normal border-b border-slate-200 pb-3 mb-6 relative">
                  {group.year}
                  <span className="absolute bottom-0 left-0 h-0.5 w-16 bg-[#074887]"></span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {group.projects.map((proj, pIdx) => (
                    <div 
                      key={pIdx} 
                      className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-slate-200"
                    >
                      <div>
                        <div className="text-xs font-semibold text-[#074887] uppercase tracking-wider mb-2">
                          Project Sanction
                        </div>
                        <h4 className="text-base font-normal text-[#013759] leading-tight mb-4 group-hover:text-[#074887] transition-colors">
                          {proj.name}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Candidate</p>
                          <p className="text-xs text-gray-700 font-medium">{proj.student}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Amount</p>
                          <span className="inline-block bg-[#074887]/5 text-[#074887] text-sm px-2.5 py-1 rounded-md mt-0.5">
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

        </div>
      </section>

    </div>
  )
}
