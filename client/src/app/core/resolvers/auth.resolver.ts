import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/user/auth.service';


export const authResolver: ResolveFn<IUser> = (): Observable<IUser> => {
  const authService = inject(AuthService);

  return authService.checkIsUserAuthenticated();
  
};