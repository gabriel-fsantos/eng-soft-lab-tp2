import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { GeralService } from '../../../geral.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-novo-endereco-page',
  templateUrl: './novo-endereco-page.component.html',
  styleUrls: ['./novo-endereco-page.component.scss']
})
export class NovoEnderecoPageComponent implements OnInit {

  novoEnderecoForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
      private readonly geralService: GeralService,
      private toastr: ToastrService) {

    this.novoEnderecoForm = this.formBuilder.group({
      cep: [null, [
        Validators.required,
      ]],
      logradouro: [null, [
        Validators.required
      ]],
      bairro: [null, [
        Validators.required
      ]],
      cidade: [null, [
        Validators.required
      ]],
      estado: [null, [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void { }

  cadastrarEndereco() {
    const data = {
      cep: this.novoEnderecoForm.value.cep,
      logradouro: this.novoEnderecoForm.value.logradouro,
      bairro: this.novoEnderecoForm.value.bairro,
      cidade: this.novoEnderecoForm.value.cidade,
      estado: this.novoEnderecoForm.value.estado
    };
    this.geralService.cadastrarEndereco(data).subscribe(res => {
      this.toastr.success('Endereço cadastrado com sucesso!');
      this.novoEnderecoForm.reset();
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

}
