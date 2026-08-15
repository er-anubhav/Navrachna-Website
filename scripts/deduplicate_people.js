import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(supabaseUrl, supabaseKey)

async function deduplicatePeople() {
  console.log('--- STARTING PEOPLE TABLE DEDUPLICATION ---')

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

  // 1. Fetch all people with pagination
  let allPeople = []
  let from = 0
  const step = 1000
  while (true) {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .range(from, from + step - 1)
      .order('created_at', { ascending: true })

    if (error || !data || data.length === 0) break
    allPeople = allPeople.concat(data)
    if (data.length < step) break
    from += step
  }

  console.log(`Total people rows fetched: ${allPeople.length}`)

  // Helper to normalize names for comparison
  const normalize = (name) => {
    if (!name) return ''
    return name.trim().toLowerCase().replace(/\s+/g, ' ')
  }

  // 2. Group by normalized name
  const map = {}
  allPeople.forEach(p => {
    const key = normalize(p.full_name)
    if (!key) return
    if (!map[key]) map[key] = []
    map[key].push(p)
  })

  const canonicalsToUpdate = []
  const toDeleteIds = []
  const idRemap = {} // dupeId -> canonicalId

  Object.keys(map).forEach(key => {
    const list = map[key]
    
    // Sort to pick best canonical record
    list.sort((a, b) => {
      const scoreA = (a.email ? 10 : 0) + (a.photo_url ? 10 : 0) + (a.phone ? 5 : 0) + (a.bio ? 5 : 0) + (a.organization ? 2 : 0)
      const scoreB = (b.email ? 10 : 0) + (b.photo_url ? 10 : 0) + (b.phone ? 5 : 0) + (b.bio ? 5 : 0) + (b.organization ? 2 : 0)
      if (scoreA !== scoreB) return scoreB - scoreA
      return new Date(a.created_at) - new Date(b.created_at)
    })

    const canonical = { ...list[0] }
    const dupes = list.slice(1)

    if (dupes.length > 0) {
      let updatedCanonical = false
      dupes.forEach(d => {
        idRemap[d.id] = canonical.id
        toDeleteIds.push(d.id)

        if (!canonical.email && d.email) { canonical.email = d.email; updatedCanonical = true; }
        if (!canonical.phone && d.phone) { canonical.phone = d.phone; updatedCanonical = true; }
        if (!canonical.photo_url && d.photo_url) { canonical.photo_url = d.photo_url; updatedCanonical = true; }
        if (!canonical.organization && d.organization) { canonical.organization = d.organization; updatedCanonical = true; }
        if (!canonical.designation && d.designation) { canonical.designation = d.designation; updatedCanonical = true; }
        if (!canonical.bio && d.bio) { canonical.bio = d.bio; updatedCanonical = true; }
        
        if (d.roles && Array.isArray(d.roles)) {
          const mergedRoles = new Set([...(canonical.roles || []), ...d.roles])
          if (mergedRoles.size !== (canonical.roles || []).length) {
            canonical.roles = Array.from(mergedRoles)
            updatedCanonical = true
          }
        }
      })

      if (updatedCanonical) {
        canonicalsToUpdate.push(canonical)
      }
    }
  })

  console.log(`Unique Canonical People to retain: ${Object.keys(map).length}`)
  console.log(`Redundant duplicate rows to delete: ${toDeleteIds.length}`)

  // 3. Re-link foreign key references in project_people
  console.log('Re-linking project_people table references...')
  const { data: projPeople } = await supabase.from('project_people').select('*')
  if (projPeople && projPeople.length > 0) {
    const existingPairs = new Set(projPeople.map(p => `${p.project_id}___${p.person_id}`))
    for (const pp of projPeople) {
      if (idRemap[pp.person_id]) {
        const canonicalId = idRemap[pp.person_id]
        const targetPair = `${pp.project_id}___${canonicalId}`
        if (existingPairs.has(targetPair)) {
          // Delete redundant duplicate pair
          await supabase
            .from('project_people')
            .delete()
            .eq('project_id', pp.project_id)
            .eq('person_id', pp.person_id)
        } else {
          // Re-link to canonical person_id
          await supabase
            .from('project_people')
            .update({ person_id: canonicalId })
            .eq('project_id', pp.project_id)
            .eq('person_id', pp.person_id)
          existingPairs.add(targetPair)
        }
      }
    }
  }

  // 4. Re-link foreign key references in startup_founders
  console.log('Re-linking startup_founders table references...')
  const { data: startupFounders } = await supabase.from('startup_founders').select('*')
  if (startupFounders && startupFounders.length > 0) {
    const existingPairs = new Set(startupFounders.map(sf => `${sf.startup_id}___${sf.person_id}`))
    for (const sf of startupFounders) {
      if (idRemap[sf.person_id]) {
        const canonicalId = idRemap[sf.person_id]
        const targetPair = `${sf.startup_id}___${canonicalId}`
        if (existingPairs.has(targetPair)) {
          // Delete redundant duplicate pair
          await supabase
            .from('startup_founders')
            .delete()
            .eq('startup_id', sf.startup_id)
            .eq('person_id', sf.person_id)
        } else {
          // Re-link to canonical person_id
          await supabase
            .from('startup_founders')
            .update({ person_id: canonicalId })
            .eq('startup_id', sf.startup_id)
            .eq('person_id', sf.person_id)
          existingPairs.add(targetPair)
        }
      }
    }
  }

  // 5. Update canonical records with merged fields
  console.log(`Updating ${canonicalsToUpdate.length} canonical records with merged fields...`)
  for (const c of canonicalsToUpdate) {
    await supabase
      .from('people')
      .update({
        email: c.email,
        phone: c.phone,
        photo_url: c.photo_url,
        organization: c.organization,
        designation: c.designation,
        bio: c.bio,
        roles: c.roles
      })
      .eq('id', c.id)
  }

  // 6. Delete redundant duplicate records in batches of 50
  console.log(`Deleting ${toDeleteIds.length} redundant duplicate records...`)
  const batchSize = 50
  for (let i = 0; i < toDeleteIds.length; i += batchSize) {
    const chunk = toDeleteIds.slice(i, i + batchSize)
    const { error } = await supabase.from('people').delete().in('id', chunk)
    if (error) {
      console.error(`Error deleting batch starting at index ${i}:`, error.message)
    }
  }

  // 7. Verify remaining count
  const { count: finalCount } = await supabase.from('people').select('*', { count: 'exact', head: true })
  console.log(`--- DEDUPLICATION COMPLETED ---`)
  console.log(`Final unique people count in Supabase: ${finalCount}`)
}

deduplicatePeople().catch(console.error)
