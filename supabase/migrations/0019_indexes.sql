-- Migration: 0019_indexes.sql
-- Description: Create B-tree indexes for foreign key joins, public route slugs, status filters, and ordering columns.

-- 1. Slug Unique Search Indexes
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs(slug);
CREATE INDEX IF NOT EXISTS idx_newgen_projects_slug ON public.newgen_projects(slug);
CREATE INDEX IF NOT EXISTS idx_startups_slug ON public.startups(slug);
CREATE INDEX IF NOT EXISTS idx_facilities_slug ON public.facilities(slug);
CREATE INDEX IF NOT EXISTS idx_policies_slug ON public.policies(slug);

-- 2. Foreign Key Join Indexes
CREATE INDEX IF NOT EXISTS idx_cohorts_program_id ON public.cohorts(program_id);
CREATE INDEX IF NOT EXISTS idx_newgen_projects_cohort_id ON public.newgen_projects(cohort_id);
CREATE INDEX IF NOT EXISTS idx_project_people_project_id ON public.project_people(project_id);
CREATE INDEX IF NOT EXISTS idx_project_people_person_id ON public.project_people(person_id);
CREATE INDEX IF NOT EXISTS idx_startups_category_id ON public.startups(category_id);
CREATE INDEX IF NOT EXISTS idx_startup_founders_startup_id ON public.startup_founders(startup_id);
CREATE INDEX IF NOT EXISTS idx_startup_founders_person_id ON public.startup_founders(person_id);
CREATE INDEX IF NOT EXISTS idx_facility_equipment_facility_id ON public.facility_equipment(facility_id);
CREATE INDEX IF NOT EXISTS idx_announcements_program_id ON public.announcements(program_id);
CREATE INDEX IF NOT EXISTS idx_msme_activities_cohort_id ON public.msme_activities(cohort_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_startup_id ON public.testimonials(startup_id);

-- 3. Filtering & Ordering Performance Indexes
CREATE INDEX IF NOT EXISTS idx_people_roles ON public.people USING GIN(roles);
CREATE INDEX IF NOT EXISTS idx_people_display_order ON public.people(display_order);
CREATE INDEX IF NOT EXISTS idx_newgen_projects_status_featured ON public.newgen_projects(status, is_featured);
CREATE INDEX IF NOT EXISTS idx_startups_status_featured ON public.startups(incubation_status, is_featured);
CREATE INDEX IF NOT EXISTS idx_announcements_status_pub ON public.announcements(status, published_at);
CREATE INDEX IF NOT EXISTS idx_faqs_context_order ON public.faqs(page_context, display_order);
