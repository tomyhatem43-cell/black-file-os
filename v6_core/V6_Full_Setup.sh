#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "=== V6 CORE Ultimate - الإعداد الكامل والتلقائي ==="

# 0. التحضير الأساسي
termux-change-repo
pkg update && pkg upgrade -y
termux-setup-storage
termux-wake-lock

# 1. تجهيز البيئة بجودة عالية
pkg install git curl wget unzip zip tar proot-distro termux-api ffmpeg python nodejs neovim tmux htop neofetch clang make cmake libjpeg-turbo libpng libwebp git-lfs -y

echo 'export PATH=$HOME/bin:$PATH' >> $HOME/.bashrc
echo 'export TERM=xterm-256color' >> $HOME/.bashrc
echo 'export EDITOR=nvim' >> $HOME/.bashrc
source $HOME/.bashrc

pkg install termux-api -y

# 2. أدوات التطوير
pkg install nodejs-lts -y
npm install -g eas-cli expo-cli @expo/cli

pip install --upgrade pip
pip install requests pillow numpy opencv-python-headless yt-dlp

git config --global user.name "tomyhatem43"
git config --global user.email "tomyhatem43@gmail.com"
git lfs install

# 3. بناء المشروع
cd ~
mkdir -p V6_CORE
cd V6_CORE

git clone https://github.com/tomyhatem43-cell/black-file-os.git || (cd black-file-os && git pull origin main)
cd black-file-os/v6_core/apk || mkdir -p v6_core/apk && cd v6_core/apk

npm install
eas login
eas build:configure

echo "\n=== الإعداد اكتمل بنجاح ==="
echo "سيتم تشغيل خادم Expo تلقائياً الآن..."

echo "\nلتشغيل الخادم في جلسة tmux منفصلة (موصى به):"
echo "tmux new-session -d -s v6expo 'cd ~/V6_CORE/black-file-os/v6_core/apk && npx expo start'"
echo "tmux attach -t v6expo"

echo "\nأو شغّل يدوياً: npx expo start"

echo "\nبعد تشغيل الخادم، افتح Expo Go على هاتفك وامسح الـ QR Code"

echo "\nللدخول إلى التطبيق استخدم: tomyhatem43@gmail.com / Hamdyhatem560$"