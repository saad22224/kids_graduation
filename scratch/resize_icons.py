from PIL import Image
import os

input_path = r'c:\laragon\www\kids_graduation\assets\logo.jpg'
output_192 = r'c:\laragon\www\kids_graduation\icon-192.png'
output_512 = r'c:\laragon\www\kids_graduation\icon-512.png'

if os.path.exists(input_path):
    with Image.open(input_path) as img:
        # Create 192x192
        img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
        img_192.save(output_192, 'PNG')
        print(f"Created {output_192}")
        
        # Create 512x512
        img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
        img_512.save(output_512, 'PNG')
        print(f"Created {output_512}")
else:
    print(f"Error: {input_path} not found")
