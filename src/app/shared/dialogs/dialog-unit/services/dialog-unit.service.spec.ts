import { TestBed } from '@angular/core/testing';

import { DialogUnitService } from './dialog-unit.service';

describe('DialogUnitService', () => {
  let service: DialogUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
