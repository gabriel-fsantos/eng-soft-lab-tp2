import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoPacientePageComponent } from './novo-paciente-page.component';

describe('NovoPacientePageComponent', () => {
  let component: NovoPacientePageComponent;
  let fixture: ComponentFixture<NovoPacientePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoPacientePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoPacientePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
