import { Injectable } from '@angular/core';
import { IUserTest } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUserTest | null = null;

  get isLoggedIn() {
    return this.user !== null;
  }

  constructor() { }
}
