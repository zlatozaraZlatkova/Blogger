import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICreatePostDto, IPost, IPostsResponse } from 'src/app/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private basicUrl = `/api/posts`;
  
    constructor(private httpClient: HttpClient) {}
  
    getPosts(): Observable<IPostsResponse> {
      return this.httpClient.get<IPostsResponse>(`${this.basicUrl}`);
    }
  
    getPostById(id: string): Observable<IPost> {
      return this.httpClient.get<IPost>(`${this.basicUrl}/${id}`);
    }

    createPost(data: ICreatePostDto): Observable<IPost> {
      return this.httpClient.post<IPost>(`${this.basicUrl}/create`, data);
    }
}
