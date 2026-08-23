# Stage 2.1: Entity Normalization & Data Model Discovery Report

**Project**: Navrachna Website  
**Repository Path**: `/home/anubhavtripathi/Documents/Projects/NFED Project/Navrachnawebsite`  
**Audit Date**: August 14, 2026  
**Auditor**: Senior Full-Stack Lead Engineer  

---

## 1. Domain Validation & Candidate Entities

The candidate domains from Stage 1 were validated against the codebase. The candidate list has been refined, merged, and split based on real-world concepts discovered in the code:

* **Site Settings** (`site_settings`) — Confirmed as a single global configuration object.
* **People** (`people`) — **MERGED**. Replaces separate tables for leadership, team, mentors, mentees, and advisors into a single canonical entity with role classifications.
* **Incubation Programs** (`programs`) — Confirmed. Includes core tracks (NewGen-IEDC, MSME-BI, StartinUP, IIC-ITSEC, Kartavyam).
* **Announcements** (`announcements`) — Confirmed. Time-sensitive ticker items and modal news.
* **NewGen Cohorts** (`cohorts`) — Confirmed. Academic/fiscal year groupings (e.g. `2023-24`).
* **NewGen Projects** (`newgen_projects`) — Confirmed. 40+ funded prototype projects.
* **Portfolio Startups** (`startups`) — Confirmed. 28 resident and alumni ventures.
* **Facilities & Spaces** (`facilities`) — Confirmed. 7 physical hubs/labs.
* **Facility Equipment** (`equipment`) — **SPLIT / NEW**. 23 specialized hardware items linked to parent facilities.
* **FAQs** (`faqs`) — Confirmed. 16 Q&A records classified by page context.
* **Founder Stories / Testimonials** (`testimonials`) — Confirmed. Metric-led quotes and success stories.
* **MSME Yearly Activities** (`msme_activities`) — Confirmed. Historical activity log across fiscal years.
* **MSME Hackathons** (`msme_hackathons`) — **SPLIT / NEW**. Hackathon chapters with budgets and sanctioned ideas.
* **Policy Documents** (`policies`) — Confirmed. 6 downloadable institutional governance PDFs.
* **Taxonomies & Categories** (`taxonomies`) — Confirmed as controlled lookup arrays (Startup Domains, Patent Statuses, Policy Categories).

---

## 2. Real-World Entities Identified

### Entity 1: Person
* **Definition**: An individual participating in the Navrachna ecosystem as an executive, manager, lab technician, mentor, mentee, or founder.
* **Examples**: Shri R.P. Chadha, Dr. Surya Prasad Mishra, Er. Anubhav Tripathi, Er. Shashwat Vats.
* **Current Source**: `LandingPage.jsx`, `AboutPage.jsx`, `TeamPage.jsx`, `newgenProjects.js`.
* **Used In**: Landing Page, About Us Page, Team Page, NewGen Project Directory, Portfolio Page.
* **Likely Canonical Entity**: `people`

### Entity 2: Incubation Program / Scheme
* **Definition**: A structured institutional incubation initiative or government-backed grant framework offered to founders and student innovators.
* **Examples**: NewGen-IEDC, MSME Business Incubator (MSME-BI), StartinUP, MoE Innovation Cell (IIC-ITSEC), Kartavyam Initiative.
* **Current Source**: `siteContent.js`, `LandingPage.jsx`, `ProgramsPage.jsx`.
* **Used In**: Homepage, Programs Hub, Scheme-specific pages (`MsmeBiPage.jsx`, `StartinUpPage.jsx`, `NewGenIedcPage.jsx`, `IicItsecPage.jsx`).
* **Likely Canonical Entity**: `programs`

### Entity 3: NewGen Project
* **Definition**: A specific technology prototype or proof-of-concept funded under the Department of Science & Technology (DST) NewGen-IEDC grant scheme.
* **Examples**: "AI-Based Smart Crop Disease Detector", "Solar-Powered Water Purification System".
* **Current Source**: `newgenProjects.js`.
* **Used In**: NewGen-IEDC Directory Page (`NewGenIedcPage.jsx`) and Project Detail Page (`NewGenProjectDetailPage.jsx`).
* **Likely Canonical Entity**: `newgen_projects`

