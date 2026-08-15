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

export async function getStartupBySlugOrId(identifier) {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier)
    
    let query = supabase
      .from('startups')
      .select(`
        *,
        startup_categories ( id, slug, name ),
        startup_founders (
          role_title,
          founder_order,
          people ( id, full_name, designation, email, phone )
        )
      `)

    if (isUuid) {
      query = query.eq('id', identifier)
    } else {
      query = query.eq('slug', identifier)
    }

    const { data, error } = await query.maybeSingle()

    if (data) return { data, error: null }

    // Fallback lookup if slug match fails
    const { data: allData } = await supabase
      .from('startups')
      .select(`
        *,
        startup_categories ( id, slug, name ),
        startup_founders (
          role_title,
          founder_order,
          people ( id, full_name, designation, email, phone )
        )
      `)

    const matched = allData?.find(s => {
      let p = {}
      try { if (s.description) p = JSON.parse(s.description) } catch(e){}
      const companyName = s.name || p.company_name || ''
      const targetSlug = s.slug || p.slug || companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return targetSlug === identifier || s.id === identifier
    })

    return { data: matched || null, error: null }
  } catch (error) {
    console.error('getStartupBySlugOrId error:', error.message)
    return { data: null, error }
  }
}
