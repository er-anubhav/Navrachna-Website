import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

const tools = [
  {
    name: 'Digital Vernier Caliper & Toolset',
    description: 'Precision measuring instrument for accurate dimensional analysis in prototyping and fabrication tasks.',
    category: 'Measurement',
  },
  {
    name: 'Handheld Soldering Iron (60W)',
    description: 'High-wattage soldering station suitable for PCB assembly, component soldering, and electronic prototyping.',
    category: 'Electronics',
  },
  {
    name: '3D Printer (FDM)',
    description: 'Fused Deposition Modelling printer for rapid plastic prototyping, proof-of-concept models, and component manufacturing.',
    category: '3D Printing',
  },
  {
    name: 'Digital Lux Meter',
    description: 'Measures ambient light intensity with precision — essential for optical, environmental, and IoT project testing.',
    category: 'Measurement',
  },
  {
    name: 'Laser Distance Meter',
    description: 'Non-contact laser-based distance measurement tool for architectural, structural, and design projects.',
    category: 'Measurement',
  },
  {
    name: 'Programmable Coil Winding Machine',
    description: 'CNC-controlled machine for precision winding of inductors, transformers, and motor coils in custom quantities.',
    category: 'Fabrication',
  },
  {
    name: 'Desktop Drilling Machine',
    description: 'Benchtop drill press for accurate hole placement in PCBs, enclosures, and mechanical prototyping assemblies.',
    category: 'Fabrication',
  },
  {
    name: 'Insulation Tester (Digital Meter)',
    description: 'Evaluates electrical insulation resistance in cables, motors, and transformer windings for safety validation.',
    category: 'Electronics',
  },
  {
    name: 'Universal USB Programmer',
    description: 'Multi-protocol chip programmer supporting a broad range of microcontrollers, EEPROMs, and flash memories.',
    category: 'Electronics',
  },
  {
    name: 'Oscilloscope (Digital Storage)',
    description: '100 MHz 4-channel DSO for real-time signal analysis, debugging embedded firmware, and circuit characterization.',
    category: 'Electronics',
  },
  {
    name: 'Function / Waveform Generator',
    description: 'Arbitrary waveform generator covering sine, square, pulse, ramp and noise outputs up to 25 MHz dual channel.',
    category: 'Electronics',
  },
  {
    name: 'DC Regulated Power Supply (SMPS)',
    description: '0–30 V / 0–10 A single-output switched-mode power supply with CV/CC mode and dual LED meters.',
    category: 'Power',
  },
  {
    name: 'SMD Rework Station',
    description: 'Combined hot-air gun (700 W, 100–450 °C) and electric soldering iron (40 W, 200–480 °C) for SMD component work.',
    category: 'Electronics',
  },
  {
    name: 'Digital Multimeter (Benchtop)',
    description: '4½-digit True-RMS bench multimeter measuring up to 1000 V DC/AC, 20 A, 20 MΩ resistance, capacitance, frequency, and diode test.',
    category: 'Measurement',
  },
]

const faqs = [
  {
    q: 'What is Navrachna Foundation for Entrepreneurship Development?',
    a: 'Navrachna Foundation for Entrepreneurship Development is a subsidiary of I.T.S. Engineering College that supports young entrepreneurs in commercializing their technologies and launching startups.',
  },
  {
    q: 'Who can benefit from the foundation?',
    a: 'Students, faculty, and staff looking to develop their entrepreneurial skills, test startup ideas, and connect with investors can benefit from the foundation.',
  },
  {
    q: 'What resources does the foundation provide?',
    a: 'The foundation offers mentorship, funding opportunities, networking support, and business development resources to help startups grow.',
  },
  {
    q: 'How does the foundation help bridge the gap between inventors and venture capitalists?',
    a: 'It connects innovators with industry experts, investors, and mentors to transform ideas into viable businesses.',
  },
]

const categoryColors = {
  Measurement: 'bg-sky-50 text-sky-700 border-sky-100',
  Electronics: 'bg-violet-50 text-violet-700 border-violet-100',
  Fabrication: 'bg-orange-50 text-orange-700 border-orange-100',
  '3D Printing': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Power: 'bg-amber-50 text-amber-700 border-amber-100',
}

export function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(null)

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
          <h1 className="text-3xl sm:text-4xl text-white leading-tight" style={{ fontWeight: 400 }}>
            Prototyping Facility of Navrachna Foundation
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm text-white/70 leading-relaxed">
            We provide a dynamic prototyping facility to help startups and entrepreneurs turn their ideas into working prototypes.
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
            <h2 className="text-2xl text-[#013759]" style={{ fontWeight: 400 }}>Everything You Need to Know About Our Spaces</h2>
            <p className="text-sm text-gray-400">Find answers to common questions about the Navrachna Foundation for Entrepreneurship Development.</p>
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
