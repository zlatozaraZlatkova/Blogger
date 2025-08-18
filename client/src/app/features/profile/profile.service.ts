import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { ICreateProfileDto, IProfile, IProfileWithCreatedPosts } from 'src/app/interfaces/profile';
import { ProfileApiService } from './profile-api.service';
import { IServerResponse } from 'src/app/interfaces/serverResponse';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnDestroy {
  private userPublicProfile$$ = new BehaviorSubject<IProfile | null>(null);
  userPublicProfile$: Observable<IProfile | null> = this.userPublicProfile$$.asObservable();

  private viewedProfile$$ = new BehaviorSubject<IProfileWithCreatedPosts | null>(null);
  viewedProfile$: Observable<IProfileWithCreatedPosts | null> = this.viewedProfile$$.asObservable();

  constructor(private profileApiService: ProfileApiService) { }

  getProfile(): Observable<IProfile | null> {
  this.userPublicProfile$$.next(null);
  
  return this.profileApiService.getUserPublicProfile().pipe( 
    tap((user) => this.userPublicProfile$$.next(user))
  );
}
  getProfileById(id: string): Observable<IProfileWithCreatedPosts> {
    return this.profileApiService.getUserPublicProfileById(id).pipe(
      tap((userData) => this.viewedProfile$$.next(userData))
    )
  }

  createProfile(data: ICreateProfileDto): Observable<IProfile> {
    return this.profileApiService.createUserPublicProfile(data).pipe(
      tap((createdProfile) => {
        this.userPublicProfile$$.next(createdProfile);
      })
    )
  }

  editProfile(data: ICreateProfileDto): Observable<IProfile> {
    return this.profileApiService.updateUserPublicProfile(data).pipe(
      tap((updatedData) => {
        this.userPublicProfile$$.next(updatedData);
      })
    )
  }

  deleteProfile(): Observable<IServerResponse> {
    return this.profileApiService.deleteUserPublicProfile().pipe(
      tap(() => {
        this.userPublicProfile$$.next(null);
      })
    )
  }

  followProfile(id: string): Observable<IProfileWithCreatedPosts> {
    return this.profileApiService.followUserProfile(id).pipe(
      tap((updatedData) =>  this.viewedProfile$$.next(updatedData))
    )
  }


  clearState(): void {
    this.userPublicProfile$$.next(null);
    this.viewedProfile$$.next(null);

  }


  ngOnDestroy(): void {
    this.userPublicProfile$$.complete();
    this.viewedProfile$$.complete();
  }
}
