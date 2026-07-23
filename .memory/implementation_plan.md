# Block-Based Page CMS — Implementation Plan (with Full Responsiveness)

## What We're Building

A system where every page is stored in Firestore as an **ordered list of typed blocks**. Each block maps to a React component. The Admin Panel lets you visually build, reorder, and edit pages, then publish when ready. Changes only go live when you hit **Publish**. Every block and public-facing page is fully responsive across all 4 device tiers.

---

## Decisions Summary

| Decision | Choice |
|---|---|
| Storage | Database-driven blocks in Firestore |
| Theming | Global presets **+** granular per-block overrides |
| Admin UI | Unified Page Manager (select/create any page) |
| Preview | Inline click-to-edit on the rendered preview |
| Reordering | HTML5 Pointer Events drag-and-drop (touch + mouse) + Up/Down fallback |
| Save model | Draft + Publish (drafts never affect the live site) |
| Migration | Progressive — Landing Page first |
| Responsive strategy | **Mobile-first** using Tailwind `sm:` `md:` `lg:` `xl:` breakpoints |
| Device tier coverage | **4-tier**: Phone 375px+, Tablet 768px+, Desktop 1024px+, Wide 1440px+ |
| Admin canvas preview | Device-size selector toggle (📱 Tablet 💻 Desktop) |
| Grid column control | Per-breakpoint configurable — `{ mobile: 1, tablet: 2, desktop: 3 }` |
| Mobile header | Hamburger → full-screen overlay with accordion dropdowns |
| Admin device support | Desktop-only; warning shown on screens below 1024px |
| Block visibility | Per-device toggles: `hideOnMobile`, `hideOnTablet`, `hideOnDesktop` |
| Touch drag-and-drop | HTML5 Pointer Events API — works on mouse and touchscreen |

---

## Open Questions

> **IMPORTANT:** The Landing Page has ~12 unique sections. Highly custom ones (e.g. the scrollable "Our Spaces" carousel, the Facilities tab switcher) — should these become fully configurable blocks with layout controls, or **content-editable only** locked presentational blocks?

---

## Proposed Architecture

### Firestore Collections

```
/site_config
  └── global                        ← Global theme (colors, fonts)

/pages
  └── {slug}
       ├── title: string
       ├── slug: string
       ├── status: "draft" | "published"
       ├── publishedAt: timestamp
       └── blocks: Block[]

/pages_drafts                       ← Working copy; never affects live site
  └── {slug}
```

### Block Schema (extended with responsiveness)

```json
{
  "id": "uuid",
  "type": "CardGrid",
  "content": {
    "heading": "Why Choose Us",
    "cards": [{ "icon": "mentorship", "title": "...", "body": "..." }]
  },
  "style": {
    "bg": "#f8fafc",
    "textColor": "#013759"
  },
  "layout": {
    "columns": { "mobile": 1, "tablet": 2, "desktop": 3 }
  },
  "visibility": {
    "hideOnMobile": false,
    "hideOnTablet": false,
    "hideOnDesktop": false
  }
}
```

NOTE: `layout.columns` is per-breakpoint and admin-configurable. `visibility` flags map directly to Tailwind's responsive `hidden` / `block` utilities at render time — **zero runtime JS overhead**.

---

## Proposed Changes

### Phase 0 — Responsive Token System

Before building blocks, establish the shared responsive foundation.

#### [NEW] `src/styles/breakpoints.js`

```js
export const BREAKPOINTS = {
  mobile:  375,
  tablet:  768,
  desktop: 1024,
  wide:    1440,
}

export const PREVIEW_WIDTHS = {
  mobile:  '375px',
  tablet:  '768px',
  desktop: '100%',
}
```

#### [MODIFY] `tailwind.config.js`

Tailwind defaults (sm/md/lg/xl/2xl) cover our 4 tiers. No changes needed.

---

### Phase 1 — Block Component Library (Mobile-First)

All block components are built **mobile-first**. Each receives `content`, `style`, `layout`, and `visibility` props.

#### Responsiveness contract for every block:

```jsx
function getVisibilityClass({ hideOnMobile, hideOnTablet, hideOnDesktop }) {
  return [
    hideOnMobile  ? 'hidden sm:block'    : '',
    hideOnTablet  ? 'sm:hidden md:block' : '',
    hideOnDesktop ? 'lg:hidden'          : '',
  ].join(' ')
}
```

#### [NEW] `src/components/blocks/` directory

