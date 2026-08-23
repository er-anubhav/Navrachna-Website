import React from 'react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { CLIENTS } from '../../data/landingData'

export function PortfolioSection() {
  return (
    <section className="w-full bg-white py-8 md:py-24 border-b border-slate-200/80 overflow-hidden">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 md:mb-16 text-left md:text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#266d9a] tracking-tight">
            Our Portfolio Startups
          </h2>
        </div>
        
        {/* Desktop Marquee Carousel */}
        <div className="max-md:hidden relative w-full overflow-hidden py-2">
          <div className="absolute top-0 left-0 h-full w-24 sm:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-24 sm:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-marquee-infinite">
            {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((item, idx) => {
              const borderColors = [
                'border-sky-100/90 hover:border-sky-200',
                'border-orange-100/90 hover:border-orange-200',
                'border-lime-100/90 hover:border-lime-200',
                'border-rose-100/90 hover:border-rose-200',
                'border-teal-100/90 hover:border-teal-200',
                'border-purple-100/90 hover:border-purple-200'
              ];
              const logoIndex = idx % CLIENTS.length;
              const borderClass = borderColors[logoIndex % borderColors.length];
              const cardStyle = item.bgDark 
                ? 'bg-black border-slate-800 hover:border-slate-700' 
                : `bg-white ${borderClass}`;
              return (
                <div key={idx} className="flex flex-col items-center justify-center w-64 shrink-0 px-4 group">
                  <div className={`w-full h-32 rounded-[2rem] flex items-center justify-center p-5 shadow-sm border-4 ${cardStyle} transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
                    <img 
                      src={item.src} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain transition-all duration-300" 
                    />
                  </div>
                  <span className="mt-2.5 text-xs font-medium tracking-wide text-slate-600 text-center truncate max-w-full">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden w-full px-4">
          <div className="grid grid-rows-3 grid-flow-col gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth">
            {CLIENTS.map((item, idx) => {
              const borderColors = [
                'border-sky-100/90',
                'border-orange-100/90',
                'border-lime-100/90',
                'border-rose-100/90',
                'border-teal-100/90',
                'border-purple-100/90'
              ];
              const borderClass = borderColors[idx % borderColors.length];
              const cardStyle = item.bgDark 
                ? 'bg-black border-slate-800' 
                : `bg-white ${borderClass}`;
              return (
                <div key={idx} className="w-33.75 shrink-0 snap-start flex flex-col items-center">
                  <div className={`w-full h-20 rounded-xl flex items-center justify-center p-2.5 shadow-xs border-2 ${cardStyle}`}>
                    <img 
                      src={item.src} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <span className="mt-1.5 text-[10px] font-medium tracking-wide text-slate-600 text-center truncate max-w-full">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
