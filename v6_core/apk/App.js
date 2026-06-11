import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function V6CinematicUI() {
  const [currentPage, setCurrentPage] = useState('main');

  const commands = [
    { id: 'build', label: 'BUILD SYSTEM', desc: 'Infrastructure & Deployment', icon: 'construct-outline', color: '#FFD700' },
    { id: 'video', label: 'CINEMATIC PIPELINE', desc: 'FFmpeg Processing & Effects', icon: 'videocam-outline', color: '#00D4FF' },
    { id: 'android', label: 'ANDROID BUILD', desc: 'Production APK Generation', icon: 'logo-android', color: '#3DDC84' },
    { id: 'web', label: 'WEB STUDIO', desc: 'Web Interface & Deployment', icon: 'globe-outline', color: '#FF6B6B' },
    { id: 'analyze', label: 'SYSTEM ANALYSIS', desc: 'Diagnostics & Monitoring', icon: 'analytics-outline', color: '#A855F7' },
  ];

  const handlePress = (id) => setCurrentPage(id);
  const goBack = () => setCurrentPage('main');

  const renderMain = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>COMMAND CENTER</Text>
      {commands.map(cmd => (
        <TouchableOpacity key={cmd.id} style={styles.card} onPress={() => handlePress(cmd.id)} activeOpacity={0.9}>
          <View style={[styles.iconBox, { backgroundColor: cmd.color + '12' }]}>
            <Ionicons name={cmd.icon} size={26} color={cmd.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{cmd.label}</Text>
            <Text style={styles.cardDesc}>{cmd.desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderDetail = () => {
    const cmd = commands.find(c => c.id === currentPage);
    return (
      <View style={styles.detailContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backRow}>
          <Ionicons name="arrow-back" size={22} color="#FFD700" />
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>

        <View style={styles.detailHeader}>
          <View style={[styles.iconBoxLarge, { backgroundColor: cmd.color + '15' }]}>
            <Ionicons name={cmd.icon} size={38} color={cmd.color} />
          </View>
          <Text style={styles.detailTitle}>{cmd.label}</Text>
          <Text style={styles.detailDesc}>{cmd.desc}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {currentPage === 'build' && 'This module handles full system builds, Terraform, and deployment pipelines.'}
            {currentPage === 'video' && 'Advanced FFmpeg pipeline for color grading, effects, denoising, and audio ducking.'}
            {currentPage === 'android' && 'One-click EAS Build for generating signed production APKs.'}
            {currentPage === 'web' && 'Web version deployment and management tools.'}
            {currentPage === 'analyze' && 'Real-time system health, logs, and performance metrics.'}
          </Text>
        </View>

        <TouchableOpacity style={[styles.execBtn, { backgroundColor: cmd.color }]} onPress={() => {}}>
          <Text style={styles.execText}>EXECUTE COMMAND</Text>
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

      {currentPage === 'main' ? renderMain() : renderDetail()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE ULTIMATE  •  CINEMATIC AI STUDIO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 48, paddingHorizontal: 22, paddingBottom: 18, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1a1a1a' },
  brand: { fontSize: 30, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  brandGold: { fontSize: 30, fontWeight: '800', color: '#FFD700', letterSpacing: 1, marginLeft: 4 },
  tagline: { fontSize: 11, color: '#666', letterSpacing: 3, marginTop: 2 },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', paddingHorizontal: 11, paddingVertical: 5, borderRadius: 20, marginTop: 12 },
  dot: { width: 6, height: 6, backgroundColor: '#00FF88', borderRadius: 3, marginRight: 7 },
  status: { color: '#00FF88', fontSize: 10, fontWeight: '700' },
  scroll: { flex: 1, paddingHorizontal: 18, paddingTop: 8 },
  section: { color: '#555', fontSize: 11, letterSpacing: 3, marginBottom: 12, marginLeft: 6 },
  card: { backgroundColor: '#111', borderRadius: 14, flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 9, borderWidth: 1, borderColor: '#1f1f1f' },
  iconBox: { width: 46, height: 46, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 13 },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cardDesc: { color: '#777', fontSize: 12, marginTop: 2 },
  detailContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  backLabel: { color: '#FFD700', fontSize: 15, marginLeft: 8, fontWeight: '600' },
  iconBoxLarge: { width: 76, height: 76, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  detailHeader: { alignItems: 'center', marginBottom: 26 },
  detailTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 6 },
  detailDesc: { color: '#777', fontSize: 14, textAlign: 'center' },
  infoBox: { backgroundColor: '#111', borderRadius: 14, padding: 20, marginBottom: 26, borderWidth: 1, borderColor: '#222' },
  infoText: { color: '#aaa', fontSize: 14, lineHeight: 22, textAlign: 'center' },
  execBtn: { paddingVertical: 15, borderRadius: 13, alignItems: 'center' },
  execText: { color: '#000', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
  footer: { paddingVertical: 14, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1a1a1a' },
  footerText: { color: '#444', fontSize: 9, letterSpacing: 2 },
});