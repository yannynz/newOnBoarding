import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // URL do back-end

  constructor(private http: HttpClient) {}

  // Método para login
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${email}:${password}`)
    });

    return this.http.post<any>(`${this.apiUrl}/auth/login`, {}, { headers });
  }

  // Método para cadastro
  register(email: string, password: string, name: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { email, password, name, role }, { responseType: 'text' as 'json' });
  }

  // Armazenar dados do usuário no localStorage após o login
  saveUserData(user: any): void {
    localStorage.setItem('userId', user.id); // Exemplo para armazenar o userId
    localStorage.setItem('token', user.token); // Supondo que o token também seja retornado
  }

  // Recuperar o userId do localStorage
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }

  // Logout e remoção dos dados do usuário
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica a presença do token no localStorage
  }
}
