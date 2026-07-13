import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Pull the token from volatile sessionStorage to prevent multi-identity collision bugs
  const token = sessionStorage.getItem('token');

  // Clone the request and attach the authorization header if the token exists
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};