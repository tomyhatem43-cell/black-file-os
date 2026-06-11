# V6 CORE Architecture

## Overview
V6 CORE is a modular, production-grade cinematic AI studio system designed for high-retention short-form content creation, optimized for Termux on Android with FFmpeg as the core rendering engine.

## Core Principles
- **Local First**: All heavy processing happens locally in Termux.
- **Modular Design**: Every component (runtime, cinematic engine, UI, integrations) is independent and replaceable.
- **Performance Optimized**: Encoding settings tuned for mobile devices (veryfast preset, limited threads, caching).
- **Cinematic Quality**: Advanced color grading, effects, and retention-focused techniques.

## Main Components

### 1. Core Layer (`core/`)
- `runtime/engine.sh`: Stateful task executor with checkpointing and logging.
- `registry.sh`: Simple JSON-based module registry (no external dependencies).

### 2. Cinematic Engine (`cinematic_engine/`)
- `ffmpeg_pipeline/`: Multiple versions (v3, v4, v5) with progressive improvements in color grading precision and effects.
- `scene_builder/`: JSON-driven multi-scene video generation.
- Arabic text overlay engine with font fallback.

### 3. User Interface (`web_ui/`)
- Professional Flask-based dashboard with dark cinematic theme and Egyptian gold accents.
- Real-time control over generation, health checks, and scene building.

### 4. Unified Architecture (`unified/`)
- Foundation for single APK using React Native / Capacitor.
- Bridge scripts for connecting Termux backend with frontend.

### 5. Integrations
- Termux runner and agents.
- Replit deployment support.
- Lovable UI streaming readiness.

## Data Flow
Assets → Validation → Scene Building → FFmpeg Pipeline (with LUTs & advanced grading) → Output + Metadata + Thumbnail

## Deployment Targets
- Termux (primary)
- Replit (cloud prototyping)
- Android APK (via Capacitor)

This architecture allows the system to scale from local Termux usage to a full unified mobile application while maintaining high cinematic quality.