import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'

const tools = [
  {
    name: 'Digital Storage Oscilloscope (100MHz 4-Ch)',
    description: 'Real-time signal analysis, embedded firmware debugging, and high-frequency circuit characterization.',
    category: 'Electronics',
    specs: ['100 MHz Bandwidth', '4 Analog Channels', '1 GSa/s Sample Rate']
  },
  {
    name: 'Formlabs SLA High-Precision 3D Printer',
    description: 'Stereolithography 3D printer for ultra-high-resolution medical, optical, and mechanical prototype components.',
    category: '3D Printing',
    specs: ['25 Micron Layer Thickness', 'Resin Stereolithography', 'Smooth Surface Finish']
  },
  {
    name: 'CO₂ Laser Cutting & Engraving Machine',
    description: 'Precision 80W CO₂ laser cutter for acrylic, wood, leather, and sheet material prototyping.',
    category: 'Fabrication',
    specs: ['80W Sealed CO₂ Tube', '900x600mm Workbed', 'Air Assist Pump']
  },
  {
    name: 'CNC Plasma Cutting Machine',
    description: 'Heavy-duty industrial plasma torch for cutting sheet metal, steel plates, and chassis components.',
    category: 'Fabrication',
    specs: ['High-Frequency Arc Start', 'Heavy Metal Cutting', 'CNC G-Code Control']
  },
  {
    name: 'Intel Unnati AI & High-End Compute Workstation',
    description: 'Dedicated GPU workstation with 128 GB RAM and NVIDIA RTX GPUs for deep learning, CAD, and FEA simulation.',
    category: 'Software & Compute',
    specs: ['NVIDIA RTX 3090 / A6000', '128 GB DDR5 RAM', 'Intel OpenVINO Toolkit']
  },
  {
    name: 'Digital Vernier Caliper & Metrology Set',
    description: 'Precision measuring tools for accurate dimensional tolerance analysis in mechanical prototypes.',
    category: 'Measurement',
    specs: ['0.01 mm Accuracy', 'LCD Digital Display', 'Hardened Stainless Steel']
  },
  {
    name: 'SMD Hot-Air Rework Station (700W)',
    description: 'Combined temperature-controlled hot air gun and soldering iron for micro-surface mount device rework.',
    category: 'Electronics',
    specs: ['700W Hot Air Gun', 'PID Temp Control', 'ESD-Safe Architecture']
  },
  {
    name: 'Programmable Automatic Coil Winding Machine',
    description: 'Motorized coil winding unit with digital turn counter for custom inductors, transformers, and motor stators.',
    category: 'Fabrication',
    specs: ['Digital Turn Counter', 'Multi-Spindle Motor', 'Custom Transformer Winding']
  },
  {
    name: '4½-Digit True-RMS Benchtop Multimeter',
    description: 'High-precision bench multimeter for voltage, current, resistance, frequency, and capacitance logging.',
    category: 'Measurement',
    specs: ['True-RMS AC/DC', '1000V / 20A Input', 'Data Logging Interface']
  },
  {
    name: 'DC Regulated Dual SMPS Power Supply',
    description: 'Dual-channel 0-30V / 0-10A benchtop power supply with constant voltage and constant current modes.',
    category: 'Power',
    specs: ['0-30V / 0-10A Variable', 'CV/CC Mode Indication', 'Over-Current Protection']
  },
  {
    name: 'Arbitrary Waveform / Function Generator',
    description: 'Dual-channel 25 MHz function generator producing sine, square, ramp, pulse, and arbitrary signals.',
    category: 'Electronics',
    specs: ['25 MHz Dual Channel', 'Built-in Arbitrary Waves', 'USB PC Control']
  },
  {
    name: 'FDM PLA/ABS 3D Printer Fleet',
    description: 'Reliable dual-extruder FDM 3D printers for rapid structural testing and enclosure prototyping.',
    category: '3D Printing',
    specs: ['300x300x400mm Build Area', 'Dual Extruder', 'Multi-Filament Support']
  }
]

