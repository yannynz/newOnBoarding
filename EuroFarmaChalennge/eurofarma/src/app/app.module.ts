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
import { FooterComponent } from './componentes/footer/footer.component';
import { ChatbotComponent } from './componentes/chatbot/chatbot.component';
import { LembretesComponent } from './componentes/lembretes/lembretes.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { VideosComponent } from './componentes/videos/videos.component';
import { PdfsComponent } from './componentes/pdfs/pdfs.component';
import { TourComponent } from './componentes/tour/tour.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ChatbotComponent,
    LembretesComponent,
    SafeUrlPipe,
    VideosComponent,
    PdfsComponent,
    TourComponent
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
