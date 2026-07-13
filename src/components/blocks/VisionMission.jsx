import React from 'react'

/**
 * VisionMission
 * Matches the original Vision & Mission section of the landing page:
 * - Green "Our Vision" tag + Vision content
 * - Blue "Our Purpose" tag + Mission content
 * - Vertical divider line on md+
 */
export function VisionMission({
  visionTitle   = 'Vision',
  visionBody    = 'To create an innovative workspace and sector-agnostic startup incubator that nurtures passionate entrepreneurs, fosters highly collaborative creativity, and accelerates early-stage startup success into prominent global market leaders.',
  missionTitle  = 'Mission',
  missionBody   = 'To provide a dynamic, world-class collaborative workspace that empowers young founders and student innovators with seed prototype funding, high-fidelity mentoring frameworks, state-of-the-art labs, and a robust investor matchmaking pipeline.',
  style         = {},
}) {
  const {
    bg          = '#f8fafc',
    titleColor  = '#013759',
    textColor   = '#4b5563',
  } = style

  return (
    <section className="relative w-full py-20 border-b border-gray-100" style={{ background: bg }}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 lg:gap-16">
          
          {/* Vision - Left Side */}
          <div className="flex-1 flex flex-col items-start text-left">
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#10b981]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#10b981] uppercase">
              Our Vision
            </span>
            <h2 className="mb-6 text-3xl md:text-4xl font-normal tracking-tight" style={{ color: titleColor }}>
              {visionTitle}
            </h2>
            <p className="text-gray-600 text-base md:text-md leading-relaxed text-justify font-normal">
              {visionBody}
            </p>
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden md:block w-px bg-gray-250 self-stretch my-2 shrink-0" />

          {/* Mission - Right Side */}
          <div className="flex-1 flex flex-col items-start text-left">
            <span className="mb-4 inline-block whitespace-nowrap rounded-full bg-[#3b82f6]/10 px-4 py-1.5 text-xs font-normal tracking-widest text-[#3b82f6] uppercase">
              Our Purpose
            </span>
            <h2 className="mb-6 text-3xl md:text-4xl font-normal tracking-tight" style={{ color: titleColor }}>
              {missionTitle}
            </h2>
            <p className="text-gray-600 text-base md:text-md leading-relaxed text-justify font-normal">
              {missionBody}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
