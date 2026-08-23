import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'

const DEFAULT_SUPABASE_URL = 'https://obnqhrmfbctslwoylsjq.supabase.co'
const DEFAULT_SUPABASE_KEY = 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

export function createClient(request) {
  const headers = new Headers()

  const supabase = createServerClient(
    process.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append('Set-Cookie', serializeCookieHeader(name, value, options)))
        },
      },
    }
  )

  return { supabase, headers }
}
