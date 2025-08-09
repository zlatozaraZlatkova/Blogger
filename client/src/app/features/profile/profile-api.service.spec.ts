import { TestBed } from '@angular/core/testing';

import { ProfileApiService } from './profile-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICreateProfileDto, IProfile, IProfileWithCreatedPosts } from 'src/app/interfaces/profile';
import { IUser } from 'src/app/interfaces/user';

describe('ProfileApiService', () => {
  let service: ProfileApiService;
  let httpMock: HttpTestingController;

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

  const mockProfileWithPostsData: IProfileWithCreatedPosts = {
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

  const mockCreateData: ICreateProfileDto = {
    bio: 'User bio',
    githubUsername: 'mockusername',
    socialMedia: {
      linkedin: 'mocklinkedin'
    },
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileApiService]
    });
    service = TestBed.inject(ProfileApiService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUserPublicProfile and return data', () => {
    service.getUserPublicProfile().subscribe(data => {
      expect(data).toEqual(mockProfileData);
    });

    const req = httpMock.expectOne('/api/profile');
    expect(req.request.method).toBe('GET');
    req.flush(mockProfileData);
  });

  it('should call createUserPublicProfile and return created data', () => {
    service.createUserPublicProfile(mockCreateData).subscribe(data => {
      expect(data).toEqual(mockProfileData);
    });

    const req = httpMock.expectOne('/api/profile/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCreateData);
    req.flush(mockProfileData);
  });


  it('should call updateUserPublicProfile and return updated data', () => {
    const updateProfileData = {
      ...mockProfileData,
      bio: 'Update bio mock profile data'

    }
    service.updateUserPublicProfile(updateProfileData).subscribe(data => {
      expect(data).toEqual(updateProfileData);
    });

    const req = httpMock.expectOne('/api/profile/update/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(updateProfileData);
    req.flush(updateProfileData);
  });


  it('should call deleteUserPublicProfile and return null data', () => {
    service.deleteUserPublicProfile().subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne('/api/profile/delete');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toBeNull();
    req.flush(null);
  });

  it('should call getUserPublicProfileById and return data by id', () => {
    const userId = '123';

    service.getUserPublicProfileById(userId).subscribe(data => {
      expect(data).toEqual(mockProfileWithPostsData);
    });

    const req = httpMock.expectOne(`/api/profile/public/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfileWithPostsData);
  });


  it('should call followUserProfile and update followerList with user data', () => {
    const userIdToFollow = '123';

    const currentUser: IUser = {
      _id: '222',
      email: 'user@domain.com',
      name: '',
      createdPosts: [],
      likedPostList: []
    };

    const expectedResponse: IProfileWithCreatedPosts = {
      ...mockProfileWithPostsData,
      profile: {
        ...mockProfileWithPostsData.profile,
        followerList: [currentUser]
      }
    };

    service.followUserProfile(userIdToFollow).subscribe(data => {
      expect(data.profile.followerList).toContain(currentUser);
      expect(data.profile.followerList?.length).toBe(1);
      expect(data).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`/api/profile/public/${userIdToFollow}/follow`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush(expectedResponse);
  })

})
