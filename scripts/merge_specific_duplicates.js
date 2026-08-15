import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(supabaseUrl, supabaseKey)

// Custom merge targets: map of duplicate IDs -> canonical ID & preferred full name
const MERGE_GROUPS = [
  {
    canonicalName: 'Agha Asim Husain',
    canonicalId: '2908d2fe-b474-4106-b338-fd7985aa1763',
    dupeIds: ['3f528aae-987d-4e33-bf2b-9264109fda09']
  },
  {
    canonicalName: 'Harshit Kumar Singh',
    canonicalId: '648679f4-559d-4e98-8c1e-8bb6a7562e04',
    dupeIds: ['72eecd22-752b-444f-b3a2-1464df516582']
  },
  {
    canonicalName: 'Piyush Kumar Pathak',
    canonicalId: 'dd40fa54-c2a5-4e25-bd96-6711c1b209ef',
    dupeIds: ['97f13d46-9b72-43f9-8c07-ae7def1d0da2']
  },
  {
    canonicalName: 'Upendra Kumar Agarwal',
    canonicalId: 'e1dbb515-c168-4e04-b4aa-53d486beb00a',
    dupeIds: ['d8316fcc-d614-4e43-885b-c5000c0e2c99', 'e35f38d9-359f-4464-85c3-2e7609cd2268']
  }
]

async function mergeSpecificDuplicates() {
  console.log('--- STARTING SPECIFIC DUPLICATE MERGE ---')

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

  const { data: projPeople } = await supabase.from('project_people').select('*')
  const existingProjPairs = new Set((projPeople || []).map(p => `${p.project_id}___${p.person_id}`))

  const { data: startupFounders } = await supabase.from('startup_founders').select('*')
  const existingFoundersPairs = new Set((startupFounders || []).map(sf => `${sf.startup_id}___${sf.person_id}`))

  let totalDeletedPeople = 0

  for (const group of MERGE_GROUPS) {
    console.log(`\nMerging group: "${group.canonicalName}" (Canonical ID: ${group.canonicalId})...`)

    // Update canonical name
    await supabase.from('people').update({ full_name: group.canonicalName }).eq('id', group.canonicalId)

    for (const dupeId of group.dupeIds) {
      console.log(`- Re-linking dupe ID ${dupeId} -> ${group.canonicalId}`)

      // 1. Re-link project_people
      if (projPeople) {
        const matches = projPeople.filter(p => p.person_id === dupeId)
        for (const pp of matches) {
          const targetPair = `${pp.project_id}___${group.canonicalId}`
          if (existingProjPairs.has(targetPair)) {
            await supabase.from('project_people').delete().eq('project_id', pp.project_id).eq('person_id', dupeId)
          } else {
            await supabase.from('project_people').update({ person_id: group.canonicalId }).eq('project_id', pp.project_id).eq('person_id', dupeId)
            existingProjPairs.add(targetPair)
          }
        }
      }

      // 2. Re-link startup_founders
      if (startupFounders) {
        const matches = startupFounders.filter(sf => sf.person_id === dupeId)
        for (const sf of matches) {
          const targetPair = `${sf.startup_id}___${group.canonicalId}`
          if (existingFoundersPairs.has(targetPair)) {
            await supabase.from('startup_founders').delete().eq('startup_id', sf.startup_id).eq('person_id', dupeId)
          } else {
            await supabase.from('startup_founders').update({ person_id: group.canonicalId }).eq('startup_id', sf.startup_id).eq('person_id', dupeId)
            existingFoundersPairs.add(targetPair)
          }
        }
      }

      // 3. Delete redundant person record
      const { error: delErr } = await supabase.from('people').delete().eq('id', dupeId)
      if (delErr) {
        console.error(`Error deleting dupe ID ${dupeId}:`, delErr.message)
      } else {
        totalDeletedPeople++
        console.log(`Deleted dupe ID ${dupeId} successfully.`)
      }
    }
  }

  const { count: finalCount } = await supabase.from('people').select('*', { count: 'exact', head: true })
  console.log(`\n--- SPECIFIC DUPLICATE MERGE COMPLETED ---`)
  console.log(`Total duplicate rows removed: ${totalDeletedPeople}`)
  console.log(`Final clean unique people count in Supabase: ${finalCount}`)
}

mergeSpecificDuplicates().catch(console.error)
