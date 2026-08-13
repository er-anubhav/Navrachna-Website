-- Migration: 0010_startup_founders.sql
-- Description: Create startup_founders junction table mapping Founders to Startup Companies.

CREATE TABLE IF NOT EXISTS public.startup_founders (
    startup_id UUID NOT NULL REFERENCES public.startups(id) ON DELETE CASCADE,
    person_id UUID NOT NULL REFERENCES public.people(id) ON DELETE RESTRICT,
    role_title TEXT NULL DEFAULT 'Co-Founder',
    founder_order INT NOT NULL DEFAULT 0,
    PRIMARY KEY (startup_id, person_id)
);

COMMENT ON TABLE public.startup_founders IS 'Junction mapping Founders to Startups with custom titles and ordering.';
