import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuarioNome: string = '';
  saudacao: string = '';
  modalAberto: boolean = false;
  cardAtual: any = {};

  cards = [
    {
      title: 'Conformidade',
      description: 'Nosso compromisso com a conformidade é essencial para manter a integridade e a confiança de nossos clientes e parceiros. Garantimos que todas as nossas operações estejam em conformidade com as leis e regulamentos.',
      icon: 'fa-solid fa-book',
      modalText: 'A conformidade é um pilar fundamental da nossa atuação e uma prioridade inegociável em todas as nossas operações. Reconhecemos que a confiança de nossos clientes e parceiros é construída sobre a base da transparência e da responsabilidade. Por isso, dedicamo-nos a garantir que cada aspecto de nossas atividades esteja alinhado com as leis, regulamentos e padrões éticos aplicáveis. Nosso compromisso com a conformidade vai além do mero cumprimento legal; trata-se de uma abordagem proativa que envolve a implementação de práticas sólidas de governança. Realizamos avaliações regulares de nossos processos internos, promovendo treinamentos contínuos para nossa equipe e mantendo uma cultura de conformidade que permeia todas as esferas da organização.',
      modalImage: 'assets/imagens/conformidade.jpeg'
    },
    {
      title: 'Clarificação',
      description: 'A comunicação clara é fundamental para o sucesso de nossa equipe. Priorizamos a clarificação de informações e expectativas, garantindo que todos estejam alinhados e bem-informados.',
      icon: 'fa-solid fa-lightbulb',
      modalText: 'Mais informações sobre como mantemos a clarificação...',
      modalImage: 'assets/imagens/clarificacao.jpg'
    },
    {
      title: 'Cultura',
      description: 'A empresa é fundamentada em valores de inovação, colaboração e respeito. Acreditamos que um ambiente inclusivo e dinâmico impulsiona a criatividade.',
      icon: 'fa-solid fa-user-group',
      modalText: 'Nosso foco na cultura empresarial é...',
      modalImage: 'assets/imagens/cultura.jpg'
    },
    {
      title: 'Conexão',
      description: 'Valorizamos as conexões que construímos, tanto internamente quanto com nossos clientes e parceiros. Acreditamos que relações fortes e colaborativas são a chave para o sucesso.',
      icon: 'fa-solid fa-handshake',
      modalText: 'Conexão é a chave para nosso sucesso...',
      modalImage: 'assets/imagens/conexao.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Recuperar o nome do usuário armazenado no localStorage
    this.usuarioNome = localStorage.getItem('userName') || 'Usuário';
    this.definirSaudacao();
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

  abrirModal(card: any): void {
    this.cardAtual = card;
    this.modalAberto = true;
  }

  fecharModal(event?: MouseEvent): void {
    this.modalAberto = false;
  }

}
