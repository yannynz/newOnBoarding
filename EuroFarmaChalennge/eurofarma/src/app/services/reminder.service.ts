import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reminder } from '../models/remind.model';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private apiUrl = 'http://localhost:8080/api/reminders'; // URL base do seu back-end

  constructor(private http: HttpClient) {}

  getRemindersByUser(userId: number): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Criar um novo lembrete
  createReminder(userId: number, reminder: Reminder): Observable<Reminder> {
    return this.http.post<Reminder>(`${this.apiUrl}/user/${userId}`, reminder);
  }

  // Atualizar um lembrete
  updateReminder(id: number, reminder: Reminder): Observable<Reminder> {
    return this.http.put<Reminder>(`${this.apiUrl}/${id}`, reminder);
  }

  // Deletar um lembrete
  deleteReminder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
