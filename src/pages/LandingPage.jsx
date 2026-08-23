import React from 'react'
import { AnnouncementsTicker } from '../components/home/AnnouncementsTicker'
import { HeroSection } from '../components/home/HeroSection'
import { ProgramsSection } from '../components/home/ProgramsSection'
import { InfrastructureSection } from '../components/home/InfrastructureSection'
import { PortfolioSection } from '../components/home/PortfolioSection'
import { LeadershipSection } from '../components/home/LeadershipSection'
import { FaqSection } from '../components/home/FaqSection'

export function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-x-hidden max-w-full">
      <AnnouncementsTicker />
      <HeroSection />
      <ProgramsSection />
      <InfrastructureSection />
      <PortfolioSection />
      <LeadershipSection />
      <FaqSection />
    </div>
  )
}
