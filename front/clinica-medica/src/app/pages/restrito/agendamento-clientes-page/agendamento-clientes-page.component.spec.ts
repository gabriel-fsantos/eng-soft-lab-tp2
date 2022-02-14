import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoClientesPageComponent } from './agendamento-clientes-page.component';

describe('AgendamentoClientesPageComponent', () => {
  let component: AgendamentoClientesPageComponent;
  let fixture: ComponentFixture<AgendamentoClientesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentoClientesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoClientesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
