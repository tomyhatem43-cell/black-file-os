# دليل تفعيل تسريع GPU للفيديو في V6 CORE

## الخطوة 1: التحقق من الدعم
شغّل الأمر التالي في Termux:
```bash
ffmpeg -encoders | grep mediacodec
```

إذا ظهر `h264_mediacodec` أو `hevc_mediacodec`، فجهازك يدعم التسريع.

## الخطوة 2: تفعيل التسريع
استخدم السكريبت:
```bash
git pull origin main
source v6_core/cinematic_engine/ffmpeg_pipeline/enable_gpu_acceleration.sh
```

## الخطوة 3: استخدام التسريع في الـ Pipeline
في أي bridge (مثل bridge_v7 أو bridge_v10)، غيّر:
```bash
-c:v libx264
```
إلى:
```bash
-c:v h264_mediacodec
```

## ملاحظات
- Hardware Acceleration يقلل الحرارة ويوفر البطارية.
- قد تحتاج إلى إعادة بناء FFmpeg إذا لم يظهر الدعم.
- يُفضل استخدامه مع `-b:v` بدلاً من `-crf` في بعض الحالات.

**تم تفعيل الدعم وتوثيقه بشكل كامل.**