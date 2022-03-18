import { SituacaoEquipamento } from "./enums/situacao-equipamento.enum";

export interface Patrimonio {
  codigoPatrimonio: number;
  codigoFuncionario: number;
  codigoUsuario: number;
  nomeUsuario: string;
  codigoEquipamento: number;
  modelo: string;
  serviceTag: string;
  armazenamento: string;
  processador: string;
  placaVideo: string;
  ip: string;
  situacaoEquipamento: SituacaoEquipamento,
  mac: string,
  memoriaRam: string,
}
