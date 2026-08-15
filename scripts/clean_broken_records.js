import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(supabaseUrl, supabaseKey)

// Specific broken name fixes & merges
const FIX_AND_MERGE = [
  // 1. HTML artifact fix
  {
    type: 'RENAME',
    id: 'f92c0048-92c5-4d5e-b49b-1a459b39e206', // amp; Dr. Jyoti Batra
    newName: 'Jyoti Batra',
    prefix: 'Dr.'
  },
  // 2. Prefix formatting (add missing space after prefix)
  {
    type: 'FORMAT_PREFIX',
    id: '18dd2c2f-0350-4b18-9432-aa357ded7313', // Mr.Aman Pratap Singh
    newName: 'Aman Pratap Singh',
    prefix: 'Mr.'
  },
  {
    type: 'FORMAT_PREFIX',
    id: '3f6075cf-9a54-4f25-847a-a8d9a31a3624', // Mr.Ashwin Ajay
    newName: 'Ashwin Ajay',
    prefix: 'Mr.'
  },
  {
    type: 'FORMAT_PREFIX',
    id: '9ca37ed6-2651-4141-a274-5d7f21f31d98', // Mr.Deepak Kumar Prajapati
    newName: 'Deepak Kumar Prajapati',
    prefix: 'Mr.'
  },
  {
    type: 'FORMAT_PREFIX',
    id: '1f92f698-9b4d-4f62-a8c5-c2ea549c29e3', // Mr.Rajiv Ranjan
    newName: 'Rajiv Ranjan',
    prefix: 'Mr.'
  },
  {
    type: 'FORMAT_PREFIX',
    id: '5e461445-2d9d-47b6-927b-db34143db2db', // Mr.Shivam Kawshik
    newName: 'Shivam Kawshik',
    prefix: 'Mr.'
  },
  // 3. Merges of truncated name fragments to full names
  {
    type: 'MERGE',
    canonicalId: '4ddd8616-af3b-4464-bd16-0ed9a7558a04', // Aniket Anand
    dupeId: '6a6b64db-0213-4f81-b69b-071ad8960304' // Aniket An
  },
  {
    type: 'MERGE',
    canonicalId: 'f3e931ca-29d0-4e8e-b886-75e303844020', // Dev Khanduja
    dupeId: '7aca799a-a420-49de-bded-3f9499ee72de' // Dev Kh
  },
  {
    type: 'MERGE',
    canonicalId: '4fc68a86-99bc-4ec6-b08e-c5416fcc301e', // Shubham Kumar
    dupeId: '611a84e6-ae82-4e0f-8b2c-05ecc0459e05' // Mr.Shubham
  },
  {
    type: 'MERGE',
    canonicalId: 'a71a2612-c8ec-483c-b596-b3de38dd930b', // Udbhav Vasud
    dupeId: '0a080421-2a41-4329-8fdb-89fa69ba3c7b' // Mr.Udbhav Vashud
  },
  {
    type: 'MERGE',
    canonicalId: '421608be-89f0-408d-b731-25f9352798e2', // Shrishti Uniyal Thapliyal
    dupeId: '6f4b7076-768b-403d-a36e-2a20be418765' // Dr. Shristi U. Thapliyal
  },
  {
    type: 'MERGE',
    canonicalId: 'e1dbb515-c168-4e04-b4aa-53d486beb00a', // Upendra Kumar Agarwal
    dupeId: '5f16a87f-c8d7-4751-b849-961abd4187ef' // Mr. Upendra Agrwal
  }
]

// Unrecoverable corrupted fragments with no full name context
const FRAGMENT_DELETE_IDS = [
  'e6cdafea-28b4-48e6-aa16-b8479185bba5', // Akh
  '1ca35f3f-f9fb-4f7f-b377-7a254e417b1f', // an Kumar
  'b355756c-82c3-481f-99a0-6fb4e0391d1e', // ra Jha
  'dd9aacc5-5198-4111-bbf9-3572efff9d30', // Kumar
  'b484cd9c-44d7-4327-b920-ae99b5d438d0', // Singh
  '1335893e-08ff-4633-b9f3-ea951aa621d6'  // Shrivastva
]

async function cleanBrokenRecords() {
  console.log('--- STARTING BROKEN RECORDS CLEANUP & MERGE ---')

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

  for (const item of FIX_AND_MERGE) {
    if (item.type === 'RENAME' || item.type === 'FORMAT_PREFIX') {
      console.log(`Fixing name for ID ${item.id}: "${item.newName}" (prefix: ${item.prefix})`)
      await supabase
        .from('people')
        .update({ full_name: item.newName, title_prefix: item.prefix })
        .eq('id', item.id)
    } else if (item.type === 'MERGE') {
      console.log(`Merging dupe ${item.dupeId} -> canonical ${item.canonicalId}...`)
      
      // Re-link project_people
      if (projPeople) {
        const matches = projPeople.filter(p => p.person_id === item.dupeId)
        for (const pp of matches) {
          const targetPair = `${pp.project_id}___${item.canonicalId}`
          if (existingProjPairs.has(targetPair)) {
            await supabase.from('project_people').delete().eq('project_id', pp.project_id).eq('person_id', item.dupeId)
          } else {
            await supabase.from('project_people').update({ person_id: item.canonicalId }).eq('project_id', pp.project_id).eq('person_id', item.dupeId)
            existingProjPairs.add(targetPair)
          }
        }
      }

      // Re-link startup_founders
      if (startupFounders) {
        const matches = startupFounders.filter(sf => sf.person_id === item.dupeId)
        for (const sf of matches) {
          const targetPair = `${sf.startup_id}___${item.canonicalId}`
          if (existingFoundersPairs.has(targetPair)) {
            await supabase.from('startup_founders').delete().eq('startup_id', sf.startup_id).eq('person_id', item.dupeId)
          } else {
            await supabase.from('startup_founders').update({ person_id: item.canonicalId }).eq('startup_id', sf.startup_id).eq('person_id', item.dupeId)
            existingFoundersPairs.add(targetPair)
          }
        }
      }

      // Delete dupe
      await supabase.from('people').delete().eq('id', item.dupeId)
    }
  }

  // Purge unrecoverable fragments
  console.log(`Purging ${FRAGMENT_DELETE_IDS.length} unrecoverable broken fragments...`)
  for (const fId of FRAGMENT_DELETE_IDS) {
    await supabase.from('project_people').delete().eq('person_id', fId)
    await supabase.from('startup_founders').delete().eq('person_id', fId)
    await supabase.from('people').delete().eq('id', fId)
  }

  const { count: finalCount } = await supabase.from('people').select('*', { count: 'exact', head: true })
  console.log(`--- BROKEN RECORDS CLEANUP COMPLETED ---`)
  console.log(`Final verified clean people count in Supabase: ${finalCount}`)
}

cleanBrokenRecords().catch(console.error)
