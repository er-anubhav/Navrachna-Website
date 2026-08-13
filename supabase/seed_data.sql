-- ==============================================================================
-- Navrachna Foundation CMS - Stage 2.4 Production Data Seed Migration Script
-- Target: Supabase PostgreSQL Database
-- Timestamp: 2026-08-13T19:17:09.054Z
-- Description: Idempotent data migration populating 17 normalized tables & storage pointers.
-- ==============================================================================

BEGIN;


-- 1. SITE SETTINGS (Single Row)
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
    cin_number = EXCLUDED.cin_number,
    contact_phone = EXCLUDED.contact_phone,
    contact_email = EXCLUDED.contact_email,
    contact_address = EXCLUDED.contact_address,
    social_links = EXCLUDED.social_links;


-- 2. STARTUP CATEGORIES
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('deep-tech', 'Deep-Tech', 'Artificial Intelligence, Robotics, IoT, and Advanced Computing Ventures', 1)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('clean-tech', 'Clean-Tech', 'Renewable Energy, Waste Management, and Sustainability Solutions', 2)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('agri-tech', 'Agri-Tech', 'Smart Agriculture, Precision Farming, and Crop Diagnostics', 3)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('health-tech', 'Health-Tech', 'Biomedical Devices, Telemedicine, and Healthcare Innovations', 4)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('ed-tech', 'Ed-Tech', 'Educational Platforms, STEM Tools, and Learning Solutions', 5)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('smart-hardware-iot', 'Smart Hardware & IoT', 'Energy-efficient IoT devices and electronic systems', 6)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('enterprise-software', 'Enterprise Software', 'SaaS, web applications, and enterprise IT consulting', 7)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('agrotech-biomass', 'Agrotech & Biomass', 'Sustainable agricultural hardware and biomass processing', 8)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startup_categories (slug, name, description, display_order)
VALUES ('advanced-manufacturing', 'Advanced Manufacturing', 'Industrial robotics, automation, and vision inspection', 9)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 3. PROGRAMS
INSERT INTO public.programs (slug, title, short_name, summary, grant_amount, accent_color, bullets, display_order)
VALUES ('newgen-iedc', 'NewGen Innovation & Entrepreneurship Development Centre', 'NewGen-IEDC', 'DST-backed prototyping grant program supporting student technology prototypes.', 'Up to Rs. 2.5 Lakhs per project', 'from-amber-100 to-orange-50', ARRAY['Idea validation', 'Lab access', 'Mentor reviews'], 1)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.programs (slug, title, short_name, summary, grant_amount, accent_color, bullets, display_order)
VALUES ('msme-bi', 'MSME Business Incubator Scheme', 'MSME-BI', 'Ministry of MSME initiative fostering innovative ideas into commercial products.', 'Up to Rs. 15 Lakhs per idea', 'from-amber-50 to-yellow-50', ARRAY['Structured incubation', 'Compliance support', 'Market access'], 2)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.programs (slug, title, short_name, summary, grant_amount, accent_color, bullets, display_order)
VALUES ('startinup', 'StartinUP Uttar Pradesh State Scheme', 'StartinUP', 'UP State startup policy providing incubation, matching grants, and seed capital.', 'State Policy Incentives', 'from-rose-100 to-orange-50', ARRAY['Launch planning', 'Pitch prep', 'Go-to-market support'], 3)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.programs (slug, title, short_name, summary, grant_amount, accent_color, bullets, display_order)
VALUES ('innovation-cell', 'MoE Innovation Cell', 'IIC-ITSEC', 'Ministry of Education Innovation Cell fostering campus innovation culture.', 'Institutional Support', 'from-orange-100 to-amber-50', ARRAY['Research support', 'IP awareness', 'Innovation pathways'], 4)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.programs (slug, title, short_name, summary, grant_amount, accent_color, bullets, display_order)
VALUES ('kartavyam', 'Kartavyam Youth Initiative', 'Kartavyam', 'School-level STEM innovation and youth entrepreneurship outreach impacting 300+ students across 40+ partner schools.', 'Outreach Grant', 'from-amber-100 to-yellow-50', ARRAY['School Outreach', 'Youth STEM Innovation', 'Early Entrepreneurship'], 5)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;

-- 4. COHORTS
INSERT INTO public.cohorts (program_id, year_label, display_order)
VALUES ((SELECT id FROM public.programs WHERE slug = 'newgen-iedc'), '2023-24', 1)
ON CONFLICT (program_id, year_label) DO NOTHING;
INSERT INTO public.cohorts (program_id, year_label, display_order)
VALUES ((SELECT id FROM public.programs WHERE slug = 'newgen-iedc'), '2022-23', 2)
ON CONFLICT (program_id, year_label) DO NOTHING;
INSERT INTO public.cohorts (program_id, year_label, display_order)
VALUES ((SELECT id FROM public.programs WHERE slug = 'newgen-iedc'), '2021-22', 3)
ON CONFLICT (program_id, year_label) DO NOTHING;
INSERT INTO public.cohorts (program_id, year_label, display_order)
VALUES ((SELECT id FROM public.programs WHERE slug = 'newgen-iedc'), '2020-21', 4)
ON CONFLICT (program_id, year_label) DO NOTHING;
INSERT INTO public.cohorts (program_id, year_label, display_order)
VALUES ((SELECT id FROM public.programs WHERE slug = 'newgen-iedc'), '2019-20', 5)
ON CONFLICT (program_id, year_label) DO NOTHING;

-- 5. NEWGEN PROJECTS & PEOPLE MIGRATION

