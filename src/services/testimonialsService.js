import { supabase } from '../lib/supabase'

export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('id, founder_name, startup_name, quote, metric_highlight, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('testimonialsService error:', error.message)
    return { data: [], error }
  }
}
