import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSectionComponent } from './blog-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BlogService } from '../blog.service';

import { SharedModule } from 'src/app/shared/shared.module';
import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { IPagination } from 'src/app/interfaces/pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

describe('BlogSectionComponent', () => {
  let component: BlogSectionComponent;
  let fixture: ComponentFixture<BlogSectionComponent>;
  let postsSubject$: BehaviorSubject<IPostsResponse>;
  let mockMatDialogSpy: jasmine.SpyObj<MatDialog>;

  const mockDialogRef: Partial<MatDialogRef<any>> = {
    afterClosed: () => of(null)
  };

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

  beforeEach(() => {
    mockMatDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatDialogSpy.open.and.returnValue(mockDialogRef as MatDialogRef<any>);


    postsSubject$ = new BehaviorSubject(mockPostsData);

    const blogServiceSpy = jasmine.createSpyObj('BlogService', ['getPosts'], {
      paginatedPosts$: postsSubject$
    });


    TestBed.configureTestingModule({
      declarations: [BlogSectionComponent, BlogCardComponent],
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy },
        { provide: MatDialog, useValue: mockMatDialogSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
            params: of({ id: '123' }),
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
            },
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

  it('should open ConfirmDialogComponent with correct config for delete', () => {
    const postId = mockPostsData.data.items[0]._id;
    component.onDelete(postId);

    expect(mockMatDialogSpy.open).toHaveBeenCalledWith(
      ConfirmDialogComponent,
      jasmine.objectContaining({
        width: '600px',

        data: jasmine.objectContaining({
          title: 'Delete Profile',
          message: 'Are you sure you want to delete this post?',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        })
      })
    );
  });

  it('should open delete confirm post dialog', () => {
    component.onDelete(mockPostsData.data.items[0]._id);
    expect(mockMatDialogSpy.open).toHaveBeenCalled();
  })

  it('should display posts when data is available', () => {

    fixture.detectChanges();

    const allPosts = fixture.nativeElement.querySelectorAll(
      '[data-testid="post"]'
    );
    expect(allPosts.length).toBe(1);
  });

  it('should NOT display posts data is NOT available', () => {

    const emptyData = {
      ...mockPostsData,
      data: {
        ...mockPostsData.data,
        items: []
      }
    };

    postsSubject$.next(emptyData);

    fixture.detectChanges();

    const allPosts = fixture.nativeElement.querySelectorAll('[data-testid="post"]');

    expect(allPosts.length).toBe(0);
  });

  it('should provide navigation back to home when no posts available', () => {
    const emptyData = {
      ...mockPostsData,
      data: {
        ...mockPostsData.data,
        items: []
      }
    };

    postsSubject$.next(emptyData);
    fixture.detectChanges();

    const homeLink = fixture.nativeElement.querySelector(
      '[data-testid="home-link"]'
    );

    expect(homeLink).toBeTruthy();
    expect(homeLink.textContent).toContain('Go to Home');
    expect(homeLink.getAttribute('ng-reflect-router-link')).toBe('/');
  });

  it('should show clickable owner action buttons', () => {

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

  it('should show heart icon for liked posts', () => {

    spyOnProperty(component, 'isLoggedIn', 'get').and.returnValue(true);
    spyOn(component, 'isPostOwner').and.returnValue(false);
    spyOn(component, 'isPostLiked').and.returnValue(true);

    fixture.detectChanges();

    const likeBtn = fixture.nativeElement.querySelector('[data-testid="like-button"]');
    expect(likeBtn).toBeTruthy();

    const matIcon = fixture.nativeElement.querySelector('[data-testid="like-icon"]');
    expect(matIcon.textContent.trim()).toBe('favorite');


  });


  it('should show empty heart icon for non-liked posts', () => {

    spyOnProperty(component, 'isLoggedIn', 'get').and.returnValue(true);
    spyOn(component, 'isPostOwner').and.returnValue(false);
    spyOn(component, 'isPostLiked').and.returnValue(false);

    fixture.detectChanges();

    const likeBtn = fixture.nativeElement.querySelector('[data-testid="like-button"]');
    expect(likeBtn).toBeTruthy();

    const matIcon = fixture.nativeElement.querySelector('[data-testid="like-icon"]');
    expect(matIcon.textContent.trim()).toBe('favorite_border');


  });


  it('should display like count correctly in UI', () => {

    const dataWithLikes = {
      ...mockPostsData,
      data: {
        ...mockPostsData.data,
        items: [{
          ...mockPostsData.data.items[0],
          postLikes: [
            {
              _id: '2',
              name: 'user name',
              email: 'user@email.com',
              createdPosts: [],
              likedPostList: []
            },
            {
              _id: '3',
              name: 'user name',
              email: 'user@email.com',
              createdPosts: [],
              likedPostList: []
            }
          ] as IUser[]
        }]
      }
    };

    postsSubject$.next(dataWithLikes);


    spyOnProperty(component, 'isLoggedIn', 'get').and.returnValue(true);

    fixture.detectChanges();

    const likeCount = fixture.nativeElement.querySelector('button span');
    expect(likeCount.textContent).toBe('2');


  });

  it('should have correct like count in data', () => {

    const dataWithLikes = {
      ...mockPostsData,
      data: {
        ...mockPostsData.data,
        items: [{
          ...mockPostsData.data.items[0],
          postLikes: [
            {
              _id: '2',
              name: 'user name',
              email: 'user@email.com',
              createdPosts: [],
              likedPostList: []
            },
            {
              _id: '3',
              name: 'user name',
              email: 'user@email.com',
              createdPosts: [],
              likedPostList: []
            }
          ] as IUser[]
        }]
      }
    };

    postsSubject$.next(dataWithLikes);

    fixture.detectChanges();


    component.paginatedPosts$.subscribe(postsResponse => {
      expect(postsResponse?.data.items.length).toBe(1);
      expect(postsResponse?.data.items[0].postLikes.length).toBe(2);

    });


  });



});
