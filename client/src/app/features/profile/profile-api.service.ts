import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreateProfileDto, IProfile, IProfileWithCreatedPosts } from 'src/app/interfaces/profile';
import { IServerResponse } from 'src/app/interfaces/serverResponse';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private basicUrl = `/api/profile`;

  constructor(private httpClient: HttpClient) { }

  getUserPublicProfile(): Observable<IProfile> {
    return this.httpClient.get<IProfile>(`${this.basicUrl}`)
  }

  getUserPublicProfileById(id: string): Observable<IProfileWithCreatedPosts> {
    return this.httpClient.get<IProfileWithCreatedPosts>(`${this.basicUrl}/public/${id}`);
  }

  createUserPublicProfile(data: ICreateProfileDto): Observable<IProfile> {
    return this.httpClient.post<IProfile>(`${this.basicUrl}/create`, data);
  }

  updateUserPublicProfile(data: ICreateProfileDto): Observable<IProfile> {
    return this.httpClient.post<IProfile>(`${this.basicUrl}/update/`, data);
  }

  deleteUserPublicProfile(): Observable<IServerResponse> {
    return this.httpClient.delete<IServerResponse>(`${this.basicUrl}/delete`, {});
  }

  followUserProfile(id:string): Observable<IProfileWithCreatedPosts> {
    return this.httpClient.post<IProfileWithCreatedPosts>(`${this.basicUrl}/public/${id}/follow`, {})
  }

}
