import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


  getPosts(): Observable<IPostsResponse> {
    return this.httpClient.get<IPostsResponse>(`${this.basicUrl}`);
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

}


