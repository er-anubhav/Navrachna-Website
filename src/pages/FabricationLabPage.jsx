import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

export function FabricationLabPage() {
  const items = [
    {
      name: "Co2 Laser Cutting &Engraving Machine",
      desc: "Model No.-MT6040, Working Area (In mm) – 600X400, Laser Tube-90w.",
      specs: [
        { label: "Accessories", val: "Industrial chiller, Laser Tube, Ruida Controller, Blower, Power Supply, Compressor, Lens & Mirror, Knife Bed, Inner Guide Mechanism, Timing Belt" }
      ]
    },
    {
      name: "Vinyl Cutter and plotter with stand",
      desc: "Model name -SG-SKYC24. Sticker & Vinyl Cutter (Up to 300 GSM) with a multi-interface Large touch Screen menu.",
      specs: [
        { label: "Max Media Width", val: "720 mm" },
        { label: "Max Cutting Width", val: "610 mm" },
        { label: "Max Contour Cutting Width", val: "570 mm" },
        { label: "Max Force", val: "800 g" },
        { label: "Heads", val: "1 Head" }
      ]
    },
    {
      name: "CNC Plasma Cutting Machine Automation Grade",
      desc: "Electric power source cutting system calibrated for mild steel works.",
      specs: [
        { label: "Operation", val: "Fully-automatic" },
        { label: "Power & Voltage", val: "10 KW / 415 V" },
        { label: "Phase & Frequency", val: "3 Phase / 50 Hz" },
        { label: "Material Capacity", val: "0.5 - 25 mm" },
        { label: "Table Size", val: "3200 x 1800 mm" },
        { label: "Cutting Thickness", val: "20 mm" }
      ]
    },
    {
      name: "Deep freezer",
      desc: "Low-temperature thermal storage chamber for biological, chemical, and engineering component testing.",
      specs: [
        { label: "Temperature", val: "-20 deg. celsius" },
        { label: "Capacity", val: "100 L" }
      ]
    },
    {
      name: "Vacuum Oven",
      desc: "High-grade vacuum pressure curing and heating oven for materials testing.",
      specs: [
        { label: "Temperature Range", val: "50 - 200 deg. celsius" }
      ]
    },
    {
      name: "Advance Welding Setup",
      desc: "Professional-grade welding workstation equipped for MIG/TIG welding operations, suitable for metal fabrication and structural prototype assembly.",
      specs: []
    },
    {
      name: "Dewalt Chop Saw Machine",
      desc: "High-speed mitre saw for precise cross-cutting of metal pipes, rods, and structural sections used in fabrication workflows.",
      specs: []
    },
    {
      name: "LCR Meter with Q Measurement",
      desc: "Precision instrument measuring inductance (L), capacitance (C), and resistance (R) with Q-factor analysis — essential for passive component characterization.",
      specs: []
    },
    {
      name: "Digital Megger (Insulation Resistance Tester)",
      desc: "Tests electrical insulation integrity of motors, cables, and winding assemblies. Provides accurate digital readouts for safety and compliance verification.",
      specs: []
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
            Fabrication Lab Facility
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
            Here’s a specification name, specification, and short description.
          </p>
        </div>
      </section>

      {/* Main Hardware Section */}
      <section className="w-full py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {items.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-normal text-[#013759] mb-3 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 text-justify">
                    {item.desc}
                  </p>

                  {/* Spec List */}
                  <div className="grid grid-cols-1 gap-2 border-t border-slate-50 pt-4">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-start text-xs py-1">
                        <span className="text-gray-400 font-medium shrink-0 mr-4">{spec.label}:</span>
                        <span className="text-gray-700 font-semibold text-right leading-normal">{spec.val}</span>
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
