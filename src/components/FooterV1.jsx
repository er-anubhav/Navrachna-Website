import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/co-working-area-in-greater-noida-12-scaled.webp';

export function FooterV1() {
  return (
    <footer className="relative w-full overflow-hidden text-white mt-auto border-t border-white/10">
      {/* Background Image matching other sections */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/85 pointer-events-none"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[92%] lg:max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col lg:col-span-3">
            <h3 className="mb-6 text-2xl font-normal font-normal tracking-normal text-white">Navrachna Foundation</h3>
            <p className="text-sm leading-relaxed text-white/80">
              The center provides a range of resources that empower students, faculty & staff to pursue entrepreneurial achievements.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col lg:col-span-2 lg:col-start-5">
            <h4 className="mb-6 text-xl font-normal font-normal text-white">Quick Link</h4>
            <ul className="flex flex-col space-y-3 text-sm text-white/80">
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> About NFED</a></li>
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> NewGen-IEDC</a></li>
              <li><a href="/startin-up" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> StartinUP</a></li>
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> MSME-BI</a></li>
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> Our Programs</a></li>
            </ul>
          </div>

          {/* Column 3: More Links */}
          <div className="flex flex-col lg:col-span-2 lg:col-start-7">
            <h4 className="mb-6 text-xl font-normal font-normal text-white">More</h4>
            <ul className="flex flex-col space-y-3 text-sm text-white/80">
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> Innovation Cell</a></li>
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> About IIC-ITSEC</a></li>
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> Fabrication Lab</a></li>
              <li><Link to="/services" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> What We Offers</Link></li>
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> Electronics Labs</a></li>
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> High End Computers</a></li>
              <li><a href="#" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2"><span className="text-[#fbbf24] text-xs">▶</span> 3D Printing</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col lg:col-span-4 lg:col-start-9">
            <h4 className="mb-6 text-xl font-normal font-normal text-white">Contact Us</h4>
            <ul className="flex flex-col space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#fbbf24]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="leading-relaxed">Navrachna Foundation, Plot no. 46,<br /> Knowledge Park 3, Greater Noida</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0 text-[#fbbf24]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+91 9540527700</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0 text-[#fbbf24]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>head.nfed@its.edu.in</span>
              </li>
            </ul>

            {/* Social Icons inside Contact Us */}
            <div className="mt-8 flex gap-3">
              <a href="https://www.instagram.com/itsec_nfed" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 shadow-inner text-[#fbbf24] border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/share/1EsxYHE9Rr/" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 shadow-inner text-[#fbbf24] border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.linkedin.com/company/itsec-nfed/" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 shadow-inner text-[#fbbf24] border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-xs text-white sm:flex-row">
          <p>© Copyright 2026. All Rights Reserved. Navrachna Foundation for Entrepreneurship Development</p>
          <p className="mt-4 sm:mt-0">
            Crafted and engineered by <span className="text-[#fbbf24]">Orbitron Labs LLP</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
