import { MovimentacaoEquipamento } from './enums/movimentacao-equipamento.enum';
export interface Movimentacao {
  codigoMovimentacao: number;
  codigoPatrimonio: number;
  nomePatrimonio: string;
  codigoUsuario: number;
  nomeUsuario: string;
  dataApropriacao: string;
  dataDevolucao: string;
  observacao: string;
  movimentacaoDoEquipamento: MovimentacaoEquipamento
}
