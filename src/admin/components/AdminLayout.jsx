import React, { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../../assets/navrachna_images/nfed_logo.png'

export function AdminLayout() {
  const { user, role, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const navigation = [
    { name: 'Dashboard', to: '/admin/dashboard', icon: '📊' },
    { name: 'Announcements', to: '/admin/announcements', icon: '📢' },
    { name: 'Site Settings', to: '/admin/settings', icon: '⚙️' },
  ]

  const upcomingModules = [
    { name: 'Programs', icon: '🎓' },
    { name: 'NewGen Projects', icon: '🚀' },
    { name: 'Portfolio Startups', icon: '🏢' },
    { name: 'People Directory', icon: '👥' },
    { name: 'Facilities & Infra', icon: '🛠️' },
    { name: 'FAQs', icon: '❓' },
    { name: 'Policies', icon: '📜' },
  ]

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-900">
      
      {/* Top Bar */}
      <header className="bg-[#013759] text-white h-16 flex items-center justify-between px-4 sm:px-6 shadow-md z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-white/80 hover:text-white rounded"
          >
            ☰
          </button>
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <img src={logo} alt="Navrachna CMS" className="h-8 w-auto bg-white rounded p-0.5" />
            <span className="font-bold tracking-tight text-sm sm:text-base uppercase">
              NAVRACHNA <span className="text-sky-300 font-normal">ADMIN CMS</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-sky-200 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded"
          >
            <span>View Public Site</span> ↗
          </a>

          <div className="flex items-center gap-2 border-l border-white/20 pl-4">
            <div className="flex flex-col items-end leading-tight">
              <span className="font-medium text-white max-w-[140px] truncate">
                {user?.email || 'Admin'}
              </span>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                {role || 'EDITOR'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500/80 hover:bg-red-600 text-white text-[11px] font-medium px-3 py-1.5 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-20 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full pt-4 pb-6 px-3">
            
            <div className="px-3 mb-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                CMS Management
              </span>
            </div>

            <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-normal transition-colors ${
                      isActive
                        ? 'bg-[#074887] text-white font-medium shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}

              <div className="mt-6 pt-4 border-t border-slate-800 px-3">
                <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block mb-2">
                  Coming Up (Phase 2-4)
                </span>
                <div className="flex flex-col gap-1 opacity-60">
                  {upcomingModules.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-3 py-1.5 text-xs text-slate-400">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </nav>

            <div className="pt-4 border-t border-slate-800 px-3 text-[11px] text-slate-500">
              Navrachna Foundation CMS v2.6
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
          />
        )}

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100">
          <Outlet />
        </main>

      </div>

    </div>
  )
}
