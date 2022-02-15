import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PublicoService } from '../../publico/publico.service';

@Component({
  selector: 'app-funcionarios-page',
  templateUrl: './funcionarios-page.component.html',
  styleUrls: ['./funcionarios-page.component.scss']
})
export class FuncionariosPageComponent implements OnInit {

  funcionarios: any;

  constructor(private readonly publicoService: PublicoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.publicoService.listarFuncionarios().subscribe(res => {
      console.log(res);
      this.funcionarios = res;
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

}
