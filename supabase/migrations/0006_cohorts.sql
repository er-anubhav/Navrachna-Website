-- Migration: 0006_cohorts.sql
-- Description: Create cohorts table for fiscal/academic cycle years linked to programs.

CREATE TABLE IF NOT EXISTS public.cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
    year_label TEXT NOT NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT cohorts_program_year_key UNIQUE (program_id, year_label)
);

COMMENT ON TABLE public.cohorts IS 'Program funding cycles and academic cohorts (2023-24, 2022-23, etc.).';
