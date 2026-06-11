# V6 CORE - تحسين دقة التدرج اللوني (الإصدار v5)

## التحسينات الرئيسية في دقة التدرج اللوني

تم تطوير إعدادات FFmpeg في الإصدار الخامس لتحقيق **دقة أعلى** في التدرج اللوني السينمائي، مع الحفاظ على الأداء في بيئة Termux + Android.

### التغييرات الرئيسية:
- استخدام قيم أكثر دقة في `eq` و `colorbalance`.
- إضافة `colorchannelmixer` للتحكم المتقدم في القنوات اللونية.
- استخدام `curves` للتحكم الدقيق في المنحنى اللوني (S-curve محسنة).
- ضبط `vignette` و `noise` لمظهر فيلمي أكثر احترافية.
- تحسين التوازن بين الجودة والأداء (crf 22 بدلاً من 23).

### الإعدادات التفصيلية (apply_precise_cinematic_grade):
```bash
-vf "eq=brightness=-0.12:contrast=1.28:saturation=0.82,\
     colorbalance=rs=0.08:gs=0.03:bs=-0.07,\
     colorchannelmixer=rr=1.06:rg=0.015:rb=0.005:gr=0.01:gg=1.03:gb=0.008:br=0.015:bg=0.012:bb=0.97,\
     curves=m='0/0 0.25/0.22 0.5/0.5 0.75/0.78 1/1',\
     unsharp=5:5:0.9:5:5:0.4,\
     vignette=PI/4.5,\
     noise=alls=8:allf=t+u"
```

**شرح كل مكون:**
- **eq**: ضبط دقيق للسطوع (-0.12) والتباين (1.28) والتشبع (0.82) لمظهر داكن غني.
- **colorbalance**: تحريك دقيق للقنوات لإضافة دفء ذهبي مصري في الظلال.
- **colorchannelmixer**: تحكم متقدم في خلط القنوات لدقة لونية أعلى.
- **curves**: منحنى S محسن لتعزيز التباين بدقة عالية دون فقدان التفاصيل.
- **unsharp + vignette + noise**: تحسين الحدة والتركيز والملمس الفيلمي.

### كيفية الاستخدام:
```bash
git pull origin main
source v6_core/cinematic_engine/ffmpeg_pipeline/bridge_v5_color_precision.sh
build_world_class_short_v5 /path/to/clips [output] [music]
```

هذه الإعدادات ترفع جودة التدرج اللوني إلى مستوى احترافي عالمي مع الحفاظ على التوافق والأداء في Termux.