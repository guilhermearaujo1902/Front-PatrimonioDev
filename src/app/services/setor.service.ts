import { SetorDto } from './../models/SetorDto';
import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()

export class SetorService {

  baseUrl = `${GlobalVariavel.BASE_API_URL}setor`;

  constructor(private http: HttpClient) { }

  public post(setor: SetorDto): Observable<SetorDto> {
    return this.http
    .post<SetorDto>(this.baseUrl, {setor})
    .pipe(take(1));
  }

}
