import React, { useState } from 'react'

/**
 * FAQAccordion
 * Expandable Q&A list.
 *
 * content: { heading, faqs: [{ q, a }] }
 * style:   { bg, textColor, headingColor, accentColor }
 */
export function FAQAccordion({
  heading      = 'Frequently Asked Questions',
  faqs         = [],
  style        = {},
}) {
  const {
    bg           = '#f8fafc',
    textColor    = '#1e293b',
    headingColor = '#013759',
    accentColor  = '#074887',
  } = style

  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  const defaultFaqs = [
    { q: 'Who can apply for incubation?',       a: 'Any student, alumni, or entrepreneur with an innovative idea or early-stage startup can apply.' },
    { q: 'Is there a fee to join NFED?',        a: 'NFED offers various programs at different fee levels, including fully funded government-backed programs.' },
    { q: 'What facilities are available?',      a: 'We offer electronics labs, 3D printing, co-working spaces, high-speed internet, and mentorship sessions.' },
    { q: 'How long is the incubation period?',  a: 'Programs run from 6 months to 2 years depending on the stage and scope of your startup.' },
    { q: 'Do you provide funding?',             a: 'We help connect startups with government grants, angel investors, and seed funding opportunities.' },
  ]

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs

  return (
    <section className="w-full py-12 md:py-16 px-4" style={{ background: bg }}>
      <div className="max-w-3xl mx-auto">
        {heading && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10" style={{ color: headingColor }}>
            {heading}
          </h2>
        )}
        <div className="flex flex-col gap-3">
          {displayFaqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden border transition-all duration-200"
                style={{ borderColor: isOpen ? accentColor : '#e2e8f0', background: '#ffffff' }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm md:text-base gap-4 transition-colors"
                  style={{ color: headingColor }}
                >
                  <span>{faq.q}</span>
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs transition-transform duration-300"
                    style={{
                      background: accentColor,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '500px' : '0px' }}
                >
                  <p className="px-5 pb-5 text-sm md:text-base leading-relaxed" style={{ color: textColor }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
