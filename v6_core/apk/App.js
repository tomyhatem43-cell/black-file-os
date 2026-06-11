import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardScreen from './screens/DashboardScreen';
import ToolsPanelScreen from './screens/ToolsPanelScreen';
import QualityGateScreen from './screens/QualityGateScreen';
import ExportScreen from './screens/ExportScreen';
import HookSelectorScreen from './screens/HookSelectorScreen';
import AgentsPanelScreen from './screens/AgentsPanelScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [memory, setMemory] = useState({});

  useEffect(() => {
    // Load self-evolving memory
    const loadMemory = async () => {
      try {
        const savedMemory = await AsyncStorage.getItem('v6Memory');
        if (savedMemory) {
          setMemory(JSON.parse(savedMemory));
        }
      } catch (e) {
        console.log('Memory load error');
      }
    };
    loadMemory();
  }, []);

  const updateMemory = async (newMemory) => {
    const updated = { ...memory, ...newMemory };
    setMemory(updated);
    await AsyncStorage.setItem('v6Memory', JSON.stringify(updated));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" options={{ title: 'V6 CORE Ultimate - الاستوديو الذكي الإعجازي' }}>
          {(props) => <DashboardScreen {...props} memory={memory} updateMemory={updateMemory} />}
        </Stack.Screen>
        <Stack.Screen name="HookSelector" component={HookSelectorScreen} options={{ title: 'Hook Selector الذكي المتطور ذاتياً' }} />
        <Stack.Screen name="Tools" component={ToolsPanelScreen} options={{ title: 'لوحة الأدوات الذكية الكاملة' }} />
        <Stack.Screen name="Agents" component={AgentsPanelScreen} options={{ title: 'لوحة الوكلاء الذكية' }} />
        <Stack.Screen name="Quality" component={QualityGateScreen} options={{ title: 'Quality Gate - التدقيق الآلي الخارق' }} />
        <Stack.Screen name="Export" component={ExportScreen} options={{ title: 'Export Center - التصدير الاحترافي مع الحماية' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}