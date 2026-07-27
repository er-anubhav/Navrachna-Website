import { Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Layout } from './components/Layout'
import RouteProgressBar from './components/RouteProgressBar'
import ScrollToTop from './components/ScrollToTop'
import NotFoundPage from './pages/NotFoundPage'

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
import { NewGenIedcPage } from './pages/NewGenIedcPage'
import { ServicesPage } from './pages/ServicesPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProgressBar />
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "'Karla', sans-serif",
            borderRadius: '12px',
            padding: '14px 18px',
            fontSize: '0.9rem',
          },
          success: {
            style: {
              background: '#013759',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
            },
            iconTheme: { primary: '#fbbf24', secondary: '#013759' },
          },
          error: {
            style: {
              background: '#7f1d1d',
              color: '#fff',
            },
          },
        }}
      />
      <Routes>
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
          <Route path="/innovation-cell/iic-itsec" element={<IicItsecPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
