export const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Stories', to: '/stories' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export const heroStats = [
  { value: '150+', label: 'Startups supported' },
  { value: '24/7', label: 'Workspace access' },
  { value: '1:1', label: 'Mentor touchpoints' },
  { value: '4', label: 'Core programs' },
]

export const proofLogos = ['UPROI', 'DIGIERA', 'Verdant', 'Weaclim', 'NewGen', 'StartinUP']

export const pillars = [
  {
    eyebrow: 'Mentorship',
    title: 'Direct guidance that removes guesswork',
    copy:
      'Structured founder support, milestone reviews, and access to operators who have shipped real products.',
    points: ['1:1 guidance', 'Milestone planning', 'Startup readiness reviews'],
  },
  {
    eyebrow: 'Infrastructure',
    title: 'Workspace, labs, and tools under one roof',
    copy:
      'From prototyping equipment to meeting rooms and reliable connectivity, the environment is built to help teams move faster.',
    points: ['Lab support', 'Meeting rooms', 'High-speed internet'],
  },
  {
    eyebrow: 'Capital',
    title: 'Funding routes and investor visibility',
    copy:
      'Connect with grants, angel networks, and public support channels that help promising ideas become fundable ventures.',
    points: ['Grant guidance', 'Investor introductions', 'Program referrals'],
  },
]

