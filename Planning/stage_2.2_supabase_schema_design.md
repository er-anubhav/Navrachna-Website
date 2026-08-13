# Stage 2.2: Supabase PostgreSQL Schema Design

**Project**: Navrachna Website  
**Repository Path**: `/home/anubhavtripathi/Documents/Projects/NFED Project/Navrachnawebsite`  
**Audit Date**: August 14, 2026  
**Auditor**: Senior Full-Stack Lead Engineer  

---

## 1. Starting Point & Re-evaluation of Stage 2.1 Entities

The conceptual model from Stage 2.1 (`site_settings`, `people`, `programs`, `cohorts`, `newgen_projects`, `project_people`, `startups`, `startup_categories`, `facilities`, `equipment`, `announcements`, `msme_activities`, `msme_hackathons`, `policies`, `faqs`, `testimonials`) was re-evaluated against relational normalization rules (1NF, 2NF, 3NF), PostgreSQL performance practices, and the Navrachna codebase.

### Deviations & Architectural Decisions
1. **Introduced `startup_founders` Junction Table**: In Stage 2.1, startups were conceptually linked to people. In PostgreSQL, a dedicated `startup_founders` junction table (`startup_id`, `person_id`, `role_title`, `founder_order`) is required to support startups with multiple co-founders without storing comma-separated strings.
2. **Unified `people` Table with `roles text[]`**: Instead of separate tables for leadership, mentors, mentees, and staff, a single `people` table with a PostgreSQL array column `roles text[]` is used. A person can hold multiple roles (e.g. `['leadership', 'mentor']`) simultaneously.
3. **Structured `cohorts` Table Linked to `programs`**: Cohorts (`2023-24`, `2022-23`) represent program-specific cycles (foreign key `program_id`). NewGen projects link directly to `cohort_id`.
4. **Child Table `facility_equipment`**: Equipment items link directly to parent `facility_id` with `ON DELETE CASCADE`.
5. **Array Column `equipment_images text[]`**: Avoided creating a separate `equipment_images` table by using PostgreSQL's native `text[]` for image URLs, keeping the schema clean and non-overengineered.

---

## 2. Recommended Final Production Table List

| # | Table Name | Purpose | Type | Why It Exists |
| :-: | :--- | :--- | :--- | :--- |
| **1** | `site_settings` | Global institutional metadata & contact details | GLOBAL CONFIG | Centralizes Phone, Email, Address, CIN, and Social Handles (single-row table). |
| **2** | `people` | Canonical directory of individuals | CORE ENTITY | Unifies Leadership, Staff, Mentors, Mentees, and Founders into one queryable entity. |
| **3** | `programs` | Core incubation tracks & schemes | CORE ENTITY | Represents NewGen-IEDC, MSME-BI, StartinUP, IIC-ITSEC, and Kartavyam. |
| **4** | `cohorts` | Fiscal/academic cycle years | CORE ENTITY | Groups projects and activities by funding cycle (`2023-24`, `2022-23`). |
| **5** | `newgen_projects` | Funded PoC and prototype project directory | CORE ENTITY | Stores 40+ DST prototype records with patent, expenditure, and status data. |
| **6** | `project_people` | Maps Mentors and Mentees to Projects | JUNCTION | Normalizes mentee strings into 1NF; links `project_id` ↔ `person_id`. |
| **7** | `startups` | Resident and alumni incubated companies | CORE ENTITY | Stores 28 portfolio companies, descriptions, websites, and logos. |
| **8** | `startup_categories` | Industry vertical taxonomy | LOOKUP / TAXONOMY | Stores sectors (`Deep-Tech`, `Clean-Tech`, `Agri-Tech`, `Health-Tech`, `Ed-Tech`). |
| **9** | `startup_founders` | Maps Founders to Startups | JUNCTION | Links `startup_id` ↔ `person_id` with founder order and custom titles. |
| **10**| `facilities` | Physical labs, coworking spaces, and hubs | CORE ENTITY | Stores 7 physical facility nodes with specs and cover images. |
| **11**| `facility_equipment` | Lab equipment and hardware inventory | CHILD / DETAIL | Stores 23 specialized machines, compute nodes, and 3D printers per lab. |
| **12**| `announcements` | Public bulletins & news ticker items | CORE ENTITY | Stores time-sensitive announcements with publishing status and expiry. |
| **13**| `msme_activities` | Historical MSME incubation activities | CHILD / DETAIL | Logs annual events, workshops, and awareness drives linked to MSME program. |
| **14**| `msme_hackathons` | MSME Hackathon chapters & sanctioned ideas | CHILD / DETAIL | Stores Hackathon 1.0–4.0 chapter budgets, approved ideas, and results. |
| **15**| `policies` | Downloadable institutional governance PDFs | CORE ENTITY | Stores IPR, Incubation, and Code of Conduct document metadata and file URLs. |
| **16**| `faqs` | Categorized Q&A pairs | CORE ENTITY | Stores 16 Q&As tagged by page context (`general`, `startinup`, `msme`, `services`). |
| **17**| `testimonials` | Founder quotes & success metrics | CORE ENTITY | Stores metric-led founder testimonials linked optionally to startups. |

