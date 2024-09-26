import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service'; // Importe o AuthService

Chart.register(...registerables);

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css']
})
export class GerenteComponent implements OnInit {

  totalUsers: number = 0; // Inicializa total de usuários como 0
  ratings: number[] = [0, 0, 0, 0, 0]; // Inicializa as avaliações (1 a 5 estrelas)
  rolesCount: { [key: string]: number } = {}; // Inicializa a contagem de roles como um objeto
  usuarioNome: string = '';
  saudacao: string = '';

  private ratingsChart: Chart | undefined;
  private rolesChart: Chart | undefined;

  constructor(private feedbackService: FeedbackService, private authService: AuthService) {} // Injete o AuthService

  ngOnInit(): void {
    this.usuarioNome = localStorage.getItem('userName') || 'Usuário';
    this.definirSaudacao();
    this.getFeedbackCountByStars(); // Obtém as contagens de feedbacks
    this.getUserCountByRoles(); // Obtém a contagem de usuários por roles
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

  getUserCountByRoles(): void {
    this.feedbackService.getUserCountByRoles().subscribe(
      (data) => {
        this.rolesCount = data; // Armazena a contagem de roles

        // Calcula o total de usuários somando as contagens de roles
        this.totalUsers = Object.values(this.rolesCount).reduce((acc, count) => acc + count, 0);

        this.createCharts(); // Atualiza os gráficos após obter os dados
      },
      (error) => {
        console.error('Erro ao obter contagem de usuários por roles:', error);
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

 // Ignorando o erro pois o código funciona mesmo assim
    // @ts-ignore
this.ratingsChart = new Chart(ratingsCtx, {
  type: 'doughnut', // Muda o tipo para doughnut
  data: {
    labels: ['1 Estrela', '2 Estrelas', '3 Estrelas', '4 Estrelas', '5 Estrelas'],
    datasets: [{
      label: 'Avaliações',
      data: this.ratings,
      backgroundColor: [
        'rgba(241, 220, 22, 0.6)', // 1 Estrela
        'rgba(50, 168, 82, 0.6)',   // 2 Estrelas
        'rgba(22, 50, 241, 0.6)',   // 3 Estrelas
        'rgba(241, 22, 22, 0.6)',    // 4 Estrelas
        'rgba(22, 241, 196, 0.6)',   // 5 Estrelas
      ],
    }]
  },
  options: {
    responsive: true, // Habilita a responsividade do gráfico
    plugins: {
      legend: {
        display: false, // Remove a legenda
      },
      tooltip: {
        enabled: true, // Habilita os tooltips
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`; // Exibe o valor ao passar o mouse
          }
        }
      }
    },
    // Remove as linhas de grade, que não são relevantes para o gráfico de donut
    scales: {
      x: {
        display: false, // Não é necessário para gráfico de donut
      },
      y: {
        display: false, // Não é necessário para gráfico de donut
      }
    }
  }
});



    if (this.rolesChart) {
      this.rolesChart.destroy();
    }

    // Cria o gráfico de Roles
    const rolesCtx = document.getElementById('rolesChart') as HTMLCanvasElement;

    const colors = [
      'rgba(54, 162, 235, 0.6)', // Azul claro
      'rgba(255, 206, 86, 0.6)', // Amarelo
      'rgba(75, 192, 192, 0.6)', // Verde água
      'rgba(153, 102, 255, 0.6)', // Roxo
    ];

    // Ignorando o erro pois o código funciona mesmo assim
    // @ts-ignore
    this.rolesChart = new Chart(rolesCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(this.rolesCount), // Usa as keys das roles
        datasets: [{
          data: Object.values(this.rolesCount), // Usa os values das roles
          backgroundColor: colors.slice(0, Object.keys(this.rolesCount).length), // Ajusta as cores com base na quantidade de roles
        }]
      },
      options: {
        responsive: true, // Habilita a responsividade do gráfico
        elements: {
          arc: {
            borderWidth: 1 // Remove a borda dos segmentos
          }
        },
        plugins: {
          legend: {
            display: false, // Exibe a legenda
          },
          tooltip: {
            enabled: true, // Habilita os tooltips
            callbacks: {
              label: function(tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`; // Exibe o valor ao passar o mouse
              }
            }
          }
        }
      }
    });


  }


  definirSaudacao(): void {
    const horaAtual = new Date().getHours();
    if (horaAtual < 13) {
      this.saudacao = 'Bom dia';
    } else if (horaAtual < 18) {
      this.saudacao = 'Boa tarde';
    } else {
      this.saudacao = 'Boa noite';
    }
  }
}
