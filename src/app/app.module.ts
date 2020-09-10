import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { BolsaValoresComponent } from './bolsa-valores/bolsa-valores.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ReportsComponent,
    BolsaValoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
