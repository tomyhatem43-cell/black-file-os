import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function V6CinematicInterface() {
  const [currentPage, setCurrentPage] = useState('main');

  const commands = [
    { 
      id: 'build', 
      label: 'BUILD SYSTEM', 
      description: 'Build complete system layer & infrastructure', 
      icon: 'construct-outline',
      iconLib: 'Ionicons',
      color: '#FFD700'
    },
    { 
      id: 'video', 
      label: 'CINEMATIC PIPELINE', 
      description: 'Advanced FFmpeg video processing & effects', 
      icon: 'videocam-outline',
      iconLib: 'Ionicons',
      color: '#00D4FF'
    },
    { 
      id: 'android', 
      label: 'ANDROID BUILD', 
      description: 'Generate production-ready APK', 
      icon: 'logo-android',
      iconLib: 'Ionicons',
      color: '#3DDC84'
    },
    { 
      id: 'web', 
      label: 'WEB STUDIO', 
      description: 'Launch & manage web version', 
      icon: 'globe-outline',
      iconLib: 'Ionicons',
      color: '#FF6B6B'
    },
    { 
      id: 'analyze', 
      label: 'SYSTEM ANALYSIS', 
      description: 'Full system diagnostics & monitoring', 
      icon: 'analytics-outline',
      iconLib: 'Ionicons',
      color: '#A855F7'
    },
  ];

  const renderIcon = (command) => {
    const IconComponent = command.iconLib === 'Ionicons' ? Ionicons : MaterialIcons;
    return <IconComponent name={command.icon} size={28} color={command.color} />;
  };

  const handleCommand = (command) => {
    setCurrentPage(command.id);
  };

  const goBack = () => {
    setCurrentPage('main');
  };

  // Render different pages based on selection
  const renderPage = () => {
    if (currentPage === 'main') {
      return (
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
                  {renderIcon(command)}
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
    }

    // Individual Pages
    return (
      <View style={styles.pageContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#FFD700" />
          <Text style={styles.backText}>Back to Command Center</Text>
        </TouchableOpacity>

        <View style={styles.pageContent}>
          <Text style={styles.pageTitle}>
            {commands.find(c => c.id === currentPage)?.label}
          </Text>
          <Text style={styles.pageDescription}>
            {commands.find(c => c.id === currentPage)?.description}
          </Text>

          {/* Placeholder content for each page */}
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderText}>
              {currentPage === 'build' && 'System build module will be integrated here.'}
              {currentPage === 'video' && 'FFmpeg cinematic pipeline controls will appear here.'}
              {currentPage === 'android' && 'EAS Build configuration and APK generation options.'}
              {currentPage === 'web' && 'Web studio and deployment controls.'}
              {currentPage === 'analyze' && 'System diagnostics and performance metrics.'}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Action', `Executing ${currentPage} command...`)}
          >
            <Text style={styles.actionButtonText}>EXECUTE COMMAND</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Cinematic Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>V6</Text>
          <Text style={styles.titleGold}>CINEMATIC</Text>
        </View>
        <Text style={styles.subtitle}>CONTROL SYSTEM</Text>
        
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>ALL SYSTEMS OPERATIONAL</Text>
        </View>
      </View>

      {renderPage()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V6 CORE ULTIMATE • CINEMATIC AI PRODUCTION STUDIO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingTop: 55,
    paddingHorizontal: 24,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
  },
  titleGold: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFD700',
    letterSpacing: 2,
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#777',
    letterSpacing: 4,
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: '#111',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 7,
    height: 7,
    backgroundColor: '#00FF88',
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: '#00FF88',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    color: '#666',
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 16,
    marginLeft: 8,
  },
  commandCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  commandLabel: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  commandDescription: {
    color: '#777',
    fontSize: 13,
    lineHeight: 18,
  },
  pageContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    color: '#FFD700',
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '600',
  },
  pageContent: {
    flex: 1,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
  pageDescription: {
    color: '#888',
    fontSize: 15,
    marginBottom: 40,
  },
  placeholderBox: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#222',
  },
  placeholderText: {
    color: '#777',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  footer: {
    paddingVertical: 18,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1f1f1f',
  },
  footerText: {
    color: '#444',
    fontSize: 10,
    letterSpacing: 2,
  },
});