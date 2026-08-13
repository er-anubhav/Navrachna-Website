import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('Testing Supabase Client connection...');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseKey ? supabaseKey.length : 0);

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase env vars!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        console.log('Querying site_settings table...');
        const { data, error } = await supabase.from('site_settings').select('*');
        if (error) {
            console.log('Supabase Query Response (Error/Not initialized yet):', error.message);
        } else {
            console.log('Supabase Query Success! Data:', data);
        }
    } catch (err) {
        console.error('Unexpected error:', err.message);
    }
}

testConnection();
