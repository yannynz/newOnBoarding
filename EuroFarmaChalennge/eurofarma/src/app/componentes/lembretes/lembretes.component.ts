import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../../services/reminder.service';
import { AuthService } from '../../services/auth.service';
import { Reminder } from '../../models/remind.model';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.component.html',
  styleUrls: ['./lembretes.component.css']
})
export class LembretesComponent implements OnInit {
  reminders: Reminder[] = [];
  userId: number = 0; // Inicializar com um valor padrão
  newReminder: Reminder = { title: '', description: '', userId: this.userId };
  editingReminder: Reminder | null = null;

  constructor(
    private reminderService: ReminderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() ?? 0; // Define um valor padrão caso seja null
    if (this.userId !== 0) {
      this.newReminder.userId = this.userId;
      this.loadReminders();
    } else {
      console.error('Usuário não autenticado');
    }
  }

  loadReminders(): void {
    if (this.userId !== 0) {
      this.reminderService.getRemindersByUser(this.userId).subscribe(
        (data) => {
          console.log('Reminders loaded:', data); // Verifique os dados carregados
          this.reminders = data;
        },
        (error) => {
          console.error('Erro ao carregar lembretes:', error);
        }
      );
    }
  }

  addReminder(): void {
    if (this.newReminder.title && this.newReminder.description && this.userId !== 0) {
      this.reminderService.createReminder(this.userId, this.newReminder).subscribe(
        (reminder) => {
          this.reminders.push(reminder);
          this.newReminder = { title: '', description: '', userId: this.userId };
        },
        (error) => {
          console.error('Erro ao adicionar lembrete:', error);
        }
      );
    }
  }

  editReminder(reminder: Reminder): void {
    this.editingReminder = { ...reminder };
  }

  updateReminder(): void {
    if (this.editingReminder && this.userId !== 0) {
      this.reminderService.updateReminder(this.editingReminder.id!, this.editingReminder).subscribe(
        (updatedReminder) => {
          const index = this.reminders.findIndex(r => r.id === updatedReminder.id);
          if (index !== -1) {
            this.reminders[index] = updatedReminder;
          }
          this.editingReminder = null;
        },
        (error) => {
          console.error('Erro ao atualizar lembrete:', error);
        }
      );
    }
  }

  deleteReminder(id: number): void {
    this.reminderService.deleteReminder(id).subscribe(
      () => {
        this.reminders = this.reminders.filter(reminder => reminder.id !== id);
      },
      (error) => {
        console.error('Erro ao deletar lembrete:', error);
      }
    );
  }
}
