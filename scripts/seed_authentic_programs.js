import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const ROOT_FOUNDATION_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

const authenticPrograms = [
  {
    foundation_id: ROOT_FOUNDATION_ID,
    name: 'DST NewGen-IEDC',
    slug: 'newgen-iedc',
    type: 'grant_scheme',
    description: 'DST Govt of India funded Student Prototype & Proof-of-Concept (PoC) grant scheme providing up to ₹2.5 Lakhs per student prototype project.'
  },
  {
    foundation_id: ROOT_FOUNDATION_ID,
    name: 'MSME Business Incubator (MSME-BI)',
    slug: 'msme-bi',
    type: 'incubation_track',
    description: 'Ministry of MSME Govt of India approved Business Incubator offering up to ₹15 Lakhs seed grant per approved idea and up to ₹1 Crore for plant & machinery infrastructure.'
  },
  {
    foundation_id: ROOT_FOUNDATION_ID,
    name: 'StartinUP (UP State Incubation Scheme)',
    slug: 'startin-up',
    type: 'incubation_track',
    description: 'Government of Uttar Pradesh flagship incubation scheme providing state policy incentives, co-working desk allocation, and resident startup acceleration.'
  },
  {
    foundation_id: ROOT_FOUNDATION_ID,
    name: 'MoE Innovation Cell (IIC - ITSEC)',
    slug: 'iic-itsec',
    type: 'institutional_cell',
    description: 'Ministry of Education (MoE) Govt of India Innovation Cell tracking campus star ratings, IPR workshops, and National Innovation & Start-up Policy (NISP) implementation.'
  },
  {
    foundation_id: ROOT_FOUNDATION_ID,
    name: 'Kartavyam Initiative',
    slug: 'kartavyam',
    type: 'outreach_track',
    description: 'Youth STEM outreach program, high school ideation challenges, and societal technology projects driven by Navrachna Foundation.'
  }
]

async function seedPrograms() {
  console.log('Seeding authentic programs into Supabase database...')
  for (const prog of authenticPrograms) {
    const { data, error } = await supabase
      .from('programs')
      .upsert(prog, { onConflict: 'slug' })
      .select()
    
    if (error) {
      console.error(`Error seeding ${prog.name}:`, error.message)
    } else {
      console.log(`Successfully seeded: ${prog.name} (${prog.slug})`)
    }
  }
  console.log('Program seeding finished!')
}

seedPrograms()
