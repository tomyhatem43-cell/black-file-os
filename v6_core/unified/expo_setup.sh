#!/bin/bash
# Quick setup script for Expo project (run on your computer or Replit)

echo "Setting up Expo for V6 Unified APK..."

npx create-expo-app@latest v6-unified-apk --yes
cd v6-unified-apk

# Install required dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs expo-status-bar

# Copy the App.js from the repo
cp ../v6_core/unified/App.js App.js

echo "Expo project ready!"
echo "Run: npx expo start"