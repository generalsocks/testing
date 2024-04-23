import { AuthGuard } from './auth.guard';
import { CanActivateFn } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => {
    const authGuard = TestBed.inject(AuthGuard);
    return authGuard.canActivate(...guardParameters);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
