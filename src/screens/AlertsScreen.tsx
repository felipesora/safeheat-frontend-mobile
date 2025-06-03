import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import CardAlerta from '../components/CardAlerta';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Alertas'>;
type RouteParams = RouteProp<RootStackParamList, 'Alertas'>;

const AlertsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  const { local } = route.params;

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.header}>
      <Header title="Alertas" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Alertas do local</Text>

          <View style={styles.cardsContainer}>
            {local.alertas.length === 0 ? (
              <Text style={styles.semAlerta}>Nenhum alerta registrado para este local.</Text>
            ) : (
              local.alertas.map((alerta) => (
                <CardAlerta key={alerta.id_alerta} temperatura={alerta.temperatura} nivelRisco={alerta.nivel_risco} descricao={alerta.mensagem} dataHora={alerta.data_alerta} />
              ))
            )}
          </View>

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
  semAlerta: {
    color: '#aaa',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default AlertsScreen;