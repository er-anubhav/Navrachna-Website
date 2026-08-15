import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://obnqhrmfbctslwoylsjq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function cleanupOneMore() {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@navrachna.org',
    password: 'NavrachnaAdmin2026!'
  })

  if (authError) {
    console.error('❌ Auth error:', authError.message)
    return
  }

  const targetId = '9f692437-f227-4567-a180-689806457dfe' // Stub Digiera Private Limited
  const { error } = await supabase.from('startups').delete().eq('id', targetId)

  if (error) {
    console.error('❌ Error:', error.message)
  } else {
    console.log(`✅ Deleted stub Digiera record [${targetId}]`)
  }
}

cleanupOneMore()
