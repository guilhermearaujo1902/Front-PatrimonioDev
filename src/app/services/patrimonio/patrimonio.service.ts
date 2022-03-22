import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Patrimonio } from '../../models/Patrimonio';
import { GlobalVariavel } from '../../util/constants';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {

  baseUrl = `${GlobalVariavel.BASE_API_URL}patrimonios`;

  constructor(private api: ApiService) { }

  public obterPatrimonios(): Observable<Patrimonio[]>{
    return this.api.get<Patrimonio[]>(this.baseUrl).pipe(take(1));
  }

  public cadastrarPatrimonio(patrimonio: Patrimonio): Observable<Patrimonio> {
    debugger;
    return this.api
    .post<Patrimonio>(this.baseUrl, {patrimonio: patrimonio})
    .pipe(take(1));
  }

  public excluirPatrimonio(patrimonioId: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${patrimonioId}`)
    .pipe(take(1));
  }

  public obterApenasUmPatrimonio(patrimonioId: number): Observable<any>{
    return this.api
    .get(`${this.baseUrl}/${patrimonioId}`)
    .pipe(take(1));
  }

  public atualizarPatrimonio(patrimonio: Patrimonio): Observable<Patrimonio>{
    debugger;
    return this.api
    .put<Patrimonio>(`${this.baseUrl}/${patrimonio.codigoPatrimonio}`, {patrimonio})
    .pipe(take(1));
  }

}
