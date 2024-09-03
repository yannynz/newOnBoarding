import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa o HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { HeaderComponent } from './componentes/header/header.component';
import { TiVideosComponent } from './componentes/roles/ti-videos/ti-videos.component';
import { TiPdfsComponent } from './componentes/roles/ti-pdfs/ti-pdfs.component';
import { AdminVideosComponent } from './componentes/roles/admin-videos/admin-videos.component';
import { AdminPdfsComponent } from './componentes/roles/admin-pdfs/admin-pdfs.component';
import { FinanceiroVideosComponent } from './componentes/roles/financeiro-videos/financeiro-videos.component';
import { FinanceiroPdfsComponent } from './componentes/roles/financeiro-pdfs/financeiro-pdfs.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ChatbotComponent } from './componentes/chatbot/chatbot.component';
import { LembretesComponent } from './componentes/lembretes/lembretes.component';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    TiVideosComponent,
    TiPdfsComponent,
    AdminVideosComponent,
    AdminPdfsComponent,
    FinanceiroVideosComponent,
    FinanceiroPdfsComponent,
    FooterComponent,
    ChatbotComponent,
    LembretesComponent,
    SafeUrlPipe
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
