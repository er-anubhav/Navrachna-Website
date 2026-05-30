import React from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import msmeBiHero from '../assets/navrachna_images/msme_bi_hero.jpeg'

export function MsmeBiPage() {
  const incubatorObjectives = [
    "Assist prospective entrepreneurs in nurturing their technology ideas and promote successful corporate entities at pre-startup and startup stages.",
    "Promote innovation among budding engineers trained by the institution.",
    "Organize workshops participating successful entrepreneurs.",
    "Commercialize the ongoing research undertaken by various departments of ITS Engineering College.",
    "Spot and nurture entrepreneurial talents from among the students of ITS Engineering College.",
    "Catalyze and promote the development of S&T based Enterprises and promote employment opportunities.",
    "Act as a forum for industries and organizations to discuss, plan, develop and execute projects benefiting from the intellectual, instructional and hi-tech infrastructure of ITS Engineering College."
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
      desc: "Partner with an experienced academic mentor inside the ITS campus to guide your prototyping cycle."
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
            Technology Business Incubation at ITS Engineering College, empowering next-gen builders.
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
                The MSME- Business Incubation Centre of ITS Engineering College was initiated to provide a platform to assist and enable young entrepreneurs to initiate technology start-up companies for commercial exploitation of technologies developed by them. The MSME BI of ITS Engineering College also enables the budding entrepreneurs to showcase and test their abilities to run a start-up business.
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

            {/* Right: Local Downloaded Photo Block */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-slate-100 shadow-xl bg-slate-50">
                <img 
                  src={msmeBiHero} 
                  alt="MSME BI Incubation Activity" 
                  className="w-full h-auto object-cover rounded-3xl transition-transform duration-500 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[#013759]/5 pointer-events-none"></div>
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
