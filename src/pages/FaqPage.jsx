import React, { useState, useEffect } from 'react'
import { faqs as staticFaqs } from '../data/siteContent'
import { getFaqsByContext } from '../services/faqsService'

export function FaqPage() {
  const [faqsList, setFaqsList] = useState(staticFaqs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFaqs() {
      setLoading(true)
      const { data } = await getFaqsByContext('general')
      if (data && data.length > 0) {
        setFaqsList(data)
      }
      setLoading(false)
    }
    fetchFaqs()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a1628] px-4 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">FAQ</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Answers to the questions founders ask most often.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300">
          The goal is to make it easy for people to understand fit, support, and process before they reach out.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        {loading ? (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#013759] mx-auto mb-4" />
            <p className="text-sm text-gray-500">Loading FAQs from Supabase...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <details key={idx} className="rounded-[2rem] border border-[#eadccd] bg-white/80 p-6">
                <summary className="cursor-pointer list-none font-semibold text-[#2f261f]">{faq.question}</summary>
                <p className="mt-4 max-w-3xl leading-8 text-[#625247]">{faq.answer}</p>
              </details>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}