import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { authResolver } from './auth.resolver';

describe('authResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => authResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
