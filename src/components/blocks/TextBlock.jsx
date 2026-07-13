import React from 'react'

/**
 * TextBlock
 * Heading + rich paragraph text. Supports left / center / right alignment.
 *
 * content: { heading, body, align }
 * style:   { bg, textColor, headingColor }
 */
export function TextBlock({
  heading      = '',
  body         = '',
  align        = 'left',
  style        = {},
}) {
  const {
    bg           = 'transparent',
    textColor    = '#1e293b',
    headingColor = '#013759',
  } = style

  const alignClass = {
    left:   'text-left',
    center: 'text-center mx-auto',
    right:  'text-right ml-auto',
  }[align] || 'text-left'

  return (
    <section
      className="w-full py-12 md:py-16 px-4"
      style={{ background: bg }}
    >
      <div className={`max-w-4xl ${alignClass} w-full`}>
        {heading && (
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight"
            style={{ color: headingColor }}
          >
            {heading}
          </h2>
        )}
        {body && (
          <p
            className="text-base md:text-lg leading-relaxed whitespace-pre-line"
            style={{ color: textColor }}
          >
            {body}
          </p>
        )}
      </div>
    </section>
  )
}
