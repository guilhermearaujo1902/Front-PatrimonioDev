import { TipoMensagem } from './../models/enums/tipo-mensagem.enum';
import { TemplateMensagemRequisicao } from "../models/helpers/TemplateMensagemRequisicao";

export abstract class MensagemRequisicao {

  private static mensagemPadrao: string  = "Não foi possível conectar-se ao servidor.";

  public static retornarMensagemTratada(errorMessage: string, mensagemServidor?: string): TemplateMensagemRequisicao {

    let errorMessageLowerCase = errorMessage.toLowerCase();
    mensagemServidor = this.validarMensagemServidor(mensagemServidor);
    let mensagemServidorLowerCase = mensagemServidor.toLowerCase();

    switch (true) {

      case mensagemServidorLowerCase.includes("a instrução insert conflitou com a restrição do foreign key"):
        this.mensagemPadrao = "Erro interno no servidor. Contate o suporte. Detalhe: Conflito FK.";
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.error);

      case mensagemServidorLowerCase.includes("não é possível realizar essa operação com registro padrão."):
        this.mensagemPadrao = "Não é permitido realizar qualquer operação com registro padrão do sistema.";
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.info);

      case mensagemServidorLowerCase.includes("não foi possível realizar a operação!"):
        return new TemplateMensagemRequisicao(mensagemServidor, TipoMensagem.error);

      case mensagemServidorLowerCase.includes("erro interno no servidor. mensagem: value cannot be null."):
        this.mensagemPadrao = "Erro interno no servidor. Contate o suporte. Detalhe: Parâmetro nulo.";
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.info);

      case errorMessageLowerCase.includes("unknown error"):
      default:
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.error);
    }
  }

  private static validarMensagemServidor(mensagem?: string): any{
    if(typeof mensagem == "undefined" || mensagem == null)
      return this.mensagemPadrao
    else
      return mensagem;
  }
}
