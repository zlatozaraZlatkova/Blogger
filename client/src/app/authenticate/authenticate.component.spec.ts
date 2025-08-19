import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateComponent } from './authenticate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { IUser } from '../interfaces/user';

describe('AuthenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let paramMapSubject: BehaviorSubject<ParamMap>;
  let snapshotParamMap: ParamMap;

  const mockUserData: IUser = {
    _id: '',
    name: '',
    email: '',
    avatar: '',
    createdPosts: [],
    likedPostList: [],
    followedUsersList: []
  };

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['checkIsUserAuthenticated']);
    authServiceSpy.checkIsUserAuthenticated.and.returnValue(of(mockUserData));

    paramMapSubject = new BehaviorSubject(convertToParamMap({ id: '123' }));
    snapshotParamMap = convertToParamMap({ id: '123' });


    TestBed.configureTestingModule({
      declarations: [AuthenticateComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramMapSubject.asObservable(),
            snapshot: {
              paramMap: snapshotParamMap,
              data: { user: null },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set isAuthenticated to true when user is logged in', () => {
    const userData: IUser = {
      _id: '123',
      name: 'User Name',
      email: 'username@domain.com',
      avatar: 'www.avatar.com',
      createdPosts: [],
      likedPostList: [],
      followedUsersList: [],
    };

    authServiceSpy.checkIsUserAuthenticated.and.returnValue(of(userData));

    component.ngOnInit();

    expect(component.isAuthenticated).toBeTruthy();
  });

  it('should set isAuthenticated to false when user has no email', () => {
    const userWithoutEmail: IUser = {
      _id: '123',
      name: 'User Name',
      email: '',
      avatar: 'www.avatar.com',
      createdPosts: [],
      likedPostList: [],
      followedUsersList: [],
    };

    authServiceSpy.checkIsUserAuthenticated.and.returnValue(of(userWithoutEmail));

    component.ngOnInit();

    expect(component.isAuthenticated).toBeFalse();
  });

  it('should set isAuthenticated to false when user is null', () => {

    authServiceSpy.checkIsUserAuthenticated.and.returnValue(of(mockUserData));

    component.ngOnInit();

    expect(component.isAuthenticated).toBeFalse();
  });

  it('should set isAuthenticated to false when user is undefined', () => {

    authServiceSpy.checkIsUserAuthenticated.and.returnValue(of(undefined as unknown as IUser));

    component.ngOnInit();

    expect(component.isAuthenticated).toBeFalse();
  });

  it('should handle authentication error and redirect to login', () => {
    const route = TestBed.inject(Router);
    spyOn(route, 'navigate');

    const error = { status: 401, message: 'No active session' };
    authServiceSpy.checkIsUserAuthenticated.and.returnValue(throwError(() => error));

    component.ngOnInit();

    expect(component.isAuthenticated).toBeFalse();
    expect(route.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should set isAuthenticated to true when resolved user exists in route data', () => {

    const activatedRoute = TestBed.inject(ActivatedRoute);

    const userData: IUser = {
      _id: '123',
      name: 'User Name',
      email: 'username@domain.com',
      avatar: 'www.avatar.com',
      createdPosts: [],
      likedPostList: [],
      followedUsersList: [],
    };

    activatedRoute.snapshot.data['user'] = userData;

    component.ngOnInit();

    expect(component.isAuthenticated).toBeTruthy();
    expect(authServiceSpy.checkIsUserAuthenticated).not.toHaveBeenCalled();

  });

  it('should call checkIsUserAuthenticated when no resolved user in route data', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);

    activatedRoute.snapshot.data['user'] = null;
    component.ngOnInit();

    expect(component.isAuthenticated).toBeFalsy();
    expect(authServiceSpy.checkIsUserAuthenticated).toHaveBeenCalled();

  });


});
