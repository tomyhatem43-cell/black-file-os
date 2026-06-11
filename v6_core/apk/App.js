import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Clipboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Image Processing Tools
const imageProcessingTools = [
  {
    id: 'convert_jpg_png',
    category: 'Format Conversion',
    name: 'Convert JPG to PNG',
    desc: 'Convert image format from JPG to PNG (lossless)',
    command: 'convert input.jpg output.png',
    level: 'Beginner'
  },
  {
    id: 'convert_png_webp',
    category: 'Format Conversion',
    name: 'Convert PNG to WebP',
    desc: 'Modern format with better compression',
    command: 'convert input.png -quality 85 output.webp',
    level: 'Intermediate'
  },
  {
    id: 'resize_1080',
    category: 'Resize & Optimize',
    name: 'Resize to 1080px Width',
    desc: 'Resize image while maintaining aspect ratio',
    command: 'convert input.jpg -resize 1080x output_1080.jpg',
    level: 'Beginner'
  },
  {
    id: 'resize_thumbnail',
    category: 'Resize & Optimize',
    name: 'Create Thumbnail (300px)',
    desc: 'Create small thumbnail for previews',
    command: 'convert input.jpg -resize 300x -quality 85 thumbnail.jpg',
    level: 'Beginner'
  },
  {
    id: 'batch_resize',
    category: 'Resize & Optimize',
    name: 'Batch Resize All Images',
    desc: 'Resize all JPGs in folder to 1080px',
    command: 'for img in *.jpg; do convert "$img" -resize 1080x "resized_$img"; done',
    level: 'Intermediate'
  },
  {
    id: 'add_watermark',
    category: 'Branding',
    name: 'Add Watermark (Bottom Right)',
    desc: 'Add semi-transparent watermark to image',
    command: 'composite -gravity southeast -geometry +20+20 watermark.png input.jpg output_watermarked.jpg',
    level: 'Intermediate'
  },
  {
    id: 'image_to_video',
    category: 'Video Creation',
    name: 'Image Sequence to Video',
    desc: 'Convert folder of images to video (25fps)',
    command: 'ffmpeg -framerate 25 -pattern_type glob -i "*.jpg" -c:v libx264 -pix_fmt yuv420p output.mp4',
    level: 'Intermediate'
  },
  {
    id: 'extract_frames',
    category: 'Video Creation',
    name: 'Extract Frames from Video',
    desc: 'Extract all frames as images (for editing)',
    command: 'ffmpeg -i input.mp4 -vf fps=1 frame_%04d.jpg',
    level: 'Intermediate'
  },
  {
    id: 'cinematic_thumbnail',
    category: 'Thumbnail Creation',
    name: 'Cinematic Thumbnail Style',
    desc: 'Apply cinematic color grade to thumbnail',
    command: 'convert input.jpg -modulate 100,120,100 -color-matrix "0.9 0.1 0 0 0.1 0.9 0 0 0 0 1 0" output_cinematic.jpg',
    level: 'Advanced'
  },
  {
    id: 'auto_enhance',
    category: 'Enhancement',
    name: 'Auto Enhance Image',
    desc: 'Automatic brightness, contrast and color correction',
    command: 'convert input.jpg -auto-gamma -auto-level -modulate 100,110,100 output_enhanced.jpg',
    level: 'Intermediate'
  },
  {
    id: 'remove_background',
    category: 'Advanced Editing',
    name: 'Remove Background (Simple)',
    desc: 'Basic background removal (works best with solid backgrounds)',
    command: 'convert input.jpg -fuzz 20% -transparent white output_transparent.png',
    level: 'Intermediate'
  },
];

export default function V6ImageProcessingTools() {
  const [currentTab, setCurrentTab] = useState('images');
  const [executing, setExecuting] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((message) => {
    setLogs(prev => [...prev.slice(-12), { time: new Date().toLocaleTimeString(), message }]);
  }, []);

  const runImageTool = useCallback((tool) => {
    setExecuting(tool.id);
    addLog(`[Image] ${tool.name}`);

    setTimeout(() => {
      setExecuting(null);
      addLog(`[SUCCESS] Command copied`);
      
      Alert.alert(
        tool.name,
        `${tool.desc}\n\nLevel: ${tool.level}\n\nCommand copied to clipboard.`
      );
      Clipboard.setString(tool.command);
    }, 1400);
  }, [addLog]);

  const renderImageTools = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.section}>IMAGE PROCESSING TOOLS</Text>
      <Text style={styles.sub}>Format • Resize • Watermark • Video Creation • Enhancement</Text>

      {imageProcessingTools.map(tool => (
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
            onPress={() => runImageTool(tool)}
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
          <Text style={styles.logsTitle}>IMAGE PROCESSING LOG</Text>
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
        <Text style={styles.title}>V6 <Text style={{ color: '#FFD700' }}>IMAGES</Text></Text>
        <Text style={styles.subtitle}>IMAGE PROCESSING STUDIO</Text>
      </View>

      {renderImageTools()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE • IMAGE TOOLS • LOCAL PRODUCTION</Text>
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