import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileDetailsComponent } from './public-profile-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ProfileService } from '../profile.service';
import { IProfileWithCreatedPosts } from 'src/app/interfaces/profile';

describe('PublicProfileDetailsComponent', () => {
  let component: PublicProfileDetailsComponent;
  let fixture: ComponentFixture<PublicProfileDetailsComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

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


  beforeEach(() => {
    profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfileById'], {
      viewedProfile$: of(mockProfileWithPostsData)
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
                get: (key: string) => 'user-id'
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

    component.viewedProfile$ = of(null);
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('[data-testid="no-profile-content"]');
    expect(content).toBeTruthy();

    const title = fixture.nativeElement.querySelector('[data-testid="title"]');
    expect(title?.textContent).toContain('Profile Not Found');

    const text = fixture.nativeElement.querySelector('[data-testid="text"]');
    expect(text?.textContent).toContain(`The profile you're looking for doesn't exist or is not available.`);
  });

});
