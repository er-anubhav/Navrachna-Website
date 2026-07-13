import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

const LANDING_BLOCKS = [
  // 1. Announcement Banner
  {
    id:   'block-announce-1',
    type: 'AnnouncementBanner',
    content: {
      items: [
        'Applications are now open for the Annual Logo Design Competition. Submit your creative portfolios today.',
        'Join the upcoming MSME Hackathons to solve real-world industry challenges and secure seed funding.',
        'Discover funding and incubation opportunities through our specialized Startin-Up and NewGen-IEDC programs.',
        'Access our state-of-the-art Fabrication Lab and High-End Compute resources to accelerate your prototyping.',
      ],
    },
    style: {
      bg:          '#111111',
      textColor:   '#ffffff',
      labelBg:     '#074887',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 2. Hero Section
  {
    id:   'block-hero-1',
    type: 'PageHero',
    content: {
      title:       'Where Ideas, Take Flight',
      description: 'A premium co-working and incubation experience \ndesigned for clarity, momentum, and exceptional founder conversion.',
      subtitle:    'Navrachna Foundation for Entrepreneurship Development',
      bgImage:     '',
      cta1Label:   'Join the Workspace',
      cta1Href:    '/contact',
      cta2Label:   'Explore Programs',
      cta2Href:    '/programs',
    },
    style: {
      bg:             '#111111',
      textColor:      '#ffffff',
      overlayOpacity: 0.65,
      minHeight:      '85vh',
      titleSize:      'text-6xl',
      descSize:       'text-md sm:text-md',
    },
    layout:     {},
    visibility: { hideOnMobile: false, hideOnTablet: false, hideOnDesktop: false },
  },

  // 3. NfedAbout (overlapping cards about section)
  {
    id:   'block-about-staggered',
    type: 'NfedAbout',
    content: {
      title: 'Navrachna Foundation for\nEntrepreneurship\nDevelopment',
      paragraphs: [
        'Navrachna Foundation for Entrepreneurship Development (NFED) is an autonomous, sector-agnostic startup incubator and premium co-working ecosystem registered under the societies registration framework to empower founders with early-stage velocity and institutional support.',
        'NFED nurtures innovation-driven startups by providing seamless physical incubation infrastructure, high-fidelity mentoring channels, deep access to institutional and private seed funds, fabrication assets, and business matchmaking. Operated under the aegis of I.T.S. Engineering College, Greater Noida, NFED serves as the strategic regional node for transforming research and raw academic ideas into high-conversion, venture-backed startups.'
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

  // 4. StatsRow (Horizontal values strip)
  {
    id:   'block-stats-1',
    type: 'StatsRow',
    content: {
      heading: '',
      stats: [
        { value: '96+',     label: 'Projects Developed' },
        { value: '₹2.87 Cr', label: 'DST Grant Received' },
        { value: '₹1.59 Cr', label: 'MSME Grant Received' },
        { value: '66+',     label: 'Patents Filed' },
      ],
    },
    style: {
      bg:          '#ffffff',
      textColor:   '#074887',
      accentColor: '#013759',
    },
    layout: { type: 'flat' },
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
        { title: 'Acceleration Programs',            description: 'Access tailored incubation modules, prototype funding, venture mentorship, and investor matchmaking pipelines to scale your early-stage startup.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
        { title: 'Mentorship & Expert Guidance',     description: 'Work shoulder-to-shoulder with veteran entrepreneurs, technology experts, and IP advisors to accelerate product-market fit.', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80' },
        { title: 'Co-working Space & Infrastructure', description: 'Scale in our premium co-working facility, featuring plug-and-play seating, smart meeting rooms, high-end compute systems, and prototyping labs.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
        { title: 'Fabrication & Tool Room',          description: 'Build deep prototypes using precision machinery, including CNC CO2 Laser Cutters, Plasma Cutters, and advanced manual prototyping tools.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
        { title: '3D Printing Facility',             description: 'Bring design concepts to life with professional FDM, SLA, and resin 3D printers, supporting over 40 types of specialized engineering filaments.', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
        { title: 'AI & Simulations Grid',            description: 'Leverage state-of-the-art compute hardware on a flexible compute-rental basis for intensive AI model training and engineering simulations.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
        { title: 'Premium Meeting Rooms',            description: 'Host presentations, pitch panels, and board reviews in modern rooms featuring integrated AV gear, screen casting, and high-speed Wi-Fi.', image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    style: {
      bg:           '#ffffff',
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
      description: 'At Navrachna Foundation (NFED), we coordinate flagship incubation schemes that nurture entrepreneurs across every stage of their startup journey. These structured programs combine equity-free prototype grants, monthly fellowship stipends, intensive commercial scaling pipelines, and institutional resources to ensure early-stage ventures gain the right strategic assets to succeed.',
      ctaLabel:    'View All Programs',
      ctaHref:     '/programs',
      programs: [
        { badge: 'Startin-Up', title: 'Startin-Up',  body: 'Discover funding and incubation opportunities through our specialized Startin-Up program, designed to assist and enable young entrepreneurs to initiate commercial exploitation of their technologies.', tag: 'Commercial exploitation' },
        { badge: 'NewGen IEDC', title: 'NewGen-IEDC', body: 'The NewGen IEDC program helps students develop entrepreneurial skills, test startup ideas, and connect with investors. We provide a dynamic and collaborative workspace that empowers you.', tag: 'Entrepreneurial skills' },
        { badge: 'MSME-BI',    title: 'MSME-BI',     body: 'Participate in MSME Hackathons to solve real-world industry challenges and secure seed funding. A direct approach towards solving your startup problems with 1 to 1 mentorship.', tag: 'Hackathon & Mentorship' },
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
          id: 'fabrication', label: 'Fabrication Lab',
          identity: { name: 'Fabrication Lab', tagline: '20 Workstations, CNC Plasma Tooling, Non-Metallic CNC Laser, Manual Power Tools', icon: '🔧' },
          specs: [
            { label: 'Workstations', value: '20 Workstations' },
            { label: 'Plasma',       value: 'CNC Plasma Tooling' },
            { label: 'Laser',        value: 'Non-Metallic CNC Laser' },
            { label: 'Tools',        value: 'Manual Power Tools' },
          ],
        },
        {
          id: '3dprinting', label: '3D Printers',
          identity: { name: '3D Printers', tagline: '02 FDM Printers, FormLabs SLA Printer, 48 Resins, Medical/Rigid', icon: '🖨️' },
          specs: [
            { label: 'FDM',     value: '02 FDM Printers (PLA/ABS/TPU)' },
            { label: 'SLA',     value: 'FormLabs SLA Printer (Form 3B+)' },
            { label: 'Resins',  value: '48 Advanced Resins Supported' },
            { label: 'Grade',   value: 'Medical & Rigid Engineering Grade' },
          ],
        },
        {
          id: 'compute', label: 'High End Compute Systems',
          identity: { name: 'High End Compute Systems', tagline: 'Intel i9-12th Gen, 128GB DDR5, RTX 3060/3090 GPU nodes', icon: '🖥️' },
          specs: [
            { label: 'Simulation', value: '02 Simulation Nodes (RTX 3060)' },
            { label: 'AI Node',    value: '01 AI Superstation (RTX 3090 x2)' },
            { label: 'Computing',  value: 'Intel i9-12th Gen Computing' },
            { label: 'RAM',        value: '128GB High-Speed DDR5 RAM' },
          ],
        },
        {
          id: 'coworking', label: 'Co-Working Area',
          identity: { name: 'Co-Working Area', tagline: '23 seats, Gigabit Internet, plug-n-play ready', icon: '🏢' },
          specs: [
            { label: 'Capacity', value: '23 Premium Co-Working Seats' },
            { label: 'Nodes',    value: '06 Plug-n-Play ready Nodes' },
            { label: 'Internet', value: 'High-Speed Gigabit Internet' },
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
        { icon: '💡', title: 'Direct Mentorship',                          body: 'A more direct approach towards solving your startup problems. We offer 1 to 1 mentorship for your entrepreneurial journey.' },
        { icon: '🔬', title: 'Lab Support',                                 body: "Providing a comprehensive lab support to your startup's prototyping needs, with a variety of tools and machineries." },
        { icon: '📶', title: 'Free Unlimited High-Speed Internet',          body: 'Stay connected with our reliable and fast internet connection.' },
        { icon: '🤝', title: 'Rich Ecosystem',                             body: 'At the heart of our rich ecosystem lies a culture of inclusivity and shared success helping founders accelerate their journey.' },
        { icon: '🏛️', title: 'Strategic Location',                          body: 'Provide easy accessibility, connectivity, and a thriving business environment for entrepreneurs and startups.' },
        { icon: '🌐', title: 'Access to Funding & Investment Opportunities', body: 'We connect you with various government grants, equity and non-equity based funding, potential investors, and VC opportunities.' },
        { icon: '⚡', title: 'Flexible Solutions',                          body: 'Tailoring layout configurations and workspace sizes to match your specific business requirements, ensuring productivity.' },
        { icon: '🏷️', title: 'Most Affordable',                            body: 'We offer cost-effective workspace solutions without compromising on quality, ensuring startups scale with ease.' },
        { icon: '🛠️', title: 'IT Support',                                  body: 'If you’re looking for additional IT services tailored to your specific needs, we specialize in comprehensive IT solutions.' },
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
      heading: 'Our Portfolio Startups',
      logos: [],
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
      eyebrow: 'COMMON QUERIES',
      subheading: 'Find clear, simple answers to common questions about the Navrachna Foundation setup and application process.',
      faqs: [
        { q: 'What is Navrachna Foundation for Entrepreneurship Development?', a: 'Navrachna Foundation for Entrepreneurship Development is a subsidiary of I.T.S. Engineering College that supports young entrepreneurs in commercializing their technologies and launching startups.' },
        { q: 'Who can benefit from the foundation?', a: 'Students, faculty, and staff looking to develop their entrepreneurial skills, test startup ideas, and connect with investors can benefit from the foundation.' },
        { q: 'What resources does the foundation provide?', a: 'The foundation offers mentorship, funding opportunities, networking support, and business development resources to help startups grow.' },
        { q: 'How does the foundation help bridge the gap between inventors and venture capitalists?', a: 'It connects innovators with industry experts, investors, and mentors to transform ideas into viable businesses.' },
      ],
    },
    style: {
      bg:           '#ffffff',
      textColor:    '#6b7280',
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
