#!/data/data/com.termux/files/usr/bin/bash

# V6 Core - Professional Persistent Server Setup
# This script sets up PM2 to keep the V6 server running persistently

echo "[V6] Starting Professional Persistent Setup..."

# Create logs directory
mkdir -p logs

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo "[V6] Installing PM2..."
    npm install -g pm2
fi

# Stop any existing process
pm2 delete v6-core-server 2>/dev/null || true

# Start the server using ecosystem file
echo "[V6] Starting server with PM2..."
pm2 start pm2-ecosystem.config.js

# Save PM2 process list
echo "[V6] Saving PM2 process list..."
pm2 save

# Setup PM2 to start on boot
echo "[V6] Setting up PM2 startup..."
pm2 startup

pm2 save

echo ""
echo "[V6] ✅ Persistent server setup completed successfully!"
echo "[V6] Use the following commands to manage the server:"
echo "  pm2 status          - Check server status"
echo "  pm2 logs            - View logs"
echo "  pm2 restart all     - Restart server"
echo "  pm2 stop all        - Stop server"
echo "  pm2 delete all      - Remove server"