| File | Block Type | Mobile Behavior | Responsive Change |
|---|---|---|---|
| `PageHero.jsx` | Full-width title + subtitle over bg image | Stacked text, smaller font, min-h-[60vh] | `lg:min-h-screen` |
| `TextBlock.jsx` | Heading + paragraphs | Full width, center or left aligned | `lg:max-w-4xl mx-auto` |
| `StatsRow.jsx` | Stat tiles (icon + value + label) | 2-col grid | `md:grid-cols-4` |
| `CardGrid.jsx` | Icon + title + description cards | `columns.mobile` cols | `md:grid-cols-{tablet}` `lg:grid-cols-{desktop}` |
| `FAQAccordion.jsx` | Expandable Q&A | Full width stacked | `lg:max-w-3xl mx-auto` |
| `AnnouncementBanner.jsx` | Scrolling ticker | Smaller font, single line | Same — auto-scrolls at all sizes |
| `ProgramCards.jsx` | Schemes scrollable cards | Vertical stack, full-width cards | `md:flex-row` + horizontal scroll |
| `ImageCarousel.jsx` | Spaces scroller | Single card visible, swipe gesture | `md:flex` multi-card scroll |
| `FacilityTabs.jsx` | Tab switcher + details | Tabs → horizontal scroll; content stacked | `lg:grid` side-by-side |
| `LogoScroller.jsx` | Client logo ticker | Smaller logos, same auto-scroll | Same behavior |
| `CallToAction.jsx` | CTA strip + button | Stacked title + button | `md:flex-row justify-between` |

---

### Phase 2 — Block Renderer + DynamicPage Route

#### [NEW] `src/components/BlockRenderer.jsx`

```jsx
export function BlockRenderer({ block, isEditing, onSelect, isSelected }) {
  const Component = BLOCK_REGISTRY[block.type]
  if (!Component) return null
  const visibilityClass = getVisibilityClass(block.visibility ?? {})
  return (
    <div
      className={`${visibilityClass} ${isSelected ? 'ring-2 ring-sky-400 ring-offset-2 rounded-sm' : ''}`}
      onClick={() => isEditing && onSelect(block.id)}
    >
      <Component {...block.content} style={block.style} layout={block.layout} />
    </div>
  )
}
```

#### [NEW] `src/hooks/useCmsPage.js`
Fetches page by slug with `localStorage` caching (0ms startup, same pattern as `useCms`).

#### [MODIFY] `src/App.jsx`
```jsx
<Route path="/page/:slug" element={<DynamicPage />} />
```

#### [NEW] `src/pages/DynamicPage.jsx`
Renders the published block list. Clean, no admin logic.

---

### Phase 3 — Global Theme System

#### [NEW] `src/data/cms/site_config.json`
```json
{
  "colors": { "primary": "#074887", "dark": "#013759", "accent": "#fbbf24", "bg": "#f8fafc" },
  "fonts": { "heading": "Inter", "body": "Inter" }
}
```

#### [NEW] `src/hooks/useSiteConfig.js`
Firestore-backed theme config as React context. All blocks read from this.

---

### Phase 4 — Mobile Header (Hamburger Overlay)

#### [MODIFY] `src/components/HeaderV1.jsx`

- **< 1024px**: Hamburger `☰` button → full-screen fixed overlay (z-50, slide-in) with accordion dropdowns. Body scroll locked while open.
- **768px–1023px**: Same as mobile (hamburger overlay).
- **1024px+**: Existing dropdown desktop nav, unchanged.

---

### Phase 5 — Admin Dashboard: Unified Page Manager

#### [MODIFY] `src/pages/AdminPage.jsx`

**Desktop guard**: viewport < 1024px → show "use desktop browser" message.

**Features:**
1. **Device Preview Toggle**: 📱 (375px) / 📟 (768px) / 💻 (100%) — changes canvas width only
2. **Page Canvas**: Inline `BlockRenderer` tree — click any block to select it
3. **Block Toolbar** (on select): ↑ Up, ↓ Down, drag handle ⠿, 🗑 Delete, Edit
4. **Edit Property Panel** (slide-over right):
   - Content text fields
   - Style color pickers (bg, textColor)
   - Grid Columns spinners: Mobile / Tablet / Desktop
   - Visibility toggles: Hide on Mobile / Tablet / Desktop
5. **+ Add Block** modal — visual block type picker
6. **Action Bar**: `Save Draft` (→ `/pages_drafts/{slug}`) | `Publish` (→ `/pages/{slug}`) | `Discard Changes`

**Drag-and-drop**: `pointerdown` / `pointermove` / `pointerup` — mouse + touch. Up/Down arrows as fallback.

---

### Phase 6 — Landing Page Migration

Seed Landing Page blocks to Firestore via Admin migration tool.
`LandingPage.jsx` remains intact as static fallback until migration is confirmed live.

---

## Verification Plan

```bash
npm run build     # Zero errors or warnings
```

### Manual Checklist

1. Landing Page responsive at 375px, 768px, 1024px, 1440px
2. `CardGrid` shows 1 → 2 → 3 columns as viewport grows
3. Block with `hideOnMobile: true` absent at 375px, present at 1024px
4. At 768px: hamburger appears, tap → overlay slides in, dropdowns accordion
5. Admin → Page Manager → Device toggle works (canvas reflows)
6. Click block → property panel has Grid Columns + Visibility controls
7. Drag block on touch device → reorders correctly
8. Admin at 768px → desktop guard message shows
9. Save Draft → refresh → draft preserved
10. Publish → live page updated
11. All other routes (About, Team, FAQ...) unaffected
