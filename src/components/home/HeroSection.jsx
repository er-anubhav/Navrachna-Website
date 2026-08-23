import React from 'react'
import heroImage from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'
import programsBg from '../../assets/navrachna_images/co-working-area-in-greater-noida-13-scaled.webp'

export function HeroSection() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex min-h-[50vh] md:min-h-[70vh] lg:min-h-[85vh] xl:min-h-[90vh] py-12 md:py-20 lg:py-28 w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-black/65 pointer-events-none"></div>
        </div>

        <div className="relative z-10 flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mt-2 sm:mt-4 font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white leading-tight drop-shadow-lg">
            Where Ideas, Take Flight
          </h1>
          <p className="mt-3 sm:mt-5 max-w-2xl text-xs sm:text-base text-white leading-relaxed font-normal">
            Empowering visionary founders with world-class incubation, <br className="hidden sm:inline" /> state-of-the-art labs, and direct capital access.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative w-full bg-white py-10 sm:py-24 overflow-hidden border-b border-slate-200/80">
        <div className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* Left Column: Image Stack */}
          <div className="w-full lg:w-1/2 flex sm:block flex-row items-center justify-center gap-3 sm:gap-0 h-60 sm:h-120 lg:h-137.5 relative shrink-0">
            <div className="w-1/2 sm:w-[46%] h-full sm:h-92.5 lg:h-107.5 rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl sm:shadow-2xl sm:border-4 sm:border-white sm:absolute sm:left-4 sm:top-8 lg:top-4 transform sm:-translate-y-6 lg:-translate-y-8 sm:hover:-translate-y-8 lg:hover:-translate-y-10 transition-all duration-500 ease-out hover:scale-[1.02] bg-[#013759]">
              <img 
                src={heroImage} 
                alt="Navrachna Incubator Facility" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="w-1/2 sm:w-[46%] h-full sm:h-92.5 lg:h-107.5 rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl sm:shadow-2xl sm:border-4 sm:border-white sm:absolute sm:right-4 sm:bottom-8 lg:bottom-4 transform sm:translate-y-6 lg:translate-y-8 sm:hover:translate-y-4 lg:hover:translate-y-6 transition-all duration-500 ease-out hover:scale-[1.02] bg-[#074887]">
              <img 
                src={programsBg} 
                alt="Co-working workspace desks" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Informational Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            <h2 className="mb-3 sm:mb-6 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#266d9a] leading-snug sm:leading-tight">
              Navrachna Foundation for Entrepreneurship Development
            </h2>

            <div className="text-slate-700 text-xs sm:text-base font-normal leading-relaxed tracking-normal space-y-3 sm:space-y-5 text-left md:text-justify mb-4 sm:mb-8">
              <p>
                Navrachna Foundation for Entrepreneurship Development, a subsidiary of I.T.S Engineering College, Greater Noida, is a dedicated platform committed to empowering the next generation of entrepreneurs. It enables students, faculty, and aspiring innovators to transform their ideas into impactful ventures by supporting the commercialization of technologies and fostering a strong startup culture.
              </p>
              <p>
                As the driving force behind the Startup Incubation Center, the foundation collaborates with the Government of Uttar Pradesh and is supported under the UP Startup Policy 2020, along with associations with key national bodies like Department of Science & Technology (DST - GOI) and Ministry of Micro, Small and Medium Enterprises (MSME). At its core, Navrachna focuses on nurturing innovation, validating ideas, and bridging the gap between inventors and investors—creating startups that contribute meaningfully to society and economic growth.
              </p>
            </div>

            <a 
              href="/about" 
              className="rounded-xl bg-black px-6 py-3 font-normal text-xs sm:text-sm text-white! shadow-md hover:bg-slate-800 hover:text-white! transition-all duration-300 active:scale-95 inline-block cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Read More</span>
            </a>
          </div>
        </div>
      </section>

      {/* Key Impact Metrics Strip */}
      <section className="relative w-full bg-white py-10 sm:py-14 border-b border-slate-200/80">
        <div className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 text-center lg:divide-x divide-[#074887]/15">
            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-[#074887] border border-sky-100 flex items-center justify-center mb-3 shadow-2xs">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">1,276+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#074887] uppercase tracking-wider mt-2">Ideas Screened</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-[#074887] border border-sky-100 flex items-center justify-center mb-3 shadow-2xs">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58-5.84l5.96 5.96" />
                </svg>
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">60+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#074887] uppercase tracking-wider mt-2">Startups Incubated</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-[#074887] border border-sky-100 flex items-center justify-center mb-3 shadow-2xs">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">110+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#074887] uppercase tracking-wider mt-2">Prototypes Built</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-[#074887] border border-sky-100 flex items-center justify-center mb-3 shadow-2xs">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">70+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#074887] uppercase tracking-wider mt-2">IPs Filed (10 Granted)</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-[#074887] border border-sky-100 flex items-center justify-center mb-3 shadow-2xs">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">₹7 Cr+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#074887] uppercase tracking-wider mt-2">Grants Mobilized</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-[#074887] border border-sky-100 flex items-center justify-center mb-3 shadow-2xs">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#013759]">48+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#074887] uppercase tracking-wider mt-2">Industry Mentors</span>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-800 font-medium">
            <span className="bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">DST-NewGen: ₹2.87 Cr</span>
            <span className="bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">StartInUP: ₹2.5 Cr</span>
            <span className="bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">MSME Grant: ₹1.59 Cr</span>
            <span className="bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">DST Training: ₹40 L</span>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative w-full bg-white py-8 sm:py-20 border-b border-slate-200/80">
        <div className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col items-start text-left">
              <h2 className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#266d9a]">
                Vision
              </h2>
              <p className="text-slate-700 text-xs sm:text-base leading-relaxed text-justify font-normal">
                To build a vibrant and inclusive incubation ecosystem where ideas evolve into impactful ventures, creativity is nurtured, and entrepreneurs are empowered to thrive. Our vision is to become a globally recognized and Asia’s leading hub of innovation and entrepreneurship, where education, research, and real-world problem-solving come together seamlessly. We strive to cultivate competent, forward-thinking, and socially responsible innovators by providing the right mentorship, infrastructure, and opportunities—enabling students and faculty alike to experiment, prototype, and transform their ideas into sustainable solutions that contribute meaningfully to society and the future.
              </p>
            </div>

            <div className="w-full md:w-px h-px md:h-auto bg-gray-200 self-stretch my-2 shrink-0"></div>

            <div className="flex-1 flex flex-col items-start text-left">
              <h2 className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#266d9a]">
                Mission
              </h2>
              <p className="text-slate-700 text-xs sm:text-base leading-relaxed text-justify font-normal">
                To create a dynamic and collaborative incubation ecosystem that empowers entrepreneurs with the right resources, mentorship, and networks to grow. We aim to foster a student-first culture rooted in experiential learning, ethical innovation, and sustainability, while also supporting faculty through research and global collaboration. Our mission is to nurture socially responsible, future-ready innovators and build a self-sustaining platform that enables ideas of national and global importance to evolve into impactful startups.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
