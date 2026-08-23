import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

// Import local downloaded fallback images
import elec2 from '../../assets/navrachna_images/elec_2.jpeg'
import elec4 from '../../assets/navrachna_images/elec_4.jpeg'
import elec5 from '../../assets/navrachna_images/elec_5.jpeg'
import elec6 from '../../assets/navrachna_images/elec_6.jpeg'
import elec7 from '../../assets/navrachna_images/elec_7.jpeg'

// Import facility high-res assets
import imgDcPower from '../../assets/navrachna_images/facilities/dc-regulated-power-supply.png'
import imgDso from '../../assets/navrachna_images/facilities/digital-storage-oscilloscope.png'
import imgWaveformGen from '../../assets/navrachna_images/facilities/arbitrary-waveform-generator.png'
import imgSmdRework from '../../assets/navrachna_images/facilities/smd-rework-station.png'
import imgElecBench from '../../assets/navrachna_images/facilities/electronics-assembly-lab.png'
import imgPcbDrill from '../../assets/navrachna_images/facilities/high-speed-pcb-drilling-machine.png'
import imgCoilWinder from '../../assets/navrachna_images/facilities/automatic-coil-winding-machine.png'

const FALLBACK_EQUIPMENT_IMAGES = {
  'dc regulated power supply': imgDcPower,
  'digital storage oscilloscope': imgDso,
  'function waveform generator': imgWaveformGen,
  'arbitrary waveform generator': imgWaveformGen,
  'smd rework station': imgSmdRework,
  'drilling machine benchtop': elec2,
  'digital meter': elec4,
  'universal programmer usb': elec5,
  'laser distance meter': elec6,
  'coil winding machine programmable': elec7,
  'electronics assembly lab': imgElecBench,
  'high-speed pcb drilling machine': imgPcbDrill,
  'automatic coil winding machine': imgCoilWinder
}

function resolveEquipmentImage(eqName = '', rawImg = null) {
  if (
    typeof rawImg === 'string' &&
    (rawImg.startsWith('http://') ||
     rawImg.startsWith('https://') ||
     rawImg.startsWith('data:image'))
  ) {
    return rawImg
  }

  if (Array.isArray(rawImg) && rawImg.length > 0) {
    const first = rawImg[0]
    if (
      typeof first === 'string' &&
      (first.startsWith('http://') ||
       first.startsWith('https://') ||
       first.startsWith('data:image'))
    ) {
      return first
    }
  }

  const nameLower = (eqName || '').toLowerCase().trim()
  if (FALLBACK_EQUIPMENT_IMAGES[nameLower]) {
    return FALLBACK_EQUIPMENT_IMAGES[nameLower]
  }

  for (const [key, val] of Object.entries(FALLBACK_EQUIPMENT_IMAGES)) {
    if (nameLower.includes(key) || key.includes(nameLower)) {
      return val
    }
  }

  return null
}

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

const STATIC_EQUIPMENT = [
  {
    name: "DC Regulated Power Supply (SMPS)",
    qty: "2 Units",
    desc: "Single output D.C. power supply 0~30V, 0~10A with CV/CC mode indicators and dual LED displays for high-accuracy circuit powering.",
    image: imgDcPower,
    category: "Power Diagnostics"
  },
  {
    name: "Digital Storage Oscilloscope (100MHz)",
    qty: "1 Unit",
    desc: "4-channel 100MHz digital storage oscilloscope for real-time waveform capture, noise filtering, and signal timing analysis.",
    image: imgDso,
    category: "Signal Analysis"
  },
  {
    name: "Arbitrary Function Waveform Generator",
    qty: "1 Unit",
    desc: "Dual-channel 25MHz arbitrary function generator with 4-inch color LCD, outputting Sine, Square, Pulse, Ramp, and Noise signals.",
    image: imgWaveformGen,
    category: "Signal Generation"
  },
  {
    name: "SMD Hot-Air Rework Station (700W)",
    qty: "2 Units",
    desc: "Dual hot-air gun (700W, 100–450°C) and PID temperature-controlled soldering iron (40W, 200–480°C) for micro surface-mount components.",
    image: imgSmdRework,
    category: "Soldering & Rework"
  },
  {
    name: "Benchtop Precision Drilling Machine",
    qty: "1 Unit",
    desc: "350W 220V vertical bench drill with 50mm spindle stroke, 1–13mm chuck capacity, and dual-speed 580 / 2650 RPM control for PCB boards.",
    image: elec2,
    category: "PCB Machining"
  },
  {
    name: "Digital Insulation Tester & Megohmmeter",
    qty: "1 Unit",
    desc: "Insulation test voltage up to 2500V DC and resistance measurement up to 40 GΩ for high-voltage isolation safety auditing.",
    image: elec4,
    category: "Safety & Isolation"
  },
  {
    name: "Universal USB IC Programmer",
    qty: "1 Unit",
    desc: "40-pin ZIF socket universal EEPROM/MCU programmer supporting 5V USB connectivity for micro-controllers and flash memory.",
    image: elec5,
    category: "Firmware & IC Programming"
  },
  {
    name: "Precision Laser Distance Meter",
    qty: "1 Unit",
    desc: "Industrial 635nm laser distance sensor measuring up to 40m range for precise enclosure alignment and spatial dimensional checks.",
    image: elec6,
    category: "Metrology & Alignment"
  },
  {
    name: "Programmable Automatic Coil Winding Machine",
    qty: "1 Unit",
    desc: "Automated coil winding equipment supporting up to 100mm coil diameter for custom inductors, transformers, and electromagnet coils.",
    image: elec7,
    category: "Magnetics & Coils"
  }
]

