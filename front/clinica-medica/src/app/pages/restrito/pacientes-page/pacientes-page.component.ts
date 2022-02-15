import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { GeralService } from '../../../geral.service';

@Component({
  selector: 'app-pacientes-page',
  templateUrl: './pacientes-page.component.html',
  styleUrls: ['./pacientes-page.component.scss']
})
export class PacientesPageComponent implements OnInit {

  pacientes: any;

  constructor(private readonly geralService: GeralService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.geralService.listarPacientes().subscribe(res => {
      console.log(res);
      this.pacientes = res;
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

}
