-- Migration: 0018_testimonials.sql
-- Description: Create testimonials table for metric-led founder quotes and success stories.

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_id UUID NULL REFERENCES public.startups(id) ON DELETE SET NULL,
    person_id UUID NULL REFERENCES public.people(id) ON DELETE SET NULL,
    founder_name TEXT NOT NULL,
    startup_name TEXT NOT NULL,
    quote TEXT NOT NULL,
    metric_highlight TEXT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.testimonials IS 'Founder quotes, startup testimonials, and success metrics.';
