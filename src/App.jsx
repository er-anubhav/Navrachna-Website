import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/common/Layout'
import { LandingPage } from './pages/LandingPage'

// Company Pages
import { AboutPage } from './pages/company/AboutPage'
import { TeamPage } from './pages/company/TeamPage'
import { ContactPage } from './pages/company/ContactPage'
import { OurPoliciesPage } from './pages/company/OurPoliciesPage'
import { StoriesPage } from './pages/company/StoriesPage'
import { FaqPage } from './pages/company/FaqPage'
import { ServicesPage } from './pages/company/ServicesPage'

// Facilities Pages
import { FacilitiesPage } from './pages/facilities/FacilitiesPage'
import { ElectronicsLabsPage } from './pages/facilities/ElectronicsLabsPage'
import { HighEndComputersPage } from './pages/facilities/HighEndComputersPage'
import { ThreeDPrintingPage } from './pages/facilities/ThreeDPrintingPage'
import { FabricationLabPage } from './pages/facilities/FabricationLabPage'

// Programs Pages
import { ProgramsPage } from './pages/programs/ProgramsPage'
import { ProgramDetailPage } from './pages/programs/ProgramDetailPage'
import { NewGenProjectDetailPage } from './pages/programs/NewGenProjectDetailPage'
import { MsmeYearlyPage } from './pages/programs/MsmeYearlyPage'
import { MsmeHackathonsPage } from './pages/programs/MsmeHackathonsPage'

// Gallery Page
import { GalleryPage } from './pages/gallery/GalleryPage'

// Portfolio Pages
import { PortfolioPage } from './pages/portfolio/PortfolioPage'
import { StartupDetailPage } from './pages/portfolio/StartupDetailPage'

function App() {
  return (
    <Routes>
      {/* Public Website Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        
        {/* Canonical Dynamic Program Detail Engine Route */}
        <Route path="/programs/:slug" element={<ProgramDetailPage />} />

        {/* Canonical Dynamic Startup Showcase Detail Route */}
        <Route path="/startups/:slug" element={<StartupDetailPage />} />
        <Route path="/portfolio/:slug" element={<StartupDetailPage />} />

        {/* Legacy Root Alias Redirects -> Canonical /programs/:slug */}
        <Route path="/startin-up" element={<Navigate to="/programs/startin-up" replace />} />
        <Route path="/startinup" element={<Navigate to="/programs/startin-up" replace />} />
        <Route path="/msme-bi" element={<Navigate to="/programs/msme-bi" replace />} />
        <Route path="/iic-itsec" element={<Navigate to="/programs/iic-itsec" replace />} />
        <Route path="/innovation-cell/iic-itsec" element={<Navigate to="/programs/iic-itsec" replace />} />
        <Route path="/innovation-cell" element={<Navigate to="/programs/iic-itsec" replace />} />
        <Route path="/kartavyam" element={<Navigate to="/programs/kartavyam" replace />} />

        <Route path="/programs/newgen-iedc/project/:projectSlug" element={<NewGenProjectDetailPage />} />
        <Route path="/projects/:projectSlug" element={<NewGenProjectDetailPage />} />
        <Route path="/msme-yearly-activities" element={<MsmeYearlyPage />} />
        <Route path="/msme-hackathons" element={<MsmeHackathonsPage />} />
        <Route path="/policies" element={<OurPoliciesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/facilities/electronics-labs" element={<ElectronicsLabsPage />} />
        <Route path="/facilities/high-end-computers" element={<HighEndComputersPage />} />
        <Route path="/facilities/3d-printing" element={<ThreeDPrintingPage />} />
        <Route path="/facilities/fabrication-lab" element={<FabricationLabPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Fallback Wildcard Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
