import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Advanced Intelligent Agent System - Dynamic & Modular

const agentFactory = {
  createAgent: (section, specialization) => ({
    id: `${section}-${specialization}`.toLowerCase().replace(/\s+/g, '-'),
    section,
    name: specialization,
    status: 'Active',
    automationLevel: 'Advanced',
    capabilities: [
      `Advanced ${specialization} processing`,
      `Local optimization for ${section}`,
      `Self-improvement protocols`
    ]
  })
};

// Pre-defined high-quality agents per section
const baseAgents = {
  'Intelligence & Strategy': [
    'Trend Intelligence', 'Audience Psychology', 'Competitor Analysis', 
    'Market Prediction', 'Content Strategy AI'
  ],
  'Creative Development': [
    'Script Architect', 'Hook Master', 'Story Weaver', 
    'Dialogue Crafter', 'Emotional Arc Designer'
  ],
  'Visual Production': [
    'Cinematic Visual Engine', 'Color Science', 'Lighting Director',
    'Composition Master', 'Camera Movement AI'
  ],
  'Audio Production': [
    'Audio Intelligence', 'Music Sync', 'Voice Director',
    'Sound Design AI', 'Dynamic Mixing'
  ],
  'Post-Production': [
    'Smart Editor', 'Pacing Optimizer', 'Effects Pipeline',
    'Color Grading AI', 'Transition Designer'
  ],
  'Optimization & Delivery': [
    'Platform Optimizer', 'Thumbnail Generator', 'SEO Optimizer',
    'Format Converter', 'Quality Enhancer'
  ],
  'Automation & Pipeline': [
    'Full Pipeline Orchestrator', 'Batch Processor', 'Quality Guardian',
    'Self-Healing Pipeline', 'Resource Optimizer'
  ]
};

export default function AdvancedAgentSystem() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [customAgentName, setCustomAgentName] = useState('');
  const [agents, setAgents] = useState(baseAgents);

  const sections = Object.keys(agents);

  const createCustomAgent = () => {
    if (!selectedSection || !customAgentName.trim()) {
      Alert.alert('خطأ', 'اختر القسم واكتب اسم الوكيل');
      return;
    }

    const newAgent = agentFactory.createAgent(selectedSection, customAgentName);
    
    setAgents(prev => ({
      ...prev,
      [selectedSection]: [...prev[selectedSection], newAgent.name]
    }));

    setCustomAgentName('');
    Alert.alert('تم الإنشاء', `تم إنشاء وكيل جديد: ${newAgent.name}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>V7000 Agent Factory</Text>
        <Text style={styles.subtitle}>نظام وكلاء ذكي قابل للتوسع</Text>
      </View>

      {!selectedSection ? (
        <ScrollView style={styles.scroll}>
          <Text style={styles.sectionTitle}>اختر القسم</Text>
          {sections.map(section => (
            <TouchableOpacity 
              key={section} 
              style={styles.sectionCard}
              onPress={() => setSelectedSection(section)}
            >
              <Text style={styles.sectionName}>{section}</Text>
              <Text style={styles.agentCount}>
                {agents[section].length} وكيل
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.scroll}>
          <TouchableOpacity onPress={() => setSelectedSection(null)} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
            <Text style={styles.backText}>العودة للأقسام</Text>
          </TouchableOpacity>

          <Text style={styles.sectionHeader}>{selectedSection}</Text>

          <Text style={styles.subHeader}>الوكلاء الحاليون</Text>
          {agents[selectedSection].map((agent, index) => (
            <View key={index} style={styles.agentCard}>
              <Ionicons name="person" size={18} color="#A855F7" />
              <Text style={styles.agentName}>{agent}</Text>
            </View>
          ))}

          <View style={styles.createSection}>
            <Text style={styles.createTitle}>إنشاء وكيل جديد</Text>
            <TextInput
              style={styles.input}
              placeholder="اسم الوكيل الجديد..."
              placeholderTextColor="#666"
              value={customAgentName}
              onChangeText={setCustomAgentName}
            />
            <TouchableOpacity style={styles.createBtn} onPress={createCustomAgent}>
              <Text style={styles.createBtnText}>إنشاء وكيل ذكي</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { padding: 20, paddingTop: 50 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#888', fontSize: 14, marginTop: 4 },
  scroll: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  sectionCard: { backgroundColor: '#111', padding: 18, borderRadius: 14, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionName: { color: '#fff', fontSize: 16, fontWeight: '600' },
  agentCount: { color: '#A855F7', fontSize: 14 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { color: '#fff', marginLeft: 8 },
  sectionHeader: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 16 },
  subHeader: { color: '#888', fontSize: 14, marginBottom: 12 },
  agentCard: { backgroundColor: '#111', padding: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  agentName: { color: '#fff', fontSize: 15, marginLeft: 12 },
  createSection: { marginTop: 30, backgroundColor: '#111', padding: 20, borderRadius: 16 },
  createTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  input: { backgroundColor: '#1a1a1a', color: '#fff', padding: 14, borderRadius: 12, marginBottom: 12 },
  createBtn: { backgroundColor: '#A855F7', padding: 16, borderRadius: 12, alignItems: 'center' },
  createBtnText: { color: '#fff', fontWeight: '700' },
});