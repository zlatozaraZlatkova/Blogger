import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormsSectionComponent } from './auth-forms-section.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('AuthFormComponent', () => {
  let component: AuthFormsSectionComponent;
  let fixture: ComponentFixture<AuthFormsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormsSectionComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(AuthFormsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default active state for tabs to be signInForm', () => {
    expect(component.activeTab).toBe('signInForm');
    expect(component.isActive('signInForm')).toBeTrue();
    expect(component.isActive('signUpForm')).toBeFalse();
  });

  it('should return correct active state for tabs', () => {
    component.activeTab = 'signInForm';
    expect(component.isActive('signInForm')).toBeTrue();
    expect(component.isActive('signUpForm')).toBeFalse();

    component.activeTab = 'signUpForm';
    expect(component.isActive('signInForm')).toBeFalse();
    expect(component.isActive('signUpForm')).toBeTrue();
  });

  it('should provide navigation to signInForm', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.setActiveTab('signInForm');
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);

  });

  it('should provide navigation to signUpForm', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.setActiveTab('signUpForm');
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/auth/register']);

  });

  it('should display welcome message for signUpForm', () => {
    component.activeTab = 'signUpForm';
    fixture.detectChanges();

    const pElements = fixture.nativeElement.querySelectorAll('p');

    expect(pElements[0].textContent.trim()).toContain('Programmer: A machine that turns coffee into code.');
    expect(pElements[1].textContent.trim()).toContain('Terry Pratchett');
    expect(pElements[2].textContent.trim()).toContain('Senior JavaScript Developer');

  });

  it('should display welcome message for signInForm', () => {
    component.activeTab = 'signInForm';
    fixture.detectChanges();

    const pElements = fixture.nativeElement.querySelectorAll('p');

    expect(pElements[1].textContent.trim()).toContain('John Robert');


  });

});
