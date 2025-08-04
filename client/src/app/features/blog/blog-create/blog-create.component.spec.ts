import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreateComponent } from './blog-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IPost } from 'src/app/interfaces/post';
import { of } from 'rxjs';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';


describe('BlogCreateComponent', () => {
  let component: BlogCreateComponent;
  let fixture: ComponentFixture<BlogCreateComponent>;

  const mockPostData = {
    postTitle: '',
    postImageUrl: '',
    postCategory: '',
    postText: '',
    postTags: [''],
  } as IPost;


  beforeEach(() => {
    const blogServiceSpy = jasmine.createSpyObj('BlogService', ['createPost']);
    blogServiceSpy.createPost.and.returnValue(of(mockPostData));

    TestBed.configureTestingModule({
      declarations: [BlogCreateComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(BlogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form after ngOnInit', () => {
    const postForm = component.postForm;

    const title = postForm.get('postTitle');
    const imgUrl = postForm.get('postImageUrl');
    const category = postForm.get('postCategory');
    const text = postForm.get('postText');
    const tags = postForm.get('postTags');

    expect(postForm).toBeDefined();
    expect(title).toBeDefined();
    expect(imgUrl).toBeDefined();
    expect(category).toBeDefined();
    expect(text).toBeDefined();
    expect(tags).toBeDefined();
  });

  it('should contolles to be required', () => {
    const editForm = component.postForm;

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
    const editForm = component.postForm;
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
    const editForm = component.postForm;
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

  it('should display title validation error messages in DOM', () => {
    const editForm = component.postForm;
    const title = editForm.get('postTitle');

    title?.setValue('a');
    title?.markAsTouched();

    fixture.detectChanges();

    const errorContainer = fixture.nativeElement.querySelector('[data-testid="error-title-message"]');

    expect(errorContainer?.textContent.trim()).toContain('Title should be at least 2 characters');

  });

  it('should display text validation error messages in DOM', () => {
    const editForm = component.postForm;
    const category = editForm.get('postCategory');

    category?.setValue('');
    category?.markAsTouched();

    fixture.detectChanges();

    const errorContainer = fixture.nativeElement.querySelector('.text-red-600');
    expect(errorContainer?.textContent.trim()).toContain('Please select a category');

  });

  it('should enable submit button when form is valid', () => {

    const title = component.postForm.get('postTitle');
    const imgUrl = component.postForm.get('postImageUrl');
    const category = component.postForm.get('postCategory');
    const text = component.postForm.get('postText');
    const tags = component.postForm.get('postTags');

    title?.setValue('titel');
    imgUrl?.setValue('add img url');
    category?.setValue('technologies');
    text?.setValue('description');
    tags?.setValue('know-how, tool, unit test');

    expect(component.postForm.valid).toBe(true);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-testid="submit-btn"]');

    expect(button.disabled).toBe(false);
    expect(button.hasAttribute('disabled')).toBe(false);

  });

  it('should disable submit button when form is invalid', () => {

    expect(component.postForm.valid).toBe(false);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-testid="submit-btn"]');

    expect(button.disabled).toBe(true);
    expect(button.hasAttribute('disabled')).toBe(true);

  });

  it('should call onCancel when cancel button is clicked', () => {
    spyOn(component, 'onCancel');
    fixture.detectChanges();


    const cancelBtn = fixture.nativeElement.querySelector('[data-testid="cancel-btn"]');
    cancelBtn.click();

    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should navigate to posts when onCancel is called', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.onCancel();

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });


});
