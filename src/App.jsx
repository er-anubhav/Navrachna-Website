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
import { MsmeYearlyPage } from './pages/MsmeYearlyPage'
import { MsmeHackathonsPage } from './pages/MsmeHackathonsPage'
import { OurPoliciesPage } from './pages/OurPoliciesPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { TeamPage } from './pages/TeamPage'
import { ElectronicsLabsPage } from './pages/ElectronicsLabsPage'
import { HighEndComputersPage } from './pages/HighEndComputersPage'
import { ThreeDPrintingPage } from './pages/ThreeDPrintingPage'
import { FabricationLabPage } from './pages/FabricationLabPage'
import { NewGenProjectDetailPage } from './pages/NewGenProjectDetailPage'
import { ServicesPage } from './pages/ServicesPage'

// Admin CMS Architecture Imports
import { AuthProvider } from './admin/context/AuthContext'
import { ProtectedAdminRoute } from './admin/components/ProtectedAdminRoute'
import { AdminLayout } from './admin/components/AdminLayout'
import { AdminLoginPage } from './admin/pages/AdminLoginPage'
import { AdminDashboardPage } from './admin/pages/AdminDashboardPage'
import { AdminUnauthorizedPage } from './admin/pages/AdminUnauthorizedPage'
import { AdminSettingsPage } from './admin/pages/AdminSettingsPage'
import { AdminAnnouncementsPage } from './admin/pages/AdminAnnouncementsPage'
import { AdminProgramsPage } from './admin/pages/AdminProgramsPage'
import { AdminServicesPage } from './admin/pages/AdminServicesPage'
import { AdminEventsPage } from './admin/pages/AdminEventsPage'
import { AdminStartupsPage } from './admin/pages/AdminStartupsPage'
import { AdminProjectsPage } from './admin/pages/AdminProjectsPage'
import { AdminFacilitiesPage } from './admin/pages/AdminFacilitiesPage'
import { AdminUsersPage } from './admin/pages/AdminUsersPage'

import { StartupDetailPage } from './pages/StartupDetailPage'

function App() {
  return (
    <AuthProvider>
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
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Public Admin Auth & Error Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/unauthorized" element={<AdminUnauthorizedPage />} />

        {/* Protected Admin CMS Console Routes */}
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="programs" element={<AdminProgramsPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="facilities" element={<AdminFacilitiesPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="startups" element={<AdminStartupsPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="announcements" element={<AdminAnnouncementsPage />} />
          </Route>
        </Route>

        {/* Fallback Wildcard Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
