import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeralService } from '../../../geral.service';

@Component({
  selector: 'app-funcionarios-page',
  templateUrl: './funcionarios-page.component.html',
  styleUrls: ['./funcionarios-page.component.scss']
})
export class FuncionariosPageComponent implements OnInit {

  funcionarios: any;

  constructor(private readonly geralService: GeralService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.geralService.listarFuncionarios().subscribe(res => {
      console.log(res);
      this.funcionarios = res;
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

}
