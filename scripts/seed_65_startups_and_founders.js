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

async function seedStartupsAndFounders() {
  console.log('🔑 Logging in as Admin...')
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@navrachna.org',
    password: 'NavrachnaAdmin2026!'
  })

  if (authError) {
    console.error('❌ Auth error:', authError.message)
    return
  }
  console.log('✅ Admin authenticated successfully!')

  const jsonPath = path.join(__dirname, 'masterdata_startups_with_founders.json')
  const items = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

  console.log(`🚀 Seeding ${items.length} authentic incubated startups and their founders into Supabase...`)

  let successCount = 0
  let founderLinkCount = 0

  for (const item of items) {
    const startupPayload = {
      slug: item.slug,
      name: item.name,
      legal_name: item.legal_name,
      description: item.description,
      website_url: item.website_url,
      incubation_status: item.incubation_status,
      cohort_year: item.cohort_year,
      is_featured: item.is_featured,
      logo_url: `https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_${item.slug.replace(/-/g, '_')}.png`
    }

    // 1. Upsert Startup
    const { data: startupData, error: startupError } = await supabase
      .from('startups')
      .upsert(startupPayload, { onConflict: 'slug' })
      .select()
      .single()

    if (startupError) {
      console.error(`❌ Startup Error (${item.name}):`, startupError.message)
      continue
    }

    successCount++

    // 2. Upsert Founder Person if founder_name exists
    if (item.founder_name && item.founder_name !== 'N/A') {
      const personPayload = {
        full_name: item.founder_name,
        designation: item.is_women_founder ? 'Founder & Managing Director' : 'Founder & CEO',
        organization: item.name,
        phone: item.mobile || null,
        roles: ['founder'],
        is_active: true
      }

      // Find or create person
      let personId = null
      const { data: existingPerson } = await supabase
        .from('people')
        .select('id')
        .eq('full_name', item.founder_name)
        .maybeSingle()

      if (existingPerson) {
        personId = existingPerson.id
      } else {
        const { data: newPerson, error: personError } = await supabase
          .from('people')
          .insert([personPayload])
          .select()
          .single()

        if (!personError && newPerson) {
          personId = newPerson.id
        }
      }

      // 3. Link Startup and Founder in startup_founders junction table
      if (personId && startupData?.id) {
        const { error: linkError } = await supabase
          .from('startup_founders')
          .upsert(
            {
              startup_id: startupData.id,
              person_id: personId,
              role_title: item.is_women_founder ? 'Co-Founder & Director' : 'Founder & CEO',
              founder_order: 1
            },
            { onConflict: 'startup_id,person_id' }
          )

        if (!linkError) {
          founderLinkCount++
        }
      }
    }
  }

  console.log(`\n🎉 Seeding Complete!`)
  console.log(`✅ ${successCount}/${items.length} Startups created/updated.`)
  console.log(`✅ ${founderLinkCount} Founders created and linked to their startups!`)
}

seedStartupsAndFounders()
