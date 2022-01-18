import { Categoria } from '../../models/Categoria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { GlobalVariavel } from '../../../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl = `${GlobalVariavel.BASE_API_URL}categoria`;

  constructor(private http: HttpClient) { }

  public obterCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl).pipe(take(1));;
  }
}
