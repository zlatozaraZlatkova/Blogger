import { TestBed } from '@angular/core/testing';

import { BlogApiService } from './blog-api.service';

describe('BlogApiService', () => {
  let service: BlogApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
