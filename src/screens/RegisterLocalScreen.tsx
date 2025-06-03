import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cadastrarLocal } from '../services/usuarioService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterLocalScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const [fontsLoaded] = useFonts({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    const handleBackToHome = () => {
        navigation.navigate('Home');
    };

    const handleSubmit = async () => {
        try {
            const usuarioId = await AsyncStorage.getItem('usuarioId');
            const idUsuarioConvertido = Number(usuarioId);
            if (isNaN(idUsuarioConvertido)) {
                setErro('ID de usuário inválido');
                return;
            }

            const local = {
                nome,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
                id_usuario: idUsuarioConvertido,
            };

            await cadastrarLocal(local);
            setMensagem('Local cadastrado com sucesso!');
            setErro('');

            setNome('');
            setCep('');
            setRua('');
            setNumero('');
            setComplemento('');
            setBairro('');
            setCidade('');
            setEstado('');
        } catch (error) {
            setErro('Erro ao cadastrar local. Tente novamente.');
            setMensagem('');
        }
    };

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
                        placeholderTextColor="#A0A0A0"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>CEP</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="CEP"
                        placeholderTextColor="#A0A0A0"
                        value={cep}
                        onChangeText={setCep}
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Rua</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Rua"
                        placeholderTextColor="#A0A0A0"
                        value={rua}
                        onChangeText={setRua}
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Número</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Número"
                        placeholderTextColor="#A0A0A0"
                        value={numero}
                        onChangeText={setNumero}
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Complemento</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Complemento"
                        placeholderTextColor="#A0A0A0"
                        value={complemento}
                        onChangeText={setComplemento}
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Bairro</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Bairro"
                        placeholderTextColor="#A0A0A0"
                        value={bairro}
                        onChangeText={setBairro}
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Cidade</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Cidade"
                        placeholderTextColor="#A0A0A0"
                        value={cidade}
                        onChangeText={setCidade}
                    />


                    <Text style={[styles.label, { fontFamily: 'MontserratBold' }]}>Estado</Text>
                    <TextInput
                        style={[styles.input, { fontFamily: 'MontserratRegular' }]}
                        placeholder="Estado ex: (SP)"
                        placeholderTextColor="#A0A0A0"
                        value={estado}
                        onChangeText={setEstado}
                    />


                    {mensagem ? <Text style={[styles.success, { fontFamily: 'MontserratRegular' }]}>{mensagem}</Text> : null}
                    {erro ? <Text style={[styles.error, { fontFamily: 'MontserratRegular' }]}>{erro}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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