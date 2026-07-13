import React, { useRef } from 'react'

/**
 * LogoScroller
 * Auto-scrolling client/partner logo ticker.
 *
 * content: { heading, logos: [{ src, alt }] }
 * style:   { bg, textColor }
 */

export function LogoScroller({
  heading = 'Our Clients & Partners',
  logos   = [],
  style   = {},
}) {
  const {
    bg        = '#ffffff',
    textColor = '#013759',
  } = style

  // Default placeholder logos using text badges if no images provided
  const defaultLogos = [
    { alt: 'Arun Chaudhary' },
    { alt: 'DIGIERA' },
    { alt: 'JagmagLights' },
    { alt: 'MyLyfCare' },
    { alt: 'TripoSaints' },
    { alt: 'UPROI' },
    { alt: 'Verdant' },
    { alt: 'Weaclim' },
    { alt: 'Indus' },
    { alt: 'Intelliginetia' },
  ]

  const displayLogos = logos.length > 0 ? logos : defaultLogos

  return (
    <section className="w-full py-10 md:py-14 overflow-hidden" style={{ background: bg }}>
      {heading && (
        <h2 className="text-center text-xl md:text-2xl font-bold mb-8" style={{ color: textColor }}>
          {heading}
        </h2>
      )}

      {/* Scrolling track */}
      <div className="relative flex">
        <div className="flex animate-[logoScroll_20s_linear_infinite] gap-10 md:gap-16 items-center">
          {[...displayLogos, ...displayLogos].map((logo, i) =>
            logo.src ? (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt || ''}
                className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 shrink-0"
              />
            ) : (
              <span
                key={i}
                className="shrink-0 px-5 py-2 rounded-lg border font-semibold text-xs md:text-sm whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity"
                style={{ borderColor: textColor + '33', color: textColor }}
              >
                {logo.alt}
              </span>
            )
          )}
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
