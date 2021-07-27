import { TestBed } from '@angular/core/testing';

import { ReportSlowStockService } from './report-slow-stock.service';

describe('ReportSlowStockService', () => {
  let service: ReportSlowStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportSlowStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
