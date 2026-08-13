-- Migration: 0014_msme_activities.sql
-- Description: Create msme_activities child table for annual MSME incubation activity logs.

CREATE TABLE IF NOT EXISTS public.msme_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NULL REFERENCES public.cohorts(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    activity_date DATE NULL,
    participants_count INT NULL,
    summary TEXT NOT NULL,
    images TEXT[] NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.msme_activities IS 'Annual MSME events, workshops, and awareness drives.';
