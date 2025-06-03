import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export interface UsuarioRequestDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface Local {
  id_local: number;
  nome: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  id_usuario: number;
  alertas: Alerta[];
}

export interface Alerta {
  id_alerta: number;
  temperatura: string;
  nivel_risco: string;
  mensagem: string;
  data_alerta: string;
  id_local: number;
}

export interface UsuarioResponseDTO {
  id_usuario: number;
  nome: string;
  email: string;
  senha: string;
  locais: Local[];
}


export const cadastrarUsuario = async (usuario: UsuarioRequestDTO) => {
  return await api.post('/usuarios', usuario);
};

export const buscarUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  }
  catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const buscarLocaisPorUsuario = async (idUsuario: number): Promise<Local[]> => {
  try {

    const response = await api.get<UsuarioResponseDTO>(`/usuarios/${idUsuario}`);
    return response.data.locais ?? [];
  } catch (error) {

    console.error('Erro ao buscar locais do usuário:', error);
    throw error;
  }
};