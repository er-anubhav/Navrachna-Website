import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const CACHE_PREFIX = 'cms_page_'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

/**
 * useCmsPage
 * Fetches a CMS page document from Firestore by slug.
 * Uses localStorage caching for instant startup (0ms flash).
 *
 * Returns: { page, loading, error }
 *   page: { title, slug, status, blocks: Block[], publishedAt }
 */
export function useCmsPage(slug) {
  const cacheKey = CACHE_PREFIX + slug
  const cached   = (() => {
    try {
      const raw = localStorage.getItem(cacheKey)
      if (!raw) return null
      const { data, ts } = JSON.parse(raw)
      if (Date.now() - ts > CACHE_TTL_MS) return null
      return data
    } catch { return null }
  })()

  const [page,    setPage]    = useState(cached)
  const [loading, setLoading] = useState(!cached)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false

    const fetch = async () => {
      try {
        const ref  = doc(db, 'pages', slug)
        const snap = await getDoc(ref)
        if (cancelled) return
        if (snap.exists()) {
          const data = { id: snap.id, ...snap.data() }
          setPage(data)
          localStorage.setItem(cacheKey, JSON.stringify({ data, ts: Date.now() }))
        } else {
          setPage(null)
        }
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [slug])

  return { page, loading, error }
}
