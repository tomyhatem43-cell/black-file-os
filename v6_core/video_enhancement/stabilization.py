# V6 CORE - Video Stabilization Module

import subprocess

def stabilize_video(input_path, output_path):
    # First pass: detect motion
    subprocess.run([
        'ffmpeg', '-i', input_path,
        '-vf', 'vidstabdetect=shakiness=5:accuracy=15',
        '-f', 'null', '-'
    ], check=True)

    # Second pass: apply stabilization
    subprocess.run([
        'ffmpeg', '-i', input_path,
        '-vf', 'vidstabtransform=smoothing=30',
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22',
        output_path
    ], check=True)
    print(f"Stabilized video saved to: {output_path}")