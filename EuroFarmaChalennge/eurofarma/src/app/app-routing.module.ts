import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './componentes/login/login.component';
import { PdfsComponent } from './componentes/pdfs/pdfs.component';
import { VideosComponent } from './componentes/videos/videos.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { LembretesComponent } from './componentes/lembretes/lembretes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Rota do dashboard geral acessível para todos os usuários autenticados
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'lembretes', component: LembretesComponent, canActivate: [AuthGuard] },

  // Rotas para PDFs e Vídeos, filtrando com base na role
  { path: 'pdfs', component: PdfsComponent, canActivate: [AuthGuard] },
  { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] },

  // Rota raiz com lógica de redirecionamento
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redireciona para o dashboard se autenticado
    ]
  },

  // Rota de fallback caso o usuário não esteja autenticado
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Redireciona para login se não autenticado ou rota inválida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