export function ElectronicsLabsPage() {
  const [equipment, setEquipment] = useState(STATIC_EQUIPMENT)
  const [facilityInfo, setFacilityInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchElectronicsFacility() {
      try {
        setLoading(true)
        const { data: facs } = await supabase
          .from('facilities')
          .select('id, slug, title, summary, description, cover_image_url')
          .or('slug.eq.electronics-labs,slug.eq.electronics-pcb-prototyping,title.ilike.%electronics%')
          .limit(1)

        const fac = facs && facs.length > 0 ? facs[0] : null
        
        if (fac) {
          setFacilityInfo(fac)
          const { data: eqData } = await supabase
            .from('facility_equipment')
            .select('*')
            .eq('facility_id', fac.id)
            .order('display_order', { ascending: true })

          if (eqData && eqData.length > 0) {
            const excludedKeywords = ['lcr', 'multimeter', 'lux meter', 'esd', 'workbench']
            const filtered = eqData.filter(eq => {
              const nameLower = (eq.name || '').toLowerCase()
              return !excludedKeywords.some(kw => nameLower.includes(kw))
            })

            const formatted = filtered.map(eq => {
              const img = resolveEquipmentImage(eq.name, eq.equipment_images)
              return {
                name: eq.name,
                qty: eq.quantity ? (String(eq.quantity).toLowerCase().includes('unit') || String(eq.quantity).toLowerCase().includes('system') ? eq.quantity : `${eq.quantity} Units`) : '1 Unit',
                desc: eq.specifications || eq.description || 'Professional electronic prototyping & testing equipment.',
                image: img,
                category: eq.category || 'Electronics Hardware'
              }
            })
            if (formatted.length > 0) setEquipment(formatted)
          }
        }
      } catch (err) {
        console.error('Error fetching electronics lab facilities:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchElectronicsFacility()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased font-normal pb-20">
      
      {/* ── Hero Banner Header ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none"></div>

        <div className="relative z-10 w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-8">
            {facilityInfo?.title || "Electronics & PCB Prototyping Lab"}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="/services" 
              className="px-6 py-3.5 rounded-xl bg-white text-[#013759] text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Book Lab Equipment
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
              <h3 className="text-base font-normal text-slate-900">PCB Prototyping</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">Power & Signals</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">SMD Rework</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-normal text-slate-900">Precision Testing</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipment Inventory Section ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight">
              Electronics Testing & Prototyping Tools
            </h2>
          </div>
          <span className="text-sm font-normal text-slate-500">
            Total Inventory: <strong className="text-slate-900 font-medium">{equipment.length} Systems</strong>
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#074887] mx-auto mb-4" />
            <p className="text-base text-slate-500 font-normal">Loading electronics lab equipment...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="flex flex-col gap-4">
                  {/* Equipment Image Container (Fits full card width) */}
                  <div className="w-full h-52 rounded-xl border border-slate-100 bg-slate-50 relative overflow-hidden group-hover:border-sky-200 transition-all">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const placeholder = e.target.parentElement.querySelector('.image-placeholder');
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="image-placeholder flex-col items-center justify-center text-slate-300 absolute inset-0 bg-slate-50"
                      style={{ display: item.image ? 'none' : 'flex' }}
                    >
                      <svg className="w-10 h-10 mb-1 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400">Electronics Instrument</span>
                    </div>
                  </div>

                  {/* Header Info */}
                  <div className="flex flex-col items-start gap-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{formatQtyBadge(item.qty)}</span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-normal text-slate-900 group-hover:text-[#074887] transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed text-left font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {item.category || 'Lab Facility'}
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
        )}

      </main>

    </div>
  )
}
