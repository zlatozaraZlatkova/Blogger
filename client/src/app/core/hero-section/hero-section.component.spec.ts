import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionComponent } from './hero-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomButtonComponent } from 'src/app/shared/custom-button/custom-button.component';
import { AuthService } from 'src/app/user/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroSectionComponent, CustomButtonComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthService,
        { provide: MatDialogRef, useValue: { close: () => { } } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display write button if user', () => {
    const authService = TestBed.inject(AuthService);

    spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

    fixture.detectChanges();


    const button = fixture.nativeElement.querySelector('app-custom-button button.write-btn');

    expect(button).toBeTruthy();

  });

  it('should display sing-in button if NO logged in user', () => {
    const authService = TestBed.inject(AuthService);

    spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(false);

    fixture.detectChanges();


    const button = fixture.nativeElement.querySelector('app-custom-button button.login-btn');

    expect(button).toBeTruthy();

  });

});
