#!/data/data/com.termux/files/usr/bin/bash
# V6 CORE - GPU Acceleration Enabler
# This script helps enable and test hardware acceleration on your device.

set -euo pipefail

V6="$HOME/V6_CORE"

echo "=== V6 CORE GPU Acceleration Setup ==="

echo "Checking available hardware encoders..."

if ffmpeg -encoders 2>/dev/null | grep -q "h264_mediacodec"; then
    echo "✅ h264_mediacodec is available!"
    echo "You can use hardware acceleration."
    
    # Create a helper alias or function
    echo "
# Add this to your ~/.bashrc or run it to use GPU acceleration by default" >> "$V6/gpu_acceleration.sh"
    echo "export FFMPEG_ENCODER=h264_mediacodec" >> "$V6/gpu_acceleration.sh"
    
    echo "To use GPU acceleration in your scripts, add this line:" 
    echo "  -c:v \\$FFMPEG_ENCODER"
else
    echo "⚠️ h264_mediacodec not found."
    echo "Falling back to software encoding (libx264)."
    echo "For better performance, consider rebuilding FFmpeg with MediaCodec support."
fi

echo ""
echo "To test hardware acceleration, run:" 
echo "  ffmpeg -i input.mp4 -c:v h264_mediacodec -b:v 5M output.mp4"