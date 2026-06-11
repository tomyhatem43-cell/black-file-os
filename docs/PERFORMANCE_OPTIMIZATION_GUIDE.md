# تعليمات تحسين أداء السكريبتات في V6 CORE

## 1. تحسين أداء Bash Scripts

### قواعد عامة:
- استخدم `[[ ]]` بدلاً من `[ ]` للمقارنات (أسرع وأكثر أماناً).
- استخدم `command -v` بدلاً من `which`.
- تجنب الـ Subshells غير الضرورية (مثل `$(echo ...)`).
- استخدم `printf` بدلاً من `echo` في الحلقات.
- قم بتخزين نتائج الأوامر البطيئة في متغيرات (Caching).

### مثال على Caching:
```bash
if [ -z "$FFMPEG_ENCODERS" ]; then
    FFMPEG_ENCODERS=$(ffmpeg -encoders 2>/dev/null)
fi
```

## 2. تحسين أداء FFmpeg

- استخدم `-preset veryfast` أو `ultrafast` للسرعة (مع انخفاض طفيف في الجودة).
- استخدم Hardware Acceleration (`h264_mediacodec`) عند توفره.
- قلل من عدد الفلاتر في سطر واحد إن أمكن.
- استخدم `-threads 2` أو `4` على الأجهزة المحمولة.

## 3. تحسين أداء Python (للـ Agents)

- استخدم `uv` أو `pip` مع `--no-deps` عند الحاجة.
- فعّل `PYTHONOPTIMIZE=1`.
- استخدم `orjson` بدلاً من `json` للعمليات الكبيرة.

## 4. تحسين أداء النظام ككل

- شغّل `master_orchestrator.sh` بشكل دوري للتحقق من سلامة النظام.
- استخدم التنفيذ المتوازي (Parallel Execution) كما فعلنا في الماستر.
- تجنب تشغيل عدة عمليات FFmpeg ثقيلة في نفس الوقت على Termux.

## 5. أدوات قياس الأداء

```bash
# قياس وقت تنفيذ سكريبت
time ./master_orchestrator.sh

# مراقبة استخدام الموارد
top -p $(pgrep -f ffmpeg)
```