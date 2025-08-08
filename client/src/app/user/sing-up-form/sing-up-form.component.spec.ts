import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpFormComponent } from './sing-up-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('SingUpFormComponent', () => {
  let component: SingUpFormComponent;
  let fixture: ComponentFixture<SingUpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingUpFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    });
    fixture = TestBed.createComponent(SingUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show password when togglePasswordVisibility is called', () => {
    component.showPassword = false;
    fixture.detectChanges();

    const passIsHidden = fixture.nativeElement.querySelector('input[data-testid="input-pass"][type="password"]');
    expect(passIsHidden).toBeTruthy();

    component.togglePasswordVisibility();
    fixture.detectChanges();


    const passIsVisible = fixture.nativeElement.querySelector('input[data-testid="input-pass"][type="text"]');
    expect(passIsVisible).toBeTruthy();

    expect(component.showPassword).toBeTrue();

  });


  it('should hidden password when togglePasswordVisibility is called', () => {
    component.showPassword = true;
    fixture.detectChanges();

    const passIsVisible = fixture.nativeElement.querySelector('input[data-testid="input-pass"][type="text"]');
    expect(passIsVisible).toBeTruthy();

    component.togglePasswordVisibility();
    fixture.detectChanges();

    const passIsHidden = fixture.nativeElement.querySelector('input[data-testid="input-pass"][type="password"]');
    expect(passIsHidden).toBeTruthy();

    expect(component.showPassword).toBeFalse();

  });


  it('should show rePassword when toggleConfirmPasswordVisibility is called', () => {
    component.showConfirmPassword = false;
    fixture.detectChanges();

    const passIsHidden = fixture.nativeElement.querySelector('input[data-testid="input-repass"][type="password"]');
    expect(passIsHidden).toBeTruthy();

    component.toggleConfirmPasswordVisibility();
    fixture.detectChanges();


    const passIsVisible = fixture.nativeElement.querySelector('input[data-testid="input-repass"][type="text"]');
    expect(passIsVisible).toBeTruthy();

    expect(component.showConfirmPassword).toBeTrue();


  });

  it('should hidden password when toggleConfirmPasswordVisibility is called', () => {
    component.showConfirmPassword = true;
    fixture.detectChanges();

    const passIsVisible = fixture.nativeElement.querySelector('input[data-testid="input-repass"][type="text"]');
    expect(passIsVisible).toBeTruthy();

    component.toggleConfirmPasswordVisibility();
    fixture.detectChanges();

    const passIsHidden = fixture.nativeElement.querySelector('input[data-testid="input-repass"][type="password"]');
    expect(passIsHidden).toBeTruthy();

    expect(component.showConfirmPassword).toBeFalse();

  });

  it('should show password requirements when password field has value', () => {
    const passwordControl = component.registerForm.get('passGroup')?.get('password');
    passwordControl?.setValue('test123');
    passwordControl?.markAsTouched();

    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.text-gray-700');
    expect(title).toBeTruthy();
    expect(title.textContent.trim()).toBe('Password Requirements:');

    const text = fixture.nativeElement.querySelector('.requirement-text');
    expect(text).toBeTruthy();
    expect(text.textContent.trim()).toBe('At least 8 characters');
  });

  it('should apply "invalid" class when password does not meet minimum length requirement', () => {
    const passwordControl = component.registerForm.get('passGroup')?.get('password');
    passwordControl?.setValue('test123');
    passwordControl?.markAsTouched();

    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.requirement-item');
    expect(item.classList.contains('invalid')).toBeTruthy();
    expect(item.classList.contains('valid')).toBeFalsy();

    const icon = fixture.nativeElement.querySelector('.requirement-icon');
    expect(icon.classList.contains('invalid')).toBeTruthy();

    const text = fixture.nativeElement.querySelector('.requirement-text');
    expect(text.classList.contains('invalid')).toBeTruthy();

  });

  it('should show validation details for weak password', () => {
    const passwordControl = component.registerForm.get('passGroup')?.get('password');
    passwordControl?.setValue('aaa');
    passwordControl?.markAsTouched();

    const details = component.getPasswordDetails;

    fixture.detectChanges();

    expect(details).toBeTruthy();

    expect(details?.hasMinLength).toBeFalsy();
    expect(details?.hasUpper).toBeFalsy();
    expect(details?.hasNumber).toBeFalsy();
    expect(details?.hasSymbol).toBeFalsy();

  });

  it('should show validation details when password is missing a symbol', () => {
    const passwordControl = component.registerForm.get('passGroup')?.get('password');
    passwordControl?.setValue('Aa3456789');
    passwordControl?.markAsTouched();

    const details = component.getPasswordDetails;

    fixture.detectChanges();

    expect(details).toBeTruthy();

    expect(details?.hasMinLength).toBeTruthy();
    expect(details?.hasUpper).toBeTruthy();
    expect(details?.hasNumber).toBeTruthy();
    expect(details?.hasSymbol).toBeFalsy();

  });

  it('should return success validation result for valid password', () => {
    const passwordControl = component.registerForm.get('passGroup')?.get('password');
    passwordControl?.setValue('1!Aa2bfdDf#asd');

    fixture.detectChanges();

    const details = component.getPasswordDetails;

    expect(details).toBeTruthy();
    expect(details?.hasMinLength).toBeTruthy();
    expect(details?.hasUpper).toBeTruthy();
    expect(details?.hasNumber).toBeTruthy();
    expect(details?.hasSymbol).toBeTruthy();


  });

  it('should return null when password is empty', () => {
    const passwordControl = component.registerForm.get('passGroup')?.get('password');
    passwordControl?.setValue('');
    fixture.detectChanges();

    expect(component.getPasswordDetails).toBeNull();

  });

});
