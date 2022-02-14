import { Injectable } from '@angular/core';

import { map } from 'rxjs';

import { HttpService } from 'src/service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {

  // Endpoints
  private readonly endpointEnderecos: string = 'endereco';

  constructor(private readonly httpService: HttpService) { }

  cadastrarEndereco(data: any) {
    return this.httpService.genericPost(data, this.endpointEnderecos)
    .pipe(map(res => {
        return res;
    }));
  }

}
