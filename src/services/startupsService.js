import { supabase } from '../lib/supabase'

export async function getStartups() {
  try {
    const { data, error } = await supabase
      .from('startups')
      .select('id, slug, name, legal_name, logo_url, website_url, description, incubation_status, cohort_year, is_featured, display_order, category_id, startup_categories(id, slug, name)')
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('startupsService error:', error.message)
    return { data: [], error }
  }
}

export async function getStartupCategories() {
  try {
    const { data, error } = await supabase
      .from('startup_categories')
      .select('id, slug, name, description, display_order')
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('startupsService categories error:', error.message)
    return { data: [], error }
  }
}
