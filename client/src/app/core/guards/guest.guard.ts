import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isUserLoggedIn = authService.isLoggedIn;
 

  if (isUserLoggedIn) {
    return router.createUrlTree(['/auth/profile']);
  }

  return true;
};