---

## 3. Table-by-Table Schema Definitions

### 1. TABLE: `site_settings`
**Purpose**: Stores single-row global configuration parameters for the Navrachna portal.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Unique record identifier.
org_name (text, NOT NULL, DEFAULT 'Navrachna Foundation for Entrepreneurship Development') — Legal organization name.
parent_org (text, NOT NULL, DEFAULT 'I.T.S Engineering College, Greater Noida') — Aegis organization name.
cin_number (text, NOT NULL, DEFAULT 'U73200UP2020NPL128831') — Corporate Identification Number.
contact_phone (text, NOT NULL, DEFAULT '+91 9540527700') — Primary contact phone number.
contact_email (text, NOT NULL, DEFAULT 'head.nfed@its.edu.in') — Primary contact email address.
contact_address (text, NOT NULL, DEFAULT 'Plot no. 46, Knowledge Park 3, Greater Noida') — Physical location address.
google_maps_url (text, NULL) — Google Maps embed URL string.
social_links (jsonb, NOT NULL, DEFAULT '{}'::jsonb) — Social media URL mapping ({facebook, instagram, linkedin, twitter, youtube}).
hero_headline (text, NULL) — Main homepage hero headline text.
hero_subtitle (text, NULL) — Main homepage hero subtitle text.
updated_at (timestamptz, NOT NULL, DEFAULT now()) — Timestamp of last setting modification.
updated_by (uuid, NULL, REFERENCES auth.users(id)) — User ID of admin who last updated settings.
```

### 2. TABLE: `people`
**Purpose**: Central directory of leadership, operational staff, mentors, mentees, and startup founders.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
full_name (text, NOT NULL) — Person's full name (e.g. 'Dr. Surya Prasad Mishra').
title_prefix (text, NULL) — Academic/professional prefix (e.g. 'Prof. (Dr.)', 'Er.', 'Shri').
designation (text, NOT NULL) — Professional title/position (e.g. 'Chairman', 'Incubation Manager').
organization (text, NULL) — Affiliated institution (e.g. 'I.T.S Engineering College').
email (text, NULL, UNIQUE) — Email address.
phone (text, NULL) — Phone number.
photo_url (text, NULL) — Supabase Storage URL for profile photo.
bio (text, NULL) — Biography/quote message.
roles (text[], NOT NULL, DEFAULT '{mentee}'::text[]) — Array of assigned roles ('leadership', 'staff', 'mentor', 'mentee', 'founder').
display_order (integer, NOT NULL, DEFAULT 0) — Sorting order for leadership/team grid displays.
is_active (boolean, NOT NULL, DEFAULT true) — Active status flag.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
updated_at (timestamptz, NOT NULL, DEFAULT now()) — Update timestamp.
```

