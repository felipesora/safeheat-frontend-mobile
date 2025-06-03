// export type Movimentacao = {
//     departamento: string;
//     horario: string;
//   };

import { Local } from "../services/usuarioService";

  
//   export type Moto = {
//     id_moto: number;
//     placa: string;
//     modelo: string;
//     status: string;
//     departamento: string;
//     movimentacoes: Movimentacao[];
//   };

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Home: undefined;
    Local: undefined
    Alertas: { local: Local };
    Abrigos: undefined
    EditarLocal: {local: Local};
    // Moto: undefined;
    // ListMotos: undefined;
    // EditMoto: { moto: Moto };
    // ChangeDepartamento: { moto: Moto };
};