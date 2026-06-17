#!/usr/bin/env python3
# V6 Living Miracle - Mobile App Backend (React Native / Flutter compatible)

import os
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional
from video_engine import LocalVideoGenerator, VideoQuality, SceneBuilder, VideoEffects

class MobileVideoApp:
    """Mobile-optimized video generation app"""
    
    def __init__(self):
        self.engine = LocalVideoGenerator(output_dir="./mobile_videos")
        self.history: List[Dict] = []
        self.settings = {
            "default_quality": "FULL_HD",
            "enable_auto_effects": True,
            "background_processing": True
        }
    
    def create_video(self, request: Dict) -> Dict:
        """Create video from mobile request"""
        print(f"[MobileApp] Creating video: {request.get('title')}")
        
        try:
            title = request.get("title", "Untitled")
            duration = request.get("duration", 15.0)
            quality_name = request.get("quality", "FULL_HD")
            
            # Get quality settings
            quality = getattr(VideoQuality, quality_name, VideoQuality.FULL_HD)
            
            # Generate video
            video_file = self.engine.generate_short_video(title, duration, quality)
            
            # Apply effects if enabled
            if request.get("enable_effects", True):
                effects = {
                    "color_grade": None,
                    "vignette": True,
                    "film_grain": True,
                    "sharpen": True,
                    "saturation": 1.2
                }
                if request.get("ken_burns"):
                    effects["ken_burns"] = True
                
                video_file = self.engine.process_video_with_effects(video_file, effects, quality)
            
            # Record in history
            entry = {
                "id": f"vid_{datetime.now().timestamp()}",
                "title": title,
                "file": video_file,
                "quality": quality_name,
                "duration": duration,
                "created_at": datetime.now().isoformat(),
                "status": "completed"
            }
            self.history.append(entry)
            
            return {
                "success": True,
                "message": "Video created successfully",
                "video": entry
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error: {str(e)}",
                "video": None
            }
    
    def get_history(self, limit: int = 50) -> List[Dict]:
        """Get video history"""
        return self.history[-limit:]
    
    def delete_video(self, video_id: str) -> Dict:
        """Delete video by ID"""
        for i, entry in enumerate(self.history):
            if entry["id"] == video_id:
                file_path = Path(entry["file"])
                if file_path.exists():
                    file_path.unlink()
                self.history.pop(i)
                return {"success": True, "message": "Video deleted"}
        return {"success": False, "message": "Video not found"}
    
    def get_device_stats(self) -> Dict:
        """Get device statistics"""
        videos_dir = Path("./mobile_videos")
        total_size = sum(f.stat().st_size for f in videos_dir.glob("*.mp4") if f.is_file()) / (1024 * 1024)
        
        return {
            "total_videos": len(self.history),
            "total_storage_mb": total_size,
            "default_quality": self.settings["default_quality"],
            "storage_info": {
                "videos_dir": str(videos_dir),
                "exists": videos_dir.exists()
            }
        }
    
    def export_video(self, video_id: str, format: str = "mp4") -> Optional[str]:
        """Export video in different format"""
        for entry in self.history:
            if entry["id"] == video_id:
                # For now, return the mp4 path
                # In production, could convert to other formats
                return entry["file"]
        return None

class MobileAPI:
    """REST API for mobile app"""
    
    def __init__(self):
        self.app_instance = MobileVideoApp()
    
    def handle_request(self, endpoint: str, method: str, data: Dict = None) -> Dict:
        """Handle API requests from mobile app"""
        
        if endpoint == "/api/video/create" and method == "POST":
            return self.app_instance.create_video(data or {})
        
        elif endpoint == "/api/video/history" and method == "GET":
            limit = data.get("limit", 50) if data else 50
            return {
                "success": True,
                "videos": self.app_instance.get_history(limit)
            }
        
        elif endpoint == "/api/video/delete" and method == "POST":
            video_id = (data or {}).get("video_id")
            return self.app_instance.delete_video(video_id)
        
        elif endpoint == "/api/device/stats" and method == "GET":
            return {
                "success": True,
                "stats": self.app_instance.get_device_stats()
            }
        
        elif endpoint == "/api/video/export" and method == "POST":
            video_id = (data or {}).get("video_id")
            file_path = self.app_instance.export_video(video_id)
            return {
                "success": file_path is not None,
                "file": file_path
            }
        
        return {"success": False, "message": "Unknown endpoint"}

if __name__ == "__main__":
    print("="*70)
    print("V6 Living Miracle - Mobile Video App")
    print("="*70)
    
    api = MobileAPI()
    
    # Test create video
    print("\n[Test] Creating video...")
    result = api.handle_request("/api/video/create", "POST", {
        "title": "Mobile Video Test",
        "duration": 10.0,
        "quality": "FULL_HD",
        "enable_effects": True
    })
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test stats
    print("\n[Test] Getting device stats...")
    stats_result = api.handle_request("/api/device/stats", "GET")
    print(f"Stats: {json.dumps(stats_result, indent=2)}")
    
    # Test history
    print("\n[Test] Getting history...")
    history_result = api.handle_request("/api/video/history", "GET", {"limit": 10})
    print(f"History: {json.dumps(history_result, indent=2)}")
    
    print("="*70)
