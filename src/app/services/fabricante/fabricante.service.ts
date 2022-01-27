import { Fabricante } from './../../models/Fabricante';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GlobalVariavel } from '../../util/constants';

@Injectable()
export class FabricanteService {

  constructor(private http: HttpClient) { }

  baseUrl = `${GlobalVariavel.BASE_API_URL}fabricante`;

  public cadastrarFabricante(fabricante: Fabricante): Observable<Fabricante> {
    console.log({fabricante})
    return this.http.post<Fabricante>(this.baseUrl, {fabricante}).pipe(take(1));
  }

  public obterTodosFabricante(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>(this.baseUrl).pipe(take(1));
  }

  public deletarFabricante(codigoFabricante: number): Observable<any>{
    return this.http
    .delete(`${this.baseUrl}/${codigoFabricante}`)
    .pipe(take(1));
  }

}
