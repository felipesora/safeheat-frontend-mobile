import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import CardLocal from '../components/CardLocal';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { buscarLocaisPorUsuario, Local } from '../services/usuarioService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [locais, setLocais] = useState<Local[]>([]);

  const navigateToRegister = () => {
    navigation.navigate('Local');
  };

  const carregarLocais = async () => {
    try {
      const idUsuario = await AsyncStorage.getItem('usuarioId');
      if (!idUsuario) return;

      const locaisEncontrados = await buscarLocaisPorUsuario(Number(idUsuario));
      setLocais(locaisEncontrados);
    } catch (error) {
      console.error('Erro ao carregar locais:', error);
    }
  };

  useEffect(() => {
    carregarLocais();
  }, []);



  return (
    <View style={styles.header}>
      <Header title="Página Inicial" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Locais Cadastrados</Text>
          <View style={styles.cardsContainer}>
            {locais.length === 0 ? (
              <Text style={styles.semAlerta}>Nenhum Local registrado.</Text>
            ) : (
              locais.map((local) => (
                <CardLocal
                  key={local.id_local}
                  nome={local.nome}
                  temperatura={local.alertas.at(-1)?.temperatura ?? 'N/A'}
                  endereco={`${local.rua}, ${local.numero} - ${local.bairro}, ${local.cidade} - ${local.estado}`}
                  alertas={local.alertas.length}
                  localCompleto={local}
                  onDelete={carregarLocais}
                />
              ))
            )}
            {/* {locais.map((local) => (
              <CardLocal
                key={local.id_local}
                nome={local.nome}
                temperatura={local.alertas.at(-1)?.temperatura ?? 'N/A'}
                endereco={`${local.rua}, ${local.numero} - ${local.bairro}, ${local.cidade} - ${local.estado}`}
                alertas={local.alertas.length}
                localCompleto={local}
                onDelete={carregarLocais}
              />
            ))} */}
          </View>

          <View>

            <TouchableOpacity style={styles.btnCadastrar} onPress={navigateToRegister}>
              <Image
                source={require('../../assets/images/icone-plus.png')}
              />
              <Text style={[styles.btnText, { fontFamily: 'MontserratRegular' }]}>Cadastrar Local</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1C1C1C',
  },
  content: {
    justifyContent: 'center',
  },
  title: {
    color: '#E5E5E5',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnCadastrar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#8A202C',
    borderRadius: 8,
    marginBottom: 16,
    gap: 10
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  semAlerta: {
    color: '#aaa',
    fontSize: 16,
    fontStyle: 'italic',
  }
});

export default HomeScreen;