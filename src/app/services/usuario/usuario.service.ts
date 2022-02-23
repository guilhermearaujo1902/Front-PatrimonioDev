import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../util/constants';
import { Usuario } from '../../models/Usuario';
import { take } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = `${GlobalVariavel.BASE_API_URL}usuario`

  constructor(private api: ApiService) { }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario>{
    debugger;
    return this.api.post<Usuario>(this.baseUrl, {usuario}).pipe(take(1));
  }

  public obterTodosUsuarios(): Observable<Usuario[]>{
    return this.api.get<Usuario[]>(this.baseUrl).pipe(take(1));
  }

  public obterApenasUmUsuario(codigoUsuario: number): Observable<Usuario>{
    return this.api.get<Usuario>(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));
  }

  public obterUsuarioPorEmailESenha(email: string, senha: string, autenticacaoAuth: boolean){
    debugger;
    return this.api.post<Usuario>(`${this.baseUrl}/${email}/${senha}`, autenticacaoAuth).pipe(take(1));
  }

  public desativarUsuario(codigoUsuario: number){
    return this.api.delete(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));
  }

  public atualizarUsuario(usuario: Usuario){
    return this.api.put(`${this.baseUrl}/${usuario.codigoUsuario}`,{usuario}).pipe(take(1));
  }
}
