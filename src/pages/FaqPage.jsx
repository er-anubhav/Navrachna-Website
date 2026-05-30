import { faqs } from '../data/siteContent'

export function FaqPage() {
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
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-[2rem] border border-[#eadccd] bg-white/80 p-6">
              <summary className="cursor-pointer list-none font-semibold text-[#2f261f]">{faq.question}</summary>
              <p className="mt-4 max-w-3xl leading-8 text-[#625247]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}