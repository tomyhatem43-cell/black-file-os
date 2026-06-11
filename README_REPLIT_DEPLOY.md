# Deploy V6 CORE on Replit

## Quick Deploy (Recommended)
1. Go to [Replit](https://replit.com)
2. Click **Create** > **Import from GitHub**
3. Paste: `https://github.com/tomyhatem43-cell/black-file-os`
4. Replit will automatically detect the `.replit` and `replit.nix` files
5. Click **Run** — it will execute the V6 CORE bootstrap

## What Happens on Deploy
- Installs FFmpeg, Python, and dependencies via Nix
- Runs the complete V6 CORE FINAL v3
- Sets up the cinematic AI studio with optimized encoding
- Ready for Termux-style workflows in the cloud

## After Deployment
- Use the `v6` CLI in the Replit shell:
  ```bash
  ~/V6_CORE/v6 health
  ~/V6_CORE/v6 build /path/to/clips
  ```
- The optimized FFmpeg bridge (veryfast + crf 26) is ready for fast Shorts production

## Notes
- This makes the entire V6 CORE cinematic studio available on Replit for rapid prototyping and cloud execution
- Combine with Lovable for visual AI prototyping
- All previous GitHub work (diagnostics, bootstrap, scene builder, Arabic text, scheduler, etc.) is included

**Project is now fully deployable on Replit with one click!**