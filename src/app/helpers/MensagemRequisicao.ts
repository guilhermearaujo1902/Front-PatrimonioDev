import { TipoMensagem } from './../models/enums/tipo-mensagem.enum';
import { TemplateMensagemRequisicao } from "../models/helpers/TemplateMensagemRequisicao";

export abstract class MensagemRequisicao {
//TODO: VALIDAR PARA CORTAR MENSAGEM MUITO GRANDE QUE RETORNA DO SERVIDOR
  private static mensagemPadrao: string  = "Não foi possível conectar-se ao servidor.";

  public static retornarMensagemTratada(errorMessage: string, mensagemServidor?: string): TemplateMensagemRequisicao {

    let errorMessageLowerCase = errorMessage.toLowerCase();
    mensagemServidor = this.validarMensagemServidor(mensagemServidor);
    let mensagemServidorLowerCase = mensagemServidor.toLowerCase();
    debugger;
    switch (true) {

      case mensagemServidorLowerCase.includes("a empresa de nome fantasia"):
        return new TemplateMensagemRequisicao(mensagemServidor, TipoMensagem.info);

      case mensagemServidorLowerCase.includes("a instrução delete conflitou com a restrição do reference"):
        this.mensagemPadrao = "Não é possível excluir esse registro, pois o mesmo possui relacionamento com outros registros. Detalhe: Conflito FK.";
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.info);

      case mensagemServidorLowerCase.includes("não foi encontrado usuário com as credencias informadas"):
        this.mensagemPadrao = "Não foi encontrado usuário com as credencias informadas";
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.info);

      case mensagemServidorLowerCase.includes("object reference not set to an instance of an object"):
        this.mensagemPadrao = "Erro interno no servidor. Contate o suporte. Detalhe: Referência de objeto nula.";
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.error);

      case mensagemServidorLowerCase.includes("a instrução insert conflitou com a restrição do foreign key"):
        this.mensagemPadrao = "Erro interno no servidor. Contate o suporte. Detalhe: Conflito FK.";
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.error);

      case mensagemServidorLowerCase.includes("não é possível realizar essa operação com registro padrão."):
        this.mensagemPadrao = "Não é permitido realizar qualquer operação com registro padrão do sistema.";
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.info);

      case mensagemServidorLowerCase.includes("não é possível inserir o valor null na coluna"):
        this.mensagemPadrao = "Erro interno no servidor. Contate o suporte. Detalhe: Parâmetro nulo.";
        return new TemplateMensagemRequisicao(this.mensagemPadrao, TipoMensagem.error);

      case mensagemServidorLowerCase.includes("não foi possível realizar a operação!"):
        return new TemplateMensagemRequisicao(mensagemServidor, TipoMensagem.error);

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

  public static retornarMensagemDeErroAoRealizarOperacao(acao: string, entidade: string, conectivo: string[]): string{
    return `Houve um erro durante ${conectivo[0]} ${acao} ${conectivo[1]} ${entidade}.`.replace('atualizado','atualizar').replace('cadastrado','cadastro').replace('cadastrada','cadastro')
  }
}
