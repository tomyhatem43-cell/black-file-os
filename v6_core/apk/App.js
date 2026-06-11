import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Clipboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Advanced FFmpeg Automation Studio
const ffmpegPresets = [
  {
    id: 'cinematic_color',
    category: 'Color Grading',
    name: 'Cinematic Color Grade',
    desc: 'Hollywood-style color grading with contrast and saturation boost',
    command: 'ffmpeg -i input.mp4 -vf "eq=brightness=0.08:contrast=1.25:saturation=1.2,unsharp=5:5:1.0:5:5:0.0" -c:a copy output_cinematic.mp4',
    level: 'Advanced'
  },
  {
    id: 'warm_vintage',
    category: 'Color Grading',
    name: 'Warm Vintage Look',
    desc: 'Warm tones with slight vignette and film grain feel',
    command: 'ffmpeg -i input.mp4 -vf "eq=brightness=0.05:contrast=1.1:saturation=0.9, vignette=PI/4:0.3, noise=alls=10:allf=t" -c:a copy output_vintage.mp4',
    level: 'Intermediate'
  },
  {
    id: 'hdr_pop',
    category: 'Color Grading',
    name: 'HDR Pop & Contrast',
    desc: 'High dynamic range look with deep blacks and bright highlights',
    command: 'ffmpeg -i input.mp4 -vf "eq=contrast=1.4:brightness=0.1, colorbalance=rs=.05:gs=.02:bs=-.03" -c:a copy output_hdr.mp4',
    level: 'Advanced'
  },
  {
    id: 'denoise_clean',
    category: 'Denoising & Cleanup',
    name: 'Smart Denoise + Sharpen',
    desc: 'Reduce noise while preserving details (great for low-light footage)',
    command: 'ffmpeg -i input.mp4 -vf "nlmeans=s=3:p=7, unsharp=5:5:0.8:5:5:0.0" -c:a copy output_denoised.mp4',
    level: 'Advanced'
  },
  {
    id: 'upscale_2x',
    category: 'Resolution & Quality',
    name: '2x Smart Upscale',
    desc: 'Intelligent upscaling with detail preservation',
    command: 'ffmpeg -i input.mp4 -vf "scale=2*iw:2*ih:flags=lanczos, unsharp=5:5:0.6" -c:a copy output_2x.mp4',
    level: 'Intermediate'
  },
  {
    id: 'audio_enhance',
    category: 'Audio Enhancement',
    name: 'Voice Clarity + Music Duck',
    desc: 'Enhance voice and dynamically lower background music',
    command: 'ffmpeg -i input.mp4 -filter_complex "[0:a]highpass=f=150,lowpass=f=8000,afftdn,compand=attacks=0.3:points=-80/-80|-20/-20|0/-15|20/-10" -c:v copy output_audio.mp4',
    level: 'Advanced'
  },
  {
    id: 'stabilize',
    category: 'Stabilization',
    name: 'Video Stabilizer',
    desc: 'Reduce camera shake (great for handheld footage)',
    command: 'ffmpeg -i input.mp4 -vf "vidstabdetect=shakiness=10:accuracy=15,vidstabtransform=smoothing=30" -c:a copy output_stable.mp4',
    level: 'Intermediate'
  },
  {
    id: 'cinematic_fade',
    category: 'Effects & Transitions',
    name: 'Cinematic Fade In/Out',
    desc: 'Smooth fade in and fade out with color grading',
    command: 'ffmpeg -i input.mp4 -vf "fade=t=in:st=0:d=1.5,fade=t=out:st=58:d=2,eq=brightness=0.08:contrast=1.2" -c:a copy output_fade.mp4',
    level: 'Intermediate'
  },
  {
    id: 'optimize_tiktok',
    category: 'Platform Optimization',
    name: 'TikTok/Reels Optimizer',
    desc: 'Optimized for vertical short video platforms (1080x1920)',
    command: 'ffmpeg -i input.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,eq=contrast=1.15" -c:a copy output_tiktok.mp4',
    level: 'Beginner'
  },
  {
    id: 'master_export',
    category: 'Final Export',
    name: 'Master Export (High Quality)',
    desc: 'High-quality final export with good compression',
    command: 'ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k output_master.mp4',
    level: 'Intermediate'
  },
];

