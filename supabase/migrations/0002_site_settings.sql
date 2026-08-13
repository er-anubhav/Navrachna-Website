-- Migration: 0002_site_settings.sql
-- Description: Create site_settings table for global institutional configuration (Single-row invariant).

CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    org_name TEXT NOT NULL DEFAULT 'Navrachna Foundation for Entrepreneurship Development',
    parent_org TEXT NOT NULL DEFAULT 'I.T.S Engineering College, Greater Noida',
    cin_number TEXT NOT NULL DEFAULT 'U73200UP2020NPL128831',
    contact_phone TEXT NOT NULL DEFAULT '+91 9540527700',
    contact_email TEXT NOT NULL DEFAULT 'head.nfed@its.edu.in',
    contact_address TEXT NOT NULL DEFAULT 'Plot no. 46, Knowledge Park 3, Greater Noida',
    google_maps_url TEXT NULL,
    social_links JSONB NOT NULL DEFAULT '{"facebook": "https://www.facebook.com/share/1EsxYHE9Rr/", "instagram": "https://www.instagram.com/itsec_nfed", "linkedin": "https://www.linkedin.com/company/itsec-nfed/"}'::jsonb,
    hero_headline TEXT NULL,
    hero_subtitle TEXT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
    CONSTRAINT site_settings_single_row CHECK (id = 1)
);

COMMENT ON TABLE public.site_settings IS 'Single-row global institutional metadata and contact details.';
