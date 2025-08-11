import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { authResolver } from './auth.resolver';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/user/auth.service';
import { Observable, of } from 'rxjs';

describe('authResolver', () => {
  const executeResolver: ResolveFn<IUser> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => authResolver(...resolverParameters));

  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockUserData: IUser = {
    _id: '123',
    name: 'User Name',
    email: 'username@domain.com',
    avatar: 'www.avatar.com',
    createdPosts: [],
    likedPostList: [],
    followedUsersList: [],
  };

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['checkIsUserAuthenticated']);
    authServiceSpy.checkIsUserAuthenticated.and.returnValue(of(mockUserData));

    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });

  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should call checkIsUserAuthenticated and resolve user data', () => {

    const mockRoute = {
      params: {},
      data: {
        title: "User's Profile",
        layout: 'default',
        showHeader: true,
        showFooter: true,
      },
    } as any as ActivatedRouteSnapshot;

    const mockState = {
      url: '/profile',
      root: mockRoute,
    } as any as RouterStateSnapshot;

    authServiceSpy.checkIsUserAuthenticated.and.returnValue(of(mockUserData));

    TestBed.runInInjectionContext(() => {
      return (authResolver(mockRoute, mockState) as Observable<IUser>)
        .subscribe((user) => {
          expect(user).toEqual(mockUserData);
        });
    });

    expect(authServiceSpy.checkIsUserAuthenticated).toHaveBeenCalled();
  });

});
