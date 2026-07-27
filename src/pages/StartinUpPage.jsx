import React, { useState } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import { HeaderV1 } from '../components/HeaderV1'
import { FooterV1 } from '../components/FooterV1'

export function StartinUpPage() {
  const [copiedCode, setCopiedCode] = useState(false)

  const STATS = [
    { value: "96+", label: "Projects Developed", sub: "Funded & mentored" },
    { value: "66+", label: "Patents Filed", sub: "Protecting deep tech IP" },
    { value: "₹2.87 Cr", label: "DST Grant Received", sub: "NewGen IEDC programme" },
    { value: "₹1.59 Cr", label: "MSME Grant Received", sub: "MSME Champions Scheme" }
  ]

  const INCENTIVES = [
    {
      title: "Sustenance Allowance",
      amount: "₹17,500 / month",
      duration: "For 1 Year",
      desc: "Monthly sustenance support targeted at idea-stage ventures to allow founders to focus entirely on product development. Available to up to 25 startups per incubator annually with an additional 50% allowance for specified categories (e.g. women-led or regionally focused).",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: "Prototype Development Grant",
      amount: "Up to ₹5 Lakhs",
      duration: "One-time Seed",
      desc: "Direct financial support for developing, testing, and refining your hardware or software prototypes. Validates your MVP before commercialization, with an extra 50% grant extension for women-led, differently-abled, or rural-focused startups.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      title: "Seed Capital & Marketing",
      amount: "Up to ₹7.5 Lakhs",
      duration: "Commercial Phase",
      desc: "Essential capital boost to launch go-to-market strategies, marketing campaigns, and growth setups. Includes an extra 50% scale-up assistance for specified focus categories to accelerate commercial validation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      title: "Patent Filing Support",
      amount: "Up to ₹2L domestic / ₹10L international",
      duration: "IP Protection",
      desc: "Up to ₹2 Lakhs for domestic patents and up to ₹10 Lakhs for international patents — covering filing fees, agent charges, and related costs to protect proprietary innovations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      title: "Event Participation Support",
      amount: "₹50,000 national / ₹1 Lakh international",
      duration: "Global Connect",
      desc: "Reimbursement up to ₹50,000 for national events and ₹1 Lakh for international events — covering stall charges, travel, and exhibition fees to expand startup visibility.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      )
    }
  ]

  const TIMELINE = [
    {
      step: "STEP 00",
      title: "Pre-Scouting",
      desc: "Navrachna Foundation proactively scouts promising ideas and innovations from campuses, events, and networks before formal applications open.",
      color: "#6366f1",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>)
    },
    {
      step: "STEP 01",
      title: "Online Form Submission",
      desc: "Fill the online application form with correct startup details, idea briefs, and your technology commercialization roadmap to help our screening committee evaluate your proposal.",
      color: "#10b981",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>)
    },
    {
      step: "STEP 02",
      title: "Preliminary Screening",
      desc: "The screening team at Navrachna Foundation evaluates your submission based on innovation, feasibility, and market potential. We will respond within 48 hours.",
      color: "#3b82f6",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>)
    },
    {
      step: "STEP 03",
      title: "Shortlisting of Startup",
      desc: "Based on preliminary screening results, selected startups are shortlisted and notified to proceed to the next stage of the incubation process.",
      color: "#f59e0b",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)
    },
    {
      step: "STEP 04",
      title: "Final Pitch Presentation",
      desc: "Shortlisted startups present their ideas before an expert panel comprising the incubation team and industry mentors in a structured pitch session.",
      color: "#ec4899",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>)
    },
    {
      step: "STEP 05",
      title: "Evaluation & Selection",
      desc: "The expert panel evaluates pitches on innovation, technical feasibility, commercial potential, and team strength. Final selections are communicated officially.",
      color: "#8b5cf6",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>)
    },
    {
      step: "STEP 06",
      title: "Induction & Agreement Signing",
      desc: "Selected startups are formally inducted into the Incubation Program. Agreements are signed covering incubation terms, IP rights, milestones, and support provisions.",
      color: "#ef4444",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>)
    },
    {
      step: "STEP 07",
      title: "Growth, Monitoring & Graduation",
      desc: "Startups are actively supported through regular mentorship meets, progress tracking, milestone reviews, and networking — culminating in a formal graduation from the incubation program.",
      color: "#06b6d4",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>)
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        
        {/* Hero Section */}
        <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden py-24">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
              style={{ backgroundImage: `url(${heroImage})` }}
            ></div>
            <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#ffffff] px-4 py-1.5 text-xs tracking-wider text-[#013759] uppercase">
              Govt. of Uttar Pradesh Initiative
            </span>
            <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
              Build, Validate, and Scale <br /> With <span className="inline-block"><span className="text-[#10b981]">S</span><span className="text-[#ec4899]">t</span><span className="text-[#3b82f6]">a</span><span className="text-[#f59e0b]">r</span><span className="text-[#ef4444]">t</span><span className="text-[#8b5cf6]">i</span><span className="text-[#06b6d4]">n</span><span className="text-[#ec4899]">U</span><span className="text-[#10b981]">P</span></span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
              A structured, supportive ecosystem to turn disruptive technology concepts into high-impact, scalable ventures. Anchored at the I.T.S Incubation Center Navrachna Foundation.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#incubation-form" className="rounded-xl bg-[#ffffff] px-8 py-4 font-normal text-[#013759] shadow-lg hover:-translate-y-1 transition-all duration-300">
                Register for Incubation
              </a>
              <a href="#incentives" className="rounded-xl border border-white/30 bg-white px-8 py-4 font-normal text-[#013759] backdrop-blur-md hover:-translate-y-1 transition-all duration-300">
                Explore UP Incentives
              </a>
            </div>
          </div>
        </section>

        {/* Core Stats Section */}
        <section className="relative z-20 -mt-16 w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, idx) => (
                <div key={idx} className="rounded-3xl border border-white/10 bg-white/85 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300">
                  <div className="text-3xl tracking-tight text-[#013759]">{stat.value}</div>
                  <div className="mt-2 text-sm font-semibold text-gray-800">{stat.label}</div>
                  <div className="mt-1 text-xs text-gray-500">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alignment & Overview Section */}
        <section className="w-full py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              <div className="flex-1 text-left">
                <span className="text-xs font-semibold tracking-widest text-[#074887] uppercase block mb-4">OUR MISSION ALIGNMENT</span>
                <h2 className="text-3xl md:text-5xl font-normal text-[#013759] tracking-tight leading-tight mb-8">
                  Mirroring StartinUP Priorities
                </h2>
                <div className="text-gray-600 space-y-6 text-justify leading-relaxed text-sm sm:text-base font-normal">
                  <p>
                    Navrachna Foundation for Entrepreneurship Development is dedicated to building a vibrant innovation and start-up ecosystem that empowers young entrepreneurs to translate ideas into high-impact, technology-driven ventures.
                  </p>
                  <p>
                    By mirroring the Government of Uttar Pradesh’s StartinUP priorities—innovation-led growth, ease of doing business, inclusive regional entrepreneurship, and access to seed capital—Navrachna acts as a complementary execution partner.
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full grid grid-cols-1 gap-6">
                <div className="rounded-2xl border border-slate bg-slate-50/40 p-8 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300">
                  <h3 className="text-lg text-[#013759] mb-3">Policy Access & Perks</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Direct handholding to unlock UP StartinUP financial allowances, tax exemptions, and government subsidy portals.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate bg-slate-50/40 p-8 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300">
                  <h3 className="text-lg text-[#013759] mb-3">Infrastructure Access</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Premium co-working hot desks, private offices, electronics testing labs, high-end AI servers, and fabrication workspaces.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate bg-slate-50/40 p-8 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300">
                  <h3 className="text-lg text-[#013759] mb-3">Dedicated Domain Mentors</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Personalized 1-to-1 mentorship maps with seasoned corporate leaders, technical experts, and successful academic alumni.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Incentives Section */}
        <section id="incentives" className="w-full py-24 bg-[#f8fafc] border-t border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase">
              POLICY INCENTIVES
            </span>
            <h2 className="mb-8 font-normal text-3xl md:text-5xl tracking-tight text-[#013759]">
              Incentives Under <span className="inline-block"><span className="text-[#10b981]">S</span><span className="text-[#ec4899]">t</span><span className="text-[#3b82f6]">a</span><span className="text-[#f59e0b]">r</span><span className="text-[#ef4444]">t</span><span className="text-[#8b5cf6]">i</span><span className="text-[#06b6d4]">n</span><span className="text-[#ec4899]">U</span><span className="text-[#10b981]">P</span></span>
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {INCENTIVES.map((inc, idx) => (
                <div key={idx} className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
                  <h3 className="mb-2 text-lg tracking-tight text-[#013759] transition-colors duration-300">
                    {inc.title}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-gray-700 mb-4">
                    {inc.amount} • {inc.duration}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify">
                    {inc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Incubation Process Timeline */}
        <section className="w-full py-24 bg-white overflow-hidden">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-normal text-[#013759] tracking-tight">
                Incubation <span className="inline-block"><span className="text-[#10b981]">P</span><span className="text-[#ec4899]">r</span><span className="text-[#3b82f6]">o</span><span className="text-[#f59e0b]">c</span><span className="text-[#ef4444]">e</span><span className="text-[#8b5cf6]">s</span><span className="text-[#06b6d4]">s</span></span>
              </h2>
              <p className="text-sm text-gray-500 max-w-4xl mx-auto mt-4">
                Follow these simple structured steps to lock in incubation slots, secure mentorship, and claim UP State seed grants.
              </p>
            </div>

            {/* Custom Vertical Timeline with glowing winding track */}
            <div className="relative">
              
              {/* Center/Right Connector Track for Desktop */}
              <div className="absolute right-[60px] md:right-1/2 top-10 bottom-10 w-1.5 bg-linear-to-b from-emerald-400 via-blue-500 to-purple-600 rounded-full z-0 transform translate-x-1/2 hidden md:block" />

              <div className="space-y-20 relative z-10">
                {TIMELINE.map((item, idx) => {
                  const isEven = idx % 2 === 0
                  return (
                    <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                      
                      {/* Left Block: Content for Even, Spacer for Odd */}
                      <div className={`w-full md:w-[42%] text-center md:text-right ${isEven ? 'md:order-1' : 'md:order-3 md:text-left'}`}>
                        <div className="inline-block text-md  tracking-wider mb-2" style={{ color: item.color }}>
                          {item.step}
                        </div>
                        <h3 className="text-2xl font-normal text-[#013759] mb-3">{item.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed text-justify md:text-inherit">
                          {item.desc}
                        </p>
                      </div>

                      {/* Center Glowing Circle Node */}
                      <div className="w-full md:w-[16%] flex justify-center md:order-2">
                        <div 
                          className="relative h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-xl border-4 transition-all duration-300 hover:scale-110"
                          style={{ borderColor: item.color, boxShadow: `0 0 20px ${item.color}33` }}
                        >
                          <div className="text-gray-700">
                            {React.cloneElement(item.icon, { style: { color: item.color } })}
                          </div>
                          
                          {/* Pulsing Outer Glow */}
                          <div 
                            className="absolute -inset-1 rounded-full opacity-30 animate-ping pointer-events-none" 
                            style={{ backgroundColor: item.color }} 
                          />
                        </div>
                      </div>

                      {/* Right Block: Spacer for Even, Content for Odd */}
                      <div className={`w-full md:w-[42%] ${isEven ? 'md:order-3' : 'md:order-1'}`} />
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </section>
    </div>
  )
}
