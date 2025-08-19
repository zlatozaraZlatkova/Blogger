import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsComponent } from './blog-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, ParamMap, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Location } from '@angular/common';

import { BlogService } from '../blog.service';
import { IPost } from 'src/app/interfaces/post';
import { DateTimeAgoPipe } from 'src/app/shared/pipes/date-time-ago.pipe';
import { SentenceUpperCasePipe } from 'src/app/shared/pipes/sentence-upper-case.pipe';
import { IComment } from 'src/app/interfaces/comment';

describe('BlogDetailsComponent', () => {
  let component: BlogDetailsComponent;
  let fixture: ComponentFixture<BlogDetailsComponent>;
  let blogServiceSpy: jasmine.SpyObj<BlogService>;
  let paramMapSubject: BehaviorSubject<ParamMap>;

  const mockPostData: IPost = {
    _id: '123',
    name: 'Author Name',
    avatar: 'author-avatar-url.jpg',
    postImageUrl: 'post-image-url.jpg',
    postCategory: 'Technology',
    postTags: ['angular', 'testing', 'typescript'],
    postTitle: 'Blog Post Title',
    postText: 'This is a blog post content for testing purposes.',
    postLikes: [],
    comments: [],
    views: 42,
    ownerId: 'owner-id-456',
    createdAt: new Date('2024-01-15'),
  };

  const mockError = {
    status: 404,
    error: { message: 'Post not found' }
  };

  beforeEach(() => {
    blogServiceSpy = jasmine.createSpyObj('BlogService', ['getPostById']);
    blogServiceSpy.getPostById.and.returnValue(of(mockPostData));

    paramMapSubject = new BehaviorSubject(convertToParamMap({ id: '123' }));


    TestBed.configureTestingModule({
      declarations: [BlogDetailsComponent, DateTimeAgoPipe, SentenceUpperCasePipe],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: paramMapSubject.asObservable() }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(BlogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct post ID from route params', () => {
    fixture.detectChanges();

    expect(blogServiceSpy.getPostById).toHaveBeenCalledWith('123');
  });


  it('should not load article when ID is missing from route params', () => {
    blogServiceSpy.getPostById.calls.reset();

    paramMapSubject.next(convertToParamMap({}));

    expect(blogServiceSpy.getPostById).not.toHaveBeenCalled();
  });


  it('should call location.back() when post id is invalid', () => {
    const location = TestBed.inject(Location);

    blogServiceSpy.getPostById.and.returnValue(throwError(() => mockError));

    spyOn(location, 'back');

    component.loadCurrentArticle('0000000');

    expect(location.back).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  });


  it('should display post content when post$ has data', () => {

    component.post$ = of(mockPostData);
    fixture.detectChanges();


    const postContainer = fixture.nativeElement.querySelector('[data-testid="post-content"]');
    expect(postContainer).toBeTruthy();

    const titleEl = fixture.nativeElement.querySelector('[data-testid="title"]');
    expect(titleEl.textContent).toContain('Blog Post Title');

    const textEl = fixture.nativeElement.querySelector('[data-testid="text"]');
    expect(textEl.textContent).toContain('This is a blog post content for testing purposes.');

    const tagsEl = fixture.nativeElement.querySelectorAll('[data-testid="tags"]');
    expect(tagsEl.length).toBe(3);
    expect(tagsEl[0].textContent.trim()).toBe('angular');
    expect(tagsEl[1].textContent.trim()).toBe('testing');
    expect(tagsEl[2].textContent.trim()).toBe('typescript');

  });


  it('should display author name as clickable button when has public profile', () => {

    component.post$ = of(mockPostData);
    component.authorProfileId = 'profile-123';

    fixture.detectChanges();


    const authorBtn = fixture.nativeElement.querySelector('[data-testid="author"]');
    authorBtn.click();

    expect(authorBtn).toBeTruthy();
    expect(authorBtn.textContent.trim()).toContain('By Author Name');


  });


  it('should navigate to public profile when route is valid', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.post$ = of(mockPostData);
    component.authorProfileId = 'profile-123';

    fixture.detectChanges();

    const authorBtn = fixture.nativeElement.querySelector('[data-testid="author"]');
    authorBtn.click();

    expect(router.navigate).toHaveBeenCalledWith(['/profile/public/profile-123']);

  });

  it('should display comments count when data is available', () => {
    const updatedMock = {
      ...mockPostData,
      comments: [
        {
          text: 'Comment text A',
          name: 'Author name A',
          avatar: 'www.avatar.com',
          user: 'user-id-666'
        },
        {
          text: 'Comment text B',
          name: 'Author name B',
          avatar: 'www.avatar.com',
          user: 'user-id-777'
        },

      ] as IComment[]
    }
    component.post$ = of(updatedMock);
    fixture.detectChanges();

    const commentCountEl = fixture.nativeElement.querySelector('[data-testid="comment-count"]');
    expect(commentCountEl).toBeTruthy();

    const expectedCount = updatedMock.comments.length;
    expect(commentCountEl.textContent.trim()).toContain(`${expectedCount} Comments`);

  });


  it('should display 0 comments when no comments exist', () => {

    component.post$ = of(mockPostData);
    fixture.detectChanges();

    const commentCountEl = fixture.nativeElement.querySelector('[data-testid="comment-count"]');
    expect(commentCountEl).toBeTruthy();

    const expectedCount = mockPostData.comments.length;
    expect(commentCountEl.textContent.trim()).toContain(`${expectedCount} Comments`);
  });


  it('should display views count when data is available', () => {

    component.post$ = of(mockPostData);
    fixture.detectChanges();

    const viewCountEl = fixture.nativeElement.querySelector('[data-testid="view-count"]');
    expect(viewCountEl).toBeTruthy();

    const expectedCount = mockPostData.views;
    expect(viewCountEl.textContent.trim()).toContain(`${expectedCount} Views`);
  });

  it('should display 0 views when no comments exist', () => {
    const updatedMock = {
      ...mockPostData,
      views: 0

    }
    component.post$ = of(updatedMock);

    fixture.detectChanges();

    const viewCountEl = fixture.nativeElement.querySelector('[data-testid="comment-count"]');
    expect(viewCountEl).toBeTruthy();

    const expectedCount = updatedMock.views;
    expect(viewCountEl.textContent.trim()).toContain(`${expectedCount} Comments`);
  });

  it('should display newsletter form component', () => {
    component.post$ = of(mockPostData);
    fixture.detectChanges();

    const newsletterForm = fixture.nativeElement.querySelector('div app-newsletter-form');

    expect(newsletterForm).toBeTruthy();

  });


  it('should display popular articles', () => {

    component.post$ = of(mockPostData);
    component.popularArticles = [
      {
        _id: '1',
        postTitle: 'Popular Article Title',
        name: 'Author',
        avatar: 'www.avatar.com',
        createdAt: new Date()
      } as IPost
    ];
    component.loading = false;

    fixture.detectChanges();

    const containerArticles = fixture.nativeElement.querySelector('[data-testid="container-popular-articles"]');
    expect(containerArticles).toBeTruthy();

    const popularArticlesEl = fixture.nativeElement.querySelector('[data-testid="popular-article-title"]');
    expect(popularArticlesEl.textContent.trim()).toBe('Popular Article Title');


  });


  it('should display message when no popular articles', () => {
    component.post$ = of(mockPostData);

    component.loading = false;
    component.popularArticles.length = 0;

    fixture.detectChanges();

    const noArticles = fixture.nativeElement.querySelector('[data-testid="no-popular-articles"]');
    expect(noArticles).toBeTruthy();
    expect(noArticles.textContent.trim()).toBe('No articles found.');


  });


  it('should display related articles', () => {
    component.post$ = of(mockPostData);

    component.relatedArticles = [
      {
        _id: '1',
        postTitle: 'First: Related Article Title',
        name: 'Author',
        avatar: 'www.avatar.com',
        createdAt: new Date()
      },
      {
        _id: '2',
        postTitle: 'Second: Related Article Title',
        name: 'Author',
        avatar: 'www.avatar.com',
        createdAt: new Date()
      }
    ] as IPost[];

    component.loading = false;

    fixture.detectChanges();

    const relatedArticles = fixture.nativeElement.querySelectorAll('app-blog-card');
    expect(relatedArticles).toBeTruthy();
    expect(relatedArticles.length).toBe(2);

    expect(relatedArticles[0]).toBeTruthy();
    expect(component.relatedArticles[0].postTitle).toBe('First: Related Article Title');

    expect(relatedArticles[1]).toBeTruthy();
    expect(component.relatedArticles[1].postTitle).toBe('Second: Related Article Title');
  });


  it('should display message when no related articles', () => {
    component.post$ = of(mockPostData);

    component.loading = false;
    component.relatedArticles.length = 0;

    fixture.detectChanges();

    const noArticles = fixture.nativeElement.querySelector('[data-testid="no-related-articles"]');
    expect(noArticles).toBeTruthy();
    expect(noArticles.textContent.trim()).toBe('No related articles found.');


  });


  it('should call navigateToArticle when related article is clicked', () => {
    component.post$ = of(mockPostData);

    component.relatedArticles = [
      {
        _id: 'article-888',
        postTitle: 'Test Article',
        name: 'Author',
        avatar: 'www.avatar.com',
        createdAt: new Date()
      }
    ] as IPost[];

    spyOn(component, 'navigateToArticle');

    fixture.detectChanges();

    const article = fixture.nativeElement.querySelector('[data-testid="article-id"]');
    article.click();


    expect(component.navigateToArticle).toHaveBeenCalledWith('article-888');
  });

});