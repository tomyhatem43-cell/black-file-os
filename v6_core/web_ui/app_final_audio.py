# V6 CORE - Final Highest Quality Audio Integrated Web UI
# Complete with all layers: Visual + Advanced Audio Agents + LUTs + Unified controls
from flask import Flask, render_template_string, request, jsonify
import subprocess
import os

app = Flask(__name__)
V6 = os.path.expanduser("~/V6_CORE")

HTML = '''
<!DOCTYPE html>
<html>
<head>
    <title>V6 CORE - Final Audio Studio</title>
    <style>body{background:#0a0a0a;color:#f5d9a0;font-family:system-ui;padding:20px;max-width:1100px;margin:auto} .section{background:#1a1a1a;padding:25px;margin:20px 0;border-radius:12px;border:1px solid #d4af37} button{background:#d4af37;color:#0a0a0a;border:none;padding:14px 28px;border-radius:8px;font-size:16px;cursor:pointer;font-weight:bold} input{background:#2a2a2a;color:#f5d9a0;border:1px solid #d4af37;padding:12px;border-radius:6px;width:100%;margin:8px 0}</style>
</head>
<body>
    <h1>V6 CORE <span style="color:#d4af37">Final Audio & Visual Studio</span></h1>
    <div class="section">
        <h2>Generate with Full Audio Agents (Highest Quality)</h2>
        <input type="text" id="clips" value="~/clips" placeholder="Clips Path">
        <input type="text" id="music" placeholder="Music Path">
        <input type="text" id="voiceover" placeholder="Voiceover Path">
        <input type="text" id="lut" placeholder="LUT Path (optional)">
        <button onclick="generateFinal()">Generate with All Audio Agents + Visual</button>
        <div id="result" style="background:#2a2a2a;padding:15px;margin-top:15px;border-radius:8px;white-space:pre-wrap"></div>
    </div>
</body>
<script>
async function generateFinal() {
    const data = {clips: document.getElementById('clips').value, music: document.getElementById('music').value, voiceover: document.getElementById('voiceover').value, lut: document.getElementById('lut').value};
    const res = await fetch('/generate_final', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
    const result = await res.json();
    document.getElementById('result').innerHTML = JSON.stringify(result, null, 2);
}
</script>
</html>
'''

@app.route('/')
def index():
    return render_template_string(HTML)

@app.route('/generate_final', methods=['POST'])
def generate_final():
    data = request.json
    # Calls the full integrated pipeline with all audio agents
    cmd = f'source {V6}/cinematic_engine/ffmpeg_pipeline/bridge_v7_audio_mixing.sh && source {V6}/cinematic_engine/ffmpeg_pipeline/bridge_v8_audio_effects.sh && build_cinematic_with_advanced_audio "{data["clips"]}" output.mp4 "{data["music"]}" "{data["voiceover"]}"'
    try:
        result = subprocess.check_output(['bash', '-c', cmd], text=True)
        return jsonify({'status': 'success', 'output': result.strip()})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
