import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa o HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdminDashboardComponent } from './componentes/dashboards/admin-dashboard/admin-dashboard.component';
import { TiDashboardComponent } from './componentes/dashboards/ti-dashboard/ti-dashboard.component';
import { FinanceiroDashboardComponent } from './componentes/dashboards/financeiro-dashboard/financeiro-dashboard.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    TiDashboardComponent,
    FinanceiroDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Adiciona o HttpClientModule aqui
  ],
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
