#!/bin/bash
# مثال تطبيقي كامل: End-to-End V6 CORE Pipeline
# يشمل: Visual Enhancement + Audio Mixing + Quality Check

set -euo pipefail

V6="$HOME/V6_CORE"
INPUT_DIR="~/clips"
OUTPUT_DIR="~/V6_OUTPUT"
mkdir -p "$OUTPUT_DIR"

echo "=== V6 CORE End-to-End Pipeline ==="

# 1. Quality Enhancement (v10)
echo "[1/4] Applying Quality Enhancement..."
source "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v10_quality_enhancement.sh"
build_high_quality_short "$INPUT_DIR" "$OUTPUT_DIR/temp_quality.mp4"

# 2. Advanced Audio Mixing (v7 + v8)
echo "[2/4] Applying Advanced Audio Mixing..."
source "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v7_audio_mixing.sh"
source "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v8_audio_effects.sh"
build_cinematic_with_advanced_audio "$INPUT_DIR" "$OUTPUT_DIR/temp_audio.mp4" "~/music/background.mp3" "~/voiceover/narration.m4a"

# 3. GPU Acceleration (if available)
echo "[3/4] Checking for GPU Acceleration..."
if ffmpeg -encoders 2>/dev/null | grep -q "h264_mediacodec"; then
    echo "Using h264_mediacodec (GPU Accelerated)"
    ffmpeg -i "$OUTPUT_DIR/temp_audio.mp4" -c:v h264_mediacodec -b:v 5M -c:a copy "$OUTPUT_DIR/final_output.mp4"
else
    echo "Using software encoding"
    cp "$OUTPUT_DIR/temp_audio.mp4" "$OUTPUT_DIR/final_output.mp4"
fi

# 4. Final Quality Check
echo "[4/4] Performing Final Quality Check..."
ffprobe -v error -show_format -show_streams "$OUTPUT_DIR/final_output.mp4"
echo "=== Pipeline Complete: $OUTPUT_DIR/final_output.mp4 ==="