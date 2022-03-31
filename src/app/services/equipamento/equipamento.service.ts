import { Equipamento } from './../../models/Equipamento';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private api: ApiService) { }

  baseUrl = `${environment.apiUrl}equipamentos`;

  public cadastrarEquipamento(equipamento: Equipamento): Observable<Equipamento> {
    return this.api.post<Equipamento>(this.baseUrl, {equipamento}).pipe(take(1));
  }

  public obterTodosEquipamentos(): Observable<Equipamento[]> {
    return this.api.get<Equipamento[]>(this.baseUrl).pipe(take(1));
  }

  public deletarEquipamento(codigoEquipamento: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${codigoEquipamento}`)
    .pipe(take(1));
  }

  public obterApenasUmEquipamento(codigoEquipamento: number): Observable<Equipamento> {
    return this.api.get<Equipamento>(`${this.baseUrl}/${codigoEquipamento}`).pipe(take(1));;
  }

  public atualizarEquipamento(equipamento: Equipamento): Observable<Equipamento>{
    debugger;
    return this.api
    .put<Equipamento>(`${this.baseUrl}/${equipamento.codigoTipoEquipamento}`, {equipamento})
    .pipe(take(1));
  }

}
