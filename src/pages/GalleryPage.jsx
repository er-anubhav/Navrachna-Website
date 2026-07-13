import React, { useState, useEffect, useCallback } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

// ── Incubation Brochure Photos ──────────────────────────────────────────────
import inc1  from '../assets/newgen_gallery/inc_1.jpg'
import inc2  from '../assets/newgen_gallery/inc_2.jpg'
import inc3  from '../assets/newgen_gallery/inc_3.jpg'
import inc4  from '../assets/newgen_gallery/inc_4.jpg'
import inc5  from '../assets/newgen_gallery/inc_5.jpg'
import inc6  from '../assets/newgen_gallery/inc_6.jpg'
import inc7  from '../assets/newgen_gallery/inc_7.jpg'
import inc8  from '../assets/newgen_gallery/inc_8.jpg'
import inc9  from '../assets/newgen_gallery/inc_9.jpg'
import inc10 from '../assets/newgen_gallery/inc_10.jpg'
import inc11 from '../assets/newgen_gallery/inc_11.jpg'
import inc12 from '../assets/newgen_gallery/inc_12.jpg'
import inc13 from '../assets/newgen_gallery/inc_13.jpg'

// ── College Brochure Photos ─────────────────────────────────────────────────
import coll1 from '../assets/newgen_gallery/coll_1.jpg'
import coll2 from '../assets/newgen_gallery/coll_2.jpg'
import coll3 from '../assets/newgen_gallery/coll_3.jpg'
import coll4 from '../assets/newgen_gallery/coll_4.jpg'
import coll5 from '../assets/newgen_gallery/coll_5.jpg'
import coll6 from '../assets/newgen_gallery/coll_6.jpg'
import coll7 from '../assets/newgen_gallery/coll_7.jpg'

const CATEGORIES = [
  {
    id: 'incubation',
    label: 'Incubation Centre',
    description: 'A glimpse into our incubation ecosystem — where ideas meet infrastructure.',
    images: [inc1, inc2, inc3, inc4, inc5, inc6, inc7, inc8, inc9, inc10, inc11, inc12, inc13, coll1, coll2, coll3, coll4, coll5, coll6, coll7],
  },
]

// ── Expand SVG icon ─────────────────────────────────────────────────────────
function ExpandIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  )
}

// ── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <div
      id="gallery-lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)' }}
      onClick={onClose}
    >
      {/* Counter */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest select-none"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* Close */}
      <button
        id="gallery-lightbox-close"
        onClick={onClose}
        className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        id="gallery-lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 sm:left-8 text-white/50 hover:text-white transition-colors duration-200 cursor-pointer select-none"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Gallery image ${currentIndex + 1}`}
        className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl select-none shadow-2xl"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      {/* Next */}
      <button
        id="gallery-lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 sm:right-8 text-white/50 hover:text-white transition-colors duration-200 cursor-pointer select-none"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto pb-1 px-2 scrollbar-none">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); /* jump directly */ onClose(); }}
            className={`shrink-0 w-10 h-10 rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
              i === currentIndex ? 'border-white opacity-100' : 'border-white/20 opacity-40 hover:opacity-70'
            }`}
            aria-label={`Jump to image ${i + 1}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({ src, index, label, onClick }) {
  return (
    <div
      id={`gallery-card-${index}`}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm cursor-pointer"
      style={{ transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
      onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(1,55,89,0.18)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
    >
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#013759]/0 group-hover:bg-[#013759]/55 transition-all duration-300 flex items-center justify-center">
        <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
          <ExpandIcon />
          <span className="text-[10px] tracking-widest uppercase font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>View</span>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function GalleryPage() {
  const [activeTab, setActiveTab]       = useState('incubation')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const activeCat   = CATEGORIES.find(c => c.id === activeTab)
  const activeImages = activeCat?.images ?? []

  const openLightbox  = useCallback((i) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage     = useCallback(() => setLightboxIndex(i => (i - 1 + activeImages.length) % activeImages.length), [activeImages.length])
  const nextImage     = useCallback(() => setLightboxIndex(i => (i + 1) % activeImages.length), [activeImages.length])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[42vh] w-full items-end justify-center overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-[#013759]/88 pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <span
            className="inline-block mb-4 text-[10px] tracking-[0.25em] uppercase text-white/50"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Navrachna Foundation
          </span>
          <h1
            className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight drop-shadow-md"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Photo Gallery
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm text-white/65 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            A visual archive of our incubation ecosystem and programme milestones.
          </p>
        </div>
      </section>

      {/* ── Category Tabs ───────────────────────────────────────────────── */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                id={`gallery-tab-${cat.id}`}
                onClick={() => { setActiveTab(cat.id); setLightboxIndex(null) }}
                className="relative px-6 py-4 text-xs tracking-widest uppercase transition-colors duration-200 cursor-pointer"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: activeTab === cat.id ? '#013759' : '#94a3b8',
                  fontWeight: activeTab === cat.id ? '600' : '400',
                  borderBottom: activeTab === cat.id ? '2px solid #013759' : '2px solid transparent',
                }}
              >
                {cat.label}
                <span
                  className="ml-2 inline-flex items-center justify-center rounded-full text-[9px] px-1.5 py-0.5"
                  style={{
                    background: activeTab === cat.id ? '#013759' : '#f1f5f9',
                    color: activeTab === cat.id ? '#fff' : '#94a3b8',
                  }}
                >
                  {cat.images.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      <section className="w-full py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section description */}
          <div className="mb-10">
            <p
              className="text-xs text-gray-400 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {activeCat?.description}
            </p>
          </div>

          {/* Masonry-inspired responsive grid */}
          <div
            id="gallery-grid"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {activeImages.map((img, idx) => (
              <GalleryCard
                key={`${activeTab}-${idx}`}
                src={img}
                index={idx}
                label={`${activeCat.label} photo ${idx + 1}`}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>

          {/* Footer caption */}
          <p
            className="mt-10 text-center text-[10px] text-gray-300 tracking-widest uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {activeImages.length} photos · Click any image to view full screen
          </p>
        </div>
      </section>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={activeImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  )
}
