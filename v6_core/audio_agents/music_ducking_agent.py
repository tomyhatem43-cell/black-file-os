# Advanced Music Ducking Agent (Highest Quality)
import subprocess

def duck_music(video_path, music_path, output_path):
    filter_complex = (
        "[0:a]highpass=f=80,lowpass=f=12000,compand=attacks=0.01:decays=0.2:points=-80/-80|-20/-20|0/-15|20/-15[voice];"
        "[1:a]volume=0.32,lowpass=f=8000[music];"
        "[voice][music]sidechaincompress=threshold=0.05:ratio=16:attack=0.004:release=0.7:makeup=1.3[ducked];"
        "[ducked]loudnorm=I=-16:TP=-1.5:LRA=11[audio]"
    )
    cmd = [
        'ffmpeg', '-y', '-i', video_path, '-i', music_path,
        '-filter_complex', filter_complex,
        '-map', '0:v', '-map', '[audio]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', output_path
    ]
    subprocess.run(cmd, check=True)
    print(f"[MusicDuckingAgent] Processed: {output_path}")