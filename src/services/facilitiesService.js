import { supabase } from '../lib/supabase'

export async function getFacilities() {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('id, slug, title, summary, description, cover_image_url, specs_summary, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('facilitiesService error:', error.message)
    return { data: [], error }
  }
}

export async function getFacilityBySlug(slug) {
  try {
    const { data: facility, error: facError } = await supabase
      .from('facilities')
      .select('id, slug, title, summary, description, cover_image_url, specs_summary')
      .eq('slug', slug)
      .single()

    if (facError) throw facError

    const { data: equipment, error: eqError } = await supabase
      .from('facility_equipment')
      .select('id, name, model_number, specifications, quantity, equipment_images, display_order')
      .eq('facility_id', facility.id)
      .order('display_order', { ascending: true })

    if (eqError) console.warn('Equipment fetch notice:', eqError.message)

    return { data: { ...facility, equipment: equipment || [] }, error: null }
  } catch (error) {
    console.error(`facilitiesService getFacilityBySlug(${slug}) error:`, error.message)
    return { data: null, error }
  }
}
