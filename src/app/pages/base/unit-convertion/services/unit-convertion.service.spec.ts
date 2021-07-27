import { TestBed } from '@angular/core/testing';

import { UnitConvertionService } from './unit-convertion.service';

describe('UnitConvertionService', () => {
  let service: UnitConvertionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitConvertionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