-- Project 1: Accelerator Enhancer for Bikes
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'accelerator-enhancer-for-bikes',
    'Accelerator Enhancer for Bikes',
    'Electric two-wheelers often struggle with balancing acceleration and mileage. Our Accelerator Enhancer replaces one big motor with three smaller BLDC motors. This setup provides high acceleration when needed and optimal mileage on plain roads, effectively solving the trade-off between power and energy efficiency in EVs.',
    'Granted',
    '202111138661',
    159096,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-09-23-at-15.19.49-600x800.jpg',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'accelerator-enhancer-for-bikes'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Er. Astha Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'accelerator-enhancer-for-bikes'),
    (SELECT id FROM public.people WHERE full_name = 'Er. Astha Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Shivani Dubey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'accelerator-enhancer-for-bikes'),
    (SELECT id FROM public.people WHERE full_name = 'Shivani Dubey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md Samiruddin', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'accelerator-enhancer-for-bikes'),
    (SELECT id FROM public.people WHERE full_name = 'Md Samiruddin' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 2: Adaptive Biofeedback VR System for Managing Dental Anxiety in Children
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'adaptive-biofeedback-vr-system-for-managing-dental-anxiety-in-children',
    'Adaptive Biofeedback VR System for Managing Dental Anxiety in Children',
    'An AI-powered VR system that adapts in real time to a child’s physiological signals—such as heart rate, facial expressions, and body temperature—to reduce anxiety during dental treatments. It offers a personalized, responsivez alternative to conventional distraction-based VR tools.',
    'NA',
    'NA',
    175944,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_j3axdaj3axdaj3ax-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sudhanshu Ranjan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'adaptive-biofeedback-vr-system-for-managing-dental-anxiety-in-children'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sudhanshu Ranjan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Prachi Pathak', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'adaptive-biofeedback-vr-system-for-managing-dental-anxiety-in-children'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Prachi Pathak' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Zaniab Shah', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'adaptive-biofeedback-vr-system-for-managing-dental-anxiety-in-children'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Zaniab Shah' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Yogesh Mehta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'adaptive-biofeedback-vr-system-for-managing-dental-anxiety-in-children'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Yogesh Mehta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vanshit Tyagi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'adaptive-biofeedback-vr-system-for-managing-dental-anxiety-in-children'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vanshit Tyagi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 3: Advance Datum Surface Table
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'advance-datum-surface-table',
    'Advance Datum Surface Table',
    'The Advance Datum Surface Table automates GD&amp;T measurements, spotting, and inspection with precise three-axis mechanical movement. Unlike manual tables, it minimizes human error and requires less skilled labor. This cost-effective solution offers high accuracy comparable to expensive CMMs, making advanced precision measurement accessible and efficient for various vendor companies.',
    'Filed',
    'NA',
    200985.09,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-20-600x603.png',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Chetan Dixit', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'advance-datum-surface-table'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Chetan Dixit' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Jayant Singh Rajput', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'advance-datum-surface-table'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Jayant Singh Rajput' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 4: AI Based Glue Inspection System
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'ai-based-glue-inspection-system',
    'AI Based Glue Inspection System',
    'E-card manufacturers face issues with glue smearing on chips, causing defects. Our system uses Machine Vision and Artificial Intelligence to inspect glue application automatically. It detects faults early, preventing defective cards from reaching the market, reducing waste, and protecting the company''s reputation for quality.',
    'NA',
    'NA',
    220310,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download.png',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Saurav Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'ai-based-glue-inspection-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Saurav Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Yash Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'ai-based-glue-inspection-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Yash Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 5: AI Based System for Evading Stray Livestock
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'ai-based-system-for-evading-stray-livestock',
    'AI Based System for Evading Stray Livestock',
    'This project enhances Modular BLDC motors by increasing power density through shortened magnetic field lines. By stacking a greater number of rotors, we significantly boost torque output. This configuration offers a more powerful and efficient motor solution, addressing the need for highperformance electric propulsion systems.',
    'Granted',
    '202211011992',
    253011.23,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/671c8656-78b3-4842-9eca-b1c5aca6c45d-600x450.jpg',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Agha Asim Husain', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'ai-based-system-for-evading-stray-livestock'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Agha Asim Husain' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'ai-based-system-for-evading-stray-livestock'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'ai-based-system-for-evading-stray-livestock'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Divya Verma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'ai-based-system-for-evading-stray-livestock'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Divya Verma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 6: Air-Stable Na-Ion Battery System for Safer Energy
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'air-stable-na-ion-battery-system-for-safer-energy',
    'Air-Stable Na-Ion Battery System for Safer Energy',
    'A novel suite of sodium-ion battery solutions combining modified Prussian White cathodes, carbon anodes, and customized electrolytes to meet diverse real-world needs. The unique material integration delivers improved efficiency and opens new possibilities for next-generation energy storage.',
    'NA',
    'NA',
    129900,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_kqbbvmkqbbvmkqbb-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Shristi U. Thapliyal', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'air-stable-na-ion-battery-system-for-safer-energy'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Shristi U. Thapliyal' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Aman Mehta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'air-stable-na-ion-battery-system-for-safer-energy'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Aman Mehta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Diksha Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'air-stable-na-ion-battery-system-for-safer-energy'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Diksha Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Anushka Tyagi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'air-stable-na-ion-battery-system-for-safer-energy'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Anushka Tyagi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 7: AirXmedic
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'airxmedic',
    'AirXmedic',
    'AirXmedic is an all-weather medical drone equipped with AI navigation, real-time offline video/audio communication, and a specialized medical payload module with AED and temperature-controlled storage. It ensures rapid, reliable emergency response and delivery even in remote or disaster-hit regions.',
    'NA',
    'NA',
    262663,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_jkuwyojkuwyojkuw-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'airxmedic'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Udbhav Vashud', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'airxmedic'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Udbhav Vashud' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Harshita Rana', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'airxmedic'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Harshita Rana' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Priyanshu Tiwari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'airxmedic'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Priyanshu Tiwari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 8: Automatic Dairy Animal Feeder
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'automatic-dairy-animal-feeder',
    'Automatic Dairy Animal Feeder',
    'Dairy farming is vital for India''s rural economy. We developed an automatic feeding system to reduce the heavy labor load on farmers. This machine automates the distribution of feed to cows and other milk animals, saving time and effort while supporting the socio-economic development of the dairy sector.',
    'NA',
    'NA',
    224321.56,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-6.55.51-PM-600x1071.jpeg',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manvendar Yadav', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-dairy-animal-feeder'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manvendar Yadav' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Piyush Solanki', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-dairy-animal-feeder'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Piyush Solanki' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Lovely Gupta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-dairy-animal-feeder'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Lovely Gupta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 9: Automatic Gardening System
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'automatic-gardening-system',
    'Automatic Gardening System',
    'Many people forget to water their plants during their daily routine, which makes it difficult to keep them healthy. Managing watering also becomes challenging during water shortages or when maintaining a garden regularly. To solve this, we developed an automated plant watering system designed for home gardening. This system takes care of plants by monitoring essential conditions and watering them when needed. We believe technology can support plant care not only through automation but also through digital communication, making gardening easier and more efficient',
    'NA',
    '333380-001',
    199077.39,
    'https://navrachnafoundation.com/wp-content/uploads/2025/11/AutoGardeningSystem-e1764319913971-600x485.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr.Monika Jain', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-gardening-system'),
    (SELECT id FROM public.people WHERE full_name = 'Dr.Monika Jain' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Anuj Katiyar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-gardening-system'),
    (SELECT id FROM public.people WHERE full_name = 'Anuj Katiyar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Deepak', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-gardening-system'),
    (SELECT id FROM public.people WHERE full_name = 'Deepak' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 10: Automatic Milled Raw Rice Age Finder
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'automatic-milled-raw-rice-age-finder',
    'Automatic Milled Raw Rice Age Finder',
    'The Rice Age Finder Machine automates the determination of raw milled rice age, ensuring product quality and freshness. By utilizing research on powder compositions to identify liquid solution makeups, it streamlines complex chemical analyses. This innovation reduces manual labor and time, offering precise, efficient quality control for the food industry.',
    'NA',
    '202311008689',
    253929.69,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Rice-Age-600x450.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Praveen Ch', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-milled-raw-rice-age-finder'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Praveen Ch' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ra Jha', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-milled-raw-rice-age-finder'),
    (SELECT id FROM public.people WHERE full_name = 'ra Jha' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md Samiruddin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-milled-raw-rice-age-finder'),
    (SELECT id FROM public.people WHERE full_name = 'Md Samiruddin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manish', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-milled-raw-rice-age-finder'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manish' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-milled-raw-rice-age-finder'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 11: Automatic Safety Test Panel for Geyser
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'automatic-safety-test-panel-for-geyser',
    'Automatic Safety Test Panel for Geyser',
    'Manual geyser testing is slow and dangerous. We developed an automatic safety test panel that performs leakage, high voltage, and earth contact tests. It measures insulation resistance to ensure dielectric effectiveness. This system eliminates manual errors and safety risks, protecting testers from shocks and molten metal hazards.',
    'NA',
    'NA',
    266684.1,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-7.21.24-PM-600x1071.jpeg',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Ayub Khan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-safety-test-panel-for-geyser'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Ayub Khan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Suraj Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-safety-test-panel-for-geyser'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Suraj Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md Samiruddin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'automatic-safety-test-panel-for-geyser'),
    (SELECT id FROM public.people WHERE full_name = 'Md Samiruddin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 12: Biodegradable Air Filter with Nanocomposite Formulation
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'biodegradable-air-filter-with-nanocomposite-formulation',
    'Biodegradable Air Filter with Nanocomposite Formulation',
    'A biodegradable air filtration system engineered using advanced nanocomposite materials to achieve high-efficiency pollutant capture while remaining environmentally sustainable. Designed to decompose naturally after use, it offers an eco-friendly alternative to conventional synthetic filters without compromising on particulate removal performance.',
    'NA',
    'NA',
    0,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/213-600x327.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Rishi', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-air-filter-with-nanocomposite-formulation'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Rishi' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-air-filter-with-nanocomposite-formulation'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ritesh Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-air-filter-with-nanocomposite-formulation'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ritesh Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Tanmay Saxena', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-air-filter-with-nanocomposite-formulation'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Tanmay Saxena' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Piyush fogat', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-air-filter-with-nanocomposite-formulation'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Piyush fogat' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 13: Biodegradable Shellac and Synthetic Resin Based moulded Products
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'biodegradable-shellac-and-synthetic-resin-based-moulded-products',
    'Biodegradable Shellac and Synthetic Resin Based moulded Products',
    'Pure Shellac is too brittle for molding. We blended it with synthetic resins to create biodegradable molded products. These composites possess high dielectric properties, making them suitable for eco-friendly electrical bases and PCBs. This innovation tackles e-waste by providing a sustainable alternative to conventional plastic electronics.',
    'Granted',
    '202211011253',
    250520,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-17.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Praveen Ch', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-shellac-and-synthetic-resin-based-moulded-products'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Praveen Ch' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ra Jha', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-shellac-and-synthetic-resin-based-moulded-products'),
    (SELECT id FROM public.people WHERE full_name = 'ra Jha' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manish P', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-shellac-and-synthetic-resin-based-moulded-products'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manish P' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-shellac-and-synthetic-resin-based-moulded-products'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mayank Senger', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biodegradable-shellac-and-synthetic-resin-based-moulded-products'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mayank Senger' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 14: Biogas Production from Kitchen Waste
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'biogas-production-from-kitchen-waste',
    'Biogas Production from Kitchen Waste',
    'An innovative domestic biogas unit designed to transform kitchen waste into methane-rich fuel while optimizing digestion conditions for maximum output. It provides an eco-friendly, low-cost energy alternative tailored for household use.',
    'NA',
    'NA',
    50480,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_xce2jxce2jxce2jx-600x343.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Piyush Pathak', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biogas-production-from-kitchen-waste'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Piyush Pathak' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Adarsh Sharma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biogas-production-from-kitchen-waste'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Adarsh Sharma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Abhilasha Sharma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biogas-production-from-kitchen-waste'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Abhilasha Sharma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Riddhi Chahar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'biogas-production-from-kitchen-waste'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Riddhi Chahar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 15: Chemical Electrodialiser for Waste Water Treatment
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'chemical-electrodialiser-for-waste-water-treatment',
    'Chemical Electrodialiser for Waste Water Treatment',
    'In high-rise societies, thousands of liters of grey water are wasted daily because soap and oil impurities make it too colored and foamy for reuse. The Chemical Electrodialyser solves this by combining chemical treatment with electrodialysis to effectively remove these contaminants and hardness. This innovative system offers high commercial value as a unique, continuous solution that transforms unusable wastewater into clean and reusable water.',
    'NA',
    'NA',
    290902,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-22-600x384.png',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Praveen Ch', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'chemical-electrodialiser-for-waste-water-treatment'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Praveen Ch' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ra Jha', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'chemical-electrodialiser-for-waste-water-treatment'),
    (SELECT id FROM public.people WHERE full_name = 'ra Jha' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mohit R', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'chemical-electrodialiser-for-waste-water-treatment'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mohit R' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Pangersungla Pongen', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'chemical-electrodialiser-for-waste-water-treatment'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Pangersungla Pongen' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Piyush Sokhi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'chemical-electrodialiser-for-waste-water-treatment'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Piyush Sokhi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 16: Comfina
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'comfina',
    'Comfina',
    'COMFINA is a discreet, portable water bottle with an integrated rechargeable heating system designed to provide on-the-go relief from menstrual cramps. It combines heat therapy, convenience, and everyday usability in a stylish, multifunctional product.',
    'NA',
    'NA',
    57295,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_348djp348djp348d-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Kuldeep Pathak', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'comfina'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Kuldeep Pathak' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Upendra Kr. Agarwal', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'comfina'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Upendra Kr. Agarwal' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ankur Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'comfina'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ankur Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Pushkar Goel', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'comfina'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Pushkar Goel' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 17: Continuous Variable Generator
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'continuous-variable-generator',
    'Continuous Variable Generator',
    'The &#8220;CV Generator with EM Sync&#8221; optimizes fuel consumption based on load conditions without affecting electricity parameters. This retrofitting unit fits between the engine and alternator of any genset. It significantly saves fuel and optimizes power generation, offering a smart, efficient solution for energy needs.',
    'Granted',
    '202111026018',
    252069,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-4.56.54-PM-600x336.jpeg',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'continuous-variable-generator'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Er. Astha Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'continuous-variable-generator'),
    (SELECT id FROM public.people WHERE full_name = 'Er. Astha Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Vaibhav Kr. Yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'continuous-variable-generator'),
    (SELECT id FROM public.people WHERE full_name = 'Vaibhav Kr. Yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Jeevesh Gupta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'continuous-variable-generator'),
    (SELECT id FROM public.people WHERE full_name = 'Jeevesh Gupta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 18: Converting Desert Cooler to Air Conditioner using Refrigerator
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'converting-desert-cooler-to-air-conditioner-using-refrigerator',
    'Converting Desert Cooler to Air Conditioner using Refrigerator',
    'We converted a desert cooler into an air conditioner using refrigeration principles. This hybrid device cools and conditions air without the humidity associated with evaporative cooling. It eliminates &#8220;stickiness&#8221; while providing efficient cooling, offering a cost-effective alternative to expensive AC units for contained environments.',
    'Granted',
    '202211011989',
    251180.14,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-7.31.40-PM-600x1071.jpeg',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Akant Kumar Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'converting-desert-cooler-to-air-conditioner-using-refrigerator'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Akant Kumar Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ashirvad Pal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'converting-desert-cooler-to-air-conditioner-using-refrigerator'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ashirvad Pal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Jaibeer', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'converting-desert-cooler-to-air-conditioner-using-refrigerator'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Jaibeer' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 19: Cryogenic Metholox Rocket Engine
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'cryogenic-metholox-rocket-engine',
    'Cryogenic Metholox Rocket Engine',
    'An integrated aerospace innovation combining a plasma-pre-ionized torch igniter, an optimized reusable thermal protection system, and a high-efficiency methalox cryogenic engine. This trio delivers faster ignition, reduced TPS erosion, and clean, reusable engine operation for next-generation launch vehicles.',
    'NA',
    'NA',
    193275,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-11-21-at-11.03.16-600x600.jpg',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Samiruddin Ansari', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'cryogenic-metholox-rocket-engine'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Samiruddin Ansari' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Prince Ranjan', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'cryogenic-metholox-rocket-engine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Prince Ranjan' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Ashwin Ajay', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'cryogenic-metholox-rocket-engine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Ashwin Ajay' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Shivam Kawshik', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'cryogenic-metholox-rocket-engine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Shivam Kawshik' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 20: Cutting Fluid Optimizer
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'cutting-fluid-optimizer',
    'Cutting Fluid Optimizer',
    'This project optimizes cutting fluids used in machining to cool and lubricate tool-workpiece interfaces. By improving fluid application strategies, we aim to enhance workpiece quality, reduce tool wear, and increase productivity, while simultaneously addressing the economic and environmental concerns associated with excessive fluid usage.',
    'Granted',
    '202111033458',
    120891,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-1.png',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'cutting-fluid-optimizer'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Er. Astha Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'cutting-fluid-optimizer'),
    (SELECT id FROM public.people WHERE full_name = 'Er. Astha Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Suleman', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'cutting-fluid-optimizer'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Suleman' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 21: Development of Biodegradable Nonstick Coating
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'development-of-biodegradable-nonstick-coating',
    'Development of Biodegradable Nonstick Coating',
    'They developed a biodegradable non-stick coating using Shellac and synthetic resins. This solutionblended coating provides high adherence and nonstick properties. The manufacturing method is simple enough for unskilled workers, offering an ecofriendly, sustainable alternative to conventional nonstick coatings for various applications.',
    'NA',
    'NA',
    133123,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-1-600x400.jpeg',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Praveen', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-biodegradable-nonstick-coating'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Praveen' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ch', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-biodegradable-nonstick-coating'),
    (SELECT id FROM public.people WHERE full_name = 'Ch' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ra Jha', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-biodegradable-nonstick-coating'),
    (SELECT id FROM public.people WHERE full_name = 'ra Jha' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Nitish Kumar Jha', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-biodegradable-nonstick-coating'),
    (SELECT id FROM public.people WHERE full_name = 'Nitish Kumar Jha' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Yash Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-biodegradable-nonstick-coating'),
    (SELECT id FROM public.people WHERE full_name = 'Yash Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 22: Development of Electrically Insulating Biodegradable Shellac based Fibers
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'development-of-electrically-insulating-biodegradable-shellac-based-fibers',
    'Development of Electrically Insulating Biodegradable Shellac based Fibers',
    'Shellac, a biodegradable natural resin, is brittle alone. We blended it with synthetic resins like Polyamide or Epoxy to create strong fibers via solution blending and solvent evaporation. These resulting fibers possess high dielectric properties and biodegradability, making them ideal for ecofriendly, high-insulation electrical clothing applications.',
    'Granted',
    '202211011254',
    253521,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-8-600x362.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Praveen Ch', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-electrically-insulating-biodegradable-shellac-based-fibers'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Praveen Ch' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ra Jha', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-electrically-insulating-biodegradable-shellac-based-fibers'),
    (SELECT id FROM public.people WHERE full_name = 'ra Jha' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Nitish Kumar Jha', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-electrically-insulating-biodegradable-shellac-based-fibers'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Nitish Kumar Jha' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Yash Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-electrically-insulating-biodegradable-shellac-based-fibers'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Yash Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 23: Development of Flexible 5G Antena Substrate
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'development-of-flexible-5g-antena-substrate',
    'Development of Flexible 5G Antena Substrate',
    'Flexible electronics demand robust, adaptable antennas. We developed a biodegradable flexible 5G antenna substrate by blending Shellac with synthetic resins. This solution creates a mechanically robust film for conductive layers, meeting wireless connectivity needs. It offers a sustainable, eco-friendly alternative to conventional plastics while maintaining high performance for modern communication systems.',
    'NA',
    '202311008483',
    251755.8,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Flexible-5G-Antenna-600x450.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr Praveen Ch', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-flexible-5g-antena-substrate'),
    (SELECT id FROM public.people WHERE full_name = 'Dr Praveen Ch' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ra Jha', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-flexible-5g-antena-substrate'),
    (SELECT id FROM public.people WHERE full_name = 'ra Jha' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr Ch', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-flexible-5g-antena-substrate'),
    (SELECT id FROM public.people WHERE full_name = 'Mr Ch' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('an', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-flexible-5g-antena-substrate'),
    (SELECT id FROM public.people WHERE full_name = 'an' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-flexible-5g-antena-substrate'),
    (SELECT id FROM public.people WHERE full_name = 'Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Raghun', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-flexible-5g-antena-substrate'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Raghun' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('an Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-flexible-5g-antena-substrate'),
    (SELECT id FROM public.people WHERE full_name = 'an Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Prabhat', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-flexible-5g-antena-substrate'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Prabhat' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Kumar Mishra', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'development-of-flexible-5g-antena-substrate'),
    (SELECT id FROM public.people WHERE full_name = 'Kumar Mishra' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 24: Digirakshak – Smart Safety Device for Women, Kids & Teenagers
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'digirakshak-smart-safety-device-for-women-kids-teenagers',
    'Digirakshak – Smart Safety Device for Women, Kids & Teenagers',
    'Digirakshak is a compact IoT-based wearable safety device that enables instant emergency alerts using GSM, GPS, and touch activation—without relying on a smartphone. It ensures real-time tracking and reliable communication, offering discreet and affordable protection during emergencies.',
    'NA',
    'NA',
    13065,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_c0r4b5c0r4b5c0r4-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Kuldeep Pathak', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'digirakshak-smart-safety-device-for-women-kids-teenagers'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Kuldeep Pathak' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'digirakshak-smart-safety-device-for-women-kids-teenagers'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Aryak Sahai', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'digirakshak-smart-safety-device-for-women-kids-teenagers'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Aryak Sahai' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vatsal Garg', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'digirakshak-smart-safety-device-for-women-kids-teenagers'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vatsal Garg' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 25: E-Sugarcane  Crusher
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'e-sugarcane-crusher',
    'E-Sugarcane  Crusher',
    'The E-Sugarcane Mobile Juicer Machine is an eco-friendly sugarcane crusher that replaces the traditional diesel engine with an electric DC motor powered by a lithium ferro phosphate battery. This system efficiently extracts sugarcane juice while reducing noise and air pollution.',
    'NA',
    'NA',
    255434.33,
    'https://navrachnafoundation.com/wp-content/uploads/2025/11/IMG-20240722-WA0064-600x450.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'e-sugarcane-crusher'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mayank Raj', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'e-sugarcane-crusher'),
    (SELECT id FROM public.people WHERE full_name = 'Mayank Raj' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Nitish Kumar Yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'e-sugarcane-crusher'),
    (SELECT id FROM public.people WHERE full_name = 'Nitish Kumar Yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Aakash Bhati', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'e-sugarcane-crusher'),
    (SELECT id FROM public.people WHERE full_name = 'Aakash Bhati' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Rituraj Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'e-sugarcane-crusher'),
    (SELECT id FROM public.people WHERE full_name = 'Rituraj Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Shwetank Gupta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'e-sugarcane-crusher'),
    (SELECT id FROM public.people WHERE full_name = 'Shwetank Gupta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 26: Enterprise Security and Automation
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'enterprise-security-and-automation',
    'Enterprise Security and Automation',
    'Enterprise Security and Automation is a comprehensive solution for managing large-scale premises and critical infrastructure. Utilizing deep learning and camera-based systems, it autonomously monitors security factors and real-time hardware. The system analyzes activities to alert authorities or mitigate issues, ensuring efficient operations and enhanced safety in highfrequency movement zones.',
    'NA',
    'NA',
    271571.05,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-26-600x600.png',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sudhanshu Ranjan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'enterprise-security-and-automation'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sudhanshu Ranjan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'enterprise-security-and-automation'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'enterprise-security-and-automation'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Samiruddin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'enterprise-security-and-automation'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Samiruddin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'enterprise-security-and-automation'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 27: EV Battery Charger
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'ev-battery-charger',
    'EV Battery Charger',
    'We designed a system to charge EV batteries while the vehicle is running. Magnets attached to the chassis move during shocks or vibrations from the road, inducing electric current. This regenerative energy is harvested to recharge the battery continuously, extending the vehicle''s driving range.',
    'NA',
    'NA',
    246426.76,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-15.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Mohit Saxena', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'ev-battery-charger'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Mohit Saxena' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vipul Maurya', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'ev-battery-charger'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vipul Maurya' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vedant Sharma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'ev-battery-charger'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vedant Sharma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 28: Face Attendance Management System – FaceAMS
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'face-attendance-management-system-faceams',
    'Face Attendance Management System – FaceAMS',
    'FaceAMS revolutionizes attendance tracking by leveraging Artificial Intelligence to streamline operations in educational institutions. By combining a processing unit with a Pan-Tilt-Zoom (PTZ) camera, the system works in unison to efficiently record attendance. This innovative solution replaces manual methods with precise, automated monitoring.',
    'Granted',
    '202311008496',
    237896.96,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-23-600x450.png',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Agha Asim Husain', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'face-attendance-management-system-faceams'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Agha Asim Husain' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'face-attendance-management-system-faceams'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'face-attendance-management-system-faceams'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Aman Pratap Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'face-attendance-management-system-faceams'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Aman Pratap Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 29: Farmers Friend / Rice Planting Machine
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'farmers-friend-rice-planting-machine',
    'Farmers Friend / Rice Planting Machine',
    'Agriculture plays a major role in India’s economy and employs a large portion of the population. Among various crops, rice is the most widely grown and consumed. However, with a growing population and the need for development, it is important to reduce manual labour in farming and shift the workforce to other sectors. Mechanization in paddy farming can help achieve this by increasing productivity and reducing dependency on manual labour.The aim of this project is to design a paddy transplanting mechanism that helps small scale farmers plant rice seedlings more efficiently. The proposed machine, named Farmer’s Friend, is developed to solve the challenges faced during manual paddy planting. It ensures proper spacing between plants, which improves crop growth and overall yield. Powered by a 300cc engine and capable of planting 8 rows at a time, this machine is significantly more efficient than traditional manual planting methods, helping farmers save time, effort, and labour costs while increasing productivity.',
    'NA',
    'NA',
    254873.06,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/20200902_180814-600x1234.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'farmers-friend-rice-planting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Jeevesh Gupta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'farmers-friend-rice-planting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Jeevesh Gupta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Srishti Kumari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'farmers-friend-rice-planting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Srishti Kumari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 30: FertoBot
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'fertobot',
    'FertoBot',
    'FertoBot is an autonomous precision-agriculture bot that uses retractable subterranean sensors and non-visual, AI-driven motion detection to collect real-time soil and environmental data. It enables targeted pesticide and nutrient spraying while operating fully off-grid through a solar-powered, weather-sealed design.',
    'NA',
    'NA',
    157533,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_ggxysdggxysdggxy-600x822.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fertobot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fertobot'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Harshit Dubey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fertobot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Harshit Dubey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Aryan', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fertobot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Aryan' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Krishna Raj', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fertobot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Krishna Raj' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 31: Flywheel Energy Storage System
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'flywheel-energy-storage-system',
    'Flywheel Energy Storage System',
    'This project utilizes a flywheel as a mechanical battery to store kinetic energy. It accelerates a rotor to store energy and retrieves it as electricity. This technology offers a sustainable, efficient alternative to lead-acid batteries, promising reliable energy storage with reduced environmental impact.',
    'NA',
    'NA',
    227515,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-2-600x448.png',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Monika Jain', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'flywheel-energy-storage-system'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Monika Jain' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'flywheel-energy-storage-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'flywheel-energy-storage-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Harshit Kumar Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'flywheel-energy-storage-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Harshit Kumar Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 32: Fully Automatic Shoe Polish Rack
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'fully-automatic-shoe-polish-rack',
    'Fully Automatic Shoe Polish Rack',
    'In response to pandemic hygiene needs, we created an AI-based automatic shoe cleaning and polishing machine. It removes dirt and microorganisms without human contact, preventing virus spread. User-friendly and budget-friendly, this device ensures shoes are sanitized before entering homes or offices, promoting health and safety.',
    'NA',
    'NA',
    133429,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-6-600x720.png',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manvendra Yadav', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fully-automatic-shoe-polish-rack'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manvendra Yadav' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manas Sonwane', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fully-automatic-shoe-polish-rack'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manas Sonwane' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Subham P', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fully-automatic-shoe-polish-rack'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Subham P' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fully-automatic-shoe-polish-rack'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Yash Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'fully-automatic-shoe-polish-rack'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Yash Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 33: General Purpose Delivery Bot
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'general-purpose-delivery-bot',
    'General Purpose Delivery Bot',
    'An autonomous delivery robot integrating biometric security, solar-powered self-charging, and Lidar-SLAM navigation to create a secure and self-sustaining logistics system. It eliminates slow and error-prone manual deliveries by providing reliable, efficient, and verifiable autonomous transport within large institutions.',
    'NA',
    'NA',
    81253,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_f86itjf86itjf86i-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Setu Garg', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Setu Garg' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sudhanshu Ranjan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sudhanshu Ranjan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md Samiruddin Ansari', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Md Samiruddin Ansari' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Upendra Agarwal', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Upendra Agarwal' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Azaz Khan', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Azaz Khan' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Farmaan Akhtar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Farmaan Akhtar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shivam Yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shivam Yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Tannu P', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Tannu P' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Gagan Sahu', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'general-purpose-delivery-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Gagan Sahu' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 34: Greeto AI Bot
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'greeto-ai-bot',
    'Greeto AI Bot',
    'An AI-driven autonomous reception robot that uses dual-camera vision and ROS2-based navigation to greet, guide, and interact with visitors without relying on LiDAR. Equipped with speech recognition and obstacle avoidance, it serves as a cost-effective, smart mobile receptionist for indoor environments.',
    'NA',
    'NA',
    198000,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_5rg2y15rg2y15rg2-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'greeto-ai-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'greeto-ai-bot'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Abhishek Patel', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'greeto-ai-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Abhishek Patel' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ayush Shakya', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'greeto-ai-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ayush Shakya' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Priya Saini', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'greeto-ai-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Priya Saini' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 35: Heart  Monitoring  System
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'heart-monitoring-system',
    'Heart  Monitoring  System',
    'Today, medical technology is advancing rapidly, especially in areas like diabetes and cardiac care. However, real-time health issues such as sudden heart attacks, asthma, and other cardiac conditions often occur far from medical facilities, making timely treatment difficult.Heart disease is one of the leading causes of death worldwide. Each year, millions of people die due to complications related to high blood pressure, cholesterol, and delayed medical response.With the growing use of smartphones and internet connectivity, technology can help bridge this gap. Most people carry smartphones equipped with GPS, sensors, and real-time communication features. Using this advantage, we developed a mobile application that works with wearable sensors to continuously monitor, store, and transmit a patient’s health data to doctors from anywhere.Wearable technology helps track vital signs even when the user is moving, thanks to multiple compact sensors built into a single device. This project focuses on integrating wearable sensors with smartphones to create a real-time remote monitoring system for heart patients. The device collects health data and transfers it to the application via Bluetooth or Wi-Fi, enabling faster medical support when needed',
    'Granted',
    '201911030638',
    166936.37,
    'https://navrachnafoundation.com/wp-content/uploads/2025/11/HeartMS-600x450.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Rajiv Ranjan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'heart-monitoring-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Rajiv Ranjan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Anil Prajapati', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'heart-monitoring-system'),
    (SELECT id FROM public.people WHERE full_name = 'Anil Prajapati' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Tuiba Mushtaq', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'heart-monitoring-system'),
    (SELECT id FROM public.people WHERE full_name = 'Tuiba Mushtaq' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Aakash Gupta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'heart-monitoring-system'),
    (SELECT id FROM public.people WHERE full_name = 'Aakash Gupta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 36: High Power Density Modular BLDC Motor Controller
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'high-power-density-modular-bldc-motor-controller',
    'High Power Density Modular BLDC Motor Controller',
    'BLDC motor controllers often fail due to thermal runaway from improper current monitoring. Existing controllers are hard to repair. We developed a high power density modular controller that addresses these thermal issues, offering a more reliable, repairable, and robust solution for electric motor management.',
    'Granted',
    '202211011991',
    250779.1,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-13-600x338.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Harshit Kumar Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'high-power-density-modular-bldc-motor-controller'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Harshit Kumar Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Nidhi Sharma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'high-power-density-modular-bldc-motor-controller'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Nidhi Sharma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 37: Hospital Assistant Robot
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'hospital-assistant-robot',
    'Hospital Assistant Robot',
    'Designed for pandemics, this robot manages oxygen and assists in hospital wards, keeping patients separate from health workers. It reduces infection risks and eases the burden on staff. By automating tasks, it ensures proper care and safety for both patients and medical personnel during crises.',
    'NA',
    'NA',
    264391,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-3-600x600.png',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Er. Astha Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'hospital-assistant-robot'),
    (SELECT id FROM public.people WHERE full_name = 'Er. Astha Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'hospital-assistant-robot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Jeevesh Gupta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'hospital-assistant-robot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Jeevesh Gupta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 38: Hybrid Vehicle Washing System
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'hybrid-vehicle-washing-system',
    'Hybrid Vehicle Washing System',
    'Vehicle washing wastes significant water. Our hybrid vehicle washing system addresses this by minimizing water usage, helping control scarcity. Compared to traditional methods, this eco-friendly solution drastically reduces waste while maintaining cleaning effectiveness, making it a sustainable choice for waste management and water conservation efforts.',
    'Granted',
    '202211011255',
    252412.32,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-18.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Brijesh Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'hybrid-vehicle-washing-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Brijesh Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Abhishek Pal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'hybrid-vehicle-washing-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Abhishek Pal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Akash', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'hybrid-vehicle-washing-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Akash' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 39: IF-YO-NO (Open-source mc Board)
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'if-yo-no-open-source-mc-board',
    'IF-YO-NO (Open-source mc Board)',
    'IF-YO-NO is a &#8220;Made in India&#8221; open-source microcontroller board designed to overcome Arduino''s limitations. It addresses issues like lack of multitasking, poor performance, and limited memory. This updated board provides a more optimized, powerful platform for robotics and automation students, facilitating better learning and more complex project development capabilities.',
    'NA',
    'NA',
    276795.6,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/IF-U-NO-2-600x270.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sachin Sharma', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'if-yo-no-open-source-mc-board'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sachin Sharma' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Anannya Sharma UPID', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'if-yo-no-open-source-mc-board'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Anannya Sharma UPID' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'if-yo-no-open-source-mc-board'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'if-yo-no-open-source-mc-board'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 40: Indigenius Kamikaze Drone
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'indigenius-kamikaze-drone',
    'Indigenius Kamikaze Drone',
    'Indigenius Kamikaze Drone is an advanced long-range FPV drone that combines high-velocity performance with secure, autonomous intelligence gathering. Its modular design and dual-mode flight system make it a flexible solution for precision surveillance across diverse operational environments.',
    'NA',
    'NA',
    195216,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_ovpqxkovpqxkovpq-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sudhanshu Rnajan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'indigenius-kamikaze-drone'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sudhanshu Rnajan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Anshuman Singh Chauhan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'indigenius-kamikaze-drone'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Anshuman Singh Chauhan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shivam Rajput', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'indigenius-kamikaze-drone'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shivam Rajput' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Aman Dubey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'indigenius-kamikaze-drone'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Aman Dubey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ritik Mal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'indigenius-kamikaze-drone'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ritik Mal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 41: Integrated Fixed Ratio Diet Mixing and Cutting Machine
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'integrated-fixed-ratio-diet-mixing-and-cutting-machine',
    'Integrated Fixed Ratio Diet Mixing and Cutting Machine',
    'The IFR Diet Machine is designed to help dairy farmers provide a healthier and well-balanced diet to their animals. It efficiently cuts green fodder and mixes essential nutrients uniformly, ensuring cows receive the right amount of nutrition. Animals also find the feed more appealing, which improves their intake and overall health.This machine is especially beneficial for small dairy farmers, as it helps improve productivity and supports growth in the dairy sector. The IFR Diet Machine is intended specifically for use in dairy farming and contributes to better animal care and improved milk production.',
    'NA',
    '202311008498',
    205196.25,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-21-600x337.png',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Chetan Dixit', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'integrated-fixed-ratio-diet-mixing-and-cutting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Chetan Dixit' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shivendra Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'integrated-fixed-ratio-diet-mixing-and-cutting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shivendra Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Suraj Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'integrated-fixed-ratio-diet-mixing-and-cutting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Suraj Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'integrated-fixed-ratio-diet-mixing-and-cutting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 42: InventoJoy
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'inventojoy',
    'InventoJoy',
    'Inventojoy offers eco-friendly 3D puzzle sheets that children assemble into toys, blending creativity, learning, and sustainability in a unique play format. It promotes skill development while replacing plastic toys with a safe, educational, and planet-friendly alternative.',
    'NA',
    'NA',
    196080,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_c21o6oc21o6oc21o-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'inventojoy'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Dev Kh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'inventojoy'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Dev Kh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('uja', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'inventojoy'),
    (SELECT id FROM public.people WHERE full_name = 'uja' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Krishna yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'inventojoy'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Krishna yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Aaditya Vats', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'inventojoy'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Aaditya Vats' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 43: IOT Based Smart Mirror for Multi- Dimensional Applications
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'iot-based-smart-mirror-for-multi-dimensional-applications',
    'IOT Based Smart Mirror for Multi- Dimensional Applications',
    'This project presents a low-cost, general-purpose smart mirror integrating vital health parameter monitoring and user authentication. It delivers multimedia capabilities while maintaining high security. Designed for versatility, this innovative device combines personal wellness tracking with entertainment features, offering a secure, multi-dimensional user experience for modern smart homes and personal convenience.',
    'Granted',
    '202311008494',
    260917.46,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-8.49.37-PM-600x800.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Setu Garg', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iot-based-smart-mirror-for-multi-dimensional-applications'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Setu Garg' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Pragati Tripathi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iot-based-smart-mirror-for-multi-dimensional-applications'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Pragati Tripathi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Monika Jain', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iot-based-smart-mirror-for-multi-dimensional-applications'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Monika Jain' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 44: IRON LUNG – Smart Respiratory Training System for Pollution-Exposed Populations
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'iron-lung-smart-respiratory-training-system-for-pollution-exposed-populations',
    'IRON LUNG – Smart Respiratory Training System for Pollution-Exposed Populations',
    'IRON LUNG is a smart respiratory training system designed to help people exposed to high levels of air pollution. It aims to strengthen respiratory muscles and improve lung function — helping counteract the negative impact of chronic exposure to particulate matter and pollutants. By providing structured breathing exercises or assisted breathing support, it helps maintain or restore healthy lung mechanics, potentially reducing risks associated with long-term air pollution exposure (e.g., reduced lung capacity, chronic lung disease).',
    'NA',
    'NA',
    141800,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/PHOTO-2025-11-26-21-43-41-600x777.jpg',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. An', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iron-lung-smart-respiratory-training-system-for-pollution-exposed-populations'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. An' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iron-lung-smart-respiratory-training-system-for-pollution-exposed-populations'),
    (SELECT id FROM public.people WHERE full_name = 'Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iron-lung-smart-respiratory-training-system-for-pollution-exposed-populations'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iron-lung-smart-respiratory-training-system-for-pollution-exposed-populations'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vansh Agarwal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iron-lung-smart-respiratory-training-system-for-pollution-exposed-populations'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vansh Agarwal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Aditi Tripathi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iron-lung-smart-respiratory-training-system-for-pollution-exposed-populations'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Aditi Tripathi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Priyaranjan Tiwari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'iron-lung-smart-respiratory-training-system-for-pollution-exposed-populations'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Priyaranjan Tiwari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 45: Kinetic Chandelier
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'kinetic-chandelier',
    'Kinetic Chandelier',
    'The invention presents a kinetic chandelier with translucent, lightdiffusing wings that move up and down to create a graceful, fishlike swimming illusion. Multiple illuminated wings connect to a central body in a wave-like arrangement, producing a mesmerizing, immersive, underwater-inspired visual experience.',
    'NA',
    'NA',
    258612.59,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-9.23.25-PM-600x336.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Upendra Agrwal', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'kinetic-chandelier'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Upendra Agrwal' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'kinetic-chandelier'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'kinetic-chandelier'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Samiruddin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'kinetic-chandelier'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Samiruddin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'kinetic-chandelier'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 46: Kitchen Automation
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'kitchen-automation',
    'Kitchen Automation',
    'This project automates finding kitchen utilities like spice boxes. Using voice commands, a linear actuator connected to an IoT system moves the requested item forward. This smart system helps cooks easily locate and manage ingredients, streamlining the cooking process and organizing kitchen storage efficiently.',
    'NA',
    'NA',
    160456,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-5-600x338.png',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Nidhi Puri', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'kitchen-automation'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Nidhi Puri' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ayushi Agarwal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'kitchen-automation'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ayushi Agarwal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 47: Knee and Ankle Continuous Passive Motion (CPM) Machine
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'knee-and-ankle-continuous-passive-motion-cpm-machine',
    'Knee and Ankle Continuous Passive Motion (CPM) Machine',
    'Post-surgery muscle stiffness requires time-consuming therapy. We developed an automated Knee and Ankle Continuous Passive Motion (CPM) machine to address this. This device automates below-waist joint movements, significantly reducing the manual effort required from physiotherapists. It allows them to treat more patients efficiently while ensuring consistent, effective rehabilitation therapy.',
    'Granted',
    '202411003219',
    163391.25,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/CPM-Knee-Ankel-600x800.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Chetan Dixit', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'knee-and-ankle-continuous-passive-motion-cpm-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Chetan Dixit' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Deepanjan', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'knee-and-ankle-continuous-passive-motion-cpm-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Deepanjan' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Suraj Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'knee-and-ankle-continuous-passive-motion-cpm-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Suraj Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ashwin Yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'knee-and-ankle-continuous-passive-motion-cpm-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ashwin Yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 48: Micro Hydro Power Water Wheel
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'micro-hydro-power-water-wheel',
    'Micro Hydro Power Water Wheel',
    'This project combines a micro hydro water wheel with air compression for energy storage. As the wheel rotates in small streams, it compresses air, which is stored and later used to drive an air motor for electricity. It enables decentralized power generation even from low-flow water sources.',
    'NA',
    'NA',
    275553,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-14-600x338.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Surendra Pal Sharma', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'micro-hydro-power-water-wheel'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Surendra Pal Sharma' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Lovely Gupta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'micro-hydro-power-water-wheel'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Lovely Gupta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 49: Mid-Day Meal Automated Reporting and Management System
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'mid-day-meal-automated-reporting-and-management-system',
    'Mid-Day Meal Automated Reporting and Management System',
    'Monitoring India''s massive Mid-Day Meal program is challenging. We developed an automated auditing system using face detection and food recognition. This solution replaces manual reporting, ensuring accurate data on meals served. It helps evaluate the program''s impact on school enrollment and nutrition, improving accountability and efficiency.',
    'Granted',
    '202211013351',
    259781.47,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-7.26.11-PM-600x1071.jpeg',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Ayub Khan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'mid-day-meal-automated-reporting-and-management-system'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Ayub Khan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manvendra Yadav', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'mid-day-meal-automated-reporting-and-management-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manvendra Yadav' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'mid-day-meal-automated-reporting-and-management-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Devraj Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'mid-day-meal-automated-reporting-and-management-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Devraj Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 50: Milk Adulteration Testing Unit
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'milk-adulteration-testing-unit',
    'Milk Adulteration Testing Unit',
    'Milk adulteration poses serious health and economic risks in India. We developed a testing unit to detect common adulterants like water, urea, and chemicals. This device combats weak regulatory oversight and supply chain complexities, empowering consumers and legitimate producers to ensure milk safety, prevent health hazards, and restore market confidence.',
    'NA',
    'NA',
    263458.6,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/MATU-600x800.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sudhanshu Ranjan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'milk-adulteration-testing-unit'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sudhanshu Ranjan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'milk-adulteration-testing-unit'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'milk-adulteration-testing-unit'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Samiruddin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'milk-adulteration-testing-unit'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Samiruddin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'milk-adulteration-testing-unit'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 51: Milk Spilling Control Unit
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'milk-spilling-control-unit',
    'Milk Spilling Control Unit',
    'Boiling milk requires constant attention to prevent spilling, wasting time. We developed a control unit to resolve this. Unlike expensive market options, our device automatically manages the boiling process. It allows users to multitask without worry, preventing spills and saving valuable time in daily kitchen routines.',
    'Granted',
    '202011047901',
    112663,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-600x450.jpeg',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Er. Astha Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'milk-spilling-control-unit'),
    (SELECT id FROM public.people WHERE full_name = 'Er. Astha Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('amp;', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'milk-spilling-control-unit'),
    (SELECT id FROM public.people WHERE full_name = 'amp;' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'milk-spilling-control-unit'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Utkarsh Srivastava', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'milk-spilling-control-unit'),
    (SELECT id FROM public.people WHERE full_name = 'Utkarsh Srivastava' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 52: mmWave Switch
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'mmwave-switch',
    'mmWave Switch',
    'A smart switch integrating mmWave radar to detect presence, occupancy, and vital signs without contact. It combines home automation with passive health monitoring, offering real-time alerts and enhanced safety.',
    'NA',
    'NA',
    200000,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-9.35.53-PM-600x336.jpeg',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md Samiruddin Ansari', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'mmwave-switch'),
    (SELECT id FROM public.people WHERE full_name = 'Md Samiruddin Ansari' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Deepak Kumar Prajapati', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'mmwave-switch'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Deepak Kumar Prajapati' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Kalash Yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'mmwave-switch'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Kalash Yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Alok Kumar Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'mmwave-switch'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Alok Kumar Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 53: Modular BLDC E-Motor
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'modular-bldc-e-motor',
    'Modular BLDC E-Motor',
    'This project enhances Modular BLDC motors by increasing power density through shortened magnetic field lines. By stacking a greater number of rotors, we significantly boost torque output. This configuration offers a more powerful and efficient motor solution, addressing the need for highperformance electric propulsion systems.',
    'Granted',
    '5528973',
    239206,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-10-600x657.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Harshit Kumar Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'modular-bldc-e-motor'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Harshit Kumar Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Nidhi Sharma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'modular-bldc-e-motor'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Nidhi Sharma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 54: Digital Healthcare Assistant
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'digital-healthcare-assistant',
    'Digital Healthcare Assistant',
    'This system leverages a Raspberry Pi to create a wireless sensor network for real-time patient monitoring. By collecting vital health data from multiple sensor nodes and transmitting it to a central server, it enables doctors to remotely track patient status and receive immediate alerts for critical anomalies.',
    'Granted',
    '202311008495',
    266745.17,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-25-600x319.png',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Setu Garg', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'digital-healthcare-assistant'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Setu Garg' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Ainul Hasan', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'digital-healthcare-assistant'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Ainul Hasan' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Aditya Shankar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'digital-healthcare-assistant'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Aditya Shankar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'digital-healthcare-assistant'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ashwin Yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'digital-healthcare-assistant'),
    (SELECT id FROM public.people WHERE full_name = 'Ashwin Yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 55: Multi-Utility E-Tractor
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'multi-utility-e-tractor',
    'Multi-Utility E-Tractor',
    'Current e-tractors struggle with torque and mileage trade-offs. Our multi-utility e-tractor uses a three-motor variable power enhancer to deliver high torque when needed and maximize mileage otherwise. Features include autonomous waypoint driving for ploughing, IoT multitasking, and a detachable rear component for stable road driving.',
    'NA',
    'NA',
    264973.43,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-6.15.28-PM-600x1071.jpeg',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Hemant Raja', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'multi-utility-e-tractor'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Hemant Raja' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md Samiruddin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'multi-utility-e-tractor'),
    (SELECT id FROM public.people WHERE full_name = 'Md Samiruddin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Shubham', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'multi-utility-e-tractor'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Shubham' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'multi-utility-e-tractor'),
    (SELECT id FROM public.people WHERE full_name = 'Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 56: Natural Air Purifier
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'natural-air-purifier',
    'Natural Air Purifier',
    'This natural air purifier cleans contained environments using water. A fan circulates pressurized air, while a water pump sprays fine particles to wash away pollutants and dissolve matter. It includes a water level indicator to alert users, offering a simple, effective solution for maintaining indoor air quality.',
    'NA',
    'NA',
    255122.63,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-6.49.16-PM-600x1071.jpeg',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Surendra Pal Sharma', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'natural-air-purifier'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Surendra Pal Sharma' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Raj Kumar Shukla', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'natural-air-purifier'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Raj Kumar Shukla' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vinit Yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'natural-air-purifier'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vinit Yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 57: Online payment device for Machine of Beverages
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'online-payment-device-for-machine-of-beverages',
    'Online payment device for Machine of Beverages',
    'This project facilitates online payments for vending machines. It initiates transactions via mobile terminals by scanning a QR code generated by the machine. The system pushes a commodity display interface to the user''s phone, allowing product selection and payment completion, modernizing the vending experience with digital convenience.',
    'NA',
    'NA',
    253737.81,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-9-600x600.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.Jeevesh Gupta', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'online-payment-device-for-machine-of-beverages'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.Jeevesh Gupta' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Nikunj Kushik', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'online-payment-device-for-machine-of-beverages'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Nikunj Kushik' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Saket Tiwari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'online-payment-device-for-machine-of-beverages'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Saket Tiwari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 58: Patient Remote Health Monitoring
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'patient-remote-health-monitoring',
    'Patient Remote Health Monitoring',
    'An IoT-enabled health monitoring device with dedicated platform that continuously collects and transmits patient vitals via a self-healing mesh network to a cloud-based dashboard. Designed for home and multi-patient hospital use, it ensures reliable, secure, and real-time medical supervision.',
    'NA',
    'NA',
    139520,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_ar9nyhar9nyhar9n-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shashwat P', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'patient-remote-health-monitoring'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shashwat P' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'patient-remote-health-monitoring'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Bharti Sharma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'patient-remote-health-monitoring'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Bharti Sharma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Anubhav Tripathi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'patient-remote-health-monitoring'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Anubhav Tripathi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Saksham Varshney', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'patient-remote-health-monitoring'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Saksham Varshney' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 59: QR Code and Packing List Inspection System
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'qr-code-and-packing-list-inspection-system',
    'QR Code and Packing List Inspection System',
    'This device automates product testing and verification using QR codes. It inspects each item to detect repetition or duplication, ensuring inventory accuracy. By placing and scanning QR codes, the system simultaneously verifies the product against the packing list, streamlining quality control and preventing errors in shipping.',
    'NA',
    'NA',
    256158.37,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-6.19.03-PM-600x336.jpeg',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ayub Khan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'qr-code-and-packing-list-inspection-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ayub Khan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md Akram', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'qr-code-and-packing-list-inspection-system'),
    (SELECT id FROM public.people WHERE full_name = 'Md Akram' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vaibhav Siroha', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'qr-code-and-packing-list-inspection-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vaibhav Siroha' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 60: Rail Generator
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'rail-generator',
    'Rail Generator',
    'This project presents a novel multi-rotor Induction/Permanent Magnet Generator designed for higher efficiency, increased power density, compact size, and cost-effective operation.Unlike conventional generators, this system eliminates the use of a stationary stator. Instead, it uses multiple rotors—either identical or a combination of different types—that rotate in opposite directions. This innovative rotor arrangement allows the generator to produce more electrical power within a smaller physical space. The design supports both AC and DC power generation and introduces a new approach to alternator architecture for improved performance.',
    'Granted',
    '2018111025513',
    240828.96,
    'https://navrachnafoundation.com/wp-content/uploads/2025/11/20240722_52026PMByGPSMapCamera-600x450.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr.Monika Jain', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'rail-generator'),
    (SELECT id FROM public.people WHERE full_name = 'Dr.Monika Jain' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Harshit Kumar Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'rail-generator'),
    (SELECT id FROM public.people WHERE full_name = 'Harshit Kumar Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 61: Reception Bot
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'reception-bot',
    'Reception Bot',
    'A Reception Robot is designed to welcome and assist visitors at offices, colleges, or malls. It can greet guests, provide information about the place, show videos, share news or product details, and even help with basic services like receiving payments.This robot can also serve items like water, tea, or coffee—reducing the need for helper staff. With Google Home integration, visitors can ask questions and get answers directly from the robot. It is equipped with face recognition, so it can identify returning visitors.The robot uses two powerful BLDC motors and can carry up to 5 kg along with its own weight. It can be controlled through a remote, voice commands, or programmed tasks. A front storage space is provided to hold and deliver items safely.',
    'NA',
    'NA',
    223197.65,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Reception-Robot-for-serving-tea-and-water-for-guests-1-600x699.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Saurav Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'reception-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Saurav Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Syed Yusuf Amin', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'reception-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Syed Yusuf Amin' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Harshit Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'reception-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Harshit Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mayank Raj', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'reception-bot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mayank Raj' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 62: Rice Threshing Cum Chaff Cutting Machine
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'rice-threshing-cum-chaff-cutting-machine',
    'Rice Threshing Cum Chaff Cutting Machine',
    'Threshing separates grain from straw. Manual threshing preserves straw quality for animal feed but is labor-intensive. Existing machines damage straw. This project develops a machine that threshes efficiently like manual methods, preserving straw quality for feed while reducing labor, offering a versatile solution for farmers.',
    'NA',
    'NA',
    177951.03,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-5.54.31-PM-600x336.jpeg',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manvendra Yadav', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'rice-threshing-cum-chaff-cutting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manvendra Yadav' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Suraj Vishvakarma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'rice-threshing-cum-chaff-cutting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Suraj Vishvakarma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Alok Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'rice-threshing-cum-chaff-cutting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Alok Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ashutosh Yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'rice-threshing-cum-chaff-cutting-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ashutosh Yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 63: Self-Cleaned Sanitized Dining Table
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'self-cleaned-sanitized-dining-table',
    'Self-Cleaned Sanitized Dining Table',
    'Amidst the pandemic, hygiene is paramount. We developed a self-cleaning dining table equipped with UVC light to eliminate coronaviruses and sanitize surfaces automatically. This innovation replaces manual cleaning, saving labor and water while ensuring effective sterilization in homes, restaurants, and hotels for safer dining experiences.',
    'NA',
    'NA',
    216323,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-5.42.04-PM-600x1071.jpeg',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Kamal Gupta', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'self-cleaned-sanitized-dining-table'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Kamal Gupta' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Yash Sharma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'self-cleaned-sanitized-dining-table'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Yash Sharma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 64: Sewage  Cleaning  Machine
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'sewage-cleaning-machine',
    'Sewage  Cleaning  Machine',
    'Manual scavenging is the process where workers are forced to enter manholes, sewers, or septic tanks to manually clean human waste. This practice is illegal in India since 2013, yet it continues in many places due to lack of alternatives and affordable cleaning machines.Every year, hundreds of workers lose their lives while cleaning sewers. According to a study by the Tata Institute of Social Sciences, around 80% of these workers die before the age of 60 because of accidents, toxic gases, or work-related health issues. Many scavengers report that they have no choice but to enter manholes for their livelihood.Despite the known dangers and existing laws, manual scavenging still exists in India due to the absence of low-cost mechanized solutions for sewer cleaning.',
    'NA',
    'NA',
    236493.99,
    'https://navrachnafoundation.com/wp-content/uploads/2025/11/20240722_52114PMByGPSMapCamera-600x800.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manvendra Yadav', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sewage-cleaning-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manvendra Yadav' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Aashu kumar jha', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sewage-cleaning-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Aashu kumar jha' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Shafique', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sewage-cleaning-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Shafique' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Aman', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sewage-cleaning-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Aman' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Shrivastva', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sewage-cleaning-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Shrivastva' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Shamsad Ahmad', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sewage-cleaning-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Shamsad Ahmad' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Prashant Mishra', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sewage-cleaning-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Prashant Mishra' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 65: Shellac Ink for disposable Printed Electronics
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'shellac-ink-for-disposable-printed-electronics',
    'Shellac Ink for disposable Printed Electronics',
    'A renewable shellac-based conductive ink designed for short-lived, printable electronics, combining conductive particles with a biodegradable binder. It offers a cost-effective, moisture-stable alternative to traditional metal conductors in smart packaging applications.',
    'NA',
    'NA',
    193500,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_aeje7xaeje7xaeje-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Dr. Praveen Ch', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'shellac-ink-for-disposable-printed-electronics'),
    (SELECT id FROM public.people WHERE full_name = 'Dr. Praveen Ch' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ra Jha', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'shellac-ink-for-disposable-printed-electronics'),
    (SELECT id FROM public.people WHERE full_name = 'ra Jha' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Aniket An', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'shellac-ink-for-disposable-printed-electronics'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Aniket An' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sanjay Pratap Rao', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'shellac-ink-for-disposable-printed-electronics'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sanjay Pratap Rao' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 66: Smart Blind Cane
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'smart-blind-cane',
    'Smart Blind Cane',
    'A next-generation Smart Blind Cane integrating AI-based object recognition, GPS tracking, GSM communication, and voice-command control to support safe, independent navigation for visually impaired users. It also enables two-way voice communication and automatic emergency alerts with live location sharing.',
    'NA',
    'NA',
    180000,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_9iqrzr9iqrzr9iqr-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sudhanshu Rnajan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-blind-cane'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sudhanshu Rnajan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ayush', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-blind-cane'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ayush' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms.Mani Mittal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-blind-cane'),
    (SELECT id FROM public.people WHERE full_name = 'Ms.Mani Mittal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Utkarsh Joshi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-blind-cane'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Utkarsh Joshi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 67: Smart E-Bike
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'smart-e-bike',
    'Smart E-Bike',
    'The main objective of the E-Smart Bike is to reduce air pollution, noise pollution, and global warming by using an eco friendly electric system. It also focuses on improving rider safety and security through IoT-based features, while supporting automation in the automobile sector.The bike offers a top speed of 80 km/h, a charging time of 2–2.5 hours, and a long range on a full charge. Its running cost is much lower compared to petrol bikes.For security, it includes advanced IoT features such as biometric thumb start, GPS tracking, and complete vehicle monitoring through an Android/iOS application',
    'NA',
    'NA',
    194172.89,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/SmartBike-600x450.jpeg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manvendra Yadav', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manvendra Yadav' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Akarsh P', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Akarsh P' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Keshav Kashyap', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Keshav Kashyap' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr.', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr.' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Arshad Iqbaal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Arshad Iqbaal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Azarharudin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Azarharudin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Akash', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Akash' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Abhishek Shrivastava', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Abhishek Shrivastava' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Achal Khanna', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Achal Khanna' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Bhartendu Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Bhartendu Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Akh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Akh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('ey', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-e-bike'),
    (SELECT id FROM public.people WHERE full_name = 'ey' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 68: Smart Inhaler
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'smart-inhaler',
    'Smart Inhaler',
    'Asthma is a condition where a person''s airways become inflamed, narrow, and produce excess mucus, making it difficult to breathe. It can range from mild to severe and may interfere with daily activities. In serious cases, it can even become life-threatening.According to available data, around 235 million people worldwide are affected by asthma, and nearly one in every ten patients is from India. In India alone, about 4,000 deaths occur each year due to asthma. Currently, most inhalers use medications like sodium cromoglicate or nedocromil, which have been highly effective in providing quick relief and saving lives',
    'NA',
    'NA',
    156457.89,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/smart-Inhaler-600x450.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ashish Gupta', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-inhaler'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ashish Gupta' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Sagar Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-inhaler'),
    (SELECT id FROM public.people WHERE full_name = 'Sagar Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Yashraj Jaiswal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-inhaler'),
    (SELECT id FROM public.people WHERE full_name = 'Yashraj Jaiswal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Nanu Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-inhaler'),
    (SELECT id FROM public.people WHERE full_name = 'Nanu Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 69: Smart Kalam
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'smart-kalam',
    'Smart Kalam',
    'A real-time digital pen that uses dot-matrix sensing to instantly convert handwritten content into digital data without the need for special tablets. SmartKalam offers a natural writing experience on low-cost paper, making it ideal for healthcare, education, and governance.',
    'NA',
    'NA',
    200000,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_7sepf87sepf87sep-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md Samiruddin Ansari', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-kalam'),
    (SELECT id FROM public.people WHERE full_name = 'Md Samiruddin Ansari' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ashray Mangal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-kalam'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ashray Mangal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Parul Bhardwaj', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-kalam'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Parul Bhardwaj' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vidit Gaur', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-kalam'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vidit Gaur' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 70: Smart Machine Box
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'smart-machine-box',
    'Smart Machine Box',
    'SMB simplifies data collection by embedding interfaces for mainstream controllers like FANUC and Siemens, eliminating connectivity issues. It monitors machine status, calculates production figures, and reports to servers for visualization. With built-in modules for fault alerts and utilization management, SMB offers a seamless solution for shop floor integration and cloud connectivity.',
    'Granted',
    '202311008497',
    275013,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-19.png',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ayub Khan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-machine-box'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ayub Khan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Gagan Sahu', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-machine-box'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Gagan Sahu' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shivansh Seth', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-machine-box'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shivansh Seth' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Gautam Negi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-machine-box'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Gautam Negi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 71: Smart Sense Whitewash Technology
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'smart-sense-whitewash-technology',
    'Smart Sense Whitewash Technology',
    'Whitewashing is often tedious and messy. We developed a unique high-pressure spray system to replace brushes and rollers. A control panel manages tilt, flow, and height, ensuring uniform coverage and eliminating spills. This automated solution saves time and effort while providing a superior, consistent finish.',
    'Granted',
    '202111035713',
    148690,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-5.20.50-PM-600x1071.jpeg',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-sense-whitewash-technology'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Saurav Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-sense-whitewash-technology'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Saurav Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Nidhi Sharma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-sense-whitewash-technology'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Nidhi Sharma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mayank Raj', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-sense-whitewash-technology'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mayank Raj' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 72: Smart Solar Panel Cleaning System
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'smart-solar-panel-cleaning-system',
    'Smart Solar Panel Cleaning System',
    'Solar energy is produced in the sun through fusion reactions, and in just one hour, it generates enough energy to power the entire world for a year. This energy can be captured using photovoltaic cells, which convert sunlight into electricity through the photoelectric effect. As a clean and renewable resource, solar power has the potential to meet global energy demands.Solar panels work best when they are positioned directly toward the sun, especially between 9 AM and 3 PM. To ensure maximum efficiency, the panels must also be kept clean and free from dust and dirt, as unclean surfaces reduce power generation.',
    'Granted',
    '202111002482',
    20913199,
    'https://navrachnafoundation.com/wp-content/uploads/2025/11/20240722_52049PMByGPSMapCamera-600x450.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mahip Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-solar-panel-cleaning-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mahip Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mayank Raj', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-solar-panel-cleaning-system'),
    (SELECT id FROM public.people WHERE full_name = 'Mayank Raj' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Nitish Kumar Yadav', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-solar-panel-cleaning-system'),
    (SELECT id FROM public.people WHERE full_name = 'Nitish Kumar Yadav' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Aakash Bhati', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-solar-panel-cleaning-system'),
    (SELECT id FROM public.people WHERE full_name = 'Aakash Bhati' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Rituraj Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-solar-panel-cleaning-system'),
    (SELECT id FROM public.people WHERE full_name = 'Rituraj Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Shwetank Gupta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-solar-panel-cleaning-system'),
    (SELECT id FROM public.people WHERE full_name = 'Shwetank Gupta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 73: Smart Trolley
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'smart-trolley',
    'Smart Trolley',
    'Shopping in malls is now a common activity, especially in big cities. However, during weekends and holidays, long queues form at billing counters because barcode scanning takes time. To solve this problem, we developed an RFID-based smart trolley system that makes billing faster and reduces waiting time.',
    'NA',
    'NA',
    199871.22,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/smart-trolley-600x400.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Mukesh Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-trolley'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Mukesh Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Hari Om Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-trolley'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Hari Om Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vishal Gaurav Buchhas', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-trolley'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vishal Gaurav Buchhas' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Himanshi Garg', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-trolley'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Himanshi Garg' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 74: Soilo- India''s First 9 in 1 Soil Parameters Checking Portable Device
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'soilo-indias-first-9-in-1-soil-parameters-checking-portable-device',
    'Soilo- India''s First 9 in 1 Soil Parameters Checking Portable Device',
    'Soilo is a portable, AI-powered handheld soil tester that delivers instant, lab-level analysis across nine key soil parameters directly in the field. With GPS tagging, multilingual guidance, and actionable insights, it makes professional soil diagnostics affordable and accessible for farmers, builders, and government users. It is india''s first soil testing device which tests 9 parameters like N, P, K, pH, Mositure, EC, Mg , Zn and Temp with single probe and further integrated with AI software for farmer''s ease.',
    'NA',
    'NA',
    175000,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_u33qnju33qnju33q-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sudhanshu Ranjan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'soilo-indias-first-9-in-1-soil-parameters-checking-portable-device'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sudhanshu Ranjan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Divyansh Dwivedi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'soilo-indias-first-9-in-1-soil-parameters-checking-portable-device'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Divyansh Dwivedi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Deepak Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'soilo-indias-first-9-in-1-soil-parameters-checking-portable-device'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Deepak Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Saksham Negi', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'soilo-indias-first-9-in-1-soil-parameters-checking-portable-device'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Saksham Negi' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 75: Solar- Powered Battery Swapping Station
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'solar-powered-battery-swapping-station',
    'Solar- Powered Battery Swapping Station',
    'To support the growing electric vehicle market, we developed a solar-powered battery swapping station. Unlike conventional griddependent chargers, this sustainable infrastructure harnesses renewable solar energy to recharge batteries. It offers a truly ecofriendly solution for EV charging needs, reducing environmental burden and promoting the widespread adoption of green transportation.',
    'NA',
    'NA',
    269029.07,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Swapping-Station.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sudhanshu Ranjan', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'solar-powered-battery-swapping-station'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sudhanshu Ranjan' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Samiruddin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'solar-powered-battery-swapping-station'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Samiruddin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 76: Sole Sense- The Smart Foot Posture Monitoring Insole
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'sole-sense-the-smart-foot-posture-monitoring-insole',
    'Sole Sense- The Smart Foot Posture Monitoring Insole',
    'SoleSense is an intelligent wearable insole that uses pressure, alignment, and motion sensors to provide real-time gait and posture monitoring with instant corrective feedback. It enhances foot health, prevents injuries, and delivers AI-driven personalized insights for both everyday users and athletes.',
    'NA',
    'NA',
    43799,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_1mx4i01mx4i01mx4-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Kuldeep Pathak', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sole-sense-the-smart-foot-posture-monitoring-insole'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Kuldeep Pathak' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Upendra Kr. Agarwal', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sole-sense-the-smart-foot-posture-monitoring-insole'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Upendra Kr. Agarwal' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Vedansh Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sole-sense-the-smart-foot-posture-monitoring-insole'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Vedansh Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Deepak', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'sole-sense-the-smart-foot-posture-monitoring-insole'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Deepak' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 77: Solid Fertilizer Spreading Machine
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'solid-fertilizer-spreading-machine',
    'Solid Fertilizer Spreading Machine',
    'Spreading solid fertilizer manually is labor-intensive. We developed a portable machine carried on a farmer''s back to automate this. Solid fertilizer falls onto a rotating disc, which spreads it evenly via centrifugal force. This device reduces manual effort and ensures uniform application across fields.',
    'NA',
    'NA',
    214157.18,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-16-600x450.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manvendra Yadav', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'solid-fertilizer-spreading-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manvendra Yadav' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shivendra Kumar Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'solid-fertilizer-spreading-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shivendra Kumar Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Prasoon', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'solid-fertilizer-spreading-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Prasoon' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'solid-fertilizer-spreading-machine'),
    (SELECT id FROM public.people WHERE full_name = 'Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 78: Tadpol E-Mobility
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'tadpol-e-mobility',
    'Tadpol E-Mobility',
    'The Smart Trike is an electric tadpole-type threewheeler with a rear drive wheel. It combines the stability of a car with the economy of a bike. Features include 150km range, fast charging, turning stabilizers, and an acceleration enhancer, offering a stable, efficient, and versatile transport solution.',
    'NA',
    'NA',
    257945.7,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-5.06.33-PM-1-600x1071.jpeg',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Saurav Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'tadpol-e-mobility'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Saurav Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Nidhi Sharma', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'tadpol-e-mobility'),
    (SELECT id FROM public.people WHERE full_name = 'Nidhi Sharma' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 79: The Marvel Tooth Brush
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'the-marvel-tooth-brush',
    'The Marvel Tooth Brush',
    'The Marvel toothbrush improves oral health by providing realtime feedback on brushing habits via an app. It ensures correct technique and pressure while using AI and mouth scanning to detect oral diseases, from decay to cancer. Features include a detachable bristle plate for hygiene and versatility.',
    'Granted',
    '202311018759',
    250744.66,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-11-600x708.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Suraj Singh', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'the-marvel-tooth-brush'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Suraj Singh' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('amp; Dr. Jyoti Batra', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'the-marvel-tooth-brush'),
    (SELECT id FROM public.people WHERE full_name = 'amp; Dr. Jyoti Batra' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Muskan', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'the-marvel-tooth-brush'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Muskan' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Afreen Ali', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'the-marvel-tooth-brush'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Afreen Ali' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Arshdeep Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'the-marvel-tooth-brush'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Arshdeep Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 80: Traffic Free Ambulance
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2019-20' LIMIT 1),
    'traffic-free-ambulance',
    'Traffic Free Ambulance',
    'A lot of brainstorming has gone into developing this product, which focuses on improving traffic conditions for emergency vehicles like ambulances by integrating electronics, communication technology, and programming. The idea was inspired by the heavy traffic situations commonly seen in metropolitan cities, where ambulances often get delayed due to congestion. This system works by detecting an approaching ambulance and automatically switching traffic signals to green, ensuring that the vehicle gets a clear route without delay. By clearing the road in advance, the system helps reduce travel time and enables ambulances to reach hospitals faster, ultimately increasing the chances of saving lives. The main objective of this project is to ensure that traffic is cleared at intersections before the ambulance arrives, enabling smooth and uninterrupted emergency transportation.',
    'NA',
    'NA',
    159704.15,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Traffic-Free-Ambuance-600x450.jpg',
    'NewGen Projects 2019-20',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Agha Hussain', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'traffic-free-ambulance'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Agha Hussain' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Sameer', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'traffic-free-ambulance'),
    (SELECT id FROM public.people WHERE full_name = 'Sameer' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Rahul Raj', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'traffic-free-ambulance'),
    (SELECT id FROM public.people WHERE full_name = 'Rahul Raj' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Satyam Jaiswal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'traffic-free-ambulance'),
    (SELECT id FROM public.people WHERE full_name = 'Satyam Jaiswal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 81: Triple Power Advance PCU
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'triple-power-advance-pcu',
    'Triple Power Advance PCU',
    'The Triple Power Advance PCU is an integrated power conditioning unit combining a solar MPPT charger, grid charger, and sine wave inverter. It continuously monitors voltages and currents to optimize performance. The advanced MPPT extracts maximum solar power and features multi-stage charging, significantly enhancing system efficiency and extending battery lifespan.',
    'Filed',
    'NA',
    210338.6,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-8.59.19-PM-600x1071.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Rajesh Kumar Lal', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'triple-power-advance-pcu'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Rajesh Kumar Lal' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubhang Mishra', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'triple-power-advance-pcu'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubhang Mishra' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'triple-power-advance-pcu'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 82: Udaan – Flight Controller for Drone
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'udaan-flight-controller-for-drone',
    'Udaan – Flight Controller for Drone',
    'As the core of drone stability, the flight controller must be carefully selected based on specific application needs, such as GPS accuracy for payload delivery. With numerous market options available, this report compares mid-price flight controllers to help determine the best fit for your project''s intended purpose.',
    'NA',
    'NA',
    214230.6,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-24-600x394.png',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Sachin Sharma', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'udaan-flight-controller-for-drone'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Sachin Sharma' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Kajal Kapil UPID', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'udaan-flight-controller-for-drone'),
    (SELECT id FROM public.people WHERE full_name = 'Kajal Kapil UPID' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Samiruddin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'udaan-flight-controller-for-drone'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Samiruddin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 83: Upryte – Back Posture Aligner
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'upryte-back-posture-aligner',
    'Upryte – Back Posture Aligner',
    'An accessible posture-correction device that tracks back alignment with a gyroscope and provides instant alerts—either audible or discreet—when poor posture is detected. Built for mass adoption, it delivers the functionality of premium posture gadgets at a fraction of the cost.',
    'NA',
    'NA',
    9694,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_oek713oek713oek7-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Kuldeep Pathak', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'upryte-back-posture-aligner'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Kuldeep Pathak' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Upendra Kr. Agarwal', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'upryte-back-posture-aligner'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Upendra Kr. Agarwal' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Ayan Agarwal', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'upryte-back-posture-aligner'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Ayan Agarwal' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Kushagra Kant Rai', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'upryte-back-posture-aligner'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Kushagra Kant Rai' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 84: Vehicle Alignment Indicator
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2021-22' LIMIT 1),
    'vehicle-alignment-indicator',
    'Vehicle Alignment Indicator',
    'Wheel misalignment causes tire wear and safety issues. We fabricated a laser-based device to check wheel alignment in real-time. Unlike standard dashboards that lack this info, our system displays alignment data directly to the driver, ensuring safer driving, better fuel efficiency, and longer tire lifespan.',
    'NA',
    'NA',
    265180.52,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-12.png',
    'NewGen Projects 2021-22',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Jeevesh Gupta', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vehicle-alignment-indicator'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Jeevesh Gupta' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Nikunj Kaushik', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vehicle-alignment-indicator'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Nikunj Kaushik' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Nikhil Gupta', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vehicle-alignment-indicator'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Nikhil Gupta' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 85: Vertical Mop Robot
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2022-23' LIMIT 1),
    'vertical-mop-robot',
    'Vertical Mop Robot',
    'As skyscrapers multiply, manual window cleaning becomes increasingly dangerous and inefficient. We developed the Vertical Mop Robot to automate this hazardous task. This robotic solution scales high-rise buildings to clean windows safely and effectively, replacing risky manual methods with cutting-edge technology ensuring safer, faster, and more reliable building maintenance practices.',
    'NA',
    '202311008492',
    257008.03,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Vertical-Mop-600x672.jpeg',
    'NewGen Projects 2022-23',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Upendra Kumar Agarwal', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vertical-mop-robot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Upendra Kumar Agarwal' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Shubham Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vertical-mop-robot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Shubham Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Aadarsh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vertical-mop-robot'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Aadarsh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 86: Vibrio – A Dual-Purpose Hydration & Therapeutic Massager Bottle
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2023-24' LIMIT 1),
    'vibrio-a-dual-purpose-hydration-therapeutic-massager-bottle',
    'Vibrio – A Dual-Purpose Hydration & Therapeutic Massager Bottle',
    'Vibrio is a dual-purpose water bottle integrated with a therapeutic vibration massager, offering hydration and instant muscle relief in a single portable device. It is designed for users on the move, delivering convenient wellness support anytime, anywhere.',
    'NA',
    'NA',
    15386,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/Gemini_Generated_Image_9zzptd9zzptd9zzp-1-600x600.png',
    'NewGen Projects 2023-24',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Kuldeep Pathak', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vibrio-a-dual-purpose-hydration-therapeutic-massager-bottle'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Kuldeep Pathak' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Upendra Kr. Agarwal', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vibrio-a-dual-purpose-hydration-therapeutic-massager-bottle'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Upendra Kr. Agarwal' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Mishika Varshney', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vibrio-a-dual-purpose-hydration-therapeutic-massager-bottle'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Mishika Varshney' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Vaanika', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'vibrio-a-dual-purpose-hydration-therapeutic-massager-bottle'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Vaanika' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 87: Wireless Laptop Charging Platform
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'wireless-laptop-charging-platform',
    'Wireless Laptop Charging Platform',
    'This project demonstrates a wireless power system for charging laptops using magnetic coupling. It eliminates wired connections, reducing wear and tear while increasing hygiene through contactless charging. A single platform can charge four laptops simultaneously, offering a convenient and efficient energy transfer solution.',
    'NA',
    'NA',
    142936,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-5.31.20-PM-600x1071.jpeg',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Praveer Saxena', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'wireless-laptop-charging-platform'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Praveer Saxena' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Ms. Sindhuza Singh', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'wireless-laptop-charging-platform'),
    (SELECT id FROM public.people WHERE full_name = 'Ms. Sindhuza Singh' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 88: Zero Energy Toilet
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'zero-energy-toilet',
    'Zero Energy Toilet',
    'The Zero Energy Toilet eliminates open defecation and pumps water without electricity, ideal for rural areas. It utilizes a Hydraulic Ram Pump to lift water using the kinetic energy of flowing water sources. This sustainable solution ensures sanitation and water access where power is unreliable.',
    'NA',
    'NA',
    126052,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-7.png',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manvendra Yadav', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'zero-energy-toilet'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manvendra Yadav' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Yash Kumar', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'zero-energy-toilet'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Yash Kumar' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Manas Showne', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'zero-energy-toilet'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Manas Showne' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- Project 89: Smart Thermal Testing Goggle
INSERT INTO public.newgen_projects (cohort_id, slug, title, description, patent_status, patent_id, expenditure, image_url, category_label, status)
VALUES (
    (SELECT id FROM public.cohorts WHERE year_label = '2020-21' LIMIT 1),
    'smart-thermal-testing-goggle',
    'Smart Thermal Testing Goggle',
    'We developed smart goggles to detect overheating and thermal leaks in factory machinery. This device visualizes temperature data, alerting operators immediately when equipment exceeds safe limits. It allows for timely intervention to prevent hazards and machine damage, ensuring safer and more efficient manufacturing.',
    'NA',
    'NA',
    126504,
    'https://navrachnafoundation.com/wp-content/uploads/2025/12/download-4.png',
    'NewGen Projects 2020-21',
    'published'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, expenditure = EXCLUDED.expenditure;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Saurav Kumar', 'Project Mentor', '{mentor}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-thermal-testing-goggle'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Saurav Kumar' LIMIT 1),
    'mentor'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Mr. Saket Tiwari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-thermal-testing-goggle'),
    (SELECT id FROM public.people WHERE full_name = 'Mr. Saket Tiwari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

INSERT INTO public.people (full_name, designation, roles)
VALUES ('Md. Samiruddin Ansari', 'Student Innovator / Mentee', '{mentee}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.project_people (project_id, person_id, role_in_project)
VALUES (
    (SELECT id FROM public.newgen_projects WHERE slug = 'smart-thermal-testing-goggle'),
    (SELECT id FROM public.people WHERE full_name = 'Md. Samiruddin Ansari' LIMIT 1),
    'mentee'
) ON CONFLICT DO NOTHING;

-- 6. STARTUPS
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'smart-hardware-iot' LIMIT 1),
    'jagmag-lights',
    'Jagmag Lights',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_jagmag.png',
    'Energy-efficient IoT LED controllers and smart home decorative lighting solutions.',
    'incubated',
    true,
    1
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'deep-tech' LIMIT 1),
    'neurapex-ai',
    'Neurapex AI',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_neurapex.png',
    'Deep learning & natural language processing systems for enterprise decision automation.',
    'incubated',
    true,
    2
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'advanced-manufacturing' LIMIT 1),
    'indus-ai-private-limited',
    'Indus AI Private Limited',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_indus_ai.png',
    'AI-driven industrial quality inspection and automated manufacturing vision systems.',
    'incubated',
    true,
    3
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'enterprise-software' LIMIT 1),
    'digiera-private-limited',
    'Digiera Private Limited',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_digiera_d.png',
    'Custom web development, mobile apps, and enterprise software engineering consulting.',
    'incubated',
    true,
    4
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'smart-hardware-iot' LIMIT 1),
    'epn-electro-proton-network',
    'ePN (Electro-Proton Network)',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_epn.png',
    'Advanced electronic circuit designs and hardware prototyping solutions.',
    'incubated',
    true,
    5
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'health-tech' LIMIT 1),
    'mylyfcare-private-limited',
    'MyLyfCare Private Limited',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_mylyfcare.png',
    'Digital healthcare aggregator connecting patients to localized diagnostic centers and pharmacies.',
    'incubated',
    true,
    6
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'enterprise-software' LIMIT 1),
    'door-to-destination-private-limited',
    'Door to Destination Private Limited',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_doortodestination.png',
    'Tech-enabled hyper-local logistics and smart dispatch routing solutions.',
    'incubated',
    true,
    7
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'agrotech-biomass' LIMIT 1),
    'green-stag-technologies',
    'Green Stag Technologies',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_greenstag.png',
    'Sustainable biomass processing and green agricultural hardware solutions.',
    'incubated',
    true,
    8
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'agri-tech' LIMIT 1),
    'barren-to-berland-abrosaa',
    'Barren to Berland Abrosaa',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_abrosaa.png',
    'Soil rejuvenation technology converting infertile agricultural plots into high-yield croplands.',
    'incubated',
    true,
    9
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'ed-tech' LIMIT 1),
    'cyberkida-digiera',
    'Cyberkida Digiera',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_cyberkida.png',
    'Cybersecurity awareness training tools and interactive ethical hacking e-learning platforms.',
    'incubated',
    true,
    10
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'advanced-manufacturing' LIMIT 1),
    'ssb-engineering',
    'SSB Engineering',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_ssb.png',
    'Heavy industrial machining, custom steel fabrication, and mechanical engineering assemblies.',
    'incubated',
    true,
    11
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'agri-tech' LIMIT 1),
    'vn-organics',
    'VN Organics',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_vnorganics.png',
    'Chemical-free bio-fertilizers and organic plant nutrient supplements for sustainable farming.',
    'incubated',
    true,
    12
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'enterprise-software' LIMIT 1),
    'triposaints-private-limited',
    'TripoSaints Private Limited',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_triposaints.png',
    'AI-driven personalized travel itinerary planner and smart tourism booking portal.',
    'incubated',
    true,
    13
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'agri-tech' LIMIT 1),
    'trulyfresh-hydroponics',
    'TrulyFresh Hydroponics',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_trulyfresh.png',
    'Controlled-environment urban hydroponic farming systems producing pesticide-free greens.',
    'incubated',
    true,
    14
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'deep-tech' LIMIT 1),
    'nextorbit-innovations',
    'NextOrbit Innovations',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_nextorbit.png',
    'Satellite telemetry systems and aerospace payload telemetry processing components.',
    'incubated',
    true,
    15
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'health-tech' LIMIT 1),
    'upright-care-india-private-limited',
    'Upright Care India Private Limited',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_unnatjivan.png',
    'Elderly care assistive technology devices and smart health monitoring systems.',
    'incubated',
    true,
    16
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'smart-hardware-iot' LIMIT 1),
    'bigblare-innovations',
    'BigBlare Innovations',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_bigblare.png',
    'Acoustic sensing electronics and industrial noise pollution tracking devices.',
    'incubated',
    true,
    17
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'smart-hardware-iot' LIMIT 1),
    'autoremov',
    'Autoremov',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_autoremov.png',
    'Automotive automated debris removal hardware for commercial solar panels.',
    'incubated',
    true,
    18
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'enterprise-software' LIMIT 1),
    'home-services-tech',
    'Home Services Tech',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_homeservices.png',
    'On-demand home maintenance technician dispatch and service scheduling platform.',
    'incubated',
    true,
    19
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'clean-tech' LIMIT 1),
    'e4a-solution',
    'E4A Solution',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_e4asolution.png',
    'Energy efficiency auditing software and industrial power optimization systems.',
    'incubated',
    true,
    20
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'deep-tech' LIMIT 1),
    'intelligentia-labs',
    'Intelligentia Labs',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_intelligentia.png',
    'Edge AI computing modules for autonomous robotics and computer vision.',
    'incubated',
    true,
    21
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'enterprise-software' LIMIT 1),
    'uproi-digital',
    'UPROI Digital',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_uproi.png',
    'Performance marketing analytics and digital ROI optimization suite.',
    'incubated',
    true,
    22
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'clean-tech' LIMIT 1),
    'kineer-services',
    'Kineer Services',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_kineer.png',
    'Clean drinking water purification units and inclusive employment initiatives.',
    'incubated',
    true,
    23
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'clean-tech' LIMIT 1),
    'evergreat-clean-energy',
    'Evergreat Clean Energy',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_evergreat.png',
    'Solar micro-grid storage solutions for rural commercial electrification.',
    'incubated',
    true,
    24
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'advanced-manufacturing' LIMIT 1),
    'hexprs-llp',
    'HexPRS LLP',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_hexagontetch.png',
    'Precision plastic injection molding and rapid prototype enclosure manufacturing.',
    'incubated',
    true,
    25
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'deep-tech' LIMIT 1),
    'orbitron-labs-llp',
    'Orbitron Labs LLP',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_redspiral.png',
    'Embedded firmware design and custom micro-controller PCB engineering.',
    'incubated',
    true,
    26
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'health-tech' LIMIT 1),
    'nutri-town-superfoods',
    'Nutri Town Superfoods',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_nutritown.png',
    'Nutraceutical superfood formulations and fortified organic snack products.',
    'incubated',
    true,
    27
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
INSERT INTO public.startups (category_id, slug, name, logo_url, description, incubation_status, is_featured, display_order)
VALUES (
    (SELECT id FROM public.startup_categories WHERE slug = 'agri-tech' LIMIT 1),
    'laarsa-organic',
    'Laarsa Organic',
    'https://navrachnafoundation.com/storage/v1/object/public/startup-logos/logo_laarsa.png',
    'Organic wellness products derived from cold-pressed medicinal herbal extracts.',
    'incubated',
    true,
    28
) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 7. FACILITIES
INSERT INTO public.facilities (slug, title, summary, display_order)
VALUES ('electronics-labs', 'Electronics & PCB Design Lab', 'Equipped with digital storage oscilloscopes, function generators, soldering stations, and hardware diagnostic units.', 1)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.facilities (slug, title, summary, display_order)
VALUES ('high-end-computers', 'High-End Compute Center', '128GB RAM workstation nodes with Nvidia RTX GPUs for AI training, rendering, and CAD modeling.', 2)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.facilities (slug, title, summary, display_order)
VALUES ('3d-printing', '3D Printing & Additive Unit', 'Industrial FDM and SLA resin 3D printers supporting 48+ materials and rapid plastic enclosure prototyping.', 3)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.facilities (slug, title, summary, display_order)
VALUES ('fabrication-lab', 'Fabrication & Prototyping Workshop', 'Heavy-duty CNC routers, laser cutters, sheet metal benders, and mechanical assembly tables.', 4)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.facilities (slug, title, summary, display_order)
VALUES ('meeting-rooms', 'Fully Equipped Meeting Rooms', 'Professional conference rooms with presentation support for reviews, mentoring, and investor pitches.', 5)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.facilities (slug, title, summary, display_order)
VALUES ('co-working-space', 'Plug & Play Co-Working Space', 'Safe 24/7 access seating with high-speed internet, ergonomic desks, and power backup.', 6)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;
INSERT INTO public.facilities (slug, title, summary, display_order)
VALUES ('boardroom', 'Executive Boardroom', 'Formal boardroom for MoU signings, board reviews, and institutional announcements.', 7)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary;

-- 8. FACILITY EQUIPMENT
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'electronics-labs' LIMIT 1),
    'DC regulated power supply',
    2,
    'D.C. Power Supply SMPS 0-30V 0-10A CV/CC with LED Meters',
    1
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'electronics-labs' LIMIT 1),
    'Digital storage oscilloscope',
    1,
    '100Mhz 4 Channel Digital Storage Oscilloscope',
    2
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'electronics-labs' LIMIT 1),
    'Function Waveform Generator',
    1,
    'Arbitrary Waveform Generator 25Mhz Dual Channel',
    3
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'electronics-labs' LIMIT 1),
    'SMD rework Station',
    2,
    'Hot Air Gun 700W 100-450C and Soldering Station 40W',
    4
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'electronics-labs' LIMIT 1),
    'Digital Multi-meter Benchtop',
    2,
    'Digital Multimeter 4.5 Digits True RMS Benchtop',
    5
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'electronics-labs' LIMIT 1),
    'Drilling machine benchtop',
    1,
    'Power 350W 220V Spindle Stroke 50mm',
    6
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'electronics-labs' LIMIT 1),
    'LCR meter with Q measurement',
    1,
    'LCR Meter Benchtop LC-R-D-Q Auto Detection 10Hz-10Khz',
    7
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'high-end-computers' LIMIT 1),
    'High End Computer Workstation',
    1,
    'Intel i9 12900K, Nvidia RTX3090, 128GB RAM, 1TB SSD, 4TB HDD',
    8
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'high-end-computers' LIMIT 1),
    'CAD & PCB Simulation Workstations',
    2,
    'Optimized for high-performance 3D CAD modeling & PCB drafting',
    9
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'high-end-computers' LIMIT 1),
    'Lenovo Desktop Workstations',
    10,
    'Lenovo M70T Gen 3 i7-12700 16GB RAM 512GB SSD',
    10
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'high-end-computers' LIMIT 1),
    'Intel AI Server Grade System',
    1,
    'Intel Xeon Silver 4410Y & Gold 6430 32 Cores 64 Threads TruDDR5',
    11
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = '3d-printing' LIMIT 1),
    'Formlabs Form 3+ 3D Printer (Industrial Grade)',
    1,
    'SLA Technology Build Volume 14.5 x 14.5 x 18.5 cm',
    12
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = '3d-printing' LIMIT 1),
    'Pratham 3D Printer',
    1,
    'FDM Technology Build Volume 200 x 200 x 250 mm Layer 80 Microns',
    13
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = '3d-printing' LIMIT 1),
    '2 Pixel 3D Printers (PLA Based)',
    2,
    'FDM Technology Build Volume 230 x 230 x 260 mm Precision +-0.1mm',
    14
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'fabrication-lab' LIMIT 1),
    'Co2 Laser Cutting & Engraving Machine',
    1,
    'Model MT6040 Working Area 600x400mm Laser Tube 90W',
    15
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'fabrication-lab' LIMIT 1),
    'Vinyl Cutter and Plotter',
    1,
    'Sticker & Vinyl Cutter up to 300 GSM Max Cutting Width 610mm',
    16
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'fabrication-lab' LIMIT 1),
    'CNC Plasma Cutting Machine',
    1,
    'Fully Automatic 10KW 415V 3 Phase Cutting Thickness 20mm',
    17
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'fabrication-lab' LIMIT 1),
    'Deep Freezer Testing Chamber',
    1,
    'Low Temperature Chamber -20C Capacity 100L',
    18
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'fabrication-lab' LIMIT 1),
    'Vacuum Oven Curing Chamber',
    1,
    'Vacuum Curing Oven Temperature Range 50-200C',
    19
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'fabrication-lab' LIMIT 1),
    'Advance MIG/TIG Welding Setup',
    1,
    'Professional Welding Workstation for Metal Fabrication',
    20
);
INSERT INTO public.facility_equipment (facility_id, name, quantity, specifications, display_order)
VALUES (
    (SELECT id FROM public.facilities WHERE slug = 'fabrication-lab' LIMIT 1),
    'Dewalt Chop Saw Machine',
    1,
    'High Speed Mitre Saw for Metal Pipes and Rod Cross-cutting',
    21
);

