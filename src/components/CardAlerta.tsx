import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Image } from 'react-native';
import { parse, format } from 'date-fns';

interface CardProps {
    temperatura: string;
    nivelRisco: string;
    descricao: string;
    dataHora: string;
}

const CardLocal: React.FC<CardProps> = ({ temperatura, nivelRisco, descricao, dataHora }) => {
    const [fontsLoaded] = useFonts({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) return null;

    const formatarDataHora = (dataHoraString: string): string => {
    try {
        const corrigido = dataHoraString.replace(/:(\d{3})(\d*)$/, '.$1');
        const date = new Date(corrigido);
        return format(date, "dd/MM/yyyy HH:mm");
    } catch (error) {
        return dataHoraString;
    }
};

    return (
        <View style={styles.card}>
            <View style={styles.imageText}>
                <Image
                    source={require('../../assets/images/icone-temperatura.png')}
                    style={styles.icon}
                />
                <Text style={[styles.textoTemperatura, { fontFamily: 'MontserratBold' }]}>
                    Temperatura: <Text>{temperatura}°C</Text>
                </Text>
            </View>

            <View style={styles.imageText}>
                <Image
                    source={require('../../assets/images/icone-alerta.png')}
                    style={styles.icon}
                />
                <Text style={[styles.textoNivelRisco, { fontFamily: 'MontserratBold' }]}>
                    Nível de Risco: <Text>{nivelRisco}</Text>
                </Text>
            </View>

            <Text style={[styles.descricao, { fontFamily: 'MontserratRegular' }]}>
                {descricao}
            </Text>

            <Text style={[styles.descricao, { fontFamily: 'MontserratRegular' }]}>
                Data: <Text>{formatarDataHora(dataHora)}</Text>
            </Text>

            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnAbrigos}>
                    <Text style={[styles.btnAbrigosText, { fontFamily: 'MontserratRegular' }]}>Ver Abrigos</Text>
                </TouchableOpacity>
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

    textoTemperatura: {
        fontSize: 24,
        color: '#fff',
    },
    textoNivelRisco: {
        fontSize: 18,
        color: '#8B1A10',
    },
    descricao: {
        fontSize: 16,
        color: '#A0A0A0',
    },
    btn: {
        marginTop: 15
    },
    btnAbrigos: {
        backgroundColor: '#444444',
        borderWidth: 2,
        borderColor: '#8A202C',
        padding: 10,
        borderRadius: 8,
        width: 180,
        marginTop: 10
    },
    btnAbrigosText: {
        fontSize: 14,
        color: '#E5E5E5',
        textAlign: 'center'
    },

});

export default CardLocal;
