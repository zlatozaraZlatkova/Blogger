import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfirmDialogData } from 'src/app/interfaces/dialogData';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockDialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  const mockDialogDataSpy: IConfirmDialogData = {
    title: '',
    message: '',
    confirmButtonText: '',
    cancelButtonText: '',
    emailInputTag: false
  }

  beforeEach(() => {
    mockDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogDataSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should close dialog with true when emailInputTag is true', () => {
    mockDialogDataSpy.emailInputTag = true;

    const emailControl = component.emailForm.get('email');
    emailControl?.setValue('test@domain.com');
    emailControl?.markAsTouched();

    fixture.detectChanges();

    component.onConfirm();
    expect(mockDialogRefSpy.close).toHaveBeenCalledWith('test@domain.com');

  });

  it('should close dialog with true when emailInputTag is false', () => {
    mockDialogDataSpy.emailInputTag = false;

    component.onConfirm();
    expect(mockDialogRefSpy.close).toHaveBeenCalledWith(true);

  });

  it('should close dialog when obCancel is called', () => {
    component.onCancel();
    expect(mockDialogRefSpy.close).toHaveBeenCalledWith(false);

  });

  it('should show validation errors when field is touched and empty', () => {
    mockDialogDataSpy.emailInputTag = true;

    const emailControl = component.emailForm.get('email');
    emailControl?.setValue('');
    emailControl?.markAsTouched();

    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelector('[data-testid="error-msg-required"]');

    expect(errorMessages).toBeTruthy();
    expect(errorMessages.textContent.trim()).toContain('Email is required!');

  });

  it('should show validation errors for invalid email when touched', () => {
    mockDialogDataSpy.emailInputTag = true;

    const emailControl = component.emailForm.get('email');
    emailControl?.setValue('test@domain');
    emailControl?.markAsTouched();

    fixture.detectChanges();


    const errorMessages = fixture.nativeElement.querySelector('[data-testid="error-msg"]');

    expect(errorMessages).toBeTruthy();
    expect(errorMessages.textContent.trim()).toContain('Please enter a valid email address');

  });

  it('should display valid button text onCancel', () => {
    mockDialogDataSpy.cancelButtonText = 'Cancel';

    fixture.detectChanges();


    const cancelBtn = fixture.nativeElement.querySelector('[data-testid="cancel-btn"]');
    cancelBtn.click();

    expect(cancelBtn).toBeTruthy();
    expect(cancelBtn.textContent.trim()).toContain('Cancel');

  });

  it('should display valid button text onConfirm', () => {
    mockDialogDataSpy.confirmButtonText = 'Unsubscribe';

    fixture.detectChanges();


    const confirmBtn = fixture.nativeElement.querySelector('[data-testid="confirm-btn"]');
    confirmBtn.click();

    expect(confirmBtn).toBeTruthy();
    expect(confirmBtn.textContent.trim()).toContain('Unsubscribe');

  });





});