### 3. TABLE: `programs`
**Purpose**: Core incubation tracks and flagship government schemes.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
slug (text, NOT NULL, UNIQUE) — Public URL slug (e.g. 'newgen-iedc', 'msme-bi', 'startinup').
title (text, NOT NULL) — Program name (e.g. 'NewGen Innovation & Entrepreneurship Development Centre').
short_name (text, NOT NULL) — Abbreviated title (e.g. 'NewGen-IEDC').
summary (text, NOT NULL) — Short program summary.
description (text, NULL) — Detailed multi-paragraph program markdown/html.
grant_amount (text, NULL) — Funding ceiling label (e.g. 'Up to Rs. 2.5 Lakhs per project').
accent_color (text, NULL) — Tailwind gradient accent class (e.g. 'from-amber-100 to-orange-50').
bullets (text[], NULL) — High-level feature points.
logo_url (text, NULL) — Official program badge/logo image URL.
display_order (integer, NOT NULL, DEFAULT 0) — Display sequence order.
is_active (boolean, NOT NULL, DEFAULT true) — Active status flag.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
updated_at (timestamptz, NOT NULL, DEFAULT now()) — Update timestamp.
```

### 4. TABLE: `cohorts`
**Purpose**: Academic and fiscal cycle years attached to programs.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
program_id (uuid, NOT NULL, REFERENCES programs(id) ON DELETE CASCADE) — Foreign key to parent program.
year_label (text, NOT NULL) — Cycle label (e.g. '2023-24', '2022-23').
start_date (date, NULL) — Cohort start date.
end_date (date, NULL) — Cohort end date.
is_active (boolean, NOT NULL, DEFAULT true) — Whether cohort is currently active for applications.
display_order (integer, NOT NULL, DEFAULT 0) — Sort order for cohort selection tabs.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
CONSTRAINT cohorts_program_year_key UNIQUE (program_id, year_label) — Unique cycle per program.
```

### 5. TABLE: `newgen_projects`
**Purpose**: Technology prototype projects funded under the NewGen-IEDC scheme.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
cohort_id (uuid, NOT NULL, REFERENCES cohorts(id) ON DELETE RESTRICT) — Foreign key to funding cohort.
slug (text, NOT NULL, UNIQUE) — Public URL slug derived from title.
title (text, NOT NULL) — Project title.
description (text, NULL) — Comprehensive project description.
patent_status (text, NOT NULL, DEFAULT 'NA') — Patent status ('Filed', 'Published', 'Granted', 'NA').
patent_id (text, NULL) — Official patent application/registration ID.
expenditure (numeric(12,2), NOT NULL, DEFAULT 0.00) — Total sanctioned expenditure in INR.
image_url (text, NULL) — Supabase Storage URL for project prototype image.
category_label (text, NULL) — Cohort category label (e.g. 'NewGen Projects 2023-24').
is_featured (boolean, NOT NULL, DEFAULT false) — Featured project flag.
status (text, NOT NULL, DEFAULT 'published') — Lifecycle state ('draft', 'published', 'archived').
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
updated_at (timestamptz, NOT NULL, DEFAULT now()) — Update timestamp.
```

### 6. TABLE: `project_people` (Junction Table)
**Purpose**: Maps Mentors and Mentees to NewGen Projects (Normalizes mentee strings into 1NF).

```text
project_id (uuid, NOT NULL, REFERENCES newgen_projects(id) ON DELETE CASCADE) — FK to project.
person_id (uuid, NOT NULL, REFERENCES people(id) ON DELETE RESTRICT) — FK to person.
role_in_project (text, NOT NULL) — Role designation ('mentor', 'mentee').
display_order (integer, NOT NULL, DEFAULT 0) — Sequence order among team members.
PRIMARY KEY (project_id, person_id, role_in_project) — Composite Primary Key.
```

### 7. TABLE: `startups`
**Purpose**: Resident and alumni incubated startup ventures.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
category_id (uuid, NULL, REFERENCES startup_categories(id) ON DELETE SET NULL) — FK to industry sector.
slug (text, NOT NULL, UNIQUE) — Public URL slug.
name (text, NOT NULL) — Startup company name.
legal_name (text, NULL) — Full registered legal name (e.g. 'Digiera Private Limited').
logo_url (text, NOT NULL) — Supabase Storage URL for startup logo.
website_url (text, NULL) — Company website URL.
description (text, NULL) — Startup elevator pitch / business summary.
incubation_status (text, NOT NULL, DEFAULT 'incubated') — Status ('incubated', 'graduated', 'alumni').
cohort_year (text, NULL) — Incubation intake cohort.
is_featured (boolean, NOT NULL, DEFAULT false) — Featured marquee logo flag.
display_order (integer, NOT NULL, DEFAULT 0) — Sorting order.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
updated_at (timestamptz, NOT NULL, DEFAULT now()) — Update timestamp.
```

