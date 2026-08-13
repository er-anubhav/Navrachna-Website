-- Migration: 0004_startup_categories.sql
-- Description: Create startup_categories table for industry vertical lookup taxonomy.

CREATE TABLE IF NOT EXISTS public.startup_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE,
    description TEXT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.startup_categories IS 'Lookup taxonomy for startup sectors (Deep-Tech, Clean-Tech, Agri-Tech, Health-Tech, Ed-Tech).';
