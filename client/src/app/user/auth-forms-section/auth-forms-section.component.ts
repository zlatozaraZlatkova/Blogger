import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-forms-section',
  templateUrl: './auth-forms-section.component.html',
  styleUrls: ['./auth-forms-section.component.css'],
})

export class AuthFormsSectionComponent implements OnInit {
  activeTab: 'signInForm' | 'signUpForm' = 'signInForm';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentUrl = this.router.url;
    
    if (currentUrl.includes('/auth/register')) {
      this.activeTab = 'signUpForm';
    } else {
      this.activeTab = 'signInForm';
    }
  }

  isActive(tab: 'signInForm' | 'signUpForm'): boolean {
    return this.activeTab === tab;
  }

  setActiveTab(tab: 'signInForm' | 'signUpForm'): void {
    this.activeTab = tab;

    if (tab === 'signInForm') {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/auth/register']);
    }
  }
}
