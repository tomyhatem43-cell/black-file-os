# أدوات ضغط الفيديو المتقدمة لـ V6 CORE

## الهدف
تقليل حجم الفيديو مع الحفاظ على أعلى جودة ممكنة (خاصة للـ Shorts والمحتوى المحمول).

## 1. أفضل الإعدادات في FFmpeg (موصى بها)

### للجودة العالية + ضغط جيد (H.264):
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 18 \
  -movflags +faststart \
  -c:a aac -b:a 128k \
  output.mp4
```

### للضغط الأقوى (H.265 / HEVC):
```bash
ffmpeg -i input.mp4 \
  -c:v libx265 \
  -preset slow \
  -crf 23 \
  -x265-params "aq-mode=3:aq-strength=0.8" \
  -movflags +faststart \
  -c:a aac -b:a 128k \
  output.mp4
```

### للضغط الأحدث (AV1 - أفضل نسبة جودة/حجم):
```bash
ffmpeg -i input.mp4 \
  -c:v libsvtav1 \
  -crf 30 \
  -preset 6 \
  -movflags +faststart \
  -c:a libopus -b:a 96k \
  output.mp4
```

## 2. تقنيات ضغط متقدمة

### Two-Pass Encoding
يعطي أفضل توازن بين الجودة والحجم:
```bash
ffmpeg -y -i input.mp4 -c:v libx264 -b:v 5M -pass 1 -f mp4 /dev/null
ffmpeg -i input.mp4 -c:v libx264 -b:v 5M -pass 2 output.mp4
```

### Content-Adaptive Encoding
استخدام Scene Detection لتطبيق إعدادات مختلفة على كل مشهد.

### Hardware Accelerated Encoding
```bash
ffmpeg -i input.mp4 -c:v h264_mediacodec -b:v 5M output.mp4
```

## 3. أدوات خارجية مفيدة

- **HandBrake**: واجهة رسومية قوية مع إعدادات متقدمة.
- **Shutter Encoder**: خفيف وسريع، مبني على FFmpeg.
- **FFmpeg GUI** (مثل FFmpeg Batch أو LosslessCut).

## 4. التكامل مع V6 CORE

يمكن إضافة مرحلة ضغط نهائية في الـ pipeline:
- بعد `bridge_v10_quality_enhancement.sh`
- استخدام `libx265` أو `libsvtav1` للضغط النهائي.
- تفعيل Two-Pass Encoding في المشاريع المهمة.

**ضغط الفيديو المتقدم يساعد بشكل كبير في توفير المساحة مع الحفاظ على الجودة السينمائية.**