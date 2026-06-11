import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// V7000 Professional Cinematic Studio - Fully Improved Structure
const sections = [
  { id: 'intelligence', name: 'Intelligence & Strategy', icon: 'analytics', color: '#3B82F6' },
  { id: 'creative', name: 'Creative Development', icon: 'create', color: '#8B5CF6' },
  { id: 'visual', name: 'Visual Production', icon: 'image', color: '#EC4899' },
  { id: 'audio', name: 'Audio Production', icon: 'musical-notes', color: '#10B981' },
  { id: 'post', name: 'Post-Production', icon: 'cut', color: '#F59E0B' },
  { id: 'optimization', name: 'Optimization & Delivery', icon: 'rocket', color: '#06B6D4' },
  { id: 'automation', name: 'Automation & Pipeline', icon: 'settings', color: '#EF4444' },
];

export default function V7000ProfessionalStudio() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [videoTitle, setVideoTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const agentsBySection = {
    intelligence: ['Trend Intelligence', 'Audience Analyzer', 'Competitor Analysis', 'Market Insights'],
    creative: ['Script Architect', 'Hook Master', 'Story Weaver', 'Dialogue Crafter'],
    visual: ['Cinematic Visual', 'Color Science', 'Lighting Director', 'Composition Master'],
    audio: ['Audio Intelligence', 'Music Sync', 'Voice Director'],
    post: ['Smart Editor', 'Pacing Optimizer', 'Effects Pipeline'],
    optimization: ['Video Conversion', 'Platform Optimizer', 'Thumbnail Generator'],
    automation: ['Full Pipeline', 'Batch Processor', 'Quality Guardian'],
  };

  const handleGenerate = () => {
    if (!videoTitle.trim()) {
      Alert.alert('خطأ', 'الرجاء إدخال عنوان الفيديو');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert('تم بنجاح', 'تم إرسال الطلب إلى الاستوديو السينمائي');
      setVideoTitle('');
    }, 1800);
  };

  const renderSectionContent = (sectionId) => {
    const agents = agentsBySection[sectionId] || [];
    return (
      <View>
        <Text style={styles.sectionHeader}>الأجنت المتخصصة</Text>
        {agents.map((agent, index) => (
          <View key={index} style={styles.agentRow}>
            <Ionicons name="person" size={20} color="#A855F7" />
            <Text style={styles.agentText}>{agent}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.actionButton} onPress={handleGenerate}>
          <Text style={styles.actionButtonText}>تشغيل الأتمتة في هذا القسم</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <Text style={styles.logo}>V7000 Cinematic Studio</Text>
      </View>

      {currentSection === 'dashboard' ? (
        <ScrollView style={styles.scroll}>
          <Text style={styles.welcome}>مرحباً بك في الاستوديو السينمائي</Text>
          <Text style={styles.subtitle}>اختر القسم الذي تريد العمل عليه</Text>

          <View style={styles.sectionsGrid}>
            {sections.map((section) => (
              <TouchableOpacity
                key={section.id}
                style={styles.sectionCard}
                onPress={() => setCurrentSection(section.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: section.color + '20' }]}>
                  <Ionicons name={section.icon} size={28} color={section.color} />
                </View>
                <Text style={styles.sectionName}>{section.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.quickGenerate}>
            <Text style={styles.quickTitle}>توليد سريع</Text>
            <TextInput
              style={styles.input}
              placeholder="اكتب عنوان الفيديو..."
              placeholderTextColor="#666"
              value={videoTitle}
              onChangeText={setVideoTitle}
            />
            <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
              <Text style={styles.generateText}>توليد فيديو سينمائي</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.scroll}>
          <TouchableOpacity onPress={() => setCurrentSection('dashboard')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
            <Text style={styles.backText}>العودة للأقسام</Text>
          </TouchableOpacity>

          <Text style={styles.currentSectionTitle}>
            {sections.find(s => s.id === currentSection)?.name}
          </Text>

          {renderSectionContent(currentSection)}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  topBar: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#1f1f1f' },
  logo: { color: '#fff', fontSize: 20, fontWeight: '800' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  welcome: { color: '#fff', fontSize: 24, fontWeight: '800', marginTop: 20 },
  subtitle: { color: '#888', fontSize: 15, marginTop: 6, marginBottom: 24 },
  sectionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  sectionCard: { backgroundColor: '#111', width: '48%', borderRadius: 16, padding: 18, marginBottom: 14, alignItems: 'center' },
  iconContainer: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  sectionName: { color: '#fff', fontSize: 15, fontWeight: '700', textAlign: 'center' },
  quickGenerate: { backgroundColor: '#111', borderRadius: 16, padding: 20, marginTop: 10 },
  quickTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 12 },
  input: { backgroundColor: '#1a1a1a', color: '#fff', padding: 16, borderRadius: 12, fontSize: 16, marginBottom: 12 },
  generateBtn: { backgroundColor: '#A855F7', padding: 16, borderRadius: 12, alignItems: 'center' },
  generateText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { color: '#fff', fontSize: 16, marginLeft: 8 },
  currentSectionTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 20 },
  sectionHeader: { color: '#A855F7', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  agentRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', padding: 14, borderRadius: 12, marginBottom: 8 },
  agentText: { color: '#fff', fontSize: 15, marginLeft: 12 },
  actionButton: { backgroundColor: '#10B981', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  actionButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});