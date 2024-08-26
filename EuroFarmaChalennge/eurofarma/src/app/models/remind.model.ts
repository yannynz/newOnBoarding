// src/app/models/remind.model.ts

export interface Reminder {
  id?: number;              // Opcional, pois pode ser gerado automaticamente pelo backend
  title: string;           // Título do lembrete
  description: string;    // Descrição do lembrete
  userId: number;         // ID do usuário associado ao lembrete
}
