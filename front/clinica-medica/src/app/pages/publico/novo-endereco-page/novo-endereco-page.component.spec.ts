import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoEnderecoPageComponent } from './novo-endereco-page.component';

describe('NovoEnderecoPageComponent', () => {
  let component: NovoEnderecoPageComponent;
  let fixture: ComponentFixture<NovoEnderecoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoEnderecoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoEnderecoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
