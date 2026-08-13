import { supabase } from '../lib/supabase'

export async function getFaqsByContext(context = 'general') {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('id, page_context, category, question, answer, display_order')
      .eq('is_active', true)
      .or(`page_context.eq.${context},page_context.eq.general`)
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error(`faqsService getFaqsByContext(${context}) error:`, error.message)
    return { data: [], error }
  }
}
