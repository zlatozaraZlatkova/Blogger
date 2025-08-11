import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { IUser } from '../interfaces/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUserData: IUser = {
    _id: '123',
    name: 'User Name',
    email: 'username@domain.com',
    avatar: 'www.avatar.com',
    createdPosts: [],
    likedPostList: [],
    followedUsersList: []
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user', () => {
    service.register('User Name', 'username@domain.com', '!1Aa223344').subscribe(user => {
      expect(user).toEqual(mockUserData);
      expect(service.user).toEqual(mockUserData);
    });


    const req = httpMock.expectOne('/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockUserData);
  });

  it('should handle register error', () => {
    service.register('User Name', 'john@test.com', '1111').subscribe({
      next: () => fail('Should have failed'),
      error: (error) => expect(error.status).toBe(400)
    });

    const req = httpMock.expectOne('/api/auth/register');
    req.flush('Registration failed', { status: 400, statusText: 'Bad Request' });
  });


  it('should login user', () => {
    service.login('username@domain.com', '!1Aa223344').subscribe(user => {
      expect(user).toEqual(mockUserData);
      expect(service.user).toEqual(mockUserData);
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockUserData);
  });

  it('should handle login user error', () => {
    service.login('john@test.com', '11111').subscribe({
      next: () => fail('Should have failed'),
      error: (error) => expect(error.status).toBe(401)
    });

    const req = httpMock.expectOne('/api/auth/login');
    req.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });
  });


  it('should logout user', () => {
    service.logout().subscribe(() => {
      expect(service.user).toBeNull();
    });

    const req = httpMock.expectOne('/api/auth/logout');
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it('should handle logout error', () => {
    service.logout().subscribe({
      next: () => fail('Should have failed'),
      error: (error) => expect(error.status).toBe(500)
    });

    const req = httpMock.expectOne('/api/auth/logout');
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });


  it('should check user authentication', () => {
    service.checkIsUserAuthenticated().subscribe(user => {
      expect(user).toEqual(mockUserData);
    });

    const req = httpMock.expectOne('/api/check-auth');
    req.flush(mockUserData);
  });

  it('should handle authentication error, return of(err)', () => {
    service.checkIsUserAuthenticated().subscribe({
      next: () => expect(service.user).toBeNull(),
      error: (error) => expect(error.status).toBe(401)
    });

    const req = httpMock.expectOne('/api/check-auth');
    req.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });
  });



});

