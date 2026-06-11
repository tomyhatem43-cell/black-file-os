# V6 CORE Web UI - Professional Dark Cinematic Interface (Egyptian Gold Theme)
# Run with: python app.py
# Then open http://localhost:5000
# Global 10/10 UI: Modern, intuitive, dark theme with gold accents, full control over video generation

from flask import Flask, render_template_string, request, jsonify, send_from_directory
import subprocess
import os

app = Flask(__name__)
V6 = os.path.expanduser("~/V6_CORE")

HTML = '''
<!DOCTYPE html>
<html>
<head>
    <title>V6 CORE - Cinematic AI Studio</title>
    <style>
        body { background: #0a0a0a; color: #f5d9a0; font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px; }
        .gold { color: #d4af37; }
        .container { max-width: 1200px; margin: 0 auto; }
        .section { background: #1a1a1a; padding: 25px; margin-bottom: 25px; border-radius: 12px; border: 1px solid #d4af37; }
        button { background: #d4af37; color: #0a0a0a; border: none; padding: 12px 25px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; }
        button:hover { background: #f5d9a0; }
        input, select { background: #2a2a2a; color: #f5d9a0; border: 1px solid #d4af37; padding: 10px; border-radius: 6px; width: 100%; }
        .status { padding: 15px; background: #2a2a2a; border-radius: 8px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>V6 CORE <span class="gold">Cinematic AI Studio</span></h1>
            <p>Global 10/10 - Termux + Android + FFmpeg | Ancient Egypt Psychological Content</p>
        </div>

        <div class="section">
            <h2>1. Health Check</h2>
            <button onclick="runHealth()">Run Health Check</button>
            <div id="health" class="status"></div>
        </div>

        <div class="section">
            <h2>2. Generate World-Class Short (Optimized Encoding)</h2>
            <label>Clips Folder Path:</label>
            <input type="text" id="clips" value="~/clips" placeholder="Path to clips folder">
            <label>Music File (optional):</label>
            <input type="text" id="music" placeholder="Path to music file">
            <button onclick="generateShort()">Generate Optimized Short</button>
            <div id="generate" class="status"></div>
        </div>

        <div class="section">
            <h2>3. Advanced Scene Builder</h2>
            <p>JSON scene definition for complex cinematic videos</p>
            <textarea id="scene_json" rows="8" style="width:100%; background:#2a2a2a; color:#f5d9a0; border:1px solid #d4af37;">{ "scenes": [ { "id": 1, "duration": 5, "clip": "intro.mp4", "effect": "fade", "text": "مرحبا" } ] }</textarea>
            <button onclick="buildScene()">Build from Scene JSON</button>
            <div id="scene" class="status"></div>
        </div>

        <div class="section">
            <h2>Status & Output</h2>
            <div id="output" class="status" style="min-height: 100px;"></div>
        </div>
    </div>

    <script>
        async function runHealth() {
            const res = await fetch('/health');
            const data = await res.json();
            document.getElementById('health').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }

        async function generateShort() {
            const clips = document.getElementById('clips').value;
            const music = document.getElementById('music').value;
            const res = await fetch('/generate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({clips: clips, music: music})
            });
            const data = await res.json();
            document.getElementById('generate').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }

        async function buildScene() {
            const json = document.getElementById('scene_json').value;
            const res = await fetch('/scene', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({scene: json})
            });
            const data = await res.json();
            document.getElementById('scene').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
    </script>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(HTML)

@app.route('/health')
def health():
    try:
        result = subprocess.check_output(['bash', os.path.join(V6, 'system/build_pipeline/check_v2.sh')], text=True)
        return jsonify({'status': 'ok', 'output': result})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)})

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    clips = data.get('clips', '')
    music = data.get('music', '')
    try:
        # Call the optimized bridge
        cmd = ['bash', '-c', f'source {V6}/cinematic_engine/ffmpeg_pipeline/bridge_v3_optimized.sh && build_cinematic_short_optimized "{clips}" "{music}"']
        result = subprocess.check_output(cmd, text=True, cwd=V6)
        return jsonify({'status': 'success', 'output': result})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)})

@app.route('/scene', methods=['POST'])
def scene():
    data = request.json
    scene_json = data.get('scene', '')
    try:
        with open(os.path.join(V6, 'projects/scene.json'), 'w') as f:
            f.write(scene_json)
        result = subprocess.check_output(['bash', os.path.join(V6, 'cinematic_engine/scene_builder/builder.sh'), os.path.join(V6, 'projects/scene.json')], text=True)
        return jsonify({'status': 'success', 'output': result})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
