import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardComponent } from './profile-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/user/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IProfileWithCreatedPosts } from 'src/app/interfaces/profile';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;

  const mockUserData: IUser = {
    _id: '1',
    name: 'User Name',
    email: 'user@email.com',
    avatar: 'www.avatar.com',
    createdPosts: [],
    likedPostList: [],
  };

  const mockProfileData: IProfileWithCreatedPosts = {
    profile: {
      _id: '123',
      ownerId: 'owner-id-234',
      bio: 'User bio',
      githubUsername: '',
      socialMedia: {
        linkedin: ''
      },
      followerList: [],
      createdAt: '2025-08-08',
      updatedAt: '2025-08-08',
    },
    createdPosts: []
  }

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      user: mockUserData,
    });
    TestBed.configureTestingModule({
      declarations: [ProfileCardComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return current user id', () => {
    spyOnProperty(component, 'currentUserId', 'get').and.returnValue(
      'current-user-id-123'
    );

    fixture.detectChanges();

    expect(component.currentUserId).toBe('current-user-id-123');
  });

  it('should display profile card if profileData', () => {
    component.profileData = mockProfileData;
    spyOnProperty(component, 'isAlreadyFollowed', 'get').and.returnValue(true);

    fixture.detectChanges();

    expect(component.isAlreadyFollowed).toBe(true);

    const profileCard = fixture.nativeElement.querySelector('[data-testid="profile-card"]');
    expect(profileCard).toBeTruthy();


  });

  it('should not display profile card if profileData is null', () => {
    component.profileData = null;
    spyOnProperty(component, 'isAlreadyFollowed', 'get').and.returnValue(false);

    fixture.detectChanges();

    expect(component.isAlreadyFollowed).toBe(false);

    const profileCard = fixture.nativeElement.querySelector('[data-testid="profile-card"]');
    expect(profileCard).toBeFalsy();
  });

  it('should display follow button for unfollowed profiles', () => {
    component.profileData = mockProfileData;

    spyOnProperty(component, 'isAlreadyFollowed', 'get').and.returnValue(false);

    fixture.detectChanges();

    expect(component.isAlreadyFollowed).toBe(false);

    const followBtnContainer = fixture.nativeElement.querySelector('div.m-6');
    expect(followBtnContainer).toBeTruthy();

  });

  it('should NOT display follow button for followed profiles', () => {
    component.profileData = mockProfileData;

    spyOnProperty(component, 'isAlreadyFollowed', 'get').and.returnValue(true);

    fixture.detectChanges();
    expect(component.isAlreadyFollowed).toBe(true);

    const followBtnContainer = fixture.nativeElement.querySelector('div.m-6');
    expect(followBtnContainer).toBeFalsy();

  });

  it('should call onFollow when button is clicked', () => {
    component.profileData = mockProfileData;
    spyOnProperty(component, 'isAlreadyFollowed', 'get').and.returnValue(false);
    spyOn(component, 'onFollow');

    fixture.detectChanges();

    const followBtn = fixture.nativeElement.querySelector('[data-testid="follow-btn"]');
    followBtn.click();

    expect(component.onFollow).toHaveBeenCalled();

  });

  it('should display success message when message is set', () => {
    component.profileData = mockProfileData;
    component.successMessage = 'Successfully followed profile!';

    fixture.detectChanges();

    const successMsg = fixture.nativeElement.querySelector('.success-msg');
    expect(successMsg.textContent.trim()).toBe('Successfully followed profile!');

  });

  it('should not display success message when message is null', () => {
    component.profileData = mockProfileData;
    component.successMessage = null;

    fixture.detectChanges();

    const successMsg = fixture.nativeElement.querySelector('.success-msg');
    expect(successMsg).toBeNull();

  });

  it('should return correct GitHub URL', () => {
    const profile = {
      ...mockProfileData.profile,
      githubUsername: 'testuser'
    };

    const url = component.getGitHubProfileUrl(profile);

    expect(url).toBe('https://github.com/testuser');
  });


  it('should return correct LinkedIn URL', () => {
    const profile = {
      ...mockProfileData.profile,
      socialMedia: {
        linkedin: 'testuser'
      }
    };
    const url = component.getLinkedInProfileUrl(profile);

    expect(url).toBe('https://linkedin.com/in/testuser');
  });

});
