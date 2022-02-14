import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoPageComponent } from './agendamento-page.component';

describe('AgendamentoPageComponent', () => {
  let component: AgendamentoPageComponent;
  let fixture: ComponentFixture<AgendamentoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
