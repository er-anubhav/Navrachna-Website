import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
  console.warn('Supabase environment variables missing from import.meta.env, using default project configuration.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
