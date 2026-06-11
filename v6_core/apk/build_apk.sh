#!/bin/bash
# V6 CORE Ultimate - سكريبت بناء الـ APK السريع
# نفذ هذا السكريبت بعد تثبيت المتطلبات

echo "=== V6 CORE Ultimate APK Builder ==="

echo "1. التأكد من وجود EAS CLI..."
if ! command -v eas &> /dev/null; then
    echo "تثبيت EAS CLI..."
    npm install -g eas-cli
fi

echo "2. تسجيل الدخول إلى Expo (استخدم حسابك tomyhatem43@gmail.com)"
eas login

echo "3. بناء الـ APK (هذا قد يستغرق 5-10 دقائق)..."
eas build --platform android --profile preview

echo "✅ تم! تحقق من لوحة Expo للحصول على رابط التحميل."
echo "بيانات الدخول داخل التطبيق: tomyhatem43@gmail.com / Hamdyhatem560$"