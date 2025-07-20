import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { ICreatePostDto, IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogApiService } from './blog-api.service';
import { IServerResponse } from 'src/app/interfaces/serverResponse';
import { IComment } from 'src/app/interfaces/comment';



@Injectable({
  providedIn: 'root',
})
export class BlogService implements OnDestroy {
  private paginatedPosts$$ = new BehaviorSubject<IPostsResponse | null>(null);
  paginatedPosts$ = this.paginatedPosts$$.asObservable();

  private post$$ = new BehaviorSubject<IPost | null>(null);
  post$ = this.post$$.asObservable();


  constructor(private blogApiService: BlogApiService) { }

  getPosts(page: number = 1, limit: number = 3): Observable<IPostsResponse> {
    return this.blogApiService.getPosts(page, limit).pipe(
      tap((response) => {
        this.paginatedPosts$$.next(response);
      })
    );
  }

  getPostById(id: string): Observable<IPost> {
    return this.blogApiService.getPostById(id).pipe(
      tap((post) => {
        this.post$$.next(post);
      })
    );
  }

  createPost(data: ICreatePostDto): Observable<IPost> {
    return this.blogApiService.createPost(data).pipe(
      tap((createdPost) => {
        this.addPostToLocalState(createdPost);
      })
    );
  }

  editPost(id: string, data: ICreatePostDto): Observable<IPost> {
    return this.blogApiService.editPost(id, data).pipe(
      tap((updatedPost) => {
        this.post$$.next(updatedPost);

        this.updatePostToLocalState(updatedPost);
      })
    );
  }

  deletePost(id: string): Observable<IServerResponse> {
    return this.blogApiService.deletePost(id).pipe(
      tap(() => {
        this.post$$.next(null);

        this.removePostFromLocalState(id);
      })
    );
  }

  createComment(postId: string, data: IComment) {
    return this.blogApiService.createPostComment(postId, data).pipe(
      tap((response) => {
        this.post$$.next(response);

        this.updatePostToLocalState(response);
      })
    );
  }


  onLike(postId: string): Observable<IPost> {
    return this.blogApiService.likePost(postId).pipe(
      tap((updatedPost) => {
        this.post$$.next(updatedPost);
        this.updatePostToLocalState(updatedPost);
      })
    );
  }


  private addPostToLocalState(createdPost: IPost): void {
    const response = this.paginatedPosts$$.value;

    if (response) {
      const updatedResponse: IPostsResponse = {
        ...response,
        data: {
          ...response.data,
          items: [createdPost, ...response.data.items],
        },
      };
      this.paginatedPosts$$.next(updatedResponse);
    }
  }

  private updatePostToLocalState(updatedPost: IPost): void {
    const response = this.paginatedPosts$$.value;

    if (response) {
      const updatedItems = response.data.items.map((post) => post._id === updatedPost._id ? updatedPost : post);

      const updatedPostsList: IPostsResponse = {
        ...response,
        data: {
          ...response.data,
          items: updatedItems,
        },
      };
      this.paginatedPosts$$.next(updatedPostsList);
    }
  }

  private removePostFromLocalState(deletedPostId: string): void {
    const response = this.paginatedPosts$$.value;

    if (response) {
      const filteredItems = response.data.items.filter((post) => post._id !== deletedPostId);

      const updatedPostsList: IPostsResponse = {
        ...response,
        data: {
          ...response.data,
          items: filteredItems,
        },
      };

      this.paginatedPosts$$.next(updatedPostsList);
    }

  }

  clearState(): void {
    this.paginatedPosts$$.next(null);
    this.post$$.next(null);
  }

  ngOnDestroy(): void {
    this.paginatedPosts$$.complete();
    this.post$$.complete();
  }
}
