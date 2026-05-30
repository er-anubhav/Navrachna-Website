import { Link } from 'react-router-dom'
import { programs } from '../data/siteContent'

export function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a1628] px-4 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Programs</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Program tracks built for different startup stages.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300">
          Each track is presented with a clear value proposition — the user knows what it is, who it is for, and what to do next.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <Link
              key={program.slug}
              to={`/programs/${program.slug}`}
              className="rounded-[2rem] border border-[#eadccd] bg-white/80 p-7 transition hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(45,33,26,0.1)]"
            >
              <div className={`rounded-[1.5rem] bg-gradient-to-br ${program.accent} p-6`}>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9f5f1f]">Program</p>
                <h2 className="font-display mt-3 text-3xl text-[#1f160f]">{program.title}</h2>
              </div>
              <p className="mt-5 leading-8 text-[#625247]">{program.summary}</p>
              <span className="mt-5 inline-flex font-semibold text-[#a65c1c]">View details →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}