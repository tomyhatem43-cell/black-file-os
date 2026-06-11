# V6 CORE Ultimate - Complete Setup Guide

## Full Installation for Termux + Expo + FFmpeg

### Step 1: Basic Preparation
```bash
termux-change-repo
pkg update && pkg upgrade -y
termux-setup-storage
termux-wake-lock
```

### Step 2: Install All Packages
```bash
pkg install git curl wget unzip zip tar proot-distro termux-api ffmpeg python nodejs neovim tmux htop neofetch clang make cmake libjpeg-turbo libpng libwebp git-lfs nodejs-lts -y

pip install --upgrade pip
pip install requests pillow numpy opencv-python-headless yt-dlp

npm install -g eas-cli expo-cli @expo/cli

git config --global user.name "tomyhatem43"
git config --global user.email "tomyhatem43@gmail.com"
git lfs install
```

### Step 3: Clone Project
```bash
cd ~
mkdir -p V6_CORE
cd V6_CORE
git clone https://github.com/tomyhatem43-cell/black-file-os.git
cd black-file-os/v6_core/apk
```

### Step 4: Install Project Dependencies
```bash
npm install
eas login
eas build:configure
```

### Step 5: Run Development Server
```bash
tmux new-session -d -s v6expo 'cd ~/V6_CORE/black-file-os/v6_core/apk && npx expo start'
tmux attach -t v6expo
```

## Replit Integration
1. Go to Replit
2. Create new Node.js Repl
3. Clone this repo or copy the apk folder
4. Run `npm install` and `npx expo start`

## Lovable Integration
Use Lovable to generate UI components for the cinematic dashboard.

## Next Steps
After running the server, open Expo Go on your phone and scan the QR code.
Login with: tomyhatem43@gmail.com / Hamdyhatem560$
