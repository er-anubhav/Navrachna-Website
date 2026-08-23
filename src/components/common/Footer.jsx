import React from 'react'
import { Link } from 'react-router-dom'
import bgImage from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden text-white mt-auto border-t border-white/10">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed opacity-70"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/85 pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-16">
        <div className="grid grid-cols-1 gap-6 md:gap-12 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col lg:col-span-3">
            <h3 className="mb-2 md:mb-4 text-xl sm:text-2xl font-normal tracking-normal text-white">Navrachna Foundation</h3>
            <p className="text-[11px] text-sky-200/90 font-mono mb-2">
              CIN: U73200UP2020NPL128831
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-white/80 font-normal">
              A Section 8 Non-Profit Incubation Center empowering founders, faculty & student innovators under the aegis of I.T.S Engineering College, Greater Noida.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col lg:col-span-2">
            <h4 className="mb-3 text-sm font-semibold tracking-wider text-sky-300 uppercase">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-normal">
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/team" className="text-white/80 hover:text-white transition-colors">Our Leadership & Team</Link></li>
              <li><Link to="/programs" className="text-white/80 hover:text-white transition-colors">Incubation Programs</Link></li>
              <li><Link to="/portfolio" className="text-white/80 hover:text-white transition-colors">Incubated Startups</Link></li>
              <li><Link to="/facilities" className="text-white/80 hover:text-white transition-colors">Labs & Infra</Link></li>
              <li><Link to="/gallery" className="text-white/80 hover:text-white transition-colors">Infrastructure Gallery</Link></li>
              <li><Link to="/policies" className="text-white/80 hover:text-white transition-colors">Our Policies</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Flagship Programs */}
          <div className="flex flex-col lg:col-span-3">
            <h4 className="mb-3 text-sm font-semibold tracking-wider text-sky-300 uppercase">Incubation Schemes</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-normal">
              <li><Link to="/programs/startin-up" className="text-white/80 hover:text-white transition-colors">StartInUP Incubation Scheme</Link></li>
              <li><Link to="/programs/newgen-iedc" className="text-white/80 hover:text-white transition-colors">DST NewGen IEDC Grant</Link></li>
              <li><Link to="/programs/msme-bi" className="text-white/80 hover:text-white transition-colors">MSME Business Incubator</Link></li>
              <li><Link to="/msme-yearly-activities" className="text-white/80 hover:text-white transition-colors">MSME Yearly Activities</Link></li>
              <li><Link to="/msme-hackathons" className="text-white/80 hover:text-white transition-colors">MSME Hackathons</Link></li>
              <li><Link to="/innovation-cell/iic-itsec" className="text-white/80 hover:text-white transition-colors">IIC MoE Innovation Cell</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="flex flex-col lg:col-span-4">
            <h4 className="mb-3 text-sm font-semibold tracking-wider text-sky-300 uppercase">Connect With Us</h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-3 font-normal">
              Navrachna Foundation for Entrepreneurship Development,<br />
              I.T.S Engineering College Campus, 46 Knowledge Park III,<br />
              Greater Noida, Uttar Pradesh 201308
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm font-normal text-white/90">
              <p><strong className="text-white">Phone:</strong> +91 9540527700</p>
              <p><strong className="text-white">Email:</strong> head.nfed@its.edu.in</p>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base text-white/90 font-normal">
          <p>© {new Date().getFullYear()} Navrachna Foundation for Entrepreneurship Development. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/policies" className="hover:text-white transition-colors underline-offset-4 hover:underline">Incubation Policies</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export const FooterV1 = Footer
