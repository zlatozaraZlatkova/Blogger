import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileDetailsComponent } from './public-profile-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProfileService } from '../profile.service';
import { IProfileWithCreatedPosts } from 'src/app/interfaces/profile';
import { IPost } from 'src/app/interfaces/post';

describe('PublicProfileDetailsComponent', () => {
  let component: PublicProfileDetailsComponent;
  let fixture: ComponentFixture<PublicProfileDetailsComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  let profileSubject = new BehaviorSubject<IProfileWithCreatedPosts | null>(null);


  const mockProfileWithPostsData: IProfileWithCreatedPosts = {
    profile: {
      _id: '123',
      ownerId: 'owner-id-234',
      bio: 'User bio',
      githubUsername: '',
      socialMedia: {
        linkedin: ''
      },
      followerList: [],
      createdAt: '2025-08-08',
      updatedAt: '2025-08-08',
    },
    createdPosts: []
  };

  const mockPostData: IPost = {
    _id: '1',
    name: 'Test User',
    avatar: 'www.avatar.com',
    postImageUrl: 'www.url.com',
    postCategory: 'tool',
    postTags: ['angular', 'nodejs', 'typescript'],
    postTitle: 'Post Title',
    postText: 'Post Text',
    postLikes: [],
    comments: [],
    views: 88,
    ownerId: '01',
  };


  beforeEach(() => {

    profileSubject = new BehaviorSubject<IProfileWithCreatedPosts | null>(mockProfileWithPostsData);


    profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfileById'], {
      viewedProfile$: profileSubject.asObservable()
    })

    profileServiceSpy.getProfileById.and.returnValue(of(mockProfileWithPostsData));

    TestBed.configureTestingModule({
      declarations: [PublicProfileDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProfileService, useValue: profileServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              paramMap: {
                get: (key: string) => '123'
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(PublicProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct profile ID from route params', () => {
    fixture.detectChanges();
    expect(profileServiceSpy.getProfileById).toHaveBeenCalledWith('123');
  });


  it('should display profile content when viewedProfile$ has data', () => {

    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('[data-testid="profile-content"]');
    expect(content).toBeTruthy();

    const title = fixture.nativeElement.querySelector('[data-testid="title"]');
    expect(title?.textContent).toContain(`From the Dev's Desk`);

    const text = fixture.nativeElement.querySelector('[data-testid="text"]');
    expect(text?.textContent).toContain('Recommended Reads');
  });


  it('should display no profile content when viewedProfile$ is null', () => {

    profileSubject.next(null);
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('[data-testid="no-profile-content"]');
    expect(content).toBeTruthy();

    const title = fixture.nativeElement.querySelector('[data-testid="title"]');
    expect(title?.textContent).toContain('Profile Not Found');

    const text = fixture.nativeElement.querySelector('[data-testid="text"]');
    expect(text?.textContent).toContain(`The profile you're looking for doesn't exist or is not available.`);
  });


  it('should display created posts if data is avaliable', () => {
    const updatedPost = {
      ...mockProfileWithPostsData,
      createdPosts: [mockPostData]
    };

    profileSubject.next(updatedPost);
    profileServiceSpy.getProfileById.and.returnValue(of(updatedPost));

    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('[data-testid="created-post-title"]');
    expect(title?.textContent).toContain('Post Title');

  });


  it('should display no created posts message when createdPosts array is empty', () => {
   
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('[data-testid="posts-container"]');
    expect(container).toBeFalsy();

    const text = fixture.nativeElement.querySelector('[data-testid="no-created-post"]');
    expect(text).toBeTruthy();
    expect(text?.textContent).toContain('No articles published yet');
    
  });



});