export const programs = [
  {
    slug: 'startin-up',
    title: 'StartinUP (UP State Incubation Scheme)',
    summary: 'Launch support for founders turning a concept into a working product.',
    accent: 'from-rose-100 to-orange-50',
    bullets: ['Sustenance Allowance', 'Prototype Grant', 'Seed Capital & Marketing'],
    description: `Navrachna Foundation for Entrepreneurship Development is dedicated to building a vibrant innovation and start‑up ecosystem that empowers young entrepreneurs to translate ideas into high‑impact, technology-driven ventures.

Navrachna’s vision is closely aligned with the StartinUP program of the Government of Uttar Pradesh, which aims to foster a robust start-up ecosystem through policy support, incubation, sustenance allowance, prototype grants, seed funding pathways, and market linkages.

By mirroring StartinUP’s core priorities—innovation-led growth, ease of doing business, inclusive entrepreneurship, and direct access to capital—Navrachna acts as an authorized execution partner to guide emerging founders from ideation to commercial market scaling.`,
    how_we_support: [
      { title: 'Direct Scheme Incentives', detail: 'Streamlined access to official financial grants, fellowship stipends, and seed capital pathways.' },
      { title: 'World-Class Infrastructure', detail: 'Hands-on Fab Labs, electronics prototyping, 3D printing equipment, and 24/7 co-working facilities.' },
      { title: 'Expert Domain Mentorship', detail: '1-on-1 guidance from seasoned industry veterans, IP consultants, and legal specialists.' }
    ],
    incentives: [
      { title: 'Sustenance Allowance', detail: 'Monthly fellowship stipend up to ₹17,500/month for 1 year for idea-stage founders.' },
      { title: 'Prototype Development Grant', detail: 'Funding up to ₹5 Lakhs for proof-of-concept testing, validation, and build-out.' },
      { title: 'Seed & Marketing Capital', detail: 'Grants up to ₹7.5 Lakhs to support go-to-market scaling, commercial launch & traction.' },
      { title: 'IP & Patent Filing', detail: 'Complete reimbursement of patent filing costs to protect intellectual property.' }
    ],
    roadmap_image: '/src/assets/navrachna_images/incubation_roadmap_exact.png',
    steps: [
      {
        step: 'STEP 01',
        title: 'Submit Incubation Form',
        desc: 'Fill out the incubation request form with details of your technology concept and team background.',
        color: '#10b981'
      },
      {
        step: 'STEP 02',
        title: 'Diagnostic Pitch Evaluation',
        desc: 'Our screening committee will review your submission and reach back within 48 hours to schedule a pitch.',
        color: '#3b82f6'
      },
      {
        step: 'STEP 03',
        title: 'Board Alignment & Grant Sanction',
        desc: 'Present before the incubation board to lock in your desk allocation, grant eligibility, and Fab Lab pass.',
        color: '#8b5cf6'
      },
      {
        step: 'STEP 04',
        title: 'Launch & Commercial Scale',
        desc: 'Formally launch in our state-of-the-art facilities! Achieve progress milestones and scale your venture.',
        color: '#ec4899'
      }
    ]
  },
  {
    slug: 'newgen-iedc',
    title: 'DST NewGen-IEDC Scheme',
    summary: 'Early-stage ideation and proof-of-concept support for student-led ventures.',
    accent: 'from-amber-100 to-orange-50',
    bullets: ['₹2.5L Prototype Funding', 'Fab Lab Access', 'Technical Mentorship'],
    description: `The New Gen Innovation and Entrepreneurship Development Centre (NewGen-IEDC) is an initiative of the National Science & Technology Entrepreneurship Development Board (NSTEDB), Department of Science & Technology (DST), Government of India.

It is established to inculcate the spirit of innovation and entrepreneurship among the young students of Science & Technology, encouraging them to take up entrepreneurship as a career option.

Under this flagship scheme at Navrachna Foundation, up to 20 student-led prototype projects are funded each academic year with financial support of ₹2.50 Lakhs per project, alongside comprehensive Fab Lab access, patent filing assistance, and technical mentorship.`,
    how_we_support: [
      { title: 'Prototype Project Funding', detail: 'Financial grant of ₹2.50 Lakhs per student-led project for physical PoC development.' },
      { title: 'Fab Lab & Prototyping', detail: '24/7 access to 3D printers, laser cutters, CNC machines, and electronics workstations.' },
      { title: 'Faculty & Industry Guidance', detail: 'Dedicated faculty mentors and technical review panels for iterative engineering.' }
    ],
    incentives: [
      { title: 'Student Grant Support', detail: 'Direct project funding of ₹2.50 Lakhs for raw materials, components, and fabrication.' },
      { title: 'Patent Assistance', detail: 'Full IP drafting support and filing assistance for novel technological innovations.' },
      { title: 'National Showcase', detail: 'Opportunities to present prototypes at DST national exhibitions and investor summits.' }
    ]
  },
  {
    slug: 'msme-bi',
    title: 'MSME Business Incubator (MSME-BI)',
    summary: 'Business incubation for teams that need structure, compliance, and market access.',
    accent: 'from-amber-50 to-yellow-50',
    bullets: ['₹15L Seed Grant', 'Host Institute Support', 'Industrial Machinery Access'],
    description: `The MSME Business Incubator scheme under the Ministry of Micro, Small and Medium Enterprises (MoMSME), Government of India, supports the incubation of innovative business ideas into commercial enterprises.

Operating as an approved Host Institute (HI), Navrachna Foundation nurtures technology-driven MSME projects by providing non-equity grant funding up to ₹15 Lakhs per idea, specialized industrial machinery access, regulatory compliance guidance, and corporate supply chain integration.

This track is specially designed for tech founders, manufacturing innovators, and small enterprise leaders aiming to scale prototype concepts into sustainable market-ready products.`,
    how_we_support: [
      { title: 'Host Institute Incubation', detail: 'Institutional hosting, legal registration support, and MSME policy assistance.' },
      { title: 'Industrial Lab Facilities', detail: 'Access to high-capacity manufacturing tools, plasma cutters, and testing equipment.' },
      { title: 'Commercialization Pipeline', detail: 'Corporate connect sessions, supply chain alignment, and enterprise scaling strategies.' }
    ],
    incentives: [
      { title: 'Incubation Grant Funding', detail: 'Non-equity seed grant up to ₹15 Lakhs per approved business concept.' },
      { title: 'Compliance & Registration', detail: 'Full support for MSME Udyam registration, GST setup, and regulatory clearance.' },
      { title: 'Market Linkage', detail: 'Direct access to government procurement portals and enterprise vendor networks.' }
    ]
  },
  {
    slug: 'iic',
    title: "Institution's Innovation Council (IIC)",
    summary: 'A research-first track for faculty, students, and problem solvers building from the ground up.',
    accent: 'from-orange-100 to-amber-50',
    bullets: ['Research Support', 'IP Awareness Workshops', 'National Hackathons'],
    description: `Institution’s Innovation Council (IIC) is an initiative of the Ministry of Education (MoE) Innovation Cell (MIC), Government of India, established to systematically foster the culture of Innovation among Higher Education Institutions.

Navrachna Foundation functions as a central innovation hub under IIC to drive hackathons, ideation challenges, intellectual property workshops, and pre-incubation pipelines for student innovators.

Through structured quarterly activity calendars, resident teams receive continuous exposure to angel investors, national innovation contests, policy seminars, and technology transfer support.`,
    how_we_support: [
      { title: 'MoE Innovation Framework', detail: 'Structured quarterly calendars for hackathons, design thinking, and IP seminars.' },
      { title: 'Pre-Incubation Pipeline', detail: 'Translating academic research projects into commercial startup blueprints.' },
      { title: 'National Competitions', detail: 'Preparation for Smart India Hackathon (SIH) and MoE National Innovation Contests.' }
    ],
    incentives: [
      { title: 'IP & Patent Workshops', detail: 'Free patent search sessions and institutional intellectual property filing guidance.' },
      { title: 'National Ratings & Credits', detail: 'Academic innovation credits and national recognition under MoE star ratings.' },
      { title: 'Pre-Seed Exposure', detail: 'Direct pitching opportunities before regional angel networks and seed funds.' }
    ]
  },
  {
    slug: 'kartavyam',
    title: 'Kartavyam Youth STEM Initiative',
    summary: 'School-level STEM innovation and youth entrepreneurship outreach impacting 300+ students across 40+ partner schools.',
    accent: 'from-amber-100 to-yellow-50',
    bullets: ['School Outreach', 'Youth STEM Innovation', 'Early Entrepreneurship'],
    description: `Kartavyam is Navrachna Foundation’s flagship youth outreach and STEM innovation program, empowering school students across Northern India to develop problem-solving mindsets from an early age.

Impacting over 300+ young innovators across 40+ partner schools, Kartavyam provides hands-on robotics workshops, 3D printing training, tinkering lab access, and junior hackathons.

Through structured mentoring from senior incubatees and Fab Lab engineers, Kartavyam nurtures the next generation of scientific thinkers and young founders.`,
    how_we_support: [
      { title: 'School STEM Outreach', detail: 'Hands-on robotics, IoT, and 3D printing workshops in partner schools.' },
      { title: 'Tinkering Lab Access', detail: 'Guided exposure to university-grade prototyping tools and STEM kits.' },
      { title: 'Junior Hackathons', detail: 'Problem-solving competitions designed specifically for school-age innovators.' }
    ],
    incentives: [
      { title: 'STEM Prototyping Kits', detail: 'Free access to microcontrollers, sensors, and robotics hardware kits.' },
      { title: 'Youth Mentorship', detail: 'One-on-one guidance from senior Fab Lab engineers and student founders.' },
      { title: 'Young Innovator Awards', detail: 'Sponsorship and recognition at annual regional STEM exhibitions.' }
    ]
  },
]

