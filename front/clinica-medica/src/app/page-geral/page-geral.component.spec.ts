import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGeralComponent } from './page-geral.component';

describe('PageGeralComponent', () => {
  let component: PageGeralComponent;
  let fixture: ComponentFixture<PageGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGeralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
