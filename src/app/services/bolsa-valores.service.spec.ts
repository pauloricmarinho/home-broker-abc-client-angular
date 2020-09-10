import { TestBed } from '@angular/core/testing';

import { BolsaValoresService } from './bolsa-valores.service';

describe('BolsaValoresService', () => {
  let service: BolsaValoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BolsaValoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
