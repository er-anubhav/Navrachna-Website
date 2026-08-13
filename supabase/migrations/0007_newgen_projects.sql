-- Migration: 0007_newgen_projects.sql
-- Description: Create newgen_projects table for funded prototype projects.

CREATE TABLE IF NOT EXISTS public.newgen_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES public.cohorts(id) ON DELETE RESTRICT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NULL,
    patent_status public.patent_status_type NOT NULL DEFAULT 'NA',
    patent_id TEXT NULL,
    expenditure NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    image_url TEXT NULL,
    category_label TEXT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    status public.lifecycle_status_type NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.newgen_projects IS 'Technology prototype projects funded under the NewGen-IEDC scheme.';
