import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { cadastrarUsuario } from '../services/usuarioService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mensagem, SetMensagem] = useState<string>('');

  //   const handleRegister = async () => {
  //     if (!name || !email || !password) {
  //       setError('Preencha todos os campos!');
  //       return;
  //     }

  //     try {
  //       const existingUsers = await AsyncStorage.getItem('users');
  //       const users = existingUsers ? JSON.parse(existingUsers) : [];

  //       const emailExists = users.some((user: any) => user.email === email);
  //       if (emailExists) {
  //         setError('Este e-mail já está cadastrado.');
  //         return;
  //       }

  //       const newUser = { name, email, password };
  //       const updatedUsers = [...users, newUser];

  //       await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

  //       setError('');
  //       SetMensagem('Cadastro realizado!');

  //       setTimeout(() => {
  //         setError('');
  //         SetMensagem('');
  //         navigation.navigate('Login');
  //       }, 2000);

  //     } catch (e) {
  //       console.error('Erro ao salvar no AsyncStorage', e);
  //       alert('Não foi possível realizar o cadastro.');
  //     }
  //   };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Preencha todos os campos!');
      return;
    }

    try {
      await cadastrarUsuario({
        nome: name,
        email: email,
        senha: password
      });

      setError('');
      SetMensagem('Cadastro realizado com sucesso!');

      setTimeout(() => {
        SetMensagem('');
        navigation.navigate('Login');
      }, 2000);
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-SafeHeat.png')}
        style={styles.logo}
      />
      <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>Bem-vindo à <span style={styles.titleLogo}>SafeHeat</span></Text>
      <Text style={[styles.subtitle, { fontFamily: 'MontserratRegular' }]}>Cadastre-se para acessar o dashboard</Text>

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
      />

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
      />

      {mensagem ? <Text style={[styles.success, { fontFamily: 'MontserratRegular' }]}>{mensagem}</Text> : null}
      {error ? <Text style={[styles.error, { fontFamily: 'MontserratRegular' }]}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}> 
        <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
        <Text style={[styles.linkText, { fontFamily: 'MontserratRegular' }]}>
          Já possui uma conta?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textLink}>Faça login</Text>
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
  titleLogo: {
    color: '#8A202C'
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

export default RegisterScreen;