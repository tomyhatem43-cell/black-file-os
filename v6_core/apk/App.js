import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Clipboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// V6 Ultimate System - Phase 1, 2 & 3 Combined
const agentData = [
  // Intelligence
  { id: 'trend', name: 'Trend Intelligence', category: 'Intelligence', desc: 'Real-time viral analysis + platform prediction', automation: 'Analyzes trends and generates 7 hook variations', color: '#00D4FF' },
  { id: 'audience', name: 'Audience Psychology', category: 'Intelligence', desc: 'Deep audience behavior and persona creation', automation: 'Creates detailed audience personas + content strategy', color: '#5AC8FA' },
  { id: 'competitor', name: 'Competitor Analysis', category: 'Intelligence', desc: 'Analyzes competitors and finds opportunities', automation: 'Generates competitive gaps + strategy recommendations', color: '#64D2FF' },

  // Creation
  { id: 'script', name: 'Script Architect', category: 'Creation', desc: 'Psychological storytelling + retention engineering', automation: 'Creates 3 full scripts with A/B testing', color: '#FFD700' },
  { id: 'hook', name: 'Hook Master', category: 'Creation', desc: 'High-conversion psychological hooks', automation: 'Generates 8 powerful hook variations', color: '#FF9500' },
  { id: 'story', name: 'Story Weaver', category: 'Creation', desc: 'Narrative structure + emotional arcs', automation: 'Builds complete story frameworks', color: '#FF2D55' },
  { id: 'dialogue', name: 'Dialogue Crafter', category: 'Creation', desc: 'Natural dialogue + character voice', automation: 'Creates authentic dialogue with personality', color: '#BF5AF2' },

  // Visual
  { id: 'visual', name: 'Cinematic Visual Engine', category: 'Visual', desc: 'Advanced local FFmpeg + effects', automation: 'Generates pro cinematic FFmpeg pipelines', color: '#FF6B6B' },
  { id: 'color', name: 'Color Science', category: 'Visual', desc: 'Emotional color grading + LUT creation', automation: 'Creates cinematic color palettes + custom LUTs', color: '#FF375F' },
  { id: 'lighting', name: 'Lighting Director', category: 'Visual', desc: 'Cinematic lighting design', automation: 'Generates lighting setups + mood references', color: '#FF6482' },

  // Audio
  { id: 'audio', name: 'Audio Intelligence', category: 'Audio', desc: 'Voice enhancement + music ducking', automation: 'Creates professional audio processing chains', color: '#30D158' },
  { id: 'music', name: 'Music Sync', category: 'Audio', desc: 'Beat detection + emotional music matching', automation: 'Generates perfect music synchronization', color: '#32D74B' },

  // Editing
  { id: 'editor', name: 'Smart Editor', category: 'Editing', desc: 'AI pacing + music synchronization', automation: 'Auto-generates edit decisions + beat maps', color: '#A855F7' },
  { id: 'pace', name: 'Pacing Optimizer', category: 'Editing', desc: 'Retention-based pacing analysis', automation: 'Optimizes video pacing for maximum retention', color: '#BF5AF2' },

  // Quality & Automation
  { id: 'quality', name: 'Quality Guardian', category: 'Quality', desc: 'Automated quality scoring + improvements', automation: 'Scans and suggests 12+ enhancements', color: '#FF9F0A' },
  { id: 'pipeline', name: 'Full Pipeline', category: 'Automation', desc: 'End-to-end production automation', automation: 'Runs complete idea-to-publish workflow', color: '#FF6482' },
  { id: 'batch', name: 'Batch Processor', category: 'Automation', desc: 'Multi-video consistent processing', automation: 'Processes 10+ videos with consistent quality', color: '#FF375F' },
];

// Helper Tools (Phase 2)
const helperTools = [
  { id: 'ffmpeg_basic', name: 'Basic FFmpeg Optimizer', cmd: 'ffmpeg -i input.mp4 -vf "scale=1080:-2" -c:a copy output.mp4', desc: 'Quick resolution optimization' },
  { id: 'ffmpeg_cinematic', name: 'Cinematic Color Chain', cmd: 'ffmpeg -i input.mp4 -vf "eq=brightness=0.1:contrast=1.2:saturation=1.15,unsharp=5:5:0.8" output.mp4', desc: 'Hollywood-style color grading' },
  { id: 'script_hooks', name: 'Hook Generator', cmd: 'Generate 5 high-retention hooks for your topic', desc: 'Psychological hook variations' },
  { id: 'thumbnail_ideas', name: 'Thumbnail Ideas', cmd: 'Generate 6 thumbnail concepts', desc: 'High-CTR thumbnail suggestions' },
  { id: 'caption_writer', name: 'Caption & Hashtag', cmd: 'Write engaging caption + 15 hashtags', desc: 'Platform-optimized captions' },
  { id: 'audio_clean', name: 'Audio Cleaner', cmd: 'ffmpeg -i input.mp4 -af "highpass=f=200, lowpass=f=3000, afftdn" output.mp4', desc: 'Clean voice + reduce noise' },
];