export const facilities = [
  // --- SECTION 1: 3D PRINTING & ADDITIVE MANUFACTURING ---
  {
    slug: 'formlabs-sla-3d-printer',
    title: 'Formlabs SLA 3D Printing Machine',
    category: '3D Printing & Additive Manufacturing',
    detail: 'Industrial Stereolithography (SLA) resin 3D printer delivering micron-level accuracy for biocompatible prototypes, transparent optics, and smooth surface finish enclosure parts.',
    specs: ['Formlabs SLA Technology', 'Micron Precision', 'Biocompatible & Clear Resins'],
    image: '/src/assets/navrachna_images/spaces/3d_printing.jpg'
  },
  {
    slug: 'pla-fdm-3d-printer',
    title: 'PLA / FDM 3D Printing Machine',
    category: '3D Printing & Additive Manufacturing',
    detail: 'High-speed FDM additive manufacturing workstation for rapid physical product prototyping, functional mechanical testing, and custom jig fixtures.',
    specs: ['FDM Dual Extrusion', 'PLA / ABS / PETG', '300x300x400mm Volume'],
    image: '/src/assets/navrachna_images/spaces/3d_printing.jpg'
  },

  // --- SECTION 2: ELECTRONICS & PCB PROTOTYPING ---
  {
    slug: 'smd-rework-station',
    title: 'Digital SMD Rework Station',
    category: 'Electronics & PCB Prototyping',
    detail: 'Professional surface-mount device (SMD) soldering and desoldering station equipped with digital PID temperature feedback, variable airflow control, and ESD safety grounding.',
    specs: ['700W Hot Air Gun', 'PID Temperature Control', 'ESD Safe Grounding'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'dc-regulated-power-supply',
    title: 'Scientific DC Power Supply Unit',
    category: 'Electronics & PCB Prototyping',
    detail: 'High-stability constant voltage and constant current (CV/CC) regulated power supply unit for powering sensitive microcontroller boards, sensors, and power electronics circuits.',
    specs: ['0-30V / 0-10A Output', 'CV / CC Mode', 'Dual LED Digital Metering'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'digital-storage-oscilloscope',
    title: 'Digital Storage Oscilloscope (DSO)',
    category: 'Electronics & PCB Prototyping',
    detail: 'Benchtop digital storage oscilloscope with 1GSa/s real-time sampling rate, FFT spectrum analysis, deep memory depth, and USB bus connectivity for circuit signal verification.',
    specs: ['100MHz Bandwidth', '4 Analog Channels', '1GSa/s Sampling Rate'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'arbitrary-waveform-generator',
    title: 'Arbitrary Waveform & Function Generator',
    category: 'Electronics & PCB Prototyping',
    detail: 'High-purity signal synthesizer capable of generating sine, square, ramp, pulse, noise, and custom arbitrary waveforms for sensor testing and communication circuit validation.',
    specs: ['25MHz Frequency', 'Dual Channel Output', 'Built-in Modulation'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'digital-benchtop-multimeter',
    title: 'Digital Benchtop Multimeter',
    category: 'Electronics & PCB Prototyping',
    detail: 'Laboratory-grade benchtop digital multimeter providing True RMS AC/DC voltage, current, resistance, capacitance, frequency, and continuity diagnostics.',
    specs: ['4.5 Digit Display', 'True RMS Accuracy', 'Capacitance & Frequency'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'deep-freezer-cabinet',
    title: 'Ultra-Low Deep Freezer Unit',
    category: 'Testing & Sample Preservation',
    detail: 'Specialized deep freezing unit maintaining sub-zero environmental conditions for biological sample preservation, bio-chemical reagent storage, and cold-soak thermal testing.',
    specs: ['Sub-Zero Storage', 'Digital Microprocessor Control', 'Thermal Insulation'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'vacuum-drying-oven',
    title: 'High-Temperature Vacuum Oven',
    category: 'Testing & Material Processing',
    detail: 'Microprocessor-controlled vacuum oven featuring uniform heat distribution, vacuum pressure gauge, and inert gas purging capability for material curing and moisture-sensitive testing.',
    specs: ['Vacuum Purging', 'Digital PID Heat Control', 'Moisture Degassing'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'electronics-assembly-lab',
    title: 'Electronics Assembly & Testing Bench',
    category: 'Electronics & PCB Prototyping',
    detail: 'Dedicated hardware assembly bench with multi-socket AC power distribution and overhead illumination.',
    specs: ['Hardware Assembly Bench', 'Overhead Lighting', 'Integrated AC Power Strips'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },

  // --- SECTION 3: COMPUTE & AI SIMULATION ---
  {
    slug: 'high-end-ai-gpu-workstations',
    title: 'High-End Workstations for AI, ML & Simulation',
    category: 'Compute & AI Simulation',
    detail: 'High-performance computing cluster tailored for deep learning model training, computer vision pipelines, complex ANSYS structural simulations, and 4K CAD rendering.',
    specs: ['Intel Core i9 / Ryzen 7', 'NVIDIA RTX 3090 / 3060 Dual GPUs', '128GB High-Speed RAM'],
    image: '/src/assets/navrachna_images/co-working-area-in-greater-noida-13-scaled.webp'
  },

  // --- SECTION 4: FABRICATION & HEAVY METALWORK ---
  {
    slug: 'cnc-plasma-cutting-machine',
    title: 'CNC Plasma Cutting Machine',
    category: 'Fabrication & Metalwork',
    detail: 'Computer-controlled CNC plasma cutter capable of slicing through mild steel, stainless steel, and aluminum plates up to 20mm thickness with high accuracy.',
    specs: ['CNC Torch Motion', 'Up to 20mm Steel Cutting', 'Automated Height Control'],
    image: '/src/assets/navrachna_images/spaces/plasma_cutting.jpg'
  },
  {
    slug: 'co2-laser-cutting-machine',
    title: 'CO₂ Laser Cutting & Engraving Machine',
    category: 'Fabrication & Metalwork',
    detail: 'High-power CO₂ laser engraver and cutter for processing acrylic sheets, plywood, leather, polymer enclosures, and precision mechanical gaskets.',
    specs: ['130W CO₂ Laser Tube', 'Acrylic & Wood Cutting', 'LightBurn Software Control'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'mig-welding-machine',
    title: 'Industrial MIG Welding Machine',
    category: 'Fabrication & Metalwork',
    detail: 'High-current Gas Metal Arc Welding (GMAW/MIG) unit providing clean, slag-free welds across steel tubing, chassis frames, and sheet metal assemblies.',
    specs: ['GMAW / MIG Arc Welding', 'Argon/CO₂ Shielding Gas', 'Continuous Wire Feeder'],
    image: '/src/assets/navrachna_images/spaces/mig_welding.jpg'
  },
  {
    slug: 'arc-welding-machine',
    title: 'Electric ARC Welding Machine',
    category: 'Fabrication & Metalwork',
    detail: 'Inverter-based Manual Metal Arc (MMA) stick welding machine with current adjustment dial for robust steel structural fabrication.',
    specs: ['MMA / Stick Arc Welding', 'IGBT Inverter Tech', 'Current Regulation Dial'],
    image: '/src/assets/navrachna_images/spaces/mig_welding.jpg'
  },
  {
    slug: 'heavy-duty-chop-saw',
    title: 'DeWalt Heavy-Duty Cut-Off Chop Saw',
    category: 'Fabrication & Metalwork',
    detail: 'High-power DeWalt abrasive wheel chop saw designed for quick, straight, and mitered angle sectioning of steel pipes, angle iron, and extruded channels.',
    specs: ['DeWalt High-Torque Motor', '14-inch Abrasive Wheel', 'Quick-Clamp Vise'],
    image: '/src/assets/navrachna_images/spaces/mig_welding.jpg'
  },
  {
    slug: 'vinyl-cutting-plotter',
    title: 'Digital Vinyl Cutting Plotter',
    category: 'Graphics & Signage Prototyping',
    detail: 'Computer-driven blade vinyl plotter for cutting adhesive vinyl sheets, product labels, front panel decal graphics, and masking templates.',
    specs: ['Stepper Motor Blade Control', 'SignCut / Artcut Compatible', 'Adhesive Vinyl Cutting'],
    image: '/src/assets/navrachna_images/spaces/vinyl_cutter.jpg'
  },
  {
    slug: 'automatic-coil-winding-machine',
    title: 'Automatic Coil Winding Machine',
    category: 'Electrical & Motor Prototyping',
    detail: 'Precision motorized coil winding unit with digital turn counter for winding custom inductors, high-frequency transformers, solenoid actuators, and motor stators.',
    specs: ['Digital Turn Counter', 'Motorized Spindle', 'Custom Transformer Winding'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'portable-mig-welder-unit',
    title: 'Portable Heavy-Duty MIG Welding Unit',
    category: 'Fabrication & Metalwork',
    detail: 'Mobile MIG welding cart setup engineered for flexible on-site prototype frame modification, structural repairs, and metal prototyping.',
    specs: ['Mobile Cart Mount', 'External Wire Spool', 'Argon Shielding Gas'],
    image: '/src/assets/navrachna_images/spaces/mig_welding.jpg'
  },
  {
    slug: 'high-speed-pcb-drilling-machine',
    title: 'High-Speed Benchtop PCB Drilling Machine',
    category: 'Electronics & PCB Prototyping',
    detail: 'Compact high-RPM benchtop drill press optimized for drilling clean, burr-free via holes and component pin holes in FR4 PCB copper laminate boards.',
    specs: ['High-RPM Spindle', 'Carbide Drill Bits', 'Precision Depth Gauge'],
    image: '/src/assets/navrachna_images/spaces/laser_cutting.jpg'
  },
  {
    slug: 'heavy-duty-pillar-drill-machine',
    title: 'Heavy-Duty Pillar Drilling Machine',
    category: 'Fabrication & Metalwork',
    detail: 'Industrial floor-standing pillar drill press with multi-speed belt pulley drive and rotating table for heavy mechanical hole drilling.',
    specs: ['Floor-Standing Pillar', 'Multi-Speed Pulley Drive', 'Tilting Worktable'],
    image: '/src/assets/navrachna_images/spaces/mig_welding.jpg'
  },

  // --- SECTION 5: SOFTWARE FACILITIES & EDA SUITES ---
  {
    slug: 'matlab-simulation-suite',
    title: 'MATLAB & Simulink Campus Software Suite',
    category: 'Software & Academic Licenses',
    detail: 'Comprehensive MATLAB & Simulink campus license covering Signal Processing Toolbox, Control System Toolbox, Deep Learning Toolbox, and Simscape physical modeling.',
    specs: ['MathWorks Campus License', 'Simulink Physical Modeling', 'Deep Learning & DSP Toolboxes'],
    image: '/src/assets/navrachna_images/spaces/design_system.jpg'
  },
  {
    slug: 'cadence-orcad-pcb-suite',
    title: 'OrCAD Cadence PCB EDA Solutions',
    category: 'Software & Academic Licenses',
    detail: 'Professional electronic design automation (EDA) software suite for circuit schematic capture, PSpice analog/digital circuit simulation, and multi-layer PCB layout design.',
    specs: ['Cadence OrCAD Capture', 'PSpice Circuit Simulator', 'Multi-Layer PCB Allegro Layout'],
    image: '/src/assets/navrachna_images/spaces/design_system.jpg'
  },
  {
    slug: 'rockwell-automation-suite',
    title: 'Rockwell Industrial Automation & SCADA Suite',
    category: 'Software & Academic Licenses',
    detail: 'Industrial automation software platform for Programmable Logic Controller (PLC) ladder logic development, HMI screen design, and SCADA process control simulation.',
    specs: ['Studio 5000 Logix Designer', 'FactoryTalk SCADA', 'PLC Ladder Programming'],
    image: '/src/assets/navrachna_images/spaces/design_system.jpg'
  },
  {
    slug: 'intel-unnati-ai-lab-suite',
    title: 'Intel Unnati Artificial Intelligence Lab Suite',
    category: 'Software & Academic Licenses',
    detail: 'Official Intel Unnati AI lab platform pre-installed with Intel OpenVINO Toolkit, Intel AI Analytics Toolkit, and python AI libraries optimized for Intel hardware acceleration.',
    specs: ['Intel OpenVINO Toolkit', 'Intel oneAPI AI Analytics', 'Computer Vision Acceleration'],
    image: '/src/assets/navrachna_images/spaces/design_system.jpg'
  },
  {
    slug: 'smc-pneumatics-automation-suite',
    title: 'SMC Pneumatics & Electropneumatics Suite',
    category: 'Software & Academic Licenses',
    detail: 'Pneumatic system simulation software suite for designing, testing, and simulating fluid power, pneumatic actuators, solenoid valves, and electropneumatic PLC control circuits.',
    specs: ['SMC AutoSim Pneumatics', 'Electropneumatic Logic', 'PLC I/O Interface'],
    image: '/src/assets/navrachna_images/spaces/design_system.jpg'
  },
  {
    slug: 'national-instruments-labview-suite',
    title: 'National Instruments (NI) LabVIEW Suite',
    category: 'Software & Academic Licenses',
    detail: 'Industry-standard graphical development environment for automated test systems, sensor data acquisition (DAQ), instrument control, and industrial monitoring.',
    specs: ['NI LabVIEW Graphical IDE', 'DAQmx Hardware Drivers', 'Virtual Instrumentation'],
    image: '/src/assets/navrachna_images/spaces/design_system.jpg'
  }
]

export const testimonials = [
  {
    name: 'Aarav Jain',
    startup: 'UPROI',
    quote:
      'The combination of mentoring and workspace support helped us go from a prototype to a client-ready product without losing momentum.',
    metric: '6 weeks to first pilot',
  },
  {
    name: 'Sana Khan',
    startup: 'Verdant',
    quote:
      'The structure here is the difference. We got a place to build, a process to follow, and people who pushed us to sharpen the idea.',
    metric: '3 mentor rounds per month',
  },
  {
    name: 'Kunal Verma',
    startup: 'Digiera',
    quote:
      'Instead of figuring out infrastructure from scratch, we could focus on product and customer conversations. That saved us a lot of time.',
    metric: '24/7 access to build',
  },
]

export const faqs = [
  {
    question: 'Who can apply to Navrachna Foundation?',
    answer:
      'Students, faculty, researchers, and early-stage founders with a viable idea or startup can apply to the most relevant program track.',
  },
  {
    question: 'What support do founders receive?',
    answer:
      'Founders get mentorship, workspace access, lab support, networking opportunities, and guidance on grants or investor outreach.',
  },
  {
    question: 'Do you offer funding directly?',
    answer:
      'The foundation helps founders prepare for grants, pitch opportunities, and investor conversations, but funding approvals depend on the relevant partner or authority.',
  },
  {
    question: 'Can startups use the facilities outside office hours?',
    answer:
      'Yes, approved teams can use the workspace with extended access policies that support the pace of startup building.',
  },
]

export const footerColumns = [
  {
    title: 'Foundation',
    links: [
      { label: 'About Navrachna', to: '/about' },
      { label: 'Stories', to: '/stories' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'NewGen-IEDC', to: '/programs/newgen-iedc' },
      { label: 'StartinUP', to: '/startin-up' },
      { label: 'MSME-BI', to: '/msme-bi' },
      { label: 'Innovation Cell', to: '/innovation-cell/iic-itsec' },
    ],
  },
  {
    title: 'Facilities',
    links: [
      { label: 'Workspace', to: '/facilities' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Apply now', to: '/contact' },
    ],
  },
]