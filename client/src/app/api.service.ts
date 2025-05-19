import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, IPostsResponse } from './interfaces/post';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private basicUrl = `/api/posts`;

  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<IPostsResponse> {
    return this.httpClient.get<IPostsResponse>(`${this.basicUrl}`);
  }

  getPostById(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.basicUrl}/:id`);
  }
}
