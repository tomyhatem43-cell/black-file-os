# REPLIT BACKEND DEPLOYMENT GUIDE - V6 ULTIMATE

**Date:** June 12, 2026
**Protocol:** Absolute honesty + super intelligence + pure realism. Production-grade. Direct order for connectors.

## Direct Order for Connectors (GitHub + Replit Execution)

This file is pushed as a direct executable order. The GitHub connector has executed the push. The user (or Replit environment) will execute the deployment steps below.

## Why Replit (Option 2 - Chosen by User)

- Best for Flask + FFmpeg (easy apt install, longer execution time, Docker-like support).
- Free tier sufficient for V6 backend.
- Easy import from GitHub.
- Public URL ready for App.js on Huawei phone.

## Complete Step-by-Step Deployment (Copy-Paste Ready)

### Step 1: Import to Replit
1. Go to [replit.com](https://replit.com) and log in with @tomyhatem43.
2. Click **New Repl** > **Import from GitHub**.
3. Paste: `https://github.com/tomyhatem43-cell/black-file-os`
4. Select the `backend` folder as root (or copy files `app.py`, `requirements.txt`, `run.sh` to a new Python Repl).

### Step 2: Install Dependencies in Shell
Open the **Shell** tab in Replit and run:
```bash
pip install -r requirements.txt

# Install FFmpeg (critical for cinematic pipeline)
apt-get update && apt-get install -y ffmpeg
```

### Step 3: Configure Replit
Create a new file named **`.replit`** with this exact content:
```toml
run = "python app.py"
```

(Alternatively, use the existing `run.sh` by changing to `run = "bash run.sh"`)

### Step 4: Run the Backend
Click the green **Run** button.
- The app will start on a public URL like:
  `https://your-repl-name.tomyhatem43.repl.co`

### Step 5: Update App.js (for Huawei Phone)
In `v6_core/apk/App.js`, change the backendURL to the Replit URL:
```javascript
const backendURL = 'https://your-repl-name.tomyhatem43.repl.co/process';
```

Test with a Pharaonic mode request. The real FFmpeg pipeline will run inside Replit.

## Production Notes (Honest)
- Replit free tier has sleep after inactivity. Upgrade to Always On if needed for 24/7.
- FFmpeg processing time depends on video length (suitable for Shorts).
- For production, consider Render.com or Railway for longer timeouts if needed.
- This completes Option 2 as chosen.

## Next Direct Orders (Suggestions & Work Plan)

**Suggestion 1 (Immediate):** Deploy to Replit now (user executes steps above).
**Suggestion 2:** After deployment, push updated App.js with Replit URL variable to GitHub.
**Suggestion 3:** Create web demo version and deploy to Vercel (Option 1).
**Work Plan:**
1. User deploys backend to Replit (5 minutes).
2. Update App.js and test on Huawei phone.
3. Monitor logs in Replit.
4. Move to V2700 Nebula evolution or X5 Cinema Autopilot.

This is the complete, production-ready deployment order executed via GitHub connector. No fluff. Ready for immediate action.