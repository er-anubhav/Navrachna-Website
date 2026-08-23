import { supabase } from '../lib/supabase'

// Announcements
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
    console.error('announcements error:', error.message)
    return { data: [], error }
  }
}

// Facilities
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
    console.error('facilities error:', error.message)
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
    console.error(`getFacilityBySlug(${slug}) error:`, error.message)
    return { data: null, error }
  }
}

// FAQs
export async function getFaqsByContext(context = 'general') {
  try {
    let query = supabase
      .from('faqs')
      .select('id, page_context, category, question, answer, display_order')
      .eq('is_active', true)

    if (!context || context === 'general') {
      query = query.eq('page_context', 'general')
    } else {
      query = query.or(`page_context.eq.${context},page_context.eq.general`)
    }

    const { data, error } = await query.order('display_order', { ascending: true })

    if (error) throw error

    // Deduplicate database results by question
    const seen = new Set()
    const uniqueData = (data || []).filter(item => {
      const key = item.question ? item.question.toLowerCase().trim() : ''
      if (!key || seen.has(key)) return false
      seen.add(key)
      return true
    })

    return { data: uniqueData, error: null }
  } catch (error) {
    console.error(`getFaqsByContext(${context}) error:`, error.message)
    return { data: [], error }
  }
}

// People & Leadership
export async function getActivePeople() {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('id, full_name, title_prefix, designation, organization, photo_url, bio, roles, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('people error:', error.message)
    return { data: [], error }
  }
}

export async function getLeadershipPeople() {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('id, full_name, title_prefix, designation, organization, photo_url, bio, display_order')
      .eq('is_active', true)
      .contains('roles', ['leadership'])
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('getLeadership error:', error.message)
    return { data: [], error }
  }
}

// Policies
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
    console.error('policies error:', error.message)
    return { data: [], error }
  }
}

// Programs
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
    console.error('programs error:', error.message)
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
    console.error(`getProgramBySlug(${slug}) error:`, error.message)
    return { data: null, error }
  }
}

// NewGen Projects & Cohorts
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
    console.error('projects error:', error.message)
    return { data: [], error }
  }
}

export async function getNewgenProjectBySlug(slugOrId) {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId)

    let { data } = await supabase
      .from('newgen_projects')
      .select(`
        id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status,
        cohorts ( id, year_label ),
        project_people (
          role_in_project,
          people ( id, full_name, designation, photo_url, email, organization )
        )
      `)
      .eq(isUuid ? 'id' : 'slug', slugOrId)
      .maybeSingle()

    if (!data && !isUuid) {
      const fallback = await supabase
        .from('newgen_projects')
        .select(`
          id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status,
          cohorts ( id, year_label ),
          project_people (
            role_in_project,
            people ( id, full_name, designation, photo_url, email, organization )
          )
        `)
        .eq('id', slugOrId)
        .maybeSingle()

      data = fallback.data
    }

    return { data, error: null }
  } catch (error) {
    console.error(`getNewgenProjectBySlug(${slugOrId}) error:`, error.message)
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
    console.error('getCohorts error:', error.message)
    return { data: [], error }
  }
}

// Site Settings
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
    console.error('siteSettings error:', error.message)
    return { data: null, error }
  }
}

// Startups
export async function getStartups() {
  try {
    const { data, error } = await supabase
      .from('startups')
      .select('id, slug, name, legal_name, logo_url, website_url, description, incubation_status, cohort_year, is_featured, display_order, category_id, startup_categories(id, slug, name)')
      .order('display_order', { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('startups error:', error.message)
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
    console.error('startup categories error:', error.message)
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

    const { data } = await query.maybeSingle()

    if (data) return { data, error: null }

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

// Testimonials
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
    console.error('testimonials error:', error.message)
    return { data: [], error }
  }
}
