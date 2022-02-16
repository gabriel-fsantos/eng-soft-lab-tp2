import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { GeralService } from '../../../geral.service';

@Component({
  selector: 'app-agendamento-clientes-page',
  templateUrl: './agendamento-clientes-page.component.html',
  styleUrls: ['./agendamento-clientes-page.component.scss']
})
export class AgendamentoClientesPageComponent implements OnInit {

  agendamentos: any;

  constructor(private readonly geralService: GeralService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.geralService.listarAgendamentos().subscribe(res => {
      this.agendamentos = res;
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

}
