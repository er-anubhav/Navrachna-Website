-- Migration: 0017_faqs.sql
-- Description: Create faqs table for categorized question-and-answer pairs.

CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_context TEXT NOT NULL DEFAULT 'general',
    category TEXT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.faqs IS 'Frequently asked questions classified by page context (general, startinup, msme, services, contact).';
