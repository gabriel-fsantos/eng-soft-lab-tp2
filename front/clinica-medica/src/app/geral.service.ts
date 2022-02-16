import { EventEmitter, Injectable } from '@angular/core';

import { map } from 'rxjs';

import { HttpService } from 'src/service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class GeralService {

  loginEvent = new EventEmitter<boolean>();

  // Endpoints
  private readonly endpointEnderecos: string = 'endereco';
  private readonly endpointFuncionarios: string = 'funcionario';
  private readonly endpointPacientes: string = 'paciente';
  private readonly endpointAgendamentos: string = 'agendamento';

  private readonly endpointAuth: string = 'auth';

  constructor(private readonly httpService: HttpService) { }

  loginEventEmitter(logged: boolean) {
    this.loginEvent.emit(logged);
  }

  login(email: string, password: string) {
    const auth = btoa(`${email}:${password}`);
    return this.httpService.login(this.endpointAuth, null, {Authorization: 'Basic ' + auth})
    .pipe(map(res => {
        return res;
    }));
  }

  cadastrarEndereco(data: any) {
    return this.httpService.genericPost(this.endpointEnderecos, data)
      .pipe(map(res => {
        return res;
      }));
  }

  cadastrarAgendamento(data: any) {
    return this.httpService.genericPost(this.endpointAgendamentos, data)
      .pipe(map(res => {
        return res;
      }));
  }

  cadastrarFuncionario(data: any) {
    return this.httpService.genericPost(this.endpointFuncionarios, data)
      .pipe(map(res => {
        return res;
      }));
  }

  cadastrarPaciente(data: any) {
    return this.httpService.genericPost(this.endpointPacientes, data)
      .pipe(map(res => {
        return res;
      }));
  }

  listarFuncionarios() {
    return this.httpService.genericGet(this.endpointFuncionarios)
      .pipe(map(res => {
        return res;
      }));
  }

  listarPacientes() {
    return this.httpService.genericGet(this.endpointPacientes)
      .pipe(map(res => {
        return res;
      }));
  }

  listarEnderecos() {
    return this.httpService.genericGet(this.endpointEnderecos)
      .pipe(map(res => {
        return res;
      }));
  }

  listarAgendamentos() {
    return this.httpService.genericGet(this.endpointAgendamentos)
      .pipe(map(res => {
        return res;
      }));
  }

  listarAgendamentosMedico(idMedico: string) {
    return this.httpService.genericGet(this.endpointAgendamentos)
      .pipe(map(res => {
        return res;
      }));
  }

}
