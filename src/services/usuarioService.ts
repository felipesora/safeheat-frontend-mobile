import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://safeheat-backend-java.onrender.com',
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

export interface LocalRequestDTO {
  nome: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  id_usuario: number;
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
    const locais = response.data.locais ?? [];

    // Ordenar os alertas de cada local por data_alerta crescente
    const locaisOrdenados = locais.map((local) => ({
      ...local,
      alertas: [...local.alertas].sort((a, b) =>
        new Date(a.data_alerta).getTime() - new Date(b.data_alerta).getTime()
      ),
    }));

    return locaisOrdenados;
  } catch (error) {
    console.error('Erro ao buscar locais do usuário:', error);
    throw error;
  }
};

export const cadastrarLocal = async (local: LocalRequestDTO) => {
  try {
    const response = await api.post('/locais', local);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar local:', error);
    throw error;
  }
};

export const editarLocal = async (id_local: number, local: LocalRequestDTO) => {
  try {
    const response = await api.put(`/locais/${id_local}`, local);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar local:', error);
    throw error;
  }
};

export const deletarLocal = async (id_local: number) => {
  try {
    const response = await api.delete(`/locais/${id_local}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar local:', error);
    throw error;
  }
};