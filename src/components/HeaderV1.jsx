import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/navrachna_images/nfed_logo.png'

export function HeaderV1() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Desktop dropdown states
  const [msmeOpen, setMsmeOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  // Mobile accordion states
  const [mobileMsmeOpen, setMobileMsmeOpen] = useState(false)
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false)
  const [mobileFacOpen, setMobileFacOpen] = useState(false)
  const [mobileInnOpen, setMobileInnOpen] = useState(false)

  return (
    <>
      {/* Top Info Contact Bar */}
      <div className="relative z-50 w-full bg-[#074887] text-white text-[11px] sm:text-xs border-b border-white/20 py-1 sm:py-2 font-sans">
        <div className="w-full px-3 sm:px-8 lg:px-12 flex flex-row items-center justify-between gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-2.5 sm:gap-5 min-w-0">
            <a href="tel:+919540527700" className="flex items-center gap-1.5 text-white/95 hover:text-white transition-colors shrink-0">
              <svg className="h-3.5 w-3.5 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 9540527700</span>
            </a>
            <span className="text-white/30">|</span>
            <a href="mailto:head.nfed@its.edu.in" className="flex items-center gap-1.5 text-white/95 hover:text-white transition-colors shrink-0">
              <svg className="h-3.5 w-3.5 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span className="max-sm:hidden">head.nfed@its.edu.in</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>

          {/* Right: Social Handles */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a href="https://www.facebook.com/share/1EsxYHE9Rr/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Facebook">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/itsec_nfed" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Instagram">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/itsec-nfed/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="X (Twitter)">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="YouTube">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <header className="relative z-50 bg-white border-b-2 border-slate-300 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-8 py-1.5 sm:py-4 lg:py-5">
          {/* Logo & Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <img src={logo} alt="Navrachna Logo" className="h-8 sm:h-10 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.02]" />
              
              <div className="h-7 sm:h-9 w-px bg-slate-300 shrink-0"></div>

              <div className="flex flex-col justify-center leading-tight min-w-0">
                <span className="text-xl sm:text-lg font-bold tracking-tight text-[#013759] uppercase group-hover:text-[#074887] transition-colors whitespace-nowrap">
                  NAVRACHNA FOUNDATION 
                </span>
                <span className="max-sm:hidden text-[10px] sm:text-[11px] font-medium text-gray-500 tracking-wide">
                  for Entrepreneurship Development
                </span>
                <span className="max-sm:hidden text-[9px] sm:text-[10px] font-normal text-gray-400 tracking-tight whitespace-nowrap">
                  (A Section 8 Company of I.T.S Engineering College, Greater Noida)
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation (max-lg:hidden flex) */}
          <nav className="max-lg:hidden flex items-center justify-end gap-x-4 xl:gap-x-7 text-xs xl:text-sm font-medium tracking-wide text-[#013759] shrink-0">
            <Link to="/" className="text-[#013759] transition-colors hover:text-[#074887]">Home</Link>
            <Link to="/startin-up" className="text-[#013759] transition-colors hover:text-[#074887]">StartIn-UP</Link>
            <Link to="/programs/newgen-iedc" className="text-[#013759] transition-colors hover:text-[#074887]">NewGen-IEDC</Link>
            
            {/* MSME-BI Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMsmeOpen(true)}
              onMouseLeave={() => setMsmeOpen(false)}
            >
              <Link to="/msme-bi" className="flex items-center gap-1 text-[#013759] transition-colors hover:text-[#074887] cursor-pointer py-1">
                MSME-BI <span className="text-[9px] text-gray-400">▼</span>
              </Link>
              
              {msmeOpen && (
                <div className="absolute left-0 top-full pt-1.5 w-56 z-50">
                  <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                    <Link 
                      to="/msme-yearly-activities" 
                      className="block rounded-lg px-4 py-2 text-xs font-normal text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                    >
                      MSME Yearly Activities
                    </Link>
                    <Link 
                      to="/msme-hackathons" 
                      className="block rounded-lg px-4 py-2 text-xs font-normal text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                    >
                      MSME Hackathons
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/policies" className="text-[#013759] transition-colors hover:text-[#074887]">Our Policies</Link>
            <Link to="/portfolio" className="text-[#013759] transition-colors hover:text-[#074887]">Portfolio</Link>
            
            {/* Combined More Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#013759] transition-colors hover:text-[#074887] focus:outline-none cursor-pointer py-1 font-medium">
                More <span className="text-[9px] text-gray-400">▼</span>
              </button>
              
              {moreOpen && (
                <div className="absolute right-0 top-full pt-1.5 w-52 z-50">
                  <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl flex flex-col">
                    <a 
                      href="/about" 
                      className="block rounded-lg px-4 py-2 text-xs text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                    >
                      About Us
                    </a>
                    <a 
                      href="/team" 
                      className="block rounded-lg px-4 py-2 text-xs text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                    >
                      Our Team
                    </a>

                    {/* Facilities Flyout */}
                    <div className="relative group/fac">
                      <div className="flex items-center justify-between rounded-lg px-4 py-2 text-xs text-black hover:bg-slate-50 hover:text-[#074887] cursor-pointer transition-colors">
                        <span>Facilities</span>
                        <span className="text-[8px] text-gray-400">◀</span>
                      </div>
                      <div className="invisible group-hover/fac:visible absolute right-full top-0 pr-2 w-52 z-50">
                        <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl flex flex-col">
                          <a 
                            href="/facilities/electronics-labs" 
                            className="block rounded-lg px-4 py-2 text-xs font-normal text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                          >
                            Electronics Labs
                          </a>
                          <a 
                            href="/facilities/high-end-computers" 
                            className="block rounded-lg px-4 py-2 text-xs font-normal text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                          >
                            High End Computers
                          </a>
                          <a 
                            href="/facilities/3d-printing" 
                            className="block rounded-lg px-4 py-2 text-xs font-normal text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                          >
                            3D Printing
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Innovation Cell Flyout */}
                    <div className="relative group/inn">
                      <div className="flex items-center justify-between rounded-lg px-4 py-2 text-xs text-black hover:bg-slate-50 hover:text-[#074887] cursor-pointer transition-colors">
                        <span>Innovation Cell</span>
                        <span className="text-[8px] text-gray-400">◀</span>
                      </div>
                      <div className="invisible group-hover/inn:visible absolute right-full top-0 pr-2 w-52 z-50">
                        <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl flex flex-col">
                          <a 
                            href="/innovation-cell/iic-itsec" 
                            className="block rounded-lg px-4 py-2 text-xs font-normal text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                          >
                            IIC-ITSEC
                          </a>
                          <a 
                            href="/facilities/fabrication-lab" 
                            className="block rounded-lg px-4 py-2 text-xs font-normal text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                          >
                            Fabrication Lab
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            <a href="/contact" className="text-[#013759] transition-colors hover:text-[#074887]">Contact Us</a>
          </nav>

          {/* Mobile Hamburger Button (lg:hidden) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-[#074887] hover:bg-slate-100 focus:outline-none transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-slate-200 bg-white px-3 pt-1 pb-3 divide-y divide-slate-100 shadow-xl max-h-[80vh] overflow-y-auto">
            <a 
              href="/" 
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
            >
              Home
            </a>
            
            <a 
              href="/startin-up" 
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
            >
              Startin-up
            </a>

            <a 
              href="/programs/newgen-iedc" 
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
            >
              Newgen-IEDC
            </a>

            {/* MSME-BI Mobile Accordion */}
            <div className="py-1">
              <button 
                onClick={() => setMobileMsmeOpen(!mobileMsmeOpen)}
                className="w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
              >
                <span>MSME-BI</span>
                <span className="text-xs text-gray-400">{mobileMsmeOpen ? '▲' : '▼'}</span>
              </button>
              {mobileMsmeOpen && (
                <div className="pl-4 pr-2 py-1 space-y-0.5 bg-slate-50/70 rounded-lg my-1 border-l-2 border-[#074887]/20">
                  <a href="/msme-bi" className="block px-3 py-1 text-sm font-medium text-gray-800 hover:text-[#074887]">Overview</a>
                  <a href="/msme-yearly-activities" className="block px-3 py-1 text-sm font-medium text-gray-800 hover:text-[#074887]">MSME Yearly Activities</a>
                  <a href="/msme-hackathons" className="block px-3 py-1 text-sm font-medium text-gray-800 hover:text-[#074887]">MSME Hackathons</a>
                </div>
              )}
            </div>

            <a 
              href="/policies" 
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
            >
              Our Policies
            </a>

            <a 
              href="/portfolio" 
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
            >
              Portfolio
            </a>

            {/* More Mobile Accordion */}
            <div className="py-1">
              <button 
                onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                className="w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
              >
                <span>More</span>
                <span className="text-xs text-gray-400">{mobileMoreOpen ? '▲' : '▼'}</span>
              </button>

              {mobileMoreOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-lg my-1 border-l-2 border-[#074887]/20">
                  <a href="/about" className="block px-3 py-1 text-sm font-medium text-gray-800 hover:text-[#074887]">About Us</a>
                  <a href="/team" className="block px-3 py-1 text-sm font-medium text-gray-800 hover:text-[#074887]">Our Team</a>

                  {/* Facilities Accordion */}
                  <div>
                    <button 
                      onClick={() => setMobileFacOpen(!mobileFacOpen)}
                      className="w-full flex items-center justify-between px-3 py-1 text-sm font-medium text-gray-800 hover:text-[#074887]"
                    >
                      <span>Facilities</span>
                      <span className="text-xs text-gray-400">{mobileFacOpen ? '▲' : '▼'}</span>
                    </button>
                    {mobileFacOpen && (
                      <div className="pl-4 py-0.5 space-y-0.5 border-l border-slate-200 ml-3 my-0.5">
                        <a href="/facilities/electronics-labs" className="block px-3 py-1 text-xs font-normal text-gray-600 hover:text-[#074887] transition-colors">Electronics Labs</a>
                        <a href="/facilities/high-end-computers" className="block px-3 py-1 text-xs font-normal text-gray-600 hover:text-[#074887] transition-colors">High End Computers</a>
                        <a href="/facilities/3d-printing" className="block px-3 py-1 text-xs font-normal text-gray-600 hover:text-[#074887] transition-colors">3D Printing</a>
                      </div>
                    )}
                  </div>

                  {/* Innovation Cell Accordion */}
                  <div>
                    <button 
                      onClick={() => setMobileInnOpen(!mobileInnOpen)}
                      className="w-full flex items-center justify-between px-3 py-1 text-sm font-medium text-gray-800 hover:text-[#074887]"
                    >
                      <span>Innovation Cell</span>
                      <span className="text-xs text-gray-400">{mobileInnOpen ? '▲' : '▼'}</span>
                    </button>
                    {mobileInnOpen && (
                      <div className="pl-4 py-0.5 space-y-0.5 border-l border-slate-200 ml-3 my-0.5">
                        <a href="/innovation-cell/iic-itsec" className="block px-3 py-1 text-xs font-normal text-gray-600 hover:text-[#074887] transition-colors">IIC-ITSEC</a>
                        <a href="/facilities/fabrication-lab" className="block px-3 py-1 text-xs font-normal text-gray-600 hover:text-[#074887] transition-colors">Fabrication Lab</a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <a 
              href="/contact" 
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
            >
              Contact Us
            </a>
          </div>
        )}
      </header>
    </>
  )
}