### 8. TABLE: `startup_categories`
**Purpose**: Industry vertical taxonomy lookup table.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
slug (text, NOT NULL, UNIQUE) — Public URL slug (e.g. 'deep-tech', 'clean-tech').
name (text, NOT NULL, UNIQUE) — Category display name ('Deep-Tech', 'Clean-Tech', 'Agri-Tech', 'Health-Tech', 'Ed-Tech').
description (text, NULL) — Sector description.
display_order (integer, NOT NULL, DEFAULT 0) — Sorting order.
```

### 9. TABLE: `startup_founders` (Junction Table)
**Purpose**: Maps Founders to Startup Companies.

```text
startup_id (uuid, NOT NULL, REFERENCES startups(id) ON DELETE CASCADE) — FK to startup.
person_id (uuid, NOT NULL, REFERENCES people(id) ON DELETE RESTRICT) — FK to person.
role_title (text, NULL, DEFAULT 'Co-Founder') — Founder role title (e.g. 'Founder & CEO').
founder_order (integer, NOT NULL, DEFAULT 0) — Sequence order among founders.
PRIMARY KEY (startup_id, person_id) — Composite Primary Key.
```

### 10. TABLE: `facilities`
**Purpose**: Physical labs, coworking spaces, and incubation infrastructure hubs.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
slug (text, NOT NULL, UNIQUE) — Public URL slug (e.g. 'electronics-labs', 'high-end-computers', '3d-printing').
title (text, NOT NULL) — Facility name (e.g. 'Electronics & PCB Design Lab').
summary (text, NOT NULL) — Short overview summary.
description (text, NULL) — Detailed multi-paragraph description.
cover_image_url (text, NULL) — Supabase Storage URL for main facility photo.
specs_summary (jsonb, NULL, DEFAULT '{}'::jsonb) — High-level specs summary key-value pairs.
display_order (integer, NOT NULL, DEFAULT 0) — Display sequence order.
is_active (boolean, NOT NULL, DEFAULT true) — Active status flag.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
updated_at (timestamptz, NOT NULL, DEFAULT now()) — Update timestamp.
```

### 11. TABLE: `facility_equipment`
**Purpose**: Specialized hardware, machinery, and workstation compute nodes housed in facilities.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
facility_id (uuid, NOT NULL, REFERENCES facilities(id) ON DELETE CASCADE) — Foreign key to parent facility.
name (text, NOT NULL) — Equipment machine name (e.g. 'FDM Industrial 3D Printer').
model_number (text, NULL) — Machine model/serial specification.
specifications (text, NOT NULL) — Detailed technical specifications.
quantity (integer, NOT NULL, DEFAULT 1) — Equipment unit count.
equipment_images (text[], NULL) — Array of Supabase Storage photo URLs.
display_order (integer, NOT NULL, DEFAULT 0) — Sorting order within lab page.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
```

### 12. TABLE: `announcements`
**Purpose**: Time-sensitive news ticker bulletins and competition announcements.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
program_id (uuid, NULL, REFERENCES programs(id) ON DELETE SET NULL) — Optional link to program.
tag (text, NOT NULL) — Announcement badge tag ('Competition', 'MSME Hackathon', 'Incubation', 'Notice').
title (text, NOT NULL) — Announcement headline.
content (text, NOT NULL) — Detailed announcement body text.
external_url (text, NULL) — Optional registration/application URL link.
published_at (timestamptz, NOT NULL, DEFAULT now()) — Publishing start date.
expires_at (timestamptz, NULL) — Expiration timestamp (auto-hides after expiry).
is_featured (boolean, NOT NULL, DEFAULT false) — Ticker feature flag.
status (text, NOT NULL, DEFAULT 'published') — Lifecycle state ('draft', 'published', 'archived').
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
updated_at (timestamptz, NOT NULL, DEFAULT now()) — Update timestamp.
```

