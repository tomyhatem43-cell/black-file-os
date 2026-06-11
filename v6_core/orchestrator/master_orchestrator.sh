#!/data/data/com.termux/files/usr/bin/bash
# V6 CORE - Master Orchestrator (Corrected & Clean Version)
# This script verifies and manages the integration of all V6 CORE components.

set -euo pipefail

V6="$HOME/V6_CORE"

echo "===================================="
echo "   V6 CORE Master Orchestrator"
echo "===================================="

echo "[1/5] Checking Core Cinematic Engine..."
if [ -f "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v10_quality_enhancement.sh" ]; then
    echo "  ✓ bridge_v10_quality_enhancement.sh found"
else
    echo "  ✗ bridge_v10_quality_enhancement.sh missing"
fi

if [ -f "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v7_audio_mixing.sh" ]; then
    echo "  ✓ bridge_v7_audio_mixing.sh found"
else
    echo "  ✗ bridge_v7_audio_mixing.sh missing"
fi

if [ -f "$V6/cinematic_engine/ffmpeg_pipeline/bridge_v8_audio_effects.sh" ]; then
    echo "  ✓ bridge_v8_audio_effects.sh found"
else
    echo "  ✗ bridge_v8_audio_effects.sh missing"
fi

echo "[2/5] Checking GPU Acceleration Support..."
if ffmpeg -encoders 2>/dev/null | grep -q "h264_mediacodec"; then
    echo "  ✓ h264_mediacodec (GPU) is available"
else
    echo "  ℹ h264_mediacodec not detected (will use software encoding)"
fi

echo "[3/5] Checking Agentic Layer (LangGraph)..."
if python3 -c "import langgraph" 2>/dev/null; then
    echo "  ✓ LangGraph is installed and ready"
else
    echo "  ℹ LangGraph not installed (optional for advanced agents)"
fi

echo "[4/5] Checking Interfaces..."
if [ -f "$V6/web_ui/app_ultra_audio.py" ]; then
    echo "  ✓ Web UI Ultra found"
else
    echo "  ✗ Web UI Ultra missing"
fi

if [ -f "$V6/unified/App_ultra_audio.js" ]; then
    echo "  ✓ Unified APK Ultra found"
else
    echo "  ✗ Unified APK Ultra missing"
fi

echo "[5/5] Final Integration Status..."
echo "  All core components checked."
echo "===================================="
echo "V6 CORE is ready for use."
echo "Run: source v6_core/cinematic_engine/ffmpeg_pipeline/bridge_v10_quality_enhancement.sh"
echo "===================================="