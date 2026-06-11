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
    const loadMemory = async () => {
      try {
        const savedMemory = await AsyncStorage.getItem('v6Memory');
        if (savedMemory) {
          setMemory(JSON.parse(savedMemory));
        }
      } catch (e) {
        console.log('Error loading memory:', e);
      }
    };
    loadMemory();
  }, []);

  const updateMemory = async (newData) => {
    try {
      const updatedMemory = { ...memory, ...newData };
      setMemory(updatedMemory);
      await AsyncStorage.setItem('v6Memory', JSON.stringify(updatedMemory));
    } catch (e) {
      console.log('Error saving memory:', e);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen 
          name="Dashboard" 
          options={{ title: 'V6 CORE Ultimate' }}
        >
          {props => <DashboardScreen {...props} memory={memory} updateMemory={updateMemory} />}
        </Stack.Screen>
        <Stack.Screen name="HookSelector" component={HookSelectorScreen} options={{ title: 'Hook Selector' }} />
        <Stack.Screen name="Tools" component={ToolsPanelScreen} options={{ title: 'Smart Tools' }} />
        <Stack.Screen name="Agents" component={AgentsPanelScreen} options={{ title: 'Agents Panel' }} />
        <Stack.Screen name="Quality" component={QualityGateScreen} options={{ title: 'Quality Gate' }} />
        <Stack.Screen name="Export" component={ExportScreen} options={{ title: 'Export Center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}