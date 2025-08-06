import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListComponent } from './comment-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IComment } from 'src/app/interfaces/comment';
import { of } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DateTimeAgoPipe } from 'src/app/shared/pipes/date-time-ago.pipe';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  const mockCommentsData: IComment[] = [
    {
      text: 'Comment text A',
      name: 'Author name A',
      avatar: 'www.avatar.com',
      user: 'user-id-666',
    },
    {
      text: 'Comment text B',
      name: 'Author name B',
      avatar: 'www.avatar.com',
      user: 'user-id-777',
    },
  ];

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
      declarations: [CommentListComponent, DateTimeAgoPipe],
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display content when user is logged in', () => {
    spyOnProperty(component, 'user', 'get').and.returnValue(mockUserData);

    fixture.detectChanges();

    const contentContainer = fixture.nativeElement.querySelector('[data-testid="content"]');
    expect(contentContainer).toBeTruthy();

  });

  it('should NOT display content when user is logout', () => {
    spyOnProperty(component, 'user', 'get').and.returnValue(null);

    fixture.detectChanges();

    const contentContainer = fixture.nativeElement.querySelector('[data-testid="content"]');
    expect(contentContainer).toBeFalsy();

  });

  it('should display comments count when data is available', () => {
    component.comments = mockCommentsData;
    fixture.detectChanges();

    const commentCountEl = fixture.nativeElement.querySelector('[data-testid="comment-count"]');
    expect(commentCountEl.textContent.trim()).toContain('Responses (2)');

  });

  it('should display comments count when data is NOT available', () => {
    component.comments = [];
    fixture.detectChanges();

    const commentCountEl = fixture.nativeElement.querySelector('[data-testid="comment-count"]');
    expect(commentCountEl.textContent.trim()).toContain('Responses (0)');

  });



  it('should display comment create form component', () => {
    fixture.detectChanges();

    const commentCreateForm = fixture.nativeElement.querySelector('app-comment-create');
    expect(commentCreateForm).toBeTruthy();

  });


  it('should display message when no comments are available', () => {

    component.comments = [];
    component.comments.length = 0;

    fixture.detectChanges();

    const noComments = fixture.nativeElement.querySelector('[data-testid="no-comments"]');
    expect(noComments).toBeTruthy();

    const messageEl = noComments.querySelectorAll('p');

    expect(messageEl[0].textContent.trim()).toBe('No responses yet');
    expect(messageEl[1].textContent.trim()).toBe('Be the first to share your thoughts!');


  });

});
