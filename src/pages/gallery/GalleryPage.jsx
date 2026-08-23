import React, { useState } from 'react'

// Import facility & space images
import coworkingImg from '../../assets/navrachna_images/spaces/coworking.jpg'
import boardroomImg from '../../assets/navrachna_images/spaces/boardroom.jpg'
import receptionImg from '../../assets/navrachna_images/spaces/reception.jpg'
import spaceHeroImg from '../../assets/navrachna_images/co-working-area-in-greater-noida-13-scaled.webp'

// Import compute lab images
import high1 from '../../assets/navrachna_images/high_1.jpg'
import high2 from '../../assets/navrachna_images/high_2.jpg'
import high4 from '../../assets/navrachna_images/high_4.jpg'
import high5 from '../../assets/navrachna_images/high_5.jpeg'

// Import fabrication & 3D printing images
import print3DImg from '../../assets/navrachna_images/spaces/3d_printing.jpg'
import laserImg from '../../assets/navrachna_images/spaces/laser_cutting.jpg'
import plasmaImg from '../../assets/navrachna_images/spaces/plasma_cutting.jpg'
import weldingImg from '../../assets/navrachna_images/spaces/mig_welding.jpg'
import vinylImg from '../../assets/navrachna_images/spaces/vinyl_cutter.jpg'
import print1 from '../../assets/navrachna_images/print_1.jpeg'
import print2 from '../../assets/navrachna_images/print_2.jpeg'
import print4 from '../../assets/navrachna_images/print_4.jpeg'

// Import electronics lab images
import imgDcPower from '../../assets/navrachna_images/facilities/dc-regulated-power-supply.png'
import imgDso from '../../assets/navrachna_images/facilities/digital-storage-oscilloscope.png'
import imgWaveformGen from '../../assets/navrachna_images/facilities/arbitrary-waveform-generator.png'
import imgSmdRework from '../../assets/navrachna_images/facilities/smd-rework-station.png'
import elec2 from '../../assets/navrachna_images/elec_2.jpeg'
import elec4 from '../../assets/navrachna_images/elec_4.jpeg'

// Import leadership portraits
import leaderChairman from '../../assets/navrachna_images/leader_chairman.png'
import leaderViceChairman from '../../assets/navrachna_images/leader_vicechairman.png'
import leaderDirector from '../../assets/navrachna_images/leader_director.png'
import leaderAdvisor from '../../assets/navrachna_images/leader_advisor.png'

