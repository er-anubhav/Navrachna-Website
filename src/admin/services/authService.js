import { supabase } from '../../lib/supabase'

export async function signInAdmin(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('signInAdmin error:', error.message)
    return { data: null, error }
  }
}

export async function signOutAdmin() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('signOutAdmin error:', error.message)
    return { error }
  }
}

export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('getCurrentSession error:', error.message)
    return null
  }
}

export async function getAdminRole(userId) {
  if (!userId) return null
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.warn('User not registered in admin_users table:', error.message)
      return null
    }
    return data?.role || null
  } catch (error) {
    console.error('getAdminRole error:', error.message)
    return null
  }
}
