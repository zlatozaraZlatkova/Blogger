import { Component, OnInit } from '@angular/core';
import { IPagination } from 'src/app/interfaces/pagination';
import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent implements OnInit {
  articles: IPost[] = [];
  pagination: IPagination | null = null;
  loading = false;
  error: string | null = null;

  constructor(private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }


  loadArticles(): void {
    this.loading = true;
    this.error = null;

    this.blogService.getPosts().subscribe({
      next: (response: IPostsResponse) => {
        if (response.success) {
          this.articles = response.data.items;
          this.pagination = response.data.pagination;
        } else {
          this.error = 'Failed to retrieve posts';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading posts: ' + (err.message);
        this.loading = false;
      },
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
