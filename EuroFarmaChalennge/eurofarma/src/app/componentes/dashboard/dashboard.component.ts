import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

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
  showFeedbackPopup: boolean = false;
  selectedRating: number = 0;
  comment: string = '';
  showThankYouPopup: boolean = false;
  

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
      modalText: 'A comunicação clara é um pilar essencial para o sucesso de nossa equipe. Acreditamos que a transparência nas informações é crucial para criar um ambiente de trabalho produtivo e colaborativo. Por isso, priorizamos a clarificação de informações e expectativas, assegurando que todos os membros da equipe compreendam seus papéis e responsabilidades. Essa abordagem permite que todos estejam na mesma página e trabalhem em direção a objetivos comuns. Além disso, garantimos que todos estejam bem-informados sobre o andamento dos projetos e as decisões tomadas. Mantemos canais de comunicação abertos e encorajamos o feedback contínuo, o que ajuda a identificar possíveis mal-entendidos rapidamente. Com isso, promovemos um ambiente onde todos se sentem à vontade para expressar suas opiniões e contribuir de maneira significativa, fortalecendo ainda mais o nosso trabalho em equipe.',
      modalImage: 'assets/imagens/clarificacao.jpg'
    },
    {
      title: 'Cultura',
      description: 'A empresa é fundamentada em valores de inovação, colaboração e respeito. Acreditamos que um ambiente inclusivo e dinâmico impulsiona a criatividade.',
      icon: 'fa-solid fa-user-group',
      modalText: 'A empresa é alicerçada em valores essenciais como inovação, colaboração e respeito. Acreditamos que esses princípios são fundamentais para o desenvolvimento de um ambiente de trabalho saudável e produtivo. Ao fomentar uma cultura que prioriza a diversidade e a inclusão, criamos condições propícias para que todos os membros da equipe se sintam valorizados e ouvidos. Essa abordagem não apenas promove a satisfação no trabalho, mas também fortalece nossa capacidade de inovar. Além disso, um ambiente dinâmico é crucial para estimular a criatividade e a colaboração. Ao encorajar a troca de ideias e a participação ativa de todos, conseguimos explorar novas perspectivas e soluções. Essa sinergia resulta em projetos mais robustos e impactantes, refletindo a essência dos nossos valores. Estamos comprometidos em cultivar essa cultura vibrante, que nos permite crescer e evoluir continuamente como equipe e como organização.',
      modalImage: 'assets/imagens/cultura.jpg'
    },
    {
      title: 'Conexão',
      description: 'Valorizamos as conexões que construímos, tanto internamente quanto com nossos clientes e parceiros. Acreditamos que relações fortes e colaborativas são a chave para o sucesso.',
      icon: 'fa-solid fa-handshake',
      modalText: 'Valorizamos profundamente as conexões que estabelecemos, tanto dentro da nossa equipe quanto com nossos clientes e parceiros. Essas relações são essenciais para a criação de um ambiente colaborativo e produtivo, onde todos se sentem engajados e motivados a contribuir para os objetivos comuns. Acreditamos que o fortalecimento dessas conexões não só enriquece a experiência de trabalho, mas também promove um entendimento mais profundo das necessidades e expectativas de cada parte envolvida. Por fim, reconhecemos que relações fortes são a chave para o nosso sucesso. Ao cultivar parcerias baseadas em confiança e respeito mútuo, conseguimos não apenas alcançar melhores resultados, mas também inovar e superar desafios juntos. Estamos comprometidos em nutrir essas relações, garantindo que cada interação seja uma oportunidade de crescimento e aprendizado, tanto para a nossa equipe quanto para nossos clientes e parceiros.',
      modalImage: 'assets/imagens/conexao.jpg'
    }
  ];

  constructor(private authService: AuthService, private feedbackService: FeedbackService) { }

  
  ngOnInit(): void {
    // Recuperar o nome do usuário armazenado no localStorage
    this.usuarioNome = localStorage.getItem('userName') || 'Usuário';
    this.definirSaudacao();
    this.checkDashboardAccess();
  }

  checkDashboardAccess() {
    const accesses = localStorage.getItem('dashboardAccesses');
    let accessCount = accesses ? parseInt(accesses, 10) : 0;

    accessCount += 1;
    localStorage.setItem('dashboardAccesses', accessCount.toString());

    console.log(`Acessos do dashboard: ${accessCount}`); // Log para verificar a contagem

    // Verifica se o número de acessos é maior ou igual a 3
    if (accessCount >= 3) {
      console.log('Acessos do dashboard atingiram 3. Chamando checkFirstAccess2...');
      this.checkFirstAccess2();
    }
  }

  checkFirstAccess2() {
    console.log('Entrou Checkfirstaccess');
    const userIdStr = localStorage.getItem('userId');

    if (userIdStr) {
        const userId = +userIdStr; // Converte para número
        console.log('Entrou If');

        // Aqui você chama o método do serviço para verificar firstAccess2
        const firstAccess2 = this.feedbackService.getUserFirstAccess2(userId);
        
        console.log('Valor de firstAccess2:', firstAccess2);

        // Se for true, mostra o pop-up
        if (firstAccess2) {
            this.showFeedbackPopup = true;
            console.log('Feedback Pop Up True');
        } else {
            console.log('firstAccess2 é false');
        }
    } else {
        console.error('User ID is not available in localStorage.');
    }
}


submitFeedback(rating: number, comment: string) {
    const userIdString = localStorage.getItem('userId');
    if (rating === 0) {
      alert("Por favor, selecione uma avaliação de estrelas."); // Validação de estrelas
      return;
    }
    
    if (userIdString !== null) {
        const userId = +userIdString; // Converte a string para número
        const feedback: Feedback = { userId, rating, comment }; // Cria o objeto de feedback
        
        this.feedbackService.createFeedback(feedback).subscribe(() => {
            // Atualiza firstAccess2 no localStorage para false após o feedback
            localStorage.setItem('firstAccess2', 'false');
            this.showFeedbackPopup = false;
            localStorage.removeItem('dashboardAccesses');
        });

        // Exibe o pop-up de agradecimento
        this.showThankYouPopup = true;
        
        // Esconde o pop-up após 3 segundos
        setTimeout(() => {
          this.showThankYouPopup = false;
        }, 3000);


    } else {
        console.error('User ID is not available in localStorage.');
    }
}

declineFeedback() {
  // Atualiza firstAccess2 no localStorage para false
  localStorage.setItem('firstAccess2', 'false');
  this.showFeedbackPopup = false; // Fecha o popup
}

setRating(star: number): void {
  this.selectedRating = star; // Define a estrela selecionada
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