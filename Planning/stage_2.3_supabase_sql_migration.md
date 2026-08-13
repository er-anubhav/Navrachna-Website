# Stage 2.3: Supabase SQL Migration Implementation Report

**Project**: Navrachna Website  
**Repository Path**: `/home/anubhavtripathi/Documents/Projects/NFED Project/Navrachnawebsite`  
**Audit Date**: August 14, 2026  
**Auditor**: Senior Full-Stack Lead Engineer  

---

## 1. Migration Files Created

A complete, dependency-ordered migration pipeline of 23 SQL files has been created inside `supabase/migrations/`:

| # | Migration File Name | Target Object / Purpose |
| :-: | :--- | :--- |
| **0001** | `0001_extensions_and_enums.sql` | `pgcrypto` extension, `update_updated_at_column()` function, 5 custom ENUM types. |
| **0002** | `0002_site_settings.sql` | `site_settings` single-row global configuration table. |
| **0003** | `0003_people.sql` | `people` directory table (Leadership, Staff, Mentors, Mentees, Founders). |
| **0004** | `0004_startup_categories.sql` | `startup_categories` industry vertical taxonomy table. |
| **0005** | `0005_programs.sql` | `programs` core incubation tracks table. |
| **0006** | `0006_cohorts.sql` | `cohorts` funding cycle years table. |
| **0007** | `0007_newgen_projects.sql` | `newgen_projects` prototype project directory table. |
| **0008** | `0008_project_people.sql` | `project_people` junction table mapping Mentors & Mentees to Projects. |
| **0009** | `0009_startups.sql` | `startups` portfolio companies table. |
| **0010** | `0010_startup_founders.sql` | `startup_founders` junction table mapping Founders to Startups. |
| **0011** | `0011_facilities.sql` | `facilities` physical labs and workspace hubs table. |
| **0012** | `0012_facility_equipment.sql` | `facility_equipment` child hardware & 3D printer inventory table. |
| **0013** | `0013_announcements.sql` | `announcements` public news ticker & bulletin table. |
| **0014** | `0014_msme_activities.sql` | `msme_activities` annual event log table. |
| **0015** | `0015_msme_hackathons.sql` | `msme_hackathons` hackathon chapter archives table. |
| **0016** | `0016_policies.sql` | `policies` governance policy PDF document metadata table. |
| **0017** | `0017_faqs.sql` | `faqs` categorized Q&A table. |
| **0018** | `0018_testimonials.sql` | `testimonials` founder quotes and success metrics table. |
| **0019** | `0019_indexes.sql` | Performance B-tree indexes for FK joins, public slugs, status filters, and display ordering. |
| **2020** | `0020_triggers.sql` | Automatic `updated_at` timestamp triggers attached to core tables. |
| **0021** | `0021_rls.sql` | `admin_users` table, `is_admin_or_editor()` security definer function, and RLS policies across all 17 tables. |
| **0022** | `0022_storage.sql` | Provisions 7 Supabase Storage Buckets and storage security access policies. |
| **0023** | `0023_seed_reference_data.sql` | Seed bootstrap lookup records (`site_settings`, `startup_categories`, `programs`). |

---

## 2. Schema Implementation Summary

```text
IMPLEMENTATION SUMMARY

Total Application Tables: 17
System Security Tables: 1 (admin_users)
Custom ENUM Types: 5 (app_role, patent_status_type, lifecycle_status_type, incubation_status_type, hackathon_status_type)
Junction Tables (N:M): 2 (project_people, startup_founders)
Child / Detail Tables: 4 (facility_equipment, msme_activities, msme_hackathons, faqs)
Global Settings Table: 1 (site_settings)
Taxonomy Tables: 2 (startup_categories, testimonials)

Primary Key Standard: UUID (gen_random_uuid()) across all entities except site_settings (INT PRIMARY KEY DEFAULT 1)
Financial Storage: NUMERIC(12,2) for grants and expenditure
Timestamp Standard: TIMESTAMPTZ WITH TIME ZONE DEFAULT NOW()
```

---

## 3. Key Constraints & Delete Behaviors

| Source Table | Foreign Key | Target Table | On Delete | Constraint Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `cohorts` | `program_id` | `programs` | `CASCADE` | Removing a program purges its sub-cohort cycles. |
| `newgen_projects` | `cohort_id` | `cohorts` | `RESTRICT` | Protects funded projects from accidental cohort deletion. |
| `project_people` | `project_id` | `newgen_projects` | `CASCADE` | Deleting a project cleans up team junction rows. |
| `project_people` | `person_id` | `people` | `RESTRICT` | Protects assigned mentors/mentees from deletion. |
| `startups` | `category_id` | `startup_categories` | `SET NULL` | Removing a sector sets startup category to null. |
| `startup_founders` | `startup_id` | `startups` | `CASCADE` | Deleting a startup removes founder junction rows. |
| `startup_founders` | `person_id` | `people` | `RESTRICT` | Protects registered founders from deletion. |
| `facility_equipment` | `facility_id` | `facilities` | `CASCADE` | Deleting a lab removes its hardware inventory. |
| `announcements` | `program_id` | `programs` | `SET NULL` | Bulletins retain text if parent program is deleted. |
| `msme_activities` | `cohort_id` | `cohorts` | `SET NULL` | Activity records retain historical text if cohort is deleted. |
| `testimonials` | `startup_id` | `startups` | `SET NULL` | Quote records retain text if startup is removed. |
| `testimonials` | `person_id` | `people` | `SET NULL` | Quote records retain text if person is removed. |

---

## 4. Performance B-Tree Indexes Created

