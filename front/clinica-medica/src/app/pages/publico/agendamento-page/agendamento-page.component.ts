import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { GeralService } from 'src/app/geral.service';

@Component({
  selector: 'app-agendamento-page',
  templateUrl: './agendamento-page.component.html',
  styleUrls: ['./agendamento-page.component.scss']
})
export class AgendamentoPageComponent implements OnInit {


  novoAgendamentoForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
      private readonly geralService: GeralService,
      private toastr: ToastrService) {

    this.novoAgendamentoForm = this.formBuilder.group({
      nome: [null, [
        Validators.required,
      ]],
      email: [null, [
        Validators.required
      ]],
      telefone: [null, [
        Validators.required
      ]],
      especialidade: [null, [
        Validators.required
      ]],
      nomeMedico: [null, [
        Validators.required
      ]],
      dataConsulta: [null, [
        Validators.required
      ]],
      horarioConsulta: [null, [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void { }

  cadastrarAgendamento() {
    const data = {
      nome: this.novoAgendamentoForm.get('nome')?.value,
      email: this.novoAgendamentoForm.get('email')?.value,
      telefone: this.novoAgendamentoForm.get('telefone')?.value,
      especialidade: this.novoAgendamentoForm.get('especialidade')?.value,
      nomeMedico: this.novoAgendamentoForm.get('nomeMedico')?.value,
      dataConsulta: this.novoAgendamentoForm.get('dataConsulta')?.value,
      horarioConsulta: this.novoAgendamentoForm.get('horarioConsulta')?.value
    };

    this.geralService.cadastrarAgendamento(data).subscribe(res => {
      this.toastr.success('Agendamento cadastrado com sucesso!');
      this.novoAgendamentoForm.reset();
    }, () => {
      this.toastr.error('Algo de errado aconteceu!');
    });
  }

}
