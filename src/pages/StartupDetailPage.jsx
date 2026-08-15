import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getStartupBySlugOrId } from '../services/startupsService'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

export function StartupDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [startup, setStartup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true)
      const { data } = await getStartupBySlugOrId(slug)
      if (data) {
        setStartup(data)
      } else {
        setStartup(null)
      }
      setLoading(false)
    }

    if (slug) {
      fetchDetail()
    }
  }, [slug])

  const parse16Columns = (item) => {
    if (!item) return {}
    let parsed = {}
    if (item.description) {
      try {
        parsed = JSON.parse(item.description)
      } catch (e) {}
    }

    const primaryFounder = item.startup_founders?.[0]?.people

    return {
      company_name: item.name || parsed.company_name || 'Incubated Venture',
      founder_name: primaryFounder?.full_name || parsed.founder_name || 'N/A',
      is_women_founder: parsed.is_women_founder || (primaryFounder?.designation?.includes('Director') || false),
      cin_number: parsed.cin_number || 'N/A',
      sector: parsed.sector || item.startup_categories?.name || 'IT & Tech Services',
      website: item.website_url || parsed.website || 'N/A',
      stage: parsed.stage || (item.incubation_status === 'graduated' ? 'Graduated' : 'Early Traction'),
      incubation_status: item.incubation_status || (parsed.stage?.toLowerCase().includes('graduat') ? 'graduated' : 'incubated'),
      mobile_number: primaryFounder?.phone || parsed.mobile_number || 'N/A',
      email_id: primaryFounder?.email || parsed.email_id || 'N/A',
      date_of_incorporation: parsed.date_of_incorporation || item.cohort_year || 'N/A',
      date_of_incubation: parsed.date_of_incubation || 'N/A',
      dpiit_number: parsed.dpiit_number || 'N/A',
      startinup_registration_number: parsed.startinup_registration_number || 'N/A',
      revenue_in_lakhs: parseFloat(parsed.revenue_in_lakhs || 0.0),
      about_startup: parsed.about_startup || (typeof item.description === 'string' && !item.description.startsWith('{') ? item.description : 'Detailed profile information for this incubated venture will be published shortly.'),
      slug: item.slug || parsed.slug || '',
      logo_url: (parsed.logo_url !== undefined && parsed.logo_url !== null) ? parsed.logo_url : (item.logo_url || ''),
      custom_fields: Array.isArray(parsed.custom_fields) ? parsed.custom_fields : [],
      awards_and_recognitions: Array.isArray(parsed.awards_and_recognitions) ? parsed.awards_and_recognitions : [],
      patents: Array.isArray(parsed.patents) ? parsed.patents : []
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans font-normal">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#013759] mx-auto mb-4" />
          <p className="text-sm text-slate-500 font-normal">Loading startup profile details...</p>
        </div>
      </div>
    )
  }

  if (!startup) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 text-center font-sans font-normal">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl text-slate-900 font-normal mb-2">Startup Profile Not Found</h2>
          <p className="text-xs text-slate-500 mb-6 font-normal">The requested startup record could not be found or has been moved.</p>
          <Link
            to="/portfolio"
            style={{ color: '#ffffff' }}
            className="inline-flex items-center gap-2 bg-[#013759] hover:bg-[#074887] !text-white px-5 py-2.5 rounded-xl text-xs font-normal transition-colors"
          >
            Back to Portfolio Directory
          </Link>
        </div>
      </div>
    )
  }

  const p = parse16Columns(startup)
  const isGraduated = p.incubation_status === 'graduated' || p.stage.toLowerCase().includes('graduat')

  const getInitials = (name) => {
    if (!name) return 'ST'
    const words = name.trim().split(/\s+/)
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased font-normal pb-20">
      
      {/* Mini Banner Header */}
      <section className="relative flex min-h-[30vh] w-full items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-75"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#013759]/95 via-[#013759]/90 to-[#074887]/90 pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 w-full">
          <div className="flex items-center gap-2 text-xs text-white/70 mb-4 font-normal">
            <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-white font-normal">{p.company_name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-normal text-white leading-tight drop-shadow-md">
            {p.company_name}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-2xl font-normal">
            Incubated Venture under Navrachna Foundation for Entrepreneurship Development (NFED).
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="mx-auto max-w-5xl px-4 -mt-10 relative z-20">
        
        {/* Startup Overview Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
          
          <div className="flex items-start gap-5">
            {/* Company Logo Container */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-2xl border border-slate-200 p-3 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
              {p.logo_url && !imgError ? (
                <img
                  src={p.logo_url}
                  alt={p.company_name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-2xl font-mono text-[#013759] font-normal">{getInitials(p.company_name)}</span>
              )}
            </div>

            {/* Title & Badges */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-sky-50 text-[#074887] text-xs font-normal px-3 py-1 rounded-lg border border-sky-100">
                  {p.sector}
                </span>

                {isGraduated ? (
                  <span className="bg-purple-50 text-purple-700 text-xs font-normal px-3 py-1 rounded-lg border border-purple-200">
                    Graduated Venture
                  </span>
                ) : (
                  <span className="bg-emerald-50 text-emerald-800 text-xs font-normal px-3 py-1 rounded-lg border border-emerald-200">
                    Active Incubated
                  </span>
                )}

                {p.revenue_in_lakhs > 0 && (
                  <span className="bg-amber-50 text-amber-800 text-xs font-mono font-normal px-3 py-1 rounded-lg border border-amber-200">
                    ₹{p.revenue_in_lakhs} Lakhs Rev
                  </span>
                )}

                {p.is_women_founder && (
                  <span className="bg-pink-50 text-pink-700 text-xs font-normal px-3 py-1 rounded-lg border border-pink-200">
                    Women Led Venture
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl text-slate-900 font-normal mt-1">{p.company_name}</h2>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-normal">
                {p.founder_name !== 'N/A' && (
                  <span>Founder: <strong className="text-slate-800 font-normal">{p.founder_name}</strong></span>
                )}
                {p.date_of_incorporation !== 'N/A' && (
                  <span>Inc. Date: <strong className="text-slate-800 font-normal">{p.date_of_incorporation}</strong></span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 self-stretch md:self-auto shrink-0">
            {p.website && p.website !== 'N/A' && (
              <a
                href={p.website.startsWith('http') ? p.website : `https://${p.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ffffff' }}
                className="w-full md:w-auto text-center bg-[#013759] hover:bg-[#074887] !text-white px-5 py-2.5 rounded-xl text-xs font-normal transition-colors shadow-2xs flex items-center justify-center gap-2"
              >
                <span>Visit Official Website</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Master Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Left Main Column: Narrative, Awards, Patents */}
          <div className="md:col-span-2 flex flex-col gap-8">
            
            {/* About / Narrative */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <h3 className="text-base text-[#013759] font-normal border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#074887]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About the Venture</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line font-normal">
                {p.about_startup}
              </p>
            </div>

            {/* Awards & Recognitions Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <h3 className="text-base text-[#013759] font-normal border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4m6 0h4m-2-2v4m-5 11l-4 4-1-1 4-4m5 1l-1 1-4-4 1-1 4 4m-7-5a5 5 0 1110 0 5 5 0 01-10 0z" />
                </svg>
                <span>Awards & Recognitions</span>
              </h3>

              {p.awards_and_recognitions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.awards_and_recognitions.map((award, idx) => (
                    <div key={idx} className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 shrink-0 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-xs text-slate-900 font-normal">{typeof award === 'object' ? award.title : award}</h4>
                        {typeof award === 'object' && award.issuer && (
                          <span className="text-[11px] text-slate-500 font-normal">Issued by: {award.issuer}</span>
                        )}
                        {typeof award === 'object' && award.year && (
                          <span className="text-[10px] font-mono text-amber-800 font-normal">Year: {award.year}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 font-normal">
                  No specific awards or competition honors listed for this venture yet.
                </div>
              )}
            </div>

            {/* Patents & Intellectual Property (IP) Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <h3 className="text-base text-[#013759] font-normal border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Patents & Intellectual Property (IP)</span>
              </h3>

              {p.patents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.patents.map((pat, idx) => (
                    <div key={idx} className="bg-purple-50/50 border border-purple-200/80 rounded-xl p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 shrink-0 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-xs text-slate-900 font-normal">{typeof pat === 'object' ? pat.title : pat}</h4>
                        {typeof pat === 'object' && pat.number && (
                          <span className="text-[11px] font-mono text-purple-900 font-normal">Patent / Application No: {pat.number}</span>
                        )}
                        {typeof pat === 'object' && pat.status && (
                          <span className="text-[10px] font-normal text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded inline-block w-fit mt-1">Status: {pat.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 font-normal">
                  No registered patents or pending IP applications filed for this venture.
                </div>
              )}
            </div>

            {/* Custom Extensibility Fields */}
            {p.custom_fields.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                <h3 className="text-base text-[#013759] font-normal border-b border-slate-100 pb-3 mb-4">Additional Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.custom_fields.map((cf, idx) => (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="text-[11px] font-normal text-slate-500 block uppercase tracking-wider">{cf.key}</span>
                      <span className="text-xs text-slate-900 font-normal mt-0.5 block">{cf.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Key Specs & Contacts */}
          <div className="flex flex-col gap-6">
            
            {/* Official Registration & Stage Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col gap-4">
              <h3 className="text-sm font-normal text-slate-900 border-b border-slate-100 pb-2">Master Registration Data</h3>
              
              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <span className="text-slate-400 font-normal text-[11px] block">Corporate Identification No. (CIN)</span>
                  <span className="font-mono text-slate-800 font-normal">{p.cin_number}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-normal text-[11px] block">DPIIT Recognition Number</span>
                  <span className="font-mono text-slate-800 font-normal">{p.dpiit_number}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-normal text-[11px] block">StartinUP Registration Number</span>
                  <span className="font-mono text-slate-800 font-normal">{p.startinup_registration_number}</span>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <span className="text-slate-400 font-normal text-[11px] block">Incubation Stage</span>
                  <span className="text-slate-800 font-normal">{p.stage}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-normal text-[11px] block">Incubation Joining Date</span>
                  <span className="text-slate-800 font-normal">{p.date_of_incubation}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-normal text-[11px] block">Date of Incorporation</span>
                  <span className="text-slate-800 font-normal">{p.date_of_incorporation}</span>
                </div>
              </div>
            </div>

            {/* Founder & Contact Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col gap-4">
              <h3 className="text-sm font-normal text-slate-900 border-b border-slate-100 pb-2">Founder & Contact Info</h3>
              
              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <span className="text-slate-400 font-normal text-[11px] block">Primary Founder</span>
                  <span className="text-slate-900 font-normal text-sm">{p.founder_name}</span>
                </div>

                {p.email_id !== 'N/A' && (
                  <div>
                    <span className="text-slate-400 font-normal text-[11px] block">Email Address</span>
                    <a href={`mailto:${p.email_id}`} className="text-[#074887] hover:underline font-mono text-xs truncate block font-normal">
                      {p.email_id}
                    </a>
                  </div>
                )}

                {p.mobile_number !== 'N/A' && (
                  <div>
                    <span className="text-slate-400 font-normal text-[11px] block">Mobile Contact</span>
                    <span className="font-mono text-slate-800 font-normal">{p.mobile_number}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}
