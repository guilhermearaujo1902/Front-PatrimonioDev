import { EncryptDecryptService } from './../encrypt-decrypt/encrypt-decrypt.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApi } from '../../models/interfaces/IApi';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApi {

  private readonly options: any;
  private token: any = localStorage.getItem("valor");
 //TODO: Passar para o service token
  constructor(private http: HttpClient, private encriptar: EncryptDecryptService) {
    debugger;

    if(typeof this.token == "undefined" || this.token == null){
      this.token = "";
    }

    this.options = {
        'Content-type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        'Authorization': `Bearer ${this.encriptar.decrypt(this.token)}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'

    }
  }

  get<T>(url: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.get<T>(url, {
      headers: {
       ...this.options,
      },
      ...options
     });
  }

  post<T>(url: string, data: any, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(url, data, {
      headers: {
       ...this.options,
      },
      ...options
     });
  }

  postImage<T>(url: string, data: any, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(url, data, {
        headers: {
          'Authorization': `Bearer ${this.encriptar.decrypt(localStorage.getItem('valor'))}`
      },
      ...options
     });
  }

  put<T>(url: string, data: any, options?: any): Observable<T> {
       // @ts-ignore
       return this.http.put<T>(url, data, {
        headers: {
         ...this.options,
        },
        ...options
       });
  }

  delete<T>(url: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.delete<T>(url, {
      headers: {
      ...this.options,
      },
      ...options
    });
  }

  patch<T>(url: string, data: any, options?: any): Observable<T> {
    throw new Error('Method not implemented.');
  }


}
