#!/data/data/com.termux/files/usr/bin/bash
# V6 CORE - TERMUX FULL DIAGNOSTIC v2 (Clean & Tested)
# This script collects complete information about your Termux environment.
# Run it exactly as instructed. Do not modify this file.

set -euo pipefail

OUTPUT_FILE="$HOME/V6_TERMUX_DIAGNOSTIC_$(date +%Y%m%d_%H%M%S).txt"

{
echo "=== V6 CORE TERMUX FULL DIAGNOSTIC v2 ==="
echo "Generated: $(date)"
echo "User: $USER"
echo "Home: $HOME"
echo ""

echo "=== 1. TERMUX INFO ==="
termux-info 2>/dev/null || echo "termux-info not available"

echo ""
echo "=== 2. INSTALLED PACKAGES ==="
pkg list-installed 2>/dev/null | head -80 || echo "pkg list-installed failed"

echo ""
echo "=== 3. PYTHON ENVIRONMENT ==="
python3 --version 2>/dev/null || echo "python3 not found"
pip3 list 2>/dev/null | head -40 || echo "pip3 not available"

echo ""
echo "=== 4. FFMPEG STATUS ==="
ffmpeg -version 2>/dev/null | head -4 || echo "ffmpeg not found"
which ffprobe ffplay 2>/dev/null || true

echo ""
echo "=== 5. IMPORTANT DIRECTORIES (V6 related) ==="
find "$HOME" -maxdepth 4 -type d \( -name "*V6*" -o -name "*Black*" -o -name "*Cinematic*" -o -name "*Nebula*" -o -name "*X5*" -o -name "*SUPREME*" -o -name "*Sovereign*" \) 2>/dev/null | head -20 || echo "No matching directories found"

echo ""
echo "=== 6. KEY ENVIRONMENT VARIABLES ==="
env | grep -E '^(PATH|HOME|PREFIX|TERMUX|ANDROID|PYTHON|FFMPEG|GIT|REPLIT|LOVABLE|V6)' | sort || true

echo ""
echo "=== 7. GIT STATUS ==="
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Inside git repo:"
    git status --short 2>/dev/null
    git remote -v 2>/dev/null
else
    echo "Not inside a git repository in current directory"
fi

echo ""
echo "=== 8. STORAGE ACCESS ==="
ls -la /sdcard/ 2>/dev/null | head -5 || echo "No /sdcard access"
termux-setup-storage 2>&1 | tail -1 || true

echo ""
echo "=== 9. PRESENCE OF KEYS/TOKENS (names only, safe) ==="
env | grep -iE '(API_KEY|TOKEN|SECRET|GROK|XAI|REPLIT|LOVABLE|GITHUB|STRIPE)' | cut -d= -f1 || echo "No obvious keys found in environment"

echo ""
echo "=== 10. DISK USAGE ==="
df -h "$HOME" 2>/dev/null || true

echo ""
echo "=== END OF DIAGNOSTIC ==="
echo "File saved to: $OUTPUT_FILE"
} > "$OUTPUT_FILE" 2>&1

echo "✅ Diagnostic completed successfully."
echo "Output file: $OUTPUT_FILE"
echo "Please run: cat $OUTPUT_FILE"
echo "Then copy and paste the entire content here."