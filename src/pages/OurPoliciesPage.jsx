import React, { useState, useEffect } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import { getPolicies } from '../services/policiesService'

const STATIC_POLICIES = [
  {
    title: "Patent Support Policy",
    summary: "Detailed guidelines and frameworks concerning monetary reimbursement, filing assistance, and ownership division for Indian and international patent applications submitted by incubated startups, students, and faculty.",
    file_url: "https://navrachnafoundation.com/wp-content/uploads/2025/03/PatentSupportPolicy.pdf"
  },
  {
    title: "Project Selection And Procurement Policy",
    summary: "Systematic protocols and compliance measures outlining how prototypes, innovative ideas, and hardware setups are selected, verified, and safely procured using institutional funding pools.",
    file_url: "https://navrachnafoundation.com/wp-content/uploads/2025/03/ProjectSelectoionAndProcurementPolicy.pdf"
  },
  {
    title: "Purchase Policy And SOP",
    summary: "Standard Operating Procedure (SOP) regarding budgeting, quote validations, transaction transparency, and vendor onboarding for specialized electronics, software licenses, and 3D printing filaments.",
    file_url: "https://navrachnafoundation.com/wp-content/uploads/2025/03/PurchasePolicyAndSOP.pdf"
  }
]

export function OurPoliciesPage() {
  const [policiesList, setPoliciesList] = useState(STATIC_POLICIES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLivePolicies() {
      setLoading(true)
      const { data } = await getPolicies()
      if (data && data.length > 0) {
        setPoliciesList(data)
      }
      setLoading(false)
    }
    fetchLivePolicies()
  }, [])

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
            Navrachna Foundation operates under strict compliance, intellectual property protection, and institutional governance protocols. Download our official policy documentation below.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-16 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-4" />
            <p className="text-sm text-gray-500">Loading governance policies from Supabase...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policiesList.map((item, idx) => (
              <div 
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex flex-col gap-4">
                  <div className="p-3 rounded-lg bg-blue-50/60 w-fit border border-blue-100/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#013759]">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-normal text-slate-900 group-hover:text-[#013759] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed text-justify">
                    {item.summary || item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <a
                    href={item.file_url || item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-normal text-white bg-[#013759] px-4 py-2.5 rounded hover:bg-[#074887] transition-colors w-full justify-center"
                  >
                    <span>Download Official Policy PDF</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  )
}
