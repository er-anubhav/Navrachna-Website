import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://obnqhrmfbctslwoylsjq.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B3XJLIu7OIjy5IN3VxahGw_8pjq1WuN'

const supabase = createClient(supabaseUrl, supabaseKey)

// 27 Individual Facilities & Equipment Items from User Infrastructure Documents
const facilitiesData = [
  // --- SECTION 1: 3D PRINTING & ADDITIVE MANUFACTURING ---
  {
    slug: 'formlabs-sla-3d-printer',
    title: 'Formlabs SLA 3D Printing Machine',
    summary: 'High-precision SLA resin 3D printing machine for medical devices, fine optical features, and high-resolution enclosures.',
    description: 'Industrial Stereolithography (SLA) resin 3D printer delivering micron-level accuracy for biocompatible prototypes, transparent optics, and smooth surface finish enclosure parts.',
    cover_image_url: '/src/assets/navrachna_images/spaces/3d_printing.jpg',
    specs_summary: ['3D Printing & Additive Manufacturing', 'Formlabs SLA Tech', 'Micron Precision', 'Biocompatible Resins'],
    display_order: 1,
    is_active: true
  },
  {
    slug: 'pla-fdm-3d-printer',
    title: 'PLA / FDM 3D Printing Machine',
    summary: 'Dual FDM 3D printing setup for PLA, ABS, and PETG rapid structural prototype modeling.',
    description: 'High-speed FDM additive manufacturing workstation for rapid physical product prototyping, functional mechanical testing, and custom jig fixtures.',
    cover_image_url: '/src/assets/navrachna_images/spaces/3d_printing.jpg',
    specs_summary: ['3D Printing & Additive Manufacturing', 'FDM Dual Extrusion', 'PLA / ABS / PETG', '300x300x400mm Volume'],
    display_order: 2,
    is_active: true
  },

  // --- SECTION 2: ELECTRONICS & PCB PROTOTYPING ---
  {
    slug: 'smd-rework-station',
    title: 'Digital SMD Rework Station',
    summary: 'Digital hot-air SMD rework gun (700W, 100-450°C) with precision temperature-controlled soldering iron.',
    description: 'Professional surface-mount device (SMD) soldering and desoldering station equipped with digital PID temperature feedback, variable airflow control, and ESD safety grounding.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Electronics & PCB Prototyping', '700W Hot Air Gun', 'PID Temp Control', 'ESD Safe Grounding'],
    display_order: 3,
    is_active: true
  },
  {
    slug: 'dc-regulated-power-supply',
    title: 'Scientific DC Power Supply Unit',
    summary: 'Multi-output D.C. regulated SMPS power supply (0-30V, 0-10A) with dual LED meters.',
    description: 'High-stability constant voltage and constant current (CV/CC) regulated power supply unit for powering sensitive microcontroller boards, sensors, and power electronics circuits.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Electronics & PCB Prototyping', '0-30V / 0-10A Output', 'CV / CC Mode', 'Dual LED Metering'],
    display_order: 4,
    is_active: true
  },
  {
    slug: 'digital-storage-oscilloscope',
    title: 'Digital Storage Oscilloscope (DSO)',
    summary: '100MHz 4-Channel Digital Storage Oscilloscope for real-time signal analysis & debugging.',
    description: 'Benchtop digital storage oscilloscope with 1GSa/s real-time sampling rate, FFT spectrum analysis, deep memory depth, and USB bus connectivity for circuit signal verification.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Electronics & PCB Prototyping', '100MHz Bandwidth', '4 Analog Channels', '1GSa/s Sampling'],
    display_order: 5,
    is_active: true
  },
  {
    slug: 'arbitrary-waveform-generator',
    title: 'Arbitrary Waveform & Function Generator',
    summary: '25MHz Dual Channel Arbitrary Waveform Generator for custom signal synthesis.',
    description: 'High-purity signal synthesizer capable of generating sine, square, ramp, pulse, noise, and custom arbitrary waveforms for sensor testing and communication circuit validation.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Electronics & PCB Prototyping', '25MHz Frequency', 'Dual Channel Output', 'Modulation'],
    display_order: 6,
    is_active: true
  },
  {
    slug: 'digital-benchtop-multimeter',
    title: 'Digital Benchtop Multimeter',
    summary: 'High-accuracy 4.5 Digits True RMS precision digital multimeter for voltage, current & resistance measurement.',
    description: 'Laboratory-grade benchtop digital multimeter providing True RMS AC/DC voltage, current, resistance, capacitance, frequency, and continuity diagnostics.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Electronics & PCB Prototyping', '4.5 Digit Display', 'True RMS Accuracy', 'Capacitance & Frequency'],
    display_order: 7,
    is_active: true
  },
  {
    slug: 'deep-freezer-cabinet',
    title: 'Ultra-Low Deep Freezer Unit',
    summary: 'Ultra-low temperature deep freezer cabinet for sample storage & material thermal stability testing.',
    description: 'Specialized deep freezing unit maintaining sub-zero environmental conditions for biological sample preservation, bio-chemical reagent storage, and cold-soak thermal testing.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Testing & Sample Preservation', 'Sub-Zero Storage', 'Microprocessor Control', 'Thermal Insulation'],
    display_order: 8,
    is_active: true
  },
  {
    slug: 'vacuum-drying-oven',
    title: 'High-Temperature Vacuum Oven',
    summary: 'High-temperature digital vacuum drying oven for degassing, curing & moisture removal.',
    description: 'Microprocessor-controlled vacuum oven featuring uniform heat distribution, vacuum pressure gauge, and inert gas purging capability for material curing and moisture-sensitive testing.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Testing & Material Processing', 'Vacuum Purging', 'PID Heat Control', 'Moisture Degassing'],
    display_order: 9,
    is_active: true
  },
  {
    slug: 'electronics-assembly-lab',
    title: 'Electronics Assembly & Testing Bench',
    summary: 'Fully integrated ESD-safe electronics workbench with anti-static matting & power strips.',
    description: 'Dedicated hardware assembly bench equipped with ESD anti-static mats, wrist strap grounding jacks, overhead illumination, and multi-socket AC power distribution.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Electronics & PCB Prototyping', 'ESD Anti-Static Matting', 'Overhead Lighting', 'Power Strips'],
    display_order: 10,
    is_active: true
  },

  // --- SECTION 3: COMPUTE & AI SIMULATION ---
  {
    slug: 'high-end-ai-gpu-workstations',
    title: 'High-End Workstations for AI, ML & Simulation',
    summary: 'Workstations with Intel i9 & Ryzen 7 CPUs with NVIDIA RTX 3090 & RTX 3060 GPUs.',
    description: 'High-performance computing cluster tailored for deep learning model training, computer vision pipelines, complex ANSYS structural simulations, and 4K CAD rendering.',
    cover_image_url: '/src/assets/navrachna_images/co-working-area-in-greater-noida-13-scaled.webp',
    specs_summary: ['Compute & AI Simulation', 'Intel Core i9 / Ryzen 7', 'NVIDIA RTX 3090 / 3060 GPUs', '128GB RAM'],
    display_order: 11,
    is_active: true
  },

  // --- SECTION 4: FABRICATION & HEAVY METALWORK ---
  {
    slug: 'cnc-plasma-cutting-machine',
    title: 'CNC Plasma Cutting Machine',
    summary: 'Heavy-duty CNC Plasma Cutting table for precision sheet metal & structural steel cutting.',
    description: 'Computer-controlled CNC plasma cutter capable of slicing through mild steel, stainless steel, and aluminum plates up to 20mm thickness with high accuracy.',
    cover_image_url: '/src/assets/navrachna_images/spaces/plasma_cutting.jpg',
    specs_summary: ['Fabrication & Metalwork', 'CNC Torch Motion', 'Up to 20mm Steel Cutting', 'Automated Height'],
    display_order: 12,
    is_active: true
  },
  {
    slug: 'co2-laser-cutting-machine',
    title: 'CO₂ Laser Cutting & Engraving Machine',
    summary: 'High-precision CO₂ Laser cutting machine for acrylic, wood, sheet metal & enclosures.',
    description: 'High-power CO₂ laser engraver and cutter for processing acrylic sheets, plywood, leather, polymer enclosures, and precision mechanical gaskets.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Fabrication & Metalwork', '130W CO₂ Laser Tube', 'Acrylic & Wood Cutting', 'LightBurn Control'],
    display_order: 13,
    is_active: true
  },
  {
    slug: 'mig-welding-machine',
    title: 'Industrial MIG Welding Machine',
    summary: 'Industrial Gas Metal Arc (MIG) welding system with wire feeder for structural joining.',
    description: 'High-current Gas Metal Arc Welding (GMAW/MIG) unit providing clean, slag-free welds across steel tubing, chassis frames, and sheet metal assemblies.',
    cover_image_url: '/src/assets/navrachna_images/spaces/mig_welding.jpg',
    specs_summary: ['Fabrication & Metalwork', 'GMAW / MIG Arc Welding', 'Argon Shielding Gas', 'Wire Feeder'],
    display_order: 14,
    is_active: true
  },
  {
    slug: 'arc-welding-machine',
    title: 'Electric ARC Welding Machine',
    summary: 'Portable Electric Arc (MMA) welding machine for heavy structural frame fabrication.',
    description: 'Inverter-based Manual Metal Arc (MMA) stick welding machine with current adjustment dial for robust steel structural fabrication.',
    cover_image_url: '/src/assets/navrachna_images/spaces/mig_welding.jpg',
    specs_summary: ['Fabrication & Metalwork', 'MMA / Stick Arc Welding', 'IGBT Inverter Tech', 'Current Regulator'],
    display_order: 15,
    is_active: true
  },
  {
    slug: 'heavy-duty-chop-saw',
    title: 'DeWalt Heavy-Duty Cut-Off Chop Saw',
    summary: 'High-torque abrasive metal cut-off chop saw machine for structural stock sectioning.',
    description: 'High-power DeWalt abrasive wheel chop saw designed for quick, straight, and mitered angle sectioning of steel pipes, angle iron, and extruded channels.',
    cover_image_url: '/src/assets/navrachna_images/spaces/mig_welding.jpg',
    specs_summary: ['Fabrication & Metalwork', 'DeWalt High-Torque Motor', '14-inch Abrasive Wheel', 'Quick Clamp'],
    display_order: 16,
    is_active: true
  },
  {
    slug: 'vinyl-cutting-plotter',
    title: 'Digital Vinyl Cutting Plotter',
    summary: 'Digital vinyl cutter & sticker plotter for custom decals, front overlays & branding.',
    description: 'Computer-driven blade vinyl plotter for cutting adhesive vinyl sheets, product labels, front panel decal graphics, and masking templates.',
    cover_image_url: '/src/assets/navrachna_images/spaces/vinyl_cutter.jpg',
    specs_summary: ['Graphics & Signage', 'Stepper Motor Control', 'SignCut Compatible', 'Adhesive Vinyl'],
    display_order: 17,
    is_active: true
  },
  {
    slug: 'automatic-coil-winding-machine',
    title: 'Automatic Coil Winding Machine',
    summary: 'Automatic digital counter coil winding machine for transformers & custom inductors.',
    description: 'Precision motorized coil winding unit with digital turn counter for winding custom inductors, high-frequency transformers, solenoid actuators, and motor stators.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Electrical & Motor Prototyping', 'Digital Turn Counter', 'Motorized Spindle', 'Custom Coils'],
    display_order: 18,
    is_active: true
  },
  {
    slug: 'portable-mig-welder-unit',
    title: 'Portable Heavy-Duty MIG Welding Unit',
    summary: 'Compact heavy-duty MIG welding system with external wire spool feeder.',
    description: 'Mobile MIG welding cart setup engineered for flexible on-site prototype frame modification, structural repairs, and metal prototyping.',
    cover_image_url: '/src/assets/navrachna_images/spaces/mig_welding.jpg',
    specs_summary: ['Fabrication & Metalwork', 'Mobile Cart Mount', 'External Wire Spool', 'Argon Gas'],
    display_order: 19,
    is_active: true
  },
  {
    slug: 'high-speed-pcb-drilling-machine',
    title: 'High-Speed Benchtop PCB Drilling Machine',
    summary: 'High-speed precision mini benchtop PCB drill press for double-sided PCB via holes.',
    description: 'Compact high-RPM benchtop drill press optimized for drilling clean, burr-free via holes and component pin holes in FR4 PCB copper laminate boards.',
    cover_image_url: '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
    specs_summary: ['Electronics & PCB Prototyping', 'High-RPM Spindle', 'Carbide Drill Bits', 'Precision Depth'],
    display_order: 20,
    is_active: true
  },
  {
    slug: 'heavy-duty-pillar-drill-machine',
    title: 'Heavy-Duty Pillar Drilling Machine',
    summary: 'Floor-standing pillar drill press machine with tilt table for thick metal drilling.',
    description: 'Industrial floor-standing pillar drill press with multi-speed belt pulley drive and rotating table for heavy mechanical hole drilling.',
    cover_image_url: '/src/assets/navrachna_images/spaces/mig_welding.jpg',
    specs_summary: ['Fabrication & Metalwork', 'Floor-Standing Pillar', 'Multi-Speed Pulley', 'Tilting Worktable'],
    display_order: 21,
    is_active: true
  },

  // --- SECTION 5: SOFTWARE FACILITIES & EDA SUITES ---
  {
    slug: 'matlab-simulation-suite',
    title: 'MATLAB & Simulink Campus Software Suite',
    summary: 'MathWorks MATLAB & Simulink suite for numerical computing, control design & AI simulation.',
    description: 'Comprehensive MATLAB & Simulink campus license covering Signal Processing Toolbox, Control System Toolbox, Deep Learning Toolbox, and Simscape physical modeling.',
    cover_image_url: '/src/assets/navrachna_images/spaces/design_system.jpg',
    specs_summary: ['Software & Academic Licenses', 'MathWorks Campus License', 'Simulink Physical Modeling', 'AI/DSP Toolboxes'],
    display_order: 22,
    is_active: true
  },
  {
    slug: 'cadence-orcad-pcb-suite',
    title: 'OrCAD Cadence PCB EDA Solutions',
    summary: 'Cadence OrCAD Allegro PCB schematic capture, PSpice simulation & PCB layout suite.',
    description: 'Professional electronic design automation (EDA) software suite for circuit schematic capture, PSpice analog/digital circuit simulation, and multi-layer PCB layout design.',
    cover_image_url: '/src/assets/navrachna_images/spaces/design_system.jpg',
    specs_summary: ['Software & Academic Licenses', 'Cadence OrCAD Capture', 'PSpice Circuit Simulator', 'Allegro Layout'],
    display_order: 23,
    is_active: true
  },
  {
    slug: 'rockwell-automation-suite',
    title: 'Rockwell Industrial Automation & SCADA Suite',
    summary: 'Rockwell Automation Studio 5000 & FactoryTalk suite for PLC programming & SCADA simulation.',
    description: 'Industrial automation software platform for Programmable Logic Controller (PLC) ladder logic development, HMI screen design, and SCADA process control simulation.',
    cover_image_url: '/src/assets/navrachna_images/spaces/design_system.jpg',
    specs_summary: ['Software & Academic Licenses', 'Studio 5000 Logix Designer', 'FactoryTalk SCADA', 'PLC Ladder Programming'],
    display_order: 24,
    is_active: true
  },
  {
    slug: 'intel-unnati-ai-lab-suite',
    title: 'Intel Unnati Artificial Intelligence Lab Suite',
    summary: 'Intel Unnati Data-Centric AI/ML Emerging Technologies Lab Suite.',
    description: 'Official Intel Unnati AI lab platform pre-installed with Intel OpenVINO Toolkit, Intel AI Analytics Toolkit, and python AI libraries optimized for Intel hardware acceleration.',
    cover_image_url: '/src/assets/navrachna_images/spaces/design_system.jpg',
    specs_summary: ['Software & Academic Licenses', 'Intel OpenVINO Toolkit', 'Intel oneAPI AI Analytics', 'Computer Vision'],
    display_order: 25,
    is_active: true
  },
  {
    slug: 'smc-pneumatics-automation-suite',
    title: 'SMC Pneumatics & Electropneumatics Suite',
    summary: 'SMC AutoSim Pneumatics & electropneumatic circuit design & PLC simulation software.',
    description: 'Pneumatic system simulation software suite for designing, testing, and simulating fluid power, pneumatic actuators, solenoid valves, and electropneumatic PLC control circuits.',
    cover_image_url: '/src/assets/navrachna_images/spaces/design_system.jpg',
    specs_summary: ['Software & Academic Licenses', 'SMC AutoSim Pneumatics', 'Electropneumatic Logic', 'PLC I/O Interface'],
    display_order: 26,
    is_active: true
  },
  {
    slug: 'national-instruments-labview-suite',
    title: 'National Instruments (NI) LabVIEW Suite',
    summary: 'NI LabVIEW graphical programming & virtual instrumentation software suite with DAQ drivers.',
    description: 'Industry-standard graphical development environment for automated test systems, sensor data acquisition (DAQ), instrument control, and industrial monitoring.',
    cover_image_url: '/src/assets/navrachna_images/spaces/design_system.jpg',
    specs_summary: ['Software & Academic Licenses', 'NI LabVIEW Graphical IDE', 'DAQmx Hardware Drivers', 'Virtual Instrumentation'],
    display_order: 27,
    is_active: true
  }
]

