import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

export default function ExportScreen() {
  const [projectName, setProjectName] = useState('My_Cinematic_Short');
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [exportFormat, setExportFormat] = useState('MP4');

  const handleExport = () => {
    // Mock export process - in real app, call backend for FFmpeg processing + watermark
    Alert.alert(
      'تصدير ناجح!', 
      `تم تصدير ${projectName} بنجاح كـ ${exportFormat} مع علامة مائية.\n\nالملف جاهز للتحميل أو المشاركة على TikTok/YouTube/Reels.`
    );
    // Simulate self-evolving: remember export preferences
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Export Center</Text>
      <Text style={styles.subtitle}>تصدير احترافي مع حماية الحقوق</Text>

      <TextInput
        style={styles.input}
        value={projectName}
        onChangeText={setProjectName}
        placeholder="اسم المشروع"
      />

      <View style={styles.optionRow}>
        <Text style={styles.label}>تضمين علامة مائية:</Text>
        <TouchableOpacity 
          style={[styles.toggle, includeWatermark && styles.toggleActive]}
          onPress={() => setIncludeWatermark(!includeWatermark)}
        >
          <Text style={styles.toggleText}>{includeWatermark ? 'نعم' : 'لا'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionRow}>
        <Text style={styles.label}>الصيغة:</Text>
        <TouchableOpacity style={styles.formatButton} onPress={() => setExportFormat('MP4')}>
          <Text>MP4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.formatButton} onPress={() => setExportFormat('MOV')}>
          <Text>MOV</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
        <Text style={styles.exportButtonText}>تصدير الآن مع حماية الحقوق</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        السيرفر المخصص جاهز لمعالجة التصدير بجودة عالية.
        الدومين المجاني: v6core-innovate.repl.co (مثال)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { fontSize: 26, color: '#d4af37', textAlign: 'center', marginBottom: 10 },
  subtitle: { color: '#f5d9a0', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#1a1a1a', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 20, borderColor: '#d4af37', borderWidth: 1 },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  label: { color: '#f5d9a0', flex: 1 },
  toggle: { backgroundColor: '#333', padding: 10, borderRadius: 8 },
  toggleActive: { backgroundColor: '#d4af37' },
  toggleText: { color: '#fff' },
  formatButton: { backgroundColor: '#333', padding: 10, borderRadius: 8, marginRight: 10 },
  exportButton: { backgroundColor: '#00ff9d', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  exportButtonText: { color: '#0a0a0a', fontSize: 18, fontWeight: 'bold' },
  note: { color: '#888', textAlign: 'center', marginTop: 30, fontSize: 12 }
});