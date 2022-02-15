import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../util/constants';
import { HttpBackend, HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Setor } from '../../models/Setor';

@Injectable()

export class SetorService  {

  baseUrl = `${GlobalVariavel.BASE_API_URL}setor`;

  constructor(private api: ApiService) {
  }

  public cadastrarSetor(setor: Setor): Observable<Setor> {
    return this.api
    .post<Setor>(this.baseUrl, {setor})
    .pipe(take(1));
  }

  public obterSetor(): Observable<Setor[]> {
    return this.api.get<Setor[]>(this.baseUrl).pipe(take(1));
  }

  public obterApenasUmSetor(codigoSetor: number): Observable<Setor> {
    return this.api.get<Setor>(`${this.baseUrl}/${codigoSetor}`).pipe(take(1));;
  }

  public deletarSetor(setorId: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${setorId}`)
    .pipe(take(1));
  }

  public atualizarSetor(setor: Setor): Observable<Setor>{
    return this.api
    .put<Setor>(`${this.baseUrl}/${setor.codigoSetor}`, {setor})
    .pipe(take(1));
  }

}
