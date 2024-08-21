import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userType = localStorage.getItem('userType');
    const requiredRole = route.data['role'] as string;

    if (userType === requiredRole) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
