import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from './../../shared/shared.module';

import { AgendamentoPageComponent } from './publico/agendamento-page/agendamento-page.component';
import { HomePageComponent } from './publico/home-page/home-page.component';
import { ShowPageComponent } from './publico/show-page/show-page.component';
import { LoginPageComponent } from './publico/login-page/login-page.component';
import { NovoEnderecoPageComponent } from './publico/novo-endereco-page/novo-endereco-page.component';

import { AgendamentoClientesPageComponent } from './restrito/agendamento-clientes-page/agendamento-clientes-page.component';
import { AgendamentoMedicoPageComponent } from './restrito/agendamento-medico-page/agendamento-medico-page.component';
import { EnderecosPageComponent } from './restrito/enderecos-page/enderecos-page.component';
import { FuncionariosPageComponent } from './restrito/funcionarios-page/funcionarios-page.component';
import { PacientesPageComponent } from './restrito/pacientes-page/pacientes-page.component';
import { NovoFuncionarioPageComponent } from './restrito/novo-funcionario-page/novo-funcionario-page.component';
import { NovoPacientePageComponent } from './restrito/novo-paciente-page/novo-paciente-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ShowPageComponent,
    AgendamentoPageComponent,
    LoginPageComponent,
    FuncionariosPageComponent,
    PacientesPageComponent,
    EnderecosPageComponent,
    AgendamentoClientesPageComponent,
    AgendamentoMedicoPageComponent,
    NovoEnderecoPageComponent,
    NovoFuncionarioPageComponent,
    NovoPacientePageComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class PagesModule { }
