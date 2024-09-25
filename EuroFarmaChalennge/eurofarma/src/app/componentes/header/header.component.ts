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
  userRole: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Atribuir o valor obtido do localStorage à propriedade userRole
    this.userRole = localStorage.getItem('userRole');
  }

  toggleLogoutPopup(): void {
    this.showLogoutPopup = !this.showLogoutPopup;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
