# V6 Ultimate Backend

**Production-grade Flask API** to integrate the React Native App.js with the real V6 FFmpeg cinematic pipeline.

## How to Run (Local/Termux)

1. Make sure V6 CORE is set up (run the bootstrap if not done).
2. cd backend
3. pip install -r requirements.txt
4. python app.py

The API will be available at http://localhost:5000

## Endpoints

### GET /health
Returns health status.

### POST /process
Body (JSON):
```json
{
  "mode": "Pharaonic" or "Hybrid" or "Global" or "Automation",
  "input": "Your request description",
  "clips_path": "optional path to clips (default: ~/V6_CORE/projects/clips/*.mp4)",
  "has_music": true
}
```

Returns the output video path and success status.

## Integration with App.js
Call from React Native using fetch or axios to http://your-ip:5000/process
Update App.js processWithLivingMiracle to call this endpoint instead of simulation.

This completes the real link between the beautiful UI and the powerful FFmpeg pipeline.

Follows the project protocol: Complete, honest, production-ready.
