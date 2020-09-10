import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { BolsaValoresComponent } from './bolsa-valores/bolsa-valores.component';


const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'bolsavalores', component: BolsaValoresComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
