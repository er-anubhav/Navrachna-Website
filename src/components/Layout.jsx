import { Outlet } from 'react-router-dom'
import { HeaderV1 } from './HeaderV1'
import { FooterV1 } from './FooterV1'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderV1 />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      
      {/* Floating Social Sidebar */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col z-50 shadow-2xl hidden sm:flex border border-white/10 bg-black/40 backdrop-blur-md rounded-l-xl overflow-hidden">
        {/* Facebook */}
        <a 
          href="https://www.facebook.com/share/1EsxYHE9Rr/" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="Facebook" 
          className="p-3 text-[#fbbf24] hover:bg-white/20 transition-colors border-b border-white/10"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        {/* Instagram */}
        <a 
          href="https://www.instagram.com/itsec_nfed" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="Instagram" 
          className="p-3 text-[#fbbf24] hover:bg-white/20 transition-colors border-b border-white/10"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        {/* LinkedIn */}
        <a 
          href="https://www.linkedin.com/company/itsec-nfed/" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="LinkedIn" 
          className="p-3 text-[#fbbf24] hover:bg-white/20 transition-colors"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      </div>

      <FooterV1 />
    </div>
  )
}