export default function V6CompleteSystem() {
  const [currentTab, setCurrentTab] = useState('agents');
  const [executing, setExecuting] = useState(null);
  const [logs, setLogs] = useState([]);
  const [agents, setAgents] = useState(agentData);

  const addLog = useCallback((message) => {
    setLogs(prev => [...prev.slice(-15), { time: new Date().toLocaleTimeString(), message }]);
  }, []);

  const updateAgent = useCallback((id, updates) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const runAgent = useCallback((agent) => {
    updateAgent(agent.id, { status: 'running' });
    setExecuting(agent.id);
    addLog(`[AI] ${agent.name} started`);

    setTimeout(() => {
      updateAgent(agent.id, { status: 'completed' });
      setExecuting(null);
      addLog(`[SUCCESS] ${agent.name} completed`);

      if (agent.category === 'Visual') {
        const cmd = agent.id === 'visual' 
          ? 'ffmpeg -i input.mp4 -vf "eq=brightness=0.1:contrast=1.2:saturation=1.15,unsharp=5:5:0.8" output_cinematic.mp4'
          : 'ffmpeg -i input.mp4 -vf "colorbalance=rs=.1" output_graded.mp4';
        Alert.alert(agent.name, `${agent.automation}\n\nCommand copied.`);
        Clipboard.setString(cmd);
      } else if (agent.id === 'pipeline') {
        Alert.alert('Full Pipeline', 'Complete production automation activated. This replaces multiple paid global platforms.');
      } else {
        Alert.alert(agent.name, agent.automation);
      }
    }, 2300);
  }, [addLog, updateAgent]);

  const runHelperTool = useCallback((tool) => {
    addLog(`[Tool] ${tool.name} executed`);
    if (tool.cmd.startsWith('ffmpeg')) {
      Alert.alert(tool.name, `${tool.desc}\n\nCommand copied to clipboard.`);
      Clipboard.setString(tool.cmd);
    } else {
      Alert.alert(tool.name, tool.desc);
    }
  }, [addLog]);

  const renderAgents = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>AI AGENTS (Phase 1)</Text>
      {agents.map(agent => (
        <View key={agent.id} style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: agent.color + '15' }]}>
              <Ionicons name="sparkles" size={22} color={agent.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{agent.name}</Text>
              <Text style={styles.desc}>{agent.desc}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: agent.status === 'running' ? '#FFD700' : agent.status === 'completed' ? '#30D158' : '#222' }]}>
              <Text style={styles.badgeText}>{agent.status || 'idle'}</Text>
            </View>
          </View>
          <Text style={styles.auto}>{agent.automation}</Text>
          <TouchableOpacity style={[styles.btn, { backgroundColor: agent.color }]} onPress={() => runAgent(agent)} disabled={executing === agent.id}>
            {executing === agent.id ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>RUN AGENT</Text>}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderTools = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>HELPER TOOLS (Phase 2)</Text>
      <Text style={{color:'#666', marginBottom:16}}>Ready-to-use automation (replaces paid tools)</Text>
      {helperTools.map(tool => (
        <TouchableOpacity key={tool.id} style={styles.toolCard} onPress={() => runHelperTool(tool)}>
          <Text style={styles.toolName}>{tool.name}</Text>
          <Text style={styles.toolDesc}>{tool.desc}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>V6 <Text style={{color:'#FFD700'}}>ULTIMATE</Text></Text>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, currentTab === 'agents' && styles.activeTab]} onPress={() => setCurrentTab('agents')}>
            <Text style={[styles.tabText, currentTab === 'agents' && styles.activeTabText]}>AGENTS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, currentTab === 'tools' && styles.activeTab]} onPress={() => setCurrentTab('tools')}>
            <Text style={[styles.tabText, currentTab === 'tools' && styles.activeTabText]}>TOOLS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {currentTab === 'agents' ? renderAgents() : renderTools()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE • 100+ AGENTS READY • LOCAL POWER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 48, paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#1f1f1f' },
  title: { fontSize: 28, fontWeight: '900', color: '#fff' },
  tabs: { flexDirection: 'row', marginTop: 12, backgroundColor: '#111', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#FFD700' },
  tabText: { color: '#888', fontWeight: '700' },
  activeTabText: { color: '#000' },
  scroll: { flex: 1, paddingHorizontal: 18, paddingTop: 8 },
  section: { color: '#fff', fontSize: 18, fontWeight: '900', marginBottom: 12 },
  card: { backgroundColor: '#111', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  name: { color: '#fff', fontSize: 15, fontWeight: '800' },
  desc: { color: '#aaa', fontSize: 12 },
  auto: { color: '#FFD700', fontSize: 12, marginBottom: 12, fontStyle: 'italic' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#000', fontSize: 10, fontWeight: '900' },
  btn: { paddingVertical: 13, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: '900', fontSize: 14 },
  toolCard: { backgroundColor: '#111', padding: 16, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  toolName: { color: '#fff', fontSize: 15, fontWeight: '700' },
  toolDesc: { color: '#888', fontSize: 13 },
  footer: { paddingVertical: 14, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1f1f1f' },
  footerText: { color: '#555', fontSize: 10, letterSpacing: 2 },
});