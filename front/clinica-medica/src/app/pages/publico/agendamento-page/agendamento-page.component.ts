import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { GeralService } from 'src/app/geral.service';

@Component({
  selector: 'app-agendamento-page',
  templateUrl: './agendamento-page.component.html',
  styleUrls: ['./agendamento-page.component.scss']
})
export class AgendamentoPageComponent implements OnInit {

  novoAgendamentoForm: FormGroup;
  agendamentos: any[] | undefined;
  medicos = [];
  medicosSelect: any[] | undefined;
  horariosDisponiveis = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  horariosDisponiveisSelect: any[] | undefined;
  especialidades: any[] = [];

  especialidadeControl = new FormControl(null);
  medicoControl = new FormControl(null);
  horarioConsultaControl = new FormControl(null);

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

  ngOnInit(): void {

    this.novoAgendamentoForm.valueChanges
    .subscribe(value => {
      if (this.novoAgendamentoForm.dirty) {
        if (value.dataConsulta) {
          this.selectData(value.dataConsulta)
        }
      }
    });

    this.geralService.listarFuncionarios().subscribe((res: any )=> {
      const aux: any[] = [];
      res.rows.forEach((element: any) => {
        if (element.crm) {
          aux.push(element);
        }
      });

      res.rows = aux;
      this.medicos = res.rows;

      this.geralService.listarAgendamentos().subscribe((res: any )=> {
        this.agendamentos = res.rows;

        this.medicos?.forEach((medico: any) => {
          if (!this.especialidades?.includes(medico.especialidade)) {
            this.especialidades?.push(medico.especialidade);
          }
        });
        this.especialidades?.sort();

      });

    });
  }

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

  selectEspecialidade(especialidade: any) {
    this.novoAgendamentoForm.get('especialidade')?.setValue(especialidade.value);
    this.medicosSelect = this.medicos?.filter((medico: any) => {
      return medico.especialidade === especialidade.value;
    });
  }

  selectMedico(medico: any) {
    this.novoAgendamentoForm.get('nomeMedico')?.setValue(medico.value);
  }

  selectData(event: any) {
    this.horariosDisponiveisSelect = this.horariosDisponiveis?.filter((horario: any) => {
      return !this.agendamentos?.some((agendamento: any) => {
        return agendamento.dataConsulta === this.novoAgendamentoForm.get('dataConsulta')?.value
        && agendamento.horarioConsulta === horario
        && agendamento.nomeMedico === this.novoAgendamentoForm.get('nomeMedico')?.value;
      });
    });
  }

  selectHorario(horario: any) {
    this.novoAgendamentoForm.get('horarioConsulta')?.setValue(horario.value);
  }

}
