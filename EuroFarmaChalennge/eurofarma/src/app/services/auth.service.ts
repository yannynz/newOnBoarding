import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL do back-end Spring Boot
  private apiUrl = ''; // Substitua pela URL correta do seu back-end

  constructor(private http: HttpClient) {}

  // Método para login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password });
  }

  // Método para cadastro
  register(email: string, password: string, name: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { email, password, name, role });
  }

  // Outros métodos relacionados à autenticação, como logout
}
