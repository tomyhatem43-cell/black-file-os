# FFmpeg Cinematic Pipeline Guide (V6 CORE)

## Current Best Version
Use `bridge_v5_color_precision.sh` or `bridge_v6_luts_cinematic.sh` for the highest quality.

## Key Optimizations
- **Color Grading**: Precise combination of `eq`, `colorbalance`, `colorchannelmixer`, and `curves`.
- **Dynamic Effects**: Ken Burns zoom for engagement.
- **Audio**: Music ducking using sidechain compression.
- **Film Look**: Subtle vignette, film grain, and unsharp masking.
- **Performance**: `veryfast` preset + `crf 22` + limited threads for Android.

## Using LUTs
Place `.cube` files in `luts/` folder and use `lut3d` filter for professional cinematic looks.

## Example Command
```bash
source v6_core/cinematic_engine/ffmpeg_pipeline/bridge_v5_color_precision.sh
build_world_class_short_v5 /path/to/clips output.mp4 music.mp3
```