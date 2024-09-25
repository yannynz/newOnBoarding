// feedback.service.ts
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/feedbacks'; // URL do back-end

  constructor(private http: HttpClient) {}

  createFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${feedback.userId}`, feedback);
  }

  updateFirstAccess2(userId: number, firstAccess2: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/${userId}/firstAccess2`, { firstAccess2 });
  }

  getUserFirstAccess2(userId: number): boolean {
    const firstAccess2 = localStorage.getItem('firstAccess2');
    return firstAccess2 === 'true'; // Retorna true ou false com base no valor armazenado
  }

  getFeedbackCountByStars(): Observable<any> {
    return this.http.get(`${this.apiUrl}/count-by-stars`);
  }

  getUserCountByRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/count-by-roles`);
}
}


