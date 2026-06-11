#!/bin/bash
# مثال عملي: استخدام تقنيات دمج الصوت المتقدمة (v7 + v8)

source ~/V6_CORE/cinematic_engine/ffmpeg_pipeline/bridge_v7_audio_mixing.sh
source ~/V6_CORE/cinematic_engine/ffmpeg_pipeline/bridge_v8_audio_effects.sh

# مثال 1: فيديو مع Voiceover + موسيقى + تأثيرات
build_cinematic_with_advanced_audio \
  ~/clips \
  ~/output/cinematic_with_audio.mp4 \
  ~/music/background.mp3 \
  ~/voiceover/narration.m4a

# مثال 2: تطبيق تأثيرات صوتية إضافية فقط على ملف صوتي
apply_full_cinematic_audio_effects \
  ~/voiceover/narration.m4a \
  ~/output/enhanced_audio.m4a

echo "تم إنشاء الملفات بنجاح!"