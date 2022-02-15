import { Injectable } from '@angular/core';

import { map } from 'rxjs';

import { HttpService } from 'src/service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {

  // Endpoints
  private readonly endpointEnderecos: string = 'endereco';
  private readonly endpointFuncionario: string = 'funcionaro';
  private readonly endpointPaciente: string = 'paciente';
  // private readonly endpointEnderecos: string = 'endereco';

  constructor(private readonly httpService: HttpService) { }

  cadastrarEndereco(data: any) {
    return this.httpService.genericPost(this.endpointEnderecos, data)
      .pipe(map(res => {
        return res;
      }));
  }

  cadastrarFuncionario(data: any) {
    return this.httpService.genericPost(this.endpointFuncionario, data)
      .pipe(map(res => {
        return res;
      }));
  }

  cadastrarPaciente(data: any) {
    return this.httpService.genericPost(this.endpointPaciente, data)
      .pipe(map(res => {
        return res;
      }));
  }

  listarFuncionarios() {
    return this.httpService.genericGet(this.endpointFuncionario)
      .pipe(map(res => {
        return res;
      }));
  }

  listarPaciente() {
    return this.httpService.genericGet(this.endpointPaciente)
      .pipe(map(res => {
        return res;
      }));
  }

}
