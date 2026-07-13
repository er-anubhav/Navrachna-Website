import React, { useEffect, useState } from 'react'

/**
 * AnnouncementBanner
 * Matches the original fade-up cycling announcement ticker from the landing page.
 */
export function AnnouncementBanner({ items = [], style = {} }) {
  const {
    bg          = '#111111',
    textColor   = '#ffffff',
    labelBg     = '#074887',
  } = style

  const defaultItems = [
    '🎉 Applications open for the 2025–26 Incubation Cohort — Apply Now!',
    '🚀 TECHTRIX 2026 — National Tech Fest — Registration Open',
    '📢 New 3D Printing Lab equipment now installed in Fabrication Lab',
    '🏆 Navrachna startups win 3 awards at National Innovation Summit 2025',
    '📋 MSME Hackathon results announced — Congratulations to all winners!',
  ]

  const displayItems = items.length > 0 ? items : defaultItems
  const [currentUpdate, setCurrentUpdate] = useState(0)

  useEffect(() => {
    if (displayItems.length <= 1) return
    const timer = setInterval(() => {
      setCurrentUpdate(prev => (prev + 1) % displayItems.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [displayItems])

  return (
    <div 
      className="relative z-40 flex h-10 w-full items-stretch border-b border-white/10 select-none"
      style={{ background: bg }}
      aria-label="Announcements"
    >
      <div 
        className="flex items-center px-4 py-2 text-xs tracking-wider text-white sm:px-6 sm:text-sm font-semibold shrink-0"
        style={{ background: labelBg }}
      >
        Announcements
      </div>
      <div className="relative flex flex-1 items-center overflow-hidden px-4">
        {displayItems.map((update, index) => (
          <div
            key={index}
            className={`absolute left-4 right-4 flex items-center transition-all duration-700 ease-in-out ${
              index === currentUpdate
                ? 'translate-y-0 opacity-100 z-10'
                : 'translate-y-4 opacity-0 z-0 pointer-events-none'
            }`}
          >
            <span className="text-xs font-medium sm:text-sm truncate" style={{ color: textColor }}>
              {update}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
