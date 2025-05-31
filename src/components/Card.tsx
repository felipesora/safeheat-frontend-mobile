import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Image } from 'react-native';

interface CardProps {
    nome: string;
    temperatura: string;
    endereco: string;
    alertas: number;
}

const Card: React.FC<CardProps> = ({ nome, temperatura, endereco, alertas }) => {
    const [fontsLoaded] = useFonts({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.card}>
            <View style={styles.imageText}>
                <Image
                    source={require('../../assets/images/icone-endereco.png')}
                    style={styles.icon}
                />
                <Text style={[styles.title, { fontFamily: 'MontserratBold' }]}>{nome}</Text>
            </View>
            <Text style={[styles.detail, { fontFamily: 'MontserratRegular' }]}>
                Temperatura: <Text style={styles.bold}>{temperatura}</Text>
            </Text>
            <Text style={[styles.adress, { fontFamily: 'MontserratRegular' }]}>
                Endereço: <Text>{endereco}</Text>
            </Text>
            <View style={styles.imageText}>
                <Image
                    source={require('../../assets/images/icone-sirene.png')}
                    style={styles.icon}
                />
                <Text style={[styles.alert, { fontFamily: 'MontserratRegular' }]}>
                    Total de Alertas: {alertas}
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
    title: {
        fontSize: 24,
        color: '#fff',
    },
    detail: {
        fontSize: 20,
        color: '#A0A0A0',
        marginBottom: 4,
    },
    bold: {
        fontWeight: 'bold',
        color: '#8A202C',
    },
    adress: {
        fontSize: 16,
        color: '#A0A0A0',
        marginBottom: 20,
    },
    alert:{
        fontSize: 18,
        color: '#8B1A10',
        fontWeight: 'bold',
    },
});

export default Card;
