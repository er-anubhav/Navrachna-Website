import React, { useState, useEffect, useRef, useCallback } from 'react'
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { BlockRenderer, BLOCK_REGISTRY } from '../../components/BlockRenderer'
import { PREVIEW_WIDTHS } from '../../styles/breakpoints'
import { v4 as uuidv4 } from 'uuid'

// ─── BLOCK DEFAULT CONTENT ────────────────────────────────────────
const BLOCK_DEFAULTS = {
  AnnouncementBanner: { items: ['📢 Welcome to Navrachna!'] },
  PageHero:           { title: 'Page Title', subtitle: 'A compelling subtitle for this section.', eyebrow: 'NFED', ctaLabel: 'Learn More', ctaHref: '#', bgImage: '' },
  TextBlock:          { heading: 'Section Heading', body: 'Write your content here.', align: 'left' },
  StatsRow:           { heading: '', stats: [{ value: '100+', label: 'Metric' }] },
  CardGrid:           { heading: 'Our Services', subheading: '', cards: [{ icon: '⭐', title: 'Card Title', body: 'Card description.' }] },
  FAQAccordion:       { heading: 'FAQ', faqs: [{ q: 'Question?', a: 'Answer.' }] },
  CallToAction:       { heading: 'Ready to Begin?', body: 'Join us today.', btnLabel: 'Get Started', btnHref: '#' },
  LogoScroller:       { heading: 'Our Partners', logos: [] },
  ProgramCards:       { heading: 'Programs', description: '', ctaLabel: 'View All', ctaHref: '#', programs: [] },
  ImageCarousel:      { heading: 'Our Spaces', spaces: [] },
  FacilityTabs:       { heading: 'Facilities', facilities: [] },
}

// ─── HELPERS ──────────────────────────────────────────────────────
function makeBlock(type) {
  return {
    id:         uuidv4(),
    type,
    content:    BLOCK_DEFAULTS[type] || {},
    style:      {},
    layout:     { columns: { mobile: 1, tablet: 2, desktop: 3 } },
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  }
}

const FIRESTORE_PAGES    = 'pages'
const FIRESTORE_DRAFTS   = 'pages_drafts'

