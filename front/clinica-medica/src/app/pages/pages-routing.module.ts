import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './publico/home-page/home-page.component';
import { ShowPageComponent } from './publico/show-page/show-page.component';
import { LoginPageComponent } from './publico/login-page/login-page.component';
import { AgendamentoPageComponent } from './publico/agendamento-page/agendamento-page.component';
import { NovoEnderecoPageComponent } from './publico/novo-endereco-page/novo-endereco-page.component';

import { NovoFuncionarioPageComponent } from './restrito/novo-funcionario-page/novo-funcionario-page.component';
import { NovoPacientePageComponent } from './restrito/novo-paciente-page/novo-paciente-page.component';
import { FuncionariosPageComponent } from './restrito/funcionarios-page/funcionarios-page.component';
import { PacientesPageComponent } from './restrito/pacientes-page/pacientes-page.component';
import { AgendamentoClientesPageComponent } from './restrito/agendamento-clientes-page/agendamento-clientes-page.component';
import { AgendamentoMedicoPageComponent } from './restrito/agendamento-medico-page/agendamento-medico-page.component';

const routes: Routes = [
  // Publicas
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'galeria',
    component: ShowPageComponent,
  },
  {
    path: 'novo-endereco',
    component: NovoEnderecoPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'agendamento',
    component: AgendamentoPageComponent,
  },
  // Restritas
  {
    path: 'novo-funcionario',
    component: NovoFuncionarioPageComponent,
  },
  {
    path: 'novo-paciente',
    component: NovoPacientePageComponent,
  },
  {
    path: 'funcionarios',
    component: FuncionariosPageComponent,
  },
  {
    path: 'pacientes',
    component: PacientesPageComponent,
  },
  {
    path: 'agendamento-clientes',
    component: AgendamentoClientesPageComponent,
  },
  {
    path: 'agendamento-medico',
    component: AgendamentoMedicoPageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
