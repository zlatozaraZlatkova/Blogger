import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  navigateToPosts(): void {
    this.router.navigate(['/posts'])
  }

  navigateToCreatePost(): void {
    this.router.navigate(['/posts/create'])
  }
}