const GALLERY_ITEMS = [
  // Spaces & Co-Working
  { id: 1, title: 'Co-Working Desk Hub', category: 'spaces', categoryLabel: 'Co-Working & Spaces', img: coworkingImg },
  { id: 2, title: 'Executive Conference & Boardroom', category: 'spaces', categoryLabel: 'Co-Working & Spaces', img: boardroomImg },
  { id: 3, title: 'Incubator Reception & Welcome Center', category: 'spaces', categoryLabel: 'Co-Working & Spaces', img: receptionImg },
  { id: 4, title: 'Startup Collaboration Space', category: 'spaces', categoryLabel: 'Co-Working & Spaces', img: spaceHeroImg },

  // Compute & AI
  { id: 5, title: 'NVIDIA RTX 3090 GPU Compute Node', category: 'compute', categoryLabel: 'High-End Compute & AI', img: high1 },
  { id: 6, title: 'Dual-Monitor CAD & Simulation Rig', category: 'compute', categoryLabel: 'High-End Compute & AI', img: high2 },
  { id: 7, title: 'Intel Xeon AI Server Cluster', category: 'compute', categoryLabel: 'High-End Compute & AI', img: high4 },
  { id: 8, title: 'High-Performance Engineering Workstation', category: 'compute', categoryLabel: 'High-End Compute & AI', img: high5 },

  // Fabrication & 3D Printing
  { id: 9, title: 'Formlabs Industrial SLA 3D Printer', category: 'fabrication', categoryLabel: '3D Printing & Fabrication', img: print3DImg },
  { id: 10, title: 'CO₂ Laser Cutting & Engraving Table', category: 'fabrication', categoryLabel: '3D Printing & Fabrication', img: laserImg },
  { id: 11, title: 'CNC Plasma Metal Cutting System', category: 'fabrication', categoryLabel: '3D Printing & Fabrication', img: plasmaImg },
  { id: 12, title: 'Advanced MIG / TIG Welding Station', category: 'fabrication', categoryLabel: '3D Printing & Fabrication', img: weldingImg },
  { id: 13, title: 'Vinyl Cutter & Sticker Plotter', category: 'fabrication', categoryLabel: '3D Printing & Fabrication', img: vinylImg },
  { id: 14, title: 'Formlabs Form 3+ SLA Printer Unit', category: 'fabrication', categoryLabel: '3D Printing & Fabrication', img: print1 },
  { id: 15, title: 'Pratham Precision FDM 3D Printer', category: 'fabrication', categoryLabel: '3D Printing & Fabrication', img: print2 },
  { id: 16, title: 'Dual PLA FDM 3D Printers', category: 'fabrication', categoryLabel: '3D Printing & Fabrication', img: print4 },

  // Electronics & PCB
  { id: 17, title: 'DC Regulated Power Supply (SMPS 0-30V)', category: 'electronics', categoryLabel: 'Electronics & PCB Labs', img: imgDcPower },
  { id: 18, title: '100MHz Digital Storage Oscilloscope', category: 'electronics', categoryLabel: 'Electronics & PCB Labs', img: imgDso },
  { id: 19, title: 'Arbitrary Function Waveform Generator', category: 'electronics', categoryLabel: 'Electronics & PCB Labs', img: imgWaveformGen },
  { id: 20, title: '700W SMD Hot-Air Rework Station', category: 'electronics', categoryLabel: 'Electronics & PCB Labs', img: imgSmdRework },
  { id: 21, title: 'Benchtop Precision Vertical Drill', category: 'electronics', categoryLabel: 'Electronics & PCB Labs', img: elec2 },
  { id: 22, title: 'Digital Insulation Tester & Megohmmeter', category: 'electronics', categoryLabel: 'Electronics & PCB Labs', img: elec4 },

  // Leadership
  { id: 23, title: 'Shri B.L. Gupta — Chairman, I.T.S Education Group', category: 'team', categoryLabel: 'Leadership & Mentors', img: leaderChairman },
  { id: 24, title: 'Shri Sohil Chadha — Vice Chairman, I.T.S Education Group', category: 'team', categoryLabel: 'Leadership & Mentors', img: leaderViceChairman },
  { id: 25, title: 'Dr. Mayank Garg — Director, I.T.S Engineering College', category: 'team', categoryLabel: 'Leadership & Mentors', img: leaderDirector },
  { id: 26, title: 'Prof. (Dr.) Vikas Singh — Executive Director & Advisor', category: 'team', categoryLabel: 'Leadership & Mentors', img: leaderAdvisor }
]

const CATEGORIES = [
  { id: 'all', label: 'All Infrastructure' },
  { id: 'spaces', label: 'Co-Working & Spaces' },
  { id: 'electronics', label: 'Electronics & PCB Labs' },
  { id: 'compute', label: 'Compute & AI Lab' },
  { id: 'fabrication', label: '3D Printing & Fabrication' },
  { id: 'team', label: 'Leadership & Mentors' }
]

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory)

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1))
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased font-normal pb-24">
      
      {/* ── Hero Banner Header ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none" />

        <div className="relative z-10 w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-2">
            Infrastructure & Lab Gallery
          </h1>
        </div>
      </section>

      {/* ── Category Navigation Bar ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-md flex items-center justify-center flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-normal transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#074887] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Main Gallery Grid ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-normal text-[#013759]">
            {CATEGORIES.find(c => c.id === activeCategory)?.label || 'All Infrastructure'}
          </h2>
          <span className="text-xs sm:text-sm text-slate-500 font-normal">
            Showing <strong className="text-slate-900 font-medium">{filteredItems.length} Photos</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="w-full h-full relative overflow-hidden bg-slate-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-white/90 backdrop-blur-md text-[#074887] text-[10px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="text-sm sm:text-base font-normal text-white leading-snug drop-shadow-sm">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] text-sky-200 mt-1 font-normal hover:underline">
                    <span>View Image</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Lightbox Preview Modal ── */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Image Arrow */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:-left-12 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Preview Image */}
            <div 
              className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex].img}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] max-w-full object-contain"
              />
            </div>

            {/* Image Details Caption */}
            <div 
              className="mt-4 text-center max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs text-sky-300 font-normal uppercase tracking-wider block mb-1">
                {filteredItems[lightboxIndex].categoryLabel}
              </span>
              <h3 className="text-lg sm:text-xl font-normal text-white">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Photo {lightboxIndex + 1} of {filteredItems.length}
              </p>
            </div>

            {/* Next Image Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-2 sm:-right-12 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        </div>
      )}

    </div>
  )
}
