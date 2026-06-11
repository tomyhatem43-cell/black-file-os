# تقنيات دمج الصوت المتقدمة في V6 CORE (الإصدار v7)

## التقنيات المطبقة

### 1. معالجة الصوت الرئيسي (Voice Enhancement)
- High-pass + Low-pass filters لتنظيف الترددات.
- Compand (Compression) للتحكم في الديناميك.
- afftdn (Noise Reduction).
- loudnorm (EBU R128 Normalization) لمستوى صوت احترافي.

### 2. Ducking متقدم (Multi-band + Sidechain)
- Sidechain compression مع نسبة عالية (15:1).
- Multi-band filtering على الموسيقى.
- Makeup gain للحفاظ على مستوى الصوت.

### 3. تأثيرات سينمائية
- aecho + stereotools للـ Reverb والـ Spatial Audio.
- يعطي إحساساً سينمائياً عميقاً.

### 4. التكامل المعماري
- مدمج مع الـ Visual Pipeline (v6 LUTs + Color Grading).
- يدعم Voiceover منفصل + Background Music.
- يحافظ على أداء Termux (veryfast + crf 22).

## كيفية الاستخدام
```bash
source v6_core/cinematic_engine/ffmpeg_pipeline/bridge_v7_audio_mixing.sh
build_cinematic_with_advanced_audio /path/to/clips output.mp4 music.mp3 voiceover.m4a
```

## التوصيات
- استخدم loudnorm دائماً للتوافق مع منصات البث.
- للـ Voiceover الاحترافي: سجل بمعدل 48kHz واستخدم الـ Voice Enhancement.
- اختبر مستوى الصوت باستخدام أدوات مثل `ffmpeg -af loudnorm=print_format=json`.

**تم دمج تقنيات الصوت بشكل كامل ومتكامل مع باقي مكونات V6 CORE.**