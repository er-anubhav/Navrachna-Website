import React, { useState, useEffect } from 'react'
import heroImage from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'
import { getPolicies } from '../../services/policiesService'

const STATIC_POLICIES = [
  {
    id: "patent-support",
    title: "Patent Support & IPR Policy",
    category: "Intellectual Property",
    badge: "Ministry Compliant",
    summary: "Detailed guidelines and frameworks concerning monetary reimbursement, filing assistance, and ownership division for Indian and international patent applications submitted by incubated startups, students, and faculty.",
    highlights: [
      "100% assistance for patent filing and IP registration",
      "Reimbursement pool for government search & filing fees",
      "Clear revenue sharing & IP ownership division ratio"
    ],
    file_url: "https://navrachnafoundation.com/wp-content/uploads/2025/03/PatentSupportPolicy.pdf"
  },
  {
    id: "project-procurement",
    title: "Project Selection & Procurement Policy",
    category: "Grant & Project SOP",
    badge: "NISP Aligned",
    summary: "Systematic protocols and compliance measures outlining how prototypes, innovative ideas, and hardware setups are selected, verified, and safely procured using institutional and government funding pools.",
    highlights: [
      "Transparent multi-stage expert committee selection",
      "Direct vendor procurement protocols for prototyping",
      "Audited allocation of seed grant & innovation funds"
    ],
    file_url: "https://navrachnafoundation.com/wp-content/uploads/2025/03/ProjectSelectoionAndProcurementPolicy.pdf"
  },
  {
    id: "purchase-sop",
    title: "Purchase Policy & Financial SOP",
    category: "Financial Compliance",
    badge: "Audited Standard",
    summary: "Standard Operating Procedure (SOP) regarding budgeting, quote validations, transaction transparency, and vendor onboarding for specialized electronics, software licenses, and 3D printing filaments.",
    highlights: [
      "Triple-quote validation SOP for major equipment",
      "Fast-track consumable purchase channel for startups",
      "Quarterly financial auditing and compliance reports"
    ],
    file_url: "https://navrachnafoundation.com/wp-content/uploads/2025/03/PurchasePolicyAndSOP.pdf"
  },
  {
    id: "incubation-sop",
    title: "Incubation SOP & Infrastructure Access",
    category: "Operations & Governance",
    badge: "Institutional Standard",
    summary: "Governing terms for physical office allocation, 24/7 high-end lab utilization, mentor matching, FabLab equipment safety protocols, and incubator code of conduct.",
    highlights: [
      "Subsidized co-working space & dedicated cabins",
      "Lab access safety protocols & machine reservation",
      "Graduation criteria & milestone review schedule"
    ],
    file_url: "https://navrachnafoundation.com/wp-content/uploads/2025/03/PurchasePolicyAndSOP.pdf"
  },
  {
    id: "student-faculty-policy",
    title: "Student & Faculty Startup Policy",
    category: "Academic Integration",
    badge: "NISP & AICTE",
    summary: "Comprehensive framework enabling student founders to claim academic credits, attendance relaxation, and deferred placement options while building ventures, along with consultancy norms for faculty mentors.",
    highlights: [
      "Academic credit allowance for prototype milestones",
      "Deferred placement option for student founders",
      "Faculty advisory equity & consultancy guidelines"
    ],
    file_url: "https://navrachnafoundation.com/wp-content/uploads/2025/03/PatentSupportPolicy.pdf"
  },
  {
    id: "equity-royalty",
    title: "Equity & Revenue Sharing Policy",
    category: "Investment Terms",
    badge: "Founder-Friendly",
    summary: "Transparent pre-incubation and incubation equity terms ranging from 0% to 5% based on institutional seed support, infrastructure grants, and advisory participation.",
    highlights: [
      "Zero equity pre-incubation options for student ideas",
      "Fixed 2-5% equity ceiling for seed-funded ventures",
      "Clear exit clause & buyback mechanisms"
    ],
    file_url: "https://navrachnafoundation.com/wp-content/uploads/2025/03/ProjectSelectoionAndProcurementPolicy.pdf"
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
        // Merge backend data if available while maintaining structured fields
        const formatted = data.map((p, idx) => ({
          id: p.id || `policy-${idx}`,
          title: p.title || "Governance Policy",
          category: p.category || "Governance",
          badge: "Official Document",
          summary: p.summary || p.desc || "Official governance policy document published by Navrachna Foundation.",
          highlights: [
            "Official institutional policy compliance",
            "Approved by Governing Body & Ministry standards",
            "Direct downloadable PDF document"
          ],
          file_url: p.file_url || p.link || "#"
        }))
        setPoliciesList(formatted)
      }
      setLoading(false)
    }
    fetchLivePolicies()
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      
      {/* Hero Banner */}
      <section className="relative w-full bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Navrachna Policies Background" 
            className="w-full h-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#074887] via-[#074887]/95 to-[#013759]/90" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-8">
            Incubation Policies
          </h1>

          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="https://navrachnafoundation.com/wp-content/uploads/2025/03/PatentSupportPolicy.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded text-sm font-normal text-[#074887] hover:bg-slate-100 transition-colors shadow-md"
              style={{ color: '#074887' }}
            >
              <span>Download Master Policy PDF</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-[#074887] border border-white/30 px-6 py-3 rounded text-sm font-normal text-white hover:bg-white/10 transition-colors"
            >
              <span>Contact Governance Cell</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-normal text-slate-900">NISP Aligned</div>
              <div className="text-xs text-slate-500 mt-1">100% Ministry of Education Innovation Cell compliant</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md flex items-start gap-4">
            <div className="p-3 rounded-lg bg-sky-50 text-[#074887] shrink-0 border border-sky-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-normal text-slate-900">IPR Support</div>
              <div className="text-xs text-slate-500 mt-1">Full patent filing & legal assistance reimbursement</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md flex items-start gap-4">
            <div className="p-3 rounded-lg bg-sky-50 text-[#074887] shrink-0 border border-sky-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-normal text-slate-900">Transparent SOP</div>
              <div className="text-xs text-slate-500 mt-1">Audited procurement & grant allocation rules</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md flex items-start gap-4">
            <div className="p-3 rounded-lg bg-sky-50 text-[#074887] shrink-0 border border-sky-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-normal text-slate-900">0-5% Equity</div>
              <div className="text-xs text-slate-500 mt-1">Founder-friendly incubation equity framework</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight">
                Official Governance & Sop Documents
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Download verified policy guidelines approved by the Governing Board and Ministry committees.
              </p>
            </div>
            <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 shrink-0 w-fit">
              Updated: March 2026 Edition
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#074887] mx-auto mb-4" />
              <p className="text-sm text-slate-600">Loading governance policies...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {policiesList.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group text-left"
                >
                  <div>
                    {/* Badge & Category */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                        {item.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-normal text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{item.badge}</span>
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2.5 rounded-lg bg-sky-50 text-[#074887] shrink-0 border border-sky-100/60 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2l6 6m-6-6v6h6M16 13H8m8 4H8" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-normal text-[#013759] group-hover:text-[#074887] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-5">
                      {item.summary}
                    </p>

                    {/* Key Highlights Checklist */}
                    {item.highlights && (
                      <ul className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Download Action */}
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full text-xs font-normal bg-[#074887] py-3 px-4 rounded-lg hover:bg-[#013759] transition-colors shadow-xs"
                      style={{ color: '#ffffff' }}
                    >
                      <span style={{ color: '#ffffff' }}>Download Policy Document (PDF)</span>
                      <svg className="w-4 h-4 shrink-0" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* National Policy Alignment Section */}
          <div className="mt-16 bg-linear-to-br from-slate-50 to-sky-50/50 rounded-2xl p-8 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-normal text-[#074887] bg-white px-3 py-1 rounded-full border border-sky-200">
                <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>National Innovation Framework</span>
              </div>
              <h3 className="text-2xl font-normal text-[#013759]">
                National Innovation & Start-up Policy (NISP) Alignment
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Navrachna Foundation for Entrepreneurship Development strictly implements Ministry of Education Innovation Cell (MIC) and AICTE guidelines for Higher Education Institutions. Our policies guarantee complete intellectual property protection, academic credit allocation, and seed capital access for student and faculty innovators.
              </p>
            </div>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-[#074887] text-white px-6 py-3 rounded text-xs font-normal hover:bg-[#013759] transition-colors shrink-0 shadow-xs"
              style={{ color: '#ffffff' }}
            >
              <span style={{ color: '#ffffff' }}>Inquire With Legal & IPR Cell</span>
              <svg className="w-4 h-4 text-white" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>
      </main>

    </div>
  )
}

