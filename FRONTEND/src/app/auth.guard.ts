import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  console.log(`authGuard ${authService.getToken()}`);
  return authService.isLoggedIn();
};
