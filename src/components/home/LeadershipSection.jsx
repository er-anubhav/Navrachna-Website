import React from 'react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { LEADERSHIP } from '../../data/landingData'

export function LeadershipSection() {
  return (
    <section className="w-full py-8 sm:py-14 md:py-20 bg-[#f8fafc] border-b border-slate-200/80">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-12 text-left md:text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#266d9a] tracking-tight">
              Messages from Our Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {LEADERSHIP.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 md:p-8 flex flex-col gap-3.5 sm:gap-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 sm:gap-5">
                  <div className="shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-[#013759]/15 bg-slate-50">
                    <img
                      src={leader.photo}
                      alt={leader.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs sm:text-base font-normal text-[#013759]">
                      {leader.title}
                    </h3>
                    <div className="text-[10px] sm:text-xs tracking-wide text-gray-500 font-normal mt-0.5">
                      {leader.role}
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100" />

                <div className="relative">
                  <span
                    className="absolute -top-2 -left-1 text-3xl sm:text-5xl leading-none select-none pointer-events-none"
                    style={{ color: '#013759', opacity: 0.08 }}
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <p className="text-xs sm:text-base text-slate-700 leading-relaxed text-left md:text-justify pl-2 font-normal">
                    {leader.message}
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
