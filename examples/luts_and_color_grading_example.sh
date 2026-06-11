#!/bin/bash
# مثال: استخدام LUTs + التدرج اللوني الدقيق

source ~/V6_CORE/cinematic_engine/ffmpeg_pipeline/bridge_v6_luts_integrated.sh

build_cinematic_with_luts \
  ~/clips \
  ~/output/cinematic_with_lut.mp4 \
  ~/music/background.mp3 \
  ~/luts/cinematic_dark_gold.cube

echo "تم تطبيق LUT + التدرج اللوني بنجاح!"