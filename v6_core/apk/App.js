import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './screens/DashboardScreen';
import ToolsPanelScreen from './screens/ToolsPanelScreen';
import QualityGateScreen from './screens/QualityGateScreen';
import ExportScreen from './screens/ExportScreen';
import HookSelectorScreen from './screens/HookSelectorScreen';
import AgentsPanelScreen from './screens/AgentsPanelScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'V6 CORE Ultimate' }} />
        <Stack.Screen name="HookSelector" component={HookSelectorScreen} options={{ title: 'Hook Selector الذكي' }} />
        <Stack.Screen name="Tools" component={ToolsPanelScreen} options={{ title: 'لوحة الأدوات الذكية' }} />
        <Stack.Screen name="Agents" component={AgentsPanelScreen} options={{ title: 'لوحة الوكلاء' }} />
        <Stack.Screen name="Quality" component={QualityGateScreen} options={{ title: 'Quality Gate' }} />
        <Stack.Screen name="Export" component={ExportScreen} options={{ title: 'Export Center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}