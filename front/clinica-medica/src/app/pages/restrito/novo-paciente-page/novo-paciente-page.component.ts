import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { GeralService } from '../../../geral.service';

@Component({
  selector: 'app-novo-paciente-page',
  templateUrl: './novo-paciente-page.component.html',
  styleUrls: ['./novo-paciente-page.component.scss']
})
export class NovoPacientePageComponent implements OnInit {

  novoPacienteForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
      private readonly geralService: GeralService,
      private toastr: ToastrService) {

    this.novoPacienteForm = this.formBuilder.group({
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
      peso: [null, [
        Validators.required
      ]],
      altura: [null, [
        Validators.required
      ]],
      tipoSanguineo: [null, [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void { }

  cadastrarPaciente() {
    const data = {
      nome: this.novoPacienteForm.get('nome')?.value,
      email: this.novoPacienteForm.get('email')?.value,
      telefone: this.novoPacienteForm.get('telefone')?.value,
      cep: this.novoPacienteForm.get('cep')?.value,
      logradouro: this.novoPacienteForm.get('logradouro')?.value,
      bairro: this.novoPacienteForm.get('bairro')?.value,
      cidade: this.novoPacienteForm.get('cidade')?.value,
      estado: this.novoPacienteForm.get('estado')?.value,
      peso: this.novoPacienteForm.get('peso')?.value,
      altura: this.novoPacienteForm.get('altura')?.value,
      tipoSanguineo: this.novoPacienteForm.get('tipoSanguineo')?.value
    };

    this.geralService.cadastrarPaciente(data).subscribe(res => {
      this.toastr.success('Funcionário cadastrado com sucesso!');
      this.novoPacienteForm.reset();
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

}
