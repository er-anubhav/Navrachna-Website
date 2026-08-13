-- Migration: 0012_facility_equipment.sql
-- Description: Create facility_equipment child table for lab equipment and hardware inventory.

CREATE TABLE IF NOT EXISTS public.facility_equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id UUID NOT NULL REFERENCES public.facilities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    model_number TEXT NULL,
    specifications TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    equipment_images TEXT[] NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.facility_equipment IS 'Hardware inventory, 3D printers, and compute workstation nodes per facility.';
