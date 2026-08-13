import { supabase } from '../lib/supabase'

export async function getNewgenProjects() {
  try {
    const { data, error } = await supabase
      .from('newgen_projects')
      .select(`
        id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, is_featured, status,
        cohorts ( id, year_label ),
        project_people (
          role_in_project,
          people ( id, full_name, designation, photo_url )
        )
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('projectsService error:', error.message)
    return { data: [], error }
  }
}

export async function getNewgenProjectBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('newgen_projects')
      .select(`
        id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status,
        cohorts ( id, year_label ),
        project_people (
          role_in_project,
          people ( id, full_name, designation, photo_url, email, organization )
        )
      `)
      .eq('slug', slug)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error(`projectsService getNewgenProjectBySlug(${slug}) error:`, error.message)
    return { data: null, error }
  }
}

export async function getCohorts() {
  try {
    const { data, error } = await supabase
      .from('cohorts')
      .select('id, year_label, is_active, display_order, programs(slug, short_name)')
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('projectsService getCohorts error:', error.message)
    return { data: [], error }
  }
}
