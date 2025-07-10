import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticated = false;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.checkIsUserAuthenticated().subscribe({
      next: (user) => {
        if (user && user.email) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.isAuthenticated = false;
        this.router.navigate(['/auth/login']);
      }
    })
  }

}