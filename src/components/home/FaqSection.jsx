import React, { useState } from 'react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { FAQS } from '../../data/landingData'

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <section className="w-full bg-white py-8 md:py-24 border-b border-slate-200/80">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-left md:text-center mb-6 md:mb-16">
            <h2 className="font-normal text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#266d9a]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl border transition-all duration-300 shadow-sm ${
                  openFaq === idx 
                    ? 'border-slate-200 bg-slate-50/20 shadow-md' 
                    : 'border-slate-100 bg-slate-50/40 hover:bg-white hover:border-slate-200'
                }`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-4 py-3.5 sm:px-6 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 focus:outline-none cursor-pointer"
                >
                  <span className={`text-sm sm:text-base tracking-tight leading-snug transition-colors duration-300 pr-2 ${openFaq === idx ? 'text-[#013759]' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <span className={`shrink-0 transition-transform duration-300 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full ${openFaq === idx ? 'rotate-180 bg-[#074887] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-base font-normal text-slate-600 leading-relaxed pt-1 sm:pt-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