### 13. TABLE: `msme_activities`
**Purpose**: Annual MSME incubation activity and workshop logs.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
cohort_id (uuid, NULL, REFERENCES cohorts(id) ON DELETE SET NULL) — FK to fiscal year cohort.
title (text, NOT NULL) — Activity/event title.
activity_date (date, NULL) — Date of activity.
participants_count (integer, NULL) — Number of attendees/participants.
summary (text, NOT NULL) — Event summary description.
images (text[], NULL) — Array of activity photo URLs.
display_order (integer, NOT NULL, DEFAULT 0) — Display sequence order.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
```

### 14. TABLE: `msme_hackathons`
**Purpose**: MSME Hackathon chapters, sanctioned idea counts, and funding budgets.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
chapter_name (text, NOT NULL) — Chapter name (e.g. 'MSME Idea Hackathon 3.0').
year_label (text, NOT NULL) — Funding year (e.g. '2023-24').
grant_per_idea (numeric(12,2), NOT NULL, DEFAULT 1500000.00) — Maximum grant per idea in INR.
ideas_approved (integer, NOT NULL, DEFAULT 0) — Count of approved ideas/startups.
total_sanctioned_budget (numeric(14,2), NOT NULL, DEFAULT 0.00) — Total chapter budget in INR.
summary (text, NULL) — Chapter overview text.
status (text, NOT NULL, DEFAULT 'completed') — Status ('upcoming', 'active', 'completed').
display_order (integer, NOT NULL, DEFAULT 0) — Sequence order.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
```

### 15. TABLE: `policies`
**Purpose**: Institutional governance PDFs and downloadable policy documents.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
slug (text, NOT NULL, UNIQUE) — Public URL slug.
title (text, NOT NULL) — Policy document title (e.g. 'IPR Policy & Guidelines').
category (text, NOT NULL) — Document category ('IPR', 'Incubation', 'Governance', 'Seed Grant').
summary (text, NOT NULL) — Policy executive summary.
file_url (text, NOT NULL) — Supabase Storage PDF document URL.
file_size_bytes (bigint, NULL) — PDF file size in bytes.
effective_date (date, NULL) — Policy enforcement date.
is_active (boolean, NOT NULL, DEFAULT true) — Active policy flag.
display_order (integer, NOT NULL, DEFAULT 0) — Display sequence order.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
```

### 16. TABLE: `faqs`
**Purpose**: Categorized question-and-answer items.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
page_context (text, NOT NULL, DEFAULT 'general') — Context tag ('general', 'startinup', 'msme', 'services', 'contact').
category (text, NULL) — Sub-category grouping.
question (text, NOT NULL) — Frequently asked question string.
answer (text, NOT NULL) — Answer body text.
display_order (integer, NOT NULL, DEFAULT 0) — Sequence order within context.
is_active (boolean, NOT NULL, DEFAULT true) — Active status flag.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
```

### 17. TABLE: `testimonials`
**Purpose**: Metric-led founder quotes and success stories.

```text
id (uuid, NOT NULL, DEFAULT gen_random_uuid(), PRIMARY KEY) — Internal primary key.
startup_id (uuid, NULL, REFERENCES startups(id) ON DELETE SET NULL) — Optional link to startup.
person_id (uuid, NULL, REFERENCES people(id) ON DELETE SET NULL) — Optional link to founder.
founder_name (text, NOT NULL) — Founder name.
startup_name (text, NOT NULL) — Startup name.
quote (text, NOT NULL) — Testimonial quote text.
metric_highlight (text, NULL) — Outcome metric tag (e.g. '6 weeks to first pilot').
display_order (integer, NOT NULL, DEFAULT 0) — Display sequence order.
is_active (boolean, NOT NULL, DEFAULT true) — Active status flag.
created_at (timestamptz, NOT NULL, DEFAULT now()) — Creation timestamp.
```

---

## 4. Preservation Mapping of All Existing Data Fields

