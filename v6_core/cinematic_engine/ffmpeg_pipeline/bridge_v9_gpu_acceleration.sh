#!/data/data/com.termux/files/usr/bin/bash
# V6 Cinematic FFmpeg Bridge v9 - GPU/Hardware Acceleration Support
# Adds automatic detection and use of hardware acceleration when available.

set -euo pipefail

V6="$HOME/V6_CORE"
FFMPEG="ffmpeg"

log() { echo "[$(date)] $1" | tee -a "$V6/logs/gpu_acceleration.log"; }

# Detect best available encoder
default_encoder() {
    if ffmpeg -encoders 2>/dev/null | grep -q "h264_mediacodec"; then
        echo "h264_mediacodec"
    else
        echo "libx264"
    fi
}

ENCODER=$(default_encoder)
log "Using encoder: $ENCODER"

# Modified build function with hardware acceleration
build_with_gpu_acceleration() {
    local input_dir="$1"
    local output="${2:-$HOME/V6_OUTPUT/gpu_accelerated_$(date +%s).mp4}"
    
    # ... (same as previous bridges but with $ENCODER)
    
    ffmpeg -y -f concat ... -c:v $ENCODER -preset veryfast -crf 22 ...
}

log "V9 GPU Acceleration Bridge ready. Encoder: $ENCODER"