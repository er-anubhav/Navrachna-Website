import React, { useState, useEffect } from 'react'
import logo from '../assets/navrachna_images/nfed_logo.png'
import { useCms } from '../hooks/useCms'

const DEFAULT_HEADER = {
  topBar: {
    phone: "+91 9540527700",
    email: "head.nfed@its.edu.in",
    facebook: "https://www.facebook.com/share/1EsxYHE9Rr/",
    instagram: "https://www.instagram.com/itsec_nfed",
    linkedin: "https://www.linkedin.com/company/itsec-nfed/",
  },
  navbar: { brandName: "NFED" },
}

// ─── NAV STRUCTURE ───────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Home',         href: '/' },
  { label: 'Startin-up',  href: '/startin-up' },
  { label: 'Newgen-IEDC', href: '/programs/newgen-iedc' },
  {
    label: 'MSME-BI', href: '/msme-bi',
    children: [
      { label: 'MSME Yearly Activities', href: '/msme-yearly-activities' },
      { label: 'MSME Hackathons',        href: '/msme-hackathons' },
    ],
  },
  { label: 'Our Policies', href: '/policies' },
  { label: 'Portfolio',    href: '/portfolio' },
  {
    label: 'More', href: '#',
    children: [
      { label: 'About Us',  href: '/about' },
      { label: 'Our Team',  href: '/team' },
      {
        label: 'Facilities', href: '/facilities',
        children: [
          { label: 'Electronics Labs',    href: '/facilities/electronics-labs' },
          { label: 'High End Computers',  href: '/facilities/high-end-computers' },
          { label: '3D Printing',         href: '/facilities/3d-printing' },
          { label: 'Fabrication Lab',     href: '/facilities/fabrication-lab' },
        ],
      },
    ],
  },
  { label: 'IIC-ITSEC', href: '/innovation-cell/iic-itsec' },
]

// ─── ICONS ───────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const EmailIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const FbIcon = () => (
  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IgIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const LiIcon = () => (
  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

// ─── MOBILE ACCORDION ITEM ────────────────────────────────────────
function MobileNavItem({ item, depth = 0, onClose }) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const indent = depth > 0 ? 'pl-4 border-l border-white/10' : ''

  return (
    <div className={indent}>
      {hasChildren ? (
        <>
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center justify-between py-3 px-1 text-left font-medium text-white/90 hover:text-white transition-colors"
          >
            <span>{item.label}</span>
            <span
              className="text-white/50 text-sm transition-transform duration-200"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}
            >
              ▾
            </span>
          </button>
          {open && (
            <div className="mb-1">
              {item.children.map((child, i) => (
                <MobileNavItem key={i} item={child} depth={depth + 1} onClose={onClose} />
              ))}
            </div>
          )}
        </>
      ) : (
        <a
          href={item.href}
          onClick={onClose}
          className="block py-3 px-1 font-medium text-white/90 hover:text-white transition-colors"
        >
          {item.label}
        </a>
      )}
    </div>
  )
}

