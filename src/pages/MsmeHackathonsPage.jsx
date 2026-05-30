import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

export function MsmeHackathonsPage() {
  const hackathonGroups = [
    {
      version: "MSME Idea Hackathon 1.0 Approved Projects",
      projects: [
        {
          name: "Continuous Variable Generator",
          mentor: "Mr. Mahip Singh",
          candidate: "Mr. Jeevesh Gupta",
          amount: "₹10.50 Lacs"
        }
      ]
    },
    {
      version: "MSME Idea Hackathon 2.0 Approved Projects",
      projects: [
        {
          name: "EV Accelerator Enhancer",
          mentor: "Mr. Mahip Singh",
          candidate: "Md. Samiruddin Ansari",
          amount: "₹10.0 Lacs"
        }
      ]
    },
    {
      version: "MSME Idea Hackathon 3.0 Approved Projects",
      projects: [
        {
          name: "Enterprise Security and Automation",
          mentor: "Mr. Shubham Kumar",
          candidate: "Ms. Priya Sah Deo",
          amount: "₹12.00 Lacs"
        },
        {
          name: "Revolutionizing Environmental Footprint Reduction and Equipment Monitoring Using Wind Turbine",
          mentor: "Mr. Dhruv Mehta",
          candidate: "Aruna Malik",
          amount: "₹14.80 Lacs"
        },
        {
          name: "Aeroponics System for Saffron",
          mentor: "Mr. Shubham Verma",
          candidate: "Rachna Verma",
          amount: "₹14.40 Lacs"
        }
      ]
    },
    {
      version: "MSME Idea Hackathon 4.0 (Upcoming Rollout)",
      projects: [
        {
          name: "Innovative Smart Grid Controller",
          mentor: "Pending Selection",
          candidate: "Rolling Submissions",
          amount: "₹15.00 Lacs (Max)"
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
            MSME Hackathons
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
            Securing national scale grants and turning technology prototypes into registered commercial startup companies.
          </p>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="w-full py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-[#013759] tracking-tight">Ideas Approved Under Hackathons</h2>
          </div>

          <div className="flex flex-col gap-12 max-w-8xl mx-auto">
            {hackathonGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="flex flex-col">
                
                {/* Hackathon Version Header */}
                <h3 className="text-xl text-[#013759] font-normal border-b border-slate-200 pb-3 mb-6 relative">
                  {group.version}
                  <span className="absolute bottom-0 left-0 h-0.5 w-16 bg-[#074887]"></span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.projects.map((proj, pIdx) => (
                    <div 
                      key={pIdx} 
                      className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-slate-200"
                    >
                      <div>
                        <div className="text-[10px] font-semibold text-[#074887] uppercase tracking-wider mb-2">
                          Hackathon Winner
                        </div>
                        <h4 className="text-base font-normal text-[#013759] leading-tight mb-4 group-hover:text-[#074887] transition-colors">
                          {proj.name}
                        </h4>
                      </div>

                      <div className="flex flex-col gap-3 pt-4 border-t border-slate-50 mt-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Candidate:</span>
                          <span className="text-gray-700 font-medium">{proj.candidate}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Mentor:</span>
                          <span className="text-gray-700 font-medium">{proj.mentor}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                          <span className="text-xs text-gray-400 uppercase tracking-widest">Funding Approved</span>
                          <span className="bg-[#074887]/5 text-[#074887] text-xs font-semibold px-2.5 py-1 rounded-md">
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

        </div>
      </section>

    </div>
  )
}
