import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Movimentacao } from '../../models/Movimentacao';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  baseUrl = `${environment.apiUrl}movimentacoes`;

  constructor(private api: ApiService) { }

  public realizarMovimentacao(movimentacao: Movimentacao): Observable<Movimentacao> {
    debugger;
    return this.api
    .post<Movimentacao>(this.baseUrl, {movimentacao})
    .pipe(take(1));
  }

  public obterTodasMovimentacoesDoPatrimonio(codigoPatrimonio: number): Observable<Movimentacao[]> {
    return this.api
    .get<Movimentacao[]>(`${this.baseUrl}/${codigoPatrimonio}`)
    .pipe(take(1));
  }

}
