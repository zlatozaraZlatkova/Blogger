import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private basicUrl = `/api/auth`;

  user: IUser | null  = null;

  get isLoggedIn() {
    return this.user !== null;
  }

  constructor(private httpClient: HttpClient) { }

  register(name: string, email: string, password: string): Observable<IUser> {

    return this.httpClient.post<IUser>(`${this.basicUrl}/register`, { name, email, password });
  }

  login(email: string, password: string): Observable<IUser> {
    return this.httpClient.post<IUser>(`${this.basicUrl}/login`, { email, password })

  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${this.basicUrl}/logout`, {})

  }

}
