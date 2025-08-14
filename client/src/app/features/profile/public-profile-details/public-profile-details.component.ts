import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';

import { ProfileService } from '../profile.service';
import { IProfileWithCreatedPosts } from 'src/app/interfaces/profile';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-public-profile-details',
  templateUrl: './public-profile-details.component.html',
  styleUrls: ['./public-profile-details.component.css'],
})
export class PublicProfileDetailsComponent implements OnInit {
  viewedProfile$: Observable<IProfileWithCreatedPosts | null> =
    this.profileService.viewedProfile$;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const requestedUserId = this.route.snapshot.paramMap.get('id');
    //console.log("user params id", requestedUserId);

    if (requestedUserId) {
      this.loadUserProfile(requestedUserId);
    }
  }

  loadUserProfile(userId: string): void {
    this.profileService.getProfileById(userId).pipe(take(1))
      .subscribe({
        next: (profile) => {
          //console.log('Profile loaded:', profile);
          //console.log('Profile created post list loaded:', profile.createdPosts);

        },
        error: (error) => {
          console.error('Error loading profile:', error);
        },
      });
  }

   navigateToPost(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }


  
}