| Current Code File | Current Field Name | Proposed Table | Proposed Column | Transformation & Migration Plan |
| :--- | :--- | :--- | :--- | :--- |
| `newgenProjects.js` | `title` | `newgen_projects` | `title` | Direct string import; auto-generate slug. |
| `newgenProjects.js` | `mentor` | `people` & `project_people` | `full_name` / `role_in_project='mentor'` | Find or create `people` record; insert junction row. |
| `newgenProjects.js` | `mentee` | `people` & `project_people` | `full_name` / `role_in_project='mentee'` | Split comma-separated string into individual people; insert junction rows. |
| `newgenProjects.js` | `patent_status` | `newgen_projects` | `patent_status` | Direct import ('Filed', 'Published', 'Granted', 'NA'). |
| `newgenProjects.js` | `patent_id` | `newgen_projects` | `patent_id` | Direct import. |
| `newgenProjects.js` | `expenditure` | `newgen_projects` | `expenditure` | Parse numeric currency string to `numeric(12,2)`. |
| `newgenProjects.js` | `description` | `newgen_projects` | `description` | Direct import. |
| `newgenProjects.js` | `category` | `cohorts` & `newgen_projects` | `year_label` / `cohort_id` | Parse cohort year ('2023-24') to link to `cohorts` record. |
| `newgenProjects.js` | `image` | `newgen_projects` | `image_url` | Upload image to Supabase Bucket `project-media/`; store public URL. |
| `PortfolioPage.jsx` | `name` | `startups` | `name` | Direct import. |
| `PortfolioPage.jsx` | `category` | `startup_categories` & `startups` | `category_id` | Map sector string to foreign key ID. |
| `PortfolioPage.jsx` | `logo` / `src` | `startups` | `logo_url` | Upload logo to Supabase Bucket `startup-logos/`; store public URL. |
| `LandingPage.jsx` | `LEADERSHIP.title` | `people` | `full_name` | Direct import; consolidate conflict with AboutPage. |
| `LandingPage.jsx` | `LEADERSHIP.role` | `people` | `designation` | Direct import. |
| `LandingPage.jsx` | `LEADERSHIP.message` | `people` | `bio` | Direct import. |
| `LandingPage.jsx` | `UPDATES.tag` | `announcements` | `tag` | Direct import. |
| `LandingPage.jsx` | `UPDATES.text` | `announcements` | `content` | Direct import. |
| `ElectronicsLabsPage.jsx` | `EQUIPMENT.name` | `facility_equipment` | `name` | Direct import linked to `electronics-labs` facility ID. |
| `ElectronicsLabsPage.jsx` | `EQUIPMENT.specs` | `facility_equipment` | `specifications` | Direct import. |
| `OurPoliciesPage.jsx` | `POLICIES.title` | `policies` | `title` | Direct import. |
| `OurPoliciesPage.jsx` | `POLICIES.file` | `policies` | `file_url` | Upload PDF to Supabase Bucket `policy-documents/`; store URL. |
| `HeaderV1.jsx` | `phone` / `email` / `CIN` | `site_settings` | `contact_phone`, `contact_email`, `cin_number` | Centralize into single `site_settings` row. |

---

## 5. Relationships & Delete Behaviors

| Parent Table | Child Table | Cardinality | Foreign Key Column | Required/Optional | On Delete Behavior | Reason |
| :--- | :--- | :-: | :--- | :--- | :--- | :--- |
| `programs` | `cohorts` | `1 : N` | `program_id` | Required | `CASCADE` | Deleting a program removes its sub-cohort cycles. |
| `cohorts` | `newgen_projects` | `1 : N` | `cohort_id` | Required | `RESTRICT` | Protects funded project records from accidental deletion of cohort. |
| `newgen_projects` | `project_people` | `1 : N` | `project_id` | Required | `CASCADE` | Deleting a project cleans up its team junction rows. |
| `people` | `project_people` | `1 : N` | `person_id` | Required | `RESTRICT` | Prevents deleting a person who is assigned as a mentor/mentee. |
| `startup_categories` | `startups` | `1 : N` | `category_id` | Optional | `SET NULL` | Deleting a category retains startups by setting sector to null. |
| `startups` | `startup_founders` | `1 : N` | `startup_id` | Required | `CASCADE` | Deleting a startup cleans up founder junction rows. |
| `people` | `startup_founders` | `1 : N` | `person_id` | Required | `RESTRICT` | Prevents deleting a person who is registered as a founder. |
| `facilities` | `facility_equipment` | `1 : N` | `facility_id` | Required | `CASCADE` | Deleting a facility removes its lab equipment inventory. |
| `programs` | `announcements` | `1 : N` | `program_id` | Optional | `SET NULL` | Announcements can exist independently of programs. |
| `cohorts` | `msme_activities` | `1 : N` | `cohort_id` | Optional | `SET NULL` | Activity records retain historical text even if cohort is removed. |

---

