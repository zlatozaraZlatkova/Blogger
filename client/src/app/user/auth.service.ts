import { Injectable, OnDestroy } from '@angular/core';
import { IUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private basicUrl = `/api/auth`;
  private user$$ = new BehaviorSubject<IUser | null | undefined>(undefined);

  user$ = this.user$$.asObservable()
    .pipe(filter((val): val is IUser | null => val !== undefined));

  user: IUser | null = null;

  get isLoggedIn() {
    return this.user !== null;
  }

  subscription: Subscription;

  constructor(private httpClient: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user
    });
  }

  register(name: string, email: string, password: string): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${this.basicUrl}/register`, { name, email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${this.basicUrl}/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout(): Observable<void> {
    return this.httpClient
      .get<void>(`${this.basicUrl}/logout`, {})
      .pipe(tap(() => this.user$$.next(null)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
