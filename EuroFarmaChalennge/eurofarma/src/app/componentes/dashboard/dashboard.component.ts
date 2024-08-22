import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  usuarioNome: string = '';

  ngOnInit(): void {
    // Recuperar o nome do usuário armazenado no localStorage
    this.usuarioNome = localStorage.getItem('userName') || 'Usuário';
  }

}
