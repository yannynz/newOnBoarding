import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token) {
      // Permite o acesso se o token estiver presente
      return true;
    }

    // Se o token não estiver presente, redireciona para a página de login
    console.log('No token present, redirecting to /login');
    return this.router.createUrlTree(['/login']);
  }
}
