import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Check if user is trying to access clinic-admin routes
    const isClinicAdminRoute = route.url.some(segment => segment.path === 'clinic-admin');
    const user = authService.getUser();
    
    // If accessing clinic-admin routes, must be CLINIC_ADMIN
    if (isClinicAdminRoute && user?.role !== 'CLINIC_ADMIN') {
      router.navigate(['/admin/login']);
      return false;
    }
    
    // If accessing admin routes, must be ADMIN
    if (!isClinicAdminRoute && user?.role !== 'ADMIN') {
      router.navigate(['/clinic-admin/login']);
      return false;
    }
    
    return true;
  }

  // Redirect to appropriate login based on route
  const isClinicAdminRoute = route.url.some(segment => segment.path === 'clinic-admin');
  if (isClinicAdminRoute) {
    router.navigate(['/clinic-admin/login']);
  } else {
    router.navigate(['/admin/login']);
  }
  
  return false;
};
