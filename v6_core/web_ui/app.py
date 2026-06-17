#!/usr/bin/env python3
# V6 Living Miracle - Professional Web UI for Mobile & Desktop

from flask import Flask, render_template, request, jsonify, send_file
import json
import os
from pathlib import Path
from datetime import datetime
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from mobile_app import MobileAPI
from video_engine import VideoQuality

app = Flask(__name__)
api = MobileAPI()

class WebUIConfig:
    """UI Configuration"""
    THEME = "dark"
    PRIMARY_COLOR = "#D4AF37"  # Egyptian gold
    ACCENT_COLOR = "#1a1a1a"   # Dark

@app.route('/')
def index():
    """Main UI page"""
    return render_template('index.html', config={
        'theme': WebUIConfig.THEME,
        'primary_color': WebUIConfig.PRIMARY_COLOR,
        'accent_color': WebUIConfig.ACCENT_COLOR
    })

@app.route('/api/video/create', methods=['POST'])
def create_video():
    """Create video endpoint"""
    data = request.json
    result = api.handle_request('/api/video/create', 'POST', data)
    return jsonify(result)

@app.route('/api/video/history', methods=['GET'])
def get_history():
    """Get video history"""
    limit = request.args.get('limit', 50, type=int)
    result = api.handle_request('/api/video/history', 'GET', {'limit': limit})
    return jsonify(result)

@app.route('/api/video/delete', methods=['POST'])
def delete_video():
    """Delete video"""
    data = request.json
    result = api.handle_request('/api/video/delete', 'POST', data)
    return jsonify(result)

@app.route('/api/device/stats', methods=['GET'])
def get_device_stats():
    """Get device statistics"""
    result = api.handle_request('/api/device/stats', 'GET')
    return jsonify(result)

@app.route('/api/video/download/<video_id>', methods=['GET'])
def download_video(video_id):
    """Download video file"""
    file_path = api.app_instance.export_video(video_id)
    if file_path and os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    return jsonify({'success': False, 'message': 'Video not found'}), 404

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '6.0.0',
        'features': ['4K Video Generation', 'Local Processing', 'AI Effects', 'Mobile Support']
    })

@app.route('/api/capabilities', methods=['GET'])
def get_capabilities():
    """Get app capabilities"""
    return jsonify({
        'video_qualities': {
            'MOBILE': VideoQuality.MOBILE,
            'HD': VideoQuality.HD,
            'FULL_HD': VideoQuality.FULL_HD,
            'QHD': VideoQuality.QHD,
            '_4K': VideoQuality._4K
        },
        'features': [
            'Local Video Generation',
            'Advanced Effects (Vignette, Film Grain, Color Grading)',
            'Text Overlays',
            'Scene Building',
            'Audio Processing',
            'Clip Merging'
        ],
        'supported_formats': ['mp4', 'mov', 'webm'],
        'max_duration_seconds': 3600
    })

if __name__ == '__main__':
    print("="*70)
    print("V6 Living Miracle - Web UI Server")
    print("="*70)
    print("\n🚀 Server starting...")
    print("📱 Open browser: http://localhost:5000")
    print("🎬 API endpoint: http://localhost:5000/api")
    print("\n" + "="*70 + "\n")
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
