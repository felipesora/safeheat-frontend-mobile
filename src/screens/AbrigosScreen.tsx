import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import CardAbrigo from '../components/CardAbrigo';
import { buscarAbrigos, Abrigo } from '../services/abrigosService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AbrigosScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [carregando, setCarregando] = useState(true);

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    const carregarAbrigos = async () => {
      try {
        const data = await buscarAbrigos();
        setAbrigos(data);
      } catch (error) {
        console.error('Erro ao carregar abrigos:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarAbrigos();
  }, []);

  return (
    <View style={styles.header}>
      <Header title="Abrigos" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Abrigos Disponíveis</Text>

          {/* Abrigo fixo */}
          <View style={styles.cardsContainer}>
            <CardAbrigo
              nome="Abrigo Central"
              endereco="Rua Fictícia, 123 - Bairro Exemplo, Cidade Teste - SP"
              ocupacao={45}
              total={150}
            />
          </View>

          {/* Lista vinda da API */}
          {carregando ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            abrigos.map((abrigo) => (
              <View style={styles.cardsContainer} key={abrigo.id}>
                <CardAbrigo
                  nome={abrigo.nome}
                  endereco={`${abrigo.rua}, ${abrigo.numero} - ${abrigo.bairro}, ${abrigo.cidade} - ${abrigo.estado}`}
                  ocupacao={abrigo.ocupacaoAtual}
                  total={abrigo.capacidadeTotal}
                />
              </View>
            ))
          )}
          <View>
            <TouchableOpacity style={styles.btnVoltar} onPress={handleBackToHome}>
              <Text style={[styles.btnVoltarText, { fontFamily: 'MontserratRegular' }]}>Voltar</Text>
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
  btnVoltar: {
    backgroundColor: '#8A202C',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  btnVoltarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AbrigosScreen;