import { supabase } from '../lib/supabase'

export async function getActivePeople() {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('id, full_name, title_prefix, designation, organization, photo_url, bio, roles, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('peopleService error:', error.message)
    return { data: [], error }
  }
}

export async function getLeadershipPeople() {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('id, full_name, title_prefix, designation, organization, photo_url, bio, display_order')
      .eq('is_active', true)
      .contains('roles', ['leadership'])
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('peopleService getLeadership error:', error.message)
    return { data: [], error }
  }
}
