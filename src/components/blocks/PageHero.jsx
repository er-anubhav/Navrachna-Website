import React from 'react'
import defaultHeroBg from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'

/**
 * PageHero
 * Full-width hero section with background image, title, subtitle, and dual CTAs.
 * Matches original premium aesthetics (serif font, glowing buttons, blurred tags).
 */
export function PageHero({
  title        = 'Empowering the\nInnovators of Tomorrow',
  description  = 'A premier incubation center nurturing startups, researchers, and entrepreneurs through world-class facilities, expert mentorship, and government-backed funding programs.',
  subtitle     = 'Navrachna Foundation for Entrepreneurship Development',
  bgImage      = '',
  cta1Label    = 'Join the Workspace',
  cta1Href     = '#',
  cta2Label    = 'Explore Programs',
  cta2Href     = '#',
  style        = {},
}) {
  const {
    bg             = '#111111',
    textColor      = '#ffffff',
    overlayOpacity = 0.65,
    minHeight      = '85vh',
    titleSize      = 'text-6xl',
    descSize       = 'text-md sm:text-md',
  } = style

  const heroBg = bgImage || defaultHeroBg

  return (
    <section
      className="relative flex min-h-[85vh] md:min-h-[90vh] py-20 w-full items-center justify-center overflow-hidden"
      style={{ background: bg }}
      aria-label="Hero section"
    >
      {/* Background Image / Video layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-7xl mt-12 tracking-tighter text-white drop-shadow-lg">
          <span className={`font-serif tracking-tighter ${titleSize}`}>
            {title}
          </span>
        </h1>
        {description && (
          <p className={`mt-6 max-w-2xl text-white whitespace-pre-line leading-relaxed ${descSize}`}>
            {description}
          </p>
        )}
        {subtitle && (
          <span className="mb-2 mt-8 rounded-md border border-white/20 px-4 py-1.5 text-sm tracking-wider text-white backdrop-blur-md">
            {subtitle}
          </span>
        )}

        <div className="mt-2 flex flex-col gap-4 sm:flex-row">
          {cta1Label && (
            <a
              href={cta1Href}
              className="rounded-md bg-[#074887] px-4 py-4 font-semibold text-white shadow-[0_0_20px_rgba(7,72,135,0.4)] transition-all hover:bg-[#013759] hover:shadow-[0_0_30px_rgba(7,72,135,0.6)] hover:-translate-y-1 block text-center"
            >
              {cta1Label}
            </a>
          )}
          {cta2Label && (
            <a
              href={cta2Href}
              className="rounded-md border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-1 block text-center"
            >
              {cta2Label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
