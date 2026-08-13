-- Migration: 0003_people.sql
-- Description: Create people table for unified directory of leadership, staff, mentors, mentees, and founders.

CREATE TABLE IF NOT EXISTS public.people (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    title_prefix TEXT NULL,
    designation TEXT NOT NULL,
    organization TEXT NULL,
    email TEXT NULL UNIQUE,
    phone TEXT NULL,
    photo_url TEXT NULL,
    bio TEXT NULL,
    roles TEXT[] NOT NULL DEFAULT '{mentee}'::text[],
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.people IS 'Unified directory of individuals across leadership, operational team, mentors, mentees, and startup founders.';
