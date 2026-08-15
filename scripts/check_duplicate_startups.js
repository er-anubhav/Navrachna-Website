import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://obnqhrmfbctslwoylsjq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function checkRemainingStubs() {
  const { data: startups } = await supabase.from('startups').select('*')

  const stubIds = [
    'bd90ec96-c0a4-4f86-854a-cd2cc199bfc7', // Door to Destination stub
    'c9995f36-ce3d-4da4-9ab6-e1790489efc8', // NextOrbit stub
    '2e9eebf3-06ab-4398-bfe7-1c84186beb5d', // Barren to Berland Abrosaa stub
    'd0c022ff-7d0c-41c4-a76e-28ea56b05e5a', // Home Services Tech stub
    '9036d04f-dd24-4717-b3d1-a74ea8f6788d', // MyLyfCare Private Limited stub
    '569999f0-d80a-465c-979f-db9f4b571cc8', // TrulyFresh Hydroponics stub
    '5feea838-39fb-489c-9c41-6d7a09522bdd', // Intelligentia Woods stub
    'f0732b02-c6ad-4528-a4ed-306d814164a6', // Smart Re-Energy Solutions LLP stub
    '5bee783e-cb9e-4c30-a24e-c18852c1c29c', // Autoremov stub
    'cb531a32-4754-449f-9088-048b6a06cc53', // E4A Solution stub
    '7f826b90-cbd1-445e-9d46-01726ea283ac', // ePN stub
    '0003e643-1c0a-4c0d-a072-f1e8533cacbe', // Evergreat Clean Energy stub
    'd77f4642-320b-4ba6-874b-5811c52492c6', // Green Stag Technologies stub
    'e619a444-ca4f-4282-bbc2-c694be34be86'  // SSB Engineering stub
  ]

  console.log(`Checking ${stubIds.length} candidate stub records for deletion:`)
  stubIds.forEach(id => {
    const found = startups.find(s => s.id === id)
    if (found) {
      console.log(`- [${found.id}] "${found.name}" (Created: ${found.created_at})`)
    }
  })
}

checkRemainingStubs()
