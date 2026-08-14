-- Migration: 0026_update_programs_schema.sql
-- Description: Align programs table columns with generalized CMS requirements.

ALTER TABLE public.programs 
ADD COLUMN IF NOT EXISTS foundation_id UUID REFERENCES public.foundations(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'grant_scheme';

-- Populate name with title if name is null
UPDATE public.programs 
SET name = title 
WHERE name IS NULL;

-- Populate foundation_id with default root foundation ID if null
UPDATE public.programs 
SET foundation_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' 
WHERE foundation_id IS NULL;
