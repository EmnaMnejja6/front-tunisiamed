import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    console.log('Auth interceptor: Adding token to request', req.url);
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Auth interceptor: 401 Unauthorized - Token may be expired');
        }
        return throwError(() => error);
      })
    );
  }
  
  console.log('Auth interceptor: No token found for request', req.url);
  return next(req);
};
