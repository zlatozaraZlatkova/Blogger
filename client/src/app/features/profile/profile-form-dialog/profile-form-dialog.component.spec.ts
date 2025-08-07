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
    expect(component.profileData.mode).toBe('create');
    expect(component.profileData.title).toBe('Create Public Profile');
  });

  it('should initialize form after ngOnInit', () => {

    const bio = component.createProfileForm.get('bio');
    const githubUsername = component.createProfileForm.get('githubUsername');
    const linkedin = component.createProfileForm.get('linkedin');

    expect(bio).toBeDefined();
    expect(githubUsername).toBeDefined();
    expect(linkedin).toBeDefined();
  });

  it('should have empty form in create mode', () => {

    const bio = component.createProfileForm.get('bio');
    const githubUsername = component.createProfileForm.get('githubUsername');
    const linkedin = component.createProfileForm.get('linkedin');

    expect(bio?.value).toBe('');
    expect(githubUsername?.value).toBe('');
    expect(linkedin?.value).toBe('');

  });

  it('should contolles to be required', () => {
    const bio = component.createProfileForm.get('bio');
    const githubUsername = component.createProfileForm.get('githubUsername');
    const linkedin = component.createProfileForm.get('linkedin');

    bio?.setValue('');
    githubUsername?.setValue('');
    linkedin?.setValue('');


    fixture.detectChanges();

    expect(bio?.hasError('required')).toBe(true);
    expect(githubUsername?.hasError('required')).toBe(true);
    expect(linkedin?.hasError('required')).toBe(false);


  });

  it('should bio control has a correct max validation rules', () => {
    const bio = component.createProfileForm.get('bio');

    bio?.setValue('a'.repeat(301));
    bio?.markAsTouched();

    fixture.detectChanges();

    const maxLengthError = bio?.getError('maxlength');

    expect(maxLengthError?.requiredLength).toBe(300);
    expect(maxLengthError?.actualLength).toBe(301);

  });

  it('should linkedin control has a correct min/max validation rules', () => {

    const linkedin = component.createProfileForm.get('linkedin');

    linkedin?.setValue('a');
    fixture.detectChanges();

    const minLengthError = linkedin?.getError('minlength');
    expect(minLengthError?.requiredLength).toBe(2);
    expect(minLengthError?.actualLength).toBe(1);


    linkedin?.setValue('a'.repeat(31));
    fixture.detectChanges();

    const maxLengthError = linkedin?.getError('maxlength');
    expect(maxLengthError?.requiredLength).toBe(30);
    expect(maxLengthError?.actualLength).toBe(31);

  });

  it('should display bio validation error messages in DOM', () => {

    const bio = component.createProfileForm.get('bio');

    bio?.setValue('a'.repeat(301));
    bio?.markAsTouched();

    fixture.detectChanges();

    const errorContainer = fixture.nativeElement.querySelector('[data-testid="error-bio-message"]');

    expect(errorContainer?.textContent.trim()).toContain('Content should be no more than 300 characters long.');

  });


  it('should enable submit button when form is valid', () => {
    component.createProfileForm.patchValue({
      bio: 'Valid user bio',
      githubUsername: 'validuser',
      linkedin: 'validlinkedin'
    });

    fixture.detectChanges();

    expect(component.createProfileForm.valid).toBe(true);

    const button = fixture.nativeElement.querySelector('[data-testid="submit-btn"]');

    expect(button.disabled).toBe(false);

  });

  it('should disabled submit button when form is invalid', () => {
    component.createProfileForm.patchValue({
      githubUsername: 'validuser'
    });

    fixture.detectChanges();

    expect(component.createProfileForm.valid).toBe(false);

    const button = fixture.nativeElement.querySelector('[data-testid="submit-btn"]');

    expect(button.disabled).toBe(true);

  });

  it('should call onCancel when cancel button is clicked', () => {
    spyOn(component, 'onCancel');
    fixture.detectChanges();


    const cancelBtn = fixture.nativeElement.querySelector('[data-testid="cancel-btn"]');
    cancelBtn.click();

    expect(component.onCancel).toHaveBeenCalled();
  });


});
