-- Migration: 0025_generalized_schema.sql
-- Description: Generalized System Architecture (v2.0) for Navrachna Foundation.

-- 1. FOUNDATIONS
CREATE TABLE IF NOT EXISTS public.foundations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Navrachna Foundation',
    parent_institute TEXT NOT NULL DEFAULT 'I.T.S. Engineering College',
    email TEXT NOT NULL DEFAULT 'head.nfed@its.edu.in',
    phone TEXT NOT NULL DEFAULT '+91 9540527700',
    location TEXT NOT NULL DEFAULT 'Knowledge Park 3, Greater NOIDA',
    cin_number TEXT NOT NULL DEFAULT 'U73200UP2020NPL128831',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Root Foundation Record if not existing
INSERT INTO public.foundations (id, name, parent_institute, email, phone, location, cin_number)
VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Navrachna Foundation', 'I.T.S. Engineering College', 'head.nfed@its.edu.in', '+91 9540527700', 'Knowledge Park 3, Greater NOIDA', 'U73200UP2020NPL128831')
ON CONFLICT (id) DO NOTHING;

-- 2. PROGRAMS (Overarching Schemes & Incubation Tracks)
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    foundation_id UUID NOT NULL REFERENCES public.foundations(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('incubation_track', 'grant_scheme', 'institutional_cell', 'outreach_track')),
    description TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. EVENTS (Hackathons, Ideathons, Workshops, Pitch Days)
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    foundation_id UUID NOT NULL REFERENCES public.foundations(id) ON DELETE CASCADE,
    program_id UUID NULL REFERENCES public.programs(id) ON DELETE SET NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('hackathon', 'ideathon', 'workshop', 'webinar', 'pitch_day', 'bootcamp')),
    start_date DATE NULL,
    end_date DATE NULL,
    budget_prize_pool NUMERIC(12,2) DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'archived')),
    description TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SERVICES (Mentorship, IT Support, Funding, IPR)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    foundation_id UUID NOT NULL REFERENCES public.foundations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. FACILITIES (Fab Lab, 3D Printing, AI Compute, Co-working)
CREATE TABLE IF NOT EXISTS public.facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    foundation_id UUID NOT NULL REFERENCES public.foundations(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('fab_lab', '3d_printing', 'ai_compute', 'coworking', 'meeting_room')),
    capacity INT NOT NULL DEFAULT 0,
    hardware_specs TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. USERS / PEOPLE (Students, Faculty, Founders, Mentors, Investors)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    contact_info TEXT NULL,
    roles TEXT[] NOT NULL DEFAULT '{student}',
    organization TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. STARTUPS & INNOVATION ENTITIES (Ventures, Prototypes, Ideas)
CREATE TABLE IF NOT EXISTS public.startups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    foundation_id UUID NOT NULL REFERENCES public.foundations(id) ON DELETE CASCADE,
    program_id UUID NULL REFERENCES public.programs(id) ON DELETE SET NULL,
    event_id UUID NULL REFERENCES public.events(id) ON DELETE SET NULL,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    entity_type TEXT NOT NULL DEFAULT 'commercial_startup' CHECK (entity_type IN ('commercial_startup', 'prototype_poc', 'sanctioned_idea')),
    status TEXT NOT NULL DEFAULT 'incubated' CHECK (status IN ('poc_made', 'incubated', 'patented', 'graduated', 'archived')),
    description TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. STARTUP_FOUNDERS (Junction: User ↔ Startup)
CREATE TABLE IF NOT EXISTS public.startup_founders (
    startup_id UUID NOT NULL REFERENCES public.startups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    designation TEXT NOT NULL DEFAULT 'Founder',
    PRIMARY KEY (startup_id, user_id)
);

-- 9. EVENT_PARTICIPANTS (Junction: User ↔ Event)
CREATE TABLE IF NOT EXISTS public.event_participants (
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    participant_role TEXT NOT NULL DEFAULT 'attendee' CHECK (participant_role IN ('attendee', 'innovator', 'speaker', 'judge', 'organizer')),
    PRIMARY KEY (event_id, user_id)
);

-- 10. BOOKINGS (Facility Reservations)
CREATE TABLE IF NOT EXISTS public.facility_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id UUID NOT NULL REFERENCES public.facilities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    purpose TEXT NOT NULL DEFAULT 'Prototyping' CHECK (purpose IN ('prototyping', 'simulation', 'meeting', 'testing')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. MENTORSHIP_SESSIONS (Session Logs)
CREATE TABLE IF NOT EXISTS public.mentorship_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    startup_id UUID NOT NULL REFERENCES public.startups(id) ON DELETE CASCADE,
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    focus_area TEXT NOT NULL DEFAULT 'Tech' CHECK (focus_area IN ('funding', 'business_logic', 'tech', 'ipr')),
    notes TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS and add public read / admin write policies
ALTER TABLE public.foundations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read foundations" ON public.foundations FOR SELECT USING (true);
CREATE POLICY "Public read programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Public read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public read startups" ON public.startups FOR SELECT USING (true);
CREATE POLICY "Public read startup_founders" ON public.startup_founders FOR SELECT USING (true);
CREATE POLICY "Public read event_participants" ON public.event_participants FOR SELECT USING (true);
CREATE POLICY "Public read facility_bookings" ON public.facility_bookings FOR SELECT USING (true);
CREATE POLICY "Public read mentorship_sessions" ON public.mentorship_sessions FOR SELECT USING (true);

-- Admin Mutation Policies
CREATE POLICY "Admin manage foundations" ON public.foundations FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage programs" ON public.programs FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage events" ON public.events FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage services" ON public.services FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage facilities" ON public.facilities FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage users" ON public.users FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage startups" ON public.startups FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage startup_founders" ON public.startup_founders FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage event_participants" ON public.event_participants FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage facility_bookings" ON public.facility_bookings FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin manage mentorship_sessions" ON public.mentorship_sessions FOR ALL USING (public.is_admin_or_editor());
