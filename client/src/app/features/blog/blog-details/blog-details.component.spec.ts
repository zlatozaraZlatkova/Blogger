import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsComponent } from './blog-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { BlogService } from '../blog.service';
import { IPost } from 'src/app/interfaces/post';


describe('BlogDetailsComponent', () => {
  let component: BlogDetailsComponent;
  let fixture: ComponentFixture<BlogDetailsComponent>;

  const mockPostData: IPost = {
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
    const blogServiceSpy = jasmine.createSpyObj('BlogService', ['getPostById']);
    blogServiceSpy.getPostById.and.returnValue(of(mockPostData));

    TestBed.configureTestingModule({
      declarations: [BlogDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy },
        {
          provide: ActivatedRoute,
            useValue: {
            params: of({ id: '123' }),
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
            },
          },
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
});
