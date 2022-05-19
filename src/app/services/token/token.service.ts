import { EncryptDecryptService } from './../encrypt-decrypt/encrypt-decrypt.service';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Permissao } from '../../models/enums/permissao.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageChave } from '../../models/enums/local-storage-chave.enum';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private readonly nomeCampoPermissao = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  constructor(
     private encriptar: EncryptDecryptService,
     private jwtHelper: JwtHelperService,
     private localStorageService: LocalStorageService){
  }

  public obterTokenDescriptografado(): string {
    return this.retornarTokenTratado();
  }

  private retornarTokenTratado(): string{
    const token: string = this.localStorageService.obterChave(LocalStorageChave.Valor);

    if(typeof token == 'undefined' || token == null)
      return '';

    return this.encriptar.decrypt(token);
  }

  public obterPermissaoToken(): number {
    const token: string = this.localStorageService.obterChave(LocalStorageChave.Valor);
    return +decode(this.encriptar.decrypt(token))[this.nomeCampoPermissao]
  }

  public obterNomeUsuarioToken(): number {
    const token: string = this.localStorageService.obterChave(LocalStorageChave.Valor);
    return decode(this.encriptar.decrypt(token))['nomeUsuario']
  }

  public obterCodigoUsuarioToken(): number {
    const token: string = this.localStorageService.obterChave(LocalStorageChave.Valor);
    return +decode(this.encriptar.decrypt(token))['codigoUsuario']
  }

  public ehUsuarioAdministrador(): boolean{
    let permissaoAdministrador = Permissao.Administrador;
    return +this.obterPermissaoToken() == permissaoAdministrador
  }

  public usuarioEstaAutenticado(){
    const token: string = this.localStorageService.obterChave(LocalStorageChave.Valor);

    if(token == null) return false;

    return !this.jwtHelper.isTokenExpired(this.encriptar.decrypt(token));
  }

  public removerToken(){
    this.localStorageService.removerChave(LocalStorageChave.Valor);
  }
}
