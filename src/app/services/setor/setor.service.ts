import { SetorDto } from '../../models/dtos/SetorDto';
import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Setor } from '../../models/Setor';

@Injectable()

export class SetorService {

  baseUrl = `${GlobalVariavel.BASE_API_URL}setor`;

  constructor(private http: HttpClient) { }

  public post(setor: SetorDto): Observable<SetorDto> {
    return this.http
    .post<SetorDto>(this.baseUrl, {setor})
    .pipe(take(1));
  }

  public obterSetor(): Observable<Setor[]> {
    return this.http.get<Setor[]>(this.baseUrl).pipe(take(1));;
  }

  public deletarSetor(setorId: number): Observable<any>{
    return this.http
    .delete(`${this.baseUrl}/${setorId}`)
    .pipe(take(1));
  }

}
