-- Migration: 0028_program_sections_config.sql
-- Description: Add sections_config JSONB column to programs table for dynamic module toggling.

ALTER TABLE public.programs 
ADD COLUMN IF NOT EXISTS sections_config JSONB DEFAULT '{
  "has_overview": true,
  "has_offerings_grid": true,
  "has_portfolio_explorer": true,
  "has_events_module": true,
  "has_document_library": true,
  "has_cta_banner": true
}'::jsonb;

-- Update sections_config for specific programs
UPDATE public.programs 
SET sections_config = '{
  "has_overview": true,
  "has_offerings_grid": true,
  "has_portfolio_explorer": true,
  "has_events_module": true,
  "has_document_library": true,
  "has_cta_banner": true,
  "has_cohort_tabs": true
}'::jsonb
WHERE slug = 'newgen-iedc';

UPDATE public.programs 
SET sections_config = '{
  "has_overview": true,
  "has_offerings_grid": true,
  "has_portfolio_explorer": true,
  "has_events_module": true,
  "has_document_library": true,
  "has_cta_banner": true,
  "has_machinery_grant": true
}'::jsonb
WHERE slug = 'msme-bi';
