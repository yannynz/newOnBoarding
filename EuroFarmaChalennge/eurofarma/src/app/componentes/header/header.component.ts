import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  lembretesLink: string | undefined;
  videosLink: string | undefined;
  pdfLink: string | undefined;
  showLogoutPopup: boolean = false; // Controle para exibir o pop-up de logout

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('userRole');

    // Definindo as rotas com base no role do usuário
    if (userRole === 'admin') {
      this.lembretesLink = '/admin-lembretes';
      this.videosLink = '/admin-videos';
      this.pdfLink = '/admin-pdfs';
    } else if (userRole === 'ti') {
      this.lembretesLink = '/ti-lembretes';
      this.videosLink = '/ti-videos';
      this.pdfLink = '/ti-pdfs';
    } else if (userRole === 'financeiro') {
      this.lembretesLink = '/financeiro-lembretes';
      this.videosLink = '/financeiro-videos';
      this.pdfLink = '/financeiro-pdfs';
    }
  }

  toggleLogoutPopup(): void {
    this.showLogoutPopup = !this.showLogoutPopup;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
