# دليل إعدادات FFmpeg السينمائية المتقدمة (V6 CORE)

## الإصدار الموصى به حالياً
استخدم `bridge_v5_color_precision.sh` أو `bridge_v6_luts_cinematic.sh` للحصول على أعلى جودة.

## إعدادات الترميز الأساسية (مُحسّنة لـ Termux/Android)
```bash
-c:v libx264
-preset veryfast
-crf 22
-threads 2
-movflags +faststart
-max_muxing_queue_size 1024
```

### لماذا هذه الإعدادات؟
- **veryfast**: سرعة عالية مناسبة للأجهزة المحمولة.
- **crf 22**: توازن ممتاز بين الجودة وحجم الملف.
- **threads 2**: يمنع ارتفاع الحرارة على Android.

## فلاتر التدرج اللوني المتقدمة (v5 - دقة عالية)
```bash
-vf "eq=brightness=-0.12:contrast=1.28:saturation=0.82,\
     colorbalance=rs=0.08:gs=0.03:bs=-0.07,\
     colorchannelmixer=rr=1.06:rg=0.015:rb=0.005:gr=0.01:gg=1.03:gb=0.008:br=0.015:bg=0.012:bb=0.97,\
     curves=m='0/0 0.25/0.22 0.5/0.5 0.75/0.78 1/1',\
     unsharp=5:5:0.9:5:5:0.4,\
     vignette=PI/4.5,\
     noise=alls=8:allf=t+u"
```

### شرح الفلاتر:
- **eq**: ضبط السطوع والتباين والتشبع بدقة.
- **colorbalance**: إضافة دفء ذهبي مصري.
- **colorchannelmixer**: تحكم متقدم في القنوات اللونية (أعلى دقة).
- **curves**: منحنى S للتباين الطبيعي.
- **unsharp + vignette + noise**: مظهر فيلمي احترافي.

## دعم LUTs السينمائية (v6)
```bash
-vf "lut3d=file='luts/cinematic.cube', [باقي الفلاتر]..."
```

ضع ملفات `.cube` في مجلد `luts/`.

## نصائح للأداء على Termux
- استخدم `veryfast` دائماً.
- لا تستخدم أكثر من 2-4 threads.
- فعّل Caching لتجنب إعادة المعالجة.

## أمثلة كاملة
راجع ملفات `bridge_v*.sh` في `cinematic_engine/ffmpeg_pipeline/`.