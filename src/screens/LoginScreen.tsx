import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buscarUsuarios } from '../services/usuarioService';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  const handleLogin = async () => {
    if (!email || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      const usuarios = await buscarUsuarios();
      const usuario = usuarios.find(
        (u: any) => u.email === email && u.senha === senha
      );

      if (usuario) {

        await AsyncStorage.setItem('usuarioId', usuario.id_usuario.toString());
        setError('');
        setMensagem('Login realizado com sucesso!');

        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);

      } else {
        setError('Email ou senha incorretos');
      }

    } catch (e) {
      console.error(e);
      setError('Erro ao conectar com o servidor');
    };

  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-SafeHeat.png')}
        style={styles.logo}
      />
      <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>Bem-Vindo de volta</Text>
      <Text style={[styles.subtitle, { fontFamily: 'MontserratRegular' }]}>Entre com sua conta</Text>

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
      />

      {mensagem ? <Text style={[styles.success, { fontFamily: 'MontserratRegular' }]}>{mensagem}</Text> : null}
      {error ? <Text style={[styles.error, { fontFamily: 'MontserratRegular' }]}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Entrar</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
        <Text style={[styles.linkText, { fontFamily: 'MontserratRegular' }]}>
          Não possui uma conta?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.textLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1C1C1C',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#E5E5E5'
  },
  subtitle: {
    fontSize: 18,
    color: '#A0A0A0',
    fontWeight: 'normal',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#2E2E2E',
    borderColor: '#A2A2A2',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    color: '#A0A0A0'
  },
  button: {
    backgroundColor: '#8A202C',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  linkText: {
    marginTop: 16,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  textLink: {
    marginTop: 16,
    color: '#8A202C',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  success: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;