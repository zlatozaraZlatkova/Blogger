import { Component, OnInit } from '@angular/core';
import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  currentArticle: IPost | null = null;
  relatedArticles: IPost[] = [];
  popularArticles: IPost[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadCurrentArticle(id);
      }
    });
  }

  loadCurrentArticle(id: string): void {
    this.loading = true;
    this.error = null;

    this.blogService.getPostById(id).subscribe({
      next: (postData) => {
        this.currentArticle = postData;

        this.loadRelatedArticles();
      },
      error: (err) => {
        console.error('Error loading article:', err);
        this.error = 'Error loading article: ' + (err.message);
        this.loading = false;
      },
    });
  }

  loadRelatedArticles(): void {
    if (!this.currentArticle) {
      this.loading = false;
      return;
    }

    const currentCategory = this.currentArticle.postCategory;
    const currentId = this.currentArticle._id;

    this.blogService.getPosts().subscribe({
      next: (response: IPostsResponse) => {
        if (response?.success) {
          const items = response.data.items;
          const filteredItems = items.filter(article => article._id !== currentId);

          // Related articles (same category)
          this.relatedArticles = filteredItems
            .filter(article => article.postCategory === currentCategory)
            .slice(0, 3);

          // Popular articles (most comments)
          this.popularArticles = filteredItems
            .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
            .slice(0, 3);
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




  navigateToArticle(id: string): void {
    console.log('Article id: ', id);
    this.router.navigate(['/posts', id]);
  }
}
