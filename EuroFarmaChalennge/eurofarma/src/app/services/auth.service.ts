import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL do back-end Spring Boot
  private apiUrl = 'http://localhost:8080'; // Substitua pela URL correta do seu back-end

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
    // Aqui estamos esperando uma resposta de texto
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { email, password, name, role }, { responseType: 'text' as 'json' });
  }

  // Outros métodos relacionados à autenticação, como logout
}
