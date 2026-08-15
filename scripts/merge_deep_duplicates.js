import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(supabaseUrl, supabaseKey)

// Explicit merge definitions for confirmed duplicates
const DUPLICATE_GROUPS = [
  // 1. Missing space prefix duplicates
  {
    canonicalName: 'Monika Jain',
    titlePrefix: 'Dr.',
    canonicalId: 'fb513f38-86a8-4c2b-ae40-87d8b09070bf',
    dupeIds: ['30602e7d-71b3-45c5-94d9-5c27b533f6db'] // Dr.Monika Jain
  },
  {
    canonicalName: 'Harshit Dubey',
    titlePrefix: 'Mr.',
    canonicalId: '4ed984a7-23df-44b3-82aa-b31a715bb153',
    dupeIds: ['f476b352-4185-445c-b700-23d6c80e3d6a'] // Mr.Harshit Dubey
  },
  {
    canonicalName: 'Jeevesh Gupta',
    titlePrefix: 'Mr.',
    canonicalId: '6899b35a-3c05-44e6-b2d2-98f6f6a0ada2',
    dupeIds: ['6c365571-888b-4b10-a4c0-389d8ca3d99c'] // Mr.Jeevesh Gupta
  },
  {
    canonicalName: 'Mani Mittal',
    titlePrefix: 'Ms.',
    canonicalId: '292860fc-605a-4a07-a335-27d8836cf017',
    dupeIds: ['9ff5198f-e1e2-4299-9969-dc91a650b77e'] // Ms.Mani Mittal
  },
  {
    canonicalName: 'Prince Ranjan',
    titlePrefix: 'Mr.',
    canonicalId: 'd3eb65ee-c40c-473a-a5c7-98857226c2ee',
    dupeIds: ['fbe7926c-0416-402b-9d48-9209f2df5f28'] // Mr.Prince Ranjan
  },
  // 2. Spelling Typos & Inverted Letters
  {
    canonicalName: 'Manvendra Yadav',
    titlePrefix: 'Mr.',
    canonicalId: 'c42fe96e-e5c5-409f-801e-13f5d1ed314f',
    dupeIds: ['91675276-9f04-480a-b5f6-3fb582efe972'] // Manvendar Yadav
  },
  {
    canonicalName: 'Nikunj Kaushik',
    canonicalId: 'ac68db6c-682a-4fdc-a826-b575175dd3ca',
    dupeIds: ['c07132c9-9470-478f-869e-c54569353b5e'] // Nikunj Kushik
  },
  {
    canonicalName: 'Sudhanshu Ranjan',
    titlePrefix: 'Mr.',
    canonicalId: '8cca6330-3d31-4157-81d4-1059cf063479',
    dupeIds: ['11bca1ae-7997-47c4-98ea-8f90a0f0b430'] // Sudhanshu Rnajan
  },
  // 3. Short single word vs full name duplicates
  {
    canonicalName: 'Shashwat P',
    titlePrefix: 'Mr.',
    canonicalId: '57d9eb82-18d7-4b83-95d6-5d81587d4d05',
    dupeIds: ['95e6ae1e-28d4-497e-8d35-01d5850f6c5c'] // Shashwat
  },
  {
    canonicalName: 'Praveen Chandra Jha',
    titlePrefix: 'Dr.',
    canonicalId: '51f1d191-9a29-4969-ab6d-f0ccf84831cc',
    dupeIds: ['10db104d-fe9c-4dba-8abc-948e9f729813', '11394051-b276-4112-b446-e187650e60df'] // Praveen, Praveen Ch
  }
]

async function mergeDeepDuplicates() {
  console.log('--- STARTING DEEP DUPLICATE MERGE ---')

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

  for (const group of DUPLICATE_GROUPS) {
    console.log(`\nMerging group: "${group.canonicalName}" (Canonical ID: ${group.canonicalId})...`)

    // Update canonical record fields
    const updatePayload = { full_name: group.canonicalName }
    if (group.titlePrefix) updatePayload.title_prefix = group.titlePrefix
    await supabase.from('people').update(updatePayload).eq('id', group.canonicalId)

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
  console.log(`\n--- DEEP DUPLICATE MERGE COMPLETED ---`)
  console.log(`Total duplicate rows removed in this pass: ${totalDeletedPeople}`)
  console.log(`Final clean unique people count in Supabase: ${finalCount}`)
}

mergeDeepDuplicates().catch(console.error)
