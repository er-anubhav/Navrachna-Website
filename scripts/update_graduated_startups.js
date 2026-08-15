import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://obnqhrmfbctslwoylsjq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const GRADUATED_NAMES = [
  'revive ev llp',
  'daskan technologies private limited'
]

async function updateGraduated() {
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

  const { data: startups, error } = await supabase
    .from('startups')
    .select('id, name, description, incubation_status')

  if (error) {
    console.error('Error fetching startups:', error)
    return
  }

  console.log(`Total startups in DB: ${startups.length}`)

  let graduatedCount = 0
  let incubatedCount = 0

  for (const s of startups) {
    let companyName = s.name
    let parsed = {}
    try {
      if (s.description) parsed = JSON.parse(s.description)
      if (parsed.company_name) companyName = parsed.company_name
    } catch(e) {}

    const normName = companyName.toLowerCase().trim()
    const isTargetGraduated = GRADUATED_NAMES.some(target => normName.includes(target) || target.includes(normName))

    let newStatus = isTargetGraduated ? 'graduated' : 'incubated'
    let newStage = isTargetGraduated ? 'Graduated' : (parsed.stage === 'Graduated' ? 'Early Traction' : (parsed.stage || 'Early Traction'))

    // Update description JSON
    parsed.stage = newStage

    const payload = {
      incubation_status: newStatus,
      description: JSON.stringify(parsed)
    }

    const { error: updateErr } = await supabase
      .from('startups')
      .update(payload)
      .eq('id', s.id)

    if (updateErr) {
      console.error(`❌ Error updating [${companyName}]:`, updateErr.message)
    } else {
      if (isTargetGraduated) {
        graduatedCount++
        console.log(`🎓 Marked GRADUATED: [${companyName}] (${s.id})`)
      } else {
        incubatedCount++
      }
    }
  }

  console.log(`\n========================================`)
  console.log(`✅ Update complete! Total Graduated: ${graduatedCount}, Total Incubated: ${incubatedCount}`)
  console.log(`========================================\n`)
}

updateGraduated()
