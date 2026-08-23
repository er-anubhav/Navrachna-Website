import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { signInAdmin } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'
import logo from '../../../assets/navrachna_images/nfed_logo.png'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isEditor } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (isAuthenticated && isEditor) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.')
      return
    }

    setSubmitting(true)
    const { data, error } = await signInAdmin(email, password)
    if (error) {
      setErrorMsg(error.message || 'Invalid credentials or login failed.')
      setSubmitting(false)
    } else if (data?.user) {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased font-normal">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center flex flex-col items-center">
        <div className="bg-white p-3 rounded-xl shadow-lg mb-4">
          <img src={logo} alt="Navrachna Foundation" className="h-12 w-auto object-contain" />
        </div>
        <h2 className="text-2xl font-normal tracking-tight text-white uppercase">
          Navrachna Admin CMS
        </h2>
        <p className="mt-1 text-xs text-slate-400 font-normal">
          Sign in with your authorized administrator or editor credentials.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-6 shadow-2xl rounded-xl sm:px-10 border border-slate-700">
          
          {errorMsg && (
            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-300 font-normal">
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-xs font-normal text-slate-300 mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@navrachna.org"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none transition-colors font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none transition-colors font-normal"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-xs font-normal text-white bg-[#074887] hover:bg-[#013759] focus:outline-none transition-colors shadow-md disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Authenticating...' : 'Sign In to Console'}
              </button>
            </div>

          </form>

          <div className="mt-6 pt-4 border-t border-slate-700 text-center">
            <p className="text-[11px] text-slate-500 font-normal">
              Protected by PostgreSQL Row Level Security (RLS). Public registration is disabled.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}
