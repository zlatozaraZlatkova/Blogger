import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ICreatePostDto, IPost, IPostsResponse } from 'src/app/interfaces/post';
import { BlogApiService } from './blog-api.service';
import { IServerResponse } from 'src/app/interfaces/serverResponse';
import { IComment } from 'src/app/interfaces/comment';

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

        console.log('Server create post response', createdPost);

        const currentPosts = this.arrPosts$$.value;
        if (currentPosts !== null) {
          this.arrPosts$$.next([createdPost, ...currentPosts]);
        }

        const currentPostsList = this.postsList$$.value;
        if (currentPostsList !== null) {
          const updatedPostsList: IPostsResponse = {
            ...currentPostsList,
            data: {
              ...currentPostsList.data,
              items: [createdPost, ...currentPostsList.data.items]
            }
          };
          this.postsList$$.next(updatedPostsList);
        }

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

        const currentPosts = this.arrPosts$$.value;
        if (currentPosts !== null) {
          const updatedPosts = currentPosts.map(post =>
            post._id === id ? updatedPost : post
          );
          this.arrPosts$$.next(updatedPosts);
        }

        const currentPostsList = this.postsList$$.value;
        if (currentPostsList !== null) {
          const updatedItems = currentPostsList.data.items.map(post =>
            post._id === id ? updatedPost : post
          );
          const updatedPostsList: IPostsResponse = {
            ...currentPostsList,
            data: {
              ...currentPostsList.data,
              items: updatedItems
            }
          };
          this.postsList$$.next(updatedPostsList);
        }

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


        const currentPosts = this.arrPosts$$.value;
        if (currentPosts !== null) {
          const filteredPosts = currentPosts.filter(post => post._id !== id);
          this.arrPosts$$.next(filteredPosts);
        }

        const currentPostsList = this.postsList$$.value;
        if (currentPostsList !== null) {
          const filteredItems = currentPostsList.data.items.filter(post => post._id !== id);
          const updatedPostsList: IPostsResponse = {
            ...currentPostsList,
            data: {
              ...currentPostsList.data,
              items: filteredItems
            }
          };
          this.postsList$$.next(updatedPostsList);
        }

      }),
      catchError((error) => {
        this.post$$.next(null);
        return throwError(() => error);
      })
    );
  }


  createComment(postId: string, data: IComment) {
    return this.blogApiService.createPostComment(postId, data).pipe(
      tap((response) => {
        this.post$$.next(response);

        const currentPosts = this.arrPosts$$.value;
        if (currentPosts !== null) {
          const updatedPosts = currentPosts.map(post => {
            if (post._id === postId) {
              return response;
            }
            return post;
          });
          this.arrPosts$$.next(updatedPosts);
        }

        const currentPostsList = this.postsList$$.value;
        if (currentPostsList !== null) {
          const updatedItems = currentPostsList.data.items.map(post =>
            post._id === postId ? response : post
          );
          const updatedPostsList: IPostsResponse = {
            ...currentPostsList,
            data: {
              ...currentPostsList.data,
              items: updatedItems
            }
          };
          this.postsList$$.next(updatedPostsList);
        }

      }),
      catchError(error => {
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