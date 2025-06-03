import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { deletarLocal, Local } from '../services/usuarioService';

interface CardProps {
    nome: string;
    temperatura: string;
    endereco: string;
    alertas: number;
    localCompleto: Local;
    onDelete: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CardLocal: React.FC<CardProps> = ({ nome, temperatura, endereco, alertas, localCompleto, onDelete}) => {
const navigation = useNavigation<NavigationProp>();

    const [fontsLoaded] = useFonts({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) return null;

    const navigateToEdit = () => {
    navigation.navigate('EditarLocal', { local: localCompleto });
  };

const handleDelete = () => {
  Alert.alert(
    'Confirmar Exclusão',
    'Tem certeza que deseja deletar este local?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Deletar',
        onPress: async () => {
          try {
            await deletarLocal(localCompleto.id_local);
            alert('Local removido com sucesso!');
            onDelete();
          } catch (error) {
            alert('Erro ao remover local.');
          }
        },
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};

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

            <TouchableOpacity style={styles.btnAlerts} onPress={() => navigation.navigate('Alertas', { local: localCompleto })}>
                <Text style={[styles.btnAlertsText, { fontFamily: 'MontserratRegular' }]}>Ver Alertas</Text>
            </TouchableOpacity>

            <View style={styles.btns}>
                <TouchableOpacity style={styles.btnEditRemove} onPress={navigateToEdit}>
                    <Text style={[styles.btnEditRemoveText, { fontFamily: 'MontserratRegular' }]}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEditRemove} onPress={handleDelete}>
                    <Text style={[styles.btnEditRemoveText, { fontFamily: 'MontserratRegular' }]}>Remover</Text>
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
    alert: {
        fontSize: 18,
        color: '#8B1A10',
        fontWeight: 'bold',
    },
    btnAlerts: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#C1440E',
        padding: 10,
        borderRadius: 8,
        width: 180,
        marginTop: 10
    },
    btnAlertsText: {
        fontSize: 14,
        color: '#C1440E',
        textAlign: 'center'
    },
    btns: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 15
    },
    btnEditRemove:{
        backgroundColor: '#444444',
        borderWidth: 2,
        borderColor: '#8A202C',
        padding: 10,
        borderRadius: 8,
        width: 130,
    },
    btnEditRemoveText:{
        fontSize: 14,
        color: '#E5E5E5',
        textAlign: 'center'
    }
});

export default CardLocal;
