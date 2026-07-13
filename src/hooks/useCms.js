import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useCms(documentId) {
  const cacheKey = `cms_cache_${documentId}`

  // Synchronously load from localStorage cache for instant 0ms startup
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(cacheKey)
      return cached ? JSON.parse(cached) : null
    } catch (e) {
      console.warn(`Failed to parse cached CMS content for ${documentId}`, e)
      return null
    }
  })

  // Only show a loading spinner on first-ever load (when cache is empty)
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        const docRef = doc(db, 'cms_content', documentId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const freshData = docSnap.data()
          
          if (isMounted) {
            setData(freshData)
            setError(null)
          }
          // Update cache for next instant page loads
          localStorage.setItem(cacheKey, JSON.stringify(freshData))
        } else {
          console.warn(`No CMS document found in Firestore for: ${documentId}`)
        }
      } catch (err) {
        console.error(`Error fetching CMS document: ${documentId}`, err)
        if (isMounted) {
          setError(err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [documentId, cacheKey])

  const updateData = async (newData) => {
    try {
      const docRef = doc(db, 'cms_content', documentId)
      await setDoc(docRef, newData)
      
      setData(newData)
      localStorage.setItem(cacheKey, JSON.stringify(newData))
      return { success: true }
    } catch (err) {
      console.error(`Error updating CMS document: ${documentId}`, err)
      return { success: false, error: err }
    }
  }

  return { data, loading, error, updateData }
}
