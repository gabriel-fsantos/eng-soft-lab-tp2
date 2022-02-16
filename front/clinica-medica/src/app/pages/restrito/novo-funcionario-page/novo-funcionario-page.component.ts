import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { GeralService } from '../../../geral.service';

@Component({
  selector: 'app-novo-funcionario-page',
  templateUrl: './novo-funcionario-page.component.html',
  styleUrls: ['./novo-funcionario-page.component.scss']
})
export class NovoFuncionarioPageComponent implements OnInit {

  novoFuncionarioForm: FormGroup;
  enderecos: any;
  eMedico = false;

  constructor(private readonly formBuilder: FormBuilder,
      private readonly geralService: GeralService,
      private toastr: ToastrService) {

    this.novoFuncionarioForm = this.formBuilder.group({
      nome: [null, [
        Validators.required,
      ]],
      email: [null, [
        Validators.required
      ]],
      telefone: [null, [
        Validators.required
      ]],
      cep: [null, [
        Validators.required
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
      ]],
      dataContrato: [null, [
        Validators.required
      ]],
      salario: [null, [
        Validators.required
      ]],
      senha: [null, [
        Validators.required
      ]],
      especialidade: [null, [
      ]],
      crm: [null, [
      ]],
    });
  }

  ngOnInit() {
    this.geralService.listarEnderecos().subscribe((res: any) => {
      this.enderecos = res.rows;
      console.log(this.enderecos);
    });

    this.novoFuncionarioForm.valueChanges
      .subscribe(value=> {
        if (this.novoFuncionarioForm.dirty) {
          this.onChangeCep();
        }
      });

  }

  cadastrarFuncionario() {
    const data: any = {
      nome: this.novoFuncionarioForm.get('nome')?.value,
      email: this.novoFuncionarioForm.get('email')?.value,
      telefone: this.novoFuncionarioForm.get('telefone')?.value,
      cep: this.novoFuncionarioForm.get('cep')?.value,
      logradouro: this.novoFuncionarioForm.get('logradouro')?.value,
      bairro: this.novoFuncionarioForm.get('bairro')?.value,
      cidade: this.novoFuncionarioForm.get('cidade')?.value,
      estado: this.novoFuncionarioForm.get('estado')?.value,
      dataContrato: this.novoFuncionarioForm.get('dataContrato')?.value,
      salario: this.novoFuncionarioForm.get('salario')?.value,
      senha: this.novoFuncionarioForm.get('senha')?.value,
    };

    if (this.eMedico) {
      data.especialidade = this.novoFuncionarioForm.get('especialidade')?.value
      data.crm = this.novoFuncionarioForm.get('crm')?.value
    }

    this.geralService.cadastrarFuncionario(data).subscribe(res => {
      this.toastr.success('Funcionário cadastrado com sucesso!');
      this.novoFuncionarioForm.reset();
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

  toogle() {
    this.eMedico = !this.eMedico;
  }

  onChangeCep() {
    const cep = this.novoFuncionarioForm.get('cep')?.value;
    const endereco = this.enderecos.find((endereco: any) => endereco.cep === cep);
    if (endereco) {
      this.novoFuncionarioForm.patchValue({
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
      });
    }
  }

}
