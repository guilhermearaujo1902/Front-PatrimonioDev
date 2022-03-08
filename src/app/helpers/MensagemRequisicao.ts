export abstract class MensagemRequisicao {

  private static mensagemPadrao: string  = "Não foi possível conectar-se ao servidor.";

  public static retornarMensagemTratada(errorMessage: string, mensagemServidor?: string): string {

    let errorMessageLowerCase = errorMessage.toLowerCase();
    switch (true) {
      case errorMessageLowerCase.includes("http failure response for"):
      case errorMessageLowerCase.includes("unknown error"):
        return this.mensagemPadrao;

      default:
        if(typeof mensagemServidor == "undefined" || mensagemServidor == null)
          return this.mensagemPadrao
        else
          return mensagemServidor;
    }
  }
}
