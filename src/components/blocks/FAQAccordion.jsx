import React, { useState } from 'react'

/**
 * FAQAccordion
 * Expandable Q&A list. Matches the original design with custom icons and colored header.
 */
export function FAQAccordion({
  heading      = 'Frequently Asked Questions',
  eyebrow      = 'COMMON QUERIES',
  subheading   = 'Find clear, simple answers to common questions about the Navrachna Foundation setup and application process.',
  faqs         = [],
  style        = {},
}) {
  const {
    bg           = '#ffffff',
    textColor    = '#6b7280',
    headingColor = '#013759',
    accentColor  = '#074887',
  } = style

  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  const defaultFaqs = [
    { q: 'Who can apply for incubation at NFED?',         a: 'Any student, alumni, faculty member, or external entrepreneur with an innovative idea or early-stage startup can apply. We welcome tech and non-tech ventures alike.' },
    { q: 'Is there a fee to join NFED programs?',         a: 'NFED offers a range of programs at different price points, including fully funded government-backed programs like MSME-BI and NIDHI PRAYAS.' },
    { q: 'What facilities are available to incubatees?',  a: 'Incubatees get access to electronics labs, 3D printing, fabrication shop, co-working desks, GPU compute lab, high-speed internet, and mentorship sessions.' },
    { q: 'How long is the incubation period?',            a: 'Programs run from 6 months up to 2 years depending on the stage and scope of your startup. Extensions are available based on progress.' },
    { q: 'Do you provide funding to startups?',           a: 'We help startups access government grants (Startup India, NIDHI PRAYAS), angel investment networks, and SIDBI soft-loan schemes. NFED itself does not provide equity-free grants, but assists in applications.' },
  ]

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs

  // Colorize "Questions" or dynamic title words
  const renderColoredHeading = (text) => {
    if (text.toLowerCase().includes('questions')) {
      const parts = text.split(/questions/i)
      return (
        <>
          {parts[0]}
          <span className="inline-block">
            <span className="text-[#10b981]">Q</span>
            <span className="text-[#ec4899]">u</span>
            <span className="text-[#3b82f6]">e</span>
            <span className="text-[#f59e0b]">s</span>
            <span className="text-[#ef4444]">t</span>
            <span className="text-[#8b5cf6]">i</span>
            <span className="text-[#06b6d4]">o</span>
            <span className="text-[#3b82f6]">n</span>
            <span className="text-[#ec4899]">s</span>
          </span>
          {parts[1]}
        </>
      )
    }
    return text
  }

  return (
    <section className="w-full py-24 border-t border-slate-100" style={{ background: bg }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {eyebrow && (
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="mb-4 font-normal text-3xl md:text-5xl tracking-tight text-[#013759] sm:text-5xl">
              {renderColoredHeading(heading)}
            </h2>
          )}
          {subheading && (
            <p className="text-sm font-normal text-gray-500 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {displayFaqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 shadow-sm ${
                  isOpen 
                    ? 'border-slate-200 bg-slate-50/20 shadow-md' 
                    : 'border-slate-100 bg-slate-50/40 hover:bg-white hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className={`text-base md:text-lg tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#013759]' : 'text-gray-700'}`}>
                    {faq.q || faq.question}
                  </span>
                  <span 
                    className={`shrink-0 transition-transform duration-300 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[#013759] shadow-inner ${
                      isOpen ? 'rotate-180 text-emerald-600' : 'text-[#013759]'
                    }`}
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-sm font-normal leading-relaxed pt-2" style={{ color: textColor }}>
                    {faq.a || faq.answer}
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
