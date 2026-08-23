import React, { useState } from 'react'

const faqs = [
  {
    q: 'What is Navrachna Foundation for Entrepreneurship Development?',
    a: 'Navrachna Foundation for Entrepreneurship Development is a Section 8 Non-Profit Incubation Center under the aegis of I.T.S Engineering College, Greater Noida. It provides seed funding, mentoring, prototyping facilities, and access to state & central government schemes.',
  },
  {
    q: 'Who can apply for incubation support at Navrachna?',
    a: 'Students, faculty members, independent innovators, and early-stage startup founders across India can apply for incubation, seed grants, co-working space, and technical lab access.',
  },
  {
    q: 'What prototyping facilities are available on campus?',
    a: 'Navrachna offers specialized labs including PCB Electronics Prototyping, Formlabs SLA & FDM 3D Printing, CNC Plasma & Laser Cutting Fabrication, and NVIDIA GPU High-End Compute clusters.',
  },
  {
    q: 'How does Navrachna connect startups with investors & government grants?',
    a: 'We facilitate direct access to government schemes like DST NewGen IEDC, MSME Business Incubator, and StartInUP. We also organize investor demo days, hackathons, and pitch sessions.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 py-4 sm:py-5">
      <button
        className="flex w-full items-center justify-between text-left text-base sm:text-lg font-normal text-[#013759] focus:outline-none cursor-pointer py-1"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <span className="ml-4 shrink-0 text-lg font-normal text-slate-400">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600 font-normal">{a}</p>
      )}
    </div>
  )
}

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased font-normal pb-24">
      
      {/* ── Hero Banner Header ── */}
      <section className="relative bg-[#074887] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-b border-[#013759] shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[#013759]/40 pointer-events-none" />

        <div className="relative z-10 w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-8">
            Get In Touch With Us
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="#contact-form" 
              className="px-6 py-3.5 rounded-xl bg-white text-[#013759] text-sm font-normal shadow-lg hover:bg-sky-50 transition-all cursor-pointer"
              style={{ color: '#013759' }}
            >
              Send an Inquiry
            </a>
            <a 
              href="#campus-map" 
              className="px-6 py-3.5 rounded-xl border border-white/40 bg-white/10 text-white! text-sm font-normal backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white!" style={{ color: '#ffffff' }}>View Location Map</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Overview Statistics / Contact Cards Bar ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Direct Helpline</p>
              <a href="tel:+919540527700" className="text-base font-normal text-slate-900 hover:text-[#074887] transition-colors">
                +91 95405 27700
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Official Email</p>
              <a href="mailto:head.nfed@its.edu.in" className="text-base font-normal text-slate-900 hover:text-[#074887] transition-colors">
                head.nfed@its.edu.in
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Incubation Campus</p>
              <h3 className="text-sm font-normal text-slate-900 leading-snug">Knowledge Park III, Gr. Noida</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#074887] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-normal">Working Hours</p>
              <h3 className="text-sm font-normal text-slate-900">Mon – Sat: 9 AM – 5 PM</h3>
            </div>
          </div>

        </div>
      </section>

      {/* ── Main Form & Map Grid ── */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Contact Inquiry Form */}
          <div id="contact-form" className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight mb-2">
              Send an Inquiry
            </h2>
            <p className="text-sm text-slate-500 font-normal mb-6">
              Have a startup idea, research project, or incubation query? Fill out the form below.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-normal">
                Thank you! Your message has been submitted successfully. Our incubation team will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-normal focus:outline-none focus:border-[#074887] focus:ring-1 focus:ring-[#074887]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-normal focus:outline-none focus:border-[#074887] focus:ring-1 focus:ring-[#074887]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-normal focus:outline-none focus:border-[#074887] focus:ring-1 focus:ring-[#074887]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-2">Inquiry Category</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-normal focus:outline-none focus:border-[#074887] focus:ring-1 focus:ring-[#074887] bg-white"
                  >
                    <option value="">Select Topic...</option>
                    <option value="Incubation Application">Incubation Application</option>
                    <option value="MSME / DST Grant Query">MSME / DST Grant Query</option>
                    <option value="Lab & Prototyping Access">Lab & Prototyping Access</option>
                    <option value="Mentorship & Advisory">Mentorship & Advisory</option>
                    <option value="Other Query">Other Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-normal text-slate-700 uppercase tracking-wider mb-2">Your Message</label>
                <textarea 
                  rows="4"
                  required
                  placeholder="Describe your startup concept, prototyping requirement, or question..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-normal focus:outline-none focus:border-[#074887] focus:ring-1 focus:ring-[#074887]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#074887] text-white text-sm font-normal shadow-md hover:bg-[#013759] transition-all cursor-pointer mt-2"
                style={{ color: '#ffffff' }}
              >
                Submit Message
              </button>
            </form>
          </div>

          {/* Location & Map Section */}
          <div id="campus-map" className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col h-full">
              <h2 className="text-xl sm:text-2xl font-normal text-[#013759] tracking-tight mb-2">
                Campus Location
              </h2>
              <p className="text-xs text-slate-500 font-normal mb-4">
                Plot No. 46, Knowledge Park III, Greater Noida, Uttar Pradesh 201308
              </p>

              <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-slate-200 mb-6 bg-slate-100">
                <iframe
                  title="Navrachna Foundation Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9!2d77.4889497!3d28.467642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceb349db39cc1%3A0xf825746415c807d6!2sNewGen%20IEDC%20ITS!5e0!3m2!1sen!2sin!4v1717050000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-auto p-4 rounded-xl bg-sky-50 border border-sky-100 flex items-start gap-3">
                <svg className="w-5 h-5 text-[#074887] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Located within I.T.S Engineering College Campus, easily accessible via Knowledge Park II Metro Station (Aqua Line).
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── FAQ Accordion Section ── */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#013759] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

      </main>

    </div>
  )
}