import { TestBed } from '@angular/core/testing';

import { MatIconService } from './mat-icon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MatIconService', () => {
  let service: MatIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(MatIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