1. **Public Route Slug Indexes**: `idx_programs_slug`, `idx_newgen_projects_slug`, `idx_startups_slug`, `idx_facilities_slug`, `idx_policies_slug`.
2. **Foreign Key Join Indexes**: `idx_cohorts_program_id`, `idx_newgen_projects_cohort_id`, `idx_project_people_project_id`, `idx_project_people_person_id`, `idx_startups_category_id`, `idx_startup_founders_startup_id`, `idx_startup_founders_person_id`, `idx_facility_equipment_facility_id`, `idx_announcements_program_id`, `idx_msme_activities_cohort_id`, `idx_testimonials_startup_id`.
3. **Filtering & Ordering Indexes**: `idx_people_roles` (GIN array index), `idx_people_display_order`, `idx_newgen_projects_status_featured`, `idx_startups_status_featured`, `idx_announcements_status_pub`, `idx_faqs_context_order`.

---

## 5. Automated Timestamp Triggers

The reusable PostgreSQL function `public.update_updated_at_column()` is created and attached to `BEFORE UPDATE` events across 7 core editable tables:
- `site_settings`
- `people`
- `programs`
- `newgen_projects`
- `startups`
- `facilities`
- `announcements`

---

## 6. Row Level Security (RLS) & Authorization

### RLS Policies
RLS is explicitly enabled on all 17 application tables plus `admin_users`.
- **Public Anonymous Read**: Unauthenticated visitors are restricted to querying active and published records (`is_active = true` / `status = 'published'`). Draft, archived, and inactive records are strictly excluded from public queries.
- **Admin Management Privileges**: `is_admin_or_editor()` checks `auth.uid()` against the `admin_users` table and JWT claims. Authorized admins receive full `INSERT`, `UPDATE`, and `DELETE` access across all application tables.

---

## 7. Supabase Storage Buckets Provisioned

7 public-read storage buckets are provisioned in `0022_storage.sql` with file size and MIME-type restrictions:

1. `site-assets`: Max 10 MB (`png`, `jpg`, `webp`, `svg`)
2. `people-photos`: Max 5 MB (`png`, `jpg`, `webp`)
3. `startup-logos`: Max 5 MB (`png`, `jpg`, `webp`, `svg`)
4. `facility-images`: Max 15 MB (`png`, `jpg`, `webp`)
5. `equipment-images`: Max 10 MB (`png`, `jpg`, `webp`)
6. `project-media`: Max 10 MB (`png`, `jpg`, `webp`)
7. `policy-documents`: Max 25 MB (`pdf`)

Public `SELECT` policies allow unauthenticated viewing of stored media, while write operations (`INSERT`, `UPDATE`, `DELETE`) require `is_admin_or_editor() = true`.

---

## 8. Bootstrap Reference Data

`0023_seed_reference_data.sql` populates:
- **`site_settings`**: Single-row invariant configuration record (`id = 1`) with legal entity name, address, CIN, phone, email, and social links.
- **`startup_categories`**: 5 core industry sectors (`Deep-Tech`, `Clean-Tech`, `Agri-Tech`, `Health-Tech`, `Ed-Tech`).
- **`programs`**: 5 core incubation schemes (`NewGen-IEDC`, `MSME-BI`, `StartinUP`, `IIC-ITSEC`, `Kartavyam`).

---

## 9. Security Audit & Review

```text
SECURITY AUDIT FINDINGS

Service-Role Keys in Code: NONE (Client uses anon key VITE_SUPABASE_PUBLISHABLE_KEY)
Public Write Policies: NONE (0 tables allow anonymous INSERT, UPDATE, or DELETE)
Authenticated-User Write Vulnerability: RESOLVED (Write operations require admin role verification via is_admin_or_editor())
RLS Disabled on Tables: NONE (RLS enabled on 100% of public schema tables)
Draft Row Exposure: RESOLVED (Filtered out via RLS status = 'published' policies)
Storage Bucket Unrestricted Uploads: RESOLVED (Write access restricted to authenticated admin users)
Leadership Data Contradiction Handling: SAFELY OMITTED from seed script; to be resolved in Stage 2.4
```

---

## 10. Static Validation & Verification Results

All 23 SQL migration files, `supabase/validation.sql`, and `supabase/README.md` were statically validated for SQL syntax correctness, dependency order integrity, constraint safety, and index coverage.

```text
STATIC VALIDATION CHECKLIST

[x] All 17 approved tables defined with correct PostgreSQL types
[x] 2 Many-to-Many junction tables created (project_people, startup_founders)
[x] 1NF mentee normalization implemented via project_people
[x] Foreign key constraints and ON DELETE rules defined
[x] Automated updated_at triggers attached to 7 editable tables
[x] B-tree performance indexes created for FKs, slugs, status, and ordering
[x] RLS enabled on all 17 application tables + admin_users
[x] Public read policies enforcing status/is_active filters created
[x] Admin write policies enforcing role authorization created
[x] 7 Supabase storage buckets and storage policies defined
[x] Bootstrap reference seed data isolated from content migration
[x] Conflicting leadership data omitted from seed script
[x] validation.sql script created
[x] supabase/README.md documentation created
```

---

## 11. Final Stage 2.3 Status Statement

```text
STAGE 2.3 STATUS

SQL Generated: YES (23 migration files created in supabase/migrations/)
Validation Script: YES (supabase/validation.sql created)
Documentation: YES (supabase/README.md created)
Database Actually Executed: NO (Awaiting live Supabase CLI connection / stage 2.4)
RLS & Security Policies: FULLY DESIGNED & VALIDATED
Storage Buckets: FULLY DESIGNED & VALIDATED
Ready for Stage 2.4 Data Migration: YES
```
