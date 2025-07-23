import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const resolvedUser = this.route.snapshot.data['user'];

    if (resolvedUser && resolvedUser !== null) {
      this.isAuthenticated = true;
    } else {

      this.authService.checkIsUserAuthenticated().subscribe({
        next: (user) => {
          console.log("User data from autenticate wrapper:", user)

          if (user && user.email) {

            this.isAuthenticated = true;
          } else {

            this.isAuthenticated = false;
          }
        },
        error: (err) => {
          this.isAuthenticated = false;
          this.router.navigate(['/auth/login']);
        }
      });
    }
  }

}