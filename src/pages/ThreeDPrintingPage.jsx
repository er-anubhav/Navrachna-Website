import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

// Import local downloaded images
import print1 from '../assets/navrachna_images/print_1.jpeg'
import print2 from '../assets/navrachna_images/print_2.jpeg'
import print3 from '../assets/navrachna_images/print_3.jpeg'
import print4 from '../assets/navrachna_images/print_4.jpeg'
import print5 from '../assets/navrachna_images/print_5.jpeg'
import print6 from '../assets/navrachna_images/print_6.jpeg'
import print7 from '../assets/navrachna_images/print_7.jpeg'

export function ThreeDPrintingPage() {
  const imagesList = [print1, print2, print3, print4, print5, print6, print7]

  const items = [
    {
      name: "Formlabs Form 3+ 3D Printer Basic Package (Industrial Grade)",
      qty: "Quantity 1",
      desc: "Some Brief Details of Our 3D Printing Facilities. Here’s a 3D printing facility and a short description:",
      specs: [
        { label: "Build Volume (Metric)", val: "14.5 × 14.5 × 18.5 cm" },
        { label: "Build Volume (Imperial)", val: "5.7 × 5.7 × 7.3 in" },
        { label: "Technology", val: "Stereo lithography (SLA)" }
      ]
    },
    {
      name: "Pratham 3D Printer (200*200*250mm)",
      qty: "Quantity 1",
      desc: "Precision desktop additive manufacturing rig suited for functional spatial testing, mechanical fits, and rapid prototyping.",
      specs: [
        { label: "Build Volume", val: "200 x 200 x 250 mm" },
        { label: "Layer Resolution", val: "Upto 80 Microns" },
        { label: "Nozzle Diameter", val: "0.4 mm" },
        { label: "Bundled Software", val: "Cura / Slicer Bundled Software Cura / Slicer" }
      ]
    },
    {
      name: "2 Pixel 3d printers PLA based",
      qty: "Quantity 2",
      desc: "Highly efficient PLA-based FDM additive printing units deployed for rapid solid components modeling.",
      specs: [
        { label: "Build Volume", val: "230(L)*230(W)*260(H)mm" },
        { label: "Print Resolution", val: "± 0.1mm" },
        { label: "Positioning Accuracy", val: "X/Y 0.0125mm, Z 0.002mm" },
        { label: "Nozzle Diameter", val: "0.4mm" },
        { label: "Print Speed", val: "<200mm/s (recommended 60–80 mm/s)" }
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
            3D Printing Facilities
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
            SLA and FDM additive systems producing extreme dimensional accuracy from digital solid models.
          </p>
        </div>
      </section>

      {/* Lab Gallery Section */}
      <section className="w-full pt-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {imagesList.map((img, idx) => (
              <div 
                key={idx} 
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-xs"
              >
                <img 
                  src={img} 
                  alt={`3D Printer View ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Additive Section */}
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
