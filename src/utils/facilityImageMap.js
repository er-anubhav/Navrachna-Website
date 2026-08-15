import imgFormlabsSla from '../assets/navrachna_images/facilities/formlabs-sla-3d-printer.png'
import imgPlaFdm from '../assets/navrachna_images/facilities/pla-fdm-3d-printer.png'
import imgSmdRework from '../assets/navrachna_images/facilities/smd-rework-station.png'
import imgDcPower from '../assets/navrachna_images/facilities/dc-regulated-power-supply.png'
import imgDso from '../assets/navrachna_images/facilities/digital-storage-oscilloscope.png'
import imgWaveformGen from '../assets/navrachna_images/facilities/arbitrary-waveform-generator.png'
import imgMultimeter from '../assets/navrachna_images/facilities/digital-benchtop-multimeter.png'
import imgDeepFreezer from '../assets/navrachna_images/facilities/deep-freezer-cabinet.png'
import imgVacuumOven from '../assets/navrachna_images/facilities/vacuum-drying-oven.png'
import imgElecBench from '../assets/navrachna_images/facilities/electronics-assembly-lab.png'
import imgGpuCluster from '../assets/navrachna_images/facilities/high-end-ai-gpu-workstations.png'

import imgPlasmaCutter from '../assets/navrachna_images/facilities/cnc-plasma-cutting-machine.png'
import imgLaserCutter from '../assets/navrachna_images/facilities/co2-laser-cutting-machine.png'
import imgMigWelder from '../assets/navrachna_images/facilities/mig-welding-machine.png'
import imgArcWelder from '../assets/navrachna_images/facilities/arc-welding-machine.png'
import imgChopSaw from '../assets/navrachna_images/facilities/heavy-duty-chop-saw.png'
import imgVinylPlotter from '../assets/navrachna_images/facilities/vinyl-cutting-plotter.png'
import imgCoilWinder from '../assets/navrachna_images/facilities/automatic-coil-winding-machine.png'
import imgPortableMig from '../assets/navrachna_images/facilities/portable-mig-welder-unit.png'
import imgPcbDrill from '../assets/navrachna_images/facilities/high-speed-pcb-drilling-machine.png'
import imgPillarDrill from '../assets/navrachna_images/facilities/heavy-duty-pillar-drill-machine.png'

import imgMatlab from '../assets/navrachna_images/facilities/matlab-simulation-suite.png'
import imgOrCad from '../assets/navrachna_images/facilities/cadence-orcad-pcb-suite.png'
import imgRockwell from '../assets/navrachna_images/facilities/rockwell-automation-suite.png'
import imgIntelUnnati from '../assets/navrachna_images/facilities/intel-unnati-ai-lab-suite.png'
import imgSmc from '../assets/navrachna_images/facilities/smc-pneumatics-automation-suite.png'
import imgLabView from '../assets/navrachna_images/facilities/national-instruments-labview-suite.png'

export const facilityImageMap = {
  'formlabs-sla-3d-printer': imgFormlabsSla,
  'pla-fdm-3d-printer': imgPlaFdm,
  'smd-rework-station': imgSmdRework,
  'dc-regulated-power-supply': imgDcPower,
  'digital-storage-oscilloscope': imgDso,
  'arbitrary-waveform-generator': imgWaveformGen,
  'digital-benchtop-multimeter': imgMultimeter,
  'deep-freezer-cabinet': imgDeepFreezer,
  'vacuum-drying-oven': imgVacuumOven,
  'electronics-assembly-lab': imgElecBench,
  'high-end-ai-gpu-workstations': imgGpuCluster,

  'cnc-plasma-cutting-machine': imgPlasmaCutter,
  'co2-laser-cutting-machine': imgLaserCutter,
  'mig-welding-machine': imgMigWelder,
  'arc-welding-machine': imgArcWelder,
  'heavy-duty-chop-saw': imgChopSaw,
  'vinyl-cutting-plotter': imgVinylPlotter,
  'automatic-coil-winding-machine': imgCoilWinder,
  'portable-mig-welder-unit': imgPortableMig,
  'high-speed-pcb-drilling-machine': imgPcbDrill,
  'heavy-duty-pillar-drill-machine': imgPillarDrill,

  'matlab-simulation-suite': imgMatlab,
  'cadence-orcad-pcb-suite': imgOrCad,
  'rockwell-automation-suite': imgRockwell,
  'intel-unnati-ai-lab-suite': imgIntelUnnati,
  'smc-pneumatics-automation-suite': imgSmc,
  'national-instruments-labview-suite': imgLabView,
}

export function getFacilityImage(facility) {
  if (!facility) return imgLaserCutter

  // 1. Custom uploaded image (Base64 data URL or HTTP Supabase Storage URL) from /admin/facilities
  if (
    facility.cover_image_url && 
    (facility.cover_image_url.startsWith('data:image') || 
     facility.cover_image_url.startsWith('http://') || 
     facility.cover_image_url.startsWith('https://'))
  ) {
    return facility.cover_image_url
  }

  // 2. High-resolution local image asset mapping by slug
  if (facility.slug && facilityImageMap[facility.slug]) {
    return facilityImageMap[facility.slug]
  }

  // 3. Fallback to stored cover_image_url if present
  if (facility.cover_image_url && facility.cover_image_url.trim() !== '') {
    return facility.cover_image_url
  }

  return imgLaserCutter
}
