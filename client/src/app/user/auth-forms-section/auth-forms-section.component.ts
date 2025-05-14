import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-forms-section',
  templateUrl: './auth-forms-section.component.html',
  styleUrls: ['./auth-forms-section.component.css']
})
export class AuthFormsSectionComponent {
  activeTab: 'signInForm' | 'signUpForm' = 'signInForm';

  setActiveTab(tab: 'signInForm' | 'signUpForm'): void {
    this.activeTab = tab;
  }

  isActive(tab: 'signInForm' | 'signUpForm'): boolean {
    return this.activeTab === tab;
  }
}