### Entity 4: Cohort / Fiscal Year
* **Definition**: A temporal grouping representing an academic cycle or government funding year.
* **Examples**: `2023-24`, `2022-23`, `2021-22`, `2020-21`, `2019-20`.
* **Current Source**: `NewGenIedcPage.jsx`, `MsmeYearlyPage.jsx`.
* **Used In**: NewGen-IEDC Cohort Filter Tabs, MSME Yearly Activities Timeline.
* **Likely Canonical Entity**: `cohorts`

### Entity 5: Incubated Startup / Portfolio Company
* **Definition**: An early-stage startup venture or company resident at or accelerated by Navrachna Foundation.
* **Examples**: UPROI Digital, Digiera Private Limited, Verdant, Jagmag Lights, Neurapex AI.
* **Current Source**: `PortfolioPage.jsx`, `LandingPage.jsx`.
* **Used In**: Homepage Logo Marquee, Portfolio Directory Page.
* **Likely Canonical Entity**: `startups`

### Entity 6: Facility / Workspace
* **Definition**: A physical infrastructure node, coworking area, or specialized laboratory housed within the incubator.
* **Examples**: Fabrication Lab, Electronics & Design System Lab, High-End Compute Center, 3D Printing Unit, Boardroom.
* **Current Source**: `siteContent.js`, `LandingPage.jsx`, `FacilitiesPage.jsx`.
* **Used In**: WebGL 3D Workspace Stack, Facilities Overview, Individual Facility Pages.
* **Likely Canonical Entity**: `facilities`

### Entity 7: Lab Equipment
* **Definition**: A specialized machine, workstation, 3D printer, or diagnostic tool housed within a specific facility.
* **Examples**: Digital Storage Oscilloscope (DSO), Intel i9 RTX 4090 Workstation, FDM Industrial 3D Printer, Fiber Laser Cutter.
* **Current Source**: `ElectronicsLabsPage.jsx`, `HighEndComputersPage.jsx`, `ThreeDPrintingPage.jsx`, `FabricationLabPage.jsx`.
* **Used In**: Equipment specification tables on individual facility pages.
* **Likely Canonical Entity**: `equipment`

### Entity 8: Announcement / News Ticker Item
* **Definition**: A time-sensitive public bulletin, competition call, or event notice.
* **Examples**: "Annual Logo Design Competition Applications Open", "MSME Hackathon 4.0 Announced".
* **Current Source**: `LandingPage.jsx`.
* **Used In**: Top News Ticker Bar, Announcements Modal Dialog.
* **Likely Canonical Entity**: `announcements`

### Entity 9: FAQ Item
* **Definition**: A recurring question-and-answer pair clarifying incubator operations, grant eligibility, or facilities.
* **Examples**: "Who can apply to Navrachna Foundation?", "What support do founders receive?".
* **Current Source**: `siteContent.js`, `LandingPage.jsx`, `ContactPage.jsx`, `ServicesPage.jsx`.
* **Used In**: Landing Page, Contact Page, Services Page, FAQ Page.
* **Likely Canonical Entity**: `faqs`

### Entity 10: Policy Document
* **Definition**: A formal institutional policy, compliance guideline, or downloadable terms document.
* **Examples**: IPR Policy, Incubation Policy, Seed Grant Terms, Code of Ethics.
* **Current Source**: `OurPoliciesPage.jsx`.
* **Used In**: Our Policies Page.
* **Likely Canonical Entity**: `policies`

---

## 3. Duplicate Entities & Data Conflicts

### Data Conflict 1: Executive Leadership Names & Credentials
* **Source A**: `LandingPage.jsx` (`LEADERSHIP` array)
* **Source B**: `AboutPage.jsx` (`defaultAboutData.leadership` array)
* **What is duplicated**: Both files render a 4-person executive leadership grid with photos, titles, and quotation messages.
* **DATA CONFLICT**:
  - **Chairman**: Named as `Shri R.P. Chadha` in LandingPage vs `Shri B.L. Gupta` in AboutPage.
  - **Director**: Named as `Prof. (Dr.) Mayank Garg` in LandingPage vs `Dr. Manish Sharma` in AboutPage.
  - **Advisor / In-Charge**: Named as `Dr. Surya Prasad Mishra` in LandingPage vs `Prof. (Dr.) Sanjay Yadav` in AboutPage.
  - *(Vice Chairman `Shri Sohil Gupta` is identical in both files)*.
* **Recommended Canonical Entity**: `people` table with `role = 'leadership'`.

