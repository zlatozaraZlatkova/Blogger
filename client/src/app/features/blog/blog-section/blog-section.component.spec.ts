import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSectionComponent } from './blog-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BlogService } from '../blog.service';

import { SharedModule } from 'src/app/shared/shared.module';
import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { IPagination } from 'src/app/interfaces/pagination';

describe('BlogSectionComponent', () => {
  let component: BlogSectionComponent;
  let fixture: ComponentFixture<BlogSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogSectionComponent, BlogCardComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [
        BlogService,
        { provide: MatDialog, useValue: { open: () => { } } },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
            params: { subscribe: () => { } },
            snapshot: { params: {} },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(BlogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display posts when data is available', () => {
    const blogService = TestBed.inject(BlogService);

    const mockPostsData = {
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

    blogService.paginatedPosts$ = of(mockPostsData);

    fixture = TestBed.createComponent(BlogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const allPosts = fixture.nativeElement.querySelectorAll(
      '[data-testid="post"]'
    );
    expect(allPosts.length).toBe(1);
  });

  it('should NOT display posts data is NOT available', () => {
    const blogService = TestBed.inject(BlogService);

    const emptyPostData = {
      success: true,
      data: {
        items: [],
        pagination: {
          hasPrevPage: false,
          hasNextPage: false,
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
        } as IPagination,
      },
    } as IPostsResponse;

    blogService.paginatedPosts$ = of(emptyPostData);

    fixture = TestBed.createComponent(BlogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const allPosts = fixture.nativeElement.querySelectorAll(
      '[data-testid="post"]'
    );
    expect(allPosts.length).toBe(0);
  });


});
