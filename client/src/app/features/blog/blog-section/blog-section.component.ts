import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent implements OnInit, OnDestroy {
  paginatedPosts$: Observable<IPostsResponse | null> = this.blogService.paginatedPosts$;
  arrPosts$: Observable<IPost[] | null> = this.blogService.arrPosts$;

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.blogService.getPosts().subscribe();
  }

  viewAllArticles(): void {
    this.blogService.loadAllPosts().pipe(take(1)).subscribe();
  }

  isPostOwner(post: IPost): boolean {
    const currentUserId = this.authService.user?._id;
    return currentUserId === post.ownerId;
  }

 
  onEdit(postId: string): void {
    this.router.navigate(['/posts/update', postId]);
  }

  onDelete(postId: string): void {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }
    this.blogService.deletePost(postId).pipe(take(1)).subscribe();
  }

  onLike(postId: string): void {
    console.log("post id", postId);
    this.blogService.onLike(postId).pipe(take(1)).subscribe();
  }

  navigateToArticle(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  ngOnDestroy(): void {
    if (!this.router.url.startsWith('/posts')) {
      this.blogService.clearState();
    }
  }
}