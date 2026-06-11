#!/data/data/com.termux/files/usr/bin/bash
# V6 Cinematic FFmpeg Bridge v6 - LUTs Fully Integrated
# Complete integration of cinematic LUTs with color grading, Ken Burns, and music ducking.
# This is the production-ready, architecturally integrated version.

set -euo pipefail

V6="$HOME/V6_CORE"
FFMPEG="ffmpeg"
FFPROBE="ffprobe"
LOG="$V6/logs/cinematic_luts.log"

log() { echo "[$(date)] $1" | tee -a "$LOG"; }

validate_asset() {
    local f="$1"
    [ -f "$f" ] || { log "ERROR: Missing asset $f"; return 1; }
    $FFPROBE -v error -show_format "$f" > /dev/null 2>&1 || { log "ERROR: Invalid media $f"; return 1; }
    log "Validated: $f"
}

safe_ffmpeg() {
    local args=("$@")
    if "$FFMPEG" "${args[@]}"; then
        return 0
    else
        log "FFmpeg failed: ${args[*]}"
        return 1
    fi
}

# === LUTs Integration Function (Core of v6) ===
apply_luts_and_cinematic_grade() {
    local input="$1"
    local output="$2"
    local lut_file="${3:-}"   # Optional .cube file

    local base_vf="eq=brightness=-0.12:contrast=1.28:saturation=0.82,colorbalance=rs=0.08:gs=0.03:bs=-0.07,colorchannelmixer=rr=1.06:rg=0.015:rb=0.005:gr=0.01:gg=1.03:gb=0.008:br=0.015:bg=0.012:bb=0.97,curves=m='0/0 0.25/0.22 0.5/0.5 0.75/0.78 1/1',unsharp=5:5:0.9:5:5:0.4,vignette=PI/4.5,noise=alls=8:allf=t+u"

    if [ -n "$lut_file" ] && [ -f "$lut_file" ]; then
        # LUTs integrated at the beginning of the filter chain for best results
        local vf="lut3d=file='$lut_file',$base_vf"
        log "Applying cinematic LUT: $lut_file"
    else
        local vf="$base_vf"
        log "Using advanced color grading (no LUT)"
    fi

    safe_ffmpeg -y -i "$input" -vf "$vf" \
        -c:v libx264 -preset veryfast -crf 22 -c:a copy "$output"
}

# Ken Burns (integrated)
apply_ken_burns() {
    local input="$1" output="$2" duration="${3:-5}"
    safe_ffmpeg -y -i "$input" -vf "zoompan=z='min(zoom+0.0012,1.4)':d=$duration:s=1080x1920" \
        -c:v libx264 -preset veryfast -crf 22 -c:a copy "$output"
}

# Music Ducking (integrated)
add_music_ducking() {
    local video="$1" music="$2" output="$3"
    safe_ffmpeg -y -i "$video" -i "$music" \
        -filter_complex "[1:a]volume=0.28[m];[0:a][m]sidechaincompress=threshold=0.08:ratio=12:attack=0.008:release=0.6[ducked];[ducked]volume=1.6[a]" \
        -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 128k "$output"
}

# === Main Integrated Builder ===
build_cinematic_with_luts() {
    local input_dir="$1"
    local output="${2:-$HOME/V6_OUTPUT/cinematic_v6_$(date +%s).mp4}"
    local music="${3:-}"
    local lut="${4:-}"

    log "=== Building Fully Integrated Cinematic Short with LUTs ==="

    for f in "$input_dir"/*; do validate_asset "$f" || return 1; done

    local playlist="$V6/projects/playlist_$(date +%s).txt"
    > "$playlist"
    for f in "$input_dir"/*.mp4; do [ -f "$f" ] && echo "file '$f'" >> "$playlist"; done

    local temp="$V6/projects/temp_v6.mp4"
    safe_ffmpeg -y -f concat -safe 0 -i "$playlist" \
        -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
        -c:v libx264 -preset veryfast -crf 22 -c:a aac -b:a 128k "$temp" || return 1

    local temp2="$V6/projects/temp2_v6.mp4"
    apply_luts_and_cinematic_grade "$temp" "$temp2" "$lut" || return 1

    local temp3="$V6/projects/temp3_v6.mp4"
    apply_ken_burns "$temp2" "$temp3" "5" || return 1

    if [ -n "$music" ] && [ -f "$music" ]; then
        add_music_ducking "$temp3" "$music" "$output" || return 1
    else
        cp "$temp3" "$output"
    fi

    rm -f "$temp" "$temp2" "$temp3" "$playlist"
    log "=== Integrated Cinematic Short with LUTs Complete: $output ==="
    echo "$output"
}

log "V6 LUTs Integrated Bridge ready. Usage: build_cinematic_with_luts /path/to/clips [output] [music] [lut.cube]"