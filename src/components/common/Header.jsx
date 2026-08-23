import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/navrachna_images/nfed_logo.png'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Desktop dropdown states
  const [programsOpen, setProgramsOpen] = useState(false)
  const [facilitiesOpen, setFacilitiesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  // Mobile accordion states
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false)
  const [mobileFacilitiesOpen, setMobileFacilitiesOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)

  return (
    <>
      {/* Top Info Contact Bar */}
      <div className="relative z-50 w-full bg-[#074887] text-white text-xs sm:text-sm border-b border-white/20 py-1 sm:py-1.5 font-sans">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-row items-center justify-between gap-3">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <a href="tel:+919540527700" className="flex items-center gap-2 text-white/95 hover:text-white transition-colors shrink-0">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.5 19.5 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="font-normal">+91 9540527700</span>
            </a>
            <span className="text-white/30">|</span>
            <a href="mailto:head.nfed@its.edu.in" className="flex items-center gap-2 text-white/95 hover:text-white transition-colors shrink-0">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span className="max-sm:hidden font-normal">head.nfed@its.edu.in</span>
              <span className="sm:hidden font-normal">Email</span>
            </a>
            <span className="text-white/30">|</span>
            <Link to="/gallery" className="flex items-center gap-1.5 text-white/95 hover:text-white transition-colors shrink-0">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-normal">Gallery</span>
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/contact" className="flex items-center gap-1.5 text-white/95 hover:text-white transition-colors shrink-0">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-normal">Contact Us</span>
            </Link>
          </div>

          {/* Right: Social Handles */}
          <div className="flex items-center gap-3.5 sm:gap-5 shrink-0">
            <a href="https://www.facebook.com/share/1EsxYHE9Rr/" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-colors" aria-label="Facebook">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/itsec_nfed" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-colors" aria-label="Instagram">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/itsec-nfed/" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-colors" aria-label="X (Twitter)">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-colors" aria-label="YouTube">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <header className="relative z-50 bg-white border-b-2 border-slate-300 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-8 py-1.5 sm:py-2.5 lg:py-3">
          {/* Logo & Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <img src={logo} alt="Navrachna Logo" className="h-8 sm:h-10 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.02]" />
              
              <div className="h-7 sm:h-9 w-px bg-slate-300 shrink-0"></div>

              <div className="flex flex-col justify-center leading-snug min-w-0">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#013759] uppercase group-hover:text-[#074887] transition-colors whitespace-nowrap">
                  NAVRACHNA FOUNDATION 
                </span>
                <span className="max-sm:hidden text-xs sm:text-sm text-gray-600 tracking-wide">
                  for Entrepreneurship Development
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="max-lg:hidden flex items-center justify-end gap-x-4 xl:gap-x-7 text-md xl:text-md font-normal tracking-wide text-[#013759] shrink-0">
            {/* Programs Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <button 
                onClick={() => setProgramsOpen(!programsOpen)}
                className="flex items-center gap-1.5 text-[#013759] transition-colors hover:text-[#074887] cursor-pointer py-1 font-normal focus:outline-none"
              >
                <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Programs</span>
                <svg className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {programsOpen && (
                <div className="absolute left-0 top-full pt-1 w-max min-w-55 z-50">
                  <div className="rounded-none border border-slate-200 border-t-2 border-t-[#074887] bg-white p-1.5 shadow-2xl flex flex-col">
                    <Link 
                      to="/programs/startin-up" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58-5.84a14.927 14.927 0 015.84-2.58" />
                      </svg>
                      <span>StartIn-UP</span>
                    </Link>
                    <Link 
                      to="/programs/newgen-iedc" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>NewGen-IEDC</span>
                    </Link>
                    <Link 
                      to="/programs/msme-bi" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>MSME-BI</span>
                    </Link>
                    <Link 
                      to="/msme-yearly-activities" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>MSME Yearly Activities</span>
                    </Link>
                    <Link 
                      to="/msme-hackathons" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>MSME Hackathons</span>
                    </Link>
                    <Link 
                      to="/programs/iic-itsec" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span>IIC-ITSEC</span>
                    </Link>
                    <Link 
                      to="/programs/kartavyam" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span>Kartavyam</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Facilities Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setFacilitiesOpen(true)}
              onMouseLeave={() => setFacilitiesOpen(false)}
            >
              <button 
                onClick={() => setFacilitiesOpen(!facilitiesOpen)}
                className="flex items-center gap-1.5 text-[#013759] transition-colors hover:text-[#074887] cursor-pointer py-1 font-normal focus:outline-none"
              >
                <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Facilities</span>
                <svg className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${facilitiesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {facilitiesOpen && (
                <div className="absolute left-0 top-full pt-1 w-max min-w-50 z-50">
                  <div className="rounded-none border border-slate-200 border-t-2 border-t-[#074887] bg-white p-1.5 shadow-2xl flex flex-col">
                    <Link 
                      to="/facilities/electronics-labs" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m16-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      <span>Electronics Labs</span>
                    </Link>
                    <Link 
                      to="/facilities/high-end-computers" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                      <span>High End Computers</span>
                    </Link>
                    <Link 
                      to="/facilities/3d-printing" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span>3D Printing</span>
                    </Link>
                    <Link 
                      to="/facilities/fabrication-lab" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                      <span>Fabrication Lab</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button 
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center gap-1.5 text-[#013759] transition-colors hover:text-[#074887] cursor-pointer py-1 font-normal focus:outline-none"
              >
                <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About Us</span>
                <svg className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {aboutOpen && (
                <div className="absolute left-0 top-full pt-1 w-max min-w-45 z-50">
                  <div className="rounded-none border border-slate-200 border-t-2 border-t-[#074887] bg-white p-1.5 shadow-2xl flex flex-col">
                    <Link 
                      to="/about" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>About Us</span>
                    </Link>
                    <Link 
                      to="/team" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Our Team</span>
                    </Link>
                    <Link 
                      to="/policies" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Our Policies</span>
                    </Link>
                    <Link 
                      to="/services" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Services</span>
                    </Link>
                    <Link 
                      to="/stories" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span>Success Stories</span>
                    </Link>
                    <Link 
                      to="/faq" 
                      className="flex items-center gap-2.5 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-normal text-slate-800 hover:bg-slate-50 hover:text-[#074887] transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>FAQ</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/portfolio" className="flex items-center gap-1.5 text-[#013759] transition-colors hover:text-[#074887]">
              <svg className="w-4 h-4 text-[#074887] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Portfolio</span>
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
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
            {/* Programs Mobile Accordion */}
            <div className="py-1">
              <button 
                onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                className="w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
              >
                <span>Programs</span>
                <span className="text-xs text-gray-400">{mobileProgramsOpen ? '▲' : '▼'}</span>
              </button>
              {mobileProgramsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-0.5 bg-slate-50/70 rounded-lg my-1 border-l-2 border-[#074887]/20">
                  <Link to="/programs/startin-up" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">StartIn-UP</Link>
                  <Link to="/programs/newgen-iedc" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">NewGen-IEDC</Link>
                  <Link to="/programs/msme-bi" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">MSME-BI</Link>
                  <Link to="/msme-yearly-activities" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">MSME Yearly Activities</Link>
                  <Link to="/msme-hackathons" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">MSME Hackathons</Link>
                  <Link to="/programs/iic-itsec" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">IIC-ITSEC</Link>
                  <Link to="/programs/kartavyam" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">Kartavyam</Link>
                </div>
              )}
            </div>

            {/* Facilities Mobile Accordion */}
            <div className="py-1">
              <button 
                onClick={() => setMobileFacilitiesOpen(!mobileFacilitiesOpen)}
                className="w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
              >
                <span>Facilities</span>
                <span className="text-xs text-gray-400">{mobileFacilitiesOpen ? '▲' : '▼'}</span>
              </button>
              {mobileFacilitiesOpen && (
                <div className="pl-4 pr-2 py-1 space-y-0.5 bg-slate-50/70 rounded-lg my-1 border-l-2 border-[#074887]/20">
                  <Link to="/facilities/electronics-labs" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">Electronics Labs</Link>
                  <Link to="/facilities/high-end-computers" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">High End Computers</Link>
                  <Link to="/facilities/3d-printing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">3D Printing</Link>
                  <Link to="/facilities/fabrication-lab" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">Fabrication Lab</Link>
                </div>
              )}
            </div>

            {/* About Us Mobile Accordion */}
            <div className="py-1">
              <button 
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
              >
                <span>About Us</span>
                <span className="text-xs text-gray-400">{mobileAboutOpen ? '▲' : '▼'}</span>
              </button>
              {mobileAboutOpen && (
                <div className="pl-4 pr-2 py-1 space-y-0.5 bg-slate-50/70 rounded-lg my-1 border-l-2 border-[#074887]/20">
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">About Us</Link>
                  <Link to="/team" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">Our Team</Link>
                  <Link to="/policies" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">Our Policies</Link>
                  <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">Services</Link>
                  <Link to="/stories" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">Success Stories</Link>
                  <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1 text-sm font-normal text-gray-800 hover:text-[#074887]">FAQ</Link>
                </div>
              )}
            </div>

            <Link 
              to="/portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
            >
              Portfolio
            </Link>

            <Link 
              to="/gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
            >
              Gallery
            </Link>

            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-50 hover:text-[#074887]"
            >
              Contact Us
            </Link>
          </div>
        )}
      </header>
    </>
  )
}

export const HeaderV1 = Header