### Duplicate 2: Portfolio Startups
* **Source A**: `LandingPage.jsx` (`CLIENTS` array of 28 startups)
* **Source B**: `PortfolioPage.jsx` (`ALL_STARTUPS` array)
* **Source C**: `siteContent.js` (`proofLogos` array)
* **What is duplicated**: Company names and logo references for resident startups.
* **Inconsistencies**:
  - `proofLogos` includes `"Verdant"`, `"Weaclim"`, `"NewGen"`, and `"StartinUP"`. However, `"NewGen"` and `"StartinUP"` are government programs, not portfolio startups.
  - `PortfolioPage.jsx` assigns sector categories (`Deep-Tech`, `Clean-Tech`, `Agri-Tech`, `Health-Tech`, `Ed-Tech`), whereas `LandingPage.jsx` only lists names and image paths.
* **Recommended Canonical Entity**: `startups` table.

### Duplicate 3: Physical Facilities & Workspace Descriptions
* **Source A**: `siteContent.js` (`facilities` array)
* **Source B**: `LandingPage.jsx` (`OUR_SPACES` and `FACILITIES_SPECS` arrays)
* **Source C**: `FacilitiesPage.jsx`
* **What is duplicated**: Titles, descriptions, and feature lists for co-working areas and prototyping labs.
* **Recommended Canonical Entity**: `facilities` table.

---

## 4. Separation: Entity Data vs Page Content vs UI Config

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CONTENT & DATA CLASSIFICATION                   │
├──────────────────────────┬──────────────────────────┬───────────────────────┤
│ ENTITY DATA (Supabase)   │ PAGE CONTENT (Static/CMS)│ UI CONFIG (Code)      │
├──────────────────────────┼──────────────────────────┼───────────────────────┤
│ • NewGen Projects        │ • Hero Headlines        │ • WebGL Shaders (OGL) │
│ • Startups / Portfolio   │ • Who We Are Paragraphs  │ • Canvas Radial Math  │
│ • Executive & Team People│ • Vision & Mission Copy  │ • Tailwind CSS Tokens │
│ • Programs & Schemes     │ • Section Kickers        │ • React Router Paths  │
│ • Lab Equipment Inventory│ • Banner Subtitles       │ • Font Loaders        │
│ • Announcements          │                          │                       │
│ • Policy Documents       │                          │                       │
│ • FAQs & Testimonials    │                          │                       │
│ • MSME Activities        │                          │                       │
└──────────────────────────┴──────────────────────────┴───────────────────────┘
```

### Entity Data (Database Tables)
Structured records representing real-world objects that are queried, filtered, and rendered across multiple components.

### Page Content (Static JSX / Page Metadata)
Static editorial prose that rarely changes, such as the exact phrasing of the Vision and Mission statements in `AboutPage.jsx` or section kicker labels (`"ENTREPRENEURSHIP, GOVERNED"`).

### Global Settings (Single Database Settings Row)
Centralized institutional identity attributes:
- `phone`: `+91 9540527700`
- `email`: `head.nfed@its.edu.in`
- `address`: `Plot no. 46, Knowledge Park 3, Greater Noida`
- `cin`: `U73200UP2020NPL128831`
- `social_links`: JSON object mapping platforms to URLs.

### UI Configuration & Developer Constants (Keep in Code)
- OGL WebGL 3D camera geometry and fragment shaders in `Stack.jsx` and `CircularGallery.jsx`.
- HTML5 Canvas mouse-tracking physics in `BorderGlow.jsx`.
- Color hex codes (`#013759`, `#074887`, `#fbbf24`) and typography setup in `index.css`.

---

## 5. Canonical Entities

| Canonical Entity | Current Code Sources | Reason for Canonicalization | Consuming Pages |
| :--- | :--- | :--- | :--- |
| `people` | `LandingPage.jsx` (`LEADERSHIP`), `AboutPage.jsx` (`leadership`), `TeamPage.jsx` (`TEAM_MEMBERS`), `newgenProjects.js` (`mentor`, `mentee`) | Resolves name/title conflicts; unifies leadership, operational staff, mentors, and mentees into one queryable entity. | Landing Page, About Page, Team Page, NewGen Directory, Project Detail Page |
| `startups` | `PortfolioPage.jsx` (`ALL_STARTUPS`), `LandingPage.jsx` (`CLIENTS`), `siteContent.js` (`proofLogos`) | Unifies 28 startup records, logo assets, sector categories, and founder lists into a single source of truth. | Homepage, Portfolio Page, Story Details |
| `facilities` | `siteContent.js` (`facilities`), `LandingPage.jsx` (`OUR_SPACES`, `FACILITIES_SPECS`), `FacilitiesPage.jsx` | Prevents duplicating physical lab specifications and images across 6 page components. | Homepage, Facilities Overview, Individual Facility Pages |
| `programs` | `siteContent.js` (`programs`), `LandingPage.jsx` (`PROGRAMS`, `SCHEMES`), `ProgramsPage.jsx` | Single source for program titles, grant ceilings, eligibility rules, and details. | Homepage, Programs Page, Scheme Pages |
| `site_settings` | `HeaderV1.jsx`, `FooterV1.jsx`, `ContactPage.jsx`, `AboutPage.jsx` | Eliminates copy-pasting phone numbers, emails, addresses, and CIN across 7 files. | Header, Footer, Contact Page, About Page |

