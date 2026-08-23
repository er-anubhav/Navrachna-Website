/// <reference types="vite/types/importMeta.d.ts" />
import { createBrowserClient } from '@supabase/ssr'

const DEFAULT_SUPABASE_URL = 'https://obnqhrmfbctslwoylsjq.supabase.co'
const DEFAULT_SUPABASE_KEY = 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

export function createClient() {
  return createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_KEY
  );
}
