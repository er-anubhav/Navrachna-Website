import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedAdminRoute() {
  const { isAuthenticated, isEditor, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400" />
          <p className="text-xs text-slate-400 font-mono">Authenticating session...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  if (!isEditor) {
    return <Navigate to="/admin/unauthorized" replace />
  }

  return <Outlet />
}
