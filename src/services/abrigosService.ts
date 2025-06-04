import axios from 'axios';

const abrigosApi = axios.create({
  baseURL: 'https://localhost:56980/api',
});

export interface Recurso {
  id: number;
  nome: string;
  quantidade: number;
  abrigoId: number;
}

export interface Abrigo {
  id: number;
  nome: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  capacidadeTotal: number;
  ocupacaoAtual: number;
  recursosDisponiveis: Recurso[];
}

export const buscarAbrigos = async (): Promise<Abrigo[]> => {
  try {
    const response = await abrigosApi.get<Abrigo[]>('/AbrigosApi');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar abrigos:', error);
    throw error;
  }
};