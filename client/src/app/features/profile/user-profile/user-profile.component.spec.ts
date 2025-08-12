import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { IProfile } from 'src/app/interfaces/profile';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/user/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { IPost } from 'src/app/interfaces/post';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  let profileSubject = new BehaviorSubject<IProfile | null>(null);
  let userSubject = new BehaviorSubject<IUser | null>(null);

  const mockProfileData: IProfile = {
    _id: '1',
    ownerId: 'owner-id-123',
    bio: 'Test bio content',
    githubUsername: 'testuser',
    socialMedia: {
      linkedin: 'testlinkedin'
    },
    followerList: [],
    createdAt: '2025-08-01',
    updatedAt: '2025-08-08'
  }

  const mockUserData: IUser = {
    _id: '1',
    name: 'User Name',
    email: 'user@email.com',
    avatar: 'www.avatar.com',
    createdPosts: [],
    likedPostList: [],
    followedUsersList: []
  };

  beforeEach(() => {
    profileSubject = new BehaviorSubject<IProfile | null>(mockProfileData);

    profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfile'], {
      userPublicProfile$: profileSubject.asObservable()
    })

    userSubject = new BehaviorSubject<IUser | null>(mockUserData);

    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      user$: userSubject.asObservable()
    });


    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
              data: { user: { publicProfile: null } }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate created posts from mock user data', () => {
    let result: IPost[] = [];

    component.userCreatedPosts$.subscribe(posts => result = posts);

    fixture.detectChanges();

    expect(result).toEqual([]);
  });

});
