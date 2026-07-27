import React, { useState, useEffect } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import msmeBiHero from '../assets/navrachna_images/msme_bi_hero.jpeg'

import slide1 from '../assets/navrachna_images/msme_slide_1.jpg'
import slide2 from '../assets/navrachna_images/msme_slide_2.jpg'
import slide3 from '../assets/navrachna_images/msme_slide_3.jpg'
import slide4 from '../assets/navrachna_images/msme_slide_4.jpg'
import slide5 from '../assets/navrachna_images/msme_slide_5.jpg'
import slide6 from '../assets/navrachna_images/msme_slide_6.jpg'
import slide7 from '../assets/navrachna_images/msme_slide_7.jpg'
import slide8 from '../assets/navrachna_images/msme_slide_8.jpg'
import slide9 from '../assets/navrachna_images/msme_slide_9.jpg'
import slide10 from '../assets/navrachna_images/msme_slide_10.jpg'
import slide11 from '../assets/navrachna_images/msme_slide_11.jpg'

export function MsmeBiPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const incubatorObjectives = [
    "Assist prospective entrepreneurs in nurturing their technology ideas and promote successful corporate entities at pre-startup and startup stages.",
    "Promote innovation among budding engineers trained by the institution.",
    "Organize workshops participating successful entrepreneurs.",
    "Commercialize the ongoing research undertaken by various departments of I.T.S Engineering College.",
    "Spot and nurture entrepreneurial talents from among the students of I.T.S Engineering College.",
    "Catalyze and promote the development of S&T based Enterprises and promote employment opportunities.",
    "Act as a forum for industries and organizations to discuss, plan, develop and execute projects benefiting from the intellectual, instructional and hi-tech infrastructure of I.T.S Engineering College."
  ]

  const facilitatedEvents = [
    "Arrange series of Entrepreneurship development programs and interactive sessions to promote Entrepreneurship in the institute.",
    "Arrange visits to industries for prospective entrepreneurs.",
    "Facilitate student teams in showcasing their business ideas to external funding agencies.",
    "Facilitate seed funding for young Entrepreneurs to test their business ideas with minimal risks.",
    "Initiate startups within the campus by the student community by applying their business ideas.",
    "Transfer technical know-how and assist students in setting up entrepreneurial enterprises.",
    "Inculcate the culture of 'apply what you learn and earn while you learn' across the campus."
  ]

  const roadmap = [
    {
      step: "01",
      title: "Marketable Innovation",
      desc: "Come out with an innovative idea which is marketable. The key ingredient of entrepreneurship is 'innovation' which could signify any activity, procedure, or product of high utility that is likely to be of use to society."
    },
    {
      step: "02",
      title: "Acquire ED Knowledge",
      desc: "Learn about entrepreneurship development and actively participate in our structured entrepreneurship development programs."
    },
    {
      step: "03",
      title: "Form a Dedicated Team",
      desc: "Assemble a high-functioning team of passionate, like-minded candidates to co-develop the technology."
    },
    {
      step: "04",
      title: "Identify a Faculty Mentor",
      desc: "Partner with an experienced academic mentor inside the I.T.S campus to guide your prototyping cycle."
    },
    {
      step: "05",
      title: "BI Committee Presentation",
      desc: "Present your detailed prototype draft before the internal BI Sub-Committee for preliminary college-level approval."
    },
    {
      step: "06",
      title: "Ministry Approval & Funding",
      desc: "Pitch directly before the Ministry of MSME committee. Once approved, leverage the sanctioned seed capital of up to ₹15 Lakhs per idea to implement your business idea."
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      
      {/* Hero Header Section */}
      <section className="relative flex min-h-[35vh] w-full items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-4xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            MSME Business Incubator (MSME-BI)
          </h1>
          <p className="mt-4 max-w-4xl mx-auto text-base text-white/80 leading-relaxed">
            Technology Business Incubation at I.T.S Engineering College, empowering next-gen builders.
          </p>
        </div>
      </section>

      {/* Main Core Brief & Image */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Content Block */}
            <div className="lg:col-span-6">
              <span className="text-xs text-[#074887] font-semibold uppercase tracking-widest bg-[#074887]/5 px-3.5 py-1.5 rounded-full inline-block mb-4">
                Technology Business Incubation
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-[#013759] tracking-tight mb-6 leading-tight">
                Empowering Students, Faculty & Staff to Pursue Entrepreneurial Achievements
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 text-justify">
                The MSME- Business Incubation Centre of I.T.S Engineering College was initiated to provide a platform to assist and enable young entrepreneurs to initiate technology start-up companies for commercial exploitation of technologies developed by them. The MSME BI of I.T.S Engineering College also enables the budding entrepreneurs to showcase and test their abilities to run a start-up business.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 text-justify">
                In view of the worldwide shortage of jobs leading to unemployment problems, the cell strives to identify talented youth to entrepreneurial works. The center provides a range of resources empowering innovators to bridge the gap between inventors and venture capitalists.
              </p>
              
              {/* Highlight Grant Box */}
              <div className="rounded-xl bg-slate-50 p-5 mt-6 shadow-xs border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-[#013759]">MSME Government Scheme Support</h4>
                  <span className="text-xs text-[#074887] font-normal bg-[#074887]/5 px-2.5 py-1 rounded-full">₹109.55 Lakh Sanctioned</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Under the “Support for Entrepreneurial and Managerial Development of MSME through Incubators” (MSME Champions Scheme), approved student startup ideas can receive funding support up to a maximum of <strong>₹15 Lakhs per idea</strong> directly from the Government of India.
                </p>
              </div>
            </div>

            {/* Right: Carousel Block */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-3xl border border-slate-100 shadow-xl bg-slate-50 aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
                {slides.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`MSME BI Slide ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                
                {/* Overlay for subtle dark edges */}
                <div className="absolute inset-0 bg-[#013759]/5 pointer-events-none"></div>

                {/* Left/Right Controls */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#013759] p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
                  aria-label="Previous Slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#013759] p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
                  aria-label="Next Slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/20 p-2 rounded-full backdrop-blur-sm">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Complete Core Lists Section */}
      <section className="w-full py-16 bg-[#f8fafc] border-t border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Incubator Objectives Card */}
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs">
              <h3 className="text-2xl text-[#013759] font-normal mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#074887]"></span>
                Incubator Objectives
              </h3>
              <ul className="flex flex-col gap-4">
                {incubatorObjectives.map((obj, oIdx) => (
                  <li key={oIdx} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="text-[#074887] font-semibold mt-0.5">✓</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Facilitated Events Card */}
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xs">
              <h3 className="text-2xl text-[#013759] font-normal mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#074887]"></span>
                Facilitated Startup Events
              </h3>
              <ul className="flex flex-col gap-4">
                {facilitatedEvents.map((evt, eIdx) => (
                  <li key={eIdx} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="text-[#074887] font-semibold mt-0.5">✓</span>
                    <span>{evt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Roadmap Roadmap */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs text-[#074887] font-semibold uppercase tracking-widest bg-[#074887]/5 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Guidelines for Students
            </span>
            <h2 className="text-3xl font-normal text-[#013759] tracking-tight">Entrepreneurship Road Map</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmap.map((item, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-[#f8fafc] p-6 shadow-xs transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <div className="text-3xl font-normal text-[#074887]/20 group-hover:text-[#074887]/40 transition-colors mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg text-[#013759] font-normal mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed text-justify">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
