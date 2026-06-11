import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>V6 CORE Ultimate</Text>
      <Text style={styles.subtitle}>الاستوديو السينمائي الذكي الإعجازي</Text>
      
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Tools')}>
        <Text style={styles.cardTitle}>🎛️ لوحة الأدوات الذكية</Text>
        <Text style={styles.cardDesc}>الأذكى على الإطلاق - متصلة بالنواة</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Quality')}>
        <Text style={styles.cardTitle}>✅ Quality Gate</Text>
        <Text style={styles.cardDesc}>التدقيق الآلي والتصحيح قبل الإخراج</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Export')}>
        <Text style={styles.cardTitle}>📤 Export Center</Text>
        <Text style={styles.cardDesc}>تصدير مع علامة مائية وحقوق نشر</Text>
      </TouchableOpacity>

      <View style={styles.status}>
        <Text>الحالة: جاهز للإنتاج | الذكاء: متطور ذاتياً</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { fontSize: 28, color: '#d4af37', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#f5d9a0', textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#d4af37' },
  cardTitle: { fontSize: 18, color: '#d4af37', marginBottom: 8 },
  cardDesc: { color: '#ccc' },
  status: { marginTop: 20, padding: 15, backgroundColor: '#112211', borderRadius: 8 }
});