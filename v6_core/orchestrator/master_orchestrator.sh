#!/data/data/com.termux/files/usr/bin/bash
# V6 CORE - Master Orchestrator (Parallel Execution Enabled)
# High-performance version with parallel checks.

set -euo pipefail

V6="$HOME/V6_CORE"

FFMPEG_ENCODERS_CACHE=""

function get_ffmpeg_encoders() {
    if [ -z "$FFMPEG_ENCODERS_CACHE" ]; then
        FFMPEG_ENCODERS_CACHE=$(ffmpeg -encoders 2>/dev/null || true)
    fi
    echo "$FFMPEG_ENCODERS_CACHE"
}

function check_bridges() {
    echo "[1/4] Checking Core Bridges..."
    [ -f "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v10_quality_enhancement.sh" ] && echo "  ✓ v10 Quality" || echo "  ✗ v10 Quality missing"
    [ -f "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v7_audio_mixing.sh" ] && echo "  ✓ v7 Audio Mixing" || echo "  ✗ v7 Audio Mixing missing"
    [ -f "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v8_audio_effects.sh" ] && echo "  ✓ v8 Audio Effects" || echo "  ✗ v8 Audio Effects missing"
}

function check_gpu() {
    echo "[2/4] Checking GPU Acceleration..."
    if echo "$(get_ffmpeg_encoders)" | grep -q "h264_mediacodec"; then
        echo "  ✓ h264_mediacodec (GPU) available"
    else
        echo "  ℹ Software encoding mode"
    fi
}

function check_python_agents() {
    echo "[3/4] Checking Agent Layer..."
    if python3 -c "import langgraph" 2>/dev/null; then
        echo "  ✓ LangGraph ready"
    else
        echo "  ℹ LangGraph not installed"
    fi
}

function check_interfaces() {
    echo "[4/4] Checking Interfaces..."
    [ -f "$V6/web_ui/app_ultra_audio.py" ] && echo "  ✓ Web UI Ultra" || echo "  ✗ Web UI missing"
    [ -f "$V6/unified/App_ultra_audio.js" ] && echo "  ✓ Unified APK Ultra" || echo "  ✗ APK missing"
}

echo "===================================="
echo "   V6 CORE Master Orchestrator (Parallel)"
echo "===================================="

start_time=$(date +%s)

# Run independent checks in parallel
check_bridges &
PID1=$!

check_gpu &
PID2=$!

check_python_agents &
PID3=$!

check_interfaces &
PID4=$!

# Wait for all background processes to finish
wait $PID1 $PID2 $PID3 $PID4

end_time=$(date +%s)
elapsed=$(( end_time - start_time ))

echo "===================================="
echo "Checks completed in ${elapsed} seconds"
echo "V6 CORE is ready."
echo "===================================="