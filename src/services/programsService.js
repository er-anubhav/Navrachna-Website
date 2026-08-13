import { supabase } from '../lib/supabase'

export async function getActivePrograms() {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('id, slug, title, short_name, summary, description, grant_amount, accent_color, bullets, logo_url, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('programsService error:', error.message)
    return { data: [], error }
  }
}

export async function getProgramBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('id, slug, title, short_name, summary, description, grant_amount, accent_color, bullets, logo_url')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error(`programsService getProgramBySlug(${slug}) error:`, error.message)
    return { data: null, error }
  }
}
