import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(url, { params });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body, {
      withCredentials: true,
    });
  }
}
