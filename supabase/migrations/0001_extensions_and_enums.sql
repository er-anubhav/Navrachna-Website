-- Migration: 0001_extensions_and_enums.sql
-- Description: Enable required PostgreSQL extensions, utility functions, and custom ENUM types.

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Utility Function: Automatic Updated At Timestamp Trigger Function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Custom ENUM Types
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.patent_status_type AS ENUM ('Filed', 'Published', 'Granted', 'NA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.lifecycle_status_type AS ENUM ('draft', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.incubation_status_type AS ENUM ('incubated', 'graduated', 'alumni');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.hackathon_status_type AS ENUM ('upcoming', 'active', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
