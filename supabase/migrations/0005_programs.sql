-- Migration: 0005_programs.sql
-- Description: Create programs table for core incubation tracks and flagship government schemes.

CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    short_name TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NULL,
    grant_amount TEXT NULL,
    accent_color TEXT NULL,
    bullets TEXT[] NULL,
    logo_url TEXT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.programs IS 'Core incubation tracks (NewGen-IEDC, MSME-BI, StartinUP, IIC-ITSEC, Kartavyam).';
