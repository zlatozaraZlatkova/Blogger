import { TestBed } from '@angular/core/testing';

import { BlogApiService } from './blog-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IComment } from 'src/app/interfaces/comment';
import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { IPagination } from 'src/app/interfaces/pagination';

describe('BlogApiService', () => {
  let service: BlogApiService;
  let httpMock: HttpTestingController;

  const mockPostsWithPaginationData = {
    success: true,
    data: {
      items: [
        {
          _id: '1',
          name: 'Test User',
          avatar: 'www.avatar.com',
          postImageUrl: 'www.url.com',
          postCategory: '',
          postTags: ['angular', 'nodejs', 'typescript'],
          postTitle: 'Post Title',
          postText: 'Post Text',
          postLikes: [],
          comments: [],
          views: 88,
          ownerId: '01',
        } as IPost,
      ],
      pagination: {
        hasPrevPage: false,
        hasNextPage: false,
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
      } as IPagination,
    },
  } as IPostsResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogApiService]
    });

    service = TestBed.inject(BlogApiService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPosts and return data', () => {
    let page: number = 1;
    let limit: number = 3;

    service.getPosts(page, limit).subscribe(data => {
      expect(data).toEqual(mockPostsWithPaginationData);
    });

    const req = httpMock.expectOne('/api/posts?page=1&limit=3');
    expect(req.request.method).toBe('GET');

    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('limit')).toBe('3');

    req.flush(mockPostsWithPaginationData);
  });


  it('should handle 404 error when posts not found', () => {
    const page = 1;
    const limit = 3;

    service.getPosts(page, limit).subscribe({
      next: () => fail('Should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.error.message).toBe('Posts not found');
      }
    });

    const req = httpMock.expectOne('/api/posts?page=1&limit=3');
    req.flush(
      { message: 'Posts not found' },
      { status: 404, statusText: 'Not Found' }
    );
  });

  it('should handle negative page number', () => {
    const page = -1;
    const limit = 3;

    service.getPosts(page, limit).subscribe({
      next: () => fail('Should have failed with invalid page'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.error.message).toContain('Invalid page number');
      }
    });

    const req = httpMock.expectOne('/api/posts?page=-1&limit=3');
    req.flush(
      { message: 'Invalid page number' },
      { status: 400, statusText: 'Bad Request' }
    );
  });



});
