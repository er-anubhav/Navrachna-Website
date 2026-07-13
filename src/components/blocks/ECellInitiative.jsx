import React from 'react'

/**
 * ECellInitiative
 * A premium high-fidelity block representing the original E-Cell ITSEC Initiative section:
 * - Eyebrow & colored heading
 * - Banner card with stats grid
 * - "What we do" student support cards
 * - TECHTRIX 2026 teaser card with category lists
 */
export function ECellInitiative({
  heading     = 'E-Cell I.T.S Engineering College',
  eyebrow     = 'Initiative by Navrachna',
  subheading  = 'An active student-run entrepreneurship cell powered, mentored, and supported by the Navrachna Foundation.',
  stats       = [
    { value: '200+', label: 'Active Student Entrepreneurs' },
    { value: '10+',  label: 'Navrachna-Backed Ventures' },
    { value: '25+',  label: 'Ecosystem & Funding Partners' },
    { value: '100%', label: 'Hands-on Incubation Support' },
  ],
  supportCards = [
    { title: 'Startup Incubation Programs', desc: 'Navrachna provides workspace, cloud credits, and government registration handholding to E-Cell members.', icon: '🚀' },
    { title: 'Co-Organized Workshops', desc: 'Jointly structured bootcamps on product building, IP filing, and commercial pitch preparation.', icon: '🛠️' },
    { title: '1-to-1 Mentor Connections', desc: 'Linking student innovators directly with industry veterans, angel investors, and seasoned academic advisors.', icon: '🤝' },
    { title: 'Ecosystem & Corporate Visits', desc: 'Navrachna facilitates and funds student exposure trips to corporate innovation centers and technology hubs.', icon: '🏢' },
    { title: 'Alumni & Funding Mixers', desc: 'Organizing exclusive networking sessions connecting promising student projects with early-stage venture funding.', icon: '🌐' },
  ],
  techtrixTitle       = 'TECHTRIX 2026',
  techtrixSubtitle    = 'The Ultimate Innovation & Tech Challenge Returns!',
  techtrixDesc        = 'Co-organized and hosted by Navrachna Foundation & E-Cell, TECHTRIX 2026 returns with cutting-edge engineering tracks, enhanced prize pools, and direct path to incubation funding.',
  techtrixStats       = [
    { label: 'Date', value: 'October 2026' },
    { label: 'Venue', value: 'I.T.S Engg. College' },
    { label: 'Organizers', value: 'Navrachna & E-Cell' },
  ],
  techtrixCategories  = [
    'Junior Ideathon', 'Project Exhibition', 'Hack the Issue', 'Business Plan Meet',
    'Crack-o-Code', 'Hack The Box', 'Drone Race', 'Robo Race & War',
    'LAN Gaming', 'Robo Football', 'Quick Challenge'
  ],
  style = {},
}) {
  const {
    bg          = '#f8fafc',
    textColor   = '#64748b',
    titleColor  = '#013759',
    accentColor = '#074887',
  } = style

  return (
    <section className="w-full py-24 border-t border-slate-100" style={{ background: bg }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          {eyebrow && (
            <span className="inline-block rounded-full bg-[#074887]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#074887] uppercase mb-4">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight" style={{ color: titleColor }}>
              <span className="inline-block">
                <span className="text-[#10b981]">E</span>
                <span className="text-[#ec4899]">-</span>
                <span className="text-[#3b82f6]">C</span>
                <span className="text-[#f59e0b]">e</span>
                <span className="text-[#ef4444]">l</span>
                <span className="text-[#8b5cf6]">l</span>
              </span> {heading.replace(/^e-cell/i, '')}
            </h2>
          )}
          {subheading && (
            <p className="mt-4 mx-auto max-w-6xl text-sm leading-relaxed" style={{ color: textColor }}>
              {subheading}
            </p>
          )}
        </div>

        {/* Hero Card + Stats Grid */}
        <div className="relative overflow-hidden px-8 py-12 md:px-16 mb-16 text-black bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
          {/* bg grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl md:text-4xl font-normal tracking-tight leading-snug" style={{ color: titleColor }}>
                Navrachna Powers Student Innovation.
                <span className="text-[#074887]"> Turning Ideas Into Scalable Ventures.</span>
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-relaxed" style={{ color: textColor }}>
                With active sponsorship, infrastructure, and strategic direction from Navrachna Foundation, E-Cell helps students transition from academic projects to registered entities. We support student-led hackathons, seed capital resources, and flagships like <strong style={{ color: titleColor }}>Kartavyam</strong>.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                <a href="mailto:ecell@its.edu.in" className="rounded-xl bg-white border border-black px-6 py-3 text-sm font-normal text-black shadow hover:-translate-y-0.5 transition-all duration-300">
                  Get Started
                </a>
              </div>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-2 gap-4 shrink-0 w-full lg:w-auto">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white border border-black/10 px-6 py-5 text-center shadow-sm">
                  <div className="text-2xl font-normal text-black">{s.value}</div>
                  <div className="mt-1 text-xs text-black/60 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How Navrachna Supports E-Cell */}
        <div id="ecell-what-we-do">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-normal tracking-tight" style={{ color: titleColor }}>How Navrachna Supports E-Cell</h3>
            <p className="mt-2 text-sm" style={{ color: textColor }}>Creating custom resources and structured incubation pathways for student success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {supportCards.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-7 hover:shadow-md hover:border-slate-200 transition-all duration-300">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="text-base font-normal mb-2" style={{ color: titleColor }}>{item.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: textColor }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TECHTRIX 2026 Teaser Card */}
        <div className="rounded-[2.5rem] border border-slate-100 bg-white overflow-hidden shadow-sm">
          <div className="flex flex-col lg:flex-row">
            {/* Left Info Panel */}
            <div className="flex-1 px-8 py-10 lg:px-12">
              <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-normal tracking-widest text-amber-600 uppercase mb-4">
                Navrachna Co-Organized Flagship Event
              </span>
              <h3 className="text-3xl font-normal tracking-tight" style={{ color: titleColor }}>{techtrixTitle}</h3>
              <p className="mt-2 text-sm" style={{ color: textColor }}>{techtrixSubtitle}</p>
              <p className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: textColor }}>
                {techtrixDesc}
              </p>
              
              {/* Event Meta Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {techtrixStats.map((d) => (
                  <div key={d.label} className="text-center rounded-2xl bg-slate-50 px-4 py-4 border border-slate-100">
                    <div className="text-xs text-gray-400 mb-1">{d.label}</div>
                    <div className="text-sm font-normal" style={{ color: titleColor }}>{d.value}</div>
                  </div>
                ))}
              </div>

              <a 
                href="mailto:ecell@its.edu.in?subject=TECHTRIX 2026 Notification"
                className="mt-8 inline-flex rounded-xl bg-[#013759] px-6 py-3 text-sm font-normal text-white hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
              >
                Get Notified →
              </a>
            </div>

            {/* Right Categories List (Dark style) */}
            <div className="lg:w-80 bg-[#013759] px-8 py-10 shrink-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/70 mb-4">Event Categories</p>
              <ul className="space-y-2">
                {techtrixCategories.map((cat, i) => (
                  <li key={cat} className="flex items-center gap-3 text-xs text-white/75">
                    <span className="text-[10px] text-sky-400/70 w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA link strip */}
        <div className="mt-8 text-center">
          <a href="mailto:ecell@its.edu.in" className="text-sm font-normal hover:underline" style={{ color: accentColor }}>
            Contact E-Cell Team: ecell@its.edu.in →
          </a>
        </div>

      </div>
    </section>
  )
}
