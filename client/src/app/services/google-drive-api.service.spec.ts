import { TestBed } from '@angular/core/testing';

import { GoogleDriveApiService } from './google-drive-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GoogleDriveApiService', () => {
  let service: GoogleDriveApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(GoogleDriveApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
