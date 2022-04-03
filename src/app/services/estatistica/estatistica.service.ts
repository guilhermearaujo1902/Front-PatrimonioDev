import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Estatisticas } from '../../models/Estatistica';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {

  constructor(private api: ApiService) { }

  baseUrl = `${environment.apiUrl}estatisticas`;

  public obterEstatisticasCategoria(): Observable<Estatisticas[]>{
    return this.api.get<Estatisticas[]>(this.baseUrl).pipe(take(1));
  }

}
