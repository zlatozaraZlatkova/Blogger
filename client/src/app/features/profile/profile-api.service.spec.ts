import { TestBed } from '@angular/core/testing';

import { ProfileApiService } from './profile-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileApiService', () => {
  let service: ProfileApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(ProfileApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
