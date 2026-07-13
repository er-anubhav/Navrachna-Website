import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { AboutPage } from './pages/AboutPage'
import { ProgramsPage } from './pages/ProgramsPage'
import { ProgramDetailPage } from './pages/ProgramDetailPage'
import { FacilitiesPage } from './pages/FacilitiesPage'
import { StoriesPage } from './pages/StoriesPage'
import { FaqPage } from './pages/FaqPage'
import { ContactPage } from './pages/ContactPage'
import { StartinUpPage } from './pages/StartinUpPage'
import { MsmeBiPage } from './pages/MsmeBiPage'
import { MsmeYearlyPage } from './pages/MsmeYearlyPage'
import { MsmeHackathonsPage } from './pages/MsmeHackathonsPage'
import { OurPoliciesPage } from './pages/OurPoliciesPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { TeamPage } from './pages/TeamPage'
import { ElectronicsLabsPage } from './pages/ElectronicsLabsPage'
import { HighEndComputersPage } from './pages/HighEndComputersPage'
import { ThreeDPrintingPage } from './pages/ThreeDPrintingPage'
import { IicItsecPage } from './pages/IicItsecPage'
import { FabricationLabPage } from './pages/FabricationLabPage'
import { NewGenIedcPage } from './pages/NewGenIedcPage'
import { ServicesPage } from './pages/ServicesPage'
import { GalleryPage } from './pages/GalleryPage'
import { AdminPage } from './pages/AdminPage'
import DynamicPage from './pages/DynamicPage'

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/startin-up" element={<StartinUpPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:slug" element={<ProgramDetailPage />} />
        <Route path="/programs/newgen-iedc" element={<NewGenIedcPage />} />
        <Route path="/msme-bi" element={<MsmeBiPage />} />
        <Route path="/msme-yearly-activities" element={<MsmeYearlyPage />} />
        <Route path="/msme-hackathons" element={<MsmeHackathonsPage />} />
        <Route path="/policies" element={<OurPoliciesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/facilities/electronics-labs" element={<ElectronicsLabsPage />} />
        <Route path="/facilities/high-end-computers" element={<HighEndComputersPage />} />
        <Route path="/facilities/3d-printing" element={<ThreeDPrintingPage />} />
        <Route path="/facilities/fabrication-lab" element={<FabricationLabPage />} />
        <Route path="/innovation-cell/iic-itsec" element={<IicItsecPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/page/:slug" element={<DynamicPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
