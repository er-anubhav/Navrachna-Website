/**
 * seedLandingPage.js
 * ──────────────────
 * Run this ONCE to seed the Landing Page block config into Firestore.
 * It creates:
 *   /pages/home          — the published page document
 *   /pages_drafts/home   — a matching draft copy
 *
 * Usage: import and call seedLandingPage() from your browser console
 * while logged in as admin, OR add a "Seed Landing" button to the
 * Migration Tools tab in AdminPage.
 *
 * After seeding, visit /page/home to see the CMS-rendered landing page.
 */

import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

// ── Landing Page Block Config ────────────────────────────────────
const LANDING_BLOCKS = [
  // 1. Announcement Banner
  {
    id:   'block-announce-1',
    type: 'AnnouncementBanner',
    content: {
      items: [
        '🎉 Applications open for the 2025–26 Incubation Cohort — Apply Now!',
        '🚀 TECHTRIX 2026 — National Tech Fest — Registration Open',
        '📢 New 3D Printing Lab equipment now installed in Fabrication Lab',
        '🏆 Navrachna startups win 3 awards at National Innovation Summit 2025',
        '📋 MSME Hackathon results announced — Congratulations to all winners!',
      ],
    },
    style: {
      bg:          '#013759',
      textColor:   '#ffffff',
      accentColor: '#fbbf24',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 2. Hero Section
  {
    id:   'block-hero-1',
    type: 'PageHero',
    content: {
      eyebrow:  'Navrachna Foundation for Entrepreneurship Development',
      title:    'Empowering the\nInnovators of Tomorrow',
      subtitle: 'A premier incubation center nurturing startups, researchers, and entrepreneurs through world-class facilities, expert mentorship, and government-backed funding programs.',
      ctaLabel: 'Explore Incubation',
      ctaHref:  '/programs',
      bgImage:  '',
    },
    style: {
      bg:             '#013759',
      textColor:      '#ffffff',
      overlayOpacity: 0.6,
      minHeight:      '85vh',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 3. About / NFED — NfedAbout (staggered rounded cards + text layout)
  {
    id:   'block-about-staggered',
    type: 'NfedAbout',
    content: {
      title: 'Navrachna Foundation for Entrepreneurship Development (NFED)',
      paragraphs: [
        'Navrachna Foundation for Entrepreneurship Development (NFED) is an MSME-recognized Business Incubator operating under ITS Engineering College, Greater Noida. We support innovators, researchers, and startups with state-of-the-art infrastructure, experienced mentors, and access to government schemes like Startup India, NIDHI PRAYAS, and MSME-BI grants.',
        'Our mission is to convert ideas into sustainable, impactful enterprises that contribute to the national startup ecosystem. We offer hot-desking, compute infrastructure, and active pipeline matches.'
      ],
      btnLabel: 'Read More',
      btnHref: '/about',
      imageLeft: '',
      imageRight: '',
    },
    style: {
      bg:           '#ffffff',
      titleColor:   '#013759',
      textColor:    '#4b5563',
      titleSize:    'text-4xl md:text-5xl',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 4. Stats Row
  {
    id:   'block-stats-1',
    type: 'StatsRow',
    content: {
      heading: '',
      stats: [
        { icon: '🔧', value: '150+', label: 'Startups Incubated' },
        { icon: '🖨️', value: '8',    label: '3D Printers' },
        { icon: '🖥️', value: '40+',  label: 'Compute Workstations' },
        { icon: '👥', value: '500+', label: 'Students Mentored' },
      ],
    },
    style: {
      bg:          '#f8fafc',
      textColor:   '#013759',
      accentColor: '#fbbf24',
      cardBg:      '#ffffff',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 4b. Vision & Mission Section
  {
    id:   'block-vision-mission',
    type: 'VisionMission',
    content: {
      visionTitle:  'Vision',
      visionBody:   'To create an innovative workspace and sector-agnostic startup incubator that nurtures passionate entrepreneurs, fosters highly collaborative creativity, and accelerates early-stage startup success into prominent global market leaders.',
      missionTitle: 'Mission',
      missionBody:  'To provide a dynamic, world-class collaborative workspace that empowers young founders and student innovators with seed prototype funding, high-fidelity mentoring frameworks, state-of-the-art labs, and a robust investor matchmaking pipeline.',
    },
    style: {
      bg:          '#f8fafc',
      titleColor:  '#013759',
      textColor:   '#4b5563',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 5. Our Spaces — ImageCarousel
  {
    id:   'block-carousel-spaces',
    type: 'ImageCarousel',
    content: {
      heading: 'Our Spaces',
      spaces: [
        { title: 'Electronics Lab',     description: 'PCB design, soldering stations, oscilloscopes, and component library for rapid prototyping.' },
        { title: '3D Printing Lab',     description: 'FDM and resin 3D printers for high-resolution rapid prototyping.' },
        { title: 'Fabrication Lab',     description: 'Laser cutters, CNC routers, and precision hand tools.' },
        { title: 'Co-Working Space',    description: '80+ hot desks with 1 Gbps fiber internet and 4 conference rooms.' },
        { title: 'Compute Lab',         description: 'High-performance workstations and 4× NVIDIA GPU servers.' },
        { title: 'Conference Rooms',    description: 'Fully equipped AV-enabled meeting spaces for presentations and demos.' },
      ],
    },
    style: {
      bg:           '#f8fafc',
      textColor:    '#ffffff',
      headingColor: '#013759',
      accentColor:  '#fbbf24',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 6. Schemes & Programs — ProgramCards
  {
    id:   'block-programs-1',
    type: 'ProgramCards',
    content: {
      heading:     'Schemes & Programs',
      description: 'Explore our government-backed schemes and programs designed to accelerate your entrepreneurial journey — from ideation to funding.',
      ctaLabel:    'View All Programs',
      ctaHref:     '/programs',
      programs: [
        { badge: 'MSME',    title: 'Startup India Seed Fund',  body: 'Up to ₹20L seed funding for early-stage startups with innovative ideas.', tag: 'Funding' },
        { badge: 'DST',     title: 'NIDHI PRAYAS',             body: 'Support for proof-of-concept development for deep-tech and hardware innovations.', tag: 'R&D' },
        { badge: 'SIDBI',   title: 'SMILE Scheme',             body: 'Soft loans and marketing support for small and micro enterprises.', tag: 'Loan' },
        { badge: 'NEN',     title: 'E-Cell Mentorship',        body: 'Dedicated mentorship, workshops, and hackathons via the E-Cell network.', tag: 'Mentorship' },
        { badge: 'UP Govt', title: 'UP StartUp Fund',          body: 'State initiative offering grants and subsidies for UP-based startups.', tag: 'Grant' },
        { badge: 'MeitY',   title: 'Digital India Program',    body: 'Support for tech-focused startups working in digital infrastructure.', tag: 'Tech' },
      ],
    },
    style: {
      bg:           '#013759',
      textColor:    '#cbd5e1',
      headingColor: '#ffffff',
      accentColor:  '#fbbf24',
      cardBg:       'rgba(255,255,255,0.07)',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 7. Facilities — FacilityTabs
  {
    id:   'block-facilities-1',
    type: 'FacilityTabs',
    content: {
      heading:      'Our Facilities',
      discoverHref: '/facilities',
      facilities: [
        {
          id: 'electronics', label: 'Electronics Lab',
          identity: { name: 'Electronics Lab', tagline: 'Circuit design & embedded systems prototyping', icon: '🔌' },
          specs: [
            { label: 'Stations',   value: '20 workstations' },
            { label: 'Equipment',  value: 'Oscilloscopes, DMMs, signal generators' },
            { label: 'PCB',        value: 'In-house PCB etching & soldering' },
            { label: 'Hours',      value: 'Mon–Sat, 9 AM – 8 PM' },
          ],
        },
        {
          id: '3dprinting', label: '3D Printing Lab',
          identity: { name: '3D Printing Lab', tagline: 'Rapid prototyping at scale', icon: '🖨️' },
          specs: [
            { label: 'Printers',    value: '8 FDM + 2 Resin printers' },
            { label: 'Materials',   value: 'PLA, PETG, ABS, Resin' },
            { label: 'Build Vol',   value: 'Up to 300×300×400 mm' },
            { label: 'Turnaround', value: 'Same-day for small parts' },
          ],
        },
        {
          id: 'fabrication', label: 'Fabrication Lab',
          identity: { name: 'Fabrication Lab', tagline: 'Precision cutting, milling & assembly', icon: '🔧' },
          specs: [
            { label: 'Machines',   value: 'Laser cutter, CNC router, lathe' },
            { label: 'Materials',  value: 'Wood, acrylic, aluminium, steel' },
            { label: 'Software',   value: 'AutoCAD, Fusion 360, LaserGRBL' },
            { label: 'Capacity',   value: '10 concurrent users' },
          ],
        },
        {
          id: 'coworking', label: 'Co-Working',
          identity: { name: 'Co-Working Space', tagline: 'Collaborate, focus, grow', icon: '🏢' },
          specs: [
            { label: 'Seats',    value: '80 hot desks + 20 dedicated' },
            { label: 'Internet', value: '1 Gbps fibre, 99.9% uptime' },
            { label: 'Meeting',  value: '4 conference rooms' },
            { label: 'Access',   value: '24×7 for registered startups' },
          ],
        },
        {
          id: 'compute', label: 'Compute Lab',
          identity: { name: 'Compute Lab', tagline: 'High-performance AI & ML infrastructure', icon: '🖥️' },
          specs: [
            { label: 'Workstations', value: '15 high-end PCs' },
            { label: 'GPU',          value: '4× NVIDIA A100 servers' },
            { label: 'Storage',      value: '1 PB NAS cluster' },
            { label: 'Software',     value: 'MATLAB, Ansys, CUDA, PyTorch' },
          ],
        },
      ],
    },
    style: {
      bg:           '#ffffff',
      textColor:    '#1e293b',
      headingColor: '#013759',
      accentColor:  '#074887',
      darkPanelBg:  '#013759',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 8. Why Choose Us — CardGrid
  {
    id:   'block-cards-benefits',
    type: 'CardGrid',
    content: {
      heading:    'Why Choose Us',
      subheading: 'Discover the exclusive benefits, technical facilities, and robust investment opportunities that make Navrachna Foundation the elite partner for modern startups.',
      eyebrow:    'FOUNDATION ADVANTAGE',
      cards: [
        { icon: '💡', title: 'Expert Mentorship',   body: 'One-on-one guidance from 30+ industry veterans, IIT/IIM alumni, and successful entrepreneurs.' },
        { icon: '🔬', title: 'World-Class Labs',    body: 'Access to electronics, 3D printing, fabrication, and GPU compute labs.' },
        { icon: '📶', title: 'High-Speed Internet', body: '1 Gbps dedicated fibre with 99.9% SLA uptime for uninterrupted research.' },
        { icon: '🤝', title: 'Investor Network',    body: 'Direct introductions to angel investors, VC funds, and government grant officers.' },
        { icon: '🏛️', title: 'Legal & IP Support',  body: 'Patent filing, IP strategy, legal counsel, and trademark guidance.' },
        { icon: '🌐', title: 'Global Exposure',     body: 'Represent at national and international startup expos, competitions, and Demo Days.' },
      ],
    },
    style: {
      bg:           '#f8fafc',
      textColor:    '#64748b',
      cardBg:       '#ffffff',
      accentColor:  '#fbbf24',
      headingColor: '#013759',
    },
    layout: { columns: { mobile: 1, tablet: 2, desktop: 3 } },
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 8b. E-Cell ITSEC Initiative
  {
    id:   'block-ecell-initiative',
    type: 'ECellInitiative',
    content: {
      heading:     'E-Cell I.T.S Engineering College',
      eyebrow:     'Initiative by Navrachna',
      subheading:  'An active student-run entrepreneurship cell powered, mentored, and supported by the Navrachna Foundation.',
      stats: [
        { value: '200+', label: 'Active Student Entrepreneurs' },
        { value: '10+',  label: 'Navrachna-Backed Ventures' },
        { value: '25+',  label: 'Ecosystem & Funding Partners' },
        { value: '100%', label: 'Hands-on Incubation Support' },
      ],
      supportCards: [
        { title: 'Startup Incubation Programs', desc: 'Navrachna provides workspace, cloud credits, and government registration handholding to E-Cell members.', icon: '🚀' },
        { title: 'Co-Organized Workshops', desc: 'Jointly structured bootcamps on product building, IP filing, and commercial pitch preparation.', icon: '🛠️' },
        { title: '1-to-1 Mentor Connections', desc: 'Linking student innovators directly with industry veterans, angel investors, and seasoned academic advisors.', icon: '🤝' },
        { title: 'Ecosystem & Corporate Visits', desc: 'Navrachna facilitates and funds student exposure trips to corporate innovation centers and technology hubs.', icon: '🏢' },
        { title: 'Alumni & Funding Mixers', desc: 'Organizing exclusive networking sessions connecting promising student projects with early-stage venture funding.', icon: '🌐' },
      ],
      techtrixTitle:      'TECHTRIX 2026',
      techtrixSubtitle:   'The Ultimate Innovation & Tech Challenge Returns!',
      techtrixDesc:       'Co-organized and hosted by Navrachna Foundation & E-Cell, TECHTRIX 2026 returns with cutting-edge engineering tracks, enhanced prize pools, and direct path to incubation funding.',
      techtrixStats: [
        { label: 'Date', value: 'October 2026' },
        { label: 'Venue', value: 'I.T.S Engg. College' },
        { label: 'Organizers', value: 'Navrachna & E-Cell' },
      ],
      techtrixCategories: [
        'Junior Ideathon', 'Project Exhibition', 'Hack the Issue', 'Business Plan Meet',
        'Crack-o-Code', 'Hack The Box', 'Drone Race', 'Robo Race & War',
        'LAN Gaming', 'Robo Football', 'Quick Challenge'
      ],
    },
    style: {
      bg:          '#f8fafc',
      textColor:   '#64748b',
      titleColor:  '#013759',
      accentColor: '#074887',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 9. Clients / Partners — LogoScroller
  {
    id:   'block-logos-1',
    type: 'LogoScroller',
    content: {
      heading: 'Our Clients & Partners',
      logos: [
        { alt: 'Arun Chaudhary' },
        { alt: 'DIGIERA' },
        { alt: 'JagmagLights' },
        { alt: 'MyLyfCare' },
        { alt: 'TripoSaints' },
        { alt: 'UPROI' },
        { alt: 'Verdant' },
        { alt: 'Weaclim' },
        { alt: 'Indus' },
        { alt: 'Intelliginetia' },
      ],
    },
    style: {
      bg:        '#ffffff',
      textColor: '#013759',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 10. FAQ — FAQAccordion
  {
    id:   'block-faq-1',
    type: 'FAQAccordion',
    content: {
      heading: 'Frequently Asked Questions',
      faqs: [
        { q: 'Who can apply for incubation at NFED?',         a: 'Any student, alumni, faculty member, or external entrepreneur with an innovative idea or early-stage startup can apply. We welcome tech and non-tech ventures alike.' },
        { q: 'Is there a fee to join NFED programs?',         a: 'NFED offers a range of programs at different price points, including fully funded government-backed programs like MSME-BI and NIDHI PRAYAS.' },
        { q: 'What facilities are available to incubatees?',  a: 'Incubatees get access to electronics labs, 3D printing, fabrication shop, co-working desks, GPU compute lab, high-speed internet, and mentorship sessions.' },
        { q: 'How long is the incubation period?',            a: 'Programs run from 6 months up to 2 years depending on the stage and scope of your startup. Extensions are available based on progress.' },
        { q: 'Do you provide funding to startups?',           a: 'We help startups access government grants (Startup India, NIDHI PRAYAS), angel investment networks, and SIDBI soft-loan schemes. NFED itself does not provide equity-free grants, but assists in applications.' },
        { q: 'How do I apply?',                               a: 'Visit the Contact page and fill in the application form. Our team will review and reach out within 5–7 working days for an interview.' },
      ],
    },
    style: {
      bg:           '#f8fafc',
      textColor:    '#1e293b',
      headingColor: '#013759',
      accentColor:  '#074887',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 11. Call to Action
  {
    id:   'block-cta-1',
    type: 'CallToAction',
    content: {
      heading:  'Ready to Build Your Startup?',
      body:     'Join the NFED incubation programme and turn your innovative idea into a sustainable business.',
      btnLabel: 'Apply for Incubation',
      btnHref:  '/contact',
    },
    style: {
      bg:           '#013759',
      textColor:    '#ffffff',
      btnBg:        '#fbbf24',
      btnTextColor: '#013759',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },
]

// ── Seed function ────────────────────────────────────────────────
export async function seedLandingPage() {
  const payload = {
    slug:        'home',
    title:       'Home — NFED Landing Page',
    status:      'published',
    blocks:      LANDING_BLOCKS,
    publishedAt: new Date().toISOString(),
    updatedAt:   new Date().toISOString(),
  }

  await setDoc(doc(db, 'pages',        'home'), payload)
  await setDoc(doc(db, 'pages_drafts', 'home'), payload)

  console.log('✅ Landing page seeded with', LANDING_BLOCKS.length, 'blocks.')
  return { success: true, blockCount: LANDING_BLOCKS.length }
}