// ─── PROPERTY PANEL ───────────────────────────────────────────────
function PropertyPanel({ block, onChange, onClose }) {
  if (!block) return null

  const update = (path, value) => {
    const parts = path.split('.')
    const updated = JSON.parse(JSON.stringify(block))
    let ref = updated
    for (let i = 0; i < parts.length - 1; i++) ref = ref[parts[i]]
    ref[parts[parts.length - 1]] = value
    onChange(updated)
  }

  const content = block.content || {}
  const style   = block.style   || {}
  const layout  = block.layout  || {}
  const vis     = block.visibility || {}

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-[#0f172a] border-l border-slate-800 z-50 flex flex-col shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Editing Block</p>
          <p className="text-sm font-bold text-white">{block.type}</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors text-lg leading-none">✕</button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
        {/* Content fields */}
        <section>
          <p className="text-[10px] uppercase tracking-widest text-sky-400 font-bold mb-3">Content</p>
          <div className="flex flex-col gap-3">
            {Object.entries(content).map(([key, val]) => {
              if (Array.isArray(val)) return null // skip arrays for now
              if (typeof val === 'string') return (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase">{key}</label>
                  {val.length > 60 ? (
                    <textarea
                      value={val}
                      onChange={e => update(`content.${key}`, e.target.value)}
                      rows={3}
                      className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={val}
                      onChange={e => update(`content.${key}`, e.target.value)}
                      className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  )}
                </div>
              )
              return null
            })}
          </div>
        </section>

        {/* Style controls */}
        <section>
          <p className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-3">Style</p>
          <div className="flex flex-col gap-3">
            {['bg', 'textColor', 'headingColor', 'accentColor'].map(key => (
              <div key={key} className="flex items-center justify-between gap-3">
                <label className="text-[10px] text-slate-400 uppercase flex-1">{key}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style[key] || '#ffffff'}
                    onChange={e => update(`style.${key}`, e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={style[key] || ''}
                    onChange={e => update(`style.${key}`, e.target.value)}
                    placeholder={`e.g. #013759`}
                    className="bg-slate-800/60 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500 w-24"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grid columns */}
        {['CardGrid', 'StatsRow'].includes(block.type) && (
          <section>
            <p className="text-[10px] uppercase tracking-widest text-green-400 font-bold mb-3">Grid Columns</p>
            <div className="flex gap-3">
              {['mobile', 'tablet', 'desktop'].map(tier => (
                <div key={tier} className="flex flex-col gap-1 flex-1">
                  <label className="text-[10px] text-slate-400 uppercase">{tier}</label>
                  <input
                    type="number"
                    min={1} max={6}
                    value={layout?.columns?.[tier] || 1}
                    onChange={e => update(`layout.columns.${tier}`, parseInt(e.target.value) || 1)}
                    className="bg-slate-800/60 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500 text-center"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Visibility toggles */}
        <section>
          <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-3">Visibility</p>
          <div className="flex flex-col gap-2">
            {[
              { key: 'hideOnMobile',  label: '📱 Hide on Mobile' },
              { key: 'hideOnTablet',  label: '📟 Hide on Tablet' },
              { key: 'hideOnDesktop', label: '💻 Hide on Desktop' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-slate-300">{label}</span>
                <div
                  onClick={() => update(`visibility.${key}`, !vis[key])}
                  className="relative w-9 h-5 rounded-full transition-colors cursor-pointer"
                  style={{ background: vis[key] ? '#f59e0b' : '#334155' }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                    style={{ transform: vis[key] ? 'translateX(18px)' : 'translateX(2px)' }}
                  />
                </div>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

// ─── ADD BLOCK MODAL ──────────────────────────────────────────────
function AddBlockModal({ onAdd, onClose }) {
  const blockTypes = Object.keys(BLOCK_REGISTRY)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-white">Add a Block</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">✕</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {blockTypes.map(type => (
            <button
              key={type}
              onClick={() => { onAdd(type); onClose() }}
              className="flex flex-col gap-1 p-4 rounded-xl border border-slate-700 hover:border-sky-500 hover:bg-sky-500/10 transition-all text-left group"
            >
              <span className="text-lg">{
                { AnnouncementBanner: '📢', PageHero: '🖼️', TextBlock: '📝', StatsRow: '📊',
                  CardGrid: '🃏', FAQAccordion: '❓', CallToAction: '🚀', LogoScroller: '🏷️',
                  ProgramCards: '📋', ImageCarousel: '🎠', FacilityTabs: '🏛️' }[type] || '🧩'
              }</span>
              <span className="text-xs font-semibold text-white">{type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── BLOCK TOOLBAR ────────────────────────────────────────────────
function BlockToolbar({ block, index, total, onMoveUp, onMoveDown, onDelete, onEdit, dragHandleProps }) {
  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-[#0f172a] border border-slate-700 rounded-full px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none group-hover:pointer-events-auto">
      <span
        {...dragHandleProps}
        title="Drag to reorder"
        className="px-1 text-slate-400 hover:text-white cursor-grab active:cursor-grabbing text-sm select-none"
      >⠿</span>
      <span className="text-[10px] text-slate-500 font-bold px-1 border-x border-slate-700">{block.type}</span>
      <button onClick={onMoveUp}   disabled={index === 0}         title="Move up"   className="px-1.5 text-slate-400 hover:text-white disabled:opacity-30 text-sm">↑</button>
      <button onClick={onMoveDown} disabled={index === total - 1} title="Move down" className="px-1.5 text-slate-400 hover:text-white disabled:opacity-30 text-sm">↓</button>
      <button onClick={onEdit}   title="Edit block"   className="px-1.5 text-sky-400 hover:text-sky-200 text-sm">✎</button>
      <button onClick={onDelete} title="Delete block" className="px-1.5 text-red-400 hover:text-red-200 text-sm">🗑</button>
    </div>
  )
}

// ─── MAIN PAGE MANAGER ────────────────────────────────────────────
export function PageManager() {
  const [pages,         setPages]         = useState([])
  const [slug,          setSlug]          = useState('')
  const [blocks,        setBlocks]        = useState([])
  const [selectedId,    setSelectedId]    = useState(null)
  const [previewSize,   setPreviewSize]   = useState('desktop')
  const [showAddModal,  setShowAddModal]  = useState(false)
  const [saving,        setSaving]        = useState(false)
  const [publishing,    setPublishing]    = useState(false)
  const [statusMsg,     setStatusMsg]     = useState(null)
  const [isDirty,       setIsDirty]       = useState(false)
  const [newPageSlug,   setNewPageSlug]   = useState('')
  const [showNewPage,   setShowNewPage]   = useState(false)

  // Drag state
  const dragIndex  = useRef(null)
  const overIndex  = useRef(null)

  const selectedBlock = blocks.find(b => b.id === selectedId) || null

  // ── Load page list ─────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, FIRESTORE_PAGES))
      const list = snap.docs.map(d => d.id)
      setPages(list)
    }
    load()
  }, [])

  // ── Load draft for selected slug ───────────────────────────────
  useEffect(() => {
    if (!slug) return
    const load = async () => {
      const draftSnap = await getDoc(doc(db, FIRESTORE_DRAFTS, slug))
      if (draftSnap.exists()) {
        setBlocks(draftSnap.data().blocks || [])
      } else {
        const pubSnap = await getDoc(doc(db, FIRESTORE_PAGES, slug))
        setBlocks(pubSnap.exists() ? (pubSnap.data().blocks || []) : [])
      }
      setSelectedId(null)
      setIsDirty(false)
    }
    load()
  }, [slug])

  // ── Helpers ────────────────────────────────────────────────────
  const flash = (msg, type = 'success') => {
    setStatusMsg({ msg, type })
    setTimeout(() => setStatusMsg(null), 3000)
  }

  const mutateBlocks = useCallback((fn) => {
    setBlocks(prev => { const next = fn([...prev]); setIsDirty(true); return next })
  }, [])

  // ── Block operations ───────────────────────────────────────────
  const addBlock = (type) => {
    mutateBlocks(prev => [...prev, makeBlock(type)])
  }

  const deleteBlock = (id) => {
    mutateBlocks(prev => prev.filter(b => b.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const moveBlock = (from, to) => {
    if (to < 0 || to >= blocks.length) return
    mutateBlocks(prev => {
      const arr = [...prev]
      const [item] = arr.splice(from, 1)
      arr.splice(to, 0, item)
      return arr
    })
  }

  const updateBlock = (updated) => {
    mutateBlocks(prev => prev.map(b => b.id === updated.id ? updated : b))
  }

  // ── Drag and drop (Pointer Events) ────────────────────────────
  const onDragStart = (i) => { dragIndex.current = i }
  const onDragOver  = (i) => { overIndex.current = i }
  const onDragEnd   = () => {
    if (dragIndex.current !== null && overIndex.current !== null && dragIndex.current !== overIndex.current) {
      moveBlock(dragIndex.current, overIndex.current)
    }
    dragIndex.current = null
    overIndex.current = null
  }

  // ── Save draft ─────────────────────────────────────────────────
  const saveDraft = async () => {
    if (!slug) return
    setSaving(true)
    try {
      await setDoc(doc(db, FIRESTORE_DRAFTS, slug), { slug, blocks, updatedAt: new Date().toISOString() })
      setIsDirty(false)
      flash('Draft saved ✓')
    } catch (e) {
      flash('Save failed: ' + e.message, 'error')
    }
    setSaving(false)
  }

  // ── Publish ────────────────────────────────────────────────────
  const publish = async () => {
    if (!slug) return
    setPublishing(true)
    try {
      const payload = { slug, blocks, status: 'published', publishedAt: new Date().toISOString() }
      await setDoc(doc(db, FIRESTORE_PAGES, slug), payload)
      await setDoc(doc(db, FIRESTORE_DRAFTS, slug), payload)
      setIsDirty(false)
      setPages(prev => prev.includes(slug) ? prev : [...prev, slug])
      flash('Published ✓')
    } catch (e) {
      flash('Publish failed: ' + e.message, 'error')
    }
    setPublishing(false)
  }

  // ── Discard ────────────────────────────────────────────────────
  const discard = async () => {
    if (!slug || !window.confirm('Discard all unsaved changes?')) return
    const pubSnap = await getDoc(doc(db, FIRESTORE_PAGES, slug))
    setBlocks(pubSnap.exists() ? (pubSnap.data().blocks || []) : [])
    setIsDirty(false)
    flash('Changes discarded')
  }

  // ── New page ───────────────────────────────────────────────────
  const createPage = async () => {
    const s = newPageSlug.trim().toLowerCase().replace(/\s+/g, '-')
    if (!s) return
    await setDoc(doc(db, FIRESTORE_PAGES, s), { slug: s, blocks: [], status: 'draft' })
    setPages(prev => [...prev, s])
    setSlug(s)
    setShowNewPage(false)
    setNewPageSlug('')
  }

  const previewWidth = PREVIEW_WIDTHS[previewSize] || '100%'

  return (
    <div className="flex flex-col h-full">
      {/* ── Top Action Bar ─────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-slate-800 flex-wrap">
        {/* Page selector */}
        <div className="flex items-center gap-3">
          <select
            value={slug}
            onChange={e => setSlug(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
          >
            <option value="">— Select a page —</option>
            {pages.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            onClick={() => setShowNewPage(v => !v)}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-sky-400 border border-sky-500/40 hover:bg-sky-500/10 transition-colors"
          >
            + New Page
          </button>
          {showNewPage && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newPageSlug}
                onChange={e => setNewPageSlug(e.target.value)}
                placeholder="page-slug"
                onKeyDown={e => e.key === 'Enter' && createPage()}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 w-36"
                autoFocus
              />
              <button onClick={createPage} className="text-xs text-green-400 hover:text-green-200">Create</button>
              <button onClick={() => setShowNewPage(false)} className="text-xs text-slate-500 hover:text-slate-300">Cancel</button>
            </div>
          )}
        </div>

        {/* Device preview toggle */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1">
          {[['mobile', '📱'], ['tablet', '📟'], ['desktop', '💻']].map(([size, icon]) => (
            <button
              key={size}
              onClick={() => setPreviewSize(size)}
              title={`${size} preview`}
              className="px-3 py-1.5 rounded-lg text-sm transition-colors"
              style={{ background: previewSize === size ? '#0ea5e9' : 'transparent', color: previewSize === size ? '#fff' : '#94a3b8' }}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Save / Publish / Discard */}
        <div className="flex items-center gap-2">
          {isDirty && <span className="text-[10px] text-amber-400 font-semibold">● Unsaved</span>}
          {statusMsg && (
            <span className={`text-[10px] font-semibold ${statusMsg.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
              {statusMsg.msg}
            </span>
          )}
          <button
            onClick={discard}
            disabled={!isDirty || !slug}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500 transition-colors disabled:opacity-30"
          >
            Discard
          </button>
          <button
            onClick={saveDraft}
            disabled={saving || !slug}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save Draft'}
          </button>
          <button
            onClick={publish}
            disabled={publishing || !slug}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors disabled:opacity-40"
          >
            {publishing ? 'Publishing…' : '⚡ Publish'}
          </button>
        </div>
      </div>

      {/* ── Canvas Area ────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto bg-slate-900/50 flex justify-center py-6 px-4"
        onClick={e => { if (e.target === e.currentTarget) setSelectedId(null) }}
      >
        {!slug ? (
          <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
            <span className="text-5xl">📄</span>
            <p className="text-slate-400 text-sm">Select a page above or create a new one to start editing.</p>
          </div>
        ) : (
          <div
            className="bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-300 w-full"
            style={{ maxWidth: previewWidth }}
          >
            {blocks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                <span className="text-4xl">🧩</span>
                <p className="text-sm">No blocks yet. Add your first block below.</p>
              </div>
            )}

            {blocks.map((block, index) => (
              <div
                key={block.id}
                className="relative group"
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={e => { e.preventDefault(); onDragOver(index) }}
                onDragEnd={onDragEnd}
              >
                <BlockToolbar
                  block={block}
                  index={index}
                  total={blocks.length}
                  onMoveUp={()   => moveBlock(index, index - 1)}
                  onMoveDown={()  => moveBlock(index, index + 1)}
                  onDelete={()   => deleteBlock(block.id)}
                  onEdit={()     => setSelectedId(block.id === selectedId ? null : block.id)}
                  dragHandleProps={{ draggable: true }}
                />
                <BlockRenderer
                  block={block}
                  isEditing={true}
                  isSelected={block.id === selectedId}
                  onSelect={id => setSelectedId(id === selectedId ? null : id)}
                  dimHidden={previewSize !== 'desktop'}
                />
              </div>
            ))}

            {/* Add block button */}
            <div className="flex justify-center py-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border-2 border-dashed border-slate-300 text-slate-400 hover:border-sky-400 hover:text-sky-400 transition-colors"
              >
                + Add Block
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Property Panel ─────────────────────────────────── */}
      {selectedBlock && (
        <PropertyPanel
          block={selectedBlock}
          onChange={updateBlock}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* ── Add Block Modal ────────────────────────────────── */}
      {showAddModal && (
        <AddBlockModal
          onAdd={addBlock}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}
