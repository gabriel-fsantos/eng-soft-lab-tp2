import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecosPageComponent } from './enderecos-page.component';

describe('EnderecosPageComponent', () => {
  let component: EnderecosPageComponent;
  let fixture: ComponentFixture<EnderecosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnderecosPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
