import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditComponent } from './blog-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../blog.service';
import { IPost } from 'src/app/interfaces/post';
import { of } from 'rxjs';

describe('BlogEditComponent', () => {
  let component: BlogEditComponent;
  let fixture: ComponentFixture<BlogEditComponent>;


  const mockPostData = {
    postTitle: 'title',
    postImageUrl: 'www.url.com',
    postCategory: 'technology',
    postText: 'description',
    postTags: ['angular', 'typescript', 'nodejs']
  } as IPost

  beforeEach(() => {

    const blogServiceSpy = jasmine.createSpyObj('BlogService', ['editPost', 'getPostById']);

    blogServiceSpy.getPostById.and.returnValue(of(mockPostData));
    blogServiceSpy.editPost.and.returnValue(of(mockPostData));


    TestBed.configureTestingModule({
      declarations: [BlogEditComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: { subscribe: () => { } },
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(BlogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form after ngOnInit', () => {
    const editForm = component.editPostForm;

    const title = editForm.get('postTitle');
    const imgUrl = editForm.get('postImageUrl');
    const category = editForm.get('postCategory');
    const text = editForm.get('postText');
    const tags = editForm.get('postTags');

    expect(editForm).toBeDefined();
    expect(title).toBeDefined();
    expect(imgUrl).toBeDefined();
    expect(category).toBeDefined();
    expect(text).toBeDefined();
    expect(tags).toBeDefined();


  });


  it('should populate form with existing mock data after ngOnInit', () => {
    const editForm = component.editPostForm;

    const title = editForm.get('postTitle')?.value;
    const imgUrl = editForm.get('postImageUrl')?.value;
    const category = editForm.get('postCategory')?.value;
    const text = editForm.get('postText')?.value;
    const tags = editForm.get('postTags')?.value;

    expect(title).toBe('title');
    expect(imgUrl).toBe('www.url.com');
    expect(category).toBe('technology');
    expect(text).toBe('description');
    expect(tags).toBe('angular, typescript, nodejs');


  });


});
