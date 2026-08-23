import React from 'react'

// Import local downloaded 3D printer gallery images
import print1 from '../../assets/navrachna_images/print_1.jpeg'
import print2 from '../../assets/navrachna_images/print_2.jpeg'
import print3 from '../../assets/navrachna_images/print_3.jpeg'
import print4 from '../../assets/navrachna_images/print_4.jpeg'
import print5 from '../../assets/navrachna_images/print_5.jpeg'
import print6 from '../../assets/navrachna_images/print_6.jpeg'
import print7 from '../../assets/navrachna_images/print_7.jpeg'

function formatQtyBadge(rawQty) {
  if (!rawQty) return '1 System Available'
  const str = String(rawQty).trim()
  if (str.toLowerCase().startsWith('quantity')) {
    const cleanStr = str.replace(/^quantity:\s*/i, '').replace(/^quantity\s*/i, '')
    const num = parseInt(cleanStr)
    if (!isNaN(num)) {
      return `${num} ${num === 1 ? 'System Available' : 'Systems Available'}`
    }
    return `${cleanStr} Available`
  }
  if (/^\d+\s*(unit|units|system|systems)$/i.test(str)) {
    const num = parseInt(str) || 1
    return `${num} ${num === 1 ? 'System Available' : 'Systems Available'}`
  }
  return `${str} Available`
}

export function ThreeDPrintingPage() {
  const galleryList = [
    { img: print1, label: "Formlabs Form 3+ SLA Printer" },
    { img: print2, label: "FDM Precision Rig" },
    { img: print3, label: "Resin Curing Unit" },
    { img: print4, label: "Dual Extruder PLA Unit" },
    { img: print5, label: "High-Resolution Prototype Model" },
    { img: print6, label: "Part Wash & Finish Station" },
    { img: print7, label: "Calibrated Build Plate" }
  ]

  const items = [
    {
      name: "Formlabs Form 3+ SLA 3D Printer (Industrial Grade)",
      qty: "Quantity 1",
      desc: "Ultra-high-precision Stereolithography (SLA) 3D printer for medical, optical, and mechanical prototype enclosures requiring 25-micron layer smoothness.",
      image: print1,
      specs: [
        { label: "Build Volume (Metric)", val: "14.5 × 14.5 × 18.5 cm" },
        { label: "Build Volume (Imperial)", val: "5.7 × 5.7 × 7.3 in" },
        { label: "Technology", val: "Stereolithography (SLA Resin)" },
        { label: "Laser Spot Size", val: "85 Microns" },
        { label: "Layer Thickness", val: "25 - 300 Microns" }
      ]
    },
    {
      name: "Pratham Precision FDM 3D Printer",
      qty: "Quantity 1",
      desc: "Precision desktop additive manufacturing rig suited for functional spatial testing, mechanical fits, and rapid PLA prototype components.",
      image: print2,
      specs: [
        { label: "Build Volume", val: "200 × 200 × 250 mm" },
        { label: "Layer Resolution", val: "Up to 80 Microns" },
        { label: "Nozzle Diameter", val: "0.4 mm" },
        { label: "Bundled Software", val: "Cura / Slic3r Suite" }
      ]
    },
    {
      name: "Pixel FDM Dual 3D Printers (PLA Based)",
      qty: "Quantity 2",
      desc: "High-speed dual PLA-based FDM additive printing units deployed for rapid solid modeling and housing shell fabrication.",
      image: print4,
      specs: [
        { label: "Build Volume", val: "230(L) × 230(W) × 260(H) mm" },
        { label: "Print Resolution", val: "± 0.1 mm" },
        { label: "Positioning Accuracy", val: "X/Y 0.0125 mm, Z 0.002 mm" },
        { label: "Nozzle Diameter", val: "0.4 mm" },
        { label: "Print Speed", val: "Up to 200 mm/s (60–80 mm/s recommended)" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased font-normal pb-20">
      
      {/* ── Hero Banner Header ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none"></div>

        <div className="relative z-10 w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-8">
            3D Printing & SLA Prototyping Facilities
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="/services" 
              className="px-6 py-3.5 rounded-xl bg-white text-[#013759] text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Book 3D Printer Slot
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3.5 rounded-xl border border-white/40 bg-white/10 text-white! text-sm font-normal backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Contact Lab Technical Staff</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Key Lab Capabilities Bar ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">Formlabs SLA Printing</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">PLA FDM Modeling</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">25 Micron Precision</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">Bio-Resins & PLA Polymers</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lab Gallery Section ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 pt-12 sm:pt-16">
        <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight mb-6 text-left">
          On-Premise 3D Printing Systems
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {galleryList.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:border-sky-300 transition-all"
            >
              <img 
                src={item.img} 
                alt="3D Printer View" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Additive Inventory Section ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight">
              3D Printer Equipment Specifications
            </h2>
          </div>
          <span className="text-sm font-normal text-slate-500">
            Total Inventory: <strong className="text-slate-900 font-medium">{items.length} Additive Systems</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-5">
                
                {/* Image Box */}
                <div className="w-full h-52 rounded-xl border border-slate-100 bg-slate-50 relative overflow-hidden group-hover:border-sky-200 transition-all">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                </div>

                {/* Header Info */}
                <div className="flex flex-col items-start gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{formatQtyBadge(item.qty)}</span>
                  </span>

                  <h3 className="text-xl font-normal text-slate-900 group-hover:text-[#074887] transition-colors leading-snug">
                    {item.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed text-left font-normal">
                  {item.desc}
                </p>

                {/* Spec Breakdown */}
                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#074887] uppercase tracking-wider text-left mb-1">
                    Key Technical Specifications
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center text-xs py-1 border-b border-slate-50 last:border-0">
                        <span className="text-slate-500 font-normal">{spec.label}:</span>
                        <span className="text-slate-900 font-medium text-right">{spec.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Additive Facility
                </span>
                <a
                  href="/services"
                  className="text-sm font-medium text-[#074887] hover:underline flex items-center gap-1"
                >
                  <span>Reserve Printer</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  )
}
