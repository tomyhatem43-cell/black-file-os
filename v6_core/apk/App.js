import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Clipboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Video Conversion Tools
const videoConversionTools = [
  {
    id: 'to_mp4_h264',
    category: 'Format Conversion',
    name: 'Convert to MP4 (H.264)',
    desc: 'Standard high compatibility MP4 conversion',
    command: 'ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k output.mp4',
    level: 'Beginner'
  },
  {
    id: 'to_mp4_h265',
    category: 'Format Conversion',
    name: 'Convert to MP4 (H.265/HEVC)',
    desc: 'Better compression with H.265 codec',
    command: 'ffmpeg -i input.mp4 -c:v libx265 -preset medium -crf 28 -c:a aac -b:a 128k output_h265.mp4',
    level: 'Intermediate'
  },
  {
    id: 'to_webm',
    category: 'Format Conversion',
    name: 'Convert to WebM (VP9)',
    desc: 'Web-optimized format with good quality',
    command: 'ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm',
    level: 'Intermediate'
  },
  {
    id: 'to_mov',
    category: 'Format Conversion',
    name: 'Convert to MOV (ProRes)',
    desc: 'High quality editing format (large file size)',
    command: 'ffmpeg -i input.mp4 -c:v prores_ks -profile:v 3 -c:a pcm_s16le output.mov',
    level: 'Advanced'
  },
  {
    id: 'to_720p',
    category: 'Resolution',
    name: 'Convert to 720p',
    desc: 'Resize to 1280x720 while maintaining aspect ratio',
    command: 'ffmpeg -i input.mp4 -vf "scale=1280:-2" -c:a copy output_720p.mp4',
    level: 'Beginner'
  },
  {
    id: 'to_1080p',
    category: 'Resolution',
    name: 'Convert to 1080p',
    desc: 'Resize to Full HD (1920x1080)',
    command: 'ffmpeg -i input.mp4 -vf "scale=1920:-2" -c:a copy output_1080p.mp4',
    level: 'Beginner'
  },
  {
    id: 'to_4k',
    category: 'Resolution',
    name: 'Convert to 4K',
    desc: 'Upscale/convert to 3840x2160',
    command: 'ffmpeg -i input.mp4 -vf "scale=3840:-2" -c:a copy output_4k.mp4',
    level: 'Intermediate'
  },
  {
    id: 'change_fps_30',
    category: 'Frame Rate',
    name: 'Change to 30 FPS',
    desc: 'Convert video frame rate to 30fps',
    command: 'ffmpeg -i input.mp4 -r 30 -c:v libx264 -preset medium -crf 23 -c:a copy output_30fps.mp4',
    level: 'Intermediate'
  },
  {
    id: 'change_fps_60',
    category: 'Frame Rate',
    name: 'Change to 60 FPS',
    desc: 'Convert video to smooth 60fps',
    command: 'ffmpeg -i input.mp4 -r 60 -c:v libx264 -preset medium -crf 23 -c:a copy output_60fps.mp4',
    level: 'Intermediate'
  },
  {
    id: 'extract_audio',
    category: 'Audio Extraction',
    name: 'Extract Audio Only (MP3)',
    desc: 'Extract audio track as high quality MP3',
    command: 'ffmpeg -i input.mp4 -q:a 0 -map a output_audio.mp3',
    level: 'Beginner'
  },
  {
    id: 'extract_audio_wav',
    category: 'Audio Extraction',
    name: 'Extract Audio (WAV - Uncompressed)',
    desc: 'Extract lossless audio for editing',
    command: 'ffmpeg -i input.mp4 -vn -acodec pcm_s16le output_audio.wav',
    level: 'Beginner'
  },
  {
    id: 'compress_small',
    category: 'Optimization',
    name: 'Compress for Smaller Size',
    desc: 'Reduce file size while keeping good quality',
    command: 'ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slower -c:a aac -b:a 96k output_small.mp4',
    level: 'Intermediate'
  },
  {
    id: 'vertical_9_16',
    category: 'Platform Specific',
    name: 'Convert to Vertical 9:16',
    desc: 'Convert horizontal video to vertical (TikTok/Reels)',
    command: 'ffmpeg -i input.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" -c:a copy output_vertical.mp4',
    level: 'Intermediate'
  },
];

export default function V6VideoConversionTools() {
  const [currentTab, setCurrentTab] = useState('conversion');
  const [executing, setExecuting] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((message) => {
    setLogs(prev => [...prev.slice(-12), { time: new Date().toLocaleTimeString(), message }]);
  }, []);

  const runConversion = useCallback((tool) => {
    setExecuting(tool.id);
    addLog(`[Conversion] ${tool.name}`);

    setTimeout(() => {
      setExecuting(null);
      addLog(`[SUCCESS] Command copied`);
      
      Alert.alert(
        tool.name,
        `${tool.desc}\n\nLevel: ${tool.level}\n\nCommand copied to clipboard.`
      );
      Clipboard.setString(tool.command);
    }, 1600);
  }, [addLog]);

  const renderConversionTools = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>VIDEO CONVERSION TOOLS</Text>
      <Text style={styles.sub}>Format • Resolution • Frame Rate • Audio • Optimization</Text>

      {videoConversionTools.map(tool => (
        <View key={tool.id} style={styles.card}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={styles.toolDesc}>{tool.desc}</Text>
            </View>
            <View style={[styles.levelBadge, { 
              backgroundColor: tool.level === 'Advanced' ? '#FF6B6B' : 
                          tool.level === 'Intermediate' ? '#FFD700' : '#30D158' 
            }]}>
              <Text style={styles.levelText}>{tool.level}</Text>
            </View>
          </View>
          
          <Text style={styles.category}>{tool.category}</Text>
          
          <TouchableOpacity 
            style={styles.runBtn} 
            onPress={() => runConversion(tool)}
            disabled={executing === tool.id}
          >
            {executing === tool.id ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator color="#000" size="small" style={{ marginRight: 8 }} />
                <Text style={styles.btnText}>GENERATING...</Text>
              </View>
            ) : (
              <Text style={styles.btnText}>COPY COMMAND</Text>
            )}
          </TouchableOpacity>
        </View>
      ))}

      {logs.length > 0 && (
        <View style={styles.logsBox}>
          <Text style={styles.logsTitle}>CONVERSION LOG</Text>
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
        <Text style={styles.title}>V6 <Text style={{ color: '#FFD700' }}>CONVERSION</Text></Text>
        <Text style={styles.subtitle}>VIDEO CONVERSION STUDIO</Text>
      </View>

      {renderConversionTools()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE • VIDEO CONVERSION TOOLS • LOCAL POWER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 48, paddingHorizontal: 20, paddingBottom: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1f1f1f' },
  title: { fontSize: 26, fontWeight: '900', color: '#fff' },
  subtitle: { fontSize: 13, color: '#666', letterSpacing: 2, marginTop: 4 },
  scroll: { flex: 1, paddingHorizontal: 18, paddingTop: 8 },
  section: { color: '#fff', fontSize: 18, fontWeight: '900', marginBottom: 4 },
  sub: { color: '#888', fontSize: 13, marginBottom: 16 },
  card: { backgroundColor: '#111', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  toolName: { color: '#fff', fontSize: 16, fontWeight: '800' },
  toolDesc: { color: '#aaa', fontSize: 13, marginTop: 2 },
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