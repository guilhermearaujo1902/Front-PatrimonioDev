import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private readonly nomeCampoPermissao = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  public obterPermissaoToken(): any {
    const token: string = localStorage.getItem('jwt');
    return +decode(token)[this.nomeCampoPermissao]
  }

  public obterCodigoUsuarioToken(): number {
    const token: string = localStorage.getItem('jwt');
    return +decode(token)["codigoUsuario"]
  }
}
