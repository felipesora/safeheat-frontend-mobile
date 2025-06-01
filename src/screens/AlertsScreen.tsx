import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import CardAlerta from '../components/CardAlerta';
import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AlertsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // const [totalMotos, setTotalMotos] = useState(0);
  // const [emAnalise, setEmAnalise] = useState(0);
  // const [emManutencao, setEmManutencao] = useState(0);
  // const [prontas, setProntas] = useState(0);

    const handleBackToHome = () => {
        navigation.navigate('Home');
    };

  // const navigateToList = () => {
  //   navigation.navigate('ListMotos');
  // };

  // useEffect(() => {
  //   const loadMotos = async () => {
  //     const stored = await AsyncStorage.getItem('motos');
  //     if (stored) {
  //       const motos = JSON.parse(stored);

  //       setTotalMotos(motos.length);

  //       const analise = motos.filter((moto: any) => moto.departamento === 'AVALIAÇÃO').length;
  //       const manutencao = motos.filter((moto: any) => moto.departamento === 'MANUTENÇÃO').length;
  //       const prontas = motos.filter((moto: any) => moto.departamento === 'PRONTA PARA USO').length;

  //       setEmAnalise(analise);
  //       setEmManutencao(manutencao);
  //       setProntas(prontas);
  //     }
  //   };

  //   const unsubscribe = navigation.addListener('focus', loadMotos); // Recarrega sempre que voltar pra Home

  //   loadMotos();

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View style={styles.header}>
      <Header title="Alertas" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Alertas do local</Text>
          <View style={styles.cardsContainer}>
            <CardAlerta temperatura='42.7°C' nivelRisco='Crítico' descricao='Risco extremo de calor nessa região'/>
          </View>

          <View>
            {/* <QuickAccessButton
              title="Cadastrar Moto"
              onPress={navigateToRegister}
              icon={<Ionicons name="add-circle-outline" size={24} color="white" />}
            />

            <QuickAccessButton
              title="Ver Lista de Motos"
              onPress={navigateToList}
              icon={<Ionicons name="list-outline" size={24} color="white" />}
            /> */}
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
    gap:10
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

export default AlertsScreen;