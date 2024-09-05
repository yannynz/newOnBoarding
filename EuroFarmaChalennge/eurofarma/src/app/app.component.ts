import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {
    // Subscrição para detectar mudanças na rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Condicional para exibir/esconder o cabeçalho dependendo da rota
        this.showHeader = !['/login', '/tour'].includes(event.url);
        this.showFooter = !['/login', '/tour'].includes(event.url);
      }
    });
  }
}
