import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';

export default function HookSelectorScreen({ navigation }) {
  const [topic, setTopic] = useState('');
  const [hooks, setHooks] = useState([]);
  const [selectedHook, setSelectedHook] = useState(null);

  const generateHooks = () => {
    // Mock AI generation - in real app, call backend LangGraph or API
    const mockHooks = [
      `لماذا كان ${topic} يخاف من الموت أكثر من أي شعب؟`,
      `اليوم الذي تحول فيه ${topic} من إله إلى إنسان`,
      `سر ${topic} الذي غير التاريخ إلى الأبد`
    ];
    setHooks(mockHooks);
  };

  const selectHook = (hook) => {
    setSelectedHook(hook);
    // Simulate self-evolving: remember preference
    alert('تم اختيار الهوك! سيتم تذكره للمشاريع القادمة.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hook Selector الذكي</Text>
      <Text style={styles.subtitle}>الأذكى على الإطلاق - يتعلم من تفضيلاتك</Text>

      <TextInput
        style={styles.input}
        placeholder="أدخل موضوع الفيديو (مثل: رمسيس الثاني)"
        value={topic}
        onChangeText={setTopic}
      />

      <TouchableOpacity style={styles.button} onPress={generateHooks}>
        <Text style={styles.buttonText}>توليد هوكات ذكية</Text>
      </TouchableOpacity>

      {hooks.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>الهوكات المقترحة (اختر الأقوى):</Text>
          {hooks.map((hook, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.hookCard, selectedHook === hook && styles.selected]}
              onPress={() => selectHook(hook)}
            >
              <Text style={styles.hookText}>{hook}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedHook && (
        <TouchableOpacity 
          style={styles.proceedButton} 
          onPress={() => navigation.navigate('Tools', { selectedHook })}
        >
          <Text style={styles.buttonText}>المتابعة مع هذا الهوك →</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { fontSize: 24, color: '#d4af37', textAlign: 'center' },
  subtitle: { color: '#f5d9a0', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#1a1a1a', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderColor: '#d4af37', borderWidth: 1 },
  button: { backgroundColor: '#d4af37', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#0a0a0a', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { color: '#d4af37', fontSize: 18, marginBottom: 10 },
  hookCard: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#d4af37' },
  selected: { borderColor: '#00ff9d', borderWidth: 2 },
  hookText: { color: '#fff' },
  proceedButton: { backgroundColor: '#00ff9d', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 }
});