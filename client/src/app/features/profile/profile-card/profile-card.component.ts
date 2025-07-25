import { Component, Input, OnInit } from '@angular/core';

import { IProfile } from 'src/app/interfaces/profile';
import { ProfileService } from '../profile.service';
import { take, timer } from 'rxjs';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() profileData: IProfile | null = null;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    console.log("provide data form parent", this.profileData)
  }

  onFollow(id: string): void {
    this.profileService.followProfile(id).pipe(take(1))
      .subscribe({
        next: (profile) => {
          console.log('Followed!:', profile);

        },
        error: (error) => {
          console.error('Error loading profile:', error);
        },
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
