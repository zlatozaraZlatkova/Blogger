import { TestBed } from '@angular/core/testing';

import { GoogleAuthService } from './google-auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GoogleAuthService', () => {
  let service: GoogleAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(GoogleAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
