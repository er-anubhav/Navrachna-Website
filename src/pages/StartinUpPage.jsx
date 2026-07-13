import React, { useState } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import startinupLogo from '../assets/navrachna_images/startinup_logo.png'
import incubationProcess from '../assets/navrachna_images/incubation_process.png'

// ── Brand palette extracted from the Startin-UP logo ─────────────────────────
// Orange  → #F47B20   Deep Blue → #1E3A8A
const ORANGE = '#F47B20'
const BLUE   = '#1E3A8A'

export function StartinUpPage() {
  const STATS = [
    { value: "96+",      label: "Projects Developed", sub: "Funded & mentored" },
    { value: "66+",      label: "Patents Filed",       sub: "Protecting deep tech IP" },
    { value: "₹2.87 Cr", label: "DST Grant Received",  sub: "NewGen IEDC programme" },
    { value: "₹1.59 Cr", label: "MSME Grant Received", sub: "MSME Champions Scheme" }
  ]

  const INCENTIVES = [
    {
      title: "Sustenance Allowance",
      amount: "₹17,500 / month",
      duration: "For 1 Year",
      accent: ORANGE,
      desc: "Monthly sustenance support targeted at idea-stage ventures to allow founders to focus entirely on product development. Available to up to 25 startups per incubator annually with an additional 50% allowance for specified categories (e.g. women-led or regionally focused).",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: "Prototype Development Grant",
      amount: "Up to ₹5 Lakhs",
      duration: "One-time Seed",
      accent: BLUE,
      desc: "Direct financial support for developing, testing, and refining your hardware or software prototypes. Validates your MVP before commercialization, with an extra 50% grant extension for women-led, differently-abled, or rural-focused startups.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      title: "Seed Capital & Marketing",
      amount: "Up to ₹7.5 Lakhs",
      duration: "Commercial Phase",
      accent: ORANGE,
      desc: "Essential capital boost to launch go-to-market strategies, marketing campaigns, and growth setups. Includes an extra 50% scale-up assistance for specified focus categories to accelerate commercial validation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      title: "Patent Filing Support",
      amount: "Up to ₹2L domestic / ₹10L international",
      duration: "IP Protection",
      accent: BLUE,
      desc: "Up to ₹2 Lakhs for domestic patents and up to ₹10 Lakhs for international patents — covering filing fees, agent charges, and related costs to protect proprietary innovations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      title: "Event Participation Support",
      amount: "₹50k national / ₹1L international",
      duration: "Global Connect",
      accent: ORANGE,
      desc: "Reimbursement up to ₹50,000 for national events and ₹1 Lakh for international events — covering stall charges, travel, and exhibition fees to expand startup visibility.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      )
    }
  ]

  const TIMELINE = [
    {
      step: "STEP 01",
      title: "Fill the Form",
      desc: "Fill the attached form with correct startup details and idea briefs to help our screening committee understand your technology commercialization roadmap.",
      color: ORANGE,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      step: "STEP 02",
      title: "Wait for a Response",
      desc: "The screening team at Navrachna Foundation will evaluate your pitch and reach back within 48 hours to schedule a diagnostic presentation.",
      color: BLUE,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.5 1.5" />
          <path d="M14 11l-3.5-3.5" />
        </svg>
      )
    },
    {
      step: "STEP 03",
      title: "Discuss & Align",
      desc: "Meet our incubation board to discuss incubation goals, technical scope, and prototype objectives. Finalize registrations to lock in your UP state support incentives.",
      color: ORANGE,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      step: "STEP 04",
      title: "Regular Meets & Updates",
      desc: "Launch in our state-of-the-art incubation spaces! Comply with milestones, participate in training cohorts, and submit monthly updates while we connect your startup to UP venture networks.",
      color: BLUE,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-60"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          {/* Two-tone gradient overlay matching logo colours */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${BLUE}ee 0%, ${BLUE}cc 50%, ${ORANGE}bb 100%)`
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* StartinUP Logo */}
          <div className="flex justify-center mb-6">
            <div
              className="rounded-2xl p-3 shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.96)', boxShadow: `0 16px 48px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15)` }}
            >
              <img
                src={startinupLogo}
                alt="StartinUP – Govt. of Uttar Pradesh"
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>

          {/* Badge */}
          <span
            className="mb-5 inline-block whitespace-nowrap rounded-full px-4 py-1.5 text-xs tracking-wider uppercase font-medium"
            style={{ background: `${ORANGE}22`, color: '#fff', border: `1px solid ${ORANGE}55` }}
          >
            Govt. of Uttar Pradesh Initiative
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            Build, Validate, and Scale{' '}
            <br />With{' '}
            {/* "StartinUP" rendered in alternating logo colors */}
            <span className="inline-flex items-center gap-0">
              {'StartinUP'.split('').map((ch, i) => (
                <span key={i} style={{ color: i % 2 === 0 ? '#fff' : ORANGE }}>{ch}</span>
              ))}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
            A structured, supportive ecosystem to turn disruptive technology concepts into high-impact, scalable ventures. Anchored at the ITS Incubation Center — Navrachna Foundation.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#incubation-form"
              className="rounded-xl px-8 py-4 font-medium text-white shadow-lg hover:-translate-y-1 transition-all duration-300 text-sm"
              style={{ background: ORANGE, boxShadow: `0 8px 32px ${ORANGE}55` }}
            >
              Register for Incubation
            </a>
            <a
              href="#incentives"
              className="rounded-xl px-8 py-4 font-normal text-white border hover:-translate-y-1 transition-all duration-300 text-sm"
              style={{ borderColor: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
            >
              Explore UP Incentives
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="relative z-20 -mt-16 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-3xl border bg-white/90 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: idx % 2 === 0 ? `${ORANGE}30` : `${BLUE}30` }}
              >
                <div
                  className="text-3xl tracking-tight font-light"
                  style={{ color: idx % 2 === 0 ? ORANGE : BLUE }}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-gray-800">{stat.label}</div>
                <div className="mt-1 text-xs text-gray-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alignment & Overview ──────────────────────────────────────────── */}
      <section className="w-full py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            <div className="flex-1 text-left">
              <span
                className="text-xs font-semibold tracking-widest uppercase block mb-4"
                style={{ color: ORANGE }}
              >
                OUR MISSION ALIGNMENT
              </span>
              <h2
                className="text-3xl md:text-5xl font-normal tracking-tight leading-tight mb-8"
                style={{ color: BLUE }}
              >
                Mirroring StartinUP Priorities
              </h2>
              <div className="text-gray-600 space-y-6 text-justify leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Navrachna Foundation for Entrepreneurship Development is dedicated to building a vibrant innovation and start-up ecosystem that empowers young entrepreneurs to translate ideas into high-impact, technology-driven ventures.
                </p>
                <p>
                  By mirroring the Government of Uttar Pradesh's StartinUP priorities — innovation-led growth, ease of doing business, inclusive regional entrepreneurship, and access to seed capital — Navrachna acts as a complementary execution partner.
                </p>
              </div>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 gap-5">
              {[
                {
                  title: "Policy Access & Perks",
                  body: "Direct handholding to unlock UP StartinUP financial allowances, tax exemptions, and government subsidy portals.",
                  accent: ORANGE
                },
                {
                  title: "Infrastructure Access",
                  body: "Premium co-working hot desks, private offices, electronics testing labs, high-end AI servers, and fabrication workspaces.",
                  accent: BLUE
                },
                {
                  title: "Dedicated Domain Mentors",
                  body: "Personalized 1-to-1 mentorship maps with seasoned corporate leaders, technical experts, and successful academic alumni.",
                  accent: ORANGE
                }
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-7 transition-all duration-300 hover:shadow-md"
                  style={{
                    border: `1px solid ${card.accent}22`,
                    background: `${card.accent}06`
                  }}
                >
                  <div
                    className="w-1 h-6 rounded-full mb-4"
                    style={{ background: card.accent }}
                  />
                  <h3 className="text-lg mb-2" style={{ color: BLUE }}>{card.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Incentives ────────────────────────────────────────────────────── */}
      <section
        id="incentives"
        className="w-full py-24 border-t border-b"
        style={{ background: `linear-gradient(180deg, #f8fafc 0%, ${BLUE}08 100%)`, borderColor: `${BLUE}15` }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="mb-4 inline-block whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase"
            style={{ background: `${ORANGE}15`, color: ORANGE }}
          >
            POLICY INCENTIVES
          </span>
          <h2
            className="mb-12 font-normal text-3xl md:text-5xl tracking-tight"
            style={{ color: BLUE }}
          >
            Incentives Under{' '}
            <span
              className="font-medium"
              style={{
                background: `linear-gradient(90deg, ${BLUE}, ${ORANGE})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              StartinUP
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INCENTIVES.map((inc, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
                style={{ border: `1px solid ${inc.accent}25` }}
              >
                {/* Icon badge */}
                <div
                  className="mb-5 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${inc.accent}15`, color: inc.accent }}
                >
                  {inc.icon}
                </div>

                <h3 className="mb-2 text-base font-medium tracking-tight" style={{ color: BLUE }}>
                  {inc.title}
                </h3>

                <div
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold mb-4"
                  style={{ background: `${inc.accent}12`, color: inc.accent }}
                >
                  {inc.amount} · {inc.duration}
                </div>

                <p className="text-sm text-gray-500 leading-relaxed text-justify">{inc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Incubation Process ────────────────────────────────────────── */}
      <section className="w-full py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left: heading + description + steps summary */}
            <div className="flex-1 text-left">
              <span
                className="text-xs font-semibold tracking-widest uppercase block mb-4"
                style={{ color: ORANGE }}
              >
                HOW IT WORKS
              </span>
              <h2
                className="text-3xl md:text-5xl font-normal tracking-tight mb-6"
                style={{ color: BLUE }}
              >
                Incubation{' '}
                <span
                  style={{
                    background: `linear-gradient(90deg, ${ORANGE}, ${BLUE})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Process
                </span>
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-10 max-w-md">
                Follow these simple structured steps to lock in incubation slots, secure mentorship, and claim UP State seed grants.
              </p>

              {/* Step summary list */}
              <div className="flex flex-col gap-5">
                {TIMELINE.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: item.color }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: BLUE }}>{item.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: official infographic */}
            <div className="flex-shrink-0 flex justify-center lg:justify-end">
              <div
                className="rounded-3xl overflow-hidden shadow-2xl"
                style={{ boxShadow: `0 32px 80px ${BLUE}22` }}
              >
                <img
                  src={incubationProcess}
                  alt="Incubation Process — Step by step guide"
                  className="w-full max-w-xs sm:max-w-sm object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
