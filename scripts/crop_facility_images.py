import os
from PIL import Image

# Ensure output folder exists
out_dir = '/home/anubhavtripathi/Documents/Projects/NFED Project/Navrachnawebsite/src/assets/navrachna_images/facilities'
os.makedirs(out_dir, exist_ok=True)

p1 = '/home/anubhavtripathi/.gemini/antigravity-ide/brain/6718d8ac-5adb-4fd5-9915-ff68adc0c4f4/media__1786696571049.png'
p2 = '/home/anubhavtripathi/.gemini/antigravity-ide/brain/6718d8ac-5adb-4fd5-9915-ff68adc0c4f4/media__1786696581102.png'
p3 = '/home/anubhavtripathi/.gemini/antigravity-ide/brain/6718d8ac-5adb-4fd5-9915-ff68adc0c4f4/media__1786696592791.png'

img1 = Image.open(p1)
img2 = Image.open(p2)
img3 = Image.open(p3)

crops = [
    # --- SHEET 1 ---
    (img1, (10, 15, 175, 210), 'formlabs-sla-3d-printer.png'),
    (img1, (175, 15, 310, 210), 'pla-fdm-3d-printer.png'),
    (img1, (310, 15, 455, 210), 'smd-rework-station.png'),
    (img1, (455, 15, 600, 140), 'dc-regulated-power-supply.png'),
    (img1, (600, 15, 765, 140), 'digital-storage-oscilloscope.png'),
    (img1, (455, 140, 600, 260), 'arbitrary-waveform-generator.png'),
    (img1, (600, 140, 765, 260), 'digital-benchtop-multimeter.png'),
    (img1, (10, 210, 170, 420), 'deep-freezer-cabinet.png'),
    (img1, (170, 210, 310, 420), 'vacuum-drying-oven.png'),
    (img1, (310, 210, 455, 420), 'electronics-assembly-lab.png'),
    (img1, (455, 260, 765, 420), 'high-end-ai-gpu-workstations.png'),

    # --- SHEET 2 ---
    (img2, (10, 10, 185, 200), 'cnc-plasma-cutting-machine.png'),
    (img2, (185, 10, 370, 200), 'co2-laser-cutting-machine.png'),
    (img2, (370, 10, 525, 200), 'mig-welding-machine.png'),
    (img2, (525, 10, 650, 200), 'arc-welding-machine.png'),
    (img2, (650, 10, 775, 200), 'heavy-duty-chop-saw.png'),
    (img2, (10, 200, 185, 400), 'vinyl-cutting-plotter.png'),
    (img2, (185, 200, 370, 400), 'automatic-coil-winding-machine.png'),
    (img2, (370, 200, 525, 400), 'portable-mig-welder-unit.png'),
    (img2, (525, 200, 650, 400), 'high-speed-pcb-drilling-machine.png'),
    (img2, (650, 200, 775, 400), 'heavy-duty-pillar-drill-machine.png'),

    # --- SHEET 3 ---
    (img3, (15, 60, 385, 185), 'matlab-simulation-suite.png'),
    (img3, (385, 60, 765, 185), 'cadence-orcad-pcb-suite.png'),
    (img3, (15, 185, 385, 305), 'rockwell-automation-suite.png'),
    (img3, (385, 185, 765, 305), 'intel-unnati-ai-lab-suite.png'),
    (img3, (15, 305, 385, 435), 'smc-pneumatics-automation-suite.png'),
    (img3, (385, 305, 765, 435), 'national-instruments-labview-suite.png')
]

for src_img, box, fname in crops:
    cropped = src_img.crop(box)
    out_path = os.path.join(out_dir, fname)
    cropped.save(out_path)
    print(f"Saved: {fname}")

print("\n🎉 All 27 facility cropped images created successfully!")
