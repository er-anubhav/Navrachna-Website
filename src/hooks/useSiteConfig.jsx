import React, { createContext, useContext, useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import defaultConfig from '../data/cms/site_config.json'

const SiteConfigContext = createContext(defaultConfig)

const CACHE_KEY = 'cms_site_config'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return data
  } catch { return null }
}

/**
 * SiteConfigProvider
 * Wraps the app and provides the global theme config from Firestore.
 * Falls back to the local site_config.json instantly (0ms).
 */
export function SiteConfigProvider({ children }) {
  const [config, setConfig] = useState(loadCache() || defaultConfig)

  useEffect(() => {
    let cancelled = false
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, 'site_config', 'global'))
        if (cancelled) return
        if (snap.exists()) {
          const data = snap.data()
          setConfig(data)
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
        }
      } catch (err) {
        console.warn('[useSiteConfig] Could not fetch from Firestore, using defaults.', err)
      }
    }
    fetch()
    return () => { cancelled = true }
  }, [])

  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  )
}

/**
 * useSiteConfig
 * Returns the current global site theme config.
 * Usage: const { colors, fonts } = useSiteConfig()
 */
export function useSiteConfig() {
  return useContext(SiteConfigContext)
}
