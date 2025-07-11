import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<NavigationProp>();

  const [fontsLoaded] = useFonts({
    MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('usuarioId');
      navigation.navigate('Login');
    }
    catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o logout.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>{title}</Text>
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.logoutText, { fontFamily: 'MontserratRegular' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 16,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#8A202C',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  rightSection: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  logoutText: {
    color: '#E5E5E5',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

export default Header;