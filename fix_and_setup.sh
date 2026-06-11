#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "=== V6 CORE - Fix & Complete Setup ==="

echo "[1/6] Returning to home directory..."
cd ~

rm -rf V6_CORE V6_SUPREME_KERNEL 2>/dev/null || true

echo "[2/6] Creating V6_CORE directory..."
mkdir -p V6_CORE
cd V6_CORE

echo "[3/6] Cloning project from GitHub..."
git clone https://github.com/tomyhatem43-cell/black-file-os.git || (cd black-file-os && git pull origin main)

cd black-file-os/v6_core/apk

echo "[4/6] Installing npm dependencies..."
npm install

echo "[5/6] Configuring EAS Build..."
eas build:configure || true

echo "[6/6] Setup completed successfully!"
echo ""
echo "To start the development server, run:"
echo "npx expo start --lan --clear"
echo ""
echo "To build APK, run:"
echo "eas build --platform android --profile preview"