import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Contact ──
export const submitContact = (data) => api.post('/api/contact', data)

// ── Newsletter ──
export const subscribeNewsletter = (email) => api.post('/api/newsletter', { email })

// ── Announcements ──
export const fetchAnnouncements = () => api.get('/api/announcements').then(r => r.data)

// ── Stats ──
export const fetchStats = () => api.get('/api/stats').then(r => r.data)
