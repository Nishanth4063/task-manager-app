import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // FIXED: Changed localStorage to sessionStorage
  const token = sessionStorage.getItem('token');

  if (token) {
    return true; // Token exists, grant access
  }

  // Unauthorized access attempt, redirect to authentication
  router.navigate(['/login']);
  return false;
};