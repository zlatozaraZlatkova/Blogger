import { Component, OnInit } from '@angular/core';
import { IPostsResponse } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})

export class BlogSectionComponent implements OnInit {

  postsList$: Observable<IPostsResponse | null> = this.blogService.postsList$;
  
  loading = false;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading = true;
    
    this.blogService.getPosts().subscribe({
      next: () => {
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.loading = false;
      }
    });
  }

  viewAllArticles(): void {
    console.log('View all blogs clicked');
    this.loadArticles();
  }

  navigateToArticle(id: string): void {
    console.log('Article id: ', id);
    this.router.navigate(['/posts', id]);
  }
}