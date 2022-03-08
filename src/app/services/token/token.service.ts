import { EncryptDecryptService } from './../encrypt-decrypt/encrypt-decrypt.service';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Permissao } from '../../models/enums/permissao.enum';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private readonly nomeCampoPermissao = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  constructor(
    private encriptar: EncryptDecryptService,
     public jwtHelper: JwtHelperService){
  }

  public obterPermissaoToken(): number {
    const token: string = localStorage.getItem('valor');
    return +decode(this.encriptar.decrypt(token))[this.nomeCampoPermissao]
  }

  public obterCodigoUsuarioToken(): number {
    const token: string = localStorage.getItem('valor');
    return +decode(this.encriptar.decrypt(token))["codigoUsuario"]
  }

  public ehUsuarioAdministrador(): boolean{
    debugger;
    let permissaoAdministrador = Permissao.Administrador;
    return +this.obterPermissaoToken() == permissaoAdministrador
  }

  public usuarioEstaAutenticado(){
    const token: string = localStorage.getItem('valor');
    return !this.jwtHelper.isTokenExpired(this.encriptar.decrypt(token));
  }
}
