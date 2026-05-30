import { Link, useParams } from 'react-router-dom'
import { programs } from '../data/siteContent'

export function ProgramDetailPage() {
  const { slug } = useParams()
  const program = programs.find((item) => item.slug === slug) ?? programs[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a1628] px-4 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Program Detail</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {program.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300">{program.summary}</p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-[#eadccd] bg-white/80 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#b56a22]">What you get</p>
            <ul className="mt-6 space-y-4 text-[#625247]">
              {program.bullets.map((bullet) => (
                <li key={bullet} className="rounded-2xl border border-[#eadccd] bg-[#fffaf5] px-4 py-4">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div className={`rounded-[2rem] bg-gradient-to-br ${program.accent} p-8`}>
            <h2 className="font-display text-3xl text-[#1f160f]">Ready to apply?</h2>
            <p className="mt-4 max-w-xl leading-8 text-[#5f4d42]">
              Use the contact page to request a review, ask questions, or book a discussion about the right stage-fit for your team.
            </p>
            <Link to="/contact" className="mt-6 inline-flex rounded-full bg-[#2d211a] px-6 py-4 text-sm font-semibold text-[#fff7ed]">
              Start application
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}