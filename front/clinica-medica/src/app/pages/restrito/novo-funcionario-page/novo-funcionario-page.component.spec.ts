import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoFuncionarioPageComponent } from './novo-funcionario-page.component';

describe('NovoFuncionarioPageComponent', () => {
  let component: NovoFuncionarioPageComponent;
  let fixture: ComponentFixture<NovoFuncionarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoFuncionarioPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoFuncionarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
