import { TestBed } from '@angular/core/testing';

import { GoogleDriveApiService } from './google-drive-api.service';

describe('GoogleDriveApiService', () => {
  let service: GoogleDriveApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleDriveApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
