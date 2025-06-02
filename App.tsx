import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaView, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegisterLocalScreen from './src/screens/RegisterLocalScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import AbrigosScreen from './src/screens/AbrigosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Cadastro' component={RegisterScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Local' component={RegisterLocalScreen}/>
        <Stack.Screen name='Alertas' component={AlertsScreen}/>
        <Stack.Screen name='Abrigos' component={AbrigosScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
