import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useFonts } from 'expo-font';

// type Movimentacao = {
//   departamento: string;
//   horario: string;
// };

// type Moto = {
//   id_moto: number;
//   placa: string;
//   modelo: string;
//   status: string;
//   departamento: string;
//   movimentacoes: Movimentacao[];
// };

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const STORAGE_KEY = 'motos';

const RegisterLocalScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const [fontsLoaded] = useFonts({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    //   const [placa, setPlaca] = useState('');
    //   const [modelo, setModelo] = useState('');
    //   const [status, setStatus] = useState('Em avaliação');
    //   const [departamento, setDepartamento] = useState('ENTRADA');
    //   const [motos, setMotos] = useState<Moto[]>([]);
    //   const [nextId, setNextId] = useState(1);
    //   const [mensageError, setMensageError] = useState<string>('');
    //   const [mensageSucess, SetMensageSucess] = useState<string>('');

    const handleBackToHome = () => {
        navigation.navigate('Home');
    };

    //   useEffect(() => {
    //     const loadMotos = async () => {
    //       const storedMotos = await AsyncStorage.getItem(STORAGE_KEY);
    //       if (storedMotos) {
    //         const parsed = JSON.parse(storedMotos);
    //         setMotos(parsed);
    //         if (parsed.length > 0) {
    //           const lastId = parsed[parsed.length - 1].id_moto;
    //           setNextId(lastId + 1);
    //         }
    //       }
    //     };
    //     loadMotos();
    //   }, []);

    //   const handleRegister = async () => {
    //     if (!placa || !modelo) {
    //       setMensageError('Preencha todos os campos.')
    //       SetMensageSucess('');
    //       return;
    //     }

    //     const novaMoto: Moto = {
    //       id_moto: nextId,
    //       placa,
    //       modelo,
    //       status,
    //       departamento,
    //       movimentacoes: [{
    //         departamento,
    //         horario: new Date().toLocaleString()
    //       }],
    //     };

    //     const updatedMotos = [...motos, novaMoto];
    //     setMotos(updatedMotos);
    //     setNextId(nextId + 1);
    //     setPlaca('');
    //     setModelo('');
    //     setStatus('Em manutenção');
    //     setDepartamento('ENTRADA');

    //     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMotos));
    //     SetMensageSucess('Moto cadastrada com sucesso!');
    //     setMensageError('');
    //   };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
                <Header title="Cadastrar Locais" />

                <View style={styles.containerMain}>
                    <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>Preecha todos os dados</Text>

                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Nome do Local</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Nome"
                    />

                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>CEP</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="CEP"
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Rua</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Rua"
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Número</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Número"
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Complemento</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Complemento"
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Bairro</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Bairro"
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Cidade</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Cidade"
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Estado</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Estado ex: (SP)"
                    />


                    {/* {mensageSucess ? <Text style={[styles.success, { fontFamily: 'MontserratRegular' }]}>{mensageSucess}</Text> : null}
        {mensageError ? <Text style={[styles.error, { fontFamily: 'MontserratRegular' }]}>{mensageError}</Text> : null} */}

                    <TouchableOpacity style={styles.button}>
                        <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Cadastrar Moto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
                        <Text style={[styles.buttonText, { fontFamily: 'MontserratRegular' }]}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerMain: {
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#E5E5E5',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 7,
        color: '#E5E5E5'
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
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    success: {
        color: 'green',
        marginBottom: 10,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#1C1C1C',
        paddingBottom: 32
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});

export default RegisterLocalScreen;