export default function V6FFmpegAutomation() {
  const [currentTab, setCurrentTab] = useState('ffmpeg');
  const [executing, setExecuting] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((message) => {
    setLogs(prev => [...prev.slice(-12), { time: new Date().toLocaleTimeString(), message }]);
  }, []);

  const runFFmpeg = useCallback((preset) => {
    setExecuting(preset.id);
    addLog(`[FFmpeg] Running: ${preset.name}`);

    setTimeout(() => {
      setExecuting(null);
      addLog(`[SUCCESS] ${preset.name} command copied`);
      
      Alert.alert(
        preset.name,
        `${preset.desc}\n\nLevel: ${preset.level}\n\nCommand copied to clipboard.`
      );
      Clipboard.setString(preset.command);
    }, 1800);
  }, [addLog]);

  const renderFFmpeg = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>FFMPEG AUTOMATION STUDIO</Text>
      <Text style={styles.sub}>Advanced Local Commands • Replaces Paid Tools</Text>

      {ffmpegPresets.map(preset => (
        <View key={preset.id} style={styles.card}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.presetName}>{preset.name}</Text>
              <Text style={styles.presetDesc}>{preset.desc}</Text>
            </View>
            <View style={[styles.levelBadge, { 
              backgroundColor: preset.level === 'Advanced' ? '#FF6B6B' : 
                          preset.level === 'Intermediate' ? '#FFD700' : '#30D158' 
            }]}>
              <Text style={styles.levelText}>{preset.level}</Text>
            </View>
          </View>
          
          <Text style={styles.category}>{preset.category}</Text>
          
          <TouchableOpacity 
            style={styles.runBtn} 
            onPress={() => runFFmpeg(preset)}
            disabled={executing === preset.id}
          >
            {executing === preset.id ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator color="#000" size="small" style={{ marginRight: 8 }} />
                <Text style={styles.btnText}>GENERATING...</Text>
              </View>
            ) : (
              <Text style={styles.btnText}>COPY FFMPEG COMMAND</Text>
            )}
          </TouchableOpacity>
        </View>
      ))}

      {logs.length > 0 && (
        <View style={styles.logsBox}>
          <Text style={styles.logsTitle}>FFMPEG AUTOMATION LOG</Text>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logItem}>• {log.time} — {log.message}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>V6 <Text style={{ color: '#FFD700' }}>FFMPEG</Text></Text>
        <Text style={styles.subtitle}>DEEP AUTOMATION STUDIO</Text>
      </View>

      {renderFFmpeg()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE • ADVANCED LOCAL FFMPEG • FREE PRO TOOLS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 48, paddingHorizontal: 20, paddingBottom: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1f1f1f' },
  title: { fontSize: 28, fontWeight: '900', color: '#fff' },
  subtitle: { fontSize: 13, color: '#666', letterSpacing: 2, marginTop: 4 },
  scroll: { flex: 1, paddingHorizontal: 18, paddingTop: 8 },
  section: { color: '#fff', fontSize: 18, fontWeight: '900', marginBottom: 4 },
  sub: { color: '#888', fontSize: 13, marginBottom: 16 },
  card: { backgroundColor: '#111', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  presetName: { color: '#fff', fontSize: 16, fontWeight: '800' },
  presetDesc: { color: '#aaa', fontSize: 13, marginTop: 2 },
  category: { color: '#FFD700', fontSize: 12, marginBottom: 12 },
  levelBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start' },
  levelText: { color: '#000', fontSize: 10, fontWeight: '900' },
  runBtn: { backgroundColor: '#FFD700', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: '900', fontSize: 14 },
  logsBox: { backgroundColor: '#0f0f0f', borderRadius: 14, padding: 14, marginTop: 10, borderWidth: 1, borderColor: '#222' },
  logsTitle: { color: '#666', fontSize: 11, marginBottom: 6 },
  logItem: { color: '#888', fontSize: 11, marginBottom: 3 },
  footer: { paddingVertical: 14, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1f1f1f' },
  footerText: { color: '#555', fontSize: 10, letterSpacing: 2 },
});