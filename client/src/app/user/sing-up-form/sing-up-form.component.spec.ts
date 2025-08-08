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


});
