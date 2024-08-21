import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdminDashboardComponent } from './componentes/dashboards/admin-dashboard/admin-dashboard.component';
import { FinanceiroDashboardComponent } from './componentes/dashboards/financeiro-dashboard/financeiro-dashboard.component';
import { TiDashboardComponent } from './componentes/dashboards/ti-dashboard/ti-dashboard.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  { path: 'ti-dashboard', component: TiDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ti' } },
  { path: 'financeiro-dashboard', component: FinanceiroDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'financeiro' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
