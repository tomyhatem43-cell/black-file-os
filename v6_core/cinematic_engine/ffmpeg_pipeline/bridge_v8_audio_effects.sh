#!/data/data/com.termux/files/usr/bin/bash
# V6 Cinematic FFmpeg Bridge v8 - Additional Audio Effects
# Extended cinematic audio effects integrated with v7 pipeline.

set -euo pipefail

V6="$HOME/V6_CORE"
FFMPEG="ffmpeg"

log() { echo "[$(date)] $1" | tee -a "$V6/logs/audio_effects.log"; }

safe_ffmpeg() {
    "$FFMPEG" "$@" || { log "FFmpeg failed"; return 1; }
}

# === Additional Cinematic Audio Effects ===

# 1. Cinematic Reverb (Enhanced)
apply_cinematic_reverb() {
    local input="$1" output="$2"
    safe_ffmpeg -y -i "$input" \
        -af "aecho=0.8:0.88:1200:0.4, stereotools=mlev=0.7:slev=0.5" \
        -c:a aac -b:a 128k "$output"
}

# 2. Ethereal Delay / Echo
apply_delay_effect() {
    local input="$1" output="$2"
    safe_ffmpeg -y -i "$input" \
        -af "adelay=500|600, aecho=0.6:0.7:800:0.5" \
        -c:a aac -b:a 128k "$output"
}

# 3. Stereo Widening (for immersive feel)
apply_stereo_widen() {
    local input="$1" output="$2"
    safe_ffmpeg -y -i "$input" \
        -af "stereotools=mode=ms:ms_balance=0.3" \
        -c:a aac -b:a 128k "$output"
}

# 4. Subtle Saturation / Warmth (cinematic grit)
apply_saturation() {
    local input="$1" output="$2"
    safe_ffmpeg -y -i "$input" \
        -af "acompressor=threshold=-20:ratio=3:attack=0.01:release=0.2, aformat=sample_fmts=fltp" \
        -c:a aac -b:a 128k "$output"
}

# 5. Dynamic EQ (reduces muddiness)
apply_dynamic_eq() {
    local input="$1" output="$2"
    safe_ffmpeg -y -i "$input" \
        -af "afftdn=nf=-30, highpass=f=60" \
        -c:a aac -b:a 128k "$output"
}

# === Combined Effects Chain ===
apply_full_cinematic_audio_effects() {
    local input="$1" output="$2"
    
    # Chain multiple effects for rich cinematic sound
    local temp1="$V6/projects/temp_audio1.m4a"
    local temp2="$V6/projects/temp_audio2.m4a"
    local temp3="$V6/projects/temp_audio3.m4a"

    apply_cinematic_reverb "$input" "$temp1"
    apply_stereo_widen "$temp1" "$temp2"
    apply_saturation "$temp2" "$temp3"
    apply_dynamic_eq "$temp3" "$output"

    rm -f "$temp1" "$temp2" "$temp3"
}

log "V8 Additional Audio Effects ready. Functions: apply_cinematic_reverb, apply_delay_effect, apply_stereo_widen, apply_saturation, apply_dynamic_eq, apply_full_cinematic_audio_effects"