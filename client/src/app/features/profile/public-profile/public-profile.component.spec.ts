import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileComponent } from './public-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ProfileFormDialogComponent } from '../profile-form-dialog/profile-form-dialog.component';
import { IProfile } from 'src/app/interfaces/profile';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


describe('PublicProfileComponent', () => {
  let component: PublicProfileComponent;
  let fixture: ComponentFixture<PublicProfileComponent>;
  let mockMatDialogSpy: jasmine.SpyObj<MatDialog>;

  const mockDialogRef: Partial<MatDialogRef<any>> = {
    afterClosed: () => of(null)
  };

  const mockProfileData: IProfile = {
    _id: '1',
    ownerId: 'owner-id-123',
    bio: 'Test bio content',
    githubUsername: 'testuser',
    socialMedia: {
      linkedin: 'testlinkedin'
    },
    createdAt: '2025-08-01',
    updatedAt: '2025-08-08'
  }

  beforeEach(() => {
    mockMatDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatDialogSpy.open.and.returnValue(mockDialogRef as MatDialogRef<any>);


    TestBed.configureTestingModule({
      declarations: [PublicProfileComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: mockMatDialogSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    });
    fixture = TestBed.createComponent(PublicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open ProfileFormDialogComponent with correct config for create', () => {
    component.openCreateProfileDialog();

    expect(mockMatDialogSpy.open).toHaveBeenCalledWith(
      ProfileFormDialogComponent,
      jasmine.objectContaining({
        width: '600px',
        disableClose: true,
        autoFocus: true,

        data: jasmine.objectContaining({
          mode: 'create',
          data: null,
          title: 'Create Public Profile'
        })
      })
    );
  });


  it('should open ProfileFormDialogComponent with correct config for edit', () => {
    component.openEditProfileDialog(mockProfileData);

    expect(mockMatDialogSpy.open).toHaveBeenCalledWith(
      ProfileFormDialogComponent,
      jasmine.objectContaining({
        width: '600px',
        disableClose: true,
        autoFocus: true,

        data: jasmine.objectContaining({
          mode: 'edit',
          data: mockProfileData,
          title: 'Edit Public Profile'
        })
      })
    );
  });

  it('should open ConfirmDialogComponent with correct config for delete', () => {
    component.openDeleteProfileDialog();

    expect(mockMatDialogSpy.open).toHaveBeenCalledWith(
      ConfirmDialogComponent,
      jasmine.objectContaining({
        width: '600px',

        data: jasmine.objectContaining({
          title: 'Delete Profile',
          message: 'Are you sure you want to delete your public profile? This action cannot be undone.',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel'
        })
      })
    );
  });


  it('should open create profile dialog', () => {
    component.openCreateProfileDialog();
    expect(mockMatDialogSpy.open).toHaveBeenCalled();
  })

  it('should open edit profile dialog', () => {
    component.openEditProfileDialog(mockProfileData);
    expect(mockMatDialogSpy.open).toHaveBeenCalled();
  })

  it('should open delete confirm profile dialog', () => {
    component.openDeleteProfileDialog();
    expect(mockMatDialogSpy.open).toHaveBeenCalled();
  })

});
