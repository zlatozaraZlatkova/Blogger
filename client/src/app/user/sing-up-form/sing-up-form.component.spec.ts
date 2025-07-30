import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpFormComponent } from './sing-up-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('SingUpFormComponent', () => {
  let component: SingUpFormComponent;
  let fixture: ComponentFixture<SingUpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingUpFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
      { provide: MatDialogRef, useValue: { close: () => {} } },
      { provide: MAT_DIALOG_DATA, useValue: {} }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
       
    });
    fixture = TestBed.createComponent(SingUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
