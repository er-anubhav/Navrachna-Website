import { useState } from 'react'
import toast from 'react-hot-toast'
import { submitContact, subscribeNewsletter } from '../lib/api'
import heroImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp'
import ScrollReveal from '../components/ScrollReveal'

const faqs = [
  {
    q: 'What is Navrachna Foundation for Entrepreneurship Development?',
    a: 'Navrachna Foundation for Entrepreneurship Development is an initiative by I.T.S Engineering College, Greater Noida, dedicated to nurturing innovation and entrepreneurship among students, faculty, and industry professionals. It provides mentoring, funding support, incubation facilities, and access to a wide network of experts and investors.',
  },
  {
    q: 'Who can benefit from the foundation?',
    a: 'Students, faculty members, researchers, and early-stage entrepreneurs associated with I.T.S Engineering College or the broader innovation ecosystem can benefit from Navrachna Foundation. The foundation supports individuals and teams at various stages of their entrepreneurial journey.',
  },
  {
    q: 'What resources does the foundation provide?',
    a: 'Navrachna Foundation offers co-working spaces, fabrication labs, electronics labs, 3D printing facilities, high-end computing systems, seed funding, mentorship programs, and connections to government schemes like NewGen-IEDC, MSME-BI, and StartinUP.',
  },
  {
    q: 'How does the foundation help bridge the gap between inventors and venture capitalists?',
    a: 'Navrachna Foundation organizes pitch events, hackathons, and networking sessions that connect innovators with potential investors and industry partners. Through structured incubation programs and mentoring, it helps startups refine their ideas and become investment-ready.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderBottom: '1px solid rgba(7,72,135,0.12)',
      padding: '1.25rem 0',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', width: '100%', alignItems: 'center',
          justifyContent: 'space-between', textAlign: 'left',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Sora', sans-serif", fontWeight: 600,
          fontSize: '1rem', color: '#074887', padding: 0,
        }}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span style={{
          flexShrink: 0, marginLeft: '1rem',
          width: '28px', height: '28px',
          borderRadius: '50%',
          background: open ? '#074887' : 'rgba(7,72,135,0.08)',
          color: open ? '#fff' : '#074887',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', fontWeight: 300,
          transition: 'all 0.25s ease',
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <div style={{
        maxHeight: open ? '300px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <p style={{
          marginTop: '0.75rem', marginBottom: 0,
          fontSize: '0.92rem', lineHeight: 1.75,
          color: '#5a6272', fontFamily: "'Karla', sans-serif"
        }}>{a}</p>
      </div>
    </div>
  )
}

const SUBJECTS = [
  'General Inquiry',
  'Incubation Application',
  'Facility Booking',
  'Partnership / Collaboration',
  'Media & Press',
  'Funding & Grants',
  'Other',
]

