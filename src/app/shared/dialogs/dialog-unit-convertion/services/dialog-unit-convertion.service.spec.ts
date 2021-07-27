import { TestBed } from '@angular/core/testing';

import { DialogUnitConvertionService } from './dialog-unit-convertion.service';

describe('DialogUnitConvertionService', () => {
  let service: DialogUnitConvertionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogUnitConvertionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
