import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_PUBLISHABLE_KEY);

const tables = [
    'site_settings', 'people', 'startup_categories', 'programs', 'cohorts',
    'newgen_projects', 'project_people', 'startups', 'startup_founders',
    'facilities', 'facility_equipment', 'announcements', 'msme_activities',
    'msme_hackathons', 'policies', 'faqs', 'testimonials'
];

async function verifyCounts() {
    console.log('📊 LIVE SUPABASE DATABASE RECORD COUNTS:');
    console.log('--------------------------------------------------');
    for (const table of tables) {
        const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
        if (error) {
            console.log(`❌ ${table.padEnd(20)}: Error (${error.message})`);
        } else {
            console.log(`✅ ${table.padEnd(20)}: ${count} records`);
        }
    }
}

verifyCounts();
