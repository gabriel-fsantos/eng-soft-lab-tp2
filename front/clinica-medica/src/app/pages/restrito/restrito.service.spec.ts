import { TestBed } from '@angular/core/testing';

import { RestritoService } from './restrito.service';

describe('RestritoService', () => {
  let service: RestritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
