# Stage 1: Technical Codebase Audit & Data Content Inventory

**Target Project**: Navrachna Website  
**Repository Path**: `/home/anubhavtripathi/Documents/Projects/NFED Project/Navrachnawebsite`  
**Audit Date**: August 14, 2026  
**Auditor**: Senior Full-Stack Lead Engineer  

---

## 1. Project Overview & Architecture

### Purpose & Scope
The **Navrachna Foundation for Entrepreneurship Development (NFED)** web portal is the official digital platform for an autonomous, sector-agnostic startup incubator operating under the aegis of **I.T.S Engineering College**, Greater Noida (CIN: `U73200UP2020NPL128831`). Its goal is to provide institutional information, highlight leadership, showcase flagship government incubation schemes (**NewGen-IEDC**, **MSME-BI**, **StartinUP**, **IIC-ITSEC**), document prototyping facilities, display portfolio startups, and publish news updates.

### Architectural Breakdown
The application is a **pure static Single-Page Application (SPA)** with client-side rendering only. There is **zero backend server, zero API endpoints, and zero live database connections** in the active application.

```text
[ Browser Client ]
       │
       ├─► React 19 + React Router v7 (SPA Navigation)
       ├─► Tailwind CSS v4 + Motion v12 (Styling & Motion)
       ├─► OGL WebGL Renderer (Interactive 3D Canvas / Stack / Gallery)
       └─► Static Datasets (newgenProjects.js, siteContent.js)
```

| Layer | Technology & Version | Status / Notes |
| :--- | :--- | :--- |
| **Frontend Framework** | React `^19.2.5` + React Router DOM `^7.14.1` | Modern React 19 SPA setup built with Vite `^8.0.9`. |
| **Styling & UI** | Tailwind CSS `^4.2.2` (`@tailwindcss/vite`) | Configured via `@import "tailwindcss";` in `index.css`. |
| **Animations & WebGL** | Motion `^12.42.2` & OGL `^1.0.11` | Custom WebGL shaders and canvas rendering for 3D stacks/galleries. |
| **Backend Framework** | **NONE** (0 backend code) | No Express, Node, Next.js, or serverless functions exist in repository. |
| **Database** | Supabase JS installed / Inactive | `@supabase/supabase-js` installed and configured in `.env`; ready for integration. |
| **Authentication** | **NONE** | Zero login, signup, session management, or auth SDK integration. |
| **File Storage** | **Local Bundle Assets** | Images bundled directly in `src/assets/`. |
| **Third-Party APIs** | **Google Fonts & Google Maps** | 1 `fetch()` call in `CircularGallery.jsx` for font CSS; 1 `<iframe>` map on Contact page. |
| **Hosting & Deployment**| Vercel & Firebase Hosting Config | Live on Vercel (`navrachna.vercel.app`) with SPA rewrites in `vercel.json`. |
| **Environment Config** | Single `.env` file | Contains Vite environment variables for Firebase and Supabase credentials. |

---

## 2. Complete Feature Inventory

