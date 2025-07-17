import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ICreateProfileDto, IProfile } from 'src/app/interfaces/profile';
import { ProfileApiService } from './profile-api.service';
import { IServerResponse } from 'src/app/interfaces/serverResponse';

@Injectable({
  providedIn: 'root'
})
export class PublicProfileService implements OnDestroy {
  private userPublicProfile$$ = new BehaviorSubject<IProfile | null>(null);
  userPublicProfile$: Observable<IProfile | null> = this.userPublicProfile$$.asObservable();

  constructor(private profileApiService: ProfileApiService) { }

  getProfile(): Observable<IProfile | null> {
    return this.profileApiService.getUserPublicProfile().pipe(
      tap((user) => this.userPublicProfile$$.next(user))
    )
  }

  getProfileById(id: string): Observable<IProfile> {
    return this.profileApiService.getUserPublicProfileById(id).pipe(
      tap((user) => this.userPublicProfile$$.next(user))
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

  clearState(): void {
    this.userPublicProfile$$.next(null);

  }


  ngOnDestroy(): void {
    this.userPublicProfile$$.complete();
  }
}
