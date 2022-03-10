export abstract class MensagemRequisicao {

  private static mensagemPadrao: string  = "Não foi possível conectar-se ao servidor.";

  public static retornarMensagemTratada(errorMessage: string, mensagemServidor?: string): string {

    let errorMessageLowerCase = errorMessage.toLowerCase();
    mensagemServidor = this.validarMensagemServidor(mensagemServidor);
    let mensagemServidorLowerCase = mensagemServidor.toLowerCase();

    switch (true) {
      case errorMessageLowerCase.includes("unknown error"):
        return this.mensagemPadrao;

      case mensagemServidorLowerCase.includes("erro interno no servidor. mensagem: value cannot be null."):
        return "Erro interno no servidor. Contate o suporte. Detalhe: Parâmetro nulo"

      case mensagemServidorLowerCase.includes("não foi possível realizar a operação!"):
        return mensagemServidor;

      default:
          return this.mensagemPadrao;
    }
  }

  private static validarMensagemServidor(mensagem?: string): any{
    if(typeof mensagem == "undefined" || mensagem == null)
      return this.mensagemPadrao
    else
      return mensagem;
  }
}
