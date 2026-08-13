-- Migration: 0011_facilities.sql
-- Description: Create facilities table for physical labs, coworking spaces, and hubs.

CREATE TABLE IF NOT EXISTS public.facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NULL,
    cover_image_url TEXT NULL,
    specs_summary JSONB NULL DEFAULT '{}'::jsonb,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.facilities IS 'Physical labs, coworking spaces, and prototyping hubs.';
