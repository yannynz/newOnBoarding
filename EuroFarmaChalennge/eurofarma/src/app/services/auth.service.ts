import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

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
    localStorage.setItem('userId', user.id);
    localStorage.setItem('token', user.token);
    localStorage.setItem('firstAccess', user.firstAccess.toString());
    localStorage.setItem('firstAccess2', user.firstAccess2.toString()); // Adicionando firstAccess2
    console.log('User data saved:', {
      userId: user.id,
      token: user.token,
      firstAccess: user.firstAccess,
      firstAcces2: user.firstAccess2
    });
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
    localStorage.removeItem('firstAccess');
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica a presença do token no localStorage
  }

  updateFirstAccess(userId: number, firstAccess: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/${userId}/firstAccess`, { firstAccess });
  }

  updateUser(id: number, userDetails: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/auth/${id}`, userDetails);
  }

  // Método para excluir o usuário
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/auth/${id}`);
  }
}