---

## 6. Conceptual Entity Relationships

```text
┌─────────────┐       1 : N       ┌──────────────┐
│  programs   │ ─────────────────►│   cohorts    │
└─────────────┘                   └──────────────┘
       │                                 │
       │ 1 : N                           │ 1 : N
       ▼                                 ▼
┌─────────────┐       N : M       ┌──────────────┐
│  startups   │ ◄────────────────►│   projects   │
└─────────────┘                   └──────────────┘
                                         │
                                         │ N : M (Junction)
                                         ▼
                                  ┌──────────────┐
                                  │    people    │
                                  └──────────────┘
                                         ▲
                                         │ 1 : N
┌─────────────┐       1 : N       ┌──────┴───────┐
│ facilities  │ ─────────────────►│  equipment   │
└─────────────┘                   └──────────────┘
```

### Relationship 1: Program ➔ Cohorts (1 : Many)
- **Cardinality**: `1 : N`
- **Reason**: An incubation program (e.g. NewGen-IEDC) contains multiple funding cohorts/years (`2023-24`, `2022-23`). A cohort belongs to one program.

### Relationship 2: Cohort ➔ NewGen Projects (1 : Many)
- **Cardinality**: `1 : N`
- **Reason**: A cohort year (e.g. `2023-24`) funds multiple prototype projects (e.g. 10 projects). Each project belongs to one funding cohort.

### Relationship 3: Project ↔ People (Many : Many)
- **Cardinality**: `N : M` (via `project_people` junction)
- **Reason**: A project has one or more Mentors and one or more Mentees (currently stored as a comma-separated string `mentee = "Person A, Person B"`). A Person can mentor or participate in multiple projects.

### Relationship 4: Startup ↔ People (Many : Many)
- **Cardinality**: `N : M` (via `startup_founders` junction)
- **Reason**: A startup company has one or more Founders. A Founder can be associated with multiple startups.

### Relationship 5: Facility ➔ Equipment (1 : Many)
- **Cardinality**: `1 : N`
- **Reason**: A facility (e.g. "Electronics Lab") contains multiple specialized equipment items (Oscilloscope, Soldering Station). Equipment belongs to one physical facility.

### Relationship 6: Program ➔ Policies (1 : Many)
- **Cardinality**: `1 : N` (Optional relationship)
- **Reason**: A policy document (e.g. "Seed Grant Terms") may belong to a specific program or be global.

---

## 7. Deep Analysis: People Domain

### Evaluation of Options
* **Option A**: Single canonical `people` table with `primary_role` and role tags.
* **Option B**: Separate `leaders`, `team_members`, `mentors`, `mentees`, and `founders` tables.

### Finding & Recommendation: **Option A (Single Canonical `people` Entity)**
The codebase contains people who overlap across multiple roles:
- Dr. Surya Prasad Mishra appears as **Advisor/In-Charge** in `LandingPage.jsx` and as a **Project Mentor** in `newgenProjects.js`.
- Er. Anubhav Tripathi appears as **Incubation Lead** in `TeamPage.jsx` and as a **Project Mentor** in `newgenProjects.js`.

Creating separate tables would force duplicating individual bios, emails, and photos across multiple tables. A single `people` entity with a `roles` classification array (e.g. `['leadership', 'mentor']`) correctly models the real-world dataset.

---

## 8. Deep Analysis: Programs & Schemes Domain

Analysis of `NewGen-IEDC`, `MSME-BI`, `StartinUP`, `IicItsecPage`, and `Kartavyam`:

