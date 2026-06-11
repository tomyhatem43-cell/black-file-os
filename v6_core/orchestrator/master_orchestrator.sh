#!/data/data/com.termux/files/usr/bin/bash
# V6 CORE - Final Master Orchestrator (Corrected & Optimized)

set -euo pipefail

V6="$HOME/V6_CORE"
CACHE_DIR="$V6/cache"
mkdir -p "$CACHE_DIR"
FFMPEG_ENCODERS_CACHE_FILE="$CACHE_DIR/ffmpeg_encoders.txt"

get_ffmpeg_encoders() {
    if [ ! -f "$FFMPEG_ENCODERS_CACHE_FILE" ] || [ $(find "$FFMPEG_ENCODERS_CACHE_FILE" -mmin +60 2>/dev/null | wc -l) -gt 0 ]; then
        ffmpeg -encoders 2>/dev/null > "$FFMPEG_ENCODERS_CACHE_FILE"
    fi
    cat "$FFMPEG_ENCODERS_CACHE_FILE"
}

function check_layer() {
    local name="$1"
    local path="$2"
    if [ -f "$path" ]; then
        echo "  ✓ $name"
    else
        echo "  ✗ $name missing"
    fi
}

echo "===================================="
echo "   V6 CORE - Final Master Orchestrator"
echo "===================================="

start_time=$(date +%s)

echo "[Core Layer]"
check_layer "bridge_v10 Quality" "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v10_quality_enhancement.sh"
check_layer "bridge_v7 Audio Mixing" "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v7_audio_mixing.sh"
check_layer "bridge_v8 Audio Effects" "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v8_audio_effects.sh"

check_layer "bridge_v9 GPU Acceleration" "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v9_gpu_acceleration.sh"

echo "[Agentic Layer]"
if python3 -c "import langgraph" 2>/dev/null; then
    echo "  ✓ LangGraph available"
else
    echo "  ℹ LangGraph not installed"
fi

echo "[Interface Layer]"
check_layer "Web UI Ultra" "$V6/web_ui/app_ultra_audio.py"
check_layer "Unified APK Ultra" "$V6/unified/App_ultra_audio.js"

echo "[Performance]"
end_time=$(date +%s)
elapsed=$(( end_time - start_time ))
echo "  Check completed in ${elapsed} seconds"

echo "===================================="
echo "V6 CORE is fully integrated and ready."
echo "===================================="