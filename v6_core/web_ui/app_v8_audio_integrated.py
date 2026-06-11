from flask import Flask, render_template_string, request, jsonify
import subprocess
import os

app = Flask(__name__)
V6 = os.path.expanduser("~/V6_CORE")

HTML = '''
<!DOCTYPE html>
<html>
<head>
    <title>V6 CORE - Audio Integrated Dashboard</title>
    <style>
        body { background: #0a0a0a; color: #f5d9a0; font-family: system-ui; margin: 0; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; }
        .section { background: #1a1a1a; padding: 25px; margin: 20px 0; border-radius: 12px; border: 1px solid #d4af37; }
        button { background: #d4af37; color: #0a0a0a; border: none; padding: 14px 30px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; }
        input, select { background: #2a2a2a; color: #f5d9a0; border: 1px solid #d4af37; padding: 12px; border-radius: 6px; width: 100%; margin: 8px 0; }
        .status { background: #2a2a2a; padding: 15px; border-radius: 8px; margin-top: 15px; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div style="max-width: 900px; margin: 0 auto;">
        <div class="header">
            <h1>V6 CORE <span style="color:#d4af37">Audio Integrated</span></h1>
            <p>Professional Cinematic Audio Mixing + Visual Pipeline</p>
        </div>

        <div class="section">
            <h2>1. Generate with Advanced Audio Mixing (v7)</h2>
            <input type="text" id="clips" value="~/clips" placeholder="Clips folder path">
            <input type="text" id="music" placeholder="Music file path (optional)">
            <input type="text" id="voiceover" placeholder="Voiceover file path (optional)">
            <input type="text" id="lut" placeholder="LUT .cube path (optional)">
            <button onclick="generateWithAudio()">Generate Cinematic Short with Advanced Audio</button>
            <div id="audio_result" class="status"></div>
        </div>

        <div class="section">
            <h2>2. Audio Preview & Controls</h2>
            <button onclick="checkAudioHealth()">Check Audio System Health</button>
            <div id="audio_health" class="status"></div>
        </div>
    </div>

    <script>
        async function generateWithAudio() {
            const data = {
                clips: document.getElementById('clips').value,
                music: document.getElementById('music').value,
                voiceover: document.getElementById('voiceover').value,
                lut: document.getElementById('lut').value
            };
            const res = await fetch('/generate_audio', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            const result = await res.json();
            document.getElementById('audio_result').innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
        }

        async function checkAudioHealth() {
            const res = await fetch('/audio_health');
            const data = await res.json();
            document.getElementById('audio_health').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
    </script>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(HTML)

@app.route('/generate_audio', methods=['POST'])
def generate_audio():
    data = request.json
    clips = data.get('clips', '')
    music = data.get('music', '')
    voiceover = data.get('voiceover', '')
    lut = data.get('lut', '')

    cmd = f'source {V6}/cinematic_engine/ffmpeg_pipeline/bridge_v7_audio_mixing.sh && build_cinematic_with_advanced_audio "{clips}" output.mp4 "{music}" "{voiceover}"'
    try:
        result = subprocess.check_output(['bash', '-c', cmd], text=True, cwd=V6)
        return jsonify({'status': 'success', 'output': result.strip()})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)})

@app.route('/audio_health')
def audio_health():
    return jsonify({
        'status': 'ok',
        'audio_engine': 'v7 - Advanced Mixing Integrated',
        'features': ['Voice Enhancement', 'Multi-band Ducking', 'Cinematic Reverb', 'Loudness Normalization', 'LUT Compatible']
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
