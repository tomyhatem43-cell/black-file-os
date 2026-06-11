#!/bin/bash
# V6 CORE Ultimate - سكريبت بناء الـ APK المُصحح والمحسّن

echo "=== V6 CORE Ultimate - بناء التطبيق الحقيقي ==="

echo "\n[1/5] التأكد من تثبيت EAS CLI..."
if ! command -v eas &> /dev/null; then
    echo "تثبيت EAS CLI..."
    npm install -g eas-cli
fi

echo "\n[2/5] تسجيل الدخول إلى Expo..."
eas login

echo "\n[3/5] تهيئة المشروع للبناء (مرة واحدة فقط)..."
eas build:configure

echo "\n[4/5] بناء الـ APK (قد يستغرق 5-15 دقيقة)..."
eas build --platform android --profile preview

echo "\n✅ تم البناء بنجاح!"
echo "تحقق من لوحة Expo Dashboard للحصول على رابط التحميل."
echo "\nبيانات الدخول داخل التطبيق:"
echo "البريد: tomyhatem43@gmail.com"
echo "كلمة السر: Hamdyhatem560$"