| Feature Name | Implementation Location | Frontend Flow | Backend/API Flow | DB Tables | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Interactive 3D WebGL Workspaces Stack** | `Stack.jsx`, `LandingPage.jsx` | OGL WebGL renderer with custom shaders renders 7 facility images in a 3D card stack. | None | None | **Fully Functional** |
| **Circular WebGL 3D Gallery** | `CircularGallery.jsx`, `LandingPage.jsx` | 3D cylindrical mesh gallery showcasing incubation images/logos. Uses `fetch()` for Google Fonts. | `fetch()` font CSS | None | **Fully Functional** |
| **Mouse-Tracking Radial Glow Cards** | `BorderGlow.jsx` | HTML5 Canvas tracks pointer coordinates to render dynamic radial gradient borders. | None | None | **Fully Functional** |
| **Live Announcements Ticker & Modal** | `LandingPage.jsx` | Top banner ticker rotates news. Clicking "View All" opens a modal listing all announcements. | None | None | **Mocked / Static** (Hardcoded `UPDATES`) |
| **NewGen-IEDC Projects Directory & Search** | `NewGenIedcPage.jsx`, `newgenProjects.js` | Cohort tab filter (`2023-24` down to `2019-20`) and search across titles, mentors, mentees. | None | None | **Partially Functional** (Search works; detail links unrouted) |
| **NewGen Project Detail View** | `NewGenProjectDetailPage.jsx` | Displays project metadata, mentee lists, patent status, and expenditure breakdown. | None | None | **Unused / Unrouted** (Missing in `App.jsx`) |
| **Portfolio Startup Showcase & Grid** | `PortfolioPage.jsx`, `LandingPage.jsx` | Logo marquee slider and category filter tabs (`Deep-Tech`, `Clean-Tech`, `Agri-Tech`, etc.). | None | None | **Fully Functional** (Static array `CLIENTS`) |
| **Header Navigation & Mobile Drawer** | `HeaderV1.jsx` | Top contact bar, desktop multi-level dropdowns, and mobile hamburger drawer. | None | None | **Partially Functional** (Uses native `<a href>`; social links `#`) |
| **Footer & Quick Links** | `FooterV1.jsx` | Institutional footer with CIN details, quick links, contact info, and copyright bar. | None | None | **Partially Functional** (Multiple links use `href="#"` placeholders) |
| **Incubation Scheme Info Pages** | `StartinUpPage.jsx`, `MsmeBiPage.jsx`, `MsmeYearlyPage.jsx`, `MsmeHackathonsPage.jsx`, `OurPoliciesPage.jsx`, `IicItsecPage.jsx` | Static rich media pages detailing grant schemes, eligibility, policy documents, and yearly milestones. | None | None | **Fully Functional** |
| **Facilities Explorers** | `ElectronicsLabsPage.jsx`, `HighEndComputersPage.jsx`, `ThreeDPrintingPage.jsx`, `FabricationLabPage.jsx` | Equipment spec tables, image galleries, and expandable FAQ accordions. | None | None | **Fully Functional** |
| **Contact Page** | `ContactPage.jsx` | Displays 3 info cards (Phone, Email, Location), Google Map iframe, and FAQ list. | None | None | **Partially Functional** (No inquiry form exists) |
| **Application Form Submission** | None | Buttons labeled "Apply Now" redirect to `/contact`. | None | None | **Not Implemented** |
| **Proposal Document Download** | `NewGenIedcPage.jsx` | Clicking "Download Proposal Format" fires `alert('Proposal format download link.')`. | None | None | **Mocked / Placeholder** |
| **Legacy Home Page** | `HomePage.jsx` | Early layout iteration containing template boilerplate text. | None | None | **Unused / Dead Code** |

---

## 3. Pages & Routes Inventory

All routes are registered in `App.jsx` wrapped inside `<Layout />`.

