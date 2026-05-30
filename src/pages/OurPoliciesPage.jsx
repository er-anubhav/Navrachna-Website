import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

export function OurPoliciesPage() {
  const POLICIES = [
    {
      title: "Patent Support Policy",
      desc: "Detailed guidelines and frameworks concerning monetary reimbursement, filing assistance, and ownership division for Indian and international patent applications submitted by incubated startups, students, and faculty.",
      link: "https://navrachnafoundation.com/wp-content/uploads/2025/03/PatentSupportPolicy.pdf",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      title: "Project Selection And Procurement Policy",
      desc: "Systematic protocols and compliance measures outlining how prototypes, innovative ideas, and hardware setups are selected, verified, and safely procured using institutional funding pools.",
      link: "https://navrachnafoundation.com/wp-content/uploads/2025/03/ProjectSelectoionAndProcurementPolicy.pdf",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      title: "Purchase Policy And SOP",
      desc: "Standard Operating Procedure (SOP) regarding budgeting, quote validations, transaction transparency, and vendor onboarding for specialized electronics, software licenses, and 3D printing filaments.",
      link: "https://navrachnafoundation.com/wp-content/uploads/2025/03/PurchasePolicyAndSOP.pdf",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      
      {/* Mini Hero Header */}
      <section className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            Our Core Policies
          </h1>
          <p className="mt-4 max-w-4xl mx-auto text-base text-white/80 leading-relaxed">
            NFED is committed to safeguarding personal information, supporting IP creation, and maintaining compliance across all incubation, purchase, and procurement stages.
          </p>
        </div>
      </section>

      {/* Overview Block */}
      <section className="w-full py-16 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight leading-snug mb-6">
            Compliance & Guidelines
          </h2>
          <p className="text-gray-500 leading-relaxed text-sm sm:text-base text-justify">
            Our policy outlines how we collect, use, and protect your personal information. We are committed to safeguarding your data and ensuring your privacy while you use our services. By choosing incubation with the Navrachna Foundation, you agree to comply with these terms, standard operating procedures, and all applicable central/state innovation laws.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="w-full py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-rows-3 grid-flow-col gap-8">
            {POLICIES.map((policy, idx) => (
              <div key={idx} className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
                <div>
                  <h3 className="mb-3 text-xl text-[#013759] font-normal tracking-tight">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify mb-8">
                    {policy.desc}
                  </p>
                </div>
                <div>
                  <a 
                    href={policy.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3.5 text-sm tracking-wider text-gray-700 hover:bg-slate-50 transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Policy PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
