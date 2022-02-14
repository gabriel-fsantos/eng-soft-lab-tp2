import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoMedicoPageComponent } from './agendamento-medico-page.component';

describe('AgendamentoMedicoPageComponent', () => {
  let component: AgendamentoMedicoPageComponent;
  let fixture: ComponentFixture<AgendamentoMedicoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentoMedicoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoMedicoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
