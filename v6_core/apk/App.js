import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function V7000AIStudio() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [videoTitle, setVideoTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const agents = [
    { id: 'director', name: 'Director AI', icon: 'videocam', color: '#A855F7', status: 'Active' },
    { id: 'script', name: 'Script Writer', icon: 'document-text', color: '#3B82F6', status: 'Active' },
    { id: 'visual', name: 'Visual Designer', icon: 'image', color: '#10B981', status: 'Active' },
    { id: 'editor', name: 'Editor AI', icon: 'cut', color: '#F59E0B', status: 'Active' },
  ];

  const recentProjects = [
    { id: 1, title: 'Cyberpunk City Trailer', status: 'Completed', duration: '01:45' },
    { id: 2, title: 'Product Launch Video', status: 'In Progress', duration: '00:58' },
    { id: 3, title: 'Nature Documentary', status: 'Completed', duration: '03:22' },
  ];

  const generateVideo = () => {
    if (!videoTitle.trim()) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setCurrentScreen('result');
          return 100;
        }
        return prev + 15;
      });
    }, 800);
  };

  const renderDashboard = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome back!</Text>
        <Text style={styles.subtitle}>Let's create something amazing today.</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Videos Generated</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12.4k</Text>
          <Text style={styles.statLabel}>Credits Left</Text>
        </View>
      </View>

      {/* AI Agents */}
      <Text style={styles.sectionTitle}>AI Agent Studio</Text>
      <View style={styles.agentsGrid}>
        {agents.map(agent => (
          <TouchableOpacity key={agent.id} style={styles.agentCard}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
              <Ionicons name={agent.icon} size={24} color={agent.color} />
            </View>
            <Text style={styles.agentName}>{agent.name}</Text>
            <Text style={styles.agentStatus}>{agent.status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Generate */}
      <Text style={styles.sectionTitle}>Quick Video Generation</Text>
      <View style={styles.generateCard}>
        <TextInput
          style={styles.input}
          placeholder="Enter video title or idea..."
          placeholderTextColor="#666"
          value={videoTitle}
          onChangeText={setVideoTitle}
        />
        <TouchableOpacity 
          style={styles.generateButton} 
          onPress={generateVideo}
          disabled={isGenerating}
        >
          <Text style={styles.generateButtonText}>Generate Video</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Projects */}
      <Text style={styles.sectionTitle}>Recent Projects</Text>
      {recentProjects.map(project => (
        <View key={project.id} style={styles.projectCard}>
          <View>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectMeta}>{project.duration}</Text>
          </View>
          <View style={[styles.statusBadge, { 
            backgroundColor: project.status === 'Completed' ? '#10B981' : '#F59E0B' 
          }]}>
            <Text style={styles.statusText}>{project.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderGeneration = () => (
    <View style={styles.generationContainer}>
      <Text style={styles.generationTitle}>Generating Video</Text>
      <Text style={styles.generationSubtitle}>{videoTitle}</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${generationProgress}%` }]} />
        </View>
        <Text style={styles.progressText}>{generationProgress}%</Text>
      </View>

      <View style={styles.stepsContainer}>
        <Text style={styles.step}>✓ Script Analysis</Text>
        <Text style={styles.step}>✓ Visual Generation</Text>
        <Text style={styles.stepActive}>◉ Video Rendering</Text>
        <Text style={styles.step}>○ Audio & Effects</Text>
        <Text style={styles.step}>○ Finalizing</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>V7000 AI Studio</Text>
        <TouchableOpacity onPress={() => setCurrentScreen('dashboard')}>
          <Ionicons name="person-circle" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {currentScreen === 'dashboard' && renderDashboard()}
      {currentScreen === 'generation' && renderGeneration()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setCurrentScreen('dashboard')} style={styles.navItem}>
          <Ionicons name="grid" size={22} color={currentScreen === 'dashboard' ? '#A855F7' : '#666'} />
          <Text style={[styles.navText, currentScreen === 'dashboard' && styles.navTextActive]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('generation')} style={styles.navItem}>
          <Ionicons name="play-circle" size={22} color={currentScreen === 'generation' ? '#A855F7' : '#666'} />
          <Text style={[styles.navText, currentScreen === 'generation' && styles.navTextActive]}>Generate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15 },
  logo: { color: '#fff', fontSize: 22, fontWeight: '800' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  header: { marginBottom: 24 },
  welcome: { color: '#fff', fontSize: 26, fontWeight: '800' },
  subtitle: { color: '#888', fontSize: 15, marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { backgroundColor: '#111', borderRadius: 14, padding: 16, width: '31%', alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 22, fontWeight: '800' },
  statLabel: { color: '#888', fontSize: 12, marginTop: 4 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 12, marginTop: 8 },
  agentsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  agentCard: { backgroundColor: '#111', borderRadius: 14, padding: 16, width: '48%', marginBottom: 12, alignItems: 'center' },
  agentIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  agentName: { color: '#fff', fontSize: 15, fontWeight: '700', textAlign: 'center' },
  agentStatus: { color: '#10B981', fontSize: 12, marginTop: 4 },
  generateCard: { backgroundColor: '#111', borderRadius: 16, padding: 20, marginBottom: 24 },
  input: { backgroundColor: '#1a1a1a', color: '#fff', padding: 16, borderRadius: 12, fontSize: 16, marginBottom: 12 },
  generateButton: { backgroundColor: '#A855F7', padding: 16, borderRadius: 12, alignItems: 'center' },
  generateButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  projectCard: { backgroundColor: '#111', borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  projectTitle: { color: '#fff', fontSize: 15, fontWeight: '600' },
  projectMeta: { color: '#666', fontSize: 13, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#111', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#222' },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { color: '#666', fontSize: 12, marginTop: 4 },
  navTextActive: { color: '#A855F7' },
  generationContainer: { flex: 1, padding: 20, justifyContent: 'center' },
  generationTitle: { color: '#fff', fontSize: 24, fontWeight: '800', textAlign: 'center' },
  generationSubtitle: { color: '#888', fontSize: 16, textAlign: 'center', marginTop: 8, marginBottom: 40 },
  progressContainer: { alignItems: 'center', marginBottom: 40 },
  progressBar: { width: '100%', height: 8, backgroundColor: '#222', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#A855F7' },
  progressText: { color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 12 },
  stepsContainer: { alignItems: 'center' },
  step: { color: '#666', fontSize: 15, marginBottom: 8 },
  stepActive: { color: '#A855F7', fontSize: 15, marginBottom: 8, fontWeight: '600' },
});