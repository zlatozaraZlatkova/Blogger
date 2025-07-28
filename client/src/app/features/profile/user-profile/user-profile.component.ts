import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { ProfileService } from '../profile.service';
import { IProfile } from 'src/app/interfaces/profile';
import { IUser } from 'src/app/interfaces/user';
import { IPost } from 'src/app/interfaces/post';
import { BlogService } from '../../blog/blog.service';
import { AuthService } from 'src/app/user/auth.service';
import { PublicProfileComponent } from '../public-profile/public-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  activeSection: string = 'home';
  resolvedUser: IUser | null = null;

  @ViewChild(PublicProfileComponent) publicProfileComponent!: PublicProfileComponent;

  userPublicProfile$: Observable<IProfile | null> = this.profileService.userPublicProfile$;

  user$: Observable<IUser | null> = this.authService.user$;

  get user(): IUser | null {
    return this.resolvedUser;
  }

  userCreatedPosts$: Observable<IPost[]> = this.user$.pipe(
    map((user) => user?.createdPosts || [])
  );

  userLikedPosts$: Observable<IPost[]> = this.user$.pipe(
    map((user) => user?.likedPostList || [])
  );

  userFollowers$: Observable<IUser[]> = this.userPublicProfile$.pipe(
    map((user) => user?.followerList || [])
  )

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.resolvedUser = this.route.snapshot.data['user'];

    if (this.resolvedUser?.publicProfile) {
      this.loadUserProfile();
    }
  }

  ngAfterViewInit(): void {
    console.log('ViewChild component PublicProfileComponent is ready');
  }


  loadUserProfile(): void {
    this.profileService.getProfile().pipe(take(1))
      .subscribe({
        next: (profile) => {
          console.log('Profile loaded successfully:', profile);
        },
        error: (error) => {
          console.error('Error loading profile:', error);
        },
      });
  }

  openEditProfileDialog(profileData: IProfile): void {
    this.publicProfileComponent.openEditProfileDialog(profileData);
  }

  removeFromReadingList(postId: string): void {
    this.blogService
      .onDislike(postId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.authService.removePostFromLikedPosts(postId);
        },
      });
  }

  navigateToPost(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }


}
