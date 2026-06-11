# أدوات تسريع المعالجة باستخدام GPU في V6 CORE

## الوضع الحالي على Termux + Android

FFmpeg في Termux يدعم تسريع الأجهزة (Hardware Acceleration) بشكل محدود لكنه فعال في كثير من الأجهزة الحديثة.

### الطريقة الموصى بها: MediaCodec

MediaCodec هو أفضل خيار على Android لأنه يستخدم معالج الرسوميات/الـ ASIC الخاص بالجهاز.

**أوامر الترميز المسرّع:**
```bash
ffmpeg -i input.mp4 \
  -c:v h264_mediacodec \
  -b:v 5M \
  -c:a aac -b:a 128k \
  output.mp4
```

**لفك الترميز (Decoding):**
```bash
ffmpeg -c:v h264_mediacodec -i input.mp4 ...
```

### خيارات أخرى متاحة:
- `hevc_mediacodec` (لـ H.265/HEVC)
- `h264_v4l2m2m` (في بعض الإصدارات)

## كيفية التكامل مع V6 CORE

يمكن تعديل الـ bridge scripts لاستخدام Hardware Acceleration عند توفره:

```bash
# في bridge_v7 أو bridge_v8
if command -v mediacodec &> /dev/null; then
    ENCODER="h264_mediacodec"
else
    ENCODER="libx264"
fi

ffmpeg ... -c:v $ENCODER ...
```

## ملاحظات هامة
- ليس كل الأجهزة تدعم `h264_mediacodec` بشكل مستقر.
- قد تحتاج إلى إعادة بناء FFmpeg مع دعم MediaCodec.
- التسريع يقلل من استهلاك البطارية والحرارة بشكل كبير.
- يُفضل استخدامه في مرحلة الترميز النهائية.

## التوصية
ابدأ بتجربة `h264_mediacodec` في جهازك. إذا عمل بشكل جيد، يمكن دمجه كخيار افتراضي في الـ pipeline.