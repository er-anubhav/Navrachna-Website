-- Migration: 0029_program_cms_content_fields.sql
-- Description: Add nodal_agency, stats, and incentives JSONB columns to programs table for full CMS content editing.

ALTER TABLE public.programs 
ADD COLUMN IF NOT EXISTS nodal_agency TEXT,
ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS incentives JSONB DEFAULT '[]'::jsonb;

-- Populate default authentic content for existing programs

-- DST NewGen-IEDC
UPDATE public.programs 
SET 
  nodal_agency = 'Department of Science & Technology (DST), Govt of India',
  stats = '[
    {"value": "₹2.87 Cr", "label": "Total Sanctioned Grant", "sub": "DST (GOI) NSTEDB Funding"},
    {"value": "96+", "label": "Student Prototypes Funded", "sub": "Up to ₹2.5 Lakhs per project"},
    {"value": "66+", "label": "Patents Filed", "sub": "Deep-tech IP protection"},
    {"value": "5 Years", "label": "Tenure Completed", "sub": "Institutional acceleration"}
  ]'::jsonb,
  incentives = '[
    {
      "title": "Prototype Development Support",
      "amount": "Up to ₹2.5 Lakhs",
      "duration": "Per Student Project",
      "desc": "Direct financial grant support credited directly to student innovator teams for purchasing hardware, raw materials, components, and fabrication tools."
    },
    {
      "title": "Fab Lab Machinery Access",
      "amount": "Free 24/7 Access",
      "duration": "Full Incubation",
      "desc": "Full access to high-precision CNC CO₂ Laser Cutters, CNC Plasma Cutters, Form 3B+ SLA Resin printers, and electronics testing instruments."
    },
    {
      "title": "Faculty Mentorship & Guidance",
      "amount": "Dedicated Advisors",
      "duration": "Technical Guidance",
      "desc": "Personalized guidance from senior academic faculty advisors and industry veterans to guide hardware testing and patent drafting."
    },
    {
      "title": "Patent & IPR Filing Grant",
      "amount": "Fully Reimbursed",
      "duration": "IP Protection",
      "desc": "Assistance and reimbursement covering government patent filing fees, agent search fees, and trademark protection."
    }
  ]'::jsonb
WHERE slug = 'newgen-iedc';

-- MSME-BI
UPDATE public.programs 
SET 
  nodal_agency = 'Ministry of Micro, Small & Medium Enterprises (MSME), Govt of India',
  stats = '[
    {"value": "₹15 Lakhs", "label": "Seed Grant per Idea", "sub": "MSME Champions Scheme"},
    {"value": "₹1 Crore", "label": "Plant & Machinery Grant", "sub": "Shared capital equipment"},
    {"value": "Hackathons", "label": "MSME Idea Hackathon 3.0/4.0", "sub": "National screening calls"},
    {"value": "40+ Specs", "label": "Machinery Capacity", "sub": "Industrial toolroom access"}
  ]'::jsonb,
  incentives = '[
    {
      "title": "MSME Idea Commercialization Grant",
      "amount": "Up to ₹15 Lakhs",
      "duration": "One-time Seed",
      "desc": "Capital grant provided to validate technical feasibility, develop MVP prototypes, and commercialize novel products for MSME sectors."
    },
    {
      "title": "Capital Equipment Grant",
      "amount": "Up to ₹1 Crore",
      "duration": "Infrastructure Fund",
      "desc": "Grant awarded to procure specialized plant machinery, industrial tooling, test benches, and prototyping hardware for resident startups."
    },
    {
      "title": "MSME Idea Hackathons",
      "amount": "National Calls",
      "duration": "Annual Hackathons",
      "desc": "Participation in national MSME Idea Hackathons (Women, Youth, Special Categories) offering direct approval for government grants."
    },
    {
      "title": "Design & Technology Support",
      "amount": "Expert Network",
      "duration": "Technical Handholding",
      "desc": "Comprehensive product design, CAD simulation, and industrial manufacturing assistance provided by expert mentors."
    }
  ]'::jsonb
WHERE slug = 'msme-bi';

-- StartinUP
UPDATE public.programs 
SET 
  nodal_agency = 'Department of IT & Electronics, Govt of Uttar Pradesh',
  stats = '[
    {"value": "₹17,500/mo", "label": "Sustenance Allowance", "sub": "For 1 year (up to 25 startups)"},
    {"value": "₹5 Lakhs", "label": "Prototype Development Grant", "sub": "One-time seed assistance"},
    {"value": "₹7.5 Lakhs", "label": "Seed Capital & Marketing", "sub": "Commercial launch phase"},
    {"value": "₹10 Lakhs", "label": "International Patent Grant", "sub": "Domestic: ₹2 Lakhs"}
  ]'::jsonb,
  incentives = '[
    {
      "title": "Sustenance Allowance",
      "amount": "₹17,500 / month",
      "duration": "For 1 Year",
      "desc": "Monthly sustenance support targeted at idea-stage ventures to allow founders to focus entirely on product development. Extra 50% for specified focus categories."
    },
    {
      "title": "Prototype Development Grant",
      "amount": "Up to ₹5 Lakhs",
      "duration": "One-time Seed",
      "desc": "Direct financial support for developing, testing, and refining hardware or software prototypes before commercialization."
    },
    {
      "title": "Seed Capital & Marketing",
      "amount": "Up to ₹7.5 Lakhs",
      "duration": "Commercial Phase",
      "desc": "Capital boost to launch go-to-market strategies, marketing campaigns, and growth setups with scale-up assistance."
    },
    {
      "title": "Patent Filing Support",
      "amount": "Up to ₹2L domestic / ₹10L international",
      "duration": "IP Protection",
      "desc": "Covers official filing fees, search charges, and legal agent costs for securing domestic and international patents."
    }
  ]'::jsonb
WHERE slug = 'startin-up';

-- IIC-ITSEC
UPDATE public.programs 
SET 
  nodal_agency = 'Ministry of Education (MoE) Innovation Cell & AICTE',
  stats = '[
    {"value": "3.5 Stars", "label": "MoE Campus Rating", "sub": "Top institutional cell"},
    {"value": "NISP", "label": "Policy Implemented", "sub": "National Innovation & Startup Policy"},
    {"value": "25+ Workshops", "label": "IPR & Patent Sessions", "sub": "Annual hands-on training"},
    {"value": "NIC Calls", "label": "National Innovation Contest", "sub": "MoE Innovation Cell portal"}
  ]'::jsonb,
  incentives = '[
    {
      "title": "Campus Innovation Star Rating",
      "amount": "MoE / AICTE Standard",
      "duration": "Annual Assessment",
      "desc": "Evaluation and recognition under MoE Innovation Cell guidelines driving campus innovation hackathons and venture creation."
    },
    {
      "title": "NISP Policy Implementation",
      "amount": "Institutional Framework",
      "duration": "Campus Policy",
      "desc": "Special policy framework enabling student innovators and faculty founders to earn academic credits and take sabbaticals for venture creation."
    },
    {
      "title": "IPR & Patent Facilitation",
      "amount": "Legal Guidance",
      "duration": "Continuous Support",
      "desc": "Comprehensive patent search, prior art verification, and legal drafting assistance for campus inventors."
    },
    {
      "title": "National Innovation Contest (NIC)",
      "amount": "National Stage",
      "duration": "MoE Flagship",
      "desc": "Direct nomination of top campus prototype teams into the national MoE Innovation Cell mentoring and funding bootcamp."
    }
  ]'::jsonb
WHERE slug = 'iic-itsec';
