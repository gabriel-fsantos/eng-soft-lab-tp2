import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { PublicoService } from '../../publico/publico.service';

@Component({
  selector: 'app-pacientes-page',
  templateUrl: './pacientes-page.component.html',
  styleUrls: ['./pacientes-page.component.scss']
})
export class PacientesPageComponent implements OnInit {

  pacientes: any;

  constructor(private readonly publicoService: PublicoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.publicoService.listarFuncionarios().subscribe(res => {
      console.log(res);
      this.pacientes = res;
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

}
