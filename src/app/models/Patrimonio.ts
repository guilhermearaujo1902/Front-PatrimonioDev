import { SituacaoEquipamento } from "./enums/situacao-equipamento.enum";

export interface Patrimonio {
  codigoPatrimonio: number;
  codigoFuncionario: number;
  nomeFuncionario: string;
  codigoUsuario: number;
  nomeUsuario: string;
  codigoTipoEquipamento: number;
  tipoEquipamento: string;
  modelo: string;
  serviceTag: string;
  armazenamento: string;
  processador: string;
  placaVideo: string;
  ip: string;
  situacaoEquipamento: number,
  mac: string,
  memoriaRam: string,
}
