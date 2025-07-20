import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent implements OnInit, OnDestroy {
  paginatedPosts$: Observable<IPostsResponse | null> = this.blogService.paginatedPosts$;
 
  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService,
    private matDialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(page: number = 1): void {
    this.blogService.getPosts(page, 3).pipe(take(1)).subscribe();
  }


  isPostOwner(post: IPost): boolean {
    const currentUserId = this.authService.user?._id;
    return currentUserId === post.ownerId;
  }


  onEdit(postId: string): void {
    this.router.navigate(['/posts/update', postId]);
  }

  onDelete(postId: string): void {

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        title: 'Delete Profile',
        message: 'Are you sure you want to delete this post?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      }
    })
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.blogService.deletePost(postId).pipe(take(1)).subscribe();
      }
    })


  }

  onLike(postId: string): void {
    console.log("post id", postId);
    this.blogService.onLike(postId).pipe(take(1)).subscribe();
  }

  navigateToArticle(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  onPageChange(page: number): void {
    console.log("Current Page", page)
  }

  ngOnDestroy(): void {
    if (!this.router.url.startsWith('/posts')) {
      this.blogService.clearState();
    }
  }
}