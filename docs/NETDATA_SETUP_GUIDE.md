# دليل تفعيل Netdata لمراقبة أداء السيرفر في V6 CORE

## ما هو Netdata؟
Netdata هو أداة مراقبة أداء خفيفة وسريعة تعطي رسوم بيانية فورية للنظام (CPU, Memory, Disk, Network, Processes...).

## تثبيت Netdata على السيرفر (Ubuntu/Debian)

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Netdata
wget -O /tmp/netdata-kickstart.sh https://get.netdata.cloud/kickstart.sh && sh /tmp/netdata-kickstart.sh
```

أو باستخدام الـ One-line installer:
```bash
bash <(curl -Ss https://get.netdata.cloud/kickstart.sh)
```

## الوصول إلى لوحة التحكم
بعد التثبيت، افتح المتصفح على:
```
http://your-server-ip:19999
```

## أهم المقاييس المفيدة لـ V6 CORE

- **CPU Usage**: مراقبة استهلاك المعالج أثناء تشغيل FFmpeg.
- **Memory Usage**: مراقبة استهلاك الذاكرة (مهم عند تشغيل LangGraph Agents).
- **Disk I/O**: مراقبة سرعة القراءة/الكتابة أثناء معالجة الفيديو.
- **Network**: مراقبة سرعة الرفع عند نشر الفيديوهات.
- **Processes**: مراقبة عمليات FFmpeg و Python.

## تكوين Netdata (اختياري)

يمكنك تعديل ملف الإعدادات:
```bash
sudo nano /etc/netdata/netdata.conf
```

ثم أعد تشغيل Netdata:
```bash
sudo systemctl restart netdata
```

## التكامل مع V6 CORE

- شغّل Netdata على السيرفر الذي تستضيف عليه V6 CORE.
- راقب أداء النظام أثناء تشغيل `master_orchestrator.sh` أو الـ pipelines.
- استخدم التنبيهات (Alarms) في Netdata لإعلامك عند ارتفاع استهلاك الموارد.

**Netdata أداة ممتازة لمراقبة أداء V6 CORE عند نشره على سيرفر حقيقي.**