## 6. Supabase Storage Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SUPABASE STORAGE BUCKETS                          │
├───────────────────┬─────────────┬─────────────┬─────────────────────────────┤
│ Bucket Name       │ Public Read │ Max Size    │ Allowed File Types          │
├───────────────────┼─────────────┼─────────────┼─────────────────────────────┤
│ site-assets       │ YES         │ 10 MB       │ png, jpg, jpeg, webp, svg   │
│ people-photos     │ YES         │ 5 MB        │ png, jpg, jpeg, webp        │
│ startup-logos     │ YES         │ 5 MB        │ png, jpg, jpeg, webp, svg   │
│ facility-images   │ YES         │ 15 MB       │ png, jpg, jpeg, webp        │
│ equipment-images  │ YES         │ 10 MB       │ png, jpg, jpeg, webp        │
│ project-media     │ YES         │ 10 MB       │ png, jpg, jpeg, webp        │
│ policy-documents  │ YES         │ 25 MB       │ pdf                         │
└───────────────────┴─────────────┴─────────────┴─────────────────────────────┘
```

---

## 7. Row Level Security (RLS) & Access Control Policy

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ROW LEVEL SECURITY (RLS) MATRIX                     │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ Table Name           │ Public Read (Anon)   │ Admin Write (Authenticated)   │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ site_settings        │ SELECT (All)         │ INSERT, UPDATE, DELETE (Admin)│
│ people               │ SELECT (is_active)   │ INSERT, UPDATE, DELETE (Admin)│
│ programs             │ SELECT (is_active)   │ INSERT, UPDATE, DELETE (Admin)│
│ cohorts              │ SELECT (is_active)   │ INSERT, UPDATE, DELETE (Admin)│
│ newgen_projects      │ SELECT (published)   │ INSERT, UPDATE, DELETE (Admin)│
│ project_people       │ SELECT (All)         │ INSERT, UPDATE, DELETE (Admin)│
│ startups             │ SELECT (All)         │ INSERT, UPDATE, DELETE (Admin)│
│ startup_categories   │ SELECT (All)         │ INSERT, UPDATE, DELETE (Admin)│
│ startup_founders     │ SELECT (All)         │ INSERT, UPDATE, DELETE (Admin)│
│ facilities           │ SELECT (is_active)   │ INSERT, UPDATE, DELETE (Admin)│
│ facility_equipment   │ SELECT (All)         │ INSERT, UPDATE, DELETE (Admin)│
│ announcements        │ SELECT (published)   │ INSERT, UPDATE, DELETE (Admin)│
│ msme_activities      │ SELECT (All)         │ INSERT, UPDATE, DELETE (Admin)│
│ msme_hackathons      │ SELECT (All)         │ INSERT, UPDATE, DELETE (Admin)│
│ policies             │ SELECT (is_active)   │ INSERT, UPDATE, DELETE (Admin)│
│ faqs                 │ SELECT (is_active)   │ INSERT, UPDATE, DELETE (Admin)│
│ testimonials         │ SELECT (is_active)   │ INSERT, UPDATE, DELETE (Admin)│
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

* **Public Anonymous Access**: Unauthenticated visitors can execute `SELECT` queries on published and active rows only.
* **Administrative Access**: Admin authentication relies on Supabase Auth (`auth.uid()`). Authenticated users possessing the `admin` or `editor` role (checked via custom claims or `profiles.role`) receive full `INSERT`, `UPDATE`, and `DELETE` privileges across all tables.

---

## 8. Complete Schema Entity-Relationship Diagram

```text
                             NAVRACHNA POSTGRESQL SCHEMA
                                          │
               ┌──────────────────────────┼──────────────────────────┐
               │                          │                          │
        ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
        │site_settings │           │   programs   │           │  facilities  │
        └──────────────┘           └──────┬───────┘           └──────┬───────┘
                                          │                          │
                                        1 │ N                      1 │ N
                                          ▼                          ▼
                                   ┌──────────────┐           ┌──────────────┐
                                   │   cohorts    │           │  equipment   │
                                   └──────┬───────┘           └──────────────┘
                                          │
                                        1 │ N
                                          ▼
                                   ┌──────────────┐
                                   │newgen_projects│
                                   └──────┬───────┘
                                          │
                                        N │ (Junction)
                                          ▼
┌──────────────┐   (Junction) N   ┌──────────────┐   (Junction) N   ┌──────────────┐
│   startups   │ ◄───────────────►│project_people│ ◄───────────────►│ announcements│
└──────┬───────┘                  └──────┬───────┘                  └──────────────┘
       │                                 │
       │ N                               │ N
       ▼                                 ▼
