import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../util/constants';
import { ApiService } from '../api/api.service';
import { UsuarioPerfil } from '../../models/UsuarioPerfil';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPerfilService {

  baseUrl: string = `${GlobalVariavel.BASE_API_URL}PerfilUsuario`

  constructor(private api: ApiService) { }

  public obterPerfilUsuario(codigoUsuario: number): Observable<UsuarioPerfil>{
    debugger;
    return this.api.get<UsuarioPerfil>(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));
  }

  public atualizarPerfilUsuario(perfil: UsuarioPerfil): Observable<number>{
    return this.api.put<number>(`${this.baseUrl}`, {perfil});
  }

}
