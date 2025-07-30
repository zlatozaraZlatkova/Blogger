import { TestBed } from '@angular/core/testing';

import { GoogleDriveConfigService } from './google-drive-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GoogleApiConfigService', () => {
  let service: GoogleDriveConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(GoogleDriveConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
