-- ==============================================================================
-- Navrachna Foundation CMS - 27 Individual Facilities Seed Migration
-- Target: Supabase PostgreSQL Database (facilities table)
-- Description: Idempotent seed of all 27 physical machines, tools & software suites
-- ==============================================================================

BEGIN;

INSERT INTO public.facilities (slug, title, summary, description, cover_image_url, specs_summary, display_order, is_active)
VALUES
-- 1. Formlabs SLA 3D Printer
(
  'formlabs-sla-3d-printer',
  'Formlabs SLA 3D Printing Machine',
  'High-precision SLA resin 3D printing machine for medical devices, fine optical features, and high-resolution enclosures.',
  'Industrial Stereolithography (SLA) resin 3D printer delivering micron-level accuracy for biocompatible prototypes, transparent optics, and smooth surface finish enclosure parts.',
  '/src/assets/navrachna_images/spaces/3d_printing.jpg',
  '["3D Printing & Additive Manufacturing", "Formlabs SLA Tech", "Micron Precision", "Biocompatible Resins"]'::jsonb,
  1,
  true
),
-- 2. PLA FDM 3D Printer
(
  'pla-fdm-3d-printer',
  'PLA / FDM 3D Printing Machine',
  'Dual FDM 3D printing setup for PLA, ABS, and PETG rapid structural prototype modeling.',
  'High-speed FDM additive manufacturing workstation for rapid physical product prototyping, functional mechanical testing, and custom jig fixtures.',
  '/src/assets/navrachna_images/spaces/3d_printing.jpg',
  '["3D Printing & Additive Manufacturing", "FDM Dual Extrusion", "PLA / ABS / PETG", "300x300x400mm Volume"]'::jsonb,
  2,
  true
),
-- 3. Digital SMD Rework Station
(
  'smd-rework-station',
  'Digital SMD Rework Station',
  'Digital hot-air SMD rework gun (700W, 100-450°C) with precision temperature-controlled soldering iron.',
  'Professional surface-mount device (SMD) soldering and desoldering station equipped with digital PID temperature feedback, variable airflow control, and ESD safety grounding.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Electronics & PCB Prototyping", "700W Hot Air Gun", "PID Temp Control", "ESD Safe Grounding"]'::jsonb,
  3,
  true
),
-- 4. DC Regulated Power Supply
(
  'dc-regulated-power-supply',
  'Scientific DC Power Supply Unit',
  'Multi-output D.C. regulated SMPS power supply (0-30V, 0-10A) with dual LED meters.',
  'High-stability constant voltage and constant current (CV/CC) regulated power supply unit for powering sensitive microcontroller boards, sensors, and power electronics circuits.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Electronics & PCB Prototyping", "0-30V / 0-10A Output", "CV / CC Mode", "Dual LED Metering"]'::jsonb,
  4,
  true
),
-- 5. Digital Storage Oscilloscope
(
  'digital-storage-oscilloscope',
  'Digital Storage Oscilloscope (DSO)',
  '100MHz 4-Channel Digital Storage Oscilloscope for real-time signal analysis & debugging.',
  'Benchtop digital storage oscilloscope with 1GSa/s real-time sampling rate, FFT spectrum analysis, deep memory depth, and USB bus connectivity for circuit signal verification.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Electronics & PCB Prototyping", "100MHz Bandwidth", "4 Analog Channels", "1GSa/s Sampling"]'::jsonb,
  5,
  true
),
-- 6. Arbitrary Waveform Generator
(
  'arbitrary-waveform-generator',
  'Arbitrary Waveform & Function Generator',
  '25MHz Dual Channel Arbitrary Waveform Generator for custom signal synthesis.',
  'High-purity signal synthesizer capable of generating sine, square, ramp, pulse, noise, and custom arbitrary waveforms for sensor testing and communication circuit validation.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Electronics & PCB Prototyping", "25MHz Frequency", "Dual Channel Output", "Modulation"]'::jsonb,
  6,
  true
),
-- 7. Digital Benchtop Multimeter
(
  'digital-benchtop-multimeter',
  'Digital Benchtop Multimeter',
  'High-accuracy 4.5 Digits True RMS precision digital multimeter for voltage, current & resistance measurement.',
  'Laboratory-grade benchtop digital multimeter providing True RMS AC/DC voltage, current, resistance, capacitance, frequency, and continuity diagnostics.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Electronics & PCB Prototyping", "4.5 Digit Display", "True RMS Accuracy", "Capacitance & Frequency"]'::jsonb,
  7,
  true
),
-- 8. Ultra-Low Deep Freezer
(
  'deep-freezer-cabinet',
  'Ultra-Low Deep Freezer Unit',
  'Ultra-low temperature deep freezer cabinet for sample storage & material thermal stability testing.',
  'Specialized deep freezing unit maintaining sub-zero environmental conditions for biological sample preservation, bio-chemical reagent storage, and cold-soak thermal testing.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Testing & Sample Preservation", "Sub-Zero Storage", "Microprocessor Control", "Thermal Insulation"]'::jsonb,
  8,
  true
),
-- 9. High-Temperature Vacuum Oven
(
  'vacuum-drying-oven',
  'High-Temperature Vacuum Oven',
  'High-temperature digital vacuum drying oven for degassing, curing & moisture removal.',
  'Microprocessor-controlled vacuum oven featuring uniform heat distribution, vacuum pressure gauge, and inert gas purging capability for material curing and moisture-sensitive testing.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Testing & Material Processing", "Vacuum Purging", "PID Heat Control", "Moisture Degassing"]'::jsonb,
  9,
  true
),
-- 10. Electronics Assembly Lab Bench
(
  'electronics-assembly-lab',
  'Electronics Assembly & Testing Bench',
  'Fully integrated ESD-safe electronics workbench with anti-static matting & power strips.',
  'Dedicated hardware assembly bench equipped with ESD anti-static mats, wrist strap grounding jacks, overhead illumination, and multi-socket AC power distribution.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Electronics & PCB Prototyping", "ESD Anti-Static Matting", "Overhead Lighting", "Power Strips"]'::jsonb,
  10,
  true
),
-- 11. High-End AI GPU Workstations
(
  'high-end-ai-gpu-workstations',
  'High-End Workstations for AI, ML & Simulation',
  'Workstations with Intel i9 & Ryzen 7 CPUs with NVIDIA RTX 3090 & RTX 3060 GPUs.',
  'High-performance computing cluster tailored for deep learning model training, computer vision pipelines, complex ANSYS structural simulations, and 4K CAD rendering.',
  '/src/assets/navrachna_images/co-working-area-in-greater-noida-13-scaled.webp',
  '["Compute & AI Simulation", "Intel Core i9 / Ryzen 7", "NVIDIA RTX 3090 / 3060 GPUs", "128GB RAM"]'::jsonb,
  11,
  true
),
-- 12. CNC Plasma Cutting Machine
(
  'cnc-plasma-cutting-machine',
  'CNC Plasma Cutting Machine',
  'Heavy-duty CNC Plasma Cutting table for precision sheet metal & structural steel cutting.',
  'Computer-controlled CNC plasma cutter capable of slicing through mild steel, stainless steel, and aluminum plates up to 20mm thickness with high accuracy.',
  '/src/assets/navrachna_images/spaces/plasma_cutting.jpg',
  '["Fabrication & Metalwork", "CNC Torch Motion", "Up to 20mm Steel Cutting", "Automated Height"]'::jsonb,
  12,
  true
),
-- 13. CO₂ Laser Cutting Machine
(
  'co2-laser-cutting-machine',
  'CO₂ Laser Cutting & Engraving Machine',
  'High-precision CO₂ Laser cutting machine for acrylic, wood, sheet metal & enclosures.',
  'High-power CO₂ laser engraver and cutter for processing acrylic sheets, plywood, leather, polymer enclosures, and precision mechanical gaskets.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Fabrication & Metalwork", "130W CO₂ Laser Tube", "Acrylic & Wood Cutting", "LightBurn Control"]'::jsonb,
  13,
  true
),
-- 14. Industrial MIG Welding Machine
(
  'mig-welding-machine',
  'Industrial MIG Welding Machine',
  'Industrial Gas Metal Arc (MIG) welding system with wire feeder for structural joining.',
  'High-current Gas Metal Arc Welding (GMAW/MIG) unit providing clean, slag-free welds across steel tubing, chassis frames, and sheet metal assemblies.',
  '/src/assets/navrachna_images/spaces/mig_welding.jpg',
  '["Fabrication & Metalwork", "GMAW / MIG Arc Welding", "Argon Shielding Gas", "Wire Feeder"]'::jsonb,
  14,
  true
),
-- 15. Electric ARC Welding Machine
(
  'arc-welding-machine',
  'Electric ARC Welding Machine',
  'Portable Electric Arc (MMA) welding machine for heavy structural frame fabrication.',
  'Inverter-based Manual Metal Arc (MMA) stick welding machine with current adjustment dial for robust steel structural fabrication.',
  '/src/assets/navrachna_images/spaces/mig_welding.jpg',
  '["Fabrication & Metalwork", "MMA / Stick Arc Welding", "IGBT Inverter Tech", "Current Regulator"]'::jsonb,
  15,
  true
),
-- 16. DeWalt Cut-Off Chop Saw
(
  'heavy-duty-chop-saw',
  'DeWalt Heavy-Duty Cut-Off Chop Saw',
  'High-torque abrasive metal cut-off chop saw machine for structural stock sectioning.',
  'High-power DeWalt abrasive wheel chop saw designed for quick, straight, and mitered angle sectioning of steel pipes, angle iron, and extruded channels.',
  '/src/assets/navrachna_images/spaces/mig_welding.jpg',
  '["Fabrication & Metalwork", "DeWalt High-Torque Motor", "14-inch Abrasive Wheel", "Quick Clamp"]'::jsonb,
  16,
  true
),
-- 17. Digital Vinyl Cutting Plotter
(
  'vinyl-cutting-plotter',
  'Digital Vinyl Cutting Plotter',
  'Digital vinyl cutter & sticker plotter for custom decals, front overlays & branding.',
  'Computer-driven blade vinyl plotter for cutting adhesive vinyl sheets, product labels, front panel decal graphics, and masking templates.',
  '/src/assets/navrachna_images/spaces/vinyl_cutter.jpg',
  '["Graphics & Signage", "Stepper Motor Control", "SignCut Compatible", "Adhesive Vinyl"]'::jsonb,
  17,
  true
),
-- 18. Automatic Coil Winding Machine
(
  'automatic-coil-winding-machine',
  'Automatic Coil Winding Machine',
  'Automatic digital counter coil winding machine for transformers & custom inductors.',
  'Precision motorized coil winding unit with digital turn counter for winding custom inductors, high-frequency transformers, solenoid actuators, and motor stators.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Electrical & Motor Prototyping", "Digital Turn Counter", "Motorized Spindle", "Custom Coils"]'::jsonb,
  18,
  true
),
-- 19. Portable Heavy-Duty MIG Welder Unit
(
  'portable-mig-welder-unit',
  'Portable Heavy-Duty MIG Welding Unit',
  'Compact heavy-duty MIG welding system with external wire spool feeder.',
  'Mobile MIG welding cart setup engineered for flexible on-site prototype frame modification, structural repairs, and metal prototyping.',
  '/src/assets/navrachna_images/spaces/mig_welding.jpg',
  '["Fabrication & Metalwork", "Mobile Cart Mount", "External Wire Spool", "Argon Gas"]'::jsonb,
  19,
  true
),
-- 20. High-Speed Benchtop PCB Drilling Machine
(
  'high-speed-pcb-drilling-machine',
  'High-Speed Benchtop PCB Drilling Machine',
  'High-speed precision mini benchtop PCB drill press for double-sided PCB via holes.',
  'Compact high-RPM benchtop drill press optimized for drilling clean, burr-free via holes and component pin holes in FR4 PCB copper laminate boards.',
  '/src/assets/navrachna_images/spaces/laser_cutting.jpg',
  '["Electronics & PCB Prototyping", "High-RPM Spindle", "Carbide Drill Bits", "Precision Depth"]'::jsonb,
  20,
  true
),
-- 21. Heavy-Duty Pillar Drilling Machine
(
  'heavy-duty-pillar-drill-machine',
  'Heavy-Duty Pillar Drilling Machine',
  'Floor-standing pillar drill press machine with tilt table for thick metal drilling.',
  'Industrial floor-standing pillar drill press with multi-speed belt pulley drive and rotating table for heavy mechanical hole drilling.',
  '/src/assets/navrachna_images/spaces/mig_welding.jpg',
  '["Fabrication & Metalwork", "Floor-Standing Pillar", "Multi-Speed Pulley", "Tilting Worktable"]'::jsonb,
  21,
  true
),
-- 22. MATLAB Simulation Suite
(
  'matlab-simulation-suite',
  'MATLAB & Simulink Campus Software Suite',
  'MathWorks MATLAB & Simulink suite for numerical computing, control design & AI simulation.',
  'Comprehensive MATLAB & Simulink campus license covering Signal Processing Toolbox, Control System Toolbox, Deep Learning Toolbox, and Simscape physical modeling.',
  '/src/assets/navrachna_images/spaces/design_system.jpg',
  '["Software & Academic Licenses", "MathWorks Campus License", "Simulink Physical Modeling", "AI/DSP Toolboxes"]'::jsonb,
  22,
  true
),
-- 23. OrCAD Cadence PCB Suite
(
  'cadence-orcad-pcb-suite',
  'OrCAD Cadence PCB EDA Solutions',
  'Cadence OrCAD Allegro PCB schematic capture, PSpice simulation & PCB layout suite.',
  'Professional electronic design automation (EDA) software suite for circuit schematic capture, PSpice analog/digital circuit simulation, and multi-layer PCB layout design.',
  '/src/assets/navrachna_images/spaces/design_system.jpg',
  '["Software & Academic Licenses", "Cadence OrCAD Capture", "PSpice Circuit Simulator", "Allegro Layout"]'::jsonb,
  23,
  true
),
-- 24. Rockwell Automation Suite
(
  'rockwell-automation-suite',
  'Rockwell Industrial Automation & SCADA Suite',
  'Rockwell Automation Studio 5000 & FactoryTalk suite for PLC programming & SCADA simulation.',
  'Industrial automation software platform for Programmable Logic Controller (PLC) ladder logic development, HMI screen design, and SCADA process control simulation.',
  '/src/assets/navrachna_images/spaces/design_system.jpg',
  '["Software & Academic Licenses", "Studio 5000 Logix Designer", "FactoryTalk SCADA", "PLC Ladder Programming"]'::jsonb,
  24,
  true
),
-- 25. Intel Unnati AI Lab Suite
(
  'intel-unnati-ai-lab-suite',
  'Intel Unnati Artificial Intelligence Lab Suite',
  'Intel Unnati Data-Centric AI/ML Emerging Technologies Lab Suite.',
  'Official Intel Unnati AI lab platform pre-installed with Intel OpenVINO Toolkit, Intel AI Analytics Toolkit, and python AI libraries optimized for Intel hardware acceleration.',
  '/src/assets/navrachna_images/spaces/design_system.jpg',
  '["Software & Academic Licenses", "Intel OpenVINO Toolkit", "Intel oneAPI AI Analytics", "Computer Vision"]'::jsonb,
  25,
  true
),
-- 26. SMC Pneumatics Suite
(
  'smc-pneumatics-automation-suite',
  'SMC Pneumatics & Electropneumatics Suite',
  'SMC AutoSim Pneumatics & electropneumatic circuit design & PLC simulation software.',
  'Pneumatic system simulation software suite for designing, testing, and simulating fluid power, pneumatic actuators, solenoid valves, and electropneumatic PLC control circuits.',
  '/src/assets/navrachna_images/spaces/design_system.jpg',
  '["Software & Academic Licenses", "SMC AutoSim Pneumatics", "Electropneumatic Logic", "PLC I/O Interface"]'::jsonb,
  26,
  true
),
-- 27. National Instruments LabVIEW Suite
(
  'national-instruments-labview-suite',
  'National Instruments (NI) LabVIEW Suite',
  'NI LabVIEW graphical programming & virtual instrumentation software suite with DAQ drivers.',
  'Industry-standard graphical development environment for automated test systems, sensor data acquisition (DAQ), instrument control, and industrial monitoring.',
  '/src/assets/navrachna_images/spaces/design_system.jpg',
  '["Software & Academic Licenses", "NI LabVIEW Graphical IDE", "DAQmx Hardware Drivers", "Virtual Instrumentation"]'::jsonb,
  27,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  cover_image_url = EXCLUDED.cover_image_url,
  specs_summary = EXCLUDED.specs_summary,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

COMMIT;
