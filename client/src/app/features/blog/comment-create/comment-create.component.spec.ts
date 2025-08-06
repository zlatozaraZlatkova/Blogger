import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCreateComponent } from './comment-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/user/auth.service';

describe('CommentCreateComponent', () => {
  let component: CommentCreateComponent;
  let fixture: ComponentFixture<CommentCreateComponent>;

  const mockUserData: IUser = {
    _id: '1',
    name: 'User Name',
    email: 'user@email.com',
    avatar: 'www.avatar.com',
    createdPosts: [],
    likedPostList: [],
  };

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      user: mockUserData,
    });

    TestBed.configureTestingModule({
      declarations: [CommentCreateComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(CommentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set disabled attribute when form is invalid', () => {
    const textControl = component.commentForm.get('text')
    textControl?.setValue('');

    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector('[data-testid="submit-btn"]');
    expect(submitBtn).toHaveClass('form-is-not-active')
    expect(submitBtn.disabled).toBeTruthy();
  });
  

  it('should set enable attribute when form is valid', () => {
    const textControl = component.commentForm.get('text')
    textControl?.setValue('comment text');

    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector('[data-testid="submit-btn"]');

    expect(submitBtn).toHaveClass('form-is-active');
    expect(submitBtn.disabled).toBeFalsy();


  });



  it('should call onSubmitComment when button is clicked', () => {
    spyOnProperty(component, 'user', 'get').and.returnValue(mockUserData);

    const textControl = component.commentForm.get('text')
    textControl?.setValue('comment text');

    spyOn(component, 'onSubmitComment');

    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector('[data-testid="submit-btn"]');
    submitBtn.click();

    expect(component.onSubmitComment).toHaveBeenCalled();
  });


  it('should text control has a correct min/max validation rules', () => {
    const text = component.commentForm.get('text');

    text?.setValue('a');
    text?.markAsTouched();
    fixture.detectChanges();

    const minLengthError = text?.getError('minlength');
    expect(minLengthError?.requiredLength).toBe(5);
    expect(minLengthError?.actualLength).toBe(1);


    text?.setValue('a'.repeat(251));
    text?.markAsTouched();
    fixture.detectChanges();

    const maxLengthError = text?.getError('maxlength');
    expect(maxLengthError?.requiredLength).toBe(250);
    expect(maxLengthError?.actualLength).toBe(251);


  });


});
