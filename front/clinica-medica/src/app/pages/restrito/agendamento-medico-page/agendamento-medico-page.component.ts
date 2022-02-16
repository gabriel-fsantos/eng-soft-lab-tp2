import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeralService } from 'src/app/geral.service';

@Component({
  selector: 'app-agendamento-medico-page',
  templateUrl: './agendamento-medico-page.component.html',
  styleUrls: ['./agendamento-medico-page.component.scss']
})
export class AgendamentoMedicoPageComponent implements OnInit {

  agendamentos: any;
  nomeMedico: string | null;

  constructor(private readonly geralService: GeralService,
    private toastr: ToastrService) {
      this.nomeMedico = localStorage.getItem('userName');
    }

  ngOnInit(): void {
    this.geralService.listarAgendamentos().subscribe((res: any )=> {
      const aux: any[] = [];
      res.rows.forEach((element: any) => {
        if (element.nomeMedico === this.nomeMedico) {
          aux.push(element);
        }
      });

      res.rows = aux;
      this.agendamentos = res;
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

}
