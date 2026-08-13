-- Migration: 0009_startups.sql
-- Description: Create startups table for resident and alumni incubated companies.

CREATE TABLE IF NOT EXISTS public.startups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NULL REFERENCES public.startup_categories(id) ON DELETE SET NULL,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    legal_name TEXT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT NULL,
    description TEXT NULL,
    incubation_status public.incubation_status_type NOT NULL DEFAULT 'incubated',
    cohort_year TEXT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.startups IS 'Resident and alumni incubated startup companies.';
