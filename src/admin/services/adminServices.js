import { supabase } from '../../lib/supabase'

// --- SITE SETTINGS MUTATIONS ---
export async function updateSiteSettings(settings) {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .update({
        org_name: settings.org_name,
        parent_org: settings.parent_org,
        cin_number: settings.cin_number,
        contact_phone: settings.contact_phone,
        contact_email: settings.contact_email,
        contact_address: settings.contact_address,
        google_maps_url: settings.google_maps_url,
        social_links: settings.social_links,
        hero_headline: settings.hero_headline,
        hero_subtitle: settings.hero_subtitle,
        updated_at: new Date().toISOString()
      })
      .eq('id', 1)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('updateSiteSettings error:', error.message)
    return { data: null, error }
  }
}

// --- ANNOUNCEMENTS ADMIN MUTATIONS ---
export async function getAllAnnouncementsAdmin() {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('getAllAnnouncementsAdmin error:', error.message)
    return { data: [], error }
  }
}

export async function createAnnouncement(payload) {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .insert([{
        tag: payload.tag || 'Notice',
        title: payload.title,
        content: payload.content,
        external_url: payload.external_url || null,
        is_featured: payload.is_featured ?? true,
        status: payload.status || 'published',
        published_at: payload.status === 'published' ? new Date().toISOString() : null
      }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('createAnnouncement error:', error.message)
    return { data: null, error }
  }
}

export async function updateAnnouncement(id, payload) {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .update({
        tag: payload.tag,
        title: payload.title,
        content: payload.content,
        external_url: payload.external_url || null,
        is_featured: payload.is_featured,
        status: payload.status,
        published_at: payload.status === 'published' ? (payload.published_at || new Date().toISOString()) : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error(`updateAnnouncement(${id}) error:`, error.message)
    return { data: null, error }
  }
}

export async function deleteAnnouncement(id) {
  try {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error(`deleteAnnouncement(${id}) error:`, error.message)
    return { error }
  }
}
