import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';
import { AuthService } from 'src/app/user/auth.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css'],
})
export class BlogSectionComponent implements OnInit, OnDestroy {
  paginatedPosts$: Observable<IPostsResponse | null> = this.blogService.paginatedPosts$;

  private destroy$ = new Subject<void>();

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get currentUserId(): string | undefined {
    return this.authService.user?._id.toString();
  }

  constructor(
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadPostsForQueryParamsChanges();
  }

  loadArticles(page: number = 1): void {
    this.blogService.getPosts(page, 3).pipe(take(1)).subscribe();
  }

  private loadPostsForQueryParamsChanges(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$))
      .subscribe((urlParams) => {
        const pageNumberFormUrl = this.getPageFormUrl(urlParams);

        this.loadArticles(pageNumberFormUrl);
      });
  }


  private getPageFormUrl(urlParams: Params): number {
    const pageAsString = urlParams['page'];
    const pageAsNumber = parseInt(pageAsString, 10);

    if (!pageAsString || pageAsNumber < 1) {
      return 1;
    }

    return pageAsNumber;
  }

  onPageChange(page: number): void {
    console.log('Click on page:', page);

    this.router.navigate([], { queryParams: { page: page } });
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
        cancelButtonText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const currentPage = this.route.snapshot.queryParams['page'];
        const pageNumber = parseInt(currentPage, 10);

        this.blogService.deletePost(postId).pipe(take(1)).subscribe(() => {
          this.loadArticles(pageNumber);
        });

      }
    });
  }

  onLike(postId: string): void {
    this.blogService.onLike(postId).pipe(take(1)).subscribe();
  }

  isPostLiked(post: IPost): boolean {
    if (!this.currentUserId) {
      return false;
    } 
   
    return post.postLikes.some((likeId) => likeId.toString() === this.currentUserId);

  }

  navigateToArticle(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
