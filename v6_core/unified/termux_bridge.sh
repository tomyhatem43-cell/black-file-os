#!/data/data/com.termux/files/usr/bin/bash
# V6 Termux Bridge - Connects Termux backend to the Unified APK

echo "=== V6 Termux Bridge Starting ==="

# Start the main V6 Core
if [ -f "$HOME/V6_CORE/v6" ]; then
    echo "Starting V6 Core..."
    bash "$HOME/V6_CORE/v6" health
else
    echo "V6 Core not found. Please run the bootstrap first."
fi

# Start a simple HTTP server for the APK to communicate with
python3 -m http.server 8080 --directory $HOME/V6_CORE &
SERVER_PID=$!
echo "Local server started on port 8080 (PID: $SERVER_PID)"

echo "V6 Termux Bridge is running."
echo "The APK can now connect to this device."