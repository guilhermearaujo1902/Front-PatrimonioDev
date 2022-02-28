import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Permissao } from '../../models/enums/permissao.enum';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private readonly nomeCampoPermissao = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  public obterPermissaoToken(): number {
    const token: string = localStorage.getItem('jwt');
    return +decode(token)[this.nomeCampoPermissao]
  }

  public obterCodigoUsuarioToken(): number {
    const token: string = localStorage.getItem('jwt');
    return +decode(token)["codigoUsuario"]
  }

  public ehUsuarioAdministrador(): boolean{
    debugger;
    let permissaoAdministrador = Permissao.Administrador;
    return +this.obterPermissaoToken() == permissaoAdministrador
  }
}
