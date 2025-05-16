import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from './interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  loadPosts() {
    return this.httpClient.get<IPost[]>(`/api/posts`);
  }
}
