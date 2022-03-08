import { ApiService } from './../api/api.service';
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

  baseUrl = `${GlobalVariavel.BASE_API_URL}empresas`;

  constructor(private api: ApiService) { }

  public obterEmpresas(): Observable<Empresa[]>{
    return this.api.get<Empresa[]>(this.baseUrl).pipe(take(1))
  }
}
