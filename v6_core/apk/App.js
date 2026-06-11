import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

// V6 with Real FFmpeg via ffmpeg-kit-react-native
export default function V6FFmpegNPM() {
  const [title, setTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((message) => {
    setLogs(prev => [...prev.slice(-12), { time: new Date().toLocaleTimeString(), message }]);
  }, []);

  const generateAndExecute = useCallback(async () => {
    if (!title.trim()) {
      Alert.alert('خطأ', 'الرجاء إدخال عنوان الفيديو');
      return;
    }

    setIsProcessing(true);
    setLogs([]);
    setResult(null);

    const safeTitle = title.replace(/\s+/g, '_').toLowerCase();
    const outputFile = `output_${safeTitle}.mp4`;

    const command = `-i input.mp4 -vf "eq=brightness=0.08:contrast=1.25:saturation=1.18,unsharp=5:5:0.9:5:5:0.0" -c:a aac -b:a 192k ${outputFile}`;

    addLog('جاري تنفيذ FFmpeg...');

    try {
      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        addLog('تم إنشاء الفيديو بنجاح!');
        setResult({ title, outputFile, success: true });
        Alert.alert('نجاح', `تم إنشاء الفيديو: ${outputFile}`);
      } else {
        addLog('حدث خطأ أثناء المعالجة');
        Alert.alert('خطأ', 'فشل تنفيذ FFmpeg');
      }
    } catch (error) {
      addLog('خطأ: ' + error.message);
      Alert.alert('خطأ', error.message);
    }

    setIsProcessing(false);
  }, [title, addLog]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>V6 <Text style={{color: '#FFD700'}}>FFMPEG NPM</Text></Text>
        <Text style={styles.subtitle}>تنفيذ FFmpeg عبر NPM (ffmpeg-kit)</Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>عنوان الفيديو</Text>
        <TextInput
          style={styles.input}
          placeholder="اكتب عنوان الفيديو..."
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
        />

        <TouchableOpacity 
          style={[styles.generateBtn, isProcessing && styles.disabled]} 
          onPress={generateAndExecute}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator color="#000" style={{ marginRight: 10 }} />
              <Text style={styles.btnText}>جاري المعالجة...</Text>
            </View>
          ) : (
            <Text style={styles.btnText}>توليد وتنفيذ الفيديو</Text>
          )}
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>تم إنشاء الفيديو</Text>
          <Text style={styles.resultValue}>الملف: {result.outputFile}</Text>
        </View>
      )}

      {logs.length > 0 && (
        <View style={styles.logsSection}>
          <Text style={styles.logsTitle}>سجل FFmpeg</Text>
          {logs.map((log, i) => (
            <Text key={i} style={styles.logItem}>• {log.time} — {log.message}</Text>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE • FFmpeg عبر NPM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 48, paddingHorizontal: 20, paddingBottom: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1f1f1f' },
  title: { fontSize: 26, fontWeight: '900', color: '#fff' },
  subtitle: { fontSize: 13, color: '#FFD700', letterSpacing: 1, marginTop: 4 },
  inputSection: { padding: 20 },
  label: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 8 },
  input: { backgroundColor: '#111', color: '#fff', padding: 16, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#333' },
  generateBtn: { backgroundColor: '#FFD700', padding: 18, borderRadius: 14, alignItems: 'center', marginTop: 16 },
  disabled: { backgroundColor: '#555' },
  btnText: { color: '#000', fontWeight: '900', fontSize: 15 },
  resultSection: { padding: 20 },
  resultTitle: { color: '#30D158', fontSize: 18, fontWeight: '800', marginBottom: 16 },
  resultValue: { color: '#fff', fontSize: 15 },
  logsSection: { padding: 20, paddingTop: 0 },
  logsTitle: { color: '#666', fontSize: 12, marginBottom: 8 },
  logItem: { color: '#888', fontSize: 12, marginBottom: 3 },
  footer: { paddingVertical: 14, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1f1f1f' },
  footerText: { color: '#555', fontSize: 10, letterSpacing: 2 },
});