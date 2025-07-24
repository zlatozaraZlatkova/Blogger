import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { Location } from '@angular/common';

import { IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  paginatedPosts$: Observable<IPostsResponse | null> = this.blogService.paginatedPosts$;
  post$: Observable<IPost | null> = this.blogService.post$;

  relatedArticles: IPost[] = [];
  popularArticles: IPost[] = [];
  loading = false;

  authorProfileId?: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
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

    this.blogService.getPostById(id).subscribe({
      next: (postData) => {
        console.log('Post loaded successfully', postData);

        const owner = postData.ownerId as { publicProfile?: { _id: string } } | undefined;
        this.authorProfileId = owner?.publicProfile?._id;
        console.log("author profile id", this.authorProfileId)


        this.loadRelatedArticles();
      },
      error: (err) => {
        console.error('Error loading article:', err);
        this.loading = false;
        this.location.back();
      },
    });
  }

  loadRelatedArticles(): void {
    this.post$
      .pipe(
        filter((article): article is IPost => article !== null),
        switchMap((currentArticle) => {
          const currentCategory = currentArticle.postCategory;
          const currentId = currentArticle._id;

          return this.paginatedPosts$.pipe(
            filter((response): response is IPostsResponse => response !== null),
            tap((postsResponse) => {
              if (postsResponse?.success) {
                const items = postsResponse.data.items;
                const filteredItems = items.filter(
                  (article) => article._id !== currentId
                );

                // Related articles (same category)
                this.getRelatedArticles(filteredItems, currentCategory);


                // Popular articles (most comments)
                this.getPopularArticles(filteredItems);
              }

              this.loading = false;
            })
          );
        })
      )
      .subscribe({
        error: () => {
          this.loading = false;
        },
      });
  }

  private getRelatedArticles(filteredItems: IPost[], currentCategory: string): void {
    this.relatedArticles = filteredItems
      .filter((article) => article.postCategory === currentCategory)
      .slice(0, 3);
  }

  private getPopularArticles(filteredItems: IPost[]): void {
    this.popularArticles = filteredItems
      .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
      .slice(0, 3);
  }


  navigateToArticle(id: string): void {
    this.router.navigate(['/posts', id]);
  }

  navigateToAutorProfile(): void {
    if (this.authorProfileId === undefined) {
      return;

    }

    this.router.navigate([`/profile/public/${this.authorProfileId}`]);


  }


}