async function seedFacilities() {
  console.log('Logging in as Admin to bypass RLS policies...')
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@navrachna.org',
    password: 'NavrachnaAdmin2026!'
  })

  if (authError) {
    console.error('❌ Auth error:', authError.message)
    console.log('Attempting upsert with current permissions...')
  } else {
    console.log('🔑 Admin authenticated successfully!')
  }

  console.log(`Starting seeding of all ${facilitiesData.length} individual facility items into Supabase...`)
  
  let successCount = 0
  let errorCount = 0

  for (const fac of facilitiesData) {
    const { data, error } = await supabase
      .from('facilities')
      .upsert({
        slug: fac.slug,
        title: fac.title,
        summary: fac.summary,
        description: fac.description,
        cover_image_url: fac.cover_image_url,
        specs_summary: fac.specs_summary,
        display_order: fac.display_order,
        is_active: fac.is_active
      }, { onConflict: 'slug' })
      .select()

    if (error) {
      console.error(`❌ Error seeding ${fac.title}:`, error.message)
      errorCount++
    } else {
      console.log(`✅ Successfully seeded: ${fac.title} (Order: ${fac.display_order})`)
      successCount++
    }
  }

  console.log(`\n🎉 Seeding complete! Successfully seeded ${successCount}/${facilitiesData.length} facilities.`)
}

seedFacilities()
