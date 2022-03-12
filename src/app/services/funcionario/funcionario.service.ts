import { Funcionario } from './../../models/Funcionario';
import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../util/constants';
import { ApiService } from '../api/api.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  baseUrl = `${GlobalVariavel.BASE_API_URL}funcionarios`;

  constructor(private api: ApiService) { }

  public cadastrarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    debugger;
    return this.api.post<Funcionario>(this.baseUrl, {funcionario}).pipe(take(1));
  }

  public obterTodosFuncionarios(): Observable<Funcionario[]> {
    return this.api.get<Funcionario[]>(this.baseUrl).pipe(take(1));
  }

  public desativarFuncionario(codigoFuncionario: number): Observable<any>{
    return this.api
    .delete(`${this.baseUrl}/${codigoFuncionario}`)
    .pipe(take(1));
  }

  public obterApenasUmFuncionario(codigoFuncionario: number): Observable<Funcionario> {
    return this.api.get<Funcionario>(`${this.baseUrl}/${codigoFuncionario}`).pipe(take(1));;
  }

  public atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario>{
    return this.api
    .put<Funcionario>(`${this.baseUrl}/${funcionario.codigoFuncionario}`, {funcionario})
    .pipe(take(1));
  }

}
