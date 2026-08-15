import { supabase } from '../../lib/supabase'

const ROOT_FOUNDATION_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

// --------------------------------------------------------
// 1. PROGRAMS (Overarching Schemes & Incubation Tracks)
// --------------------------------------------------------
export async function getAllProgramsAdmin() {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

export async function createProgram(payload) {
  const { data, error } = await supabase
    .from('programs')
    .insert([{ ...payload, foundation_id: ROOT_FOUNDATION_ID }])
    .select()
    .single()
  return { data, error }
}

export async function updateProgram(id, payload) {
  const { data, error } = await supabase
    .from('programs')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteProgram(id) {
  const { error } = await supabase.from('programs').delete().eq('id', id)
  return { error }
}

// --------------------------------------------------------
// 2. EVENTS (Hackathons, Ideathons, Workshops, Pitch Days)
// --------------------------------------------------------
export async function getAllEventsAdmin() {
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      programs ( id, name, type )
    `)
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

export async function createEvent(payload) {
  const { data, error } = await supabase
    .from('events')
    .insert([{ ...payload, foundation_id: ROOT_FOUNDATION_ID }])
    .select()
    .single()
  return { data, error }
}

export async function updateEvent(id, payload) {
  const { data, error } = await supabase
    .from('events')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteEvent(id) {
  const { error } = await supabase.from('events').delete().eq('id', id)
  return { error }
}

// --------------------------------------------------------
// 3. STARTUPS & INNOVATION ENTITIES (Ventures, Prototypes, Ideas)
// --------------------------------------------------------
export async function getAllStartupsAdmin() {
  const { data, error } = await supabase
    .from('startups')
    .select(`
      *,
      startup_categories ( id, name, slug ),
      startup_founders (
        role_title,
        founder_order,
        people ( id, full_name, designation, email, phone )
      )
    `)
    .order('name', { ascending: true })
  return { data: data || [], error }
}

export async function createStartup(payload) {
  const { data, error } = await supabase
    .from('startups')
    .insert([payload])
    .select()
    .single()
  return { data, error }
}

export async function updateStartup(id, payload) {
  const { data, error } = await supabase
    .from('startups')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteStartup(id) {
  const { error } = await supabase.from('startups').delete().eq('id', id)
  return { error }
}

// --------------------------------------------------------
// 4. FACILITIES (Fab Lab, 3D Printing, AI Compute, Co-working)
// --------------------------------------------------------
export async function getAllFacilitiesAdmin() {
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

export async function createFacility(payload) {
  const { data, error } = await supabase
    .from('facilities')
    .insert([payload])
    .select()
    .single()
  return { data, error }
}

export async function updateFacility(id, payload) {
  const { data, error } = await supabase
    .from('facilities')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteFacility(id) {
  const { error } = await supabase.from('facilities').delete().eq('id', id)
  return { error }
}

export async function deleteFacilitiesBulk(ids) {
  const { error } = await supabase.from('facilities').delete().in('id', ids)
  return { error }
}

// --------------------------------------------------------
// 5. USERS / PEOPLE (Students, Faculty, Founders, Mentors)
// --------------------------------------------------------
export async function getAllUsersAdmin() {
  const { data, error } = await supabase
    .from('people')
    .select('*')
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

export async function createUser(payload) {
  const { data, error } = await supabase
    .from('people')
    .insert([payload])
    .select()
    .single()
  return { data, error }
}

export async function updateUser(id, payload) {
  const { data, error } = await supabase
    .from('people')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteUser(id) {
  const { error } = await supabase.from('people').delete().eq('id', id)
  return { error }
}

// --------------------------------------------------------
// 6. PROTOTYPE & SCHEME PROJECTS (NewGen, MSME, NIDHI-PRAYAS, etc.)
// --------------------------------------------------------
export async function getAllProjectsAdmin() {
  const { data, error } = await supabase
    .from('newgen_projects')
    .select(`
      *,
      cohorts (
        id,
        year_label,
        program_id,
        programs ( id, name, slug )
      )
    `)
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

export async function createProject(payload) {
  const { data, error } = await supabase
    .from('newgen_projects')
    .insert([payload])
    .select()
    .single()
  return { data, error }
}

export async function updateProject(id, payload) {
  const { data, error } = await supabase
    .from('newgen_projects')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteProject(id) {
  const { error } = await supabase.from('newgen_projects').delete().eq('id', id)
  return { error }
}

export async function deleteProjectsBulk(ids) {
  const { error } = await supabase.from('newgen_projects').delete().in('id', ids)
  return { error }
}
