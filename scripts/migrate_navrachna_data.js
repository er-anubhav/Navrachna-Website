import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { newgenProjects } from '../src/data/newgenProjects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log(`🚀 Navrachna Full Data Migration Script starting... (${newgenProjects.length} projects loaded)`);

const seedFilePath = path.join(projectRoot, 'supabase', 'seed_data.sql');
const migrationLogPath = path.join(projectRoot, 'Planning', 'stage_2.4_data_migration_log.md');

let sqlStatements = [];
let migrationLogs = [];

function log(section, message) {
    const entry = `[${section}] ${message}`;
    console.log(entry);
    migrationLogs.push(entry);
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

sqlStatements.push(`-- ==============================================================================
-- Navrachna Foundation CMS - Stage 2.4 Production Data Seed Migration Script
-- Target: Supabase PostgreSQL Database
-- Timestamp: ${new Date().toISOString()}
-- Description: Idempotent data migration populating 17 normalized tables & storage pointers.
-- ==============================================================================

BEGIN;
`);

// 1. SITE SETTINGS
log('site_settings', 'Migrating global institutional identity settings...');
sqlStatements.push(`
-- 1. SITE SETTINGS (Single Row)
INSERT INTO public.site_settings (
    id, org_name, parent_org, cin_number, contact_phone, contact_email, contact_address, social_links
) VALUES (
    1,
    'Navrachna Foundation for Entrepreneurship Development',
    'I.T.S Engineering College, Greater Noida',
    'U73200UP2020NPL128831',
    '+91 9540527700',
    'head.nfed@its.edu.in',
    'Plot no. 46, Knowledge Park 3, Greater Noida',
    '{"facebook": "https://www.facebook.com/share/1EsxYHE9Rr/", "instagram": "https://www.instagram.com/itsec_nfed", "linkedin": "https://www.linkedin.com/company/itsec-nfed/"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
    org_name = EXCLUDED.org_name,
    parent_org = EXCLUDED.parent_org,
    cin_number = EXCLUDED.cin_number,
    contact_phone = EXCLUDED.contact_phone,
    contact_email = EXCLUDED.contact_email,
    contact_address = EXCLUDED.contact_address,
    social_links = EXCLUDED.social_links;
`);

// 2. STARTUP CATEGORIES
log('startup_categories', 'Migrating startup categories lookup taxonomy...');
const categories = [
    { slug: 'deep-tech', name: 'Deep-Tech', desc: 'Artificial Intelligence, Robotics, IoT, and Advanced Computing Ventures', order: 1 },
    { slug: 'clean-tech', name: 'Clean-Tech', desc: 'Renewable Energy, Waste Management, and Sustainability Solutions', order: 2 },
    { slug: 'agri-tech', name: 'Agri-Tech', desc: 'Smart Agriculture, Precision Farming, and Crop Diagnostics', order: 3 },
    { slug: 'health-tech', name: 'Health-Tech', desc: 'Biomedical Devices, Telemedicine, and Healthcare Innovations', order: 4 },
    { slug: 'ed-tech', name: 'Ed-Tech', desc: 'Educational Platforms, STEM Tools, and Learning Solutions', order: 5 },
    { slug: 'smart-hardware-iot', name: 'Smart Hardware & IoT', desc: 'Energy-efficient IoT devices and electronic systems', order: 6 },
    { slug: 'enterprise-software', name: 'Enterprise Software', desc: 'SaaS, web applications, and enterprise IT consulting', order: 7 },
    { slug: 'agrotech-biomass', name: 'Agrotech & Biomass', desc: 'Sustainable agricultural hardware and biomass processing', order: 8 },
    { slug: 'advanced-manufacturing', name: 'Advanced Manufacturing', desc: 'Industrial robotics, automation, and vision inspection', order: 9 }
];

sqlStatements.push(`\n-- 2. STARTUP CATEGORIES`);
categories.forEach(cat => {
    sqlStatements.push(`INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('${cat.slug}', '${cat.name}', '${cat.desc.replace(/'/g, "''")}', ${cat.order})
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;`);
});

// 3. PROGRAMS & COHORTS
log('programs', 'Migrating core incubation programs...');
const programs = [
    { slug: 'newgen-iedc', title: 'NewGen Innovation & Entrepreneurship Development Centre', short_name: 'NewGen-IEDC', summary: 'DST-backed prototyping grant program supporting student technology prototypes.', grant_amount: 'Up to Rs. 2.5 Lakhs per project', accent: 'from-amber-100 to-orange-50', bullets: "ARRAY['Idea validation', 'Lab access', 'Mentor reviews']", order: 1 },
    { slug: 'msme-bi', title: 'MSME Business Incubator Scheme', short_name: 'MSME-BI', summary: 'Ministry of MSME initiative fostering innovative ideas into commercial products.', grant_amount: 'Up to Rs. 15 Lakhs per idea', accent: 'from-amber-50 to-yellow-50', bullets: "ARRAY['Structured incubation', 'Compliance support', 'Market access']", order: 2 },
    { slug: 'startinup', title: 'StartinUP Uttar Pradesh State Scheme', short_name: 'StartinUP', summary: 'UP State startup policy providing incubation, matching grants, and seed capital.', grant_amount: 'State Policy Incentives', accent: 'from-rose-100 to-orange-50', bullets: "ARRAY['Launch planning', 'Pitch prep', 'Go-to-market support']", order: 3 },
    { slug: 'innovation-cell', title: 'MoE Innovation Cell', short_name: 'IIC-ITSEC', summary: 'Ministry of Education Innovation Cell fostering campus innovation culture.', grant_amount: 'Institutional Support', accent: 'from-orange-100 to-amber-50', bullets: "ARRAY['Research support', 'IP awareness', 'Innovation pathways']", order: 4 },
    { slug: 'kartavyam', title: 'Kartavyam Youth Initiative', short_name: 'Kartavyam', summary: 'School-level STEM innovation and youth entrepreneurship outreach impacting 300+ students across 40+ partner schools.', grant_amount: 'Outreach Grant', accent: 'from-amber-100 to-yellow-50', bullets: "ARRAY['School Outreach', 'Youth STEM Innovation', 'Early Entrepreneurship']", order: 5 }
];

sqlStatements.push(`\n-- 3. PROGRAMS`);
programs.forEach(prog => {
    sqlStatements.push(`INSERT INTO public.programs (slug, title, short_name, summary, grant_amount, accent_color, bullets, display_order)
VALUES ('${prog.slug}', '${prog.title.replace(/'/g, "''")}', '${prog.short_name}', '${prog.summary.replace(/'/g, "''")}', '${prog.grant_amount}', '${prog.accent}', ${prog.bullets}, ${prog.order})
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;`);
});

log('cohorts', 'Migrating program funding cohorts...');
const cohortYears = ['2023-24', '2022-23', '2021-22', '2020-21', '2019-20'];
sqlStatements.push(`\n-- 4. COHORTS`);
cohortYears.forEach((year, idx) => {
    sqlStatements.push(`INSERT INTO public.cohorts (program_id, year_label, display_order)
VALUES ((SELECT id FROM public.programs WHERE slug = 'newgen-iedc'), '${year}', ${idx + 1})
ON CONFLICT (program_id, year_label) DO NOTHING;`);
});

// 4. NEWGEN PROJECTS & PEOPLE
log('newgen_projects', `Migrating ${newgenProjects.length} NewGen projects...`);

function parseNames(rawString) {
    if (!rawString) return [];
    return rawString.split(/\s*(?:and|\n|,|&)\s*/i)
        .map(n => n.trim())
        .filter(n => n.length > 1);
}

sqlStatements.push(`\n-- 5. NEWGEN PROJECTS & PEOPLE MIGRATION`);

newgenProjects.forEach((proj, index) => {
    const projSlug = slugify(proj.title) || `project-${index + 1}`;
    
    let cohortYear = '2023-24';
    const matchYear = proj.category ? proj.category.match(/\d{4}-\d{2}/) : null;
    if (matchYear) cohortYear = matchYear[0];

    let pStatus = 'NA';
    if (proj.patent_status === 'YES') pStatus = 'Granted';
    else if (proj.patent_status === 'APPLIED') pStatus = 'Filed';
    else if (proj.patent_status === 'Published') pStatus = 'Published';

    const expenditure = parseFloat(proj.expenditure) || 0.00;

    sqlStatements.push(`
-- Project ${index + 1}: ${proj.title.replace(/'/g, "''")}
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '${cohortYear}' LIMIT 1),
    '${projSlug}',
    '${proj.title.replace(/'/g, "''")}',
    '${(proj.description || '').replace(/'/g, "''")}',
    '${pStatus}',
    '${(proj.patent_id || 'NA').replace(/'/g, "''")}',
    ${expenditure},
    '${proj.image || ''}',
    '${(proj.category || '').replace(/'/g, "''")}',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;`);

    const mentors = parseNames(proj.mentor);
    mentors.forEach(mName => {
        const cleanName = mName.replace(/'/g, "''");
        sqlStatements.push(`
INSERT INTO public.people (full_name, designation, roles)
VALUES ('${cleanName}', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = '${projSlug}'),
    (SELECT id FROM public.people WHERE full_name = '${cleanName}' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;`);
    });

    const mentees = parseNames(proj.mentee);
    mentees.forEach(mName => {
        const cleanName = mName.replace(/'/g, "''");
        sqlStatements.push(`
INSERT INTO public.people (full_name, designation, roles)
VALUES ('${cleanName}', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = '${projSlug}'),
    (SELECT id FROM public.people WHERE full_name = '${cleanName}' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;`);
    });
});

// 5. STARTUPS (28 Portfolio Ventures)
log('startups', 'Migrating 28 resident & alumni portfolio startups...');
const startupsList = [
    { name: 'Jagmag Lights', catSlug: 'smart-hardware-iot', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_jagmag.png', desc: 'Energy-efficient IoT LED controllers and smart home decorative lighting solutions.' },
    { name: 'Neurapex AI', catSlug: 'deep-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_neurapex.png', desc: 'Deep learning & natural language processing systems for enterprise decision automation.' },
    { name: 'Indus AI Private Limited', catSlug: 'advanced-manufacturing', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_indus_ai.png', desc: 'AI-driven industrial quality inspection and automated manufacturing vision systems.' },
    { name: 'Digiera Private Limited', catSlug: 'enterprise-software', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_digiera_d.png', desc: 'Custom web development, mobile apps, and enterprise software engineering consulting.' },
    { name: 'ePN (Electro-Proton Network)', catSlug: 'smart-hardware-iot', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_epn.png', desc: 'Advanced electronic circuit designs and hardware prototyping solutions.' },
    { name: 'MyLyfCare Private Limited', catSlug: 'health-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_mylyfcare.png', desc: 'Digital healthcare aggregator connecting patients to localized diagnostic centers and pharmacies.' },
    { name: 'Door to Destination Private Limited', catSlug: 'enterprise-software', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_doortodestination.png', desc: 'Tech-enabled hyper-local logistics and smart dispatch routing solutions.' },
    { name: 'Green Stag Technologies', catSlug: 'agrotech-biomass', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_greenstag.png', desc: 'Sustainable biomass processing and green agricultural hardware solutions.' },
    { name: 'Barren to Berland Abrosaa', catSlug: 'agri-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_abrosaa.png', desc: 'Soil rejuvenation technology converting infertile agricultural plots into high-yield croplands.' },
    { name: 'Cyberkida Digiera', catSlug: 'ed-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_cyberkida.png', desc: 'Cybersecurity awareness training tools and interactive ethical hacking e-learning platforms.' },
    { name: 'SSB Engineering', catSlug: 'advanced-manufacturing', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_ssb.png', desc: 'Heavy industrial machining, custom steel fabrication, and mechanical engineering assemblies.' },
    { name: 'VN Organics', catSlug: 'agri-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_vnorganics.png', desc: 'Chemical-free bio-fertilizers and organic plant nutrient supplements for sustainable farming.' },
    { name: 'TripoSaints Private Limited', catSlug: 'enterprise-software', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_triposaints.png', desc: 'AI-driven personalized travel itinerary planner and smart tourism booking portal.' },
    { name: 'TrulyFresh Hydroponics', catSlug: 'agri-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_trulyfresh.png', desc: 'Controlled-environment urban hydroponic farming systems producing pesticide-free greens.' },
    { name: 'NextOrbit Innovations', catSlug: 'deep-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_nextorbit.png', desc: 'Satellite telemetry systems and aerospace payload telemetry processing components.' },
    { name: 'Upright Care India Private Limited', catSlug: 'health-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_unnatjivan.png', desc: 'Elderly care assistive technology devices and smart health monitoring systems.' },
    { name: 'BigBlare Innovations', catSlug: 'smart-hardware-iot', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_bigblare.png', desc: 'Acoustic sensing electronics and industrial noise pollution tracking devices.' },
    { name: 'Autoremov', catSlug: 'smart-hardware-iot', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_autoremov.png', desc: 'Automotive automated debris removal hardware for commercial solar panels.' },
    { name: 'Home Services Tech', catSlug: 'enterprise-software', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_homeservices.png', desc: 'On-demand home maintenance technician dispatch and service scheduling platform.' },
    { name: 'E4A Solution', catSlug: 'clean-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_e4asolution.png', desc: 'Energy efficiency auditing software and industrial power optimization systems.' },
    { name: 'Intelligentia Labs', catSlug: 'deep-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_intelligentia.png', desc: 'Edge AI computing modules for autonomous robotics and computer vision.' },
    { name: 'UPROI Digital', catSlug: 'enterprise-software', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_uproi.png', desc: 'Performance marketing analytics and digital ROI optimization suite.' },
    { name: 'Kineer Services', catSlug: 'clean-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_kineer.png', desc: 'Clean drinking water purification units and inclusive employment initiatives.' },
    { name: 'Evergreat Clean Energy', catSlug: 'clean-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_evergreat.png', desc: 'Solar micro-grid storage solutions for rural commercial electrification.' },
    { name: 'HexPRS LLP', catSlug: 'advanced-manufacturing', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_hexagontetch.png', desc: 'Precision plastic injection molding and rapid prototype enclosure manufacturing.' },
    { name: 'Orbitron Labs LLP', catSlug: 'deep-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_redspiral.png', desc: 'Embedded firmware design and custom micro-controller PCB engineering.' },
    { name: 'Nutri Town Superfoods', catSlug: 'health-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_nutritown.png', desc: 'Nutraceutical superfood formulations and fortified organic snack products.' },
    { name: 'Laarsa Organic', catSlug: 'agri-tech', logo: 'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_laarsa.png', desc: 'Organic wellness products derived from cold-pressed medicinal herbal extracts.' }
];

sqlStatements.push(`\n-- 6. STARTUPS`);
startupsList.forEach((s, idx) => {
    const sSlug = slugify(s.name);
    sqlStatements.push(`INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = '${s.catSlug}' LIMIT 1),
    '${sSlug}',
    '${s.name.replace(/'/g, "''")}',
    '${s.logo}',
    '${s.desc.replace(/'/g, "''")}',
    'incubated',
    true,
    ${idx + 1}
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;`);
});

// 6. FACILITIES & EQUIPMENT
log('facilities', 'Migrating physical incubation facilities and equipment...');
const facilitiesList = [
    { slug: 'electronics-labs', title: 'Electronics & PCB Design Lab', summary: 'Equipped with digital storage oscilloscopes, function generators, soldering stations, and hardware diagnostic units.', order: 1 },
    { slug: 'high-end-computers', title: 'High-End Compute Center', summary: '128GB RAM workstation nodes with Nvidia RTX GPUs for AI training, rendering, and CAD modeling.', order: 2 },
    { slug: '3d-printing', title: '3D Printing & Additive Unit', summary: 'Industrial FDM and SLA resin 3D printers supporting 48+ materials and rapid plastic enclosure prototyping.', order: 3 },
    { slug: 'fabrication-lab', title: 'Fabrication & Prototyping Workshop', summary: 'Heavy-duty CNC routers, laser cutters, sheet metal benders, and mechanical assembly tables.', order: 4 },
    { slug: 'meeting-rooms', title: 'Fully Equipped Meeting Rooms', summary: 'Professional conference rooms with presentation support for reviews, mentoring, and investor pitches.', order: 5 },
    { slug: 'co-working-space', title: 'Plug & Play Co-Working Space', summary: 'Safe 24/7 access seating with high-speed internet, ergonomic desks, and power backup.', order: 6 },
    { slug: 'boardroom', title: 'Executive Boardroom', summary: 'Formal boardroom for MoU signings, board reviews, and institutional announcements.', order: 7 }
];

sqlStatements.push(`\n-- 7. FACILITIES`);
facilitiesList.forEach(fac => {
    sqlStatements.push(`INSERT INTO public.facilities (slug, title, summary, display_order)
VALUES ('${fac.slug}', '${fac.title.replace(/'/g, "''")}', '${fac.summary.replace(/'/g, "''")}', ${fac.order})
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;`);
});

log('facility_equipment', 'Migrating 23 facility hardware equipment items...');
const equipmentList = [
    { facSlug: 'electronics-labs', name: 'DC regulated power supply', qty: 2, specs: 'D.C. Power Supply SMPS 0-30V 0-10A CV/CC with LED Meters' },
    { facSlug: 'electronics-labs', name: 'Digital storage oscilloscope', qty: 1, specs: '100Mhz 4 Channel Digital Storage Oscilloscope' },
    { facSlug: 'electronics-labs', name: 'Function Waveform Generator', qty: 1, specs: 'Arbitrary Waveform Generator 25Mhz Dual Channel' },
    { facSlug: 'electronics-labs', name: 'SMD rework Station', qty: 2, specs: 'Hot Air Gun 700W 100-450C and Soldering Station 40W' },
    { facSlug: 'electronics-labs', name: 'Digital Multi-meter Benchtop', qty: 2, specs: 'Digital Multimeter 4.5 Digits True RMS Benchtop' },
    { facSlug: 'electronics-labs', name: 'Drilling machine benchtop', qty: 1, specs: 'Power 350W 220V Spindle Stroke 50mm' },
    { facSlug: 'electronics-labs', name: 'LCR meter with Q measurement', qty: 1, specs: 'LCR Meter Benchtop LC-R-D-Q Auto Detection 10Hz-10Khz' },
    { facSlug: 'high-end-computers', name: 'High End Computer Workstation', qty: 1, specs: 'Intel i9 12900K, Nvidia RTX3090, 128GB RAM, 1TB SSD, 4TB HDD' },
    { facSlug: 'high-end-computers', name: 'CAD & PCB Simulation Workstations', qty: 2, specs: 'Optimized for high-performance 3D CAD modeling & PCB drafting' },
    { facSlug: 'high-end-computers', name: 'Lenovo Desktop Workstations', qty: 10, specs: 'Lenovo M70T Gen 3 i7-12700 16GB RAM 512GB SSD' },
    { facSlug: 'high-end-computers', name: 'Intel AI Server Grade System', qty: 1, specs: 'Intel Xeon Silver 4410Y & Gold 6430 32 Cores 64 Threads TruDDR5' },
    { facSlug: '3d-printing', name: 'Formlabs Form 3+ 3D Printer (Industrial Grade)', qty: 1, specs: 'SLA Technology Build Volume 14.5 x 14.5 x 18.5 cm' },
    { facSlug: '3d-printing', name: 'Pratham 3D Printer', qty: 1, specs: 'FDM Technology Build Volume 200 x 200 x 250 mm Layer 80 Microns' },
    { facSlug: '3d-printing', name: '2 Pixel 3D Printers (PLA Based)', qty: 2, specs: 'FDM Technology Build Volume 230 x 230 x 260 mm Precision +-0.1mm' },
    { facSlug: 'fabrication-lab', name: 'Co2 Laser Cutting & Engraving Machine', qty: 1, specs: 'Model MT6040 Working Area 600x400mm Laser Tube 90W' },
    { facSlug: 'fabrication-lab', name: 'Vinyl Cutter and Plotter', qty: 1, specs: 'Sticker & Vinyl Cutter up to 300 GSM Max Cutting Width 610mm' },
    { facSlug: 'fabrication-lab', name: 'CNC Plasma Cutting Machine', qty: 1, specs: 'Fully Automatic 10KW 415V 3 Phase Cutting Thickness 20mm' },
    { facSlug: 'fabrication-lab', name: 'Deep Freezer Testing Chamber', qty: 1, specs: 'Low Temperature Chamber -20C Capacity 100L' },
    { facSlug: 'fabrication-lab', name: 'Vacuum Oven Curing Chamber', qty: 1, specs: 'Vacuum Curing Oven Temperature Range 50-200C' },
    { facSlug: 'fabrication-lab', name: 'Advance MIG/TIG Welding Setup', qty: 1, specs: 'Professional Welding Workstation for Metal Fabrication' },
    { facSlug: 'fabrication-lab', name: 'Dewalt Chop Saw Machine', qty: 1, specs: 'High Speed Mitre Saw for Metal Pipes and Rod Cross-cutting' }
];

sqlStatements.push(`\n-- 8. FACILITY EQUIPMENT`);
equipmentList.forEach((eq, idx) => {
    sqlStatements.push(`INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = '${eq.facSlug}' LIMIT 1),
    '${eq.name.replace(/'/g, "''")}',
    ${eq.qty},
    '${eq.specs.replace(/'/g, "''")}',
    ${idx + 1}
);`);
});

// 7. MSME HACKATHONS & ACTIVITIES
log('msme_hackathons', 'Migrating MSME Hackathon chapter archives...');
const hackathons = [
    { name: 'MSME Idea Hackathon 1.0', year: '2021-22', grant: 1050000.00, approved: 1, budget: 1050000.00, status: 'completed' },
    { name: 'MSME Idea Hackathon 2.0', year: '2022-23', grant: 1000000.00, approved: 1, budget: 1000000.00, status: 'completed' },
    { name: 'MSME Idea Hackathon 3.0', year: '2023-24', grant: 1500000.00, approved: 3, budget: 4120000.00, status: 'completed' },
    { name: 'MSME Idea Hackathon 4.0', year: '2024-25', grant: 1500000.00, approved: 0, budget: 1500000.00, status: 'upcoming' }
];

sqlStatements.push(`\n-- 9. MSME HACKATHONS`);
hackathons.forEach((h, idx) => {
    sqlStatements.push(`INSERT INTO public.msme_hackathons (chapter_name, year_label, grant_per_idea, ideas_approved, total_sanctioned_budget, status, display_order)
VALUES ('${h.name}', '${h.year}', ${h.grant}, ${h.approved}, ${h.budget}, '${h.status}', ${idx + 1});`);
});

// 8. ANNOUNCEMENTS, POLICIES, FAQS, TESTIMONIALS
log('announcements', 'Migrating announcements...');
sqlStatements.push(`\n-- 10. ANNOUNCEMENTS`);
const updates = [
    { tag: 'Competition', text: 'Applications are open for the Annual Logo Design Competition.' },
    { tag: 'MSME Hackathon', text: 'Join MSME Hackathons to solve real-world challenges.' },
    { tag: 'Incubation', text: 'Discover funding opportunities through Startin-Up and NewGen-IEDC.' },
    { tag: 'Labs & Infra', text: 'Access our Fabrication Lab and High-End Compute resources.' }
];
updates.forEach(u => {
    sqlStatements.push(`INSERT INTO public.announcements (tag, title, content, is_featured, status) VALUES ('${u.tag}', '${u.tag} Announcement', '${u.text.replace(/'/g, "''")}', true, 'published');`);
});

log('policies', 'Migrating policies...');
sqlStatements.push(`\n-- 11. POLICIES`);
const policyDocs = [
    { slug: 'patent-support-policy', title: 'Patent Support Policy', category: 'IPR', summary: 'Guidelines for patent applications and reimbursement.', url: 'https://navrachnafoundation.com/wp-content/uploads/2025/03/PatentSupportPolicy.pdf' },
    { slug: 'project-selection-policy', title: 'Project Selection And Procurement Policy', category: 'Procurement', summary: 'Protocols for project selection and hardware procurement.', url: 'https://navrachnafoundation.com/wp-content/uploads/2025/03/ProjectSelectoionAndProcurementPolicy.pdf' },
    { slug: 'purchase-policy-sop', title: 'Purchase Policy And SOP', category: 'SOP', summary: 'SOP regarding budgeting and quote validations.', url: 'https://navrachnafoundation.com/wp-content/uploads/2025/03/PurchasePolicyAndSOP.pdf' }
];
policyDocs.forEach(p => {
    sqlStatements.push(`INSERT INTO public.policies (slug, title, category, summary, file_url) VALUES ('${p.slug}', '${p.title}', '${p.category}', '${p.summary.replace(/'/g, "''")}', '${p.url}') ON CONFLICT (slug) DO NOTHING;`);
});

log('faqs', 'Migrating FAQs...');
sqlStatements.push(`\n-- 12. FAQS`);
const faqs = [
    { question: 'Who can apply to Navrachna Foundation?', answer: 'Students, faculty, researchers, and early-stage founders.' },
    { question: 'What support do founders receive?', answer: 'Mentorship, workspace access, lab support, networking, and grant guidance.' },
    { question: 'Do you offer funding directly?', answer: 'We prepare founders for grants and investor conversations.' },
    { question: 'Can startups use facilities outside office hours?', answer: 'Yes, approved teams receive extended access.' }
];
faqs.forEach((f, idx) => {
    sqlStatements.push(`INSERT INTO public.faqs (page_context, question, answer, display_order) VALUES ('general', '${f.question.replace(/'/g, "''")}', '${f.answer.replace(/'/g, "''")}', ${idx + 1});`);
});

log('testimonials', 'Migrating testimonials...');
sqlStatements.push(`\n-- 13. TESTIMONIALS`);
const testimonials = [
    { founder: 'Aarav Jain', startup: 'UPROI Digital', quote: 'Mentoring and workspace support helped us go from prototype to client-ready product.', metric: '6 weeks to first pilot' },
    { founder: 'Sana Khan', startup: 'Verdant', quote: 'The structure here is the difference. We got a place to build and a process to follow.', metric: '3 mentor rounds per month' },
    { founder: 'Kunal Verma', startup: 'Digiera Private Limited', quote: 'We could focus on product and customer conversations instead of infrastructure.', metric: '24/7 access to build' }
];
testimonials.forEach((t, idx) => {
    sqlStatements.push(`INSERT INTO public.testimonials (founder_name, startup_name, quote, metric_highlight, display_order) VALUES ('${t.founder}', '${t.startup}', '${t.quote.replace(/'/g, "''")}', '${t.metric}', ${idx + 1});`);
});

sqlStatements.push(`\nCOMMIT;\n`);

fs.writeFileSync(seedFilePath, sqlStatements.join('\n'), 'utf-8');
log('FILE_WRITE', `Successfully generated complete SQL seed migration file with ${newgenProjects.length} projects & 28 startups at ${seedFilePath}`);

console.log('✅ Navrachna Data Migration Script completed successfully!');
