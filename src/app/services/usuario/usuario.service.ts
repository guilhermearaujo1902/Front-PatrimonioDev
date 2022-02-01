import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../util/constants';
import { Usuario } from '../../models/Usuario';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = `${GlobalVariavel.BASE_API_URL}usuario`

  constructor(private http: HttpClient) { }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.baseUrl, {usuario}).pipe(take(1));;
  }

  public obterTodosUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseUrl).pipe(take(1));;
  }

  public obterApenasUmUsuario(codigoUsuario: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));;
  }

  public obterUsuarioPorLoginESenha(email: string, senha: string){
    return this.http.get<Usuario>(`${this.baseUrl}/${email}/${senha}`).pipe(take(1));
  }

  public desativarUsuario(codigoUsuario: number){
    return this.http.delete(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));
  }

  public atualizarUsuario(codigoUsuario: number, usuario: Usuario){
    return this.http.put(`${this.baseUrl}/${codigoUsuario}`,{usuario}).pipe(take(1));
  }
}
