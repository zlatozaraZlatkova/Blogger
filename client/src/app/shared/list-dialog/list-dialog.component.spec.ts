import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDialogComponent } from './list-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IListDialogData } from 'src/app/interfaces/dialogData';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

describe('ListDialogComponent', () => {
  let component: ListDialogComponent;
  let fixture: ComponentFixture<ListDialogComponent>;
  let mockDialogRefSpy: jasmine.SpyObj<MatDialogRef<ListDialogComponent>>;

  const mockDialogDataSpy: IListDialogData = {
    title: '',
    followerList: [
      {
        _id: '1',
        email: "user-a@gmail.com",
        name: "Test User A",
        createdPosts: [],
        likedPostList: []
      },
      {
        _id: '2',
        email: "user-b@gmail.com",
        name: "Test User B",
        createdPosts: [],
        likedPostList: []
      }
    ] as IUser[]
  }

  beforeEach(() => {
    mockDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ListDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogDataSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when onClose is called', () => {
    component.onClose();
    expect(mockDialogRefSpy.close).toHaveBeenCalledWith();

  });

  it('should display dialog title', () => {
    component.data.title = 'Followers List';
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('[data-testid="dialog-title"]');
    expect(title).not.toBeNull();
    expect(title.textContent).toContain('Followers List');
  });


  it('should display profile followers when data has followerList', () => {

    fixture.detectChanges();

    const conatiner = fixture.nativeElement.querySelector('[data-testid="list-content"]');
    expect(conatiner).toBeTruthy();
  });


  it('should display no profile followers when list is empty', () => {

    const updatedData = {
      ...mockDialogDataSpy,
      followerList: []
    };
    component.data = updatedData;

    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('[data-testid="no-list-content"]');
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('No followers yet');
  });


  it('should render all followers in the list', () => {
    fixture.detectChanges();

    const followers = fixture.nativeElement.querySelectorAll('[data-testid="followers"]');
    expect(followers.length).toBe(2);
  });


  it('should display follower names correctly', () => {
    fixture.detectChanges();

    const user = fixture.nativeElement.querySelectorAll('[data-testid="followers"]');

    expect(user[0].textContent).toContain('user-a@gmail.com');
    expect(user[0].textContent).toContain('Test User A');

    expect(user[1].textContent).toContain('user-b@gmail.com');
    expect(user[1].textContent).toContain('Test User B');
  });

});
