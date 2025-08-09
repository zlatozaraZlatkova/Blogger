import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { IProfile, IProfileWithCreatedPosts } from 'src/app/interfaces/profile';
import { ProfileApiService } from './profile-api.service';

describe('PublicProfileService', () => {
  let service: ProfileService;
  let profileApiService: ProfileApiService;

  const mockProfileData: IProfile = {
    _id: '1',
    ownerId: 'owner-id-123',
    bio: 'Test bio content',
    githubUsername: 'testuser',
    socialMedia: {
      linkedin: 'testlinkedin',
    },
    createdAt: '2025-08-01',
    updatedAt: '2025-08-08',
  };

  const mockProfileWithPostsData: IProfileWithCreatedPosts = {
    profile: {
      _id: '123',
      ownerId: 'owner-id-234',
      bio: 'User bio',
      githubUsername: '',
      socialMedia: {
        linkedin: '',
      },
      followerList: [],
      createdAt: '2025-08-08',
      updatedAt: '2025-08-08',
    },
    createdPosts: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    });
    service = TestBed.inject(ProfileService);
    profileApiService = TestBed.inject(ProfileApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getProfile and update userPublicProfile$$', () => {
    spyOn(profileApiService, 'getUserPublicProfile').and.returnValue(
      of(mockProfileData)
    );

    service.getProfile().subscribe();

    service.userPublicProfile$.subscribe((profile) => {
      expect(profile).toEqual(mockProfileData);
    });

    expect(profileApiService.getUserPublicProfile).toHaveBeenCalledWith();
  });

  it('should call getProfileById and update viewedProfile$$', () => {
    const userId = '222';

    spyOn(profileApiService, 'getUserPublicProfileById').and.returnValue(
      of(mockProfileWithPostsData)
    );

    service.getProfileById(userId).subscribe();

    service.viewedProfile$.subscribe((profile) => {
      expect(profile).toEqual(mockProfileWithPostsData);
    });

    expect(profileApiService.getUserPublicProfileById).toHaveBeenCalledWith(
      userId
    );
    
  });
});
