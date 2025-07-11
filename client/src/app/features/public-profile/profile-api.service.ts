import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreateProfileDto, IProfile } from 'src/app/interfaces/profile';
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

  getUserPublicProfileById(id: string): Observable<IProfile> {
    return this.httpClient.get<IProfile>(`${this.basicUrl}/${id}`);
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

}
