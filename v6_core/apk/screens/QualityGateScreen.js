import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function QualityGateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quality Gate</Text>
      <Text style={styles.status}>الحالة: ممتازة | لا توجد أخطاء</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>تشغيل التدقيق الآلي الكامل</Text>
      </TouchableOpacity>
      
      <Text style={styles.report}>تقرير الجودة: 98/100
- الاتساق البصري: ممتاز
- جودة الصوت: ممتاز
- السرد النفسي: ممتاز</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, color: '#d4af37', textAlign: 'center' },
  status: { color: '#00ff9d', textAlign: 'center', marginVertical: 20 },
  button: { backgroundColor: '#d4af37', padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#0a0a0a', fontSize: 18, fontWeight: 'bold' },
  report: { color: '#f5d9a0', marginTop: 30, lineHeight: 24 }
});