-- 9. MSME HACKATHONS
INSERT INTO public.msme_hackathons (chapter_name, year_label, grant_per_idea, ideas_approved, total_sanctioned_budget, status, display_order)
VALUES ('MSME Idea Hackathon 1.0', '2021-22', 1050000, 1, 1050000, 'completed', 1);
INSERT INTO public.msme_hackathons (chapter_name, year_label, grant_per_idea, ideas_approved, total_sanctioned_budget, status, display_order)
VALUES ('MSME Idea Hackathon 2.0', '2022-23', 1000000, 1, 1000000, 'completed', 2);
INSERT INTO public.msme_hackathons (chapter_name, year_label, grant_per_idea, ideas_approved, total_sanctioned_budget, status, display_order)
VALUES ('MSME Idea Hackathon 3.0', '2023-24', 1500000, 3, 4120000, 'completed', 3);
INSERT INTO public.msme_hackathons (chapter_name, year_label, grant_per_idea, ideas_approved, total_sanctioned_budget, status, display_order)
VALUES ('MSME Idea Hackathon 4.0', '2024-25', 1500000, 0, 1500000, 'upcoming', 4);

-- 10. ANNOUNCEMENTS
INSERT INTO public.announcements (tag, title, content, is_featured, status) VALUES ('Competition', 'Competition Announcement', 'Applications are open for the Annual Logo Design Competition.', true, 'published');
INSERT INTO public.announcements (tag, title, content, is_featured, status) VALUES ('MSME Hackathon', 'MSME Hackathon Announcement', 'Join MSME Hackathons to solve real-world challenges.', true, 'published');
INSERT INTO public.announcements (tag, title, content, is_featured, status) VALUES ('Incubation', 'Incubation Announcement', 'Discover funding opportunities through Startin-Up and NewGen-IEDC.', true, 'published');
INSERT INTO public.announcements (tag, title, content, is_featured, status) VALUES ('Labs & Infra', 'Labs & Infra Announcement', 'Access our Fabrication Lab and High-End Compute resources.', true, 'published');

