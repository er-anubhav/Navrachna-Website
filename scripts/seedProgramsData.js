import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(supabaseUrl, supabaseKey)

const programsToSeed = [
  {
    slug: 'startin-up',
    name: 'StartinUP (UP State Incubation Scheme)',
    nodal_agency: 'Department of IT & Electronics, Govt of UP',
    grant_amount: 'Up to ₹17.5K/mo Sustenance + ₹5L Prototype Grant',
    type: 'GOVT_SCHEME',
    is_active: true,
    display_order: 1,
    description: `Navrachna Foundation for Entrepreneurship Development is dedicated to building a vibrant innovation and start‑up ecosystem that empowers young entrepreneurs to translate ideas into high‑impact, technology-driven ventures.

Navrachna’s vision is closely aligned with the StartinUP program of the Government of Uttar Pradesh, which aims to foster a robust start-up ecosystem through policy support, incubation, sustenance allowance, prototype grants, seed funding pathways, and market linkages.

By mirroring StartinUP’s core priorities—innovation-led growth, ease of doing business, inclusive entrepreneurship, and direct access to capital—Navrachna acts as an authorized execution partner to guide emerging founders from ideation to commercial market scaling.`
  },
  {
    slug: 'newgen-iedc',
    name: 'DST NewGen-IEDC Scheme',
    nodal_agency: 'NSTEDB, Department of Science & Technology, Govt of India',
    grant_amount: '₹2.50 Lakhs per Student Prototype Project',
    type: 'GOVT_SCHEME',
    is_active: true,
    display_order: 2,
    description: `The New Gen Innovation and Entrepreneurship Development Centre (NewGen-IEDC) is an initiative of the National Science & Technology Entrepreneurship Development Board (NSTEDB), Department of Science & Technology (DST), Government of India.

It is established to inculcate the spirit of innovation and entrepreneurship among the young students of Science & Technology, encouraging them to take up entrepreneurship as a career option.

Under this flagship scheme at Navrachna Foundation, up to 20 student-led prototype projects are funded each academic year with financial support of ₹2.50 Lakhs per project, alongside comprehensive Fab Lab access, patent filing assistance, and technical mentorship.`
  },
  {
    slug: 'msme-bi',
    name: 'MSME Business Incubator (MSME-BI)',
    nodal_agency: 'Ministry of Micro, Small & Medium Enterprises, Govt of India',
    grant_amount: 'Up to ₹15 Lakhs Seed Grant per Idea',
    type: 'GOVT_SCHEME',
    is_active: true,
    display_order: 3,
    description: `The MSME Business Incubator scheme under the Ministry of Micro, Small and Medium Enterprises (MoMSME), Government of India, supports the incubation of innovative business ideas into commercial enterprises.

Operating as an approved Host Institute (HI), Navrachna Foundation nurtures technology-driven MSME projects by providing non-equity grant funding up to ₹15 Lakhs per idea, specialized industrial machinery access, regulatory compliance guidance, and corporate supply chain integration.

This track is specially designed for tech founders, manufacturing innovators, and small enterprise leaders aiming to scale prototype concepts into sustainable market-ready products.`
  },
  {
    slug: 'iic',
    name: "Institution's Innovation Council (IIC)",
    nodal_agency: 'Ministry of Education Innovation Cell (MIC), Govt of India',
    grant_amount: 'Mentorship & Institutional Grant Pipeline',
    type: 'INSTITUTIONAL',
    is_active: true,
    display_order: 4,
    description: `Institution’s Innovation Council (IIC) is an initiative of the Ministry of Education (MoE) Innovation Cell (MIC), Government of India, established to systematically foster the culture of Innovation among Higher Education Institutions.

Navrachna Foundation functions as a central innovation hub under IIC to drive hackathons, ideation challenges, intellectual property workshops, and pre-incubation pipelines for student innovators.

Through structured quarterly activity calendars, resident teams receive continuous exposure to angel investors, national innovation contests, policy seminars, and technology transfer support.`
  },
  {
    slug: 'kartavyam',
    name: 'Kartavyam Youth STEM Initiative',
    nodal_agency: 'Navrachna Foundation Youth Outreach Wing',
    grant_amount: 'STEM Tinkering Grants & Prototyping Kits',
    type: 'YOUTH_OUTREACH',
    is_active: true,
    display_order: 5,
    description: `Kartavyam is Navrachna Foundation’s flagship youth outreach and STEM innovation program, empowering school students across Northern India to develop problem-solving mindsets from an early age.

Impacting over 300+ young innovators across 40+ partner schools, Kartavyam provides hands-on robotics workshops, 3D printing training, tinkering lab access, and junior hackathons.

Through structured mentoring from senior incubatees and Fab Lab engineers, Kartavyam nurtures the next generation of scientific thinkers and young founders.`
  }
]

async function seed() {
  console.log('Seeding programs table in Supabase...')
  for (const prog of programsToSeed) {
    // Upsert by slug
    const { data, error } = await supabase
      .from('programs')
      .upsert(prog, { onConflict: 'slug' })

    if (error) {
      console.error(`Error seeding ${prog.slug}:`, error.message)
    } else {
      console.log(`Successfully seeded ${prog.slug}`)
    }
  }
  console.log('Programs seeding complete!')
}

seed()
