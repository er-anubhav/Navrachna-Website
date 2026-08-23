import React, { useState } from 'react'
import { testimonials } from '../../data/siteContent'
import { CLIENTS } from '../../data/landingData'
import { newgenProjects } from '../../data/newgenProjects'

const FEATURE_CASE_STUDIES = [
  {
    title: 'Accelerator Enhancer for Electric Bikes',
    category: 'CleanTech & Mobility',
    program: 'DST NewGen-IEDC',
    patent: 'Patent Granted (#202111138661)',
    grant: '₹1.59 Lakhs Sanctioned',
    quote: 'Replacing a single big motor with three smaller BLDC motors solved the fundamental trade-off between acceleration and battery range in electric two-wheelers.',
    founders: 'Shivani Dubey & Md Samiruddin',
    mentor: 'Mr. Mahip Singh & Er. Astha Singh',
    image: 'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-09-23-at-15.19.49-600x800.jpg'
  },
  {
    title: 'Adaptive Biofeedback VR System for Dental Anxiety',
    category: 'HealthTech & AI',
    program: 'DST NewGen-IEDC',
    patent: 'Patent Filed',
    grant: '₹1.75 Lakhs Sanctioned',
    quote: 'An AI-powered VR environment that adjusts in real time to physiological stress signals (heart rate, temperature), easing dental treatment anxiety for children.',
    founders: 'Dr. Zaniab Shah, Mr. Yogesh Mehta & Mr. Vanshit Tyagi',
    mentor: 'Mr. Sudhanshu Ranjan & Dr. Prachi Pathak',
    image: 'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_j3axdaj3axdaj3ax-600x600.png'
  },
  {
    title: 'AI System for Evading Stray Livestock',
    category: 'IoT & Computer Vision',
    program: 'DST NewGen-IEDC',
    patent: 'Patent Granted (#202211011992)',
    grant: '₹2.53 Lakhs Sanctioned',
    quote: 'Shortened magnetic field line BLDC motor architectures paired with vision AI algorithms to prevent road collisions and enhance EV powertrain torque output.',
    founders: 'Shashwat Pandey & Divya Verma',
    mentor: 'Mr. Agha Asim Husain',
    image: 'https://navrachnafoundation.com/wp-content/uploads/2025/12/671c8656-78b3-4842-9eca-b1c5aca6c45d-600x450.jpg'
  },
  {
    title: 'Advance Datum Surface Table',
    category: 'Industrial Automation & Metrology',
    program: 'DST NewGen-IEDC',
    patent: 'Patent Applied',
    grant: '₹2.00 Lakhs Sanctioned',
    quote: 'Automated 3-axis mechanical table that performs GD&T measurements with precision comparable to high-cost CMMs at a fraction of the market price.',
    founders: 'Jayant Singh Rajput',
    mentor: 'Mr. Chetan Dixit',
    image: 'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-20-600x603.png'
  }
]

export function StoriesPage() {
  const [filterTab, setFilterTab] = useState('All')

  const sampleProjects = newgenProjects.slice(0, 8)

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Hero Header ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none"></div>

        <div className="relative w-full text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-4">
            Success Stories & Impact
          </h1>
          <p className="text-sm sm:text-base text-sky-100 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Discover how founders, student innovators, and deep-tech teams at Navrachna Foundation turn breakthrough ideas into patented products, funded ventures, and commercial successes.
          </p>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <span className="block text-2xl sm:text-3xl font-normal text-white mb-1">150+</span>
              <span className="text-xs text-sky-200 uppercase tracking-wider font-normal">Startups Supported</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <span className="block text-2xl sm:text-3xl font-normal text-white mb-1">₹2.5Cr+</span>
              <span className="text-xs text-sky-200 uppercase tracking-wider font-normal">Grants Distributed</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <span className="block text-2xl sm:text-3xl font-normal text-white mb-1">35+</span>
              <span className="text-xs text-sky-200 uppercase tracking-wider font-normal">Patents Filed</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <span className="block text-2xl sm:text-3xl font-normal text-white mb-1">85%</span>
              <span className="text-xs text-sky-200 uppercase tracking-wider font-normal">Survival Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder Testimonials Section ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        <div className="mb-10 text-left">
          <span className="text-xs font-normal text-[#074887] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-md border border-sky-100 inline-block mb-2">
            Founder Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-900">
            Hear From Our Incubated Founders
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1 font-normal">
            Real feedback from entrepreneurs who leveraged our Fab Labs, mentorship, and grant pathways.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#074887] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100 uppercase tracking-wider">
                    {item.startup}
                  </span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-100">
                    {item.metric}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6 font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#074887] text-white flex items-center justify-center font-medium text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-normal text-slate-900 leading-tight">{item.name}</h4>
                  <p className="text-xs text-slate-500 font-normal">Incubated Founder, {item.startup}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Deep-Tech Innovations & Patents ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 bg-white border-y border-slate-200/80">
        <div className="mb-10 text-left">
          <span className="text-xs font-normal text-[#074887] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-md border border-sky-100 inline-block mb-2">
            Patented Innovations
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-900">
            Featured Prototyping Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1 font-normal">
            Highlighted projects nurtured through DST NewGen-IEDC and state grant schemes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {FEATURE_CASE_STUDIES.map((study, idx) => (
            <div 
              key={idx}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:bg-white hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[11px] font-semibold text-[#074887] bg-sky-100/60 px-2.5 py-0.5 rounded-md">
                    {study.category}
                  </span>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
                    {study.patent}
                  </span>
                  <span className="text-[11px] font-medium text-slate-600 bg-slate-200/70 px-2.5 py-0.5 rounded-md">
                    {study.grant}
                  </span>
                </div>

                <h3 className="text-lg font-normal text-slate-900 tracking-tight mb-2">
                  {study.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                  {study.quote}
                </p>
              </div>

              <div className="border-t border-slate-200/80 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-normal">
                <div>
                  <span className="text-slate-400">Founders:</span> <span className="text-slate-800 font-medium">{study.founders}</span>
                </div>
                <div>
                  <span className="text-slate-400">Mentors:</span> <span className="text-slate-700">{study.mentor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Venture Logos Grid Section ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-900 mb-2">
            Incubated Startups Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
            A snapshot of emerging companies building their products with Navrachna Foundation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {CLIENTS.map((client, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex flex-col items-center justify-center text-center shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all"
            >
              <img 
                src={client.src} 
                alt={client.name}
                className="h-10 w-auto object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" 
              />
              <span className="text-[11px] text-slate-600 font-normal line-clamp-1 truncate w-full">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ready to Build CTA Section ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 pb-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-normal text-[#013759] tracking-tight mb-2">
              Ready to Turn Your Idea Into the Next Success Story?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Apply for incubation support, sustenance allowance, prototype grants, and 24/7 Fab Lab access today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <a 
              href="/contact" 
              className="px-6 py-3.5 rounded-xl bg-black text-sm font-normal text-white! hover:bg-slate-800 shadow-md transition-all active:scale-95 cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>Apply for Incubation</span>
            </a>
            <a 
              href="/programs" 
              className="px-6 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-normal text-slate-800 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
              style={{ color: '#0f172a' }}
            >
              <span className="text-slate-900" style={{ color: '#0f172a' }}>Explore Programs</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}