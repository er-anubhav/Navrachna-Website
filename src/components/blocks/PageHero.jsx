import React from 'react'

/**
 * PageHero
 * Full-width hero section with background image, title, subtitle, and optional CTA.
 *
 * content: { title, subtitle, ctaLabel, ctaHref, eyebrow }
 * style:   { bg, textColor, overlayOpacity, minHeight }
 * bgImage: URL string for the background image
 */
export function PageHero({
  title        = 'Empowering Future Innovators',
  subtitle     = 'Navrachna Foundation for Entrepreneurship Development',
  eyebrow      = '',
  ctaLabel     = '',
  ctaHref      = '#',
  bgImage      = '',
  style        = {},
}) {
  const {
    bg             = '#013759',
    textColor      = '#ffffff',
    overlayOpacity = 0.55,
    minHeight      = '60vh',
  } = style

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden lg:min-h-screen"
      style={{ minHeight, background: bg }}
      aria-label="Hero section"
    >
      {/* Background image */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 md:py-24 max-w-4xl mx-auto">
        {eyebrow && (
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4 text-yellow-400">
            {eyebrow}
          </p>
        )}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          style={{ color: textColor }}
        >
          {title}
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90"
          style={{ color: textColor }}
        >
          {subtitle}
        </p>
        {ctaLabel && (
          <a
            href={ctaHref}
            className="inline-block px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-transform hover:scale-105 active:scale-95"
            style={{ background: '#fbbf24', color: '#013759' }}
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  )
}
