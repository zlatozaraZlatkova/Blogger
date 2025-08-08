import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockDialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(() => {
    mockDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
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
    const emailControl = component.emailForm.get('email')
    emailControl?.setValue('test@domain.com');

    fixture.detectChanges();

    component.onConfirm();
    expect(mockDialogRefSpy.close).toHaveBeenCalledWith('test@domain.com');

  });

  it('should close dialog with true when emailInputTag is false', () => {
    component.onConfirm();
    expect(mockDialogRefSpy.close).toHaveBeenCalledWith(true);

  });

  it('should close dialog when obCancel is called', () => {
    component.onCancel();
    expect(mockDialogRefSpy.close).toHaveBeenCalledWith(false);

  });


});