```text
Navrachna Foundation
├── Core Incubation Tracks (Program Entity)
│   ├── NewGen-IEDC (Student Ideation & PoC Grant Track)
│   ├── MSME-BI (Business Incubation & Commercialization Track)
│   ├── StartinUP (UP State Accelerator Track)
│   ├── IIC-ITSEC (MoE Innovation Cell Track)
│   └── Kartavyam (Youth STEM Outreach Program)
└── Program Sub-Entities
    ├── NewGen ➔ Cohorts ➔ Projects
    ├── MSME-BI ➔ Yearly Activities & Hackathons
    └── StartinUP ➔ State Policy Incentives
```

* **Conclusion**: All 5 are instances of the `programs` entity.
* Program-specific child entities (`newgen_projects`, `msme_activities`, `msme_hackathons`) attach to their respective parent `program_id`.

---

## 9. Deep Analysis: Facilities & Equipment Domain

Inspection of `ElectronicsLabsPage.jsx`, `HighEndComputersPage.jsx`, `ThreeDPrintingPage.jsx`, and `FabricationLabPage.jsx`:

* The 4 lab pages are NOT separate entities; they are specific records in the `facilities` table.
* Equipment lists (`EQUIPMENT`, `items`) represent child records in a `facility_equipment` table.

```text
facility_id: "electronics-lab"
  ├── Equipment 1: Digital Storage Oscilloscope (DSO)
  ├── Equipment 2: Function Generator
  └── Equipment 3: PCB Milling Machine

facility_id: "3d-printing"
  ├── Equipment 1: FDM Industrial 3D Printer
  ├── Equipment 2: SLA Resin Printer
  └── Equipment 3: 3D Scanner
```

---

## 10. Deep Analysis: NewGen Projects & Comma-Separated Normalization

In `newgenProjects.js`, project mentees are stored as comma-separated strings:

```javascript
// CURRENT UNNORMALIZED MODEL IN CODE:
{
  title: "Smart Crop Health Monitoring System",
  mentor: "Dr. Sanjay Yadav",
  mentee: "Rahul Verma, Priya Sharma, Amit Kumar", // Comma-separated string
  patent_status: "Filed",
  patent_id: "202311045612",
  expenditure: "250000"
}
```

### Critical Normalization Finding
Storing multiple people in a single text column (`mentee`) violates 1st Normal Form (1NF). It prevents querying a student's project history or rendering clicked mentee profile links.

### Conceptual Normalized Model
1. **Projects**: Stores project metadata (`title`, `patent_status`, `patent_id`, `expenditure`, `description`, `cohort_id`).
2. **People**: Stores individual records for `Dr. Sanjay Yadav`, `Rahul Verma`, `Priya Sharma`, `Amit Kumar`.
3. **Project_People (Junction)**: Maps `project_id` ↔ `person_id` with a `role_in_project` attribute (`Mentor` vs `Mentee`).

---

## 11. Taxonomy & Controlled Value Analysis

| Taxonomy / Enum Name | Current Values in Code | Used By | Type Recommendation | Reason |
| :--- | :--- | :--- | :--- | :--- |
| `startup_category` | `Deep-Tech`, `Clean-Tech`, `Agri-Tech`, `Health-Tech`, `Ed-Tech` | `PortfolioPage.jsx` | **Admin-Managed Entity** (`startup_categories`) | Allows administrators to create new industry verticals (e.g. `FinTech`) via CMS. |
| `patent_status` | `Filed`, `Published`, `Granted`, `NA` | `newgenProjects.js` | **Fixed Enum** | Standardized legal patent status values that rarely change. |
| `person_role` | `Leadership`, `Manager`, `Lab Tech`, `Mentor`, `Student Mentee`, `Founder` | `TeamPage.jsx`, `LandingPage.jsx` | **Admin-Managed Taxonomy** | Allows tagging people with multiple operational roles. |
| `policy_category` | `IPR`, `Incubation`, `Governance`, `Seed Grant` | `OurPoliciesPage.jsx` | **Admin-Managed Taxonomy** | Document categories for filtering downloads. |
| `announcement_tag` | `Competition`, `MSME Hackathon`, `Incubation`, `Labs & Infra` | `LandingPage.jsx` | **Admin-Managed Taxonomy** | Badge tags on the news ticker. |

---

## 12. Global Site Settings Analysis

The following institutional attributes are copy-pasted across 7 files and must be unified into a single `site_settings` table record:

