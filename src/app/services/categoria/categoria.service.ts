import { ApiService } from './../api/api.service';
import { Categoria } from '../../models/Categoria';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { GlobalVariavel } from '../../util/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl = `${GlobalVariavel.BASE_API_URL}categorias`;

  constructor(private api: ApiService) { }

  public cadastrarCategoria(categoria: Categoria): Observable<Categoria> {
    debugger;
    return this.api.post<Categoria>(this.baseUrl, {categoria}).pipe(take(1));
  }

  public obterTodasCategorias(): Observable<Categoria[]> {
    return this.api.get<Categoria[]>(this.baseUrl).pipe(take(1));
  }

  public deletarCategoria(codigoCategoria: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${codigoCategoria}`)
    .pipe(take(1));
  }

  public obterApenasUmaCategoria(codigoCategoria: number): Observable<Categoria> {
    return this.api.get<Categoria>(`${this.baseUrl}/${codigoCategoria}`).pipe(take(1));;
  }

  public atualizarCategoria(categoria: Categoria): Observable<Categoria>{
    return this.api
    .put<Categoria>(`${this.baseUrl}/${categoria.codigoCategoria}`, {categoria})
    .pipe(take(1));
  }
}
