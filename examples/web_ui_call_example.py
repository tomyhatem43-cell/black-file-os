# مثال: استدعاء الـ Web UI المتكامل من بايثون
import requests
import json

url = "http://localhost:5000/generate_final"
data = {
    "clips": "~/clips",
    "music": "~/music/background.mp3",
    "voiceover": "~/voiceover/narration.m4a",
    "lut": "~/luts/cinematic_dark_gold.cube"
}

response = requests.post(url, json=data)
print(response.json())