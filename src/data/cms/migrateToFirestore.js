import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'

import landingData from './landing.json'
import aboutData from './about.json'
import teamData from './team.json'
import servicesData from './services.json'
import headerData from './header.json'
import footerData from './footer.json'

export async function migrateAllData() {
  const documents = {
    landing: landingData,
    about: aboutData,
    team: teamData,
    services: servicesData,
    header: headerData,
    footer: footerData
  }

  const results = []
  for (const [key, value] of Object.entries(documents)) {
    try {
      const docRef = doc(db, 'cms_content', key)
      await setDoc(docRef, value)
      results.push({ key, success: true })
    } catch (error) {
      console.error(`Migration failed for ${key}:`, error)
      results.push({ key, success: false, error: error.message })
    }
  }
  return results
}
