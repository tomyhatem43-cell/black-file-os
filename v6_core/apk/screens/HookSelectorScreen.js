import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';

export default function HookSelectorScreen({ navigation, route }) {
  const [topic, setTopic] = useState('');
  const [hooks, setHooks] = useState([]);
  const [selectedHook, setSelectedHook] = useState(null);

  const generateHooks = () => {
    if (!topic.trim()) {
      Alert.alert('Error', 'Please enter a topic');
      return;
    }
    // Mock AI - in real version, call backend or local model
    const mockHooks = [
      `Why was ${topic} feared more than death?`,
      `The day ${topic} became human`,
      `The secret of ${topic} that changed history`
    ];
    setHooks(mockHooks);
  };

  const selectHook = (hook) => {
    setSelectedHook(hook);
    // In real version, save to memory via updateMemory prop if passed
    Alert.alert('Selected', 'Hook selected. In full version, this will be saved to self-evolving memory.');
  };

  const proceed = () => {
    if (selectedHook) {
      navigation.navigate('Tools', { selectedHook });
    } else {
      Alert.alert('Select a hook first');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Smart Hook Selector</Text>
      <Text style={styles.subtitle}>Learns from your choices</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter topic (e.g. Ramses II)"
        value={topic}
        onChangeText={setTopic}
      />

      <TouchableOpacity style={styles.button} onPress={generateHooks}>
        <Text style={styles.buttonText}>Generate Smart Hooks</Text>
      </TouchableOpacity>

      {hooks.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Suggested Hooks (tap to select):</Text>
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
        <TouchableOpacity style={styles.proceedButton} onPress={proceed}>
          <Text style={styles.buttonText}>Continue with this hook →</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { fontSize: 22, color: '#d4af37', textAlign: 'center' },
  subtitle: { color: '#f5d9a0', textAlign: 'center', marginBottom: 15 },
  input: { backgroundColor: '#1a1a1a', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, borderColor: '#d4af37', borderWidth: 1 },
  button: { backgroundColor: '#d4af37', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#0a0a0a', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { color: '#d4af37', fontSize: 16, marginBottom: 10 },
  hookCard: { backgroundColor: '#1a1a1a', padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#d4af37' },
  selected: { borderColor: '#00ff9d', borderWidth: 2 },
  hookText: { color: '#fff' },
  proceedButton: { backgroundColor: '#00ff9d', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 15 }
});