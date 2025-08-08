import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';

import { IProfile } from 'src/app/interfaces/profile';
import { ProfileService } from '../profile.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ProfileFormDialogComponent } from '../profile-form-dialog/profile-form-dialog.component';
import { getGitHubUrl, getLinkedInUrl } from 'src/app/shared/utils/genSocialMediaUrl';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnDestroy {
  @Input() profileData: IProfile | null = null;
  @Input() userFollowersCount: number = 0;

  private subscriptions = new Subscription();

  constructor(
    private profileService: ProfileService,
    private matDialog: MatDialog,
  ) { }


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

    const dialogSub = dialogRef.afterClosed().subscribe((userProfileData) => {
      if (userProfileData) {
        this.profileService.createProfile(userProfileData)
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

     this.subscriptions.add(dialogSub);

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

    const dialogSub = dialogRef.afterClosed().subscribe((userProfileData) => {
      if (userProfileData) {
        this.profileService.editProfile(userProfileData)
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
    this.subscriptions.add(dialogSub);
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

    const dialogSub = dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.profileService.deleteProfile()
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
    this.subscriptions.add(dialogSub);
  }


  getGitHubProfileUrl(profile: IProfile): string | null {
    return getGitHubUrl(profile);
  }

  getLinkedInProfileUrl(profile: IProfile): string | null {
    return getLinkedInUrl(profile);
  }
  

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
