import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './componentes/login/login.component';
import { AdminLembretesComponent } from './componentes/roles/admin-lembretes/admin-lembretes.component';
import { AdminPdfsComponent } from './componentes/roles/admin-pdfs/admin-pdfs.component';
import { AdminVideosComponent } from './componentes/roles/admin-videos/admin-videos.component';
import { TiLembretesComponent } from './componentes/roles/ti-lembretes/ti-lembretes.component';
import { TiPdfsComponent } from './componentes/roles/ti-pdfs/ti-pdfs.component';
import { TiVideosComponent } from './componentes/roles/ti-videos/ti-videos.component';
import { FinanceiroLembretesComponent } from './componentes/roles/financeiro-lembretes/financeiro-lembretes.component';
import { FinanceiroPdfsComponent } from './componentes/roles/financeiro-pdfs/financeiro-pdfs.component';
import { FinanceiroVideosComponent } from './componentes/roles/financeiro-videos/financeiro-videos.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Rota do dashboard geral acessível para todos os usuários autenticados
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // Rotas específicas para cada role
  { path: 'admin-lembretes', component: AdminLembretesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  { path: 'admin-pdfs', component: AdminPdfsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  { path: 'admin-videos', component: AdminVideosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  
  { path: 'ti-lembretes', component: TiLembretesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ti' } },
  { path: 'ti-pdfs', component: TiPdfsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ti' } },
  { path: 'ti-videos', component: TiVideosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ti' } },

  { path: 'financeiro-lembretes', component: FinanceiroLembretesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'financeiro' } },
  { path: 'financeiro-pdfs', component: FinanceiroPdfsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'financeiro' } },
  { path: 'financeiro-videos', component: FinanceiroVideosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'financeiro' } },

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
