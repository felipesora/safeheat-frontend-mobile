import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Image } from 'react-native';

interface CardProps {
    nome: string;
    endereco: string;
    total: number;
    ocupacao: number;
}

const CardAbrigo: React.FC<CardProps> = ({ nome, endereco, total, ocupacao }) => {
    const [fontsLoaded] = useFonts({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.card}>
            <View style={styles.imageText}>
                <Image
                    source={require('../../assets/images/icone-abrigo.png')}
                    style={styles.icon}
                />
                <Text style={[styles.textoNome, { fontFamily: 'MontserratBold' }]}>
                    {nome}
                </Text>
            </View>

            <View style={styles.imageText}>
                <Image
                    source={require('../../assets/images/icone-localizacao.png')}
                    style={styles.icon}
                />
                <Text style={[styles.textoEndereco, { fontFamily: 'MontserratBold' }]}>
                    {endereco}
                </Text>
            </View>

            <View style={styles.imageText}>
                <Image
                    source={require('../../assets/images/icone-pessoas.png')}
                    style={styles.icon}
                />
                <Text style={[styles.textoOcupacao, { fontFamily: 'MontserratBold' }]}>
                    Ocupação: {ocupacao} / {total} pessoas
                </Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#2E2E2E',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    imageText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 5
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
    textoNome: {
        fontSize: 24,
        color: '#fff',
    },
    textoEndereco: {
        fontSize: 16,
        color: '#A0A0A0',
    },
    textoOcupacao: {
        fontSize: 16,
        color: '#A0A0A0',
    },

});

export default CardAbrigo;
