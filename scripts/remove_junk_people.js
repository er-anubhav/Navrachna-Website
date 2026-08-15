import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(supabaseUrl, supabaseKey)

const JUNK_NAMES = ['amp;', 'an', 'ey', 'uja', 'mr.', 'ch']

async function removeJunkPeople() {
  console.log('--- REMOVING CORRUPTED JUNK PEOPLE ENTRIES ---')

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

  const { data: people } = await supabase.from('people').select('id, full_name')
  
  const junkIds = (people || [])
    .filter(p => JUNK_NAMES.includes((p.full_name || '').trim().toLowerCase()))
    .map(p => p.id)

  console.log(`Found ${junkIds.length} corrupted junk entries to remove.`)

  if (junkIds.length > 0) {
    // Re-link or clean FKs if any
    for (const id of junkIds) {
      await supabase.from('project_people').delete().eq('person_id', id)
      await supabase.from('startup_founders').delete().eq('person_id', id)
      const { error } = await supabase.from('people').delete().eq('id', id)
      if (error) {
        console.error(`Error deleting junk ID ${id}:`, error.message)
      }
    }
  }

  const { count: finalCount } = await supabase.from('people').select('*', { count: 'exact', head: true })
  console.log(`--- JUNK REMOVAL COMPLETED ---`)
  console.log(`Final verified clean people count in Supabase: ${finalCount}`)
}

removeJunkPeople().catch(console.error)
