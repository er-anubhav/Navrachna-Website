-- Migration: 0027_seed_authentic_programs.sql
-- Description: Seed authentic programs from navrachnafoundation.com into Supabase.

INSERT INTO public.programs (
    foundation_id,
    slug,
    name,
    title,
    short_name,
    type,
    summary,
    description,
    grant_amount,
    is_active
)
VALUES 
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'newgen-iedc',
    'DST NewGen-IEDC',
    'DST NewGen-IEDC',
    'NewGen-IEDC',
    'grant_scheme',
    'DST Govt of India funded Student Prototype & Proof-of-Concept (PoC) grant scheme.',
    'DST Govt of India funded Student Prototype & Proof-of-Concept (PoC) grant scheme providing up to ₹2.5 Lakhs per student prototype project.',
    '₹2.5 Lakhs per project',
    true
),
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'msme-bi',
    'MSME Business Incubator (MSME-BI)',
    'MSME Business Incubator (MSME-BI)',
    'MSME-BI',
    'incubation_track',
    'Ministry of MSME Govt of India approved Business Incubator.',
    'Ministry of MSME Govt of India approved Business Incubator offering up to ₹15 Lakhs seed grant per approved idea and up to ₹1 Crore for plant & machinery infrastructure.',
    '₹15 Lakhs Idea Grant',
    true
),
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'startin-up',
    'StartinUP (UP State Incubation Scheme)',
    'StartinUP (UP State Incubation Scheme)',
    'StartinUP',
    'incubation_track',
    'Government of Uttar Pradesh flagship incubation scheme.',
    'Government of Uttar Pradesh flagship incubation scheme providing state policy incentives, co-working desk allocation, and resident startup acceleration.',
    'UP State Incentives',
    true
),
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'iic-itsec',
    'MoE Innovation Cell (IIC - ITSEC)',
    'MoE Innovation Cell (IIC - ITSEC)',
    'IIC-ITSEC',
    'institutional_cell',
    'Ministry of Education Govt of India Innovation Cell.',
    'Ministry of Education (MoE) Govt of India Innovation Cell tracking campus star ratings, IPR workshops, and National Innovation & Start-up Policy (NISP) implementation.',
    'AICTE / MoE Ratings',
    true
),
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'kartavyam',
    'Kartavyam Initiative',
    'Kartavyam Initiative',
    'Kartavyam',
    'outreach_track',
    'Youth STEM outreach program and school ideation challenges.',
    'Youth STEM outreach program, high school ideation challenges, and societal technology projects driven by Navrachna Foundation.',
    'Outreach Grants',
    true
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    type = EXCLUDED.type,
    summary = EXCLUDED.summary,
    description = EXCLUDED.description,
    grant_amount = EXCLUDED.grant_amount,
    is_active = EXCLUDED.is_active;