┌──────────────┐                  ┌──────────────┐                  ┌──────────────┐
│ startup_cats │                  │    people    │                  │   policies   │
└──────────────┘                  └──────────────┘                  └──────────────┘
```

---

## 9. Final Schema Summary & Metrics

| # | Table Name | Type | Primary Key | Key Foreign Keys | Purpose |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `site_settings` | Global Config | `id` (uuid) | `updated_by` ➔ `auth.users` | Centralized site contact & identity |
| 2 | `people` | Core Entity | `id` (uuid) | — | Leadership, Staff, Mentors, Mentees |
| 3 | `programs` | Core Entity | `id` (uuid) | — | Incubation tracks (NewGen, MSME, etc.) |
| 4 | `cohorts` | Core Entity | `id` (uuid) | `program_id` ➔ `programs` | Fiscal funding cycle years |
| 5 | `newgen_projects` | Core Entity | `id` (uuid) | `cohort_id` ➔ `cohorts` | Funded PoC/prototype records |
| 6 | `project_people` | Junction | (`project_id`, `person_id`, `role_in_project`) | `project_id`, `person_id` | Mentors & Mentees assignment |
| 7 | `startups` | Core Entity | `id` (uuid) | `category_id` ➔ `startup_categories` | Portfolio startup companies |
| 8 | `startup_categories` | Taxonomy | `id` (uuid) | — | Industry sector lookup |
| 9 | `startup_founders` | Junction | (`startup_id`, `person_id`) | `startup_id`, `person_id` | Startup founders assignment |
| 10 | `facilities` | Core Entity | `id` (uuid) | — | Physical labs & spaces |
| 11 | `facility_equipment` | Child / Detail | `id` (uuid) | `facility_id` ➔ `facilities` | Lab machinery & compute specs |
| 12 | `announcements` | Core Entity | `id` (uuid) | `program_id` ➔ `programs` | Time-sensitive news bulletins |
| 13 | `msme_activities` | Child / Detail | `id` (uuid) | `cohort_id` ➔ `cohorts` | Annual MSME event logs |
| 14 | `msme_hackathons` | Child / Detail | `id` (uuid) | — | MSME Hackathon chapters |
| 15 | `policies` | Core Entity | `id` (uuid) | — | Governance policy PDFs |
| 16 | `faqs` | Core Entity | `id` (uuid) | — | Categorized Q&A pairs |
| 17 | `testimonials` | Core Entity | `id` (uuid) | `startup_id`, `person_id` | Metric-led founder quotes |

```text
SCHEMA METRICS:
Total Tables: 17
Core Tables: 8
Junction Tables: 2
Child / Detail Tables: 4
Global Config Tables: 1
Lookup / Taxonomy Tables: 2

Total Relationships: 14
Total N:M Relationships: 2 (project_people, startup_founders)
Public Read Tables: 17 (Filtered by is_active / status = 'published')
Storage Buckets Required: 7

Highest Migration Risk: Mentee string parsing in newgenProjects.js ➔ project_people
Biggest Normalization Win: Eliminating leadership conflicts and 1NF string splitting
```

---

## 10. Stage 2.2 Final Recommendation

### Is this schema ready for SQL Implementation (Stage 2.3)?
**YES**

### Recommended Execution Order for SQL Migration (Stage 2.3):
1. Create Custom PostgreSQL ENUMs & Utility Functions (`update_updated_at_column()`).
2. Create Table 1: `site_settings`
3. Create Table 2: `people`
4. Create Table 3: `startup_categories`
5. Create Table 4: `programs`
6. Create Table 5: `cohorts`
7. Create Table 6: `newgen_projects`
8. Create Table 7: `project_people`
9. Create Table 8: `startups`
10. Create Table 9: `startup_founders`
11. Create Table 10: `facilities`
12. Create Table 11: `facility_equipment`
13. Create Table 12: `announcements`
14. Create Table 13: `msme_activities`
15. Create Table 14: `msme_hackathons`
16. Create Table 15: `policies`
17. Create Table 16: `faqs`
18. Create Table 17: `testimonials`
19. Enable RLS and apply Public Read & Admin Write Security Policies across all 17 tables.
20. Provision Supabase Storage Buckets and Access Policies.
