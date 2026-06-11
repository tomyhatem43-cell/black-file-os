# تقنيات التخزين المؤقت (Caching Techniques) في V6 CORE

## 1. التخزين المؤقت في الذاكرة (In-Memory Caching)

**الوصف**: تخزين النتائج في متغيرات أثناء تشغيل السكريبت.

**مثال**:
```bash
if [ -z "$FFMPEG_ENCODERS" ]; then
    FFMPEG_ENCODERS=$(ffmpeg -encoders 2>/dev/null)
fi
```

**المميزات**: سريع جداً، لا يحتاج إلى قراءة/كتابة ملفات.
**العيوب**: ينتهي عند انتهاء السكريبت.

## 2. التخزين المؤقت في الملفات (File-based Caching)

**الوصف**: حفظ النتائج في ملفات مع تحديد مدة صلاحية.

**مثال** (كما طبقناه في master_orchestrator.sh):
```bash
CACHE_FILE="$CACHE_DIR/ffmpeg_encoders.txt"

if [ ! -f "$CACHE_FILE" ] || [ $(find "$CACHE_FILE" -mmin +60 | wc -l) -gt 0 ]; then
    ffmpeg -encoders > "$CACHE_FILE"
fi
```

**المميزات**: يستمر بين تشغيلات السكريبت.
**العيوب**: يحتاج إلى إدارة الملفات والصلاحيات.

## 3. التخزين المؤقت بناءً على المحتوى (Content-based Caching)

**الوصف**: تخزين النتيجة بناءً على هاش المدخلات (مثل هاش الملفات).

**مثال**:
```bash
INPUT_HASH=$(md5sum input.mp4 | cut -d' ' -f1)
CACHE_FILE="$CACHE_DIR/${INPUT_HASH}.cache"

if [ -f "$CACHE_FILE" ]; then
    cat "$CACHE_FILE"
else
    result=$(heavy_processing input.mp4)
    echo "$result" > "$CACHE_FILE"
fi
```

**مفيد جداً** في معالجة الفيديو (تجنب إعادة معالجة نفس الملف).

## 4. التخزين المؤقت في Python (Memoization)

**الوصف**: استخدام `functools.lru_cache` أو `cachetools`.

**مثال**:
```python
from functools import lru_cache

@lru_cache(maxsize=128)
def process_video(path):
    # heavy processing
    return result
```

## 5. التخزين المؤقت في FFmpeg

- استخدم `-c copy` عندما لا تحتاج إلى إعادة الترميز.
- استخدم ملفات وسيطة (intermediate files) وأعد استخدامها.
- فعّل `-movflags +faststart` للتشغيل السريع.

## 6. التخزين المؤقت المتقدم (للـ Agents)

- استخدام **Vector Stores** (مثل Chroma أو FAISS) لحفظ embeddings.
- استخدام **Redis** أو **SQLite** للحفظ الدائم.
- تطبيق **Time-to-Live (TTL)** على البيانات المخزنة.

## التوصية لـ V6 CORE

- استخدم **File-based Caching** للأوامر البطيئة مثل `ffmpeg -encoders` (كما فعلنا).
- استخدم **Content-based Caching** عند معالجة ملفات الفيديو.
- استخدم **In-Memory Caching** داخل السكريبتات القصيرة.
- في المستقبل، يمكن استخدام **Vector Stores** مع LangGraph Agents.

**التخزين المؤقت من أقوى تقنيات تحسين الأداء في أنظمة معالجة الفيديو.**