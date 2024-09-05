import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface Step {
  type: 'image' | 'video';
  content: string;
  description: string;
  details: string;
}

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  steps: Step[] = [
    { type: 'image', content: 'assets/imagens/EuroDashBoardMB.png', description: 'Bem-vindo ao Tour Onboard Eurofarma!', details: 'Clique em próximo para continuar' },
    { type: 'video', content: 'assets/videos/EuroDashBoard.mp4', description: 'ChatBot', details: 'No canto inferior direito, terá acesso ao chatbot para dúvidas sobre a aplicação.' },
    { type: 'video', content: 'assets/videos/Header.mp4', description: 'Header', details: 'No header você tem acesso a todas as funcionalidades do site.' },
    { type: 'video', content: 'assets/videos/Lembretes2.mp4', description: 'Lembretes', details: 'Gerencie lembretes que te auxiliam no dia a dia.' },
    { type: 'video', content: 'assets/videos/Videos.mp4', description: 'Vídeos', details: 'Visualize e exiba vídeos para treinamento do seu cargo.' },
    { type: 'video', content: 'assets/videos/Videos.mp4', description: 'Pdfs', details: 'Visualize e exiba Pdfs para treinamento do seu cargo.' }
  ];

  currentStep = 0;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }


  finishTour() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.authService.updateFirstAccess(userId, false).subscribe({
        next: (response) => {
          console.log('Update response:', response); // Verifica a resposta recebida
          localStorage.setItem('firstAccess', 'false');
          console.log('firstAccess updated to false');
          console.log('Navigating to /dashboard');
          this.router.navigate(['/dashboard']).then(() => {
            console.log('Navigation successful');
          }).catch(err => {
            console.error('Navigation error:', err);
          });
        },
        error: (err) => {
          console.error('Error updating first access:', err);
        }
      });
    }
  }  
}
