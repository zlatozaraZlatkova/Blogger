import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../user/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicProfileService } from '../public-profile.service';
import { IProfile } from 'src/app/interfaces/profile';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { IPost } from 'src/app/interfaces/post';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit , OnDestroy{
   activeSection: string = 'home';
  
  userPublicProfile$: Observable<IProfile | null> = this.publicProfileService.userPublicProfile$

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
    private router: Router
  ) { }

  ngOnInit(): void {
    const resolvedUser = this.route.snapshot.data['user'];
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
