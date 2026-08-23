import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function AdminUnauthorizedPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans antialiased font-normal">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl text-center flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-xl font-normal tracking-tight">Access Restricted</h1>
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          You are authenticated as <span className="text-white font-normal">{user?.email}</span>, but your account has not been assigned administrative or editor privileges for the Navrachna Admin Console.
        </p>
        <div className="flex items-center gap-3 mt-4 w-full">
          <Link
            to="/"
            style={{ color: '#ffffff' }}
            className="flex-1 bg-slate-700 hover:bg-slate-600 !text-white text-xs font-normal py-2.5 px-4 rounded-lg transition-colors text-center"
          >
            Return to Main Site
          </Link>
          <button
            onClick={signOut}
            style={{ color: '#ffffff' }}
            className="flex-1 bg-red-500/80 hover:bg-red-600 !text-white text-xs font-normal py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
