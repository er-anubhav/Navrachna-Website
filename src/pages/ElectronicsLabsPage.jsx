import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

// Import local downloaded images
import elec1 from '../assets/navrachna_images/elec_1.jpeg'
import elec2 from '../assets/navrachna_images/elec_2.jpeg'
import elec3 from '../assets/navrachna_images/elec_3.jpeg'
import elec4 from '../assets/navrachna_images/elec_4.jpeg'
import elec5 from '../assets/navrachna_images/elec_5.jpeg'
import elec6 from '../assets/navrachna_images/elec_6.jpeg'
import elec7 from '../assets/navrachna_images/elec_7.jpeg'

export function ElectronicsLabsPage() {
  const EQUIPMENT = [
    {
      name: "DC regulated power supply",
      qty: "Quantity: 2 Systems",
      desc: "D.C. Power Supply—SMPS (Single O/P), 0~30 V, 0~10 A, CV/CC, with 2 LEDs. Meters.",
      image: null
    },
    {
      name: "Digital storage oscilloscope",
      qty: "Quantity: 1 System",
      desc: "100Mhz with 4 Channel Digital storage Oscilloscope for high-speed digital diagnostics.",
      image: null
    },
    {
      name: "Function Waveform Generator",
      qty: "Quantity: 1 System",
      desc: "Arbitrary Waveform Generator, 4 Inch Coloured LCD, HEAVING OUTPUT SINE/SQUARE/PULSE/RAMP & NOISE, Frequency Range: 25mhz Dual Channel.",
      image: null
    },
    {
      name: "SMD rework Station",
      qty: "Quantity: 2 Systems",
      desc: "Hot Air Gun Part: Working Voltage 220V AC ±10% Output Power 700 W – (10% Maximum) Temperature Range 100-450 °C. Electric Soldering Machine Part: Working Voltage 26V AC ±10% Output Power 40W ±10% Temperature Range 200-480°C.",
      image: null
    },
    {
      name: "Digital Multi-meter Benchtop",
      qty: "Quantity: 2 Systems",
      desc: "Digital Multimeter, 4½ Digits, True Rms, Bench Top, Mains Operation, M/R, B/Light, 1000 V Dc/Ac, 20 A Ac/Dc, 20 M Ω Res., Cap., Freq., Cont. & Diode Test, D.H., Rel, Tr. (Hfe) Test.",
      image: elec1
    },
    {
      name: "Drilling machine benchtop",
      qty: "Quantity: 1 System",
      desc: "Power: 350W Voltage: 220V Spindle Stroke Length: 50mm Working Radius: 160mm Clamping Capacity: 1-13mm Rotation rate: 580r / min, 2650r / min.",
      image: elec2
    },
    {
      name: "LCR meter with Q measurement",
      qty: "Quantity: 1 System",
      desc: "Hot Air Gun Part: Working L.C.R. Meter, Bench Top, Mains Oper., LC-R-D-Q Etc. Measurements With Auto Detection. 5 Digits In 3.5″ Colour Lcd Display, 10 Hz~10 Khz C.V.",
      image: elec3
    },
    {
      name: "Digital Meter",
      qty: "Quantity: 1 System",
      desc: "Insulation Resistance 40 GΩ, Test Range: Insulation Resistance 0.2M To 200 Mohm ± 3.0%+5 200M To 4 Gohm ± 5.0%+5 4G, Accuracy: To 40 Gohm ± 10%+5, Insulation Test: VOLTAGE1000V, 2500V (DC), Short Circuit Current: 1.5 Ma.",
      image: elec4
    },
    {
      name: "Universal Programmer USB",
      qty: "Quantity: 1 System",
      desc: "40pins Locking Type ZIF Socket, Power supply: 5V1000mA. Low Power consumption(<200mA).",
      image: elec5
    },
    {
      name: "Laser Distance Meter",
      qty: "Quantity: 1 System",
      desc: "Product Dimensions 105x41x24 mm Operating Environment -10° to 50°C Laser Diode 635 nm, P<1 mW, Measurement Range 40 m.",
      image: elec6
    },
    {
      name: "Coil winding Machine Programmable",
      qty: "Quantity: 1 System",
      desc: "Coil Diameter: 100 Millimetre (mm), Automatic operation.",
      image: elec7
    },
    {
      name: "Lux Meter",
      qty: "Quantity: 1 System",
      desc: "Digital Light Meter Illuminance Lux Meter With Record Function, 0~200,000 Measurement Range Flexible Sensor Light Tester.",
      image: null
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
            Electronics Labs Facilities
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
            Professional testing stations, hardware diagnostics, and circuit prototyping equipment matching official inventories.
          </p>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="w-full py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EQUIPMENT.map((item, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white shadow-xs overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                {/* Image block (If exists) or Stylized Icon */}
                {item.image ? (
                  <div className="relative h-48 w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative h-48 w-full bg-slate-50/50 flex flex-col items-center justify-center border-b border-slate-100 p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-[#074887]/5 flex items-center justify-center text-[#074887] text-lg font-bold mb-3">
                      ⚡
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
                      Precision Tool
                    </span>
                  </div>
                )}

                {/* Content block */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-block bg-[#074887]/5 text-[#074887] text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-3">
                      {item.qty}
                    </span>
                    <h3 className="text-base text-[#013759] font-normal mb-2 leading-tight">{item.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed text-justify">{item.desc}</p>
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
