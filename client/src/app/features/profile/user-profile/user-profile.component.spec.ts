import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of, skip } from 'rxjs';
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
    followedUsersList: [],
    publicProfile: mockProfileData

  };

  const mockPostData: IPost = {
    _id: '1',
    name: 'Test User',
    avatar: 'www.avatar.com',
    postImageUrl: 'www.url.com',
    postCategory: 'tool',
    postTags: ['angular', 'nodejs', 'typescript'],
    postTitle: 'Post Title',
    postText: 'Post Text',
    postLikes: [],
    comments: [],
    views: 88,
    ownerId: '01',
  };




  beforeEach(() => {
    profileSubject = new BehaviorSubject<IProfile | null>(mockProfileData);

    profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfile'], {
      userPublicProfile$: profileSubject.asObservable()
    })

    profileServiceSpy.getProfile.and.returnValue(of(mockProfileData));

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
              data: { user: mockUserData }
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

    component.userCreatedPosts$.subscribe(posts => {
      expect(posts).toEqual([]);
    });

  });

  it('should return user created posts when available', () => {
    const updateMockUserData = {
      ...mockUserData,
      createdPosts: [mockPostData]
    }

    userSubject.next(updateMockUserData);

    component.userCreatedPosts$.subscribe(posts => {
      expect(posts).toEqual([mockPostData]);
      expect(posts.length).toBe(1);
    });

  });


  it('should return user liked posts when available', () => {
    const updateMockUserData = {
      ...mockUserData,
      likedPostList: [mockPostData, mockPostData]
    }

    userSubject.next(updateMockUserData);

    component.userLikedPosts$.subscribe(posts => {
      expect(posts).toEqual([mockPostData, mockPostData]);
      expect(posts.length).toBe(2);
    });

  });


  it('should return followedUsersList when available', () => {
    const updateMockUserData = {
      ...mockUserData,
      followedUsersList: [mockUserData, mockUserData, mockUserData]
    }

    userSubject.next(updateMockUserData);

    component.userFollowingListCount$.subscribe(usersCount => {
      expect(usersCount).toBe(3);
    });

  });


  it('should return userFollowersCount when available', () => {
    const updateMockProfileData = {
      ...mockProfileData,
      followerList: [mockUserData]
    };

    profileSubject.next(updateMockProfileData);

    component.userFollowersCount$.pipe(skip(1)).subscribe(usersCount => {
      expect(usersCount).toBe(1);
    });

  });


  it('should call loadUserProfile when resolvedUser has publicProfile', () => {
    spyOn(component, 'loadUserProfile');
    component.ngOnInit();

    expect(component.loadUserProfile).toHaveBeenCalled();
  });


  it('should set resolvedUser from route data', () => {

    const updatedMockUser = {
      ...mockUserData,
      publicProfile: undefined
    };

    component['route'].snapshot.data = { user: updatedMockUser };

    component.ngOnInit();

    expect(component.resolvedUser).toEqual(updatedMockUser);
    expect(component.resolvedUser?.publicProfile).toBeUndefined();

  });


  it('should openEditProfileDialog hander when edit button is clicked', () => {

    spyOn(component, 'openEditProfileDialog');

    const editButton = fixture.nativeElement.querySelector('[data-testid="edit-profile-btn"]');
    expect(editButton).toBeTruthy();
    editButton.click();

    expect(component.openEditProfileDialog).toHaveBeenCalledWith(mockProfileData);
  });


  it('should show clickable remove action button', () => {
    const updateMockUserData = {
      ...mockUserData,
      likedPostList: [mockPostData]
    }

    userSubject.next(updateMockUserData);

    spyOn(component, 'removeFromReadingList');

    fixture.detectChanges();

    const removeBtn = fixture.nativeElement.querySelector('[data-testid="remove-button"]');
    expect(removeBtn).toBeTruthy();
    removeBtn.click();

    expect(component.removeFromReadingList).toHaveBeenCalled();
    expect(component.removeFromReadingList).toHaveBeenCalledWith(mockPostData._id);
  });


  it('should call navigateToPost when related post is clicked', () => {
    const updateMockUserData = {
      ...mockUserData,
      likedPostList: [mockPostData]
    }

    userSubject.next(updateMockUserData);

    spyOn(component, 'navigateToPost');

    fixture.detectChanges();

    const postEl = fixture.nativeElement.querySelector('[data-testid="post-id"]');
    expect(postEl).toBeTruthy();
    postEl.click();

    expect(component.navigateToPost).toHaveBeenCalledWith(mockPostData._id);
  });

});
