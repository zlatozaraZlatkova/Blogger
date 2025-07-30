import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormDialogComponent } from './profile-form-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProfileFormDialogComponent', () => {
  let component: ProfileFormDialogComponent;
  let fixture: ComponentFixture<ProfileFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFormDialogComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => { } } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
