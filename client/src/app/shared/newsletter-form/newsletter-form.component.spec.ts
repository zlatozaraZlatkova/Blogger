import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterFormComponent } from './newsletter-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

describe('NewsletterFormComponent', () => {
  let component: NewsletterFormComponent;
  let fixture: ComponentFixture<NewsletterFormComponent>;
  let mockMatDialogSpy: jasmine.SpyObj<MatDialog>;

  const mockDialogRef: Partial<MatDialogRef<any>> = {
    afterClosed: () => of(null)
  };

  beforeEach(() => {
    mockMatDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatDialogSpy.open.and.returnValue(mockDialogRef as MatDialogRef<any>);



    TestBed.configureTestingModule({
      declarations: [NewsletterFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialog, useValue: mockMatDialogSpy }
      ]
    });
    fixture = TestBed.createComponent(NewsletterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open ConfirmDialogComponent with correct config', () => {
    component.unsubscribeHandler();

    expect(mockMatDialogSpy.open).toHaveBeenCalledWith(
      ConfirmDialogComponent,
      jasmine.objectContaining({
        width: '600px',
        data: jasmine.objectContaining({
          title: 'Newsletter Unsubscibe'
        })
      })
    );
  });

  it('should open unsubscribeHandler dialog', () => {
    component.unsubscribeHandler();
    expect(mockMatDialogSpy.open).toHaveBeenCalled();
  })



  it('should display provided message in DOM', () => {
    component.successMessage = 'Subscribed';
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector('div.mt-2.text-sm.text-green-700');

    expect(div.textContent).toContain('Subscribed');
  });



  it('should display container with message', () => {
    component.successMessage = 'Subscribed';
    fixture.detectChanges();

    const divContainer = fixture.nativeElement.querySelector('div.message-container');

    expect(divContainer).toBeTruthy();
  });


  it('should NOT display container when NO error message', () => {
    component.successMessage = '';
    fixture.detectChanges();

    const divContainer = fixture.nativeElement.querySelector('div.message-container');

    expect(divContainer).toBeFalsy();
  });



  it('should call unsubscribeHandler when button is clicked', () => {

    spyOn(component, 'unsubscribeHandler');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.unsubscribe-btn');

    button.click();

    expect(component.unsubscribeHandler).toHaveBeenCalled();
  });


  it('should NOT set disabled attribute when form is valid', () => {
    const emailControl = component.newsletterForm.get('email')
    emailControl?.setValue('test@domain.com');

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.subscribe-btn');

    expect(button.disabled).toBeFalse();
  });


  it('should set disabled attribute when form is invalid', () => {
    const emailControl = component.newsletterForm.get('email');

    emailControl?.setValue('');
    emailControl?.markAsTouched();

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.subscribe-btn');

    expect(button.disabled).toBeTrue();
  });


  it('should show validation errors for invalid email when touched', () => {
    const emailControl = component.newsletterForm.get('email');

    emailControl?.setValue('e-mail@do.c');
    emailControl?.markAsTouched();

    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelector('p.error');

    expect(errorMessages).toBeTruthy();
    expect(errorMessages.textContent).toContain('Please enter a valid email address');

  });


  it('should NOT show validation errors when NO touched', () => {
    const emailControl = component.newsletterForm.get('email');

    emailControl?.setValue('');
    emailControl?.markAsUntouched();

    fixture.detectChanges();

    const errorParagraphs = fixture.nativeElement.querySelectorAll('p.error');

    expect(Array.from(errorParagraphs).length).toBe(0);


    expect(errorParagraphs.textContent).not.toContain('Email is required!');
    expect(errorParagraphs.textContent).not.toContain('Please enter a valid email address');


  });


});