// ─── DESKTOP DROPDOWN ────────────────────────────────────────────
function DesktopDropdown({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={item.href === '#' ? undefined : item.href}
        className="flex items-center gap-1 transition-colors text-black hover:text-[#074887] cursor-pointer py-1"
      >
        {item.label} <span className="text-[9px] text-gray-400">▼</span>
      </a>
      {open && (
        <div className="absolute left-0 top-full pt-1.5 w-56 z-50">
          <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl flex flex-col">
            {item.children.map((child, i) =>
              child.children ? (
                // Nested flyout
                <div key={i} className="relative group/sub">
                  <div className="flex items-center justify-between rounded-lg px-4 py-2 text-xs text-black hover:bg-slate-50 hover:text-[#074887] cursor-pointer transition-colors">
                    <span>{child.label}</span>
                    <span className="text-[8px] text-gray-400">◀</span>
                  </div>
                  <div className="invisible group-hover/sub:visible absolute right-full top-0 pr-2 w-52 z-50">
                    <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl flex flex-col">
                      {child.children.map((sub, j) => (
                        <a key={j} href={sub.href} className="block rounded-lg px-4 py-2 text-xs text-black hover:bg-slate-50 hover:text-[#074887] transition-colors">
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a key={i} href={child.href} className="block rounded-lg px-4 py-2 text-xs text-black hover:bg-slate-50 hover:text-[#074887] transition-colors">
                  {child.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export function HeaderV1({ data: customData }) {
  const { data: dbData } = useCms('header')
  const data = customData || dbData || DEFAULT_HEADER

  const [mobileOpen, setMobileOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const phone     = data.topBar?.phone     || DEFAULT_HEADER.topBar.phone
  const email     = data.topBar?.email     || DEFAULT_HEADER.topBar.email
  const facebook  = data.topBar?.facebook  || DEFAULT_HEADER.topBar.facebook
  const instagram = data.topBar?.instagram || DEFAULT_HEADER.topBar.instagram
  const linkedin  = data.topBar?.linkedin  || DEFAULT_HEADER.topBar.linkedin
  const brandName = data.navbar?.brandName || DEFAULT_HEADER.navbar.brandName

  return (
    <>
      {/* ── Top Info Bar ─────────────────────────────────── */}
      <div className="relative z-50 w-full bg-[#074887] text-white text-xs border-b border-white/10 py-2.5 font-sans">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Contact info */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-start">
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-white/95 hover:text-white transition-colors">
              <PhoneIcon /><span>{phone}</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/95 hover:text-white transition-colors">
              <EmailIcon /><span>{email}</span>
            </a>
          </div>
          {/* Quick links + socials */}
          <div className="flex items-center gap-5">
            <a href="/gallery"  className="text-white/80 hover:text-white transition-colors tracking-wide">Gallery</a>
            <span className="text-white/30">|</span>
            <a href="/contact"  className="text-white/80 hover:text-white transition-colors tracking-wide">Contact Us</a>
            <span className="text-white/30">|</span>
            {facebook  && <a href={facebook}  target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Facebook"><FbIcon /></a>}
            {instagram && <a href={instagram} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Instagram"><IgIcon /></a>}
            {linkedin  && <a href={linkedin}  target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="LinkedIn"><LiIcon /></a>}
          </div>
        </div>
      </div>

      {/* ── Main Navbar ──────────────────────────────────── */}
      <header className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-5 text-black bg-white border-b border-slate-100">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="NFED Logo" className="h-10 w-auto object-contain" />
          <span className="text-2xl tracking-wider text-[#074887]">{brandName}</span>
        </a>

        {/* Desktop Nav — hidden below lg */}
        <nav className="flex max-lg:hidden items-center justify-end gap-x-8 text-sm font-normal tracking-wider text-black">
          {NAV_ITEMS.map((item, i) =>
            item.children ? (
              <DesktopDropdown key={i} item={item} />
            ) : (
              <a key={i} href={item.href} className="transition-colors text-black hover:text-[#074887]">
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Hamburger button — visible below lg */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          className="hidden max-lg:flex flex-col justify-center gap-1.5 w-9 h-9 items-center rounded-lg hover:bg-slate-100 transition-colors"
        >
          <span className="block w-5 h-0.5 bg-[#013759] rounded-full" />
          <span className="block w-5 h-0.5 bg-[#013759] rounded-full" />
          <span className="block w-3.5 h-0.5 bg-[#013759] rounded-full self-start ml-[5px]" />
        </button>
      </header>

      {/* ── Mobile Full-Screen Overlay ───────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 z-60 bg-black/40 lg:hidden transition-opacity duration-300"
        style={{
          opacity:        mobileOpen ? 1 : 0,
          pointerEvents:  mobileOpen ? 'auto' : 'none',
        }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-80 max-w-[90vw] z-70 lg:hidden flex flex-col bg-[#013759] shadow-2xl transition-transform duration-300 ease-in-out"
        style={{ transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <a href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <img src={logo} alt="NFED Logo" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="text-lg font-bold text-white tracking-wider">{brandName}</span>
          </a>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Nav items — scrollable */}
        <nav className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/10">
          {NAV_ITEMS.map((item, i) => (
            <MobileNavItem key={i} item={item} onClose={() => setMobileOpen(false)} />
          ))}
        </nav>

        {/* Footer quick links */}
        <div className="px-6 py-5 border-t border-white/10 flex gap-4 text-xs text-white/60">
          <a href="/gallery"  onClick={() => setMobileOpen(false)} className="hover:text-white transition-colors">Gallery</a>
          <a href="/contact"  onClick={() => setMobileOpen(false)} className="hover:text-white transition-colors">Contact</a>
          <a href="/admin"    onClick={() => setMobileOpen(false)} className="hover:text-white transition-colors">Admin</a>
        </div>
      </div>
    </>
  )
}