import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://obnqhrmfbctslwoylsjq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function detailedCheck() {
  const { data: startups, error } = await supabase
    .from('startups')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error(error)
    return
  }

  console.log(`Total records: ${startups.length}\n`)

  const parsedList = startups.map(s => {
    let p = {}
    try {
      if (s.description) p = JSON.parse(s.description)
    } catch(e) {}
    return {
      id: s.id,
      raw_name: s.name,
      comp_name: p.company_name || s.name,
      founder: p.founder_name || '',
      cin: p.cin_number || 'N/A',
      revenue: p.revenue_in_lakhs || 0,
      stage: p.stage || s.incubation_status || 'N/A',
      logo: p.logo_url || s.logo_url || '',
      created_at: s.created_at,
      desc_length: (s.description || '').length
    }
  })

  // Compare every pair for high name similarity
  const duplicatePairs = []
  for (let i = 0; i < parsedList.length; i++) {
    for (let j = i + 1; j < parsedList.length; j++) {
      const a = parsedList[i]
      const b = parsedList[j]

      const nA = a.comp_name.toLowerCase().replace(/[^a-z0-9]/g, '')
      const nB = b.comp_name.toLowerCase().replace(/[^a-z0-9]/g, '')

      const fA = a.founder.toLowerCase().replace(/[^a-z0-9]/g, '')
      const fB = b.founder.toLowerCase().replace(/[^a-z0-9]/g, '')

      let isMatch = false
      let reason = ''

      if (nA === nB) {
        isMatch = true
        reason = 'Exact Normalized Name Match'
      } else if (nA.includes(nB) || nB.includes(nA)) {
        // Check if one is a prefix/substring of another (ignoring common suffixes)
        const stripSuffix = s => s.replace(/(privatelimited|pvtltd|llp|ltd|limited|services|technologies|innovations|solutions)/g, '')
        const sA = stripSuffix(nA)
        const sB = stripSuffix(nB)
        if (sA === sB || sA.includes(sB) || sB.includes(sA)) {
          isMatch = true
          reason = 'Base Name Match'
        }
      } else if (fA && fB && fA === fB) {
        isMatch = true
        reason = 'Same Founder Name'
      }

      if (isMatch) {
        duplicatePairs.push({ a, b, reason })
      }
    }
  }

  console.log(`Found ${duplicatePairs.length} duplicate pair connections:\n`)

  duplicatePairs.forEach((pair, idx) => {
    console.log(`--- PAIR #${idx + 1} (${pair.reason}) ---`)
    console.log(`RECORD A: [${pair.a.id}] Name: "${pair.a.comp_name}" | Founder: "${pair.a.founder}" | CIN: "${pair.a.cin}" | Rev: ${pair.a.revenue}L | Created: ${pair.a.created_at} | Desc Length: ${pair.a.desc_length}`)
    console.log(`RECORD B: [${pair.b.id}] Name: "${pair.b.comp_name}" | Founder: "${pair.b.founder}" | CIN: "${pair.b.cin}" | Rev: ${pair.b.revenue}L | Created: ${pair.b.created_at} | Desc Length: ${pair.b.desc_length}`)
    
    // Suggest which one to keep
    let keep = pair.a
    let remove = pair.b
    if (pair.b.founder && !pair.a.founder) {
      keep = pair.b
      remove = pair.a
    } else if (pair.b.cin !== 'N/A' && pair.a.cin === 'N/A') {
      keep = pair.b
      remove = pair.a
    } else if (pair.b.desc_length > pair.a.desc_length) {
      keep = pair.b
      remove = pair.a
    }
    console.log(`   💡 RECOMMEND: Keep [${keep.id}] ("${keep.compName || keep.raw_name}"), Remove [${remove.id}] ("${remove.compName || remove.raw_name}")\n`)
  })
}

detailedCheck()
