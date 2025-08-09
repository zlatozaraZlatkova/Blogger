import { TestBed } from '@angular/core/testing';

import { ProfileApiService } from './profile-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProfile } from 'src/app/interfaces/profile';

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



});
