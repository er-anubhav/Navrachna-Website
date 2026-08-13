-- Migration: 0020_triggers.sql
-- Description: Attach automatic updated_at timestamp triggers to tables containing updated_at columns.

DROP TRIGGER IF EXISTS trigger_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER trigger_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_people_updated_at ON public.people;
CREATE TRIGGER trigger_people_updated_at
    BEFORE UPDATE ON public.people
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_programs_updated_at ON public.programs;
CREATE TRIGGER trigger_programs_updated_at
    BEFORE UPDATE ON public.programs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_newgen_projects_updated_at ON public.newgen_projects;
CREATE TRIGGER trigger_newgen_projects_updated_at
    BEFORE UPDATE ON public.newgen_projects
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_startups_updated_at ON public.startups;
CREATE TRIGGER trigger_startups_updated_at
    BEFORE UPDATE ON public.startups
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_facilities_updated_at ON public.facilities;
CREATE TRIGGER trigger_facilities_updated_at
    BEFORE UPDATE ON public.facilities
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_announcements_updated_at ON public.announcements;
CREATE TRIGGER trigger_announcements_updated_at
    BEFORE UPDATE ON public.announcements
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
