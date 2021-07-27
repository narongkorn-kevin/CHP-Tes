import { TestBed } from '@angular/core/testing';

import { ReportsItemLotService } from './reports-item-lot.service';

describe('ReportsItemLotService', () => {
  let service: ReportsItemLotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportsItemLotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
