import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { PublicProfileService } from '../public-profile.service';
import { IProfile } from 'src/app/interfaces/profile';
import { IUser } from 'src/app/interfaces/user';
import { IPost } from 'src/app/interfaces/post';
import { ProfileFormDialogComponent } from '../profile-form-dialog/profile-form-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { BlogService } from '../../blog/blog.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  activeSection: string = 'home';
  resolvedUser: IUser | null = null;

  userPublicProfile$: Observable<IProfile | null> = this.publicProfileService.userPublicProfile$;
  user$: Observable<IUser | null> = this.authService.user$;

  get user(): IUser | null {
    return this.resolvedUser;
  }

  userCreatedPosts$: Observable<IPost[]> = this.user$.pipe(
    map(user => user?.createdPosts || [])
  );

  userLikedPosts$: Observable<IPost[]> = this.user$.pipe(
    map(user => user?.likedPostList || [])
  )


  constructor(
    private publicProfileService: PublicProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private blogService: BlogService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.resolvedUser = this.route.snapshot.data['user'];

    if (this.resolvedUser?.publicProfile) {
      this.publicProfileService.getProfile()
        .pipe(take(1))
        .subscribe({
          next: (profile) => {
            console.log('Profile loaded successfully:', profile);
          },
          error: (error) => {
            console.error('Error loading profile:', error);
          },
        });
    }
  }

  openCreateProfileDialog(): void {
    const dialogRef = this.matDialog.open(ProfileFormDialogComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      data: {
        mode: 'create',
        data: null,
        title: 'Create Public Profile'
      }
    });

    dialogRef.afterClosed().subscribe((userProfileData) => {
      if (userProfileData) {
        this.publicProfileService.createProfile(userProfileData)
          .pipe(take(1))
          .subscribe({
            next(createdProfile) {
              console.log('Profile created successfully:', createdProfile);
            },
            error(error) {
              console.error('Error creating profile:', error);
            },
          });
      }
    });
  }

  openEditProfileDialog(profileData: IProfile): void {
    const dialogRef = this.matDialog.open(ProfileFormDialogComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      data: {
        mode: 'edit',
        data: profileData,
        title: 'Edit Public Profile'
      }
    });


    dialogRef.afterClosed().subscribe((userProfileData) => {
      if (userProfileData) {
        this.publicProfileService.editProfile(userProfileData)
          .pipe(take(1))
          .subscribe({
            next(editProfile) {
              console.log('LinkedIn data:', editProfile.socialMedia?.linkedin);
              console.log('Profile edited successfully:', editProfile);
            },
            error(error) {
              console.error('Error editing profile:', error);
            },
          });
      }
    });
  }

  openDeleteProfileDialog(): void {

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        title: 'Delete Profile',
        message: 'Are you sure you want to delete your public profile? This action cannot be undone.',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.publicProfileService.deleteProfile()
          .pipe(take(1))
          .subscribe({
            next: () => {
              console.log('Profile deleted successfully');
            },
            error: (error) => {
              console.error('Error deleting profile:', error);
            }
          });
      }

    })
  }

  removeFromReadingList(postId: string): void {
    this.blogService.onDislike(postId).pipe(take(1)).subscribe({
      next: () => {
        this.authService.removePostFromLikedPosts(postId);
      }
    });

  }


  getGitHubUrl(publicProfile: IProfile): string | null {
    return publicProfile.githubUsername
      ? `https://github.com/${publicProfile.githubUsername}`
      : null;
  }

  getLinkedInUrl(publicProfile: IProfile): string | null {
    return publicProfile.socialMedia?.linkedin
      ? `https://linkedin.com/in/${publicProfile.socialMedia.linkedin}`
      : null;
  }

  navigateToPost(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  ngOnDestroy(): void {
    this.publicProfileService.clearState();
  }
}
