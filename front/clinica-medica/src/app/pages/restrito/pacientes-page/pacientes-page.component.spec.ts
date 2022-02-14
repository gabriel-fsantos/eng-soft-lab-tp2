import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesPageComponent } from './pacientes-page.component';

describe('PacientesPageComponent', () => {
  let component: PacientesPageComponent;
  let fixture: ComponentFixture<PacientesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
