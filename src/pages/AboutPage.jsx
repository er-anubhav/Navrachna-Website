import { SectionHeading } from '../components/SectionHeading'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a1628] px-4 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">About</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          A foundation designed to help founders move with confidence.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300">
          Navrachna exists to help students, faculty, and entrepreneurs turn promising ideas into practical ventures through support, space, and structured guidance.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-[2rem] border border-white/70 p-8">
            <SectionHeading
              eyebrow="Mission"
              title="Create the conditions where innovation becomes execution."
              description="We combine mentorship, incubation, and facilities so founders are not left to figure out the hard parts alone."
            />
          </div>
          <div className="rounded-[2rem] border border-[#eadccd] bg-white/80 p-8">
            <h2 className="font-display text-3xl text-[#1f160f]">How the foundation helps</h2>
            <ul className="mt-6 space-y-4 text-[#625247]">
              {[
                'Structured startup support from idea to validation',
                'Direct access to mentors and program leads',
                'A workspace that supports focused collaboration',
                'Clear pathways to funding and external partnerships',
              ].map((item) => (
                <li key={item} className="rounded-2xl border border-[#eadccd] bg-[#fffaf5] px-4 py-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}