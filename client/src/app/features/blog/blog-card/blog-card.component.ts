import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';
import { finalize, take } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent {
  @Input() article!: IPost;

  post$ = this.blogService.post$;

  constructor(
    private blogService: BlogService,
    private authService: AuthService
  ) {}


  isPostOwner(post: IPost): boolean {
    const currentUserId = this.authService.user?._id;

    if (!currentUserId || !post.ownerId) {
      return false;
    }

    const isOwner = post.ownerId === currentUserId;

    return isOwner;
  }



 

}
