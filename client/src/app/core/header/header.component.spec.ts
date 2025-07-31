import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/user/auth.service';
import { CustomButtonComponent } from 'src/app/shared/custom-button/custom-button.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, CustomButtonComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should navigate to posts when blog link is clicked', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.toggleMobileMenu();
    fixture.detectChanges();


    const blogLink = fixture.nativeElement.querySelector('.blogLink');
    blogLink.click();



    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });


  it('should navigate to posts/create when blog link is clicked', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.toggleMobileMenu();
    fixture.detectChanges();


    const writeLink = fixture.nativeElement.querySelector('.writeLink');
    writeLink.click();



    expect(router.navigate).toHaveBeenCalledWith(['/posts/create']);
  });


  it('should display sing-in button if NO logged in user', () => {
    const authService = TestBed.inject(AuthService);

    spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(false);

    fixture.detectChanges();


    const button = fixture.nativeElement.querySelector('app-custom-button button.login-btn');

    expect(button).toBeTruthy();

  });

  it('should display logout button if logged in user', () => {
    const authService = TestBed.inject(AuthService);

    spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

    fixture.detectChanges();


    const button = fixture.nativeElement.querySelector('app-custom-button button.logout-btn');

    expect(button).toBeTruthy();

  });

  it('should display profile button if logged in user', () => {
    const authService = TestBed.inject(AuthService);

    spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

    fixture.detectChanges();


    const button = fixture.nativeElement.querySelector('app-custom-button button.profile-btn');

    expect(button).toBeTruthy();

  });




});
