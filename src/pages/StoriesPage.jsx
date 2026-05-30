import { testimonials } from '../data/siteContent'

export function StoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a1628] px-4 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Stories</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Proof that the support structure creates real outcomes.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300">
          Short testimonials and clear metrics make it easier for prospective founders to trust the process and see themselves in it.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="glass-card rounded-[2rem] border border-white/70 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b56a22]">{testimonial.startup}</p>
              <p className="font-display mt-4 text-2xl text-[#1f160f]">"{testimonial.quote}"</p>
              <div className="mt-6 border-t border-[#eadccd] pt-5">
                <p className="font-semibold text-[#241811]">{testimonial.name}</p>
                <p className="text-sm text-[#6a5a50]">{testimonial.metric}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}