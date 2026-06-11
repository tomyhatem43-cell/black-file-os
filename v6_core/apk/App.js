import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function V6CinematicAgents() {
  const [currentTab, setCurrentTab] = useState('agents');
  const [executing, setExecuting] = useState(null);
  const [logs, setLogs] = useState([]);
  const [agents, setAgents] = useState([
    { id: 'trend', name: 'Trend Intelligence', status: 'idle', desc: 'Analyzes viral trends for short videos', color: '#00D4FF' },
    { id: 'script', name: 'Script Generation', status: 'idle', desc: 'Creates high-retention scripts with hooks', color: '#FFD700' },
    { id: 'visual', name: 'Visual & FFmpeg', status: 'idle', desc: 'Handles video generation, effects, color grading', color: '#FF6B6B' },
    { id: 'editor', name: 'Editor Agent', status: 'idle', desc: 'Advanced editing, pacing, music sync', color: '#A855F7' },
    { id: 'distribution', name: 'Distribution', status: 'idle', desc: 'Optimizes for TikTok, Reels, Shorts', color: '#3DDC84' },
  ]);

  const addLog = useCallback((message) => {
    setLogs(prev => [...prev.slice(-8), { time: new Date().toLocaleTimeString(), message }]);
  }, []);

  const updateAgentStatus = useCallback((id, status) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, status } : agent
    ));
  }, []);

  const runAgent = useCallback((agent) => {
    setExecuting(agent.id);
    updateAgentStatus(agent.id, 'running');
    addLog(`Agent ${agent.name} started...`);

    setTimeout(() => {
      updateAgentStatus(agent.id, 'completed');
      setExecuting(null);
      addLog(`Agent ${agent.name} completed successfully`);

      // Link to commands
      if (agent.id === 'trend') {
        Alert.alert('Trend Agent', 'Trend analysis complete. Ready for script generation.');
      } else if (agent.id === 'script') {
        Alert.alert('Script Agent', 'High-retention script generated with strong hook.');
      } else if (agent.id === 'visual') {
        Alert.alert('Visual Agent', 'Cinematic visuals ready. FFmpeg pipeline prepared.');
      } else if (agent.id === 'editor') {
        Alert.alert('Editor Agent', 'Video edited with perfect pacing and music.');
      } else if (agent.id === 'distribution') {
        Alert.alert('Distribution Agent', 'Optimized for all short video platforms.');
      }
    }, 2200);
  }, [addLog, updateAgentStatus]);

  const renderAgents = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>AI AGENTS CREW</Text>
      {agents.map(agent => (
        <View key={agent.id} style={styles.agentCard}>
          <View style={styles.agentHeader}>
            <View style={[styles.iconBox, { backgroundColor: agent.color + '15' }]}>
              <Ionicons name="person-outline" size={24} color={agent.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.agentName}>{agent.name}</Text>
              <Text style={styles.agentDesc}>{agent.desc}</Text>
            </View>
            <View style={[styles.statusBadge, { 
              backgroundColor: agent.status === 'running' ? '#FFD700' : 
                          agent.status === 'completed' ? '#00FF88' : '#333' 
            }]}>
              <Text style={styles.statusText}>{agent.status.toUpperCase()}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.runButton, { backgroundColor: agent.color }]} 
            onPress={() => runAgent(agent)}
            disabled={executing === agent.id || agent.status === 'running'}
          >
            {executing === agent.id ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator color="#000" size="small" style={{ marginRight: 8 }} />
                <Text style={styles.runText}>RUNNING...</Text>
              </View>
            ) : (
              <Text style={styles.runText}>RUN AGENT</Text>
            )}
          </TouchableOpacity>
        </View>
      ))}

      {logs.length > 0 && (
        <View style={styles.logsBox}>
          <Text style={styles.logsTitle}>AGENT ACTIVITY LOG</Text>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logItem}>• {log.time} — {log.message}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );

  const renderCommands = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>COMMAND CENTER</Text>
      <Text style={{ color: '#666', marginBottom: 16, fontSize: 13 }}>
        Quick commands linked to agents
      </Text>
      {/* Simplified command buttons that trigger agents */}
      <TouchableOpacity style={styles.commandCard} onPress={() => { setCurrentTab('agents'); runAgent(agents[0]); }}>
        <Text style={styles.commandText}>Run Trend Agent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.commandCard} onPress={() => { setCurrentTab('agents'); runAgent(agents[1]); }}>
        <Text style={styles.commandText}>Run Script Agent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.commandCard} onPress={() => { setCurrentTab('agents'); runAgent(agents[2]); }}>
        <Text style={styles.commandText}>Run Visual Agent</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.brand}>V6</Text>
          <Text style={styles.brandGold}>CINEMATIC</Text>
        </View>
        <Text style={styles.tagline}>MULTI-AGENT CONTROL SYSTEM</Text>

        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tab, currentTab === 'agents' && styles.activeTab]} 
            onPress={() => setCurrentTab('agents')}
          >
            <Text style={[styles.tabText, currentTab === 'agents' && styles.activeTabText]}>AGENTS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, currentTab === 'commands' && styles.activeTab]} 
            onPress={() => setCurrentTab('commands')}
          >
            <Text style={[styles.tabText, currentTab === 'commands' && styles.activeTabText]}>COMMANDS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {currentTab === 'agents' ? renderAgents() : renderCommands()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE ULTIMATE • SELF-EVOLVING CINEMATIC AI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 48, paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a1a' },
  brand: { fontSize: 28, fontWeight: '800', color: '#fff' },
  brandGold: { fontSize: 28, fontWeight: '800', color: '#FFD700', marginLeft: 4 },
  tagline: { fontSize: 11, color: '#666', letterSpacing: 2, marginTop: 4 },
  tabBar: { flexDirection: 'row', marginTop: 16, backgroundColor: '#111', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#FFD700' },
  tabText: { color: '#888', fontWeight: '700' },
  activeTabText: { color: '#000' },
  scroll: { flex: 1, paddingHorizontal: 18, paddingTop: 10 },
  section: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 16, letterSpacing: 1 },
  agentCard: { backgroundColor: '#111', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  agentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  agentName: { color: '#fff', fontSize: 16, fontWeight: '700' },
  agentDesc: { color: '#777', fontSize: 13, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { color: '#000', fontSize: 10, fontWeight: '800' },
  runButton: { paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  runText: { color: '#000', fontWeight: '800', fontSize: 14 },
  commandCard: { backgroundColor: '#111', padding: 18, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  commandText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  logsBox: { backgroundColor: '#0f0f0f', borderRadius: 12, padding: 16, marginTop: 16, borderWidth: 1, borderColor: '#222' },
  logsTitle: { color: '#666', fontSize: 12, marginBottom: 8 },
  logItem: { color: '#888', fontSize: 12, marginBottom: 4 },
  footer: { paddingVertical: 14, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1a1a1a' },
  footerText: { color: '#444', fontSize: 9, letterSpacing: 2 },
});