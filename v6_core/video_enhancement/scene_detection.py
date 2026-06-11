# V6 CORE - Scene Detection Module (Exploration)
import subprocess
import os

def detect_scenes(video_path, threshold=0.3):
    cmd = [
        'ffmpeg', '-i', video_path,
        '-vf', f"select='gt(scene,{threshold})',showinfo",
        '-f', 'null', '-'
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    # Parse output to extract scene change timestamps
    print("Scene detection completed.")
    return result.stdout

if __name__ == "__main__":
    detect_scenes("input.mp4")