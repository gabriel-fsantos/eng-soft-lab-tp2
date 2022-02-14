import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosPageComponent } from './funcionarios-page.component';

describe('FuncionariosPageComponent', () => {
  let component: FuncionariosPageComponent;
  let fixture: ComponentFixture<FuncionariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionariosPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
