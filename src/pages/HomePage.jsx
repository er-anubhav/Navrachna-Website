import { Link } from 'react-router-dom'
import { facilities, heroStats, pillars, programs, testimonials } from '../data/siteContent'
import { SectionHeading } from '../components/SectionHeading'

export function HomePage() {
  return (
    <div>
      <section className="w-full px-4 pb-12 pt-10 text-center sm:px-6 lg:px-8 lg:pt-16">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8f7f72]">
          Entrepreneurship, governed
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-[2.8rem] leading-[0.96] tracking-[-0.05em] text-[#241814] sm:text-6xl lg:text-[4.5rem]">
          Your ideas. Your founders. One clear path.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-8 text-[#5f4d42] sm:text-xl">
          Navrachna gives founders one place to access mentorship, workspace, lab support, and funding guidance - so teams can build with clarity and move faster.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-[#ff1800] px-5 py-3.5 text-sm font-bold text-white shadow-none transition hover:bg-[#e61500]"
          >
            Apply now
          </Link>
          <Link
            to="/programs"
            className="rounded-full border border-[#b9a99b] bg-white px-5 py-3.5 text-sm font-bold text-[#241814] transition hover:border-[#241814]"
          >
            Explore programs
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-center">
          {heroStats.map((stat) => (
            <div key={stat.label} className="min-w-[120px]">
              <p className="text-[2rem] font-medium leading-none text-[#ff1800] sm:text-[2.25rem]">{stat.value}</p>
              <p className="mt-1 text-sm leading-6 text-[#43362e]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[#6f5b4d]">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ff1800]" />
            SOC 2 (Type II)
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ff1800]" />
            GDPR + CCPA compliant
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ff1800]" />
            24/7 founder support
          </span>
        </div>
      </section>

      <section className="w-full px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[1.5rem] border border-[#ece4da] bg-[#f6f0eb] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.04)] lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-[1.25rem] bg-[#2e3136] p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.15)] lg:p-5">
              <div className="flex flex-wrap items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                {['Netflix', 'Airbnb', 'Rippling', 'Indeed'].map((company) => (
                  <span key={company}>{company}</span>
                ))}
              </div>
              <div className="mt-8 rounded-[1rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Live event</p>
                <h2 className="mt-4 max-w-md text-2xl font-semibold leading-tight text-white">
                  The AI playbooks founders wish they'd known before scaling.
                </h2>
              </div>
            </div>

            <div className="px-2 py-2 lg:px-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#8f7f72]">Featured session</p>
              <h3 className="mt-3 max-w-xl text-2xl font-semibold leading-tight text-[#241814] sm:text-[2.2rem]">
                Learn how to turn support, infrastructure, and guidance into actual traction.
              </h3>
              <p className="mt-4 max-w-xl text-[1rem] leading-7 text-[#5f4d42]">
                A practical founder session on commercialization, prototyping, and moving from idea stage to a fundable venture.
              </p>
              <Link to="/contact" className="mt-5 inline-flex text-sm font-bold text-[#ff1800]">
                Grab your seat →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why choose us"
          title="A founder toolkit built around clarity, support, and execution."
          description="Zapier’s strongest pages succeed because they make the value obvious in seconds. Navrachna now does the same for incubation: who it helps, what it unlocks, and how to take action."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_16px_50px_rgba(0,0,0,0.04)]">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#b56a22]">{pillar.eyebrow}</p>
              <h3 className="font-display mt-4 text-2xl text-[#1f160f]">{pillar.title}</h3>
              <p className="mt-4 leading-8 text-[#625247]">{pillar.copy}</p>
              <ul className="mt-6 space-y-3 text-sm font-semibold text-[#3a2a21]">
                {pillar.points.map((point) => (
                  <li key={point} className="rounded-2xl border border-[#eadccd] bg-[#fffaf5] px-4 py-3">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Programs"
          title="Four core paths for founders at different stages."
          description="Each program is framed like a product card: clear value, concise proof points, and one primary next step."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program) => (
            <Link
              key={program.slug}
              to={`/programs/${program.slug}`}
              className="group rounded-[2rem] border border-black/5 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(45,33,26,0.1)]"
            >
              <div className={`rounded-[1.5rem] bg-gradient-to-br ${program.accent} p-5`}>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9f5f1f]">Program track</p>
                <h3 className="font-display mt-4 text-2xl text-[#1f160f]">{program.title}</h3>
              </div>
              <p className="mt-5 leading-7 text-[#625247]">{program.summary}</p>
              <ul className="mt-5 space-y-2 text-sm font-semibold text-[#3a2a21]">
                {program.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d9781d]" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#a65c1c] transition group-hover:translate-x-1">
                Learn more
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Facilities"
          title="Everything a startup team needs in one place."
          description="Workspace pages on Zapier feel rich because they bundle the details people need before they convert. This section does the same for Navrachna."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {facilities.map((facility) => (
            <div key={facility.title} className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_16px_50px_rgba(0,0,0,0.04)]">
              <h3 className="font-display text-2xl text-[#1f160f]">{facility.title}</h3>
              <p className="mt-4 leading-8 text-[#625247]">{facility.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Stories"
          title="Founder stories that make the value real."
          description="Short, metric-led testimonials keep the page grounded in outcomes instead of generic claims."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_16px_50px_rgba(0,0,0,0.04)]">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b56a22]">{testimonial.startup}</p>
              <p className="font-display mt-4 text-2xl text-[#1f160f]">“{testimonial.quote}”</p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#eadccd] pt-5">
                <div>
                  <p className="font-semibold text-[#241811]">{testimonial.name}</p>
                  <p className="text-sm text-[#6a5a50]">Founder</p>
                </div>
                <span className="rounded-full bg-[#fff1df] px-4 py-2 text-sm font-semibold text-[#a65c1c]">
                  {testimonial.metric}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] bg-[#201711] p-8 text-[#fff5ea] shadow-[0_24px_60px_rgba(32,23,17,0.18)]">
            <p className="section-kicker text-xs font-bold uppercase text-[#f4b36c]">Ready to start</p>
            <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">Get a clearer path from idea to execution.</h2>
            <p className="mt-5 max-w-xl leading-8 text-[#f6e7d8]">
              Apply now, book a call, or explore the program that fits your stage. The structure is intentionally simple so the next step is obvious.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="rounded-full bg-[#fff4e8] px-6 py-4 text-sm font-semibold text-[#201711]">
                Apply now
              </Link>
              <Link to="/faq" className="rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-[#fff4e8]">
                Read FAQ
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_16px_50px_rgba(0,0,0,0.04)]">
            <p className="section-kicker text-xs font-bold uppercase text-[#b56a22]">Frequently asked</p>
            <div className="mt-6 space-y-4">
              {['How do founders get selected?', 'What facilities are included?', 'Can we apply as a team?'].map((item) => (
                <details key={item} className="group rounded-2xl border border-[#eadccd] bg-[#fffaf5] p-5">
                  <summary className="cursor-pointer list-none font-semibold text-[#2f261f]">{item}</summary>
                  <p className="mt-4 max-w-2xl leading-8 text-[#625247]">
                    Applications are reviewed for fit, stage, and potential impact. Selected teams get access to the most relevant support path and can apply as a team where appropriate.
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}