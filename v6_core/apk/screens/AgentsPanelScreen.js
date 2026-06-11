import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AgentsPanelScreen() {
  const agents = [
    { name: 'Hook Agent', status: 'جاهز', progress: '100%' },
    { name: 'Research Agent', status: 'يعمل', progress: '75%' },
    { name: 'Script Agent', status: 'جاهز', progress: '100%' },
    { name: 'Visual Agent', status: 'يعمل', progress: '60%' },
    { name: 'Audio Agent', status: 'جاهز', progress: '100%' },
    { name: 'Quality Control Agent', status: 'ينتظر', progress: '0%' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>لوحة الوكلاء الذكية</Text>
      <Text style={styles.subtitle}>متصلة بالنواة | ذكاء متطور ذاتياً</Text>

      {agents.map((agent, index) => (
        <View key={index} style={styles.agentCard}>
          <Text style={styles.agentName}>{agent.name}</Text>
          <Text style={styles.agentStatus}>الحالة: {agent.status} | التقدم: {agent.progress}</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>تشغيل / مراقبة</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { fontSize: 24, color: '#d4af37', textAlign: 'center' },
  subtitle: { color: '#f5d9a0', textAlign: 'center', marginBottom: 20 },
  agentCard: { backgroundColor: '#1a1a1a', padding: 18, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#d4af37' },
  agentName: { color: '#d4af37', fontSize: 18, marginBottom: 6 },
  agentStatus: { color: '#ccc', marginBottom: 10 },
  actionButton: { backgroundColor: '#d4af37', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#0a0a0a', fontWeight: 'bold' }
});