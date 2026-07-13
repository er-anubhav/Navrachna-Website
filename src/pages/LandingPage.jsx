import React from 'react'
import { useCmsPage } from '../hooks/useCmsPage'
import { BlockRenderer } from '../components/BlockRenderer'

/**
 * LandingPage
 * Public home page route (/).
 * Fetches page 'home' from Firestore and renders its blocks dynamically via BlockRenderer.
 */
export function LandingPage() {
  const { page, loading, error } = useCmsPage('home')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b15]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400">Loading Navrachna Portal…</p>
        </div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-[#013759] mb-2">No Live Content</h1>
          <p className="text-sm text-slate-500 mb-6">Please log in to the admin panel and seed the home page blocks.</p>
          <a
            href="/admin"
            className="inline-block px-6 py-2.5 bg-[#013759] hover:bg-[#074887] text-white rounded-xl text-sm font-semibold transition-colors shadow-md"
          >
            Open Admin Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      {(page.blocks || []).map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  )
}
