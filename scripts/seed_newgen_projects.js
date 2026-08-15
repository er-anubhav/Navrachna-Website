import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedNewGenProjects() {
  console.log('🔑 Logging in as Admin to bypass RLS policies...')
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@navrachna.org',
    password: 'NavrachnaAdmin2026!'
  })

  if (authError) {
    console.error('❌ Auth error:', authError.message)
  } else {
    console.log('✅ Admin authenticated successfully!')
  }

  console.log('🚀 Starting seeding of 71 authentic NewGen IEDC prototype projects into newgen_projects table...')

  const jsonPath = path.join(__dirname, 'newgen_projects.json')
  const projectsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

  let successCount = 0
  let errorCount = 0

  for (const item of projectsData) {
    const { data, error } = await supabase
      .from('newgen_projects')
      .upsert(item, { onConflict: 'slug' })
      .select()

    if (error) {
      console.error(`❌ Error seeding project "${item.title}":`, error.message)
      errorCount++
    } else {
      successCount++
      console.log(`✅ Seeded Project: ${item.title} [${item.category_label}]`)
    }
  }

  console.log(`\n🎉 NewGen Projects Seeding Complete! Successfully seeded ${successCount}/${projectsData.length} projects into newgen_projects.`)
}

seedNewGenProjects()
