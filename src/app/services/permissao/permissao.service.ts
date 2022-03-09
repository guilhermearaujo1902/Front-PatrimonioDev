import { ApiService } from './../api/api.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsuarioPermissao } from '../../models/UsuarioPermissao';
import { GlobalVariavel } from '../../util/constants';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {
  baseUrl = `${GlobalVariavel.BASE_API_URL}permissoes`;

  constructor(private api: ApiService) { }

  public obterPermissoes(): Observable<UsuarioPermissao[]>{
    return this.api.get<UsuarioPermissao[]>(this.baseUrl).pipe(take(1));
  }

  public cadastrarPermissao(usuarioPermissao: UsuarioPermissao): Observable<UsuarioPermissao> {
    debugger;
    return this.api
    .post<UsuarioPermissao>(this.baseUrl, {usuarioPermissao})
    .pipe(take(1));
  }

  public desativarPermissao(permissaoId: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${permissaoId}`)
    .pipe(take(1));
  }

}
