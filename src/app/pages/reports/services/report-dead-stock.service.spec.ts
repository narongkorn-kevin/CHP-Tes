import { TestBed } from '@angular/core/testing';

import { ReportDeadStockService } from './report-dead-stock.service';

describe('ReportDeadStockService', () => {
  let service: ReportDeadStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDeadStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
