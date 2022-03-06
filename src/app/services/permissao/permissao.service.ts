import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permissao } from '../../models/Permissao';
import { GlobalVariavel } from '../../util/constants';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {
  baseUrl = `${GlobalVariavel.BASE_API_URL}permissoes`;

  constructor(private http: HttpClient) { }

  public obterPermissoes(): Observable<Permissao[]>{
    return this.http.get<Permissao[]>(this.baseUrl).pipe(take(1));
  }

}
