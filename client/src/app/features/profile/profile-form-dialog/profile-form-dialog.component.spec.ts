import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormDialogComponent } from './profile-form-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IProfile } from 'src/app/interfaces/profile';
import { IDialogData } from 'src/app/interfaces/dialogData';

describe('ProfileFormDialogComponent', () => {
  let component: ProfileFormDialogComponent;
  let fixture: ComponentFixture<ProfileFormDialogComponent>;
  let mockDialogRefSpy: jasmine.SpyObj<MatDialogRef<ProfileFormDialogComponent>>;

  const mockModeCreateData: IDialogData = {
    mode: 'create',
    data: undefined,
    title: 'Create Public Profile'
  };

  const mockModeEditData: IDialogData = {
    mode: 'edit',
    data: {
      bio: 'Test bio content',
      githubUsername: 'testuser',
      socialMedia: {
        linkedin: 'testlinkedin'
      },
    } as IProfile,
    title: 'Edit Public Profile'
  };

  beforeEach(() => {
    mockDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ProfileFormDialogComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(ProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be in edit mode when data has edit mode', () => {
    component.profileData = mockModeEditData;
    expect(component.profileData.mode).toBe('edit');

    component.ngOnInit();

    expect(component.isEditMode).toBeTrue();
  });

  it('should be in create mode when data has create mode', () => {
    component.profileData = mockModeCreateData;
    expect(component.profileData.mode).toBe('create');

    component.ngOnInit();

    expect(component.isEditMode).toBeFalse();
  });
});
