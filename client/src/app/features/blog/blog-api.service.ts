import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/interfaces/comment';
import { ICreatePostDto, IPost, IPostsResponse } from 'src/app/interfaces/post';
import { IServerResponse } from 'src/app/interfaces/serverResponse';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  private basicUrl = `/api/posts`;

  constructor(private httpClient: HttpClient) { }

  loadAllPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.basicUrl}/all`);
  }


  getPosts(page: number, limit: number): Observable<IPostsResponse> {
    
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.httpClient.get<IPostsResponse>(`${this.basicUrl}`, { params });
  }

  getPostById(id: string): Observable<IPost> {
    return this.httpClient.get<IPost>(`${this.basicUrl}/${id}`);
  }

  createPost(data: ICreatePostDto): Observable<IPost> {
    return this.httpClient.post<IPost>(`${this.basicUrl}/create`, data);
  }

  editPost(id: string, data: ICreatePostDto): Observable<IPost> {
    return this.httpClient
      .put<IPost>(`${this.basicUrl}/update/${id}`, data);
  }

  deletePost(id: string): Observable<IServerResponse> {
    return this.httpClient
      .delete<IServerResponse>(`${this.basicUrl}/delete/${id}`, {});
  }


  createPostComment(postId: string, data: IComment): Observable<IPost> {
    return this.httpClient.post<IPost>(`/api/posts/comment/${postId}/create`, data);
  }

  likePost(postId: string): Observable<IPost> {
    return this.httpClient.post<IPost>(`/api/posts/like/${postId}`, {});
  }

}


