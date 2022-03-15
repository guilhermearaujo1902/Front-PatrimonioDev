import { ApiService } from './../api/api.service';
import { Fabricante } from './../../models/Fabricante';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GlobalVariavel } from '../../util/constants';

@Injectable()
export class FabricanteService {

  constructor(private api: ApiService) { }

  baseUrl = `${GlobalVariavel.BASE_API_URL}fabricantes`;

  public cadastrarFabricante(fabricante: Fabricante): Observable<Fabricante> {
    return this.api.post<Fabricante>(this.baseUrl, {fabricante}).pipe(take(1));
  }

  public obterTodosFabricante(): Observable<Fabricante[]> {
    return this.api.get<Fabricante[]>(this.baseUrl).pipe(take(1));
  }

  public deletarFabricante(codigoFabricante: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${codigoFabricante}`)
    .pipe(take(1));
  }

  public obterApenasUmFabricante(codigoFabricante: number): Observable<Fabricante> {
    return this.api.get<Fabricante>(`${this.baseUrl}/${codigoFabricante}`).pipe(take(1));;
  }

  public atualizarFabricante(fabricante: Fabricante): Observable<Fabricante>{
    return this.api
    .put<Fabricante>(`${this.baseUrl}/${fabricante.codigoFabricante}`, {fabricante})
    .pipe(take(1));
  }

}