const faqs = [
  {
    q: 'How can startups request access to the prototyping labs?',
    a: 'Approved incubatees get instant lab access. External startups or researchers can submit a lab access request via our contact form or visit the incubator reception.'
  },
  {
    q: 'Is technical assistance available during prototyping?',
    a: 'Yes. Our dedicated lab engineers and domain mentors assist with 3D model preparation, PCB layout verification, laser cutter calibration, and safety guidelines.'
  },
  {
    q: 'What are the operating hours of the prototyping facilities?',
    a: 'Standard lab access is available Monday to Saturday (9:00 AM – 6:00 PM). Incubation teams with 24/7 access passes can use facilities after hours.'
  },
  {
    q: 'Are raw materials provided or do startups bring their own?',
    a: 'Basic testing materials (standard PLA filaments, soldering consumables, PCB copper boards) are provided. Specialized materials can be procured through incubator grant funds.'
  }
]

const CATEGORIES = ['All Equipment', 'Electronics', '3D Printing', 'Fabrication', 'Measurement', 'Software & Compute', 'Power']

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Equipment')
  const [openFaq, setOpenFaq] = useState(null)

  const filteredTools = tools.filter(tool => 
    selectedCategory === 'All Equipment' || tool.category === selectedCategory
  )

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Hero Banner ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none"></div>

        <div className="relative w-full text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-4">
            Services & Prototyping Facilities
          </h1>
          <p className="text-sm sm:text-base text-sky-100 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            Everything you need to turn raw concepts into functional prototypes. Explore our electronics suites, SLA/FDM 3D printers, CNC plasma cutters, and AI compute infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a 
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white text-[#013759] text-xs sm:text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Book Lab Space
            </a>
            <a 
              href="/facilities"
              className="px-6 py-3 rounded-xl border border-white/40 bg-white/10 text-white! text-xs sm:text-sm font-normal backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Explore All Facilities</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Content Section ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        
        {/* Core Facilities Quick Links */}
        <div className="mb-14">
          <div className="mb-6 text-left">
            <span className="text-xs font-normal text-[#074887] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-md border border-sky-100 inline-block mb-2">
              Primary Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-900">
              Core Prototyping Labs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Electronics & PCB Lab', href: '/facilities/electronics-labs', desc: 'Oscilloscopes, power supplies, SMD rework stations, and signal generators.' },
              { label: 'High-End AI Workstations', href: '/facilities/high-end-computers', desc: 'NVIDIA RTX GPUs, 128 GB RAM workstations for CAD and deep learning.' },
              { label: '3D Printing & SLA Suite', href: '/facilities/3d-printing', desc: 'Formlabs SLA and FDM printers for high-precision resin and PLA models.' },
              { label: 'Fabrication & CNC Lab', href: '/facilities/fabrication-lab', desc: 'CO₂ laser cutter, CNC plasma cutter, MIG welding, and vinyl plotters.' },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.href}
                className="flex flex-col justify-between p-7 bg-white border border-slate-200 rounded-2xl hover:border-sky-300 hover:shadow-md transition-all group"
              >
                <div>
                  <h3 className="text-xl font-normal text-[#013759] group-hover:text-[#074887] transition-colors mb-2.5">
                    {item.label}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-5">
                    {item.desc}
                  </p>
                </div>
                <span className="text-sm font-medium text-[#074887] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Explore Facility →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Equipment Catalog with Category Filters */}
        <div className="mb-14">
          <div className="mb-6 text-left">
            <span className="text-xs font-normal text-[#074887] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-md border border-sky-100 inline-block mb-2">
              Equipment Inventory
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-900">
              Lab Tools & Machinery Catalog
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-slate-200">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#074887] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between hover:border-sky-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#074887] bg-sky-50 px-3 py-1 rounded-md border border-sky-100">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-normal text-slate-900 leading-snug mb-2.5">
                    {tool.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-5">
                    {tool.description}
                  </p>
                </div>

                {tool.specs && (
                  <div className="border-t border-slate-100 pt-3.5 flex flex-wrap gap-2">
                    {tool.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md font-normal">
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-10 shadow-xs">
          <div className="mb-8 text-left">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight mb-2">
              Prototyping & Facility FAQs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Common inquiries regarding lab bookings, operating hours, and equipment assistance.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl transition-all overflow-hidden ${
                  openFaq === idx ? 'border-sky-300 bg-sky-50/20' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-normal text-slate-900">{faq.q}</span>
                  <span className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180 bg-[#074887] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-0 border-t border-slate-100">
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-3.5 font-normal">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}
