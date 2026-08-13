-- Migration: 0016_policies.sql
-- Description: Create policies table for downloadable governance policy PDFs.

CREATE TABLE IF NOT EXISTS public.policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT NULL,
    effective_date DATE NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.policies IS 'Institutional governance, IPR, and incubation policy PDF documents.';
