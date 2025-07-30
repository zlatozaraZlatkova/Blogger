import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCardComponent } from './blog-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from 'src/app/interfaces/post';

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  @Pipe({ name: 'dateTimeAgo' })
  class MockDateTimeAgoPipe implements PipeTransform {
    transform(value: Date | string | number | null | undefined): string {
      if (!value) return 'no date';
      return 'mock date';
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogCardComponent, MockDateTimeAgoPipe],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;


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
      ownerId: 'owner-id-456'
    };

    component.article = mockPost as IPost;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
