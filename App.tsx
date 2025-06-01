import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaView, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegisterLocalScreen from './src/screens/RegisterLocalScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Local'>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Cadastro' component={RegisterScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Local' component={RegisterLocalScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
