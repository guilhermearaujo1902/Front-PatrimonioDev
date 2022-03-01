import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApi } from '../../models/interfaces/IApi';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApi {

  private readonly options: any;

  constructor(private http: HttpClient) {
    debugger;
    this.options = {
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    }
  }

  get<T>(url: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.get<T>(url, {
      headers: {
       ...this.options.headers,
      },
      ...options
     });
  }

  post<T>(url: string, data: any, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(url, data, {
      headers: {
       ...this.options.headers,
      },
      ...options
     });
  }

  postImage<T>(url: string, data: any, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(url, data, {
      headers: {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
      },
      ...options
     });
  }

  put<T>(url: string, data: any, options?: any): Observable<T> {
       // @ts-ignore
       return this.http.put<T>(url, data, {
        headers: {
         ...this.options.headers,
        },
        ...options
       });
  }

  delete<T>(url: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.delete<T>(url, {
      headers: {
      ...this.options.headers,
      },
      ...options
    });
  }

  patch<T>(url: string, data: any, options?: any): Observable<T> {
    throw new Error('Method not implemented.');
  }


}
