import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeralService } from '../../../geral.service';

@Component({
  selector: 'app-enderecos-page',
  templateUrl: './enderecos-page.component.html',
  styleUrls: ['./enderecos-page.component.scss']
})
export class EnderecosPageComponent implements OnInit {

  enderecos: any;

  constructor(private readonly geralService: GeralService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.geralService.listarEnderecos().subscribe(res => {
      this.enderecos = res;
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }
}
