import { facilities } from '../../data/siteContent'

export function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a1628] px-4 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Facilities</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          A working environment that supports momentum.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300">
          The space is presented like a premium service page: clean, direct, and full of the practical details founders care about before they commit.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {facilities.map((facility) => (
            <div key={facility.title} className="rounded-[2rem] border border-[#eadccd] bg-white/80 p-7">
              <h2 className="font-display text-2xl text-[#1f160f]">{facility.title}</h2>
              <p className="mt-4 leading-8 text-[#625247]">{facility.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}