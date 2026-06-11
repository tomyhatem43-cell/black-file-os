import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function DashboardScreen({ navigation, memory, updateMemory }) {
  const recentHooks = memory.recentHooks || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>V6 CORE Ultimate</Text>
      <Text style={styles.subtitle}>Cinematic AI Studio</Text>

      {recentHooks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Hooks (Self-learning)</Text>
          {recentHooks.slice(0, 3).map((hook, index) => (
            <Text key={index} style={styles.hookItem}>{hook}</Text>
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('HookSelector')}
      >
        <Text style={styles.cardTitle}>Smart Hook Selector</Text>
        <Text style={styles.cardDesc}>AI-powered hook generation that learns from you</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Tools')}
      >
        <Text style={styles.cardTitle}>Smart Tools Panel</Text>
        <Text style={styles.cardDesc}>Connected to core pipelines</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Agents')}
      >
        <Text style={styles.cardTitle}>Agents Dashboard</Text>
        <Text style={styles.cardDesc}>Monitor multi-agent system</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Quality')}
      >
        <Text style={styles.cardTitle}>Quality Gate</Text>
        <Text style={styles.cardDesc}>Automated review and correction</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Export')}
      >
        <Text style={styles.cardTitle}>Export Center</Text>
        <Text style={styles.cardDesc}>Professional export with protection</Text>
      </TouchableOpacity>

      <View style={styles.status}>
        <Text>Status: Prototype with self-evolving memory</Text>
        <Text>Core: Superior FFmpeg Pipeline integrated conceptually</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { fontSize: 26, color: '#d4af37', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#f5d9a0', textAlign: 'center', marginBottom: 25 },
  section: { marginBottom: 20 },
  sectionTitle: { color: '#d4af37', fontSize: 16, marginBottom: 8 },
  hookItem: { color: '#ccc', marginBottom: 4, paddingLeft: 10 },
  card: { backgroundColor: '#1a1a1a', padding: 18, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#d4af37' },
  cardTitle: { color: '#d4af37', fontSize: 17, marginBottom: 6 },
  cardDesc: { color: '#aaa', fontSize: 14 },
  status: { marginTop: 25, padding: 15, backgroundColor: '#112211', borderRadius: 8 }
});