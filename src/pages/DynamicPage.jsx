import React from 'react'
import { useParams } from 'react-router-dom'
import { useCmsPage } from '../hooks/useCmsPage'
import { BlockRenderer } from '../components/BlockRenderer'
import { HeaderV1 } from '../components/HeaderV1'
import { FooterV1 } from '../components/FooterV1'

/**
 * DynamicPage
 * Renders any published CMS page by slug from the URL.
 * Route: /page/:slug
 */
export default function DynamicPage() {
  const { slug } = useParams()
  const { page, loading, error } = useCmsPage(slug)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#013759] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading page…</p>
        </div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center px-4">
          <h1 className="text-4xl font-extrabold text-[#013759] mb-3">404</h1>
          <p className="text-lg text-slate-500 mb-6">
            {error ? 'Something went wrong loading this page.' : 'This page doesn\'t exist yet.'}
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2.5 rounded-full text-white font-semibold bg-[#013759] hover:bg-[#074887] transition-colors"
          >
            ← Go Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <HeaderV1 />
      <main>
        {(page.blocks || []).map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </main>
      <FooterV1 />
    </>
  )
}
