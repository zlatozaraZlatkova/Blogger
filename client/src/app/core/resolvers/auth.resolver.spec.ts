import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { authResolver } from './auth.resolver';
import { IUser } from 'src/app/interfaces/user';

describe('authResolver', () => {
  const executeResolver: ResolveFn<IUser> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => authResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
