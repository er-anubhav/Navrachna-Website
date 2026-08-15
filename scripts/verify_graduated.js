import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://obnqhrmfbctslwoylsjq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function verifyGraduated() {
  const { data: startups, error } = await supabase
    .from('startups')
    .select('id, name, description, incubation_status')

  if (error) {
    console.error(error)
    return
  }

  const graduated = startups.filter(s => {
    let p = {}
    try { if (s.description) p = JSON.parse(s.description) } catch(e){}
    return s.incubation_status === 'graduated' || p.stage === 'Graduated'
  })

  console.log(`========================================`)
  console.log(`TOTAL GRADUATED STARTUPS IN DB: ${graduated.length}`)
  console.log(`========================================\n`)

  graduated.forEach((s, idx) => {
    let p = {}
    try { if (s.description) p = JSON.parse(s.description) } catch(e){}
    console.log(`${idx + 1}. [${s.id}] Name: "${p.company_name || s.name}" | Status: ${s.incubation_status} | Stage: ${p.stage}`)
  })
}

verifyGraduated()
