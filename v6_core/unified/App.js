import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [systemStatus, setSystemStatus] = React.useState('Initializing...');

  const initializeSystem = async () => {
    setSystemStatus('Connecting to V6 Core...');
    // TODO: Connect to local Termux server via WebSocket or HTTP
    setTimeout(() => {
      setSystemStatus('V6 CORE ATOMIC READY ✅');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>V6 CORE</Text>
      <Text style={styles.subtitle}>Atomic Command Center</Text>
      
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{systemStatus}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={initializeSystem}>
        <Text style={styles.buttonText}>Initialize Unified System</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Generate Cinematic Short</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#f5d9a0',
    marginBottom: 40,
  },
  statusBox: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4af37',
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  statusText: {
    color: '#00ff9d',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#d4af37',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});