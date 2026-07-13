import React from 'react'

/**
 * CallToAction
 * CTA strip with heading, subtext, and a button.
 * Stacks vertically on mobile, row on md+.
 *
 * content: { heading, body, btnLabel, btnHref }
 * style:   { bg, textColor, btnBg, btnTextColor }
 */
export function CallToAction({
  heading     = 'Ready to Build Your Startup?',
  body        = 'Join the NFED incubation programme and turn your idea into reality.',
  btnLabel    = 'Apply Now',
  btnHref     = '#',
  style       = {},
}) {
  const {
    bg           = '#013759',
    textColor    = '#ffffff',
    btnBg        = '#fbbf24',
    btnTextColor = '#013759',
  } = style

  return (
    <section className="w-full py-12 md:py-14 px-4" style={{ background: bg }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: textColor }}>
            {heading}
          </h2>
          {body && (
            <p className="text-sm md:text-base opacity-80 max-w-xl" style={{ color: textColor }}>
              {body}
            </p>
          )}
        </div>
        <a
          href={btnHref}
          className="shrink-0 inline-block px-8 py-3 rounded-full font-bold text-sm md:text-base transition-transform hover:scale-105 active:scale-95 shadow-lg"
          style={{ background: btnBg, color: btnTextColor }}
        >
          {btnLabel}
        </a>
      </div>
    </section>
  )
}
