import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtonComponent } from './custom-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomButtonComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should display provided button text in span tag at DOM', () => {
    component.buttonText = 'Custom Button';
    fixture.detectChanges();

    const span = fixture.nativeElement.querySelector('span');

    expect(span.textContent).toContain('Custom Button');
  });



  it('should apply custom CSS color style', () => {
    component.buttonClass = 'primary-button';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(button.classList).toContain('primary-button');
  });



  it('should set disabled attribute when disabled = true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(button.disabled).toBe(true);
  });

  
  
  it('should apply form-is-active class when disabled = true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(button.classList).toContain('form-is-not-active');
  });


  it('should NOT set disabled attribute when disabled = flase', () => {
    component.disabled = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(button.disabled).toBe(false);
  });


  it('should apply form-is-active class when disabled = false', () => {
    component.disabled = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(button.classList).toContain('form-is-active');
  });




  it('should redirect to provided router link ', () => {
    component.routerLink = '/posts';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(button.getAttribute('ng-reflect-router-link')).toBe('/posts');

  });




});
