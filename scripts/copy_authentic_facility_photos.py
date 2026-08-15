import os
import shutil

src_dept_dir = "/home/anubhavtripathi/Documents/Projects/NFED Project/Navrachnawebsite/Newgen_Video's & Photo's/NewGen Department Pic"
out_dir = "/home/anubhavtripathi/Documents/Projects/NFED Project/Navrachnawebsite/src/assets/navrachna_images/facilities"

os.makedirs(out_dir, exist_ok=True)

# Direct photo files from user's NewGen Department Pic folder
photo_map = {
    'pla-fdm-3d-printer.png': 'PLA 3D Printing Machine.jpeg',
    'deep-freezer-cabinet.png': 'Deep Fizeer.jpeg',
    'vacuum-drying-oven.png': 'Vacuum Oven.jpeg',
    'high-end-ai-gpu-workstations.png': 'Designing system.JPG',
    'cnc-plasma-cutting-machine.png': 'Plasma Cutting Machine.JPG',
    'co2-laser-cutting-machine.png': 'Laser Cutting Machinr.JPG',
    'mig-welding-machine.png': 'MIG Welding Machine.jpeg',
    'arc-welding-machine.png': 'ARC Welding.jpeg',
    'heavy-duty-chop-saw.png': 'Chop Saw.jpeg',
    'vinyl-cutting-plotter.png': 'Vinyl Cutter & Plotter.jpeg',
    'automatic-coil-winding-machine.png': 'winding Maching.JPG',
    'portable-mig-welder-unit.png': 'MIG Welding 2.jpeg',
    'heavy-duty-pillar-drill-machine.png': 'Pillar Drilling Machine.jpeg',
}

for target_filename, source_filename in photo_map.items():
    src_path = os.path.join(src_dept_dir, source_filename)
    dst_path = os.path.join(out_dir, target_filename)
    
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"✅ Copied authentic photo: {source_filename} -> {target_filename}")
    else:
        print(f"⚠️ Source file not found: {source_filename}")

print("\n🎉 Original authentic department photos copied successfully!")
