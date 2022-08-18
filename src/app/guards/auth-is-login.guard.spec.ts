import { TestBed } from '@angular/core/testing';

import { AuthIsLoginGuard } from './auth-is-login.guard';

describe('AuthIsLoginGuard', () => {
  let guard: AuthIsLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthIsLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
