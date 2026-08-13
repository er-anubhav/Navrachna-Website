# Supabase PostgreSQL Database & Migration Architecture

This directory contains the production database migration files, security policies, storage bucket configurations, and validation scripts for the **Navrachna Foundation for Entrepreneurship Development (NFED)** web portal.

---

## 📁 Migration Structure

All SQL migrations are stored sequentially inside `supabase/migrations/`:

| File Name | Purpose & Contents |
| :--- | :--- |
| `0001_extensions_and_enums.sql` | Enables `pgcrypto`, creates `update_updated_at_column()` function, defines custom ENUM types (`app_role`, `patent_status_type`, `lifecycle_status_type`, `incubation_status_type`, `hackathon_status_type`). |
| `0002_site_settings.sql` | `site_settings` single-row global configuration table. |
| `0003_people.sql` | `people` unified directory table (Leadership, Staff, Mentors, Mentees, Founders). |
| `0004_startup_categories.sql` | `startup_categories` industry vertical taxonomy table. |
| `0005_programs.sql` | `programs` core incubation tracks table (NewGen-IEDC, MSME-BI, StartinUP, etc.). |
| `0006_cohorts.sql` | `cohorts` funding cycles and academic year table. |
| `0007_newgen_projects.sql` | `newgen_projects` prototype projects table. |
| `0008_project_people.sql` | `project_people` junction table mapping Mentors & Mentees to Projects (1NF normalized). |
| `0009_startups.sql` | `startups` portfolio company table. |
| `0010_startup_founders.sql` | `startup_founders` junction table mapping Founders to Startups. |
| `0011_facilities.sql` | `facilities` physical lab and workspace table. |
| `0012_facility_equipment.sql` | `facility_equipment` child table for lab hardware and 3D printer inventory. |
| `0013_announcements.sql` | `announcements` public news ticker & bulletin table. |
| `0014_msme_activities.sql` | `msme_activities` annual event log table. |
| `0015_msme_hackathons.sql` | `msme_hackathons` hackathon chapters (1.0 to 4.0) table. |
| `0016_policies.sql` | `policies` governance policy PDF document metadata table. |
| `0017_faqs.sql` | `faqs` categorized Q&A table. |
| `0018_testimonials.sql` | `testimonials` founder quote and outcome metric table. |
| `0019_indexes.sql` | Performance B-tree indexes for FK joins, public slugs, status filters, and display ordering. |
| `0020_triggers.sql` | Automatic `updated_at` timestamp triggers attached to core tables. |
| `0021_rls.sql` | `admin_users` table, `is_admin_or_editor()` security definer function, and RLS policies for all 17 tables. |
| `0022_storage.sql` | Provisions 7 Supabase Storage Buckets and storage security access policies. |
| `0023_seed_reference_data.sql` | Seed bootstrap lookup records (`site_settings`, `startup_categories`, `programs`). |

---

## 🔒 Security & Authorization Model

### Row Level Security (RLS)
RLS is enabled across all 17 application tables:
- **Anonymous Public Visitors**: Granted `SELECT` permission on published and active rows only (`is_active = true` / `status = 'published'`). Drafts and archived records are hidden.
- **Administrative CMS Users**: Checked via `is_admin_or_editor()`. Authorized users possess full `INSERT`, `UPDATE`, and `DELETE` access across all tables.

### Supabase Storage Buckets (7 Total)
- `site-assets` (10 MB, Public Read, Admin Write)
- `people-photos` (5 MB, Public Read, Admin Write)
- `startup-logos` (5 MB, Public Read, Admin Write)
- `facility-images` (15 MB, Public Read, Admin Write)
- `equipment-images` (10 MB, Public Read, Admin Write)
- `project-media` (10 MB, Public Read, Admin Write)
- `policy-documents` (25 MB PDF, Public Read, Admin Write)

---

## 🚀 How to Apply Migrations

### Using Supabase CLI:
```bash
# Link project
npx supabase link --project-ref obnqhrmfbctslwoylsjq

# Apply migrations
npx supabase db push

# Validate setup
npx supabase db execute --file ./supabase/validation.sql
```
