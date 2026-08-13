-- Migration: 0022_storage.sql
-- Description: Provision 7 Supabase Storage Buckets and storage security access policies.

-- 1. Insert Bucket Definitions into storage.buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    ('site-assets', 'site-assets', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']),
    ('people-photos', 'people-photos', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp']),
    ('startup-logos', 'startup-logos', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']),
    ('facility-images', 'facility-images', true, 15728640, ARRAY['image/png', 'image/jpeg', 'image/webp']),
    ('equipment-images', 'equipment-images', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp']),
    ('project-media', 'project-media', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp']),
    ('policy-documents', 'policy-documents', true, 26214400, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Objects RLS Security Policies
CREATE POLICY "Public Storage Read Access"
    ON storage.objects FOR SELECT
    USING (bucket_id IN (
        'site-assets', 'people-photos', 'startup-logos',
        'facility-images', 'equipment-images', 'project-media', 'policy-documents'
    ));

CREATE POLICY "Admin Storage Insert Access"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id IN (
            'site-assets', 'people-photos', 'startup-logos',
            'facility-images', 'equipment-images', 'project-media', 'policy-documents'
        )
        AND (public.is_admin_or_editor())
    );

CREATE POLICY "Admin Storage Update Access"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id IN (
            'site-assets', 'people-photos', 'startup-logos',
            'facility-images', 'equipment-images', 'project-media', 'policy-documents'
        )
        AND (public.is_admin_or_editor())
    );

CREATE POLICY "Admin Storage Delete Access"
    ON storage.objects FOR DELETE
    USING (
        bucket_id IN (
            'site-assets', 'people-photos', 'startup-logos',
            'facility-images', 'equipment-images', 'project-media', 'policy-documents'
        )
        AND (public.is_admin_or_editor())
    );
