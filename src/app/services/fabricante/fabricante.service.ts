import { Fabricante } from './../../models/Fabricante';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GlobalVariavel } from '../../../global';

@Injectable()
export class FabricanteService {

  constructor(private http: HttpClient) { }

  baseUrl = `${GlobalVariavel.BASE_API_URL}fabricante`;

  public cadastrarFabricante(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.post<Fabricante>(this.baseUrl, fabricante).pipe(take(1));
  }

  public obterTodosFabricante(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>(this.baseUrl).pipe(take(1));
  }

}