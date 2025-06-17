import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const loginRequired = route.data['loginRequired']; 
    const isLoggedIn = this.authService.isLoggedIn;
    

    if (loginRequired === undefined) {
      return true;
    }


    if (loginRequired && !isLoggedIn) {
      return this.router.createUrlTree(['/auth/login']);
    }
  

    if (!loginRequired && isLoggedIn) {
      return this.router.createUrlTree(['/auth/profile']);
    }


    return true;
  }
}