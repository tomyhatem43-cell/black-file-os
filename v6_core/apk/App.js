import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [activeCommand, setActiveCommand] = useState(null);

  const commands = [
    { id: 'build', label: 'BUILD SYSTEM', description: 'Build complete system layer', icon: '🔧' },
    { id: 'video', label: 'CINEMATIC PIPELINE', description: 'Advanced FFmpeg video processing', icon: '🎬' },
    { id: 'android', label: 'ANDROID BUILD', description: 'Generate production APK', icon: '📱' },
    { id: 'web', label: 'WEB STUDIO', description: 'Launch web version', icon: '🌐' },
    { id: 'analyze', label: 'SYSTEM ANALYSIS', description: 'Full system diagnostics', icon: '🔍' },
  ];

  const handleCommand = (command) => {
    setActiveCommand(command.id);
    
    switch(command.id) {
      case 'build':
        Alert.alert('Build System', 'Starting full system build...');
        // TODO: Connect to actual build script
        break;
      case 'video':
        Alert.alert('Cinematic Pipeline', 'Launching FFmpeg pipeline...');
        // TODO: Connect to FFmpeg bridge
        break;
      case 'android':
        Alert.alert('Android Build', 'Starting EAS Android build...');
        // TODO: Trigger eas build
        break;
      case 'web':
        Alert.alert('Web Studio', 'Opening web interface...');
        break;
      case 'analyze':
        Alert.alert('System Analysis', 'Running full diagnostics...');
        break;
      default:
        break;
    }
    
    setTimeout(() => setActiveCommand(null), 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>V6 CINEMATIC</Text>
        <Text style={styles.subtitle}>CONTROL SYSTEM</Text>
        <View style={styles.statusBar}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>SYSTEM READY</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>COMMAND CENTER</Text>
        
        {commands.map((command) => (
          <TouchableOpacity
            key={command.id}
            style={[
              styles.commandCard,
              activeCommand === command.id && styles.commandCardActive
            ]}
            onPress={() => handleCommand(command)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.commandIcon}>{command.icon}</Text>
              <Text style={styles.commandLabel}>{command.label}</Text>
            </View>
            <Text style={styles.commandDescription}>{command.description}</Text>
            
            {activeCommand === command.id && (
              <View style={styles.loadingBar}>
                <View style={styles.loadingProgress} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE ULTIMATE • CINEMATIC AI STUDIO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFD700',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    letterSpacing: 6,
    marginTop: 4,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#111',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#00FF88',
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: '#00FF88',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#666',
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 16,
    marginLeft: 4,
  },
  commandCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  commandCardActive: {
    borderColor: '#FFD700',
    backgroundColor: '#1a1a1a',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commandIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  commandLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  commandDescription: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
  loadingBar: {
    height: 3,
    backgroundColor: '#333',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    width: '60%',
    backgroundColor: '#FFD700',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  footerText: {
    color: '#444',
    fontSize: 11,
    letterSpacing: 2,
  },
});