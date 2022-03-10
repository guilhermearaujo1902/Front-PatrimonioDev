import { TipoMensagem } from "../enums/tipo-mensagem.enum";

export class TemplateMensagemRequisicao {

  public mensagemErro: string;
  public tipoMensagem: TipoMensagem

  constructor(mensagem: string, tipo: TipoMensagem){
    this.mensagemErro = mensagem;
    this.tipoMensagem = tipo;
  }

}
