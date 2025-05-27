import { TestBed } from '@angular/core/testing';

import { GoogleDriveConfigService } from './google-drive-config.service';

describe('GoogleApiConfigService', () => {
  let service: GoogleDriveConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleDriveConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
