# Stage 2.5: Frontend Integration & Data Layer Log

**Project**: Navrachna Website  
**Branch**: `prod-development`  
**Supabase Reference**: `obnqhrmfbctslwoylsjq` (`https://obnqhrmfbctslwoylsjq.supabase.co`)  
**Audit Date**: August 14, 2026  

---

## 1. Entity Integration & Service Tracking Table

| # | Entity | Primary Supabase Table | Frontend Service Module | Target Component / Page | Integrated | Loading/Fallback | Status |
| :-: | :--- | :--- | :--- | :--- | :-: | :-: | :--- |
| **1** | Site Settings | `site_settings` | `src/services/siteSettingsService.js` | `HeaderV1`, `FooterV1`, `ContactPage` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **2** | Announcements | `announcements` | `src/services/announcementsService.js` | `LandingPage.jsx` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **3** | Programs | `programs` | `src/services/programsService.js` | `LandingPage`, `ProgramsPage` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **4** | People | `people` | `src/services/peopleService.js` | `TeamPage`, `AboutPage` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **5** | Startups | `startups` | `src/services/startupsService.js` | `PortfolioPage.jsx` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **6** | Facilities | `facilities` | `src/services/facilitiesService.js` | `FacilitiesPage`, Lab Pages | **YES** | Static Fallback | **VERIFIED LIVE** |
| **7** | NewGen Cohorts | `cohorts` | `src/services/projectsService.js` | `NewGenIedcPage.jsx` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **8** | NewGen Projects | `newgen_projects` | `src/services/projectsService.js` | `NewGenIedcPage`, `NewGenProjectDetailPage` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **9** | Project People | `project_people` | `src/services/projectsService.js` | `NewGenProjectDetailPage.jsx` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **10**| FAQs | `faqs` | `src/services/faqsService.js` | `FaqPage.jsx` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **11**| Testimonials | `testimonials` | `src/services/testimonialsService.js` | `StoriesPage.jsx` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **12**| Policies | `policies` | `src/services/policiesService.js` | `OurPoliciesPage.jsx` | **YES** | Static Fallback | **VERIFIED LIVE** |
| **13**| Deferred Data | `startup_founders`, `msme_activities` | N/A | `MsmeYearlyPage.jsx` | **DEFERRED** | Static Retained | **DOCUMENTED** |

---

## 2. Route Registration & Fixes

- **NewGen Project Detail Route**:
  - Registered missing route in `App.jsx`: `<Route path="/programs/newgen-iedc/project/:projectSlug" element={<NewGenProjectDetailPage />} />`
  - Integrated `getNewgenProjectBySlug(projectSlug)` inside `NewGenProjectDetailPage.jsx`.
  - Shared `slugify` utility extracted to `src/utils/slugify.js`.

- **Client-Side SPA Navigation**:
  - Updated `<a href="...">` in `HeaderV1.jsx` to React Router `<Link to="...">` for instant, smooth client-side page transitions without browser page refreshes.

---

## 3. Security & Environment Credential Verification

- Client initialization: Exclusively uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `src/lib/supabase.js`.
- Zero service role credentials, database passwords, or CLI tokens exist in client bundle.
