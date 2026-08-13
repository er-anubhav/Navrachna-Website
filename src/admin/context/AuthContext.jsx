import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { getAdminRole, signOutAdmin } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initializeAuth() {
      setLoading(true)
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      
      if (currentSession?.user) {
        setSession(currentSession)
        setUser(currentSession.user)
        const userRole = await getAdminRole(currentSession.user.id)
        setRole(userRole)
      } else {
        setSession(null)
        setUser(null)
        setRole(null)
      }
      setLoading(false)
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (newSession?.user) {
        setSession(newSession)
        setUser(newSession.user)
        const userRole = await getAdminRole(newSession.user.id)
        setRole(userRole)
      } else {
        setSession(null)
        setUser(null)
        setRole(null)
      }
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    setLoading(true)
    await signOutAdmin()
    setSession(null)
    setUser(null)
    setRole(null)
    setLoading(false)
  }

  const value = {
    session,
    user,
    role,
    loading,
    isAuthenticated: !!session?.user,
    isAdmin: role === 'admin',
    isEditor: role === 'admin' || role === 'editor',
    signOut: handleSignOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
