# أدوات مراقبة أداء السيرفر في V6 CORE

## 1. أدوات مراقبة خفيفة ومناسبة لـ Termux

### أفضل الأدوات الموصى بها:

| الأداة       | الاستخدام                          | مستوى الخفة | ملاحظات                              |
|---------------|------------------------------------|-------------|--------------------------------------|
| `htop`        | مراقبة العمليات والموارد          | خفيفة جداً  | الأفضل لـ Termux                     |
| `glances`     | مراقبة شاملة (CPU, RAM, Disk, Net) | خفيفة       | ممتازة وسهلة الاستخدام              |
| `nload`       | مراقبة سرعة الشبكة                 | خفيفة جداً  | مفيدة عند الرفع/التحميل             |
| `iotop`       | مراقبة عمليات القرص                | متوسطة      | يحتاج صلاحيات                       |
| `pidstat`     | مراقبة أداء عملية معينة            | خفيفة       | جزء من `sysstat`                     |
| `top`         | مراقبة أساسية                      | خفيفة جداً  | متوفر افتراضياً                      |

### تثبيت في Termux:
```bash
pkg install htop glances nload iotop sysstat
```

## 2. مراقبة أداء FFmpeg

- استخدم الخيار `-benchmark` لقياس الأداء:
  ```bash
  ffmpeg -benchmark -i input.mp4 output.mp4
  ```
- سجل الوقت والـ CPU usage باستخدام `time`:
  ```bash
  time ffmpeg -i input.mp4 output.mp4
  ```
- راقب عملية FFmpeg باستخدام:
  ```bash
  htop -p $(pgrep ffmpeg)
  ```

## 3. مراقبة أداء الـ Agents (Python + LangGraph)

- استخدم `glances` أو `htop` لمراقبة استهلاك الذاكرة والـ CPU.
- راقب عمليات Python:
  ```bash
  htop -p $(pgrep -f python)
  ```
- استخدم `py-spy` لتحليل أداء الكود:
  ```bash
  py-spy top --pid $(pgrep -f langgraph)
  ```

## 4. مراقبة متقدمة (عند النشر على سيرفر)

- **Netdata**: خفيفة وجميلة، تعطي رسوم بيانية فورية.
- **Prometheus + Grafana**: للمراقبة طويلة الأمد والتنبيهات.
- **Glances** مع وضع الويب (`glances -w`).

## 5. التكامل مع V6 CORE

يمكن إضافة مراقبة الأداء إلى `master_orchestrator.sh` أو إنشاء سكريبت منفصل يعرض:
- استهلاك الـ CPU والذاكرة أثناء المعالجة.
- حالة عمليات FFmpeg.
- حالة الـ Agents.

**مثال بسيط لإضافته في الماستر:**
```bash
echo "[Monitoring] Current CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')%"
```