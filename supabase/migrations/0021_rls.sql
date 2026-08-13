-- Migration: 0021_rls.sql
-- Description: Enable RLS on all 17 application tables, create admin_users table, helper authorization function, public SELECT policies, and admin management policies.

-- 1. Create Admin Users Table for Admin/Editor Authorization
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.app_role NOT NULL DEFAULT 'editor',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.admin_users IS 'Registry of authenticated users possessing administrative or editor CMS permissions.';

-- 2. Authorization Security Definer Function
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN AS $$
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    RETURN EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE user_id = auth.uid()
        AND role IN ('admin', 'editor')
    ) OR (
        (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'editor')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Enable RLS on All Application Tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newgen_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.msme_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.msme_hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 4. Admin Users Table Security Policies
CREATE POLICY "Admin users viewable by authenticated admins"
    ON public.admin_users FOR SELECT
    USING (public.is_admin_or_editor());

CREATE POLICY "Admin users manageable by super admin"
    ON public.admin_users FOR ALL
    USING (public.is_admin_or_editor());

-- 5. Site Settings Policies
CREATE POLICY "Site settings public select"
    ON public.site_settings FOR SELECT
    USING (true);

CREATE POLICY "Site settings admin update"
    ON public.site_settings FOR UPDATE
    USING (public.is_admin_or_editor());

-- 6. People Policies
CREATE POLICY "People public select active"
    ON public.people FOR SELECT
    USING (is_active = true OR public.is_admin_or_editor());

CREATE POLICY "People admin all"
    ON public.people FOR ALL
    USING (public.is_admin_or_editor());

-- 7. Programs Policies
CREATE POLICY "Programs public select active"
    ON public.programs FOR SELECT
    USING (is_active = true OR public.is_admin_or_editor());

CREATE POLICY "Programs admin all"
    ON public.programs FOR ALL
    USING (public.is_admin_or_editor());

-- 8. Cohorts Policies
CREATE POLICY "Cohorts public select active"
    ON public.cohorts FOR SELECT
    USING (is_active = true OR public.is_admin_or_editor());

CREATE POLICY "Cohorts admin all"
    ON public.cohorts FOR ALL
    USING (public.is_admin_or_editor());

-- 9. NewGen Projects Policies
CREATE POLICY "NewGen projects public select published"
    ON public.newgen_projects FOR SELECT
    USING (status = 'published' OR public.is_admin_or_editor());

CREATE POLICY "NewGen projects admin all"
    ON public.newgen_projects FOR ALL
    USING (public.is_admin_or_editor());

-- 10. Project People Junction Policies
CREATE POLICY "Project people public select"
    ON public.project_people FOR SELECT
    USING (true);

CREATE POLICY "Project people admin all"
    ON public.project_people FOR ALL
    USING (public.is_admin_or_editor());

-- 11. Startups Policies
CREATE POLICY "Startups public select"
    ON public.startups FOR SELECT
    USING (true);

CREATE POLICY "Startups admin all"
    ON public.startups FOR ALL
    USING (public.is_admin_or_editor());

-- 12. Startup Categories Policies
CREATE POLICY "Startup categories public select"
    ON public.startup_categories FOR SELECT
    USING (true);

CREATE POLICY "Startup categories admin all"
    ON public.startup_categories FOR ALL
    USING (public.is_admin_or_editor());

-- 13. Startup Founders Junction Policies
CREATE POLICY "Startup founders public select"
    ON public.startup_founders FOR SELECT
    USING (true);

CREATE POLICY "Startup founders admin all"
    ON public.startup_founders FOR ALL
    USING (public.is_admin_or_editor());

-- 14. Facilities Policies
CREATE POLICY "Facilities public select active"
    ON public.facilities FOR SELECT
    USING (is_active = true OR public.is_admin_or_editor());

CREATE POLICY "Facilities admin all"
    ON public.facilities FOR ALL
    USING (public.is_admin_or_editor());

-- 15. Facility Equipment Policies
CREATE POLICY "Facility equipment public select"
    ON public.facility_equipment FOR SELECT
    USING (true);

CREATE POLICY "Facility equipment admin all"
    ON public.facility_equipment FOR ALL
    USING (public.is_admin_or_editor());

-- 16. Announcements Policies
CREATE POLICY "Announcements public select active published"
    ON public.announcements FOR SELECT
    USING (
        (status = 'published' AND published_at <= NOW() AND (expires_at IS NULL OR expires_at > NOW()))
        OR public.is_admin_or_editor()
    );

CREATE POLICY "Announcements admin all"
    ON public.announcements FOR ALL
    USING (public.is_admin_or_editor());

-- 17. MSME Activities Policies
CREATE POLICY "MSME activities public select"
    ON public.msme_activities FOR SELECT
    USING (true);

CREATE POLICY "MSME activities admin all"
    ON public.msme_activities FOR ALL
    USING (public.is_admin_or_editor());

-- 18. MSME Hackathons Policies
CREATE POLICY "MSME hackathons public select"
    ON public.msme_hackathons FOR SELECT
    USING (true);

CREATE POLICY "MSME hackathons admin all"
    ON public.msme_hackathons FOR ALL
    USING (public.is_admin_or_editor());

-- 19. Policies (Documents) Policies
CREATE POLICY "Policies public select active"
    ON public.policies FOR SELECT
    USING (is_active = true OR public.is_admin_or_editor());

CREATE POLICY "Policies admin all"
    ON public.policies FOR ALL
    USING (public.is_admin_or_editor());

-- 20. FAQs Policies
CREATE POLICY "FAQs public select active"
    ON public.faqs FOR SELECT
    USING (is_active = true OR public.is_admin_or_editor());

CREATE POLICY "FAQs admin all"
    ON public.faqs FOR ALL
    USING (public.is_admin_or_editor());

-- 21. Testimonials Policies
CREATE POLICY "Testimonials public select active"
    ON public.testimonials FOR SELECT
    USING (is_active = true OR public.is_admin_or_editor());

CREATE POLICY "Testimonials admin all"
    ON public.testimonials FOR ALL
    USING (public.is_admin_or_editor());
