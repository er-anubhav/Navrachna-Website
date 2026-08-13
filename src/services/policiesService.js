import { supabase } from '../lib/supabase'

export async function getPolicies() {
  try {
    const { data, error } = await supabase
      .from('policies')
      .select('id, slug, title, category, summary, file_url, file_size_bytes, effective_date, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('policiesService error:', error.message)
    return { data: [], error }
  }
}
