import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('container') container!: ElementRef;
  isSignIn: boolean = true; // True for sign-in mode, false for sign-up mode

  email: string = '';
  password: string = '';
  name: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  switchToSignIn() {
    this.isSignIn = true;
    this.updateContainerClass();
  }

  switchToSignUp() {
    this.isSignIn = false;
    this.updateContainerClass();
  }

  private updateContainerClass() {
    const containerElement = this.container.nativeElement;
    if (this.isSignIn) {
      containerElement.classList.remove('active');
    } else {
      containerElement.classList.add('active');
    }
  }

  onLogin() {
    console.log('Tentei login');
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Resposta do servidor:', response);
          // Ajuste para refletir os campos retornados
          const userRole = response.role;
          const userName = response.name;
  
          // Ajuste o armazenamento local conforme necessário
          localStorage.setItem('userName', userName);
          localStorage.setItem('userRole', userRole);
          console.log('Consegui login');
  
          // Redirecionamento baseado no papel do usuário
          if (userRole === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (userRole === 'ti') {
            this.router.navigate(['/ti-dashboard']);
          } else if (userRole === 'financeiro') {
            this.router.navigate(['/financeiro-dashboard']);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          // Exibir uma mensagem de erro ao usuário
        }
      });
    }
  }
  
  

  onRegister() {
    console.log('Tentei cadastro');
    if (this.email && this.password && this.name && this.role) {
      this.authService.register(this.email, this.password, this.name, this.role).subscribe({
        next: (response) => {
          // Exibir um alerta de sucesso
          alert('Cadastro realizado com sucesso!');
          
          // Atualizar a página
          window.location.reload();
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Exibir uma mensagem de erro ao usuário
          alert('Erro ao realizar o cadastro. Por favor, tente novamente.');
        }
      });
    }
  }
  
}
