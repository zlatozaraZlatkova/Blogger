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
    private router: Router,
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



  onEdit(id: string) {
    this.router.navigate(['/posts/update', id]);
  }

  onDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    this.blogService.deletePost(id)
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        console.log('Delete successful:', response);
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        console.error('Delete failed:', error);
      },

    });
  }

  onLike(id: string) {
    console.log("liked post id", id)
  }

}
