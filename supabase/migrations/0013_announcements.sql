-- Migration: 0013_announcements.sql
-- Description: Create announcements table for public bulletins and news ticker updates.

CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NULL REFERENCES public.programs(id) ON DELETE SET NULL,
    tag TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    external_url TEXT NULL,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    status public.lifecycle_status_type NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.announcements IS 'Time-sensitive public announcements, news ticker bulletins, and competition notices.';
