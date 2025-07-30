import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