```text
Setting Key          Current Hardcoded Value
─────────────────────────────────────────────────────────────────────────────
org_name             Navrachna Foundation for Entrepreneurship Development
parent_org           I.T.S Engineering College, Greater Noida
cin_number           U73200UP2020NPL128831
contact_phone        +91 9540527700
contact_email        head.nfed@its.edu.in
contact_address      Plot no. 46, Knowledge Park 3, Greater Noida
social_facebook      https://www.facebook.com/share/1EsxYHE9Rr/
social_instagram     https://www.instagram.com/itsec_nfed
social_linkedin      https://www.linkedin.com/company/itsec-nfed/
```

---

## 13. Derived Data Identification

The following values are currently hardcoded as static strings but can be calculated dynamically:

| Displayed Value | Current Hardcoded String | Canonical Source | Dynamic Calculation |
| :--- | :--- | :--- | :--- |
| **Startups Supported** | `"150+ Startups supported"` | `startups` table | `SELECT COUNT(*) FROM startups` |
| **NewGen Projects** | `"40+ Funded Projects"` | `newgen_projects` table | `SELECT COUNT(*) FROM newgen_projects` |
| **Total Grant Sanctioned** | `"₹2.87 Crore"` | `newgen_projects` table | `SELECT SUM(expenditure) FROM newgen_projects` |
| **Active Facilities** | `"7 Core Spaces"` | `facilities` table | `SELECT COUNT(*) FROM facilities` |

---

## 14. Conceptual Entity Map

```text
                              NAVRACHNA CMS
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
  ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
  │site_settings │           │   programs   │           │  facilities  │
  └──────────────┘           └──────────────┘           └──────────────┘
                                    │                          │
                                    │ 1 : N                    │ 1 : N
                                    ▼                          ▼
                             ┌──────────────┐           ┌──────────────┐
                             │   cohorts    │           │  equipment   │
                             └──────────────┘           └──────────────┘
                                    │
                                    │ 1 : N
                                    ▼
                             ┌──────────────┐
                             │newgen_projects│
                             └──────────────┘
                                    │
                                    │ N : M (Junction)
                                    ▼
┌──────────────┐             ┌──────────────┐           ┌──────────────┐
│   startups   │ ◄──────────►│    people    │ ◄─────────┤announcements │
└──────────────┘    N : M    └──────────────┘           └──────────────┘
       │                                                       │
       │ N : 1                                                 │ N : 1
       ▼                                                       ▼
┌──────────────┐                                        ┌──────────────┐
│ startup_cats │                                        │  policies    │
└──────────────┘                                        └──────────────┘
```

---

## 15. Candidate Entity List

| # | Entity Name | Purpose | Canonical? | Key Relationships | Notes |
| :-: | :--- | :--- | :-: | :--- | :--- |
| **1** | `site_settings` | Global institutional config (Phone, Email, Address, CIN, Socials) | **YES** | Standalone global record | Single row table |
| **2** | `people` | Unified directory of Leadership, Staff, Mentors, Mentees, Founders | **YES** | Many-to-Many with Projects & Startups | Resolves leadership conflicts |
| **3** | `programs` | Core incubation tracks (NewGen, MSME-BI, StartinUP, IIC-ITSEC) | **YES** | Parent to Cohorts & Activities | 5 core program tracks |
| **4** | `cohorts` | Funding/academic cycle years (`2023-24`, `2022-23`) | **YES** | Belongs to Program, Parent to Projects | Used for directory filtering |
| **5** | `newgen_projects` | Funded PoC/prototype records | **YES** | Belongs to Cohort, Many-to-Many with People | Normalizes mentee strings |
| **6** | `project_people` | Junction table mapping Mentors & Mentees to Projects | **YES** | Maps `project_id` ↔ `person_id` | Stores project role (`mentor`/`mentee`) |
| **7** | `startups` | Resident & alumni incubated companies | **YES** | Belongs to Category, Many-to-Many with Founders | Unifies 28 startup records |
| **8** | `startup_categories` | Industry vertical taxonomy (`Deep-Tech`, `Clean-Tech`, etc.) | **YES** | Parent to Startups | Admin-managed lookup |
| **9** | `facilities` | Physical labs, spaces, and co-working hubs | **YES** | Parent to Equipment & Images | 7 physical facility nodes |
| **10**| `equipment` | Lab machinery and workstation node inventory | **YES** | Belongs to Facility | 23 technical equipment items |
| **11**| `announcements` | News ticker items and competition alerts | **YES** | Standalone / Optional Program link | Time-sensitive news |
| **12**| `msme_activities` | Annual MSME incubation activity log | **YES** | Belongs to MSME Program & Cohort | Historical activity history |
| **13**| `msme_hackathons` | MSME Hackathon chapters & funding results | **YES** | Belongs to MSME Program | Chapter archives (1.0 to 4.0) |
| **14**| `policies` | Downloadable institutional policy PDFs | **YES** | Standalone / Optional Program link | 6 governance documents |
| **15**| `faqs` | Categorized Q&A items | **YES** | Classified by page/category | 16 Q&A pairs |
| **16**| `testimonials` | Founder success quotes and outcome metrics | **YES** | Linked to Startup / Person | 3 metric-led quotes |

