import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

import { useCms } from '../hooks/useCms'

const categoryColors = {
  Measurement: 'bg-sky-50 text-sky-700 border-sky-100',
  Electronics: 'bg-violet-50 text-violet-700 border-violet-100',
  Fabrication: 'bg-orange-50 text-orange-700 border-orange-100',
  '3D Printing': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Power: 'bg-amber-50 text-amber-700 border-amber-100',
}

export function ServicesPage() {
  const { data: servicesData, loading } = useCms('services');
  const [openFaq, setOpenFaq] = useState(null);

  if (loading || !servicesData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  const tools = servicesData.tools || [];
  const faqs = servicesData.faqs || [];

  return (
    <div className="min-h-screen bg-white font-sans antialiased" style={{ fontWeight: 400 }}>

      {/* ── Hero ── */}
      <section className="relative flex min-h-[32vh] w-full items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-60"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-[#013759]/88 pointer-events-none" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">What We Offer</p>
          <h1 className={`text-white leading-tight ${servicesData.hero.titleSize || 'text-3xl sm:text-4xl'}`} style={{ fontWeight: 400 }}>
            {servicesData.hero.title}
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm text-white/70 leading-relaxed">
            {servicesData.hero.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col gap-20">

        {/* ── Facility Tools Grid ── */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Available Equipment</span>
            <h2 className="text-2xl text-[#013759]" style={{ fontWeight: 400 }}>Lab Tools & Equipment</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
            {tools.map((tool, idx) => (
              <div
                key={idx}
                className="p-7 flex flex-col gap-3 hover:bg-slate-50/60 transition-colors border-r border-slate-100 last:border-r-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm text-[#013759] leading-snug" style={{ fontWeight: 400 }}>
                    {tool.name}
                  </h3>
                  <span className={`shrink-0 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${categoryColors[tool.category] || 'bg-slate-50 text-gray-500 border-slate-100'}`}>
                    {tool.category}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed text-justify">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="flex flex-col gap-8 border-t border-slate-100 pt-16">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Explore More</span>
            <h2 className="text-2xl text-[#013759]" style={{ fontWeight: 400 }}>Our Facilities</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Electronics Labs', href: '/facilities/electronics-labs', desc: 'Oscilloscopes, power supplies, SMD rework, and more.' },
              { label: 'High End Computers', href: '/facilities/high-end-computers', desc: 'Intel i9, RTX 3090, 128 GB RAM workstations for CAD & simulation.' },
              { label: '3D Printing', href: '/facilities/3d-printing', desc: 'SLA and FDM printers for precision prototype manufacturing.' },
              { label: 'Fabrication Lab', href: '/facilities/fabrication-lab', desc: 'CO₂ laser cutter, CNC plasma, vinyl cutter, and more.' },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.href}
                className="flex flex-col gap-2 p-6 border border-slate-100 rounded-2xl hover:border-[#074887]/30 hover:bg-slate-50/40 transition-all duration-200 group"
              >
                <span className="text-sm text-[#013759] group-hover:text-[#074887] transition-colors" style={{ fontWeight: 400 }}>
                  {item.label}
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                <span className="text-[10px] text-[#074887] mt-auto">View →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── FAQ Section ── */}
        <div className="flex flex-col gap-8 border-t border-slate-100 pt-16">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Common Questions</span>
            <h2 className="text-2xl text-[#013759]" style={{ fontWeight: 400 }}>{servicesData.faqHeader.title}</h2>
            <p className="text-sm text-gray-400">{servicesData.faqHeader.description}</p>
          </div>

          <div className="flex flex-col divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span className="text-sm text-[#013759]" style={{ fontWeight: 400 }}>{faq.q}</span>
                  <span className={`shrink-0 text-[#074887] text-base transition-transform duration-200 ${openFaq === idx ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-7 pb-6">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
