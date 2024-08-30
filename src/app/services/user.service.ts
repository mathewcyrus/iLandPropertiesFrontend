import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/user';
  private userSubject = new BehaviorSubject<User | null>(
    this.getUserFromLocalStorage()
  );

  constructor(private httpClient: HttpClient) {}

  getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${userId}`);
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  removeUser(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUserObservable(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  getUserFromLocalStorage(): User | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
}
