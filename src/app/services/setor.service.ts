import { SetorDto } from './../models/SetorDto';
import { Injectable } from '@angular/core';
import { GlobalVariavel } from '../../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()

export class SetorServiceService {

  baseUrl = `${GlobalVariavel.BASE_API_URL}/setor`;

  constructor(private http: HttpClient) { }

  public post(setorDto: SetorDto): Observable<SetorDto> {
    return this.http
    .post<SetorDto>(this.baseUrl, setorDto)
    .pipe(take(1));
  }

}
