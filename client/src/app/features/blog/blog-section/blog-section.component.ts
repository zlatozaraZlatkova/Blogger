import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})

export class BlogSectionComponent implements OnInit, OnDestroy {
  postsList$: Observable<IPostsResponse | null> = this.blogService.postsList$;
  arrPosts$: Observable<IPost[] | null> = this.blogService.arrPosts$;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.blogService.getPosts().subscribe();
  }

  viewAllArticles(): void {
    this.blogService.loadAllPosts().subscribe();
  }

  navigateToArticle(id: string): void {
    console.log('Article id: ', id);
    this.router.navigate(['/posts', id]);
  }

  ngOnDestroy() {
    if (!this.router.url.startsWith('/posts')) {
      this.blogService.clearState();
    }

  }
}