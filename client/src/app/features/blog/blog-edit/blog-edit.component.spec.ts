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
    postTags: ['angular', 'typescript', 'nodejs'],
  } as IPost;

  beforeEach(() => {
    const blogServiceSpy = jasmine.createSpyObj('BlogService', [
      'editPost',
      'getPostById',
    ]);

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
            params: { subscribe: () => {} },
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

  it('should display edit form in DOM', () => {
    component.loading = false;

    fixture.detectChanges();

    const editForm = fixture.nativeElement.querySelector('form');

    expect(component.loading).toBe(false);
    expect(editForm).toBeTruthy();
  });

  it('should contolles to be required', () => {
    const editForm = component.editPostForm;

    const title = editForm.get('postTitle');
    const imgUrl = editForm.get('postImageUrl');
    const category = editForm.get('postCategory');
    const text = editForm.get('postText');
    const tags = editForm.get('postTags');

    title?.setValue('');
    imgUrl?.setValue('');
    category?.setValue('');
    text?.setValue('');
    tags?.setValue('');
    
    fixture.detectChanges(); 

    expect(title?.hasError('required')).toBe(true);
    expect(imgUrl?.hasError('required')).toBe(true);
    expect(category?.hasError('required')).toBe(true);
    expect(text?.hasError('required')).toBe(true);
    expect(tags?.hasError('required')).toBe(true);

  });

  it('should title control has a correct min/max validation rules', () => {
    const editForm = component.editPostForm;
    const title = editForm.get('postTitle');
   
    title?.setValue('a');
    fixture.detectChanges(); 

    const minLengthError = title?.getError('minlength');
    expect(minLengthError?.requiredLength).toBe(2);
    expect(minLengthError?.actualLength).toBe(1);
  

    title?.setValue('a'.repeat(151));
    fixture.detectChanges(); 

    const maxLengthError = title?.getError('maxlength');
    expect(maxLengthError?.requiredLength).toBe(150);
    expect(maxLengthError?.actualLength).toBe(151);
   


  });


  it('should text control has a correct min/max validation rules', () => {
    const editForm = component.editPostForm;
    const text = editForm.get('postText');

    text?.setValue('a');
    fixture.detectChanges();

    const minLengthError = text?.getError('minlength');
    expect(minLengthError?.requiredLength).toBe(5);
    expect(minLengthError?.actualLength).toBe(1);

    text?.setValue('a'.repeat(3001));
    fixture.detectChanges();
    
    const maxLengthError = text?.getError('maxlength');
    expect(maxLengthError?.requiredLength).toBe(3000);
    expect(maxLengthError?.actualLength).toBe(3001);
  });


});