```text
Public Pages:
 1. /                             ──► LandingPage.jsx (Fully Functional)
 2. /about                        ──► AboutPage.jsx (Fully Functional)
 3. /team                         ──► TeamPage.jsx (Fully Functional)
 4. /startin-up                   ──► StartinUpPage.jsx (Fully Functional)
 5. /programs                     ──► ProgramsPage.jsx (Fully Functional)
 6. /programs/newgen-iedc         ──► NewGenIedcPage.jsx (Fully Functional)
 7. /msme-bi                      ──► MsmeBiPage.jsx (Fully Functional)
 8. /msme-yearly-activities       ──► MsmeYearlyPage.jsx (Fully Functional)
 9. /msme-hackathons              ──► MsmeHackathonsPage.jsx (Fully Functional)
10. /policies                     ──► OurPoliciesPage.jsx (Fully Functional)
11. /portfolio                    ──► PortfolioPage.jsx (Fully Functional)
12. /facilities                   ──► FacilitiesPage.jsx (Fully Functional)
13. /facilities/electronics-labs  ──► ElectronicsLabsPage.jsx (Fully Functional)
14. /facilities/high-end-computers──► HighEndComputersPage.jsx (Fully Functional)
15. /facilities/3d-printing       ──► ThreeDPrintingPage.jsx (Fully Functional)
16. /facilities/fabrication-lab   ──► FabricationLabPage.jsx (Fully Functional)
17. /innovation-cell/iic-itsec    ──► IicItsecPage.jsx (Fully Functional)
18. /services                     ──► ServicesPage.jsx (Fully Functional)
19. /stories                      ──► StoriesPage.jsx (Fully Functional)
20. /faq                          ──► FaqPage.jsx (Fully Functional)
21. /contact                      ──► ContactPage.jsx (Fully Functional)

Dynamic Routes:
 1. /programs/:slug               ──► ProgramDetailPage.jsx (Functional static lookup)
 2. /programs/newgen-iedc/project/:projectSlug ──► UNROUTED / BROKEN (Linked in NewGenIedcPage.jsx, missing in App.jsx)

Auth, User Dashboard, Admin Pages: NONE (0 routes exist)
API Routes / Endpoints: NONE (0 backend endpoints exist)
```

---

## 4. Master Data Inventory & Discovery

The audit identified **20 distinct data collections** currently hardcoded in JavaScript/JSON data files and React components:

| # | Collection / Entity | Current Source File | Records | Key Fields Discovered | Move to DB? | Classification Type | Priority |
| :-: | :--- | :--- | --: | :--- | :-: | :--- | :--- |
| **1** | NewGen Funded Projects | `newgenProjects.js` | 40+ | `title`, `mentor`, `mentee`, `patent_status`, `patent_id`, `expenditure`, `description`, `category` | **YES** | Database Content | **CRITICAL** |
| **2** | Incubated Startups | `PortfolioPage.jsx`, `LandingPage.jsx` | 28 | `name`, `category`, `logo`, `description`, `founders`, `website`, `status` | **YES** | Database Content | **HIGH** |
| **3** | Announcements & Ticker | `LandingPage.jsx` | 4 | `tag`, `text`, `date`, `link`, `is_active` | **YES** | Database Content | **CRITICAL** |
| **4** | Executive Leadership | `LandingPage.jsx`, `AboutPage.jsx` | 4 | `name`, `role`, `photo`, `message`, `display_order` | **YES** | Database Content | **HIGH** |
| **5** | Incubation Programs | `siteContent.js`, `LandingPage.jsx` | 5 | `slug`, `title`, `summary`, `bullets`, `grant_amount`, `accent` | **YES** | Database Content | **HIGH** |
| **6** | Incubator Staff Team | `TeamPage.jsx` | 6 | `name`, `role`, `email`, `photo`, `bio`, `category` | **YES** | Database Content | **MEDIUM** |
| **7** | Frequently Asked Questions | `siteContent.js`, `ContactPage.jsx`, `ServicesPage.jsx` | 16 | `question`, `answer`, `category`, `page_context`, `sort_order` | **YES** | Database Content | **MEDIUM** |
| **8** | Physical Facilities | `siteContent.js`, `LandingPage.jsx` | 7 | `title`, `detail`, `image_url`, `specs`, `display_order` | **YES** | Database Content | **HIGH** |
| **9** | Prototyping Lab Inventory | `ElectronicsLabsPage.jsx`, `HighEndComputersPage.jsx`, `ThreeDPrintingPage.jsx`, `FabricationLabPage.jsx` | 23 | `facility_id`, `name`, `specifications`, `quantity`, `images` | **YES** | Database Content | **MEDIUM** |
| **10**| MSME Annual Activities | `MsmeYearlyPage.jsx` | 15+ | `fiscal_year`, `event_title`, `date`, `participants`, `summary` | **YES** | Database Content | **HIGH** |
| **11**| MSME Hackathon Chapters | `MsmeHackathonsPage.jsx` | 4 | `chapter_name`, `year`, `grant_per_idea`, `ideas_approved`, `total_budget` | **YES** | Database Content | **HIGH** |
| **12**| StartinUP Incentives | `StartinUpPage.jsx` | 5 | `incentive_name`, `amount`, `eligibility`, `description` | **YES** | Database Content | **MEDIUM** |
| **13**| Policy Documents | `OurPoliciesPage.jsx` | 6 | `title`, `category`, `summary`, `file_url`, `effective_date` | **YES** | Database Content | **MEDIUM** |
| **14**| Testimonials & Stories | `siteContent.js`, `StoriesPage.jsx` | 3 | `startup_name`, `founder_name`, `quote`, `metric_highlight` | **YES** | Database Content | **MEDIUM** |
| **15**| Global Site Settings | `HeaderV1.jsx`, `FooterV1.jsx`, `ContactPage.jsx` | 1 | `phone`, `email`, `address`, `cin`, `social_links`, `hero_headline` | **YES** | Database Configuration | **CRITICAL** |
| **16**| Startup Domain Categories | `PortfolioPage.jsx` | 5 | `category_name`, `slug`, `description` | **YES** | Database Content (Taxonomy) | **MEDIUM** |
| **17**| NewGen Cohort Years | `NewGenIedcPage.jsx` | 5 | `year_label`, `start_date`, `end_date`, `is_active` | **YES** | Database Content (Taxonomy) | **MEDIUM** |
| **18**| Site Hero Statistics | `siteContent.js`, `StartinUpPage.jsx` | 8 | `stat_value`, `stat_label`, `page_context` | **PROBABLY** | Database Configuration | **LOW** |
| **19**| WebGL Shaders & Config | `Stack.jsx`, `CircularGallery.jsx` | — | Camera FOV, mesh geometry, shader code, animation friction | **NO** | Developer Constants | **LOW** |
| **20**| Tailwind CSS Tokens | `index.css`, `vite.config.js` | — | `#013759`, `#074887`, font family definitions | **NO** | Developer Constants | **LOW** |

