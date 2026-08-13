-- Migration: 0023_seed_reference_data.sql
-- Description: Bootstrap stable lookup records (site_settings, startup_categories, core programs).
-- NOTE: Leadership data is EXPLICITLY OMITTED due to LandingPage vs AboutPage data conflicts (to be resolved in Stage 2.4).

-- 1. Bootstrap Single-Row Global Site Settings
INSERT INTO public.site_settings (
    id, org_name, parent_org, cin_number, contact_phone, contact_email, contact_address, social_links
) VALUES (
    1,
    'Navrachna Foundation for Entrepreneurship Development',
    'I.T.S Engineering College, Greater Noida',
    'U73200UP2020NPL128831',
    '+91 9540527700',
    'head.nfed@its.edu.in',
    'Plot no. 46, Knowledge Park 3, Greater Noida',
    '{"facebook": "https://www.facebook.com/share/1EsxYHE9Rr/", "instagram": "https://www.instagram.com/itsec_nfed", "linkedin": "https://www.linkedin.com/company/itsec-nfed/"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
    org_name = EXCLUDED.org_name,
    parent_org = EXCLUDED.parent_org,
    cin_number = EXCLUDED.cin_number;

-- 2. Bootstrap Startup Categories Taxonomy
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES
    ('deep-tech', 'Deep-Tech', 'Artificial Intelligence, Robotics, IoT, and Advanced Computing Ventures', 1),
    ('clean-tech', 'Clean-Tech', 'Renewable Energy, Waste Management, and Sustainability Solutions', 2),
    ('agri-tech', 'Agri-Tech', 'Smart Agriculture, Precision Farming, and Crop Diagnostics', 3),
    ('health-tech', 'Health-Tech', 'Biomedical Devices, Telemedicine, and Healthcare Innovations', 4),
    ('ed-tech', 'Ed-Tech', 'Educational Platforms, STEM Tools, and Learning Solutions', 5)
ON CONFLICT (slug) DO NOTHING;

-- 3. Bootstrap Core Incubation Programs
INSERT INTO public.programs (slug, title, short_name, summary, grant_amount, display_order)
VALUES
    (
        'newgen-iedc',
        'NewGen Innovation & Entrepreneurship Development Centre',
        'NewGen-IEDC',
        'DST-backed prototyping grant program supporting student technology prototypes.',
        'Up to Rs. 2.5 Lakhs per project',
        1
    ),
    (
        'msme-bi',
        'MSME Business Incubator Scheme',
        'MSME-BI',
        'Ministry of MSME initiative fostering innovative ideas into commercial products.',
        'Up to Rs. 15 Lakhs per idea',
        2
    ),
    (
        'startinup',
        'StartinUP Uttar Pradesh State Scheme',
        'StartinUP',
        'UP State startup policy providing incubation, matching grants, and seed capital.',
        'State Policy Incentives',
        3
    ),
    (
        'iic-itsec',
        'MoE Innovation Cell',
        'IIC-ITSEC',
        'Ministry of Education Innovation Cell fostering campus innovation culture.',
        'Institutional Support',
        4
    ),
    (
        'kartavyam',
        'Kartavyam Youth Initiative',
        'Kartavyam',
        'Social entrepreneurship and STEM outreach initiative for youth empowerment.',
        'Outreach Grant',
        5
    )
ON CONFLICT (slug) DO NOTHING;
