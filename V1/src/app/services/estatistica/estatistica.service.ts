import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { forkJoin, Observable } from 'rxjs';
import { Estatisticas } from '../../models/Estatistica';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {

  constructor(private api: ApiService) { }

  baseUrl = `${environment.apiUrl}estatisticas`;

  private obterEstatisticasCategoria(): Observable<Estatisticas[]>{
    return this.api.get<Estatisticas[]>(this.baseUrl).pipe(take(1));
  }

  private obterMediaEquipamentoPorFuncionario(): Observable<Estatisticas[]>{
    return this.api.get<Estatisticas[]>(`${this.baseUrl}/media`).pipe(take(1));
  }

  private obterPatrimonioDisponivel(): Observable<Estatisticas[]>{
    return this.api.get<Estatisticas[]>(`${this.baseUrl}/patrimonio-disponivel`).pipe(take(1));
  }

  private obterQuantidadeMovimentacoes(): Observable<Estatisticas>{
    return this.api.get<Estatisticas>(`${this.baseUrl}/quantidade-movimentacao`).pipe(take(1));
  }

  public obterEstatisticas(): Observable<any[]> {

    let estatisticaCategoria = this.obterEstatisticasCategoria();
    let mediaEquipamento = this.obterMediaEquipamentoPorFuncionario();
    let patrimoniosDisponiveis = this.obterPatrimonioDisponivel();
    let quantidadeMovimentacoes = this.obterQuantidadeMovimentacoes();

    return forkJoin([estatisticaCategoria, mediaEquipamento, patrimoniosDisponiveis, quantidadeMovimentacoes]);

  }

}
