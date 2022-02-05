import { take } from 'rxjs/operators';
import { Empresa } from './../../models/Empresa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../util/constants';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  baseUrl = `${GlobalVariavel.BASE_API_URL}empresa`;

  constructor(private http: HttpClient) { }

  public obterEmpresas(): Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.baseUrl).pipe(take(1))
  }
}
