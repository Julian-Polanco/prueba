import { TestBed } from '@angular/core/testing';

import { AuthAdminGuard } from './auth-admin.guard';

describe('AuthGuard', () => {
  let guard: AuthAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
