-- Migration: 0015_msme_hackathons.sql
-- Description: Create msme_hackathons child table for MSME Hackathon chapters and funding results.

CREATE TABLE IF NOT EXISTS public.msme_hackathons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_name TEXT NOT NULL,
    year_label TEXT NOT NULL,
    grant_per_idea NUMERIC(12,2) NOT NULL DEFAULT 1500000.00,
    ideas_approved INT NOT NULL DEFAULT 0,
    total_sanctioned_budget NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    summary TEXT NULL,
    status public.hackathon_status_type NOT NULL DEFAULT 'completed',
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.msme_hackathons IS 'MSME Hackathon chapter archives (1.0 to 4.0), budgets, and approved ideas.';
