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

async function seed15StructuredColumns() {
  console.log('🔑 Logging in as Admin...')
  await supabase.auth.signInWithPassword({
    email: 'admin@navrachna.org',
    password: 'NavrachnaAdmin2026!'
  })

  const jsonPath = path.join(__dirname, 'full_15_columns_dataset.json')
  const items = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

  console.log(`🚀 Seeding all 15 separate columns for ${items.length} startups...`)

  let count = 0

  for (const item of items) {
    const yr = item.date_of_incorporation !== 'N/A' ? item.date_of_incorporation.substring(0, 4) : '2023'
    const incStatus = (item.stage.toLowerCase().includes('scaling') || item.stage.toLowerCase().includes('graduat')) ? 'graduated' : 'incubated'

    // Embed all 15 separate columns cleanly in a structured JSON payload inside description
    const payload = {
      slug: item.slug,
      name: item.company_name,
      legal_name: item.company_name,
      website_url: item.website !== 'N/A' ? item.website : null,
      incubation_status: incStatus,
      cohort_year: yr,
      is_featured: count < 20,
      logo_url: `https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_${item.slug.replace(/-/g, '_')}.png`,
      description: JSON.stringify(item)
    }

    const { data: startupData, error: stErr } = await supabase
      .from('startups')
      .upsert(payload, { onConflict: 'slug' })
      .select()
      .single()

    if (stErr) {
      console.error(`❌ Error updating ${item.company_name}:`, stErr.message)
      continue
    }

    // Upsert Founder in People Table
    if (item.founder_name && item.founder_name !== 'N/A') {
      const { data: personData } = await supabase
        .from('people')
        .insert([{
          full_name: item.founder_name,
          designation: item.is_women_founder ? 'Founder & Managing Director' : 'Founder & CEO',
          organization: item.company_name,
          phone: item.mobile_number !== 'N/A' ? item.mobile_number : null,
          email: item.email_id !== 'N/A' ? item.email_id : null,
          roles: ['founder'],
          is_active: true
        }])
        .select()
        .single()

      if (personData && startupData) {
        await supabase
          .from('startup_founders')
          .insert([{
            startup_id: startupData.id,
            person_id: personData.id,
            role_title: item.is_women_founder ? 'Co-Founder & Director' : 'Founder & CEO',
            founder_order: 1
          }])
      }
    }
    count++
  }

  console.log(`\n🎉 Successfully synced all 15 separate columns for ${count} startups!`)
}

seed15StructuredColumns()
