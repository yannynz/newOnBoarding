import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Importa todos os componentes do Chart.js

Chart.register(...registerables); // Registra todos os componentes necessários

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css']
})
export class GerenteComponent implements OnInit {

  totalUsers: number = 100; // Exemplo de total de usuários
  ratings: number[] = [10, 20, 30, 25, 15]; // Exemplo de avaliações (1 a 5 estrelas)
  rolesCount: number[] = [40, 30, 30]; // Exemplo de contagem de roles (Admin, TI, Financeiro)

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
        this.createCharts();
    }, 0);
  }

  createCharts(): void {
    // Gráfico de Avaliações
    const ratingsCtx = document.getElementById('ratingsChart') as HTMLCanvasElement;
    new Chart(ratingsCtx, {
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

    // Gráfico de Roles
    const rolesCtx = document.getElementById('rolesChart') as HTMLCanvasElement;
    new Chart(rolesCtx, {
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
