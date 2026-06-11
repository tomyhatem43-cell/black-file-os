# Voice Enhancement Agent (Highest Quality)
import subprocess

def process_voice(input_path, output_path):
    cmd = [
        'ffmpeg', '-y', '-i', input_path,
        '-af', 'highpass=f=80,lowpass=f=12000,compand=attacks=0.01:decays=0.2:points=-80/-80|-20/-20|0/-15|20/-15,afftdn=nf=-25,loudnorm=I=-16:TP=-1.5:LRA=11',
        '-c:a', 'aac', '-b:a', '128k', output_path
    ]
    subprocess.run(cmd, check=True)
    print(f"[VoiceEnhancementAgent] Processed: {output_path}")