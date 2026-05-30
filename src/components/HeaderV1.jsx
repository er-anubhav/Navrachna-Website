import React, { useState } from 'react'
import logo from '../assets/navrachna_images/nfed_logo.png'

export function HeaderV1() {
  const [msmeOpen, setMsmeOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  // Inner submenus inside More dropdown
  const [subAboutOpen, setSubAboutOpen] = useState(false)
  const [subFacilitiesOpen, setSubFacilitiesOpen] = useState(false)
  const [subInnovationOpen, setSubInnovationOpen] = useState(false)

  return (
    <>
      {/* Top Info Contact Bar */}
      <div className="relative z-50 w-full bg-[#074887] text-white text-xs border-b border-white/10 py-2.5 font-sans">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-start">
            <a href="tel:+919540527700" className="flex items-center gap-2 text-white/95 hover:text-white transition-colors">
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 9540527700</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a href="mailto:head.nfed@its.edu.in" className="flex items-center gap-2 text-white/95 hover:text-white transition-colors">
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>head.nfed@its.edu.in</span>
            </a>
          </div>

          {/* Right: Social Handles */}
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="relative z-50 flex items-center justify-between px-8 py-5 text-black bg-white backdrop-blur-sm border-b border-slate-100">
        <div className="flex items-center">
          <a href="/">
            <img src={logo} alt="NFED Logo" className="h-10 w-auto object-contain" />
          </a>
        </div>
        <nav className="flex items-center justify-end gap-x-8 text-sm font-normal tracking-wider text-black">
          <a href="/" className="transition-colors hover:text-[#074887]">Home</a>
          <a href="/startin-up" className="transition-colors hover:text-[#074887]">Startin-up</a>
          <a href="/programs/newgen-iedc" className="transition-colors hover:text-[#074887]">Newgen-IEDC</a>
          
          {/* MSME-BI Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setMsmeOpen(true)}
            onMouseLeave={() => setMsmeOpen(false)}
          >
            <a href="/msme-bi" className="flex items-center gap-1 transition-colors hover:text-[#074887] cursor-pointer py-1">
              MSME-BI <span className="text-[9px] text-gray-400">▼</span>
            </a>
            
            {msmeOpen && (
              <div className="absolute left-0 top-full pt-1.5 w-56 z-50">
                <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                  <a 
                    href="/msme-yearly-activities" 
                    className="block rounded-lg px-4 py-2 text-xs font-normal text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                  >
                    MSME Yearly Activities
                  </a>
                  <a 
                    href="/msme-hackathons" 
                    className="block rounded-lg px-4 py-2 text-xs font-normal text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                  >
                    MSME Hackathons
                  </a>
                </div>
              </div>
            )}
          </div>

          <a href="/policies" className="transition-colors hover:text-[#074887]">Our Policies</a>
          <a href="/portfolio" className="transition-colors hover:text-[#074887]">Portfolio</a>
          
          {/* Combined More Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="flex items-center gap-1 transition-colors hover:text-[#074887] focus:outline-none cursor-pointer py-1">
              More <span className="text-[9px] text-gray-400">▼</span>
            </button>
            
            {moreOpen && (
              <div className="absolute right-0 top-full pt-1.5 w-52 z-50">
                <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl flex flex-col">
                  
                  {/* About Us (Direct Link) */}
                  <a 
                    href="/about" 
                    className="block rounded-lg px-4 py-2 text-xs  text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                  >
                    About Us
                  </a>

                  {/* Our Team (Direct Link) */}
                  <a 
                    href="/team" 
                    className="block rounded-lg px-4 py-2 text-xs  text-black hover:bg-slate-50 hover:text-[#074887] transition-colors"
                  >
                    Our Team
                  </a>

                  {/* Facilities (Left Flyout on Hover) */}
                  <div className="relative group/fac">
                    <div className="flex items-center justify-between rounded-lg px-4 py-2 text-xs  text-black hover:bg-slate-50 hover:text-[#074887] cursor-pointer transition-colors">
                      <span>Facilities</span>
                      <span className="text-[8px] text-gray-400">◀</span>
                    </div>
                    {/* Flyout Submenu Panel */}
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

                  {/* Innovation Cell (Left Flyout on Hover) */}
                  <div className="relative group/inn">
                    <div className="flex items-center justify-between rounded-lg px-4 py-2 text-xs  text-black hover:bg-slate-50 hover:text-[#074887] cursor-pointer transition-colors">
                      <span>Innovation Cell</span>
                      <span className="text-[8px] text-gray-400">◀</span>
                    </div>
                    {/* Flyout Submenu Panel */}
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

          <a href="/contact" className="transition-colors hover:text-[#074887]">Contact Us</a>
        </nav>
      </header>
    </>
  )
}