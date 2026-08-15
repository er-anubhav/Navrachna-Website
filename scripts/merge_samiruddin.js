import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(supabaseUrl, supabaseKey)

async function mergeSamiruddin() {
  console.log('--- MERGING SAMIRUDDIN RECORDS ---')

  console.log('🔑 Authenticating as Admin...')
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@navrachna.org',
    password: 'NavrachnaAdmin2026!'
  })

  if (authError) {
    console.error('❌ Auth error:', authError.message)
    return
  }
  console.log('✅ Admin authenticated successfully!')

  const canonicalId = 'cd05c676-128d-4ad8-832e-0ac5236f4237' // Samiruddin Ansari
  const dupeId = '94118cf9-92ef-4294-8125-113fd1480240' // Samiruddin

  // 1. Fetch project_people
  const { data: projPeople } = await supabase.from('project_people').select('*')
  const existingProjPairs = new Set((projPeople || []).map(p => `${p.project_id}___${p.person_id}`))

  const matchesProj = (projPeople || []).filter(p => p.person_id === dupeId)
  for (const pp of matchesProj) {
    const targetPair = `${pp.project_id}___${canonicalId}`
    if (existingProjPairs.has(targetPair)) {
      await supabase.from('project_people').delete().eq('project_id', pp.project_id).eq('person_id', dupeId)
    } else {
      await supabase.from('project_people').update({ person_id: canonicalId }).eq('project_id', pp.project_id).eq('person_id', dupeId)
      existingProjPairs.add(targetPair)
    }
  }

  // 2. Fetch startup_founders
  const { data: startupFounders } = await supabase.from('startup_founders').select('*')
  const existingFoundersPairs = new Set((startupFounders || []).map(sf => `${sf.startup_id}___${sf.person_id}`))

  const matchesFounders = (startupFounders || []).filter(sf => sf.person_id === dupeId)
  for (const sf of matchesFounders) {
    const targetPair = `${sf.startup_id}___${canonicalId}`
    if (existingFoundersPairs.has(targetPair)) {
      await supabase.from('startup_founders').delete().eq('startup_id', sf.startup_id).eq('person_id', dupeId)
    } else {
      await supabase.from('startup_founders').update({ person_id: canonicalId }).eq('startup_id', sf.startup_id).eq('person_id', dupeId)
      existingFoundersPairs.add(targetPair)
    }
  }

  // 3. Update canonical record name and roles
  await supabase
    .from('people')
    .update({
      full_name: 'Samiruddin Ansari',
      title_prefix: 'Md.',
      roles: ['mentor', 'mentee']
    })
    .eq('id', canonicalId)

  // 4. Delete dupe person record
  const { error: delErr } = await supabase.from('people').delete().eq('id', dupeId)
  if (delErr) {
    console.error('Error deleting duplicate Samiruddin row:', delErr.message)
  } else {
    console.log('Successfully deleted duplicate Samiruddin record.')
  }

  const { count: finalCount } = await supabase.from('people').select('*', { count: 'exact', head: true })
  console.log(`--- MERGE COMPLETED ---`)
  console.log(`Final unique people count in Supabase: ${finalCount}`)
}

mergeSamiruddin().catch(console.error)
