import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../../user/auth.service';
import { PublicProfileService } from '../public-profile.service';
import { IProfile } from 'src/app/interfaces/profile';
import { IUser } from 'src/app/interfaces/user';
import { IPost } from 'src/app/interfaces/post';
import { CreateProfileDialogComponent } from '../create-profile-dialog/create-profile-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  activeSection: string = 'home';

  userPublicProfile$: Observable<IProfile | null> =
    this.publicProfileService.userPublicProfile$;

  get user(): IUser | null {
    return this.authService.user;
  }

  get userLikedPosts(): IPost[] {
    return this.user?.likedPostList || [];
  }

  get userCreatedPosts(): IPost[] {
    return this.user?.createdPosts || [];
  }

  get hasLikedPosts(): boolean {
    return this.userLikedPosts.length > 0;
  }

  constructor(
    private authService: AuthService,
    private publicProfileService: PublicProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    const resolvedUser = this.route.snapshot.data['user'];
  }

  openCreateProfileDialog(): void {
    const dialogRef = this.matDialog.open(CreateProfileDialogComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Form data:', result);
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
