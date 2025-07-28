import { Component, Input, OnInit } from '@angular/core';
import { take, timer } from 'rxjs';

import { IProfile, IProfileWithCreatedPosts } from 'src/app/interfaces/profile';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/user/auth.service';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent implements OnInit {
  @Input() profileData: IProfileWithCreatedPosts | null = null;
  successMessage: string | null = null;

  isAlreadyFollowed: boolean = false;

  get currentUserId(): string | undefined {
    return this.authService.user?._id.toString();
  }

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log('Provide data form parent', this.profileData);
    console.log('Current user id', this.currentUserId)


    if (!this.currentUserId || !this.profileData?.profile?.followerList) {
      return;
    }

    this.isAlreadyFollowed = this.profileData?.profile?.followerList?.some(
      (follower: IUser) => follower._id?.toString() === this.currentUserId
    );

    console.log('Flag already followed', this.isAlreadyFollowed);
  }

  onFollow(id: string): void {
    this.profileService.followProfile(id).pipe(take(1))
      .subscribe({
        next: (profile) => {
          this.successMessage = 'Successfully followed profile!';
          this.showSuccessMessage();

        },
        error: (error) => {
          console.error('Error loading profile:', error);
        },
      });
  }

   private showSuccessMessage(): void {
    timer(5000)
      .pipe(take(1))
      .subscribe(() => {
        this.successMessage = null;
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


}
