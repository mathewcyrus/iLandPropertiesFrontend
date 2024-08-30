import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/auth';

  constructor(private apiService: ApiService) {}

  login(
    email: string,
    password: string
  ): Observable<{ message: string; token: string }> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };
    return this.apiService.post<{ message: string; token: string }>(url, body);
  }

  getUserIdFromToken(token: string): string {
    const decoded: any = jwtDecode(token);
    return decoded.user_id;
  }
}
