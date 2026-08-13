import { supabase } from '../lib/supabase'

export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('id, org_name, parent_org, cin_number, contact_phone, contact_email, contact_address, google_maps_url, social_links, hero_headline, hero_subtitle')
      .eq('id', 1)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('siteSettingsService error:', error.message)
    return { data: null, error }
  }
}
