import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { PerdaEquipamento } from '../../models/PerdaEquipamento';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerdaService {

  baseUrl = `${environment.apiUrl}perdas`;

  constructor(private api: ApiService) { }

  public cadastrarPerda(perdaEquipamento: PerdaEquipamento): Observable<PerdaEquipamento>{
    return this.api.post<PerdaEquipamento>(this.baseUrl, {perdaEquipamento}).pipe(take(1));
  }
}
