import React, { useState, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const CommandCard = memo(({ command, onPress }) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={() => onPress(command)} 
    activeOpacity={0.85}
  >
    <View style={[styles.iconBox, { backgroundColor: command.color + '12' }]}>
      <Ionicons name={command.icon} size={24} color={command.color} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>{command.label}</Text>
      <Text style={styles.cardDesc}>{command.desc}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#444" />
  </TouchableOpacity>
));

export default function V6CinematicOptimized() {
  const [currentPage, setCurrentPage] = useState('main');
  const [executing, setExecuting] = useState(null);

  const commands = [
    { id: 'build', label: 'BUILD SYSTEM', desc: 'Infrastructure & Deployment', icon: 'construct-outline', color: '#FFD700' },
    { id: 'video', label: 'CINEMATIC PIPELINE', desc: 'FFmpeg Processing & Effects', icon: 'videocam-outline', color: '#00D4FF' },
    { id: 'android', label: 'ANDROID BUILD', desc: 'Production APK Generation', icon: 'logo-android', color: '#3DDC84' },
    { id: 'web', label: 'WEB STUDIO', desc: 'Web Interface & Deployment', icon: 'globe-outline', color: '#FF6B6B' },
    { id: 'analyze', label: 'SYSTEM ANALYSIS', desc: 'Diagnostics & Monitoring', icon: 'analytics-outline', color: '#A855F7' },
  ];

  const handleCommand = useCallback((command) => {
    setCurrentPage(command.id);
  }, []);

  const goBack = useCallback(() => {
    setCurrentPage('main');
    setExecuting(null);
  }, []);

  const executeCommand = useCallback((command) => {
    setExecuting(command.id);
    setTimeout(() => {
      setExecuting(null);
    }, 1600);
  }, []);

  const currentCommand = commands.find(c => c.id === currentPage);

  const renderMainMenu = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>COMMAND CENTER</Text>
      {commands.map(cmd => (
        <CommandCard key={cmd.id} command={cmd} onPress={handleCommand} />
      ))}
    </ScrollView>
    );

  const renderDetail = () => {
    if (!currentCommand) return null;
    const isExecuting = executing === currentPage;

    return (
      <View style={styles.detailContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backRow}>
          <Ionicons name="arrow-back" size={22} color="#FFD700" />
          <Text style={styles.backLabel}>Back to Menu</Text>
        </TouchableOpacity>

        <View style={styles.detailHeader}>
          <View style={[styles.iconBoxLarge, { backgroundColor: currentCommand.color + '15' }]}>
            <Ionicons name={currentCommand.icon} size={38} color={currentCommand.color} />
          </View>
          <Text style={styles.detailTitle}>{currentCommand.label}</Text>
          <Text style={styles.detailDesc}>{currentCommand.desc}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {currentPage === 'build' && 'This section manages full system builds, infrastructure setup, and deployment pipelines.'}
            {currentPage === 'video' && 'Advanced FFmpeg pipeline for cinematic video processing, color grading, effects, and audio mixing.'}
            {currentPage === 'android' && 'One-click EAS Build configuration and production APK generation.'}
            {currentPage === 'web' && 'Tools for managing and deploying the web version of the interface.'}
            {currentPage === 'analyze' && 'Real-time system diagnostics, performance metrics, and health monitoring.'}
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.execButton, { backgroundColor: currentCommand.color }]} 
          onPress={() => executeCommand(currentCommand)}
          disabled={isExecuting}
        >
          {isExecuting ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator color="#000" size="small" style={{ marginRight: 8 }} />
              <Text style={styles.execText}>EXECUTING...</Text>
            </View>
          ) : (
            <Text style={styles.execText}>EXECUTE COMMAND</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.brand}>V6</Text>
          <Text style={styles.brandGold}>CINEMATIC</Text>
        </View>
        <Text style={styles.tagline}>CONTROL SYSTEM</Text>

        <View style={styles.statusPill}>
          <View style={styles.dot} />
          <Text style={styles.status}>SYSTEM READY</Text>
        </View>
      </View>

      {currentPage === 'main' ? renderMainMenu() : renderDetail()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE ULTIMATE  •  CINEMATIC AI STUDIO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 48, paddingHorizontal: 22, paddingBottom: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1a1a1a' },
  brand: { fontSize: 30, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  brandGold: { fontSize: 30, fontWeight: '800', color: '#FFD700', letterSpacing: 1, marginLeft: 4 },
  tagline: { fontSize: 11, color: '#666', letterSpacing: 3, marginTop: 2 },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', paddingHorizontal: 11, paddingVertical: 5, borderRadius: 20, marginTop: 12 },
  dot: { width: 6, height: 6, backgroundColor: '#00FF88', borderRadius: 3, marginRight: 7 },
  status: { color: '#00FF88', fontSize: 10, fontWeight: '700' },
  scroll: { flex: 1, paddingHorizontal: 18, paddingTop: 6 },
  section: { color: '#555', fontSize: 11, letterSpacing: 3, marginBottom: 12, marginLeft: 6 },
  card: { backgroundColor: '#111', borderRadius: 14, flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 9, borderWidth: 1, borderColor: '#1f1f1f' },
  iconBox: { width: 46, height: 46, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 13 },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cardDesc: { color: '#777', fontSize: 12, marginTop: 2 },
  detailContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 6 },
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backLabel: { color: '#FFD700', fontSize: 15, marginLeft: 8, fontWeight: '600' },
  iconBoxLarge: { width: 76, height: 76, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  detailHeader: { alignItems: 'center', marginBottom: 24 },
  detailTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 5 },
  detailDesc: { color: '#888', fontSize: 14, textAlign: 'center' },
  infoBox: { backgroundColor: '#111', borderRadius: 14, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: '#222' },
  infoText: { color: '#aaa', fontSize: 14, lineHeight: 22, textAlign: 'center' },
  execButton: { paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  execText: { color: '#000', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
  footer: { paddingVertical: 14, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1a1a1a' },
  footerText: { color: '#444', fontSize: 9, letterSpacing: 2 },
});