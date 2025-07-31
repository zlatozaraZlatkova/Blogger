import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
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


});
