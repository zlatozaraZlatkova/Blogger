import { TestBed } from '@angular/core/testing';

import { BlogApiService } from './blog-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BlogApiService', () => {
  let service: BlogApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(BlogApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
