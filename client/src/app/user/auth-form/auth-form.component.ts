import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {
  activeTab: 'signInForm' | 'signUpForm' = 'signInForm';

  setActiveTab(tab: 'signInForm' | 'signUpForm'): void {
    this.activeTab = tab;
  }

  isActive(tab: 'signInForm' | 'signUpForm'): boolean {
    return this.activeTab === tab;
  }
}
