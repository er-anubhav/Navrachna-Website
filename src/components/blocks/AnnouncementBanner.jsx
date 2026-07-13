import React, { useEffect, useRef, useState } from 'react'

/**
 * AnnouncementBanner
 * A horizontally auto-scrolling marquee ticker for announcements/news.
 *
 * content: { items: string[] }
 * style:   { bg, textColor, accentColor }
 */
export function AnnouncementBanner({ items = [], style = {} }) {
  const {
    bg          = '#013759',
    textColor   = '#ffffff',
    accentColor = '#fbbf24',
  } = style

  const defaultItems = [
    '🎉 Applications open for the 2025–26 Incubation Cohort',
    '🚀 TECHTRIX 2026 — Registration now open',
    '📢 New 3D Printing Lab equipment installed',
    '🏆 Navrachna startups win at National Innovation Summit',
  ]

  const displayItems = items.length > 0 ? items : defaultItems

  return (
    <div
      className="w-full overflow-hidden py-2 select-none"
      style={{ background: bg }}
      aria-label="Announcements"
    >
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {/* Duplicate for seamless loop */}
        {[...displayItems, ...displayItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 text-sm font-medium" style={{ color: textColor }}>
            <span style={{ color: accentColor }}>◆</span>
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
