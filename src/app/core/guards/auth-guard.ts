import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../features/auth/services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
