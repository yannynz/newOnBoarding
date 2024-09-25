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
  isSignIn: boolean = true;

  email: string = '';
  password: string = '';
  name: string = '';
  role: string = '';

  registrationError: boolean = false;
  registrationErrorMessage: string = '';

  loginError: boolean = false;
  loginErrorMessage: string = '';

  registrationSuccess: boolean = false;
  registrationSuccessMessage: string = '';

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
    this.loginError = false; // Resetar o erro de login
    
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login response:', response);
  
          // Verificar se a função saveUserData está sendo chamada
          this.authService.saveUserData(response);
  
          const userRole = response.role;
          const userName = response.name;
          const userId = response.id;
          const firstAccess = response.firstAccess !== undefined ? response.firstAccess : false;
          const firstAccess2 = response.firstAccess2 !== undefined ? response.firstAccess2 : false;
  
          // Atualiza o localStorage com os dados do usuário
          localStorage.setItem('userName', userName);
          localStorage.setItem('userRole', userRole);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('firstAccess', firstAccess.toString());
          localStorage.setItem('firstAccess2', firstAccess2.toString());
          console.log('firstAccess:', firstAccess);
  
          // Se o firstAccess é true, redirecione para /tour, caso contrário, para /dashboard
          if (firstAccess) {
            this.router.navigate(['/tour']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.loginError = true;
          this.loginErrorMessage = 'Usuário inexistente ou senha incorreta. Por favor, tente novamente.';
        }
      });
    }
  }
  
  

  onRegister() {
    this.registrationError = false; // Resetar o erro de registro
    if (this.email && this.password && this.name && this.role) {
      this.authService.register(this.email, this.password, this.name, this.role).subscribe({
        next: () => {
          this.registrationSuccess = true;
          this.registrationSuccessMessage = 'Cadastro feito com sucesso, faça login.';
          this.loginError = false;
          this.isSignIn = true;
          this.updateContainerClass();
        },
        error: (error) => {
          this.registrationError = true;
          this.loginError = false;
          if (error.status === 409) {
            this.registrationErrorMessage = 'O e-mail já está em uso. Por favor, escolha outro.';
          } else {
            this.registrationErrorMessage = 'Erro ao realizar o cadastro. Por favor, tente novamente.';
          }
        }
      });
    }
  }
}
