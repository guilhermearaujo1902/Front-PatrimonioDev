import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Setor } from '../../models/Setor';

@Injectable()

export class SetorService {

  baseUrl = `${GlobalVariavel.BASE_API_URL}setor`;

  constructor(private http: HttpClient) { }

  public cadastrarSetor(setor: Setor): Observable<Setor> {
    return this.http
    .post<Setor>(this.baseUrl, {setor})
    .pipe(take(1));
  }

  public obterSetor(): Observable<Setor[]> {
    var resultado = this.http.get<Setor[]>(this.baseUrl).pipe(take(1));
    console.log(resultado);

    return resultado;

  }

  public obterApenasUmSetor(codigoSetor: number): Observable<Setor> {
    return this.http.get<Setor>(`${this.baseUrl}/${codigoSetor}`).pipe(take(1));;
  }

  public deletarSetor(setorId: number): Observable<any>{
    return this.http
    .delete(`${this.baseUrl}/${setorId}`)
    .pipe(take(1));
  }

  public atualizarSetor(setor: Setor): Observable<Setor>{
    return this.http
    .put<Setor>(`${this.baseUrl}/${setor.codigoSetor}`, {setor})
    .pipe(take(1));
  }

}
