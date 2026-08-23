import React from 'react'

export function FabricationLabPage() {
  const items = [
    {
      name: "CO₂ Laser Cutting & Engraving Machine",
      qty: "1 System Available",
      desc: "Model No. MT6040 with 600×400mm workbed and 90W sealed CO₂ laser tube. Equipped with Ruida controller, industrial chiller, and air assist compressor.",
      specs: [
        { label: "Laser Power", val: "90W Sealed CO₂ Tube" },
        { label: "Work Area", val: "600 × 400 mm" },
        { label: "Accessories", val: "Industrial Chiller, Ruida Controller, Blower, Compressor, Knife Bed" }
      ]
    },
    {
      name: "Vinyl Cutter & Plotter with Stand",
      qty: "1 System Available",
      desc: "Model SG-SKYC24 precision sticker & vinyl plotter supporting up to 300 GSM media width with multi-interface touch screen menu.",
      specs: [
        { label: "Max Media Width", val: "720 mm" },
        { label: "Max Cutting Width", val: "610 mm" },
        { label: "Max Contour Width", val: "570 mm" },
        { label: "Max Cutting Force", val: "800 g" }
      ]
    },
    {
      name: "CNC Plasma Cutting Machine (Automation Grade)",
      qty: "1 System Available",
      desc: "High-frequency heavy metal plasma cutting table (3200×1800mm) capable of slicing up to 20mm steel plate with CNC G-code control.",
      specs: [
        { label: "Operation", val: "Fully-Automatic CNC" },
        { label: "Power & Voltage", val: "10 kW / 415 V (3-Phase / 50 Hz)" },
        { label: "Steel Cutting Thickness", val: "0.5 – 25 mm (20mm Rating)" },
        { label: "Table Bed Dimensions", val: "3200 × 1800 mm" }
      ]
    },
    {
      name: "Low-Temperature Deep Freezer Cabinet",
      qty: "1 System Available",
      desc: "Low-temperature thermal storage chamber down to -20°C for biological, chemical, and component thermal stress testing.",
      specs: [
        { label: "Temperature Rating", val: "-20°C Celsius" },
        { label: "Chamber Capacity", val: "100 Liters" }
      ]
    },
    {
      name: "High-Grade Vacuum Oven",
      qty: "1 System Available",
      desc: "High-grade vacuum pressure curing and heating oven for materials testing, composite degassing, and thermal processing.",
      specs: [
        { label: "Temperature Range", val: "50°C – 200°C" },
        { label: "Pressure Chamber", val: "Digital PID Heat & Vacuum Control" }
      ]
    },
    {
      name: "Advanced MIG / TIG Welding Setup",
      qty: "1 Station Available",
      desc: "Professional-grade welding workstation equipped for MIG/TIG welding operations, suitable for metal fabrication and structural prototypes.",
      specs: [
        { label: "Welding Modes", val: "MIG / TIG / Arc Metal Fabrication" },
        { label: "Applications", val: "Structural Frame & Metal Chassis Assembly" }
      ]
    },
    {
      name: "DeWalt Heavy-Duty Chop Saw Machine",
      qty: "1 System Available",
      desc: "High-speed mitre chop saw for precise cross-cutting of metal pipes, steel rods, and structural sections used in fabrication workflows.",
      specs: [
        { label: "Tool Type", val: "High-Speed Abrasive Metal Chop Saw" },
        { label: "Cutting Capacity", val: "Heavy Structural Steel & Pipes" }
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
            Fabrication & Heavy Prototyping Lab
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="/services" 
              className="px-6 py-3.5 rounded-xl bg-white text-[#013759] text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Book Fabrication Slot
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.828 2.828A2 2 0 017.757 18H5v-2.757a2 2 0 01.586-1.414L14.121 14.121z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">CO₂ Laser & Vinyl Plotters</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">CNC Plasma Cutting</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2h-3a2 2 0 01-2-2V4a2 2 0 012-2h1zM4 14a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">MIG / TIG Metal Welding</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">Vacuum Ovens & Thermal Cabinets</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Hardware Section ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight">
              Fabrication Tools & Machinery
            </h2>
          </div>
          <span className="text-sm font-normal text-slate-500">
            Total Inventory: <strong className="text-slate-900 font-medium">{items.length} Heavy Machinery Tools</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group text-left"
            >
              <div className="flex flex-col gap-5">
                
                {/* Header Info */}
                <div className="flex flex-col items-start gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{item.qty}</span>
                  </span>

                  <h3 className="text-xl font-normal text-slate-900 group-hover:text-[#074887] transition-colors leading-snug">
                    {item.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>

                {/* Spec Breakdown */}
                {item.specs.length > 0 && (
                  <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
                    <span className="text-xs font-semibold text-[#074887] uppercase tracking-wider mb-1">
                      Technical Specifications
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex justify-between items-start text-xs py-1 border-b border-slate-50 last:border-0">
                          <span className="text-slate-500 font-normal shrink-0 mr-4">{spec.label}:</span>
                          <span className="text-slate-900 font-medium text-right leading-normal">{spec.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Fabrication Facility
                </span>
                <a
                  href="/services"
                  className="text-sm font-medium text-[#074887] hover:underline flex items-center gap-1"
                >
                  <span>Reserve Tool</span>
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
