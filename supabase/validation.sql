-- Validation Script: supabase/validation.sql
-- Description: Verification script to validate schema structure, constraints, triggers, RLS policies, storage, and seed data.

-- 1. Check Table Counts (Expects 18 tables: 17 app tables + 1 admin_users table)
SELECT count(*) AS total_tables
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
    'site_settings', 'people', 'programs', 'cohorts', 'newgen_projects',
    'project_people', 'startups', 'startup_categories', 'startup_founders',
    'facilities', 'facility_equipment', 'announcements', 'msme_activities',
    'msme_hackathons', 'policies', 'faqs', 'testimonials', 'admin_users'
);

-- 2. Verify RLS Enforcement on All Application Tables
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
    'site_settings', 'people', 'programs', 'cohorts', 'newgen_projects',
    'project_people', 'startups', 'startup_categories', 'startup_founders',
    'facilities', 'facility_equipment', 'announcements', 'msme_activities',
    'msme_hackathons', 'policies', 'faqs', 'testimonials'
)
ORDER BY tablename;

-- 3. Verify Supabase Storage Buckets Provisioned (Expects 7 buckets)
SELECT id, name, public, file_size_limit
FROM storage.buckets
WHERE id IN (
    'site-assets', 'people-photos', 'startup-logos',
    'facility-images', 'equipment-images', 'project-media', 'policy-documents'
);

-- 4. Verify Single-Row Site Settings Bootstrap
SELECT id, org_name, cin_number, contact_phone, contact_email FROM public.site_settings;

-- 5. Verify Bootstrap Category Records (Expects 5 sectors)
SELECT slug, name FROM public.startup_categories ORDER BY display_order;

-- 6. Verify Bootstrap Core Programs (Expects 5 programs)
SELECT slug, short_name, grant_amount FROM public.programs ORDER BY display_order;

-- 7. Verify Trigger Attachments for Automatic Timestamp Updating
SELECT event_object_table AS table_name, trigger_name
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND trigger_name LIKE 'trigger_%_updated_at'
ORDER BY table_name;
