import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://obnqhrmfbctslwoylsjq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function verify() {
  const { data: startups, error } = await supabase
    .from('startups')
    .select('id, name, description, created_at')
    .order('name', { ascending: true })

  if (error) {
    console.error(error)
    return
  }

  console.log(`Current Total Startups in Supabase: ${startups.length}`)

  const map = {}
  startups.forEach(s => {
    let name = s.name
    try {
      const p = JSON.parse(s.description)
      if (p.company_name) name = p.company_name
    } catch(e) {}
    const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (!map[norm]) map[norm] = []
    map[norm].push({ id: s.id, name })
  })

  let count = 0
  Object.keys(map).forEach(k => {
    if (map[k].length > 1) {
      count++
      console.log(`DUPLICATE GROUP: ${k}`, map[k])
    }
  })

  console.log(`Total exact normalized duplicates remaining: ${count}`)
}

verify()