-- 11. POLICIES
INSERT INTO public.policies (slug, title, category, summary, file_url) VALUES ('patent-support-policy', 'Patent Support Policy', 'IPR', 'Guidelines for patent applications and reimbursement.', 'https://navrachnafoundation.com/wp-content/uploads/2025/03/PatentSupportPolicy.pdf') ON CONFLICT (slug) DO NOTHING;
INSERT INTO public.policies (slug, title, category, summary, file_url) VALUES ('project-selection-policy', 'Project Selection And Procurement Policy', 'Procurement', 'Protocols for project selection and hardware procurement.', 'https://navrachnafoundation.com/wp-content/uploads/2025/03/ProjectSelectoionAndProcurementPolicy.pdf') ON CONFLICT (slug) DO NOTHING;
INSERT INTO public.policies (slug, title, category, summary, file_url) VALUES ('purchase-policy-sop', 'Purchase Policy And SOP', 'SOP', 'SOP regarding budgeting and quote validations.', 'https://navrachnafoundation.com/wp-content/uploads/2025/03/PurchasePolicyAndSOP.pdf') ON CONFLICT (slug) DO NOTHING;

-- 12. FAQS
INSERT INTO public.faqs (page_context, question, answer, display_order) VALUES ('general', 'Who can apply to Navrachna Foundation?', 'Students, faculty, researchers, and early-stage founders.', 1);
INSERT INTO public.faqs (page_context, question, answer, display_order) VALUES ('general', 'What support do founders receive?', 'Mentorship, workspace access, lab support, networking, and grant guidance.', 2);
INSERT INTO public.faqs (page_context, question, answer, display_order) VALUES ('general', 'Do you offer funding directly?', 'We prepare founders for grants and investor conversations.', 3);
INSERT INTO public.faqs (page_context, question, answer, display_order) VALUES ('general', 'Can startups use facilities outside office hours?', 'Yes, approved teams receive extended access.', 4);

-- 13. TESTIMONIALS
INSERT INTO public.testimonials (founder_name, startup_name, quote, metric_highlight, display_order) VALUES ('Aarav Jain', 'UPROI Digital', 'Mentoring and workspace support helped us go from prototype to client-ready product.', '6 weeks to first pilot', 1);
INSERT INTO public.testimonials (founder_name, startup_name, quote, metric_highlight, display_order) VALUES ('Sana Khan', 'Verdant', 'The structure here is the difference. We got a place to build and a process to follow.', '3 mentor rounds per month', 2);
INSERT INTO public.testimonials (founder_name, startup_name, quote, metric_highlight, display_order) VALUES ('Kunal Verma', 'Digiera Private Limited', 'We could focus on product and customer conversations instead of infrastructure.', '24/7 access to build', 3);

COMMIT;
