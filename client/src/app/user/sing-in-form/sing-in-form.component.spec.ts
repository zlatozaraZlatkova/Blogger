import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingInFormComponent } from './sing-in-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('SingInFormComponent', () => {
  let component: SingInFormComponent;
  let fixture: ComponentFixture<SingInFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingInFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(SingInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation error when email is touched and empty', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    emailControl?.markAsTouched();

    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelector(
      '[data-testid="error-msg-required"]'
    );

    expect(errorMessages).toBeTruthy();
    expect(errorMessages.textContent.trim()).toContain('Email is required!');
  });

  it('should show validation errors when password is touched and empty', () => {
    const passControl = component.loginForm.get('password');
    passControl?.setValue('');
    passControl?.markAsTouched();

    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelector(
      '[data-testid="error-pass-required"]'
    );

    expect(errorMessages).toBeTruthy();
    expect(errorMessages.textContent.trim()).toContain('Password is required!');
  });

  it('should show validation errors for invalid email when touched', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('test@domain');
    emailControl?.markAsTouched();

    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelector(
      '[data-testid="error-msg"]'
    );

    expect(errorMessages).toBeTruthy();
    expect(errorMessages.textContent.trim()).toContain(
      'Please enter a valid email address'
    );
  });

  it('should enable login button when form is valid', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('username@domain.com');

    const passControl = component.loginForm.get('password');
    passControl?.setValue('1!Aa22222');

    expect(component.loginForm.valid).toBe(true);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-testid="login-btn"]');
    expect(button).toBeTruthy();

    expect(button.disabled).toBeFalse();

  });



  it('should disable login button when form is invalid', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');

    const passControl = component.loginForm.get('password');
    passControl?.setValue('');

    expect(component.loginForm.valid).toBe(false);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-testid="login-btn"]');
    expect(button).toBeTruthy();

    expect(button.disabled).toBeTrue();

  });

  it('should show password when togglePasswordVisibility is called', () => {
    component.showPassword = false;
    fixture.detectChanges();
    
    const passIsHidden = fixture.nativeElement.querySelector('input[type="password"]');
    expect(passIsHidden).toBeTruthy();

    component.togglePasswordVisibility();
    fixture.detectChanges();


    const passIsVisible = fixture.nativeElement.querySelector('input[type="text"]');
    expect(passIsVisible).toBeTruthy();

    expect(component.showPassword).toBeTrue();

  });


  it('should hidden password when togglePasswordVisibility is called', () => {
    component.showPassword = true;
    fixture.detectChanges();

    const passIsVisible = fixture.nativeElement.querySelector('input[type="text"]');
    expect(passIsVisible).toBeTruthy();

    component.togglePasswordVisibility();
    fixture.detectChanges();

    const passIsHidden = fixture.nativeElement.querySelector('input[type="password"]');
    expect(passIsHidden).toBeTruthy();

    expect(component.showPassword).toBeFalse();

  });




});