const InfoCard = ({ icon, title, value, link, linkText }) => (
  <div className="glass-card card-hover" style={{
    borderRadius: '20px', padding: '2rem',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', gap: '1rem',
  }}>
    <div style={{
      width: '56px', height: '56px', borderRadius: '16px',
      background: 'linear-gradient(135deg, #074887, #0a5da6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 24px rgba(7,72,135,0.3)',
    }}>
      {icon}
    </div>
    <div>
      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#013759', fontFamily: "'Sora', sans-serif" }}>{title}</h3>
      <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem', color: '#5a6272' }}>{value}</p>
    </div>
    {link && (
      <a href={link} target={link.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
        style={{
          fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#e67614',
          textDecoration: 'none', marginTop: 'auto',
        }}>
        {linkText} →
      </a>
    )}
  </div>
)

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [newsletter, setNewsletter] = useState('')
  const [subLoading, setSubLoading] = useState(false)

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    try {
      await submitContact(form)
      toast.success('Message sent! We\'ll get back to you shortly.')
      setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' })
    } catch {
      toast.error('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleNewsletter = async (e) => {
    e.preventDefault()
    if (!newsletter) return
    setSubLoading(true)
    try {
      await subscribeNewsletter(newsletter)
      toast.success('Subscribed! Welcome to NFED updates.')
      setNewsletter('')
    } catch (err) {
      const msg = err?.response?.data?.detail
      if (msg?.includes('already')) toast('You\'re already subscribed! 🎉', { icon: '✅' })
      else toast.error('Subscription failed. Please try again.')
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb' }}>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative', minHeight: '60vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', padding: '6rem 1rem',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.65,
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #013759ee, #074887dd)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-block', padding: '6px 18px',
            background: 'rgba(251,191,36,0.18)', borderRadius: '999px',
            color: '#fbbf24', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: '1.5rem', border: '1px solid rgba(251,191,36,0.3)',
          }}>Contact Us</span>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800,
            color: '#fff', margin: 0, lineHeight: 1.1,
            fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em',
          }}>
            Let's Build Something{' '}
            <span style={{
              background: 'linear-gradient(135deg, #e67614, #fbbf24)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Remarkable</span>
          </h1>
          <p style={{
            marginTop: '1.5rem', color: 'rgba(255,255,255,0.78)',
            fontSize: '1.05rem', lineHeight: 1.75,
          }}>
            Reach out for incubation queries, partnerships, media, or just to say hello.
          </p>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section style={{ padding: '4rem 1.5rem 0', position: 'relative', zIndex: 1, marginTop: '-3rem' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}>
          <ScrollReveal delay={1}>
            <InfoCard
              icon={<svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
              title="Phone" value="+91 95405 27700"
              link="tel:+919540527700" linkText="Call Now"
            />
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <InfoCard
              icon={<svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
              title="Email" value="head.nfed@its.edu.in"
              link="mailto:head.nfed@its.edu.in" linkText="Email Us"
            />
          </ScrollReveal>
          <ScrollReveal delay={3}>
            <InfoCard
              icon={<svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>}
              title="Location" value="Plot 46, Knowledge Park 3, Greater Noida"
              link="https://maps.google.com/?q=I.T.S+Engineering+College+Greater+Noida" linkText="Get Directions"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact Form + Map ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gap: '2.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'start',
        }}>
          {/* Contact Form */}
          <ScrollReveal>
            <div className="glass-card" style={{ borderRadius: '24px', padding: '2.5rem', background: '#fff' }}>
              <h2 style={{
                margin: '0 0 0.5rem', fontFamily: "'Sora', sans-serif",
                fontWeight: 800, fontSize: '1.75rem', color: '#013759',
              }}>Send a Message</h2>
              <p style={{ margin: '0 0 2rem', color: '#5a6272', fontSize: '0.9rem' }}>
                We typically respond within 24 hours on business days.
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#074887', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Full Name <span style={{ color: '#e67614' }}>*</span>
                    </label>
                    <input
                      className="form-input"
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="Rajesh Kumar" required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#074887', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Phone Number
                    </label>
                    <input
                      className="form-input"
                      name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 98765 43210" type="tel"
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#074887', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Email Address <span style={{ color: '#e67614' }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    name="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com" type="email" required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#074887', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Subject
                  </label>
                  <select className="form-input" name="subject" value={form.subject} onChange={handleChange}>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#074887', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Message <span style={{ color: '#e67614' }}>*</span>
                  </label>
                  <textarea
                    className="form-input"
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about your idea, question, or how we can help..."
                    rows={5} required
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary shimmer"
                  style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg style={{ animation: 'spin 1s linear infinite' }} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                      Sending...
                    </span>
                  ) : 'Send Message →'}
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Map */}
          <ScrollReveal delay={2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(7,72,135,0.12)', border: '1px solid rgba(7,72,135,0.08)' }}>
                <iframe
                  title="Navrachna Foundation Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9!2d77.4889497!3d28.467642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceb349db39cc1%3A0xf825746415c807d6!2sNewGen%20IEDC%20ITS!5e0!3m2!1sen!2sin!4v1717050000000!5m2!1sen!2sin"
                  width="100%" height="320"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Office hours */}
              <div className="glass-card" style={{ borderRadius: '20px', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem', fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#013759', fontSize: '1rem' }}>
                  🕐 Office Hours
                </h3>
                {[
                  ['Monday – Friday', '9:00 AM – 6:00 PM'],
                  ['Saturday', '10:00 AM – 4:00 PM'],
                  ['Sunday', 'Closed'],
                ].map(([day, time]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(7,72,135,0.08)', fontSize: '0.88rem' }}>
                    <span style={{ color: '#5a6272' }}>{day}</span>
                    <span style={{ fontWeight: 600, color: '#013759' }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section style={{
        background: 'linear-gradient(135deg, #013759 0%, #074887 100%)',
        padding: '4rem 1.5rem', textAlign: 'center',
      }}>
        <ScrollReveal>
          <p style={{
            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#fbbf24', marginBottom: '0.75rem',
          }}>Stay Updated</p>
          <h2 style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff',
            margin: '0 0 0.75rem',
          }}>Get NFED Updates in Your Inbox</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Hackathon calls, grant deadlines, and startup stories — curated monthly.
          </p>
          <form onSubmit={handleNewsletter} style={{
            display: 'flex', gap: '0.75rem', maxWidth: '480px',
            margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <input
              type="email" value={newsletter} onChange={e => setNewsletter(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                flex: 1, minWidth: '220px', padding: '14px 18px',
                borderRadius: '12px', border: '1.5px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                color: '#fff', fontFamily: "'Karla', sans-serif", fontSize: '0.95rem', outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={subLoading}
              className="btn-accent shimmer"
              style={{ opacity: subLoading ? 0.7 : 1 }}
            >
              {subLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </ScrollReveal>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e67614', marginBottom: '0.75rem' }}>
                Common Questions
              </p>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#013759', margin: 0 }}>
                Everything You Need to Know
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}