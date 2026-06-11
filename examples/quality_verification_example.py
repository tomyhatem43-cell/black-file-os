# مثال تطبيقي: Automated Quality Verification
import subprocess

def check_video_quality(video_path):
    print(f"Checking quality of: {video_path}")
    
    # Technical check with ffprobe
    result = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_format', '-show_streams', video_path],
        capture_output=True, text=True
    )
    print("Technical Info:")
    print(result.stdout)
    
    # Simple VMAF placeholder (requires model file)
    print("Note: For full VMAF, use: ffmpeg -i reference.mp4 -i distorted.mp4 -lavfi libvmaf ...")

if __name__ == "__main__":
    check_video_quality("~/V6_OUTPUT/final_output.mp4")