---

## 5. Technical Debt & Important Findings

1. **CRITICAL — Missing NewGen Detail Route**: Clicking "About Project →" navigates to `/programs/newgen-iedc/project/:projectSlug`, which triggers a 404 fallback redirect to `/`. `NewGenProjectDetailPage.jsx` is completely unrouted in `App.jsx`.
2. **CRITICAL — Complete Absence of Interactive Forms**: There are no `<form>` components anywhere in the application. Buttons labeled "Apply Now" redirect to `/contact`, where only static text info is shown.
3. **HIGH — Full Page Reloads via Anchor Tags**: `HeaderV1.jsx` uses native `<a href="...">` anchor tags instead of React Router `<Link to="...">`, causing full browser page refreshes on every menu click.
4. **HIGH — Leadership Data Conflict**: `LandingPage.jsx` and `AboutPage.jsx` list completely different individuals for Chairman, Director, and Advisor.
5. **MEDIUM — Dead Link Placeholders**: 10 footer links point to `href="#"`.
6. **MEDIUM — ESLint Static Errors**: Running `npm run lint` yields 20 errors across 4 files (unused variables, unused imports, and `setState` inside `useEffect`).

---

## 6. Summary Snapshot

```text
NAVRACHNA STAGE 1 AUDIT SUMMARY

Total collections found: 20
Must move to DB: 6
Should probably move: 7
Keep in code: 4
Derived: 3

Largest collection: NewGen Funded Projects (40+ records)
Most duplicated data: Contact info (Phone/Email/Address/CIN in 7 files) & Leadership grid
Most frequently likely to change: Announcements & News Ticker
Most important migration: NewGen Funded Projects & Global Site Settings
Most complicated data relationship: Physical Facilities ➔ Lab Equipment Inventory (1-to-Many)
```
