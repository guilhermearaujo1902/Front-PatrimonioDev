import { InformacaoAdicional } from './../../models/InformacaoAdicional';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Patrimonio } from '../../models/Patrimonio';
import { GlobalVariavel } from '../../util/constants';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {

  baseUrl = `${environment.apiUrl}api/patrimonios`;

  constructor(private api: ApiService) { }

  public obterPatrimonios(): Observable<Patrimonio[]>{
    return this.api.get<Patrimonio[]>(this.baseUrl).pipe(take(1));
  }

  public cadastrarPatrimonio(patrimonio: Patrimonio, informacaoAdicional: InformacaoAdicional): Observable<Patrimonio> {
    debugger;
    return this.api
    .post<Patrimonio>(this.baseUrl, {patrimonio: patrimonio, informacaoAdicional: informacaoAdicional})
    .pipe(take(1));
  }

  public excluirPatrimonio(patrimonioId: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${patrimonioId}`)
    .pipe(take(1));
  }

  public obterApenasUmPatrimonio(patrimonioId: number): any{
    return this.api
    .get(`${this.baseUrl}/${patrimonioId}`)
    .pipe(take(1));
  }

  public obterInformacaoAdicional(codigoPatrimonio: number): any{
    return this.api.get<InformacaoAdicional[]>(`${GlobalVariavel.BASE_API_URL}informacoes/${codigoPatrimonio}`).pipe(take(1));
  }

  public atualizarPatrimonio(patrimonio: Patrimonio, informacaoAdicional: InformacaoAdicional): Observable<Patrimonio>{
    debugger;
    return this.api
    .put<Patrimonio>(`${this.baseUrl}/${patrimonio.codigoPatrimonio}`, {patrimonio: patrimonio, informacaoAdicional: informacaoAdicional})
    .pipe(take(1));
  }

  public obterPatrimonioEInformacaoAdicional(codigoPatrimonio: number): Observable<any[]> {
    let respostaPatrimonio = this.obterApenasUmPatrimonio(codigoPatrimonio);
    let respostaInformacaoAdicional = this.obterInformacaoAdicional(codigoPatrimonio);

    return forkJoin([respostaPatrimonio, respostaInformacaoAdicional]);

  }

}
