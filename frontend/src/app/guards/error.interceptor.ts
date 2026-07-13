import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // FIXED: Only handle 401 redirect if the request is NOT hitting the login endpoint
      if (error.status === 401 && !req.url.endsWith('/auth/login')) {
        sessionStorage.removeItem('token'); // Keep storage layers clean
        router.navigate(['/login']);
      }
      
      // Pass the error down so LoginComponent error block actually receives it
      return throwError(() => error);
    })
  );
};