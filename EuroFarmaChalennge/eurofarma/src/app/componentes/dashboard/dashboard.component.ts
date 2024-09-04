import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  usuarioNome: string = '';
  saudacao: string = '';

  ngOnInit(): void {
    // Recuperar o nome do usuário armazenado no localStorage
    this.usuarioNome = localStorage.getItem('userName') || 'Usuário';
    this.definirSaudacao();
  }

  definirSaudacao(): void {
    const horaAtual = new Date().getHours();
    if (horaAtual < 12) {
      this.saudacao = 'Bom dia';
    } else if (horaAtual < 18) {
      this.saudacao = 'Boa tarde';
    } else {
      this.saudacao = 'Boa noite';
    }
  }
}
