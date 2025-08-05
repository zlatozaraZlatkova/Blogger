import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCardComponent } from './blog-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IPost } from 'src/app/interfaces/post';
import { DateTimeAgoPipe } from 'src/app/shared/pipes/date-time-ago.pipe';


describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  const mockPost: IPost = {
    _id: 'post-id-123',
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogCardComponent, DateTimeAgoPipe],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;

    component.article = mockPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive article data through Input property', () => {

    expect(component.article).toEqual(mockPost);
    expect(component.article.postTitle).toBe('Blog Post Title');

  });

  it('should display article title in titlecase', () => {
    const titleEl = fixture.nativeElement.querySelector('h4');
    expect(titleEl?.textContent.trim()).toBe('Blog Post Title');
  })


  it('should display author name  in titlecase', () => {
    const authorEl = fixture.nativeElement.querySelector('h6');
    expect(authorEl?.textContent.trim()).toBe('By Author Name');
  })

  it('should display mock data formatted date using dateTimeAgo pipe', () => {
    const dateEl = fixture.nativeElement.querySelector('.text-blue-600');
    expect(dateEl?.textContent.trim()).toBe('over 1 year ago');
  });

  it('should apply dateTimeAgo pipe to createdAt', () => {
    const todayDate = new Date();

    const updatedPost = {
      ...mockPost,
      createdAt: todayDate
    }

    component.article = updatedPost;
    fixture.detectChanges();

    const dateEl = fixture.nativeElement.querySelector('.text-blue-600');
    expect(dateEl?.textContent.trim()).not.toBe('');


  })

});
