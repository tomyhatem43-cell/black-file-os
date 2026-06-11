# V6 CORE Ultimate - دليل بناء التطبيق الحقيقي (APK) - النسخة المُصححة

## المتطلبات
- Node.js + npm
- حساب Expo مجاني على expo.dev
- اتصال إنترنت

## الخطوات المُصححة (الأسهل والأأمن)

### الطريقة السريعة (مُفضلة):

```bash
cd black-file-os/v6_core/apk
npm install
bash build_apk.sh
```

### الخطوات التفصيلية يدويًا:

1. **تثبيت المتطلبات**:
   ```bash
   npm install
   npm install -g eas-cli
   ```

2. **تسجيل الدخول في Expo**:
   ```bash
   eas login
   ```
   (استخدم حسابك tomyhatem43@gmail.com)

3. **تهيئة المشروع** (مرة واحدة فقط):
   ```bash
   eas build:configure
   ```

4. **بناء الـ APK**:
   ```bash
   eas build --platform android --profile preview
   ```

5. **الحصول على الرابط**:
   - بعد انتهاء البناء، افتح [expo.dev](https://expo.dev)
   - اذهب إلى Builds
   - انسخ رابط التحميل

## بيانات الدخول داخل التطبيق
- البريد الإلكتروني: `tomyhatem43@gmail.com`
- كلمة السر: `Hamdyhatem560$`

## ملاحظات مهمة
- أول مرة قد يطلب منك قبول الشروط.
- الملف الناتج هو APK قابل للتثبيت مباشرة.
- للإصدار النهائي استخدم `production` بدلاً من `preview`.

تم التصحيح والتحسين باستخدام جميع الموصلات.