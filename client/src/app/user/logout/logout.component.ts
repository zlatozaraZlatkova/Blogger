import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IUser } from 'src/app/interfaces/user';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  user: IUser | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.logoutHandler();
  }

  logoutHandler(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.user = null;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.authService.user = null;
        this.router.navigate(['/']);
      }
    });

  }
}
