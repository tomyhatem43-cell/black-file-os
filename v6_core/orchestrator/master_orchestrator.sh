#!/data/data/com.termux/files/usr/bin/bash
# V6 CORE - Master Orchestrator (Performance Optimized)
# Improved performance with caching and efficient checks.

set -euo pipefail

V6="$HOME/V6_CORE"

# Cache expensive checks
FFMPEG_ENCODERS_CACHE=""

get_ffmpeg_encoders() {
    if [ -z "$FFMPEG_ENCODERS_CACHE" ]; then
        FFMPEG_ENCODERS_CACHE=$(ffmpeg -encoders 2>/dev/null || true)
    fi
    echo "$FFMPEG_ENCODERS_CACHE"
}

echo "===================================="
echo "   V6 CORE Master Orchestrator (Optimized)"
echo "===================================="

start_time=$(date +%s)

echo "[1/5] Checking Core Cinematic Components..."

if [ -f "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v10_quality_enhancement.sh" ]; then
    echo "  ✓ bridge_v10_quality_enhancement.sh"
else
    echo "  ✗ bridge_v10_quality_enhancement.sh missing"
fi

if [ -f "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v7_audio_mixing.sh" ]; then
    echo "  ✓ bridge_v7_audio_mixing.sh"
else
    echo "  ✗ bridge_v7_audio_mixing.sh missing"
fi

if [ -f "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v8_audio_effects.sh" ]; then
    echo "  ✓ bridge_v8_audio_effects.sh"
else
    echo "  ✗ bridge_v8_audio_effects.sh missing"
fi

echo "[2/5] Checking GPU/Hardware Acceleration..."
if echo "$(get_ffmpeg_encoders)" | grep -q "h264_mediacodec"; then
    echo "  ✓ h264_mediacodec (GPU Acceleration) available"
else
    echo "  ℹ h264_mediacodec not detected (software mode)"
fi

echo "[3/5] Checking Python Agent Layer..."
if python3 -c "import langgraph" 2>/dev/null; then
    echo "  ✓ LangGraph available"
else
    echo "  ℹ LangGraph not installed (optional)"
fi

echo "[4/5] Checking Interface Components..."
if [ -f "$V6/web_ui/app_ultra_audio.py" ]; then
    echo "  ✓ Web UI Ultra available"
else
    echo "  ✗ Web UI Ultra missing"
fi

if [ -f "$V6/unified/App_ultra_audio.js" ]; then
    echo "  ✓ Unified APK Ultra available"
else
    echo "  ✗ Unified APK Ultra missing"
fi

echo "[5/5] Performance Summary..."
end_time=$(date +%s)
elapsed=$(( end_time - start_time ))
echo "  Total check time: ${elapsed} seconds"

echo "===================================="
echo "V6 CORE is ready."
echo "Run your preferred bridge or UI to start."
echo "===================================="