-- Migration: 0008_project_people.sql
-- Description: Create project_people junction table mapping Mentors and Mentees to NewGen Projects (1NF normalized).

CREATE TABLE IF NOT EXISTS public.project_people (
    project_id UUID NOT NULL REFERENCES public.newgen_projects(id) ON DELETE CASCADE,
    person_id UUID NOT NULL REFERENCES public.people(id) ON DELETE RESTRICT,
    role_in_project TEXT NOT NULL CHECK (role_in_project IN ('mentor', 'mentee')),
    display_order INT NOT NULL DEFAULT 0,
    PRIMARY KEY (project_id, person_id, role_in_project)
);

COMMENT ON TABLE public.project_people IS 'Junction mapping Mentors and Mentees to NewGen projects (normalizes comma-separated mentees).';
