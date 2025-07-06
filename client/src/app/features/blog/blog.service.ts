import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, take, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ICreatePostDto, IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogApiService } from './blog-api.service';
import { IServerResponse } from 'src/app/interfaces/serverResponse';

@Injectable({
  providedIn: 'root',
})
export class BlogService implements OnDestroy {
  private postsList$$ = new BehaviorSubject<IPostsResponse | null>(null);
  postsList$ = this.postsList$$.asObservable();

  private post$$ = new BehaviorSubject<IPost | null>(null);
  post$ = this.post$$.asObservable();

  private arrPosts$$ = new BehaviorSubject<IPost[] | null>(null);
  arrPosts$ = this.arrPosts$$.asObservable();

  constructor(private blogApiService: BlogApiService) { }

  loadAllPosts(): Observable<IPost[]> {
    return this.blogApiService.loadAllPosts().pipe(
      tap((arr) => {
        this.arrPosts$$.next(arr);
        console.log('Server All posts response', arr);
      }),
      catchError((error) => {
        this.arrPosts$$.next(null);
        return throwError(() => error);
      })
    )
  }


  getPosts(): Observable<IPostsResponse> {
    return this.blogApiService.getPosts().pipe(
      tap((response) => {
        this.postsList$$.next(response);
        console.log('Server PostsList response', response);
      }),
      catchError((error) => {
        this.postsList$$.next(null);
        return throwError(() => error);
      })
    );
  }

  getPostById(id: string): Observable<IPost> {
    return this.blogApiService.getPostById(id).pipe(
      tap((post) => {
        this.post$$.next(post);
        console.log('Server post id response', post);
      }),
      catchError((error) => {
        this.post$$.next(null);
        return throwError(() => error);
      })
    );
  }

  createPost(data: ICreatePostDto): Observable<IPost> {
    return this.blogApiService.createPost(data).pipe(
      tap((createdPost) => {
        this.post$$.next(createdPost);
        console.log('Server create post response', createdPost);

      }),
      catchError((error) => {
        this.post$$.next(null);
        return throwError(() => error);
      })
    );
  }

  editPost(id: string, data: ICreatePostDto): Observable<IPost> {
    return this.blogApiService.editPost(id, data).pipe(
      tap((updatedPost) => {
        this.post$$.next(updatedPost);
        console.log('Server edit post response', updatedPost);
      }),
      catchError((error) => {
        this.post$$.next(null);
        return throwError(() => error);
      })
    );
  }

  deletePost(id: string): Observable<IServerResponse> {
    return this.blogApiService.deletePost(id).pipe(
      tap((response) => {
        this.post$$.next(null);
        console.log('Server delete post response', response);
      }),
      catchError((error) => {
        this.post$$.next(null);
        return throwError(() => error);
      })
    );
  }

  clearState(): void {
    this.postsList$$.next(null);
    this.post$$.next(null);
    this.arrPosts$$.next(null);
  }

  ngOnDestroy(): void {
    this.postsList$$.complete();
    this.post$$.complete();
    this.arrPosts$$.complete();
  }
}