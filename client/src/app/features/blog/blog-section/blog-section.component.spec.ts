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
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

describe('BlogSectionComponent', () => {
  let component: BlogSectionComponent;
  let fixture: ComponentFixture<BlogSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogSectionComponent, BlogCardComponent],
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('should provide navigation back to home when no posts available', () => {
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

    const homeLink = fixture.nativeElement.querySelector(
      '[data-testid="home-link"]'
    );

    expect(homeLink).toBeTruthy();
    expect(homeLink.textContent).toContain('Go to Home');
    expect(homeLink.getAttribute('ng-reflect-router-link')).toBe('/');
  });

  it('should show clickable owner action buttons', () => {
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

    spyOn(component, 'isPostOwner').and.returnValue(true);
    spyOnProperty(component, 'isLoggedIn', 'get').and.returnValue(true);

    spyOn(component, 'onEdit');
    spyOn(component, 'onDelete');

    fixture.detectChanges();

    const editBtn = fixture.nativeElement.querySelector('[data-testid="edit-button"]');

    editBtn.click();
    expect(editBtn).toBeTruthy();
    expect(component.onEdit).toHaveBeenCalled()

    const delBtn = fixture.nativeElement.querySelector('[data-testid="delete-button"]');

    delBtn.click();
    expect(component.onDelete).toHaveBeenCalled();
    expect(delBtn).toBeTruthy();

  });

  it('should hide owner actions and show like button for non-owners', () => {
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


    spyOnProperty(component, 'isLoggedIn', 'get').and.returnValue(true);
    spyOn(component, 'isPostOwner').and.returnValue(false);

    fixture.detectChanges();

    const editBtn = fixture.nativeElement.querySelector('[data-testid="edit-button"]');
    const delBtn = fixture.nativeElement.querySelector('[data-testid="delete-button"]');
    const likeBtn = fixture.nativeElement.querySelector('[data-testid="like-button"]');

    expect(editBtn).toBeFalsy();
    expect(delBtn).toBeFalsy();
    expect(likeBtn).toBeTruthy();
  });

  it('should hide all action buttons for unauthenticated users', () => {
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


    spyOnProperty(component, 'isLoggedIn', 'get').and.returnValue(false);
    spyOn(component, 'isPostOwner').and.returnValue(false);

    fixture.detectChanges();

    const editBtn = fixture.nativeElement.querySelector('[data-testid="edit-button"]');
    const delBtn = fixture.nativeElement.querySelector('[data-testid="delete-button"]');
    const likeBtn = fixture.nativeElement.querySelector('[data-testid="like-button"]');

    expect(editBtn).toBeFalsy();
    expect(delBtn).toBeFalsy();
    expect(likeBtn).toBeFalsy();
  });


});
