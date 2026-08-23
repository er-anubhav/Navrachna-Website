import React from 'react'
import heroImage from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'

// Import local downloaded workstation gallery images
import high1 from '../../assets/navrachna_images/high_1.jpg'
import high2 from '../../assets/navrachna_images/high_2.jpg'
import high3 from '../../assets/navrachna_images/high_3.jpg'
import high4 from '../../assets/navrachna_images/high_4.jpg'
import high5 from '../../assets/navrachna_images/high_5.jpeg'

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

export function HighEndComputersPage() {
  const galleryList = [
    { img: high1, label: "GPU Workstation Node" },
    { img: high2, label: "CAD & Simulation Lab" },
    { img: high4, label: "Intel AI Server Cluster" },
    { img: high5, label: "High-Performance Compute Desk" }
  ]

  const items = [
    {
      name: "High End Computer System (NVIDIA RTX 3090)",
      qty: "Quantity 1",
      desc: "Ultra-performance workstation engineered for deep learning model training, complex 3D rendering, and high-performance physics simulations.",
      image: high1,
      specs: [
        { label: "Processor", val: "Intel Core i9-12900K" },
        { label: "GPU", val: "NVIDIA GeForce RTX 3090 (24GB VRAM)" },
        { label: "RAM / Memory", val: "128GB DDR4 Corsair Vengeance" },
        { label: "Storage", val: "1TB NVMe SSD + 4TB HDD" },
        { label: "Display", val: "27-inch Ultra-HD Samsung Monitor" },
        { label: "Power Supply", val: "1650W SilverStone 80+ Platinum" }
      ]
    },
    {
      name: "CAD Designing, PCB & Simulation Workstation",
      qty: "Quantity 2",
      desc: "Dual-monitor CAD & PCB modeling systems pre-installed with SolidWorks, Altium Designer, ANSYS, and MATLAB simulation toolkits.",
      image: high2,
      specs: [
        { label: "Usage Focus", val: "3D Mechanical Modeling & PCB Design" },
        { label: "Software Suites", val: "ANSYS, SolidWorks, MATLAB, Altium" },
        { label: "Environment", val: "Calibrated for hardware engineering" }
      ]
    },
    {
      name: "Lenovo ThinkCentre Workstation Desktops",
      qty: "Quantity 10",
      desc: "Enterprise-grade Lenovo M70T Gen 3 desktop towers optimized for software development, embedded firmware debugging, and office engineering.",
      image: high3,
      specs: [
        { label: "Model", val: "Lenovo M70T Gen 3 (Tower)" },
        { label: "Processor", val: "Intel Core i7-12700" },
        { label: "RAM / Memory", val: "16GB DDR4 High-Speed RAM" },
        { label: "Storage SSD", val: "512GB NVMe M.2 SSD" },
        { label: "Peripherals", val: "Lenovo USB Keyboard & Optical Mouse" }
      ]
    },
    {
      name: "Intel AI Server Grade Compute Node — Deep-Tech Lab",
      qty: "Server Grade",
      desc: "Enterprise dual NVIDIA A40 GPU server node with 32 cores for large-scale AI/ML model inference, computational fluid dynamics, and HPC research.",
      image: high4,
      specs: [
        { label: "Processors", val: "Dual Intel Xeon Silver 4410Y & Gold 6430 (32 Cores / 64 Threads)" },
        { label: "GPUs", val: "Dual NVIDIA A40 (96GB Aggregate VRAM)" },
        { label: "Memory", val: "TruDDR5 4800MHz Server Memory" },
        { label: "Storage Controller", val: "PCIe Gen4 Hardware RAID Controller" },
        { label: "Use Cases", val: "HPC Workloads, AI Training & Finite Element Analysis" }
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
            High-End Compute & AI Workstation Lab
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="/services" 
              className="px-6 py-3.5 rounded-xl bg-white text-[#013759] text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Book Workstation Slot
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">NVIDIA RTX & A40 GPUs</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">128GB High-Speed RAM</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">Intel Xeon AI Server</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">CAD & Simulation Suites</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lab Gallery Section ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 pt-12 sm:pt-16">
        <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight mb-6 text-left">
          On-Premise Computing Workstations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryList.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative h-64 sm:h-72 md:h-80 w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:border-sky-300 transition-all"
            >
              <img 
                src={item.img} 
                alt="Workstation View" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Workstations Inventory Section ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight">
              Workstation Hardware Specifications
            </h2>
          </div>
          <span className="text-sm font-normal text-slate-500">
            Total Inventory: <strong className="text-slate-900 font-medium">{items.length} Workstation Nodes</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  Compute Facility
                </span>
                <a
                  href="/services"
                  className="text-sm font-medium text-[#074887] hover:underline flex items-center gap-1"
                >
                  <span>Reserve Workstation</span>
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
