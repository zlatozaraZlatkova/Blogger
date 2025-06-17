import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isUserLoggedIn = authService.isLoggedIn;

  if (!isUserLoggedIn) {
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};