---

## 16. What Should NOT Become Tables

1. **WebGL & Canvas Configuration**: Shaders, camera FOV, friction, and mesh geometries in `Stack.jsx`. (Pure UI rendering code).
2. **Tailwind CSS Utility Classes**: UI layout tokens and font sizes. (Presentation layer styling).
3. **Static Vision/Mission Text**: Corporate prose paragraphs in `AboutPage.jsx`. (Rarely updated editorial copy).
4. **Calculated Statistics**: `"150+ Startups"`, `"₹2.87 Crore"`. (Easily computed dynamically via SQL queries).

---

## 17. Data Model Risks Identified

### 1. CRITICAL: Unnormalized Comma-Separated Mentees
* **Risk**: `newgenProjects.js` stores mentees as a raw string (`mentee: "Person A, Person B"`).
* **Impact**: Violates 1NF, prevents linking mentees to person profiles, and breaks mentee search filters.
* **Remediation**: Parse and split mentee strings into individual `people` records mapped via `project_people`.

### 2. HIGH: Contradictory Executive Leadership Data
* **Risk**: `LandingPage.jsx` and `AboutPage.jsx` name completely different individuals for Chairman, Director, and Advisor.
* **Impact**: Creates confusion and presents conflicting information to site visitors.
* **Remediation**: Establish a single canonical `people` table where leadership roles are managed centrally.

### 3. HIGH: Hardcoded Asset References in Data Files
* **Risk**: Images in `newgenProjects.js` and `PortfolioPage.jsx` use static ES module imports (`import logo from '../assets/...'`).
* **Impact**: Database URLs cannot directly reference local JavaScript variable imports.
* **Remediation**: Upload asset files to Supabase Storage buckets and store public URL strings (`https://.../storage/v1/object/public/...`) in the database.

---

## 18. Final Stage 2.1 Summary

```text
NAVRACHNA STAGE 2.1
ENTITY NORMALIZATION REPORT

Confirmed Entities: 16
Candidate Entities: 20
Entities to Merge: Leadership, Staff, Mentors, Mentees ➔ unified 'people' entity
Entities to Split: Facilities ➔ Facilities + Equipment; MSME ➔ Activities + Hackathons
Major Duplications: Executive Leadership (2 files) & Portfolio Startups (3 files)
Major Data Conflicts: Chairman, Director, and Advisor names contradict between LandingPage & AboutPage
Major Relationships: Program ➔ Cohort ➔ Project ↔ People (N:M) ↔ Startup
Taxonomies: startup_categories, patent_statuses, person_roles, policy_categories
Global Settings: 1 Centralized Site Settings entity (Phone, Email, Address, CIN, Socials)
Derived Data: Total Startups (150+), Total Projects (40+), Total Grants (₹2.87 Cr)
Keep in Code: WebGL shaders, Canvas math, Tailwind tokens, static vision/mission copy

Most Important Normalization Problem: Comma-separated 'mentee' string in newgenProjects.js
Most Important Relationship: Project ↔ People (Mentors & Mentees junction)
Most Important Data Conflict: Executive Leadership names contradiction (LandingPage vs AboutPage)

Recommended Conceptual Entity Model:
1. site_settings
2. people
3. programs
4. cohorts
5. newgen_projects
6. project_people (junction)
7. startups
8. startup_categories
9. facilities
10. equipment
11. msme_activities
12. msme_hackathons
13. announcements
14. policies
15. faqs
16. testimonials

Ready for Stage 2.2 Schema Design: YES

Reason: Conceptual entity boundaries, field structures, cardinalities, data conflicts, and normalization requirements have been fully audited and established across the codebase.
```
