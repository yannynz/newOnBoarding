import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Importa todos os componentes do Chart.js
import { FeedbackService } from 'src/app/services/feedback.service';

Chart.register(...registerables); // Registra todos os componentes necessários

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css']
})
export class GerenteComponent implements OnInit {

  totalUsers: number = 100; // Exemplo de total de usuários
  ratings: number[] = [0, 0, 0, 0, 0]; // Inicializa as avaliações (1 a 5 estrelas)
  rolesCount: number[] = [40, 30, 30]; // Exemplo de contagem de roles (Admin, TI, Financeiro)

  private ratingsChart: Chart | undefined; // Armazena a instância do gráfico de avaliações
  private rolesChart: Chart | undefined; // Armazena a instância do gráfico de roles

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getFeedbackCountByStars(); // Chama o método para obter as contagens
    setTimeout(() => {
      this.createCharts();
    }, 0);
  }

  getFeedbackCountByStars(): void {
    this.feedbackService.getFeedbackCountByStars().subscribe(
      (data) => {
        this.ratings = [data['1'], data['2'], data['3'], data['4'], data['5']];
        this.createCharts(); // Atualiza os gráficos após obter os dados
      },
      (error) => {
        console.error('Erro ao obter contagem de feedbacks por estrelas:', error);
      }
    );
  }

  createCharts(): void {
    // Destrói o gráfico de avaliações se já existir
    if (this.ratingsChart) {
      this.ratingsChart.destroy();
    }

    // Cria o gráfico de Avaliações
    const ratingsCtx = document.getElementById('ratingsChart') as HTMLCanvasElement;
    this.ratingsChart = new Chart(ratingsCtx, {
      type: 'bar',
      data: {
        labels: ['1 Estrela', '2 Estrelas', '3 Estrelas', '4 Estrelas', '5 Estrelas'],
        datasets: [{
          label: 'Avaliações',
          data: this.ratings,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });

    // Destrói o gráfico de roles se já existir
    if (this.rolesChart) {
      this.rolesChart.destroy();
    }

    // Cria o gráfico de Roles
    const rolesCtx = document.getElementById('rolesChart') as HTMLCanvasElement;
    this.rolesChart = new Chart(rolesCtx, {
      type: 'bar',
      data: {
        labels: ['Admin', 'TI', 'Financeiro'],
        datasets: [{
          label: 'Quantidade de Roles',
          data: this.rolesCount,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}