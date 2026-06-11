import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function V6CinematicInterface() {
  const [currentPage, setCurrentPage] = useState('main');

  const commands = [
    { id: 'build', label: 'BUILD SYSTEM', description: 'Build complete system layer & infrastructure', icon: 'construct-outline', color: '#FFD700' },
    { id: 'video', label: 'CINEMATIC PIPELINE', description: 'Advanced FFmpeg video processing & effects', icon: 'videocam-outline', color: '#00D4FF' },
    { id: 'android', label: 'ANDROID BUILD', description: 'Generate production-ready APK', icon: 'logo-android', color: '#3DDC84' },
    { id: 'web', label: 'WEB STUDIO', description: 'Launch & manage web version', icon: 'globe-outline', color: '#FF6B6B' },
    { id: 'analyze', label: 'SYSTEM ANALYSIS', description: 'Full system diagnostics & monitoring', icon: 'analytics-outline', color: '#A855F7' },
  ];

  const handleCommand = (command) => {
    setCurrentPage(command.id);
  };

  const goBack = () => {
    setCurrentPage('main');
  };

  const renderMainMenu = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>COMMAND CENTER</Text>
      {commands.map((command) => (
        <TouchableOpacity
          key={command.id}
          style={styles.commandCard}
          onPress={() => handleCommand(command)}
          activeOpacity={0.85}
        >
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: command.color + '15' }]}>
              <Ionicons name={command.icon} size={26} color={command.color} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.commandLabel}>{command.label}</Text>
              <Text style={styles.commandDescription}>{command.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#555" />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderDetailPage = () => {
    const currentCommand = commands.find(c => c.id === currentPage);
    if (!currentCommand) return null;

    return (
      <View style={styles.pageContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#FFD700" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.pageHeader}>
          <View style={[styles.iconContainerLarge, { backgroundColor: currentCommand.color + '15' }]}>
            <Ionicons name={currentCommand.icon} size={42} color={currentCommand.color} />
          </View>
          <Text style={styles.pageTitle}>{currentCommand.label}</Text>
          <Text style={styles.pageDescription}>{currentCommand.description}</Text>
        </View>

        <View style={styles.contentBox}>
          {currentPage === 'build' && (
            <Text style={styles.contentText}>
              This section will handle full system builds, infrastructure setup, and deployment pipelines.
            </Text>
          )}
          {currentPage === 'video' && (
            <Text style={styles.contentText}>
              Advanced FFmpeg pipeline for cinematic video processing, effects, color grading, and audio mixing.
            </Text>
          )}
          {currentPage === 'android' && (
            <Text style={styles.contentText}>
              EAS Build configuration and one-click APK generation for production releases.
            </Text>
          )}
          {currentPage === 'web' && (
            <Text style={styles.contentText}>
              Web studio for managing and deploying the web version of the cinematic interface.
            </Text>
          )}
          {currentPage === 'analyze' && (
            <Text style={styles.contentText}>
              Real-time system diagnostics, performance monitoring, and health checks.
            </Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.executeButton, { backgroundColor: currentCommand.color }]}
          onPress={() => Alert.alert(currentCommand.label, `Executing ${currentCommand.label}...`)}
        >
          <Text style={styles.executeButtonText}>EXECUTE</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>V6</Text>
          <Text style={styles.titleGold}>CINEMATIC</Text>
        </View>
        <Text style={styles.subtitle}>CONTROL SYSTEM</Text>
        <View style={styles.statusBar}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>SYSTEM READY</Text>
        </View>
      </View>

      {currentPage === 'main' ? renderMainMenu() : renderDetailPage()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE ULTIMATE • CINEMATIC AI STUDIO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 50, paddingHorizontal: 24, paddingBottom: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1f1f1f' },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 34, fontWeight: '800', color: '#fff', letterSpacing: 2 },
  titleGold: { fontSize: 34, fontWeight: '800', color: '#FFD700', letterSpacing: 2, marginLeft: 6 },
  subtitle: { fontSize: 12, color: '#666', letterSpacing: 4, marginTop: 2 },
  statusBar: { flexDirection: 'row', alignItems: 'center', marginTop: 12, backgroundColor: '#111', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  statusDot: { width: 6, height: 6, backgroundColor: '#00FF88', borderRadius: 3, marginRight: 8 },
  statusText: { color: '#00FF88', fontSize: 10, fontWeight: '700' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  sectionTitle: { color: '#555', fontSize: 11, letterSpacing: 3, marginBottom: 14, marginLeft: 6 },
  commandCard: { backgroundColor: '#111', borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  cardContent: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  iconContainer: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  textContainer: { flex: 1 },
  commandLabel: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 3 },
  commandDescription: { color: '#777', fontSize: 13 },
  pageContainer: { flex: 1, paddingHorizontal: 22, paddingTop: 10 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  backText: { color: '#FFD700', fontSize: 15, marginLeft: 8, fontWeight: '600' },
  pageHeader: { alignItems: 'center', marginBottom: 30 },
  iconContainerLarge: { width: 80, height: 80, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  pageTitle: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 8 },
  pageDescription: { color: '#888', fontSize: 14, textAlign: 'center' },
  contentBox: { backgroundColor: '#111', borderRadius: 16, padding: 22, marginBottom: 30, borderWidth: 1, borderColor: '#222' },
  contentText: { color: '#aaa', fontSize: 15, lineHeight: 24, textAlign: 'center' },
  executeButton: { paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  executeButtonText: { color: '#000', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  footer: { paddingVertical: 16, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1f1f1f' },
  footerText: { color: '#444', fontSize: 10, letterSpacing: 2 },
});