import { Injectable, OnDestroy } from '@angular/core';
import { IUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, of, Subscription, tap, throwError } from 'rxjs';

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

  checkIsUserAuthenticated(): Observable<IUser> {
    return this.httpClient
      .get<IUser>('/api/check-auth')
      .pipe(tap((user) => {
        //console.log('Received user:', user);
        this.user$$.next(user);
        //console.log('Updated user state:', this.user);
      }),
      catchError((err) => {
        this.user$$.next(null);
        return of(err)
      })
    );
  }

  removePostFromLikedPosts(postId: string) {
    const currentProfile = this.user$$.value;

    if (currentProfile) {
      const updatedProfile = {
        ...currentProfile,
        likedPostList: currentProfile.likedPostList.filter(post => post._id !== postId)
      };
      this.user$$.next(updatedProfile);
    }
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
