import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

// Import local downloaded images
import high1 from '../assets/navrachna_images/high_1.jpg'
import high2 from '../assets/navrachna_images/high_2.jpg'
import high3 from '../assets/navrachna_images/high_3.jpg'
import high4 from '../assets/navrachna_images/high_4.jpg'
import high5 from '../assets/navrachna_images/high_5.jpeg'

export function HighEndComputersPage() {
  const imagesList = [high1, high2, high3, high4, high5]

  const items = [
    {
      name: "High End Computer System",
      qty: "Quantity 1",
      desc: "Some Brief Details of Our High End Computer System. Here’s a system specification, and short description:",
      specs: [
        { label: "Processor", val: "Intel 19 123900K" },
        { label: "GPU", val: "Nvidia GeForce RTX3090" },
        { label: "Motherboard", val: "Supported High-End Board" },
        { label: "RAM / Memory", val: "128GB (DDR4 Corsair Vengeance RGB 32 GB)" },
        { label: "SSD", val: "1TB Samsung" },
        { label: "HDD / RPM", val: "4TB 5400 Seagate" },
        { label: "Monitor", val: "27″ Samsung" },
        { label: "Power Supply", val: "1650W Silver Stone" }
      ]
    },
    {
      name: "Computer System for CAD Designing, PCB Designing and Simulation",
      qty: "Quantity 2",
      desc: "Computer System optimized for high-performance 3D CAD modeling, PCB drafting, and software simulations.",
      specs: [
        { label: "Usage Focus", val: "CAD Designing, PCB Designing and Simulation" },
        { label: "Environment", val: "Fully calibrated for solid-state hardware designers" }
      ]
    },
    {
      name: "Lenovo Desktop",
      qty: "Quantity 10",
      desc: "Lenovo M70T Gen 3,11TAS04R00, M7OT Gen3/Tower 90% Power 260W/17- 12700/12+4 GB RAM/512 GB SSD/ No OS /KYB/Mouse",
      specs: [
        { label: "Model", val: "Lenovo M70T Gen 3 (11TAS04R00)" },
        { label: "Form Factor", val: "M7OT Gen3/Tower" },
        { label: "Power Supply", val: "90% Power 260W" },
        { label: "Processor", val: "17- 12700" },
        { label: "RAM / Memory", val: "12+4 GB RAM" },
        { label: "Storage SSD", val: "512 GB SSD" },
        { label: "Operating System", val: "No OS" },
        { label: "Peripherals", val: "Keyboard / Mouse" }
      ]
    },
    {
      name: "Intel AI Server Grade Lab — Deep-Tech Innovations",
      qty: "Server Grade",
      desc: "Enterprise-class AI server system configured for AI/ML model training, HPC workloads, and deep-tech research — available to incubated startups and innovators.",
      specs: [
        { label: "Processors", val: "Intel Xeon Silver 4410Y & Intel Xeon Gold 6430 (up to 32 cores & 64 threads)" },
        { label: "Memory", val: "TruDDR5 4800MHz high-speed memory" },
        { label: "Storage Controller", val: "RAID 540-81 PCIe Gen4 for enhanced reliability & performance" },
        { label: "GPU", val: "Nvidia A40 48GB Dual Card" },
        { label: "Use Cases", val: "AI / ML / HPC workloads, 3D Modelling, CAD Designing, PCB Designing, AI Model Training" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      
      {/* Hero Header */}
      <section className="relative flex min-h-[35vh] w-full items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-4xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            High End Computer System
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
            Ultra-performance simulation, CAD engineering, and deep learning compute nodes available on-premise.
          </p>
        </div>
      </section>

      {/* Lab Gallery Section */}
      <section className="w-full pt-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {imagesList.map((img, idx) => (
              <div 
                key={idx} 
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-xs"
              >
                <img 
                  src={img} 
                  alt={`Workstation View ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Hardware Section */}
      <section className="w-full py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="grid grid-row-1 md:grid-row-2 lg:grid-row-3 gap-8 max-w-7xl mx-auto">
            {items.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block bg-[#074887]/5 text-[#074887] text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-4">
                    {item.qty}
                  </span>
                  <h3 className="text-lg font-normal text-[#013759] mb-3 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-6 text-justify">
                    {item.desc}
                  </p>

                  {/* Spec List */}
                  <div className="grid grid-cols-1 gap-2 border-t border-slate-50 pt-4">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center text-xs py-1">
                        <span className="text-gray-400 font-medium">{spec.label}:</span>
                        <span className="text-gray-700 font-semibold text-right">{spec.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
