import { useState } from 'react'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'

const faqs = [
  {
    q: 'What is Navrachna Foundation for Entrepreneurship Development?',
    a: 'Navrachna Foundation for Entrepreneurship Development (NFED) is an initiative by ITS Engineering College, Greater Noida, dedicated to nurturing innovation and entrepreneurship among students, faculty, and industry professionals. It provides mentoring, funding support, incubation facilities, and access to a wide network of experts and investors.',
  },
  {
    q: 'Who can benefit from the foundation?',
    a: 'Students, faculty members, researchers, and early-stage entrepreneurs associated with ITS Engineering College or the broader innovation ecosystem can benefit from NFED. The foundation supports individuals and teams at various stages of their entrepreneurial journey.',
  },
  {
    q: 'What resources does the foundation provide?',
    a: 'NFED offers a range of resources including co-working spaces, fabrication labs, electronics labs, 3D printing facilities, high-end computing systems, seed funding, mentorship programs, and connections to government schemes like NewGen-IEDC, MSME-BI, and StartinUP.',
  },
  {
    q: 'How does the foundation help bridge the gap between inventors and venture capitalists?',
    a: 'NFED organizes pitch events, hackathons, and networking sessions that connect innovators with potential investors and industry partners. Through structured incubation programs and mentoring, it helps startups refine their ideas and become investment-ready.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex w-full items-center justify-between text-left text-base font-medium text-[#074887] focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <span className="ml-4 flex-shrink-0 text-xl font-light text-gray-400">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
      )}
    </div>
  )
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Hero Banner ── */}
      <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-[#013759]/90 pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
            Get In Touch
          </h1>
          <p className="mt-6 max-w-4xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
            Feel free to reach out to us for any inquiries, support, or collaboration opportunities.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/startin-up" className="rounded-xl bg-white px-8 py-4 font-normal text-[#013759] shadow-lg hover:-translate-y-1 transition-all duration-300">
              Join the Workspace
            </a>
            <a href="/programs" className="rounded-xl border border-white/30 bg-white px-8 py-4 font-normal text-white backdrop-blur-md hover:-translate-y-1 transition-all duration-300">
              Explore Programs
            </a>
          </div>
        </div>
      </section>

      {/* ── 3 Info Cards ── */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-3">

          {/* Phone */}
          <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
              <svg className="h-6 w-6 text-[#074887]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3 className="text-base  text-gray-800">Phone</h3>
            <p className="mt-1 text-sm text-gray-500">+91 95405 27700</p>
            <a
              href="tel:+919540527700"
              className="mt-4 text-xs  uppercase tracking-widest text-[#074887] hover:underline"
            >
              Call Now →
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
              <svg className="h-6 w-6 text-[#074887]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline strokeLinecap="round" strokeLinejoin="round" points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="text-base  text-gray-800">Email</h3>
            <p className="mt-1 text-sm text-gray-500">head.nfed@its.edu.in</p>
            <a
              href="mailto:head.nfed@its.edu.in"
              className="mt-4 text-xs  uppercase tracking-widest text-[#074887] hover:underline"
            >
              Email Us →
            </a>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
              <svg className="h-6 w-6 text-[#074887]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <h3 className="text-base  text-gray-800">Location</h3>
            <p className="mt-1 text-sm text-gray-500">Plot no. 46, Knowledge Park 3, Greater Noida</p>
            <a
              href="https://maps.google.com/?q=ITS+Incubation+Center+Knowledge+Park+3+Greater+Noida"
              target="_blank"
              rel="noreferrer"
              className="mt-4 text-xs  uppercase tracking-widest text-[#074887] hover:underline"
            >
              ITS Incubation Center
            </a>
          </div>

        </div>
      </section>

      {/* ── Google Map Embed ── */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <iframe
            title="NFED Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9!2d77.4889497!3d28.467642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceb349db39cc1%3A0xf825746415c807d6!2sNewGen%20IEDC%20ITS!5e0!3m2!1sen!2sin!4v1717050000000!5m2!1sen!2sin"
            width="100%"
            height="380"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl text-gray-900">Everything You Need to Know</h2>
          <p className="mt-3 text-sm text-gray-500">
            Find answers to common questions about the{' '}
            <span className="text-[#074887]">Navrachna Foundation for Entrepreneurship Development.</span>
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

    </div>
  )
}