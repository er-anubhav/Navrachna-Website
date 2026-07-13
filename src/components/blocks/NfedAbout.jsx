import React from 'react'
import defaultImgLeft from '../../assets/co-working-area-in-greater-noida-12-scaled.webp'
import defaultImgRight from '../../assets/navrachna_images/co-working-area-in-greater-noida-13-scaled.webp'

/**
 * NfedAbout
 * Matches the staggered 2-card left column + text right column from the original about section.
 */
export function NfedAbout({
  title        = 'What is Navrachna Foundation (NFED)?',
  paragraphs   = [
    'Navrachna Foundation for Entrepreneurship Development (NFED) is a premier technology business incubator recognized by MSME and DST, operating inside I.T.S Engineering College.',
    'We provide seed funding, office spaces, high-speed connectivity, legal assistance, IP support, and direct access to prominent venture funding networks.'
  ],
  btnLabel     = 'Read More',
  btnHref      = '/about',
  imageLeft    = '',
  imageRight   = '',
  style        = {},
}) {
  const {
    bg           = '#ffffff',
    titleColor   = '#013759',
    textColor    = '#475569',
    titleSize    = 'text-4xl md:text-5xl',
  } = style

  const imgL = imageLeft || defaultImgLeft
  const imgR = imageRight || defaultImgRight

  return (
    <section className="relative w-full py-24 overflow-hidden border-b border-gray-100" style={{ background: bg }}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Column: Staggered Rounded Cards */}
        <div className="w-full lg:w-[48%] flex items-center justify-center h-[520px] relative">
          {/* Elevated Left Card */}
          <div className="w-[46%] h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white absolute left-4 top-4 transform -translate-y-8 hover:-translate-y-10 transition-all duration-500 ease-out hover:scale-[1.02] bg-[#013759]">
            <img 
              src={imgL} 
              alt="Navrachna Incubator Facility" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Lower Right Card */}
          <div className="w-[46%] h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white absolute right-4 bottom-4 transform translate-y-8 hover:translate-y-6 transition-all duration-500 ease-out hover:scale-[1.02] bg-[#074887]">
            <img 
              src={imgR} 
              alt="Co-working workspace desks" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right Column: Informational Content */}
        <div className="flex-1 flex flex-col items-start text-left">
          <h2 
            className={`mb-6 tracking-tight font-normal leading-tight whitespace-pre-line ${titleSize}`}
            style={{ color: titleColor }}
          >
            {title}
          </h2>

          <div 
            className="text-md font-normal leading-relaxed space-y-6 text-justify mb-8"
            style={{ color: textColor }}
          >
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {btnLabel && (
            <a 
              href={btnHref} 
              className="rounded-lg bg-black px-8 py-3.5 !text-white shadow-lg hover:bg-[#074887] hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 inline-block"
            >
              {btnLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
