import React from 'react'

import client1 from '../../assets/navrachna_images/ArunChaudhary-1.png'
import client2 from '../../assets/navrachna_images/DIGIERA-PRIVATE-LIMITED.png'
import client3 from '../../assets/navrachna_images/JagmagLights-1.png'
import client4 from '../../assets/navrachna_images/MyLyfCare-1.png'
import client5 from '../../assets/navrachna_images/TripoSaints-1.png'
import client6 from '../../assets/navrachna_images/UPROI-1-scaled.png'
import client7 from '../../assets/navrachna_images/VerdantLogo-1.png'
import client8 from '../../assets/navrachna_images/Weaclim-1.png'
import client9 from '../../assets/navrachna_images/indus-1.jpg'
import client10 from '../../assets/navrachna_images/intelliginetia-1.jpg'

const CLIENT_ASSETS = [
  { src: client1, alt: 'Arun Chaudhary' },
  { src: client2, alt: 'DIGIERA' },
  { src: client3, alt: 'JagmagLights' },
  { src: client4, alt: 'MyLyfCare' },
  { src: client5, alt: 'TripoSaints' },
  { src: client6, alt: 'UPROI' },
  { src: client7, alt: 'Verdant' },
  { src: client8, alt: 'Weaclim' },
  { src: client9, alt: 'Indus' },
  { src: client10, alt: 'Intelliginetia' },
]

/**
 * LogoScroller
 * Auto-scrolling partner logo ticker. Matches the original high-fidelity portfolio scroller.
 */
export function LogoScroller({
  heading  = 'Our Portfolio Startups',
  eyebrow  = 'OUR ECOSYSTEM',
  logos    = [],
  style    = {},
}) {
  const {
    bg        = '#ffffff',
    textColor = '#013759',
  } = style

  const displayLogos = logos.length > 0 ? logos : CLIENT_ASSETS

  // Colorize "Startups" or dynamic title words
  const renderColoredHeading = (text) => {
    if (text.toLowerCase().includes('startups')) {
      const parts = text.split(/startups/i)
      return (
        <>
          {parts[0]}
          <span className="inline-block">
            <span className="text-[#10b981]">S</span>
            <span className="text-[#ec4899]">t</span>
            <span className="text-[#3b82f6]">a</span>
            <span className="text-[#f59e0b]">r</span>
            <span className="text-[#ef4444]">t</span>
            <span className="text-[#8b5cf6]">u</span>
            <span className="text-[#06b6d4]">p</span>
            <span className="text-[#3b82f6]">s</span>
          </span>
          {parts[1]}
        </>
      )
    }
    return text
  }

  const borderColors = [
    'border-sky-100/90 hover:border-sky-200',
    'border-orange-100/90 hover:border-orange-200',
    'border-lime-100/90 hover:border-lime-200',
    'border-rose-100/90 hover:border-rose-200',
    'border-teal-100/90 hover:border-teal-200',
    'border-purple-100/90 hover:border-purple-200'
  ]

  return (
    <section className="w-full py-24 border-t border-slate-100 overflow-hidden" style={{ background: bg }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {eyebrow && (
            <span className="text-xs font-normal tracking-widest mb-4 block" style={{ color: textColor }}>
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-black">
              {renderColoredHeading(heading)}
            </h2>
          )}
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Left and Right Fade Overlays */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee Wrapper */}
          <div className="flex w-max animate-[logoScroll_25s_linear_infinite]">
            {[...displayLogos, ...displayLogos].map((logo, idx) => {
              const borderClass = borderColors[idx % borderColors.length]
              return (
                <div key={idx} className="flex h-36 w-64 shrink-0 items-center justify-center px-4">
                  <div className={`w-full h-full bg-white rounded-[2rem] flex items-center justify-center p-6 shadow-sm border-4 ${borderClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}>
                    <img
                      src={logo.src}
                      alt={logo.alt || ''}
                      className="max-h-full max-w-full object-contain transition-all duration-300"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logoScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
