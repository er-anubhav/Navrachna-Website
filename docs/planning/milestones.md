# Navrachna Website — Project Milestones

> Last updated: 2026-07-13
> Branch history moved to: `pre-cms-work` (see git-history.md)

---

## ✅ Milestone 1 — Initial Website Build

**Branch:** `pre-cms-work`  
**Status:** Complete

### What was built
- Full Vite + React + Tailwind CSS setup
- Core pages: Landing, About, Team, Services, Facilities, FAQ, Contact, Gallery, StartInUp
- `HeaderV1` and `FooterV1` components
- Routing via React Router

### Key design decisions
- Brand color: `#013759` (dark navy), `#074887` (primary blue), `#fbbf24` (accent yellow)
- Fonts: Sora (headings), Karla (body)
- Custom marquee animation for client logo scroller

---

## ✅ Milestone 2 — Firebase + CMS Foundation

**Branch:** `pre-cms-work`  
**Status:** Complete

### What was built
- Firebase project wired up (`src/firebase.js`, `.firebaserc`, `firebase.json`, `firestore.rules`)
- `useCms` hook — Firestore data with `localStorage` caching for 0ms startup time
- `src/data/cms/migrateToFirestore.js` — seed script to push content to Firestore
- `src/data/cms/header.json` and `footer.json` — seed data for Header/Footer
- `AdminPage.jsx` — initial admin dashboard with tabs for Header and Footer editing
- `HeaderV1` and `FooterV1` updated to accept a `data` prop for real-time Admin preview

### Key architectural decisions
- Firestore is source of truth; `localStorage` is cache
- Components accept `data` prop for admin preview (bypasses Firestore fetch)
- Admin edits write directly to Firestore on save

---

## ✅ Milestone 3 — E-Cell & Page Enhancements

**Branch:** `pre-cms-work`  
**Status:** Complete

### What was built
- E-Cell ITSEC Initiative section added to LandingPage
- Colorful brand text styling for E-Cell section
- Contact page full redesign (Sora + Karla fonts, custom layout)
- All routes fixed and verified

---

## 🔜 Milestone 4 — Block-Based Page CMS (NEXT)

**Branch:** `main` (fresh start)  
**Status:** PLANNED — See `implementation_plan.md`

### What will be built
- Block component library (`src/components/blocks/`)
- `BlockRenderer.jsx` — registry-based block rendering
- `useCmsPage.js` — page-by-slug Firestore hook with localStorage cache
- `DynamicPage.jsx` — public page route driven by block data
- Global theme system (`useSiteConfig.js`, `site_config.json`)
- Mobile hamburger overlay header
- Unified Page Manager in Admin Dashboard with:
  - Inline block editing
  - Device preview toggle (📱 📟 💻)
  - Drag-and-drop reordering (Pointer Events API, touch + mouse)
  - Draft + Publish workflow
- Full 4-tier responsive design for all block components
