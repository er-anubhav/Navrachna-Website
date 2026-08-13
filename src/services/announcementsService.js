import { supabase } from '../lib/supabase'

export async function getPublishedAnnouncements() {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('id, tag, title, content, external_url, published_at, is_featured')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('announcementsService error:', error.message)
    return { data: [], error